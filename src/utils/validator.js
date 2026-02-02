/**
 * 输入验证模块
 * 用于验证用户输入，防止恶意数据
 */

/**
 * Validator 类 - 提供各种验证功能
 */
export class Validator {
    /**
     * 文件大小限制（10MB）
     */
    static MAX_FILE_SIZE = 10 * 1024 * 1024;

    /**
     * 最小文件大小（1 字节）
     */
    static MIN_FILE_SIZE = 1;

    /**
     * 允许的文件类型
     */
    static ALLOWED_FILE_TYPES = [
        '.md',
        '.markdown',
        '.txt',
        '.docx'
    ];

    /**
     * 允许的 MIME 类型
     */
    static ALLOWED_MIME_TYPES = [
        'text/markdown',
        'text/plain',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    /**
     * Markdown 内容最大长度（防止 DoS）
     */
    static MAX_MARKDOWN_LENGTH = 1_000_000; // 1MB 字符

    /**
     * 验证文件
     * @param {File} file - 文件对象
     * @returns {Object} 验证结果 { valid: boolean, errors: string[] }
     */
    static validateFile(file) {
        const errors = [];

        if (!file) {
            errors.push('未选择文件');
            return { valid: false, errors };
        }

        // 检查文件大小
        if (file.size === 0) {
            errors.push('文件为空');
        } else if (file.size < this.MIN_FILE_SIZE) {
            errors.push('文件过小');
        } else if (file.size > this.MAX_FILE_SIZE) {
            errors.push(`文件大小超过 ${this.MAX_FILE_SIZE / 1024 / 1024}MB`);
        }

        // 检查文件扩展名
        const fileName = file.name || '';
        const ext = '.' + (fileName.split('.').pop() || '').toLowerCase();

        if (!ext || !this.ALLOWED_FILE_TYPES.includes(ext)) {
            errors.push(`不支持的文件类型: ${ext || '未知'}。支持的类型: ${this.ALLOWED_FILE_TYPES.join(', ')}`);
        }

        // 检查 MIME 类型（如果可用）
        if (file.type && !this.ALLOWED_MIME_TYPES.includes(file.type)) {
            errors.push(`不支持的文件格式: ${file.type}`);
        }

        // 检查文件名（防止路径遍历攻击）
        if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
            errors.push('文件名包含非法字符');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * 验证 Markdown 内容
     * @param {string} markdown - Markdown 内容
     * @returns {Object} 验证结果
     */
    static validateMarkdown(markdown) {
        const errors = [];

        if (typeof markdown !== 'string') {
            errors.push('内容必须是字符串');
            return { valid: false, errors };
        }

        // 检查内容长度
        if (markdown.length === 0) {
            errors.push('内容为空');
        } else if (markdown.length > this.MAX_MARKDOWN_LENGTH) {
            errors.push(`内容过长，最大支持 ${this.MAX_MARKDOWN_LENGTH} 个字符`);
        }

        // 检查是否包含可疑内容（进一步的安全检查）
        const suspiciousPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+\s*=/i
        ];

        for (const pattern of suspiciousPatterns) {
            if (pattern.test(markdown)) {
                errors.push('内容包含潜在的不安全代码');
                break;
            }
        }

        return {
            valid: errors.length === 0,
            errors,
            length: markdown.length,
            size: new Blob([markdown]).size
        };
    }

    /**
     * 验证 URL
     * @param {string} url - URL 字符串
     * @returns {boolean} 是否有效
     */
    static isValidURL(url) {
        if (!url || typeof url !== 'string') {
            return false;
        }

        try {
            const urlObj = new URL(url);

            // 只允许特定协议
            const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
            if (!allowedProtocols.includes(urlObj.protocol)) {
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * 验证图片 URL
     * @param {string} url - 图片 URL
     * @returns {boolean} 是否有效
     */
    static isValidImageURL(url) {
        if (!this.isValidURL(url)) {
            return false;
        }

        try {
            const urlObj = new URL(url);

            // 只允许 http/https 协议
            if (!['http:', 'https:'].includes(urlObj.protocol)) {
                return false;
            }

            // 检查文件扩展名
            const pathname = urlObj.pathname.toLowerCase();
            const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];

            return imageExts.some(ext => pathname.endsWith(ext));
        } catch (error) {
            return false;
        }
    }

    /**
     * 验证主题名称
     * @param {string} themeName - 主题名称
     * @param {Array} availableThemes - 可用主题列表
     * @returns {boolean} 是否有效
     */
    static isValidTheme(themeName, availableThemes = []) {
        if (!themeName || typeof themeName !== 'string') {
            return false;
        }

        // 检查主题名称格式（只允许字母、数字、下划线、连字符）
        if (!/^[a-z0-9_-]+$/i.test(themeName)) {
            return false;
        }

        // 如果提供了可用主题列表，检查是否在其中
        if (availableThemes.length > 0) {
            return availableThemes.includes(themeName);
        }

        return true;
    }

    /**
     * 验证主题配置
     * @param {Object} themeConfig - 主题配置对象
     * @returns {Object} 验证结果
     */
    static validateThemeConfig(themeConfig) {
        const errors = [];

        if (!themeConfig || typeof themeConfig !== 'object') {
            errors.push('主题配置必须是对象');
            return { valid: false, errors };
        }

        // 检查必需字段
        const requiredFields = ['name', 'variables', 'elements'];
        for (const field of requiredFields) {
            if (!themeConfig[field]) {
                errors.push(`缺少必需字段: ${field}`);
            }
        }

        // 验证 variables
        if (themeConfig.variables) {
            if (typeof themeConfig.variables !== 'object') {
                errors.push('variables 必须是对象');
            }
        }

        // 验证 elements
        if (themeConfig.elements) {
            if (typeof themeConfig.elements !== 'object') {
                errors.push('elements 必须是对象');
            }
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * 清理和验证用户输入的文本
     * @param {string} text - 用户输入的文本
     * @param {Object} options - 选项
     * @returns {string} 清理后的文本
     */
    static sanitizeText(text, options = {}) {
        if (typeof text !== 'string') {
            return '';
        }

        const {
            maxLength = 10000,
            trim = true,
            removeExtraWhitespace = true
        } = options;

        let cleaned = text;

        // 去除首尾空格
        if (trim) {
            cleaned = cleaned.trim();
        }

        // 去除多余空格
        if (removeExtraWhitespace) {
            cleaned = cleaned.replace(/\s+/g, ' ');
        }

        // 截断最大长度
        if (maxLength > 0 && cleaned.length > maxLength) {
            cleaned = cleaned.substring(0, maxLength);
        }

        return cleaned;
    }

    /**
     * 格式化文件大小
     * @param {number} bytes - 字节数
     * @returns {string} 格式化后的大小
     */
    static formatFileSize(bytes) {
        if (typeof bytes !== 'number' || bytes < 0) {
            return '0 B';
        }

        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(1)} ${units[unitIndex]}`;
    }

    /**
     * 创建验证错误提示
     * @param {Object} validationResult - 验证结果对象
     * @returns {string} 格式化的错误消息
     */
    static formatErrors(validationResult) {
        if (!validationResult || validationResult.valid) {
            return '';
        }

        const errors = validationResult.errors || [];
        return errors.join('；');
    }
}

/**
 * 默认导出 Validator 实例
 */
export default Validator;
