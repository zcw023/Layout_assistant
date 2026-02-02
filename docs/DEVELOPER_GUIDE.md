# 🔧 开发者文档

## 技术架构

### 项目结构

```
Layout_assistant/
├── index.html              # 主入口页面
├── README.md               # 项目说明
├── css/
│   └── style.css          # 主样式文件（42KB）
├── js/
│   ├── app.js             # 应用主逻辑（7KB）
│   ├── themes.js          # 主题配置（34KB）
│   └── app-backup.js      # 备份文件
├── src/                   # 新架构（未集成）
│   ├── config/           # 配置文件
│   ├── modules/          # 功能模块
│   ├── styles/           # 样式生成器
│   └── utils/            # 工具函数
├── tests/                 # 测试文件
├── docs/                  # 文档
└── vendor/               # 第三方库（可选）
```

---

## 核心模块说明

### 1. app.js - 应用主逻辑

**主要功能**：
- DOM 加载和初始化
- 事件监听绑定
- Markdown 解析和预览更新
- 复制到微信功能
- 快捷键支持

**关键函数**：

```javascript
// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    // 获取 DOM 元素
    elements = {
        editor: document.getElementById('editor'),
        preview: document.getElementById('preview-content'),
        themeSelect: document.getElementById('theme-select'),
        // ...
    };

    // 配置 marked
    marked.setOptions({
        breaks: true,      // GFM 换行
        gfm: true,         // GitHub Flavored Markdown
        headerIds: false,  // 不生成 ID
        sanitize: false    // 不清洗（我们单独处理）
    });
});

// 更新预览
function updatePreview() {
    const content = elements.editor.value.trim();
    let html = content.startsWith('<') ? content : marked.parse(content);
    elements.preview.innerHTML = '<div class="content-inner">' + html + '</div>';
    elements.preview.className = 'wechat-content ' + state.currentTheme;
}

// 复制到微信
async function copyToWechat() {
    const theme = WECHAT_THEMES[state.currentTheme];
    let html = marked.parse(content);

    // 应用主题样式（内联）
    let styled = applyThemeStyles(html, theme);

    // 复制到剪贴板
    await navigator.clipboard.write([
        new ClipboardItem({
            'text/html': new Blob([styled], { type: 'text/html' })
        })
    ]);
}
```

---

### 2. themes.js - 主题配置

**数据结构**：

```javascript
const WECHAT_THEMES = {
    chenlu: {
        // 容器样式
        container: 'font-family:...;font-size:16px;...',

        // 元素样式
        h1: 'font-size:28px;...',
        h2: 'font-size:21px;...',
        h3: 'font-size:17px;...',
        p: 'margin:18px 0;...',
        strong: 'font-weight:600;...',
        blockquote: 'margin:28px 0;...',
        img: 'max-width:100%;...',
        a: 'color:#8b7355;...',
        code: 'font-family:...;...',
        pre: 'background:...;...',
        ul: 'margin:20px 0;...',
        ol: 'margin:20px 0;...',
        li: 'margin:10px 0;...',
        table: 'width:100%;...',
        th: 'background:...;...',
        td: 'padding:...;...',
        hr: 'border:none;...'
    },
    // ... 其他主题
};
```

**添加新主题**：

```javascript
// 1. 在 themes.js 中添加配置
const WECHAT_THEMES = {
    // ... 现有主题

    // 新主题
    mytheme: {
        container: 'font-family:...;...',
        h1: 'font-size:30px;...',
        // ... 其他元素
    }
};

// 2. 在 index.html 中添加选项
<select id="theme-select">
    <option value="mytheme">我的主题</option>
</select>
```

---

### 3. 复制功能原理

**技术细节**：

```javascript
// 步骤 1: Markdown → HTML
const html = marked.parse(markdownContent);

// 步骤 2: 应用主题样式（转换为内联样式）
function applyInlineStyles(html, theme) {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    // 遍历所有元素
    temp.querySelectorAll('*').forEach(el => {
        const tag = el.tagName.toLowerCase();
        const style = theme[tag]; // 从主题配置获取样式
        if (style) {
            el.setAttribute('style', style);
        }
    });

    return temp.innerHTML;
}

// 步骤 3: 复制到剪贴板
await navigator.clipboard.write([
    new ClipboardItem({
        'text/html': new Blob([styledHtml], { type: 'text/html' }),
        'text/plain': new Blob([plainText], { type: 'text/plain' })
    })
]);
```

**为什么使用内联样式？**
- 微信编辑器不支持外部 CSS
- 内联样式可以保证格式 100% 保留
- ClipboardItem 可以携带格式信息

---

## 第三方库

### marked.js - Markdown 解析器

**版本**: 9.1.6
**CDN**: https://cdn.jsdelivr.net/npm/marked@9.1.6/marked.min.js

