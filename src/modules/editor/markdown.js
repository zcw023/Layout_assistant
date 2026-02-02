/**
 * Markdown 解析器
 * 支持异步分块解析，提升大文件处理性能
 */

import { marked } from 'marked';

/**
 * MarkdownParser 类
 * 提供高性能的 Markdown 解析功能
 */
export class MarkdownParser {
    /**
     * 构造函数
     * @param {Object} options - 配置选项
     */
    constructor(options = {}) {
        this.CHUNK_SIZE = options.chunkSize || 5000; // 每次处理的字符数
        this.DELAY = options.delay || 0; // 每块之间的延迟（毫秒）

        // 配置 marked
        marked.setOptions({
            breaks: true,      // 支持 GFM 换行
            gfm: true,         // 启用 GitHub Flavored Markdown
            headerIds: false,  // 不生成 ID
            mangle: false,     // 不混淆邮箱地址
            sanitize: false    // 我们使用 DOMPurify 单独清洗
        });
    }

    /**
     * 异步分块解析 Markdown
     * 适用于大文件，避免阻塞 UI
     * @param {string} markdown - Markdown 内容
     * @param {Function} onProgress - 进度回调 (progress, percent)
     * @returns {Promise<string>} HTML 字符串
     */
    async parseChunked(markdown, onProgress) {
        if (!markdown || typeof markdown !== 'string') {
            return '';
        }

        // 小文件直接解析
        if (markdown.length < this.CHUNK_SIZE * 2) {
            return marked.parse(markdown);
        }

        // 分块解析
        const chunks = this._splitIntoChunks(markdown);
        const results = [];
        const total = chunks.length;

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];

            // 让出主线程，避免阻塞 UI
            await this._yield();

            // 解析当前块
            const html = marked.parse(chunk);
            results.push(html);

            // 进度回调
            if (onProgress) {
                const progress = (i + 1) / total;
                const percent = Math.round(progress * 100);
                onProgress(progress, percent);
            }
        }

        return results.join('');
    }

    /**
     * 同步解析（小文件）
     * @param {string} markdown - Markdown 内容
     * @returns {string} HTML 字符串
     */
    parse(markdown) {
        if (!markdown || typeof markdown !== 'string') {
            return '';
        }

        try {
            return marked.parse(markdown);
        } catch (error) {
            console.error('Markdown 解析错误:', error);
            throw error;
        }
    }

    /**
     * 解析单个块（用于实时预览）
     * @param {string} markdown - Markdown 内容
     * @returns {string} HTML 字符串
     */
    parseBlock(markdown) {
        return this.parse(markdown);
    }

    /**
     * 将 Markdown 内容分割为块
     * @private
     * @param {string} text - 文本内容
     * @returns {string[]} 文本块数组
     */
    _splitIntoChunks(text) {
        const chunks = [];
        let position = 0;

        while (position < text.length) {
            // 尝试在段落边界分割
            let end = position + this.CHUNK_SIZE;

            if (end < text.length) {
                // 查找最近的换行符
                const newlinePos = text.lastIndexOf('\n\n', end);
                if (newlinePos > position) {
                    end = newlinePos + 2;
                }
            }

            chunks.push(text.slice(position, end));
            position = end;
        }

        return chunks;
    }

    /**
     * 让出主线程
     * @private
     * @returns {Promise<void>}
     */
    async _yield() {
        if (this.DELAY > 0) {
            await new Promise(resolve => setTimeout(resolve, this.DELAY));
        } else {
            // 使用 setTimeout 让出主线程
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }

    /**
     * 解析并统计信息
     * @param {string} markdown - Markdown 内容
     * @returns {Promise<Object>} { html, stats }
     */
    async parseWithStats(markdown) {
        const stats = this._calculateStats(markdown);

        let html;
        if (markdown.length > this.CHUNK_SIZE * 2) {
            html = await this.parseChunked(markdown);
        } else {
            html = this.parse(markdown);
        }

        return { html, stats };
    }

    /**
     * 计算 Markdown 统计信息
     * @private
     * @param {string} markdown - Markdown 内容
     * @returns {Object} 统计信息
     */
    _calculateStats(markdown) {
        const lines = markdown.split('\n');
        const chars = markdown.length;
        const words = markdown.split(/\s+/).filter(w => w.length > 0).length;

        // 统计标题
        const headings = lines.filter(line => line.trim().startsWith('#')).length;

        // 统计代码块
        const codeBlocks = (markdown.match(/```/g) || []).length / 2;

        // 统计图片
        const images = (markdown.match(/!\[.*?\]\(.*?\)/g) || []).length;

        // 统计链接
        const links = (markdown.match(/\[.*?\]\(.*?\)/g) || []).length;

        return {
            lines: lines.length,
            characters: chars,
            words: words,
            headings: headings,
            codeBlocks: Math.floor(codeBlocks),
            images: images,
            links: links
        };
    }

    /**
     * 获取估计的解析时间（毫秒）
     * @param {string} markdown - Markdown 内容
     * @returns {number} 估计时间
     */
    estimateParseTime(markdown) {
        if (!markdown) return 0;

        const length = markdown.length;
        const chunks = Math.ceil(length / this.CHUNK_SIZE);
        const timePerChunk = 10; // 每块约 10ms

        return chunks * timePerChunk;
    }

    /**
     * 取消正在进行的解析
     * 注意：当前实现中无法真正取消，但可以用于未来扩展
     */
    cancel() {
        // 未来可以添加取消令牌支持
        console.log('解析已取消');
    }
}

/**
 * MarkdownParserPool 类
 * 管理解析器实例池
 */
export class MarkdownParserPool {
    constructor() {
        this.parsers = new Map();
        this.defaultParser = new MarkdownParser();
    }

    /**
     * 获取解析器实例
     * @param {string} key - 解析器键名
     * @param {Object} options - 配置选项
     * @returns {MarkdownParser} 解析器实例
     */
    getParser(key = 'default', options = {}) {
        if (!this.parsers.has(key)) {
            this.parsers.set(key, new MarkdownParser(options));
        }
        return this.parsers.get(key);
    }

    /**
     * 移除解析器实例
     * @param {string} key - 解析器键名
     */
    removeParser(key) {
        this.parsers.delete(key);
    }

    /**
     * 清空所有解析器
     */
    clear() {
        this.parsers.clear();
    }
}

/**
 * 创建默认解析器实例
 */
export const defaultParser = new MarkdownParser();

/**
 * 便捷方法：解析 Markdown
 * @param {string} markdown - Markdown 内容
 * @returns {string} HTML 字符串
 */
export function parseMarkdown(markdown) {
    return defaultParser.parse(markdown);
}

/**
 * 便捷方法：异步解析 Markdown
 * @param {string} markdown - Markdown 内容
 * @param {Function} onProgress - 进度回调
 * @returns {Promise<string>} HTML 字符串
 */
export async function parseMarkdownAsync(markdown, onProgress) {
    return defaultParser.parseChunked(markdown, onProgress);
}

export default MarkdownParser;
