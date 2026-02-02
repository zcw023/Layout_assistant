/**
 * XSS 防护模块
 * 用于清洗用户输入的 HTML，防止跨站脚本攻击
 */

// DOMPurify 将通过 CDN 引入，这里提供降级方案
const DOMPurify = window.DOMPurify || null;

/**
 * HTML 允许的标签白名单
 */
const ALLOWED_TAGS = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'strong', 'b', 'em', 'i', 'u', 's', 'del',
    'a',
    'blockquote',
    'ul', 'ol', 'li',
    'code', 'pre',
    'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'div', 'span'
];

/**
 * HTML 允许的属性白名单
 */
const ALLOWED_ATTR = [
    'href', 'src', 'alt', 'title', 'class', 'id', 'style',
    'width', 'height', 'rowspan', 'colspan',
    'target', 'rel'
];

/**
 * URL 协议白名单
 */
const ALLOWED_URI_REGEXP = /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i;

/**
 * Sanitizer 类 - 提供安全的 HTML 清洗功能
 */
export class Sanitizer {
    /**
     * 清洗 HTML 字符串，移除潜在的恶意代码
     * @param {string} html - 待清洗的 HTML
     * @param {Object} options - 配置选项
     * @returns {string} 清洗后的安全 HTML
     */
    static clean(html, options = {}) {
        if (!html || typeof html !== 'string') {
            return '';
        }

        // 如果 DOMPurify 可用，使用它（更安全）
        if (DOMPurify && typeof DOMPurify.sanitize === 'function') {
            return DOMPurify.sanitize(html, {
                ALLOWED_TAGS: options.allowedTags || ALLOWED_TAGS,
                ALLOWED_ATTR: options.allowedAttr || ALLOWED_ATTR,
                ALLOW_DATA_ATTR: false,
                ALLOW_UNKNOWN_PROTOCOLS: false,
                ALLOW_URI_REGEXP: ALLOWED_URI_REGEXP,
                ADD_ATTR: options.addAttr || ['target'],
                SAFE_FOR_JQUERY: true,
                WHOLE_DOCUMENT: false,
                RETURN_DOM: false,
                RETURN_DOM_FRAGMENT: false,
                SANITIZE_DOM: true,
                SANITIZE_NAMED_PROPS: true,
                KEEP_CONTENT: true
            });
        }

        // 降级方案：使用简单的正则表达式清洗
        return this._basicClean(html);
    }

    /**
     * 降级清洗方案（当 DOMPurify 不可用时）
     * 注意：这个方案不如 DOMPurify 安全，仅作为降级选项
     * @private
     */
    static _basicClean(html) {
        // 移除 script 标签及其内容
        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

        // 移除危险的 HTML 属性
        html = html.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, ''); // 事件处理器
        html = html.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, ''); // 未加引号的事件处理器
        html = html.replace(/javascript:/gi, ''); // javascript: 协议
        html = html.replace(/data:text\/html/gi, ''); // data: URL

        // 移除 object, embed, iframe 等危险标签
        html = html.replace(/<(object|embed|iframe|form|input|button|textarea)[^>]*>/gi, '');
        html = html.replace(/<\/(object|embed|iframe|form|input|button|textarea)>/gi, '');

        return html;
    }

    /**
     * 清洗用户输入的 Markdown 内容
     * 先将 Markdown 转换为 HTML，再清洗
     * @param {string} markdown - Markdown 内容
     * @param {Function} markdownParser - Markdown 解析函数（如 marked.parse）
     * @returns {string} 清洗后的 HTML
     */
    static cleanMarkdown(markdown, markdownParser) {
        if (!markdown || typeof markdown !== 'string') {
            return '';
        }

        if (!markdownParser || typeof markdownParser !== 'function') {
            throw new Error('markdownParser must be a function');
        }

        try {
            // 1. Markdown 转 HTML
            const html = markdownParser(markdown);

            // 2. 清洗 HTML
            return this.clean(html);
        } catch (error) {
            console.error('Markdown sanitization error:', error);
            return '';
        }
    }

    /**
     * 清洗 URL，确保协议安全
     * @param {string} url - 待清洗的 URL
     * @returns {string} 安全的 URL，或空字符串
     */
    static cleanURL(url) {
        if (!url || typeof url !== 'string') {
            return '';
        }

        try {
            const urlObj = new URL(url);

            // 只允许特定协议
            const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
            if (!allowedProtocols.includes(urlObj.protocol)) {
                return '';
            }

            return url;
        } catch (error) {
            // URL 解析失败，可能不是有效 URL
            return '';
        }
    }

    /**
     * 转义 HTML 特殊字符
     * @param {string} text - 待转义的文本
     * @returns {string} 转义后的文本
     */
    static escapeHTML(text) {
        if (!text || typeof text !== 'string') {
            return '';
        }

        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * 验证 HTML 内容是否安全
     * @param {string} html - 待验证的 HTML
     * @returns {boolean} 是否安全
     */
    static isSafe(html) {
        if (!html || typeof html !== 'string') {
            return true;
        }

        // 检查是否包含危险内容
        const dangerousPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+\s*=/i, // 事件处理器
            /<iframe/i,
            /<object/i,
            /<embed/i,
            /data:text\/html/i
        ];

        for (const pattern of dangerousPatterns) {
            if (pattern.test(html)) {
                return false;
            }
        }

        return true;
    }
}

/**
 * 默认导出 Sanitizer 实例
 */
export default Sanitizer;
