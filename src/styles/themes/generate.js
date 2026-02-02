/**
 * CSS 生成器
 * 从主题配置自动生成 CSS，消除 CSS/JS 双重定义问题
 */

import { THEMES_CONFIG, DEFAULT_STYLES } from '../../config/themes.config.js';

/**
 * 将 camelCase 转换为 kebab-case
 * @param {string} str - camelCase 字符串
 * @returns {string} kebab-case 字符串
 */
function kebabCase(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * 将样式对象转换为 CSS 字符串
 * @param {Object} styles - 样式对象
 * @param {number} indent - 缩进空格数
 * @returns {string} CSS 字符串
 */
function stylesToCSS(styles, indent = 4) {
    const spaces = ' '.repeat(indent);
    return Object.entries(styles)
        .map(([prop, value]) => {
            const cssProp = kebabCase(prop);
            return `${spaces}${cssProp}: ${value};`;
        })
        .join('\n');
}

/**
 * 生成单个主题的 CSS
 * @param {string} themeKey - 主题键名
 * @param {Object} theme - 主题配置对象
 * @returns {string} 主题 CSS
 */
function generateThemeCSS(themeKey, theme) {
    let css = `/* ${theme.name} */\n`;
    css += `.wechat-content.${themeKey} {\n`;
    css += stylesToCSS(theme.variables);
    css += '\n}\n\n';

    // 生成元素样式
    for (const [element, styles] of Object.entries(theme.elements)) {
        css += `.wechat-content.${themeKey} ${element} {\n`;
        css += stylesToCSS(styles);
        css += '\n}\n\n';
    }

    return css;
}

/**
 * 生成所有主题的 CSS
 * @returns {string} 完整的主题 CSS
 */
export function generateAllThemesCSS() {
    let css = '/**\n';
    css += ' * 主题样式表\n';
    css += ' * 自动从 themes.config.js 生成\n';
    css += ` * 生成时间: ${new Date().toLocaleString()}\n`;
    css += ' */\n\n';

    for (const [themeKey, theme] of Object.entries(THEMES_CONFIG)) {
        css += generateThemeCSS(themeKey, theme);
        css += '\n';
    }

    return css;
}

/**
 * 生成指定主题的 CSS
 * @param {string|string[]} themeKeys - 主题键名或键名数组
 * @returns {string} 主题 CSS
 */
export function generateThemesCSS(themeKeys) {
    const keys = Array.isArray(themeKeys) ? themeKeys : [themeKeys];
    let css = '';

    for (const key of keys) {
        const theme = THEMES_CONFIG[key];
        if (theme) {
            css += generateThemeCSS(key, theme);
            css += '\n';
        }
    }

    return css;
}

/**
 * 生成内联样式（用于微信复制）
 * @param {string} themeKey - 主题键名
 * @returns {Object} 内联样式对象
 */
export function generateInlineStyles(themeKey) {
    const theme = THEMES_CONFIG[themeKey];
    if (!theme) {
        return null;
    }

    const inlineStyles = {
        container: Object.entries(theme.variables)
            .map(([prop, value]) => `${kebabCase(prop)}:${value}`)
            .join(';'),
        elements: {}
    };

    for (const [element, styles] of Object.entries(theme.elements)) {
        inlineStyles.elements[element] = Object.entries(styles)
            .map(([prop, value]) => `${kebabCase(prop)}:${value}`)
            .join(';');
    }

    return inlineStyles;
}

/**
 * 为单个元素生成内联样式
 * @param {string} themeKey - 主题键名
 * @param {string} element - 元素名称
 * @returns {string} 内联样式字符串
 */
export function generateElementInlineStyle(themeKey, element) {
    const theme = THEMES_CONFIG[themeKey];
    if (!theme || !theme.elements[element]) {
        return '';
    }

    const styles = theme.elements[element];
    return Object.entries(styles)
        .map(([prop, value]) => `${kebabCase(prop)}:${value}`)
        .join(';');
}

/**
 * 将样式对象转换为内联样式字符串
 * @param {Object} styles - 样式对象
 * @returns {string} 内联样式字符串
 */
export function stylesToInline(styles) {
    if (!styles || typeof styles !== 'object') {
        return '';
    }

    return Object.entries(styles)
        .map(([prop, value]) => `${kebabCase(prop)}: ${value}`)
        .join('; ');
}

/**
 * 应用主题样式到 DOM 元素（用于预览）
 * @param {HTMLElement} element - 目标元素
 * @param {string} themeKey - 主题键名
 */
export function applyThemeToElement(element, themeKey) {
    if (!element || !themeKey) {
        return;
    }

    const theme = THEMES_CONFIG[themeKey];
    if (!theme) {
        console.warn(`主题 ${themeKey} 不存在`);
        return;
    }

    // 应用容器样式
    Object.assign(element.style, theme.variables);

    // 应用到子元素
    for (const [selector, styles] of Object.entries(theme.elements)) {
        const childElements = element.querySelectorAll(selector);
        childElements.forEach(el => {
            Object.assign(el.style, styles);
        });
    }
}

/**
 * 验证主题配置
 * @param {Object} themeConfig - 主题配置
 * @returns {Object} 验证结果 { valid: boolean, errors: string[] }
 */
export function validateThemeConfig(themeConfig) {
    const errors = [];

    if (!themeConfig) {
        errors.push('主题配置为空');
        return { valid: false, errors };
    }

    // 检查必需字段
    if (!themeConfig.variables) {
        errors.push('缺少 variables 字段');
    }

    if (!themeConfig.elements) {
        errors.push('缺少 elements 字段');
    }

    // 检查 variables
    if (themeConfig.variables) {
        const requiredVars = ['font-family', 'font-size', 'line-height', 'color', 'background'];
        for (const v of requiredVars) {
            if (!themeConfig.variables[v]) {
                errors.push(`缺少必需变量: ${v}`);
            }
        }
    }

    // 检查 elements
    if (themeConfig.elements) {
        const requiredElements = ['h1', 'h2', 'p'];
        for (const el of requiredElements) {
            if (!themeConfig.elements[el]) {
                errors.push(`缺少必需元素样式: ${el}`);
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * 将现有主题格式（js/themes.js）转换为配置格式
 * @param {Object} oldTheme - 旧格式主题对象
 * @returns {Object} 新格式主题配置
 */
export function convertOldThemeToNew(oldTheme) {
    const newTheme = {
        name: '',
        category: 'classic',
        description: '',
        tags: [],
        variables: {},
        elements: {}
    };

    // 解析 container 样式
    if (oldTheme.container) {
        const styles = parseInlineStyles(oldTheme.container);
        newTheme.variables = styles;
    }

    // 解析各元素样式
    const elementKeys = ['h1', 'h2', 'h3', 'p', 'strong', 'em', 'blockquote', 'img', 'a', 'code', 'pre', 'ul', 'ol', 'li', 'table', 'th', 'td', 'hr'];
    for (const key of elementKeys) {
        if (oldTheme[key]) {
            const styles = parseInlineStyles(oldTheme[key]);
            newTheme.elements[key] = styles;
        }
    }

    return newTheme;
}

/**
 * 解析内联样式字符串为对象
 * @param {string} inlineStyles - 内联样式字符串
 * @returns {Object} 样式对象
 */
function parseInlineStyles(inlineStyles) {
    const styles = {};
    if (!inlineStyles || typeof inlineStyles !== 'string') {
        return styles;
    }

    // 移除末尾分号
    const cleaned = inlineStyles.trim().replace(/;$/, '');
    const declarations = cleaned.split(';');

    for (const declaration of declarations) {
        const [property, ...valueParts] = declaration.split(':');
        if (property && valueParts.length > 0) {
            const prop = property.trim();
            const value = valueParts.join(':').trim();
            // 转换为 camelCase
            const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
            styles[camelProp] = value;
        }
    }

    return styles;
}

/**
 * 导出生成的 CSS 到文件（仅 Node.js 环境）
 * @param {string} css - CSS 内容
 * @param {string} filePath - 输出文件路径
 */
export function exportCSSToFile(css, filePath) {
    if (typeof window !== 'undefined') {
        console.warn('exportCSSToFile 仅在 Node.js 环境可用');
        return;
    }

    const fs = require('fs');
    try {
        fs.writeFileSync(filePath, css, 'utf8');
        console.log(`✅ CSS 已导出到: ${filePath}`);
    } catch (error) {
        console.error('❌ CSS 导出失败:', error);
    }
}

/**
 * 在浏览器中下载生成的 CSS
 * @param {string} css - CSS 内容
 * @param {string} filename - 文件名
 */
export function downloadCSS(css, filename = 'themes.css') {
    if (typeof window === 'undefined') {
        console.warn('downloadCSS 仅在浏览器环境可用');
        return;
    }

    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export default {
    generateAllThemesCSS,
    generateThemesCSS,
    generateInlineStyles,
    generateElementInlineStyle,
    stylesToInline,
    applyThemeToElement,
    validateThemeConfig,
    convertOldThemeToNew,
    exportCSSToFile,
    downloadCSS
};