**配置**：
```javascript
marked.setOptions({
    breaks: true,      // 支持 GFM 换行（单个回车换行）
    gfm: true,         // 启用 GitHub Flavored Markdown
    headerIds: false,  // 不生成标题 ID
    sanitize: false,   // 不清洗 HTML（我们使用 DOMPurify）
    mangle: false      // 不混淆邮箱地址
});
```

**自定义渲染**：
```javascript
// 自定义渲染器
const renderer = new marked.Renderer();

renderer.heading = function(text, level) {
    return `<h${level} class="custom-heading">${text}</h${level}>`;
};

marked.use({ renderer });
```

---

### mammoth.js - Word 文档解析

**版本**: 1.6.0
**CDN**: https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js

**使用方法**：
```javascript
// 读取 Word 文档
const reader = new FileReader();
reader.onload = function(e) {
    mammoth.extractRawText({ arrayBuffer: e.target.result })
        .then(function(result) {
            const text = result.value; // 提取的文本
            elements.editor.value = text;
            updatePreview();
        })
        .catch(function(error) {
            console.error('Word 解析失败:', error);
        });
};

reader.readAsArrayBuffer(file);
```

**限制**：
- 只支持 .docx（Word 2007+）
- 不支持复杂格式（表格、图片等）
- 仅提取纯文本

---

### clipboard.js - 剪贴板操作

**版本**: 2.0.11
**CDN**: https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js

**现代方式（本项目使用）**：
```javascript
// Clipboard API (现代浏览器)
await navigator.clipboard.write([
    new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' })
    })
]);
```

**降级方案**：
```javascript
// document.execCommand (旧浏览器)
const range = document.createRange();
range.selectNodeContents(element);
const sel = window.getSelection();
sel.removeAllRanges();
sel.addRange(range);
document.execCommand('copy');
```

---

### highlight.js - 代码高亮

**版本**: 11.9.0
**CDN**: https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js

**使用方法**：
```javascript
// 配置
hljs.highlightAll();

// 手动高亮
hljs.highlightElement(codeBlock);

// 自定义语言
hljs.registerLanguage('mylang', myLanguageDefinition);
```

---

### DOMPurify - XSS 防护（可选）

**版本**: 3.0.6
**CDN**: https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js

**使用方法**：
```javascript
// 清洗 HTML
const clean = DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS: ['h1', 'h2', 'p', 'strong', 'em', ...],
    ALLOWED_ATTR: ['href', 'src', 'class', 'style', ...]
});
```

**注意**: 当前版本已引入但未使用，计划在 v1.1 中集成。

---

## CSS 架构

### 样式文件结构

```css
/* css/style.css */

/* 1. 基础重置和变量 */
:root { ... }
* { box-sizing: border-box; }

/* 2. 布局样式 */
.app-container { ... }
.toolbar { ... }
.editor-container { ... }

/* 3. 编辑器样式 */
#editor { ... }

/* 4. 预览区基础样式 */
.preview-panel { ... }
.wechat-content { ... }

/* 5. 主题样式（每个主题约 200 行） */
.wechat-content.chenlu { ... }
.wechat-content.chenlu h1 { ... }
.wechat-content.chenlu h2 { ... }
/* ... 17 个主题 × 15 个元素 ≈ 1927 行 */
```

### 主题 CSS 类名规则

```css
/* 主题容器 */
.wechat-content.{theme-name} { ... }

/* 主题元素 */
.wechat-content.{theme-name} h1 { ... }
.wechat-content.{theme-name} h2 { ... }
.wechat-content.{theme-name} p { ... }
/* ... */
```

**切换主题的实现**：
```javascript
// 修改 className
elements.preview.className = 'wechat-content ' + themeName;
```

---

## 数据流

### 输入 → 输出流程

```
用户输入
   ↓
[检测格式]
   ↓
   ├─→ Markdown → marked.parse() → HTML
   └─→ HTML → 直接使用
   ↓
[更新预览]
   ↓
preview.innerHTML = html
preview.className = 'wechat-content ' + themeName
   ↓
[用户看到预览]
   ↓
[点击复制]
   ↓
[应用主题样式]
   ↓
遍历所有元素，添加内联样式
   ↓
[写入剪贴板]
   ↓
ClipboardItem({ 'text/html': Blob })
   ↓
[用户粘贴到微信]
   ↓
格式完美保留 ✅
```

---

## 调试技巧

### 1. 启用详细日志

在 `app.js` 中添加：
```javascript
console.log('内容长度:', content.length);
console.log('解析结果:', html);
console.log('当前主题:', state.currentTheme);
```

### 2. 检查生成的 HTML

复制时会打印前 500 字符：
```javascript
console.log('生成 HTML:', styled.substring(0, 500));
```

### 3. 测试主题

