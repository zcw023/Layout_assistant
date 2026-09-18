#!/usr/bin/env node
/**
 * 源头关 · 主题数据平台约束校验（iter-01）
 * 检查拆分版 js/themes.js 与单文件版 single-file.html 内嵌主题数据：
 *   ERROR（必须清零才交付）:
 *     1. CSS 变量 var(-- 残留 / --xxx: 定义残留
 *     2. top: 定位（应转 transform: translateY()）
 *     3. undefined / NaN 值
 *     4. font-family 中文字体名未加引号
 *     5. 文本类标签颜色饱和度过高（灰阶承重规则）
 *   WARN（标记，不阻断）:
 *     - 容器暗色背景（复制时需回退浅色）
 *     - 两版主题 key 不一致（防分叉）
 * 用法: node scripts/check-themes.mjs   (退出码 0=全过 / 1=有 ERROR)
 * 零依赖：仅 node 内置模块。
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

let ERROR = 0;
let WARN = 0;
const err = (ctx, msg) => { console.error(`  ❌ [${ctx}] ${msg}`); ERROR++; };
const warn = (ctx, msg) => { console.warn(`  ⚠️  [${ctx}] ${msg}`); WARN++; };

// ---------- 主题数据加载 ----------
function loadThemeObject(code) {
  const sandbox = {};
  vm.runInNewContext(code + '\n; this.__THEMES = WECHAT_THEMES;', sandbox);
  return sandbox.__THEMES;
}

// 拆分版 themes.js
const themesJsPath = path.join(ROOT, 'js/themes.js');
if (!fs.existsSync(themesJsPath)) {
  err('拆分版', 'js/themes.js 不存在');
  process.exit(1);
}
const splitThemes = loadThemeObject(fs.readFileSync(themesJsPath, 'utf8'));

// 单文件版：提取内嵌 const WECHAT_THEMES = {...}
const singleHtml = fs.readFileSync(path.join(ROOT, 'single-file.html'), 'utf8');
const marker = 'const WECHAT_THEMES =';
const startIdx = singleHtml.indexOf(marker);
if (startIdx === -1) {
  err('单文件版', '未找到 WECHAT_THEMES 定义');
  process.exit(1);
}
let depth = 0;
let endIdx = -1;
for (let i = startIdx + marker.length; i < singleHtml.length; i++) {
  const ch = singleHtml[i];
  if (ch === '{') depth++;
  else if (ch === '}') {
    depth--;
    if (depth === 0) { endIdx = i; break; }
  }
}
if (endIdx === -1) {
  err('单文件版', 'WECHAT_THEMES 括号不配对');
  process.exit(1);
}
const singleThemes = loadThemeObject(singleHtml.slice(startIdx, endIdx + 1));

// ---------- 颜色工具 ----------
const TEXT_TAGS = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'td', 'th', 'em', 'strong', 'figcaption'];
const SAT_THRESHOLD = 40; // 文本色饱和度阈值（%）
const DARK_LUMINANCE = 0.5; // 容器背景暗色阈值

function hexToRgb(hex) {
  const m = hex.replace('#', '');
  if (m.length === 3) return [parseInt(m[0] + m[0], 16), parseInt(m[1] + m[1], 16), parseInt(m[2] + m[2], 16)];
  return [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)];
}
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}
function luminance(r, g, b) { return (0.299 * r + 0.587 * g + 0.114 * b) / 255; }

function extractColors(styleStr) {
  const colors = [];
  const hexRe = /#[0-9a-fA-F]{3,8}/g;
  let m;
  while ((m = hexRe.exec(styleStr)) !== null) colors.push(m[0]);
  const rgbRe = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/g;
  while ((m = rgbRe.exec(styleStr)) !== null) colors.push(`rgb(${m[1]},${m[2]},${m[3]})`);
  return colors;
}

// ---------- 单样式串检查 ----------
function checkStyleString(themeName, tagName, styleStr) {
  const ctx = `${themeName}.${tagName}`;
  if (styleStr.includes('var(--')) err(ctx, 'CSS 变量 var(-- 残留');
  if (/--[a-zA-Z0-9-]+\s*:/.test(styleStr)) err(ctx, 'CSS 变量定义 --xxx: 残留');
  if (/(^|[^-])top\s*:/.test(styleStr)) err(ctx, 'top: 定位（应转 transform: translateY()）');
  if (styleStr.includes('undefined') || styleStr.includes('NaN')) err(ctx, '含 undefined/NaN 值');

  // font-family 中文字体引号
  const ffMatch = styleStr.match(/font-family\s*:\s*([^;]+)/i);
  if (ffMatch) {
    for (const famRaw of ffMatch[1].split(',')) {
      const fam = famRaw.trim();
      if (!fam) continue;
      if (/[\u4e00-\u9fff]/.test(fam) && !/^['"]|['"]$/.test(fam)) {
        err(ctx, `font-family 中文字体 "${fam}" 未加引号`);
      }
    }
  }

  // 文本色饱和度（灰阶承重）
  if (TEXT_TAGS.includes(tagName)) {
    for (const c of extractColors(styleStr)) {
      let rgb;
      if (c.startsWith('#')) rgb = hexToRgb(c);
      else {
        const mm = c.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
        rgb = [parseInt(mm[1]), parseInt(mm[2]), parseInt(mm[3])];
      }
      const [h, s, l] = rgbToHsl(...rgb);
      if (s > SAT_THRESHOLD && l > 20 && l < 85) {
        err(ctx, `文本色 ${c} 饱和度 ${s.toFixed(0)}% > ${SAT_THRESHOLD}%（灰阶承重）`);
      }
    }
  }

  // 容器暗色背景（WARN）
  if (tagName === 'container') {
    const bgMatch = styleStr.match(/background(?:-color)?\s*:\s*([^;]+)/i);
    if (bgMatch) {
      const bgVal = bgMatch[1].trim();
      let lum = null;
      if (bgVal.startsWith('#')) lum = luminance(...hexToRgb(bgVal));
      else if (bgVal.startsWith('rgb')) {
        const mm = bgVal.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
        if (mm) lum = luminance(+mm[1], +mm[2], +mm[3]);
      }
      if (lum !== null && lum < DARK_LUMINANCE) {
        warn(ctx, `暗色背景 ${bgVal}（亮度 ${lum.toFixed(2)}）→ 复制时回退浅色`);
      }
    }
  }
}

// ---------- 主流程 ----------
const versions = { '拆分版 themes.js': splitThemes, '单文件版 single-file.html': singleThemes };
const keysByVersion = {};

for (const [verName, themes] of Object.entries(versions)) {
  const themeNames = Object.keys(themes);
  keysByVersion[verName] = themeNames;
  console.log(`\n== ${verName}（${themeNames.length} 套主题）==`);
  for (const [themeName, theme] of Object.entries(themes)) {
    for (const [tagName, styleStr] of Object.entries(theme)) {
      if (typeof styleStr !== 'string') continue;
      checkStyleString(themeName, tagName, styleStr);
    }
  }
}

// 两版主题 key 对齐（防分叉）
console.log('\n== 两版主题 key 对齐 ==');
const splitKeys = keysByVersion['拆分版 themes.js'];
const singleKeys = keysByVersion['单文件版 single-file.html'];
const missing = singleKeys.filter(k => !splitKeys.includes(k));
const extra = splitKeys.filter(k => !singleKeys.includes(k));
if (missing.length) warn('对齐', `拆分版缺 ${missing.length} 款: ${missing.join(', ')}（任务 7 对齐）`);
if (extra.length) warn('对齐', `拆分版多出: ${extra.join(', ')}`);
if (!missing.length && !extra.length) console.log('  ✅ 两版主题 key 完全一致');

console.log(`\n结果: ERROR ${ERROR} / WARN ${WARN}`);
process.exit(ERROR > 0 ? 1 : 0);