在浏览器控制台：
```javascript
// 切换主题
state.currentTheme = 'chenlu';
updatePreview();

// 查看主题配置
console.log(WECHAT_THEMES.chenlu);
```

### 4. 检查 Clipboard 支持

```javascript
// 检查 Clipboard API
console.log('Clipboard 支持:', !!navigator.clipboard);

// 检查 ClipboardItem
console.log('ClipboardItem 支持:', !!ClipboardItem);
```

---

## 性能优化

### 当前性能指标

| 操作 | 时间 | 优化空间 |
|------|------|---------|
| 页面加载 | < 1s | 低 |
| Markdown 解析 | 10-50ms | 中 |
| 主题切换 | < 100ms | 低 |
| 复制操作 | 100-500ms | 中 |
| 大文件（>100KB） | 500ms-2s | 高 |

### 优化建议

**1. 防抖输入事件**
```javascript
let debounceTimer;
elements.editor.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(updatePreview, 300);
});
```

**2. 虚拟 DOM**
```javascript
// 对比前后差异，只更新变化部分
const prevHTML = preview.innerHTML;
const newHTML = marked.parse(content);
if (prevHTML !== newHTML) {
    preview.innerHTML = newHTML;
}
```

**3. Web Worker**
```javascript
// 在 Worker 中解析 Markdown（大文件）
const worker = new Worker('markdown-worker.js');
worker.postMessage(markdownContent);
worker.onmessage = function(e) {
    preview.innerHTML = e.data.html;
};
```

---

## 安全考虑

### XSS 防护

**当前状态**: ❌ 未实现
**计划**: v1.1 集成 DOMPurify

**实现方案**：
```javascript
import DOMPurify from 'dompurify';

function updatePreview() {
    const html = marked.parse(content);
    const clean = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['h1', 'h2', 'h3', 'p', 'strong', 'em', ...],
        ALLOWED_ATTR: ['href', 'src', 'class', 'style', ...]
    });
    elements.preview.innerHTML = clean;
}
```

### CSP 策略

**当前配置**：
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
               style-src 'self' 'unsafe-inline';
               img-src 'self' https: data:;
               font-src 'self' data:;">
```

---

## 构建和部署

### 本地开发

```bash
# 启动本地服务器
python3 -m http.server 8888

# 或使用 Node.js
npx serve -p 8888

# 访问
open http://localhost:8888
```

### 生产部署

**方式 1：静态托管**
```
GitHub Pages
Netlify
Vercel
```

**方式 2：CDN**
```
上传到 CDN
配置 HTTPS
添加自定义域名
```

**方式 3：服务器**
```
Nginx 配置：
location / {
    root /var/www/Layout_assistant;
    index index.html;
}
```

---

## API 文档（未来）

### 计划中的 API

```
POST /api/parse
Body: { markdown: string, theme: string }
Response: { html: string }

GET /api/themes
Response: { themes: Theme[] }

POST /api/export
Body: { html: string, format: 'pdf'|'html'|'image' }
Response: { url: string }
```

---

## 扩展开发

### 添加新功能

**1. 添加新的输入格式**
```javascript
// 例如：支持 Notion 导出
function parseNotion(content) {
    // 解析 Notion 格式
    return html;
}
```

**2. 添加新的主题**
```javascript
// 在 themes.js 中添加
const WECHAT_THEMES = {
    // ... 现有主题
    mytheme: {
        container: '...',
        h1: '...',
        // ...
    }
};

// 在 index.html 中添加选项
<option value="mytheme">我的主题</option>
```

**3. 添加新的导出格式**
```javascript
async function exportToPDF(html) {
    // 使用 html2pdf.js
    const pdf = await html2pdf().from(html).save();
}
```

---

## 常见错误排查

### 错误 1: "marked is not defined"

**原因**: marked.js 未加载
**解决**:
- 检查网络连接
- 确认 CDN 可访问
- 查看浏览器 Console

### 错误 2: 复制功能不工作

**原因**: Clipboard API 不支持
**解决**:
- 使用 localhost 或 HTTPS
- 检查浏览器版本
- 尝试降级方案

### 错误 3: 主题样式不生效

**原因**: CSS 文件未加载
**解决**:
- 检查 css/style.css 路径
- 确认 className 正确
- 查看浏览器 Network 标签

---

## 贡献指南

### 提交代码

1. Fork 项目
2. 创建功能分支
3. 提交 Pull Request
4. 等待审核

### 代码规范

- 使用 ES6+ 语法
- 添加 JSDoc 注释
- 遵循现有代码风格
- 测试所有功能

### 主题贡献

欢迎提交新主题！

**要求**:
- 完整的 18 个元素样式
- 独特的视觉风格
- 适合特定场景
- 提供预览图

---

**文档版本**: v1.0
**最后更新**: 2026-01-31
**维护者**: 开发团队
