/**
 * 微信公众号排版助手 - 修复版
 * 增加错误处理和调试信息
 */

const state = { currentTheme: 'chenlu', inputMode: 'markdown' };
let elements = {};

// 常量配置
const CONSTANTS = {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_PASTE_SIZE: 5 * 1024 * 1024, // 5MB
    PREVIEW_DELAY: 100,
    TOAST_DURATION: 3000,
    DEBOUNCE_DELAY: 300
};

/**
 * 将 Markdown 任务清单的 checkbox（<input type="checkbox">）转换为纯文本符号，
 * 避免复制到公众号后 checkbox 被丢失/样式不一致。
 * - 已完成: ☑
 * - 未完成: ☐
 */
/**
 * 防抖函数 - 优化输入性能
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 将 Markdown 任务清单的 checkbox（<input type="checkbox">）转换为纯文本符号，
 * 避免复制到公众号后 checkbox 被丢失/样式不一致。
 * - 已完成: ☑
 * - 未完成: ☐
 */
function replaceTaskListCheckboxes(container) {
    if (!container || typeof container.querySelectorAll !== 'function') return;
    const inputs = container.querySelectorAll('input[type="checkbox"]');
    inputs.forEach(input => {
        const checked = input.checked || input.getAttribute('checked') !== null;
        const textNode = document.createTextNode(checked ? '☑ ' : '☐ ');
        if (input.parentNode) input.parentNode.replaceChild(textNode, input);
    });
}

/**
 * 移除所有 SVG 元素（按需求：不再支持任何 SVG 装饰）
 */
function removeAllSvg(container) {
    if (!container || typeof container.querySelectorAll !== 'function') return;
    container.querySelectorAll('svg').forEach(svg => svg.remove());
}

function isProbablyHtml(input) {
    if (!input || typeof input !== 'string') return false;
    return /<\/?[a-z][\s\S]*>/i.test(input);
}

function sanitizeHtml(html) {
    if (!html || typeof html !== 'string') return '';
    if (typeof DOMPurify !== 'undefined' && DOMPurify && typeof DOMPurify.sanitize === 'function') {
        return DOMPurify.sanitize(html, {
            // 尽量保留结构（标题/段落/列表/表格/图片/代码）
            ALLOWED_TAGS: [
                'h1','h2','h3','h4','h5','h6',
                'p','div','br','hr',
                'strong','b','em','i','u','s','del',
                'a',
                'blockquote',
                'ul','ol','li',
                'code','pre',
                'img',
                'table','thead','tbody','tr','th','td'
            ],
            // 不允许 style/class/id（避免飞书原样式污染主题）
            ALLOWED_ATTR: ['href','src','alt','title','target','rel','rowspan','colspan'],
            ALLOW_DATA_ATTR: false,
            KEEP_CONTENT: true
        });
    }
    return html;
}

// 将飞书（富文本）粘贴内容尽量归一成“微信友好”的结构（弱化 div/span）
function normalizeFeishuHtml(html) {
    if (!html || typeof html !== 'string') return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.body;

    function isEmptyBlock(el) {
        if (!el || el.nodeType !== 1) return false;
        const tag = el.tagName.toLowerCase();
        if (tag !== 'p' && tag !== 'div') return false;

        // 有这些内容就不算空
        if (el.querySelector && el.querySelector('img,table,ul,ol,pre,blockquote,h1,h2,h3,h4,h5,h6')) return false;

        const text = (el.textContent || '').replace(/\u00a0/g, ' ').trim();
        if (text) return false;

        // 只包含 br / 空白
        const onlyBrOrWhitespace = Array.from(el.childNodes).every(n => {
            if (n.nodeType === 3) return !n.textContent || !n.textContent.trim();
            if (n.nodeType === 1) return n.tagName && n.tagName.toLowerCase() === 'br';
            return true;
        });
        return onlyBrOrWhitespace;
    }

    // 移除 svg
    body.querySelectorAll('svg').forEach(n => n.remove());

    // 删除多余的 span（保留其文本/子节点）
    body.querySelectorAll('span').forEach(span => {
        const frag = doc.createDocumentFragment();
        while (span.firstChild) frag.appendChild(span.firstChild);
        span.replaceWith(frag);
    });

    // 把顶层 div 转成 p（避免 div 在复制时无样式导致排版松散）
    Array.from(body.children).forEach(child => {
        if (child.tagName && child.tagName.toLowerCase() === 'div') {
            const p = doc.createElement('p');
            p.innerHTML = child.innerHTML;
            child.replaceWith(p);
        }
    });

    // 清理顶部多余空行（飞书粘贴常见：<div><br></div> / <p><br></p>）
    while (body.firstChild) {
        const n = body.firstChild;
        if (n.nodeType === 3 && (!n.textContent || !n.textContent.trim())) {
            n.remove();
            continue;
        }
        if (n.nodeType === 1) {
            const tag = n.tagName.toLowerCase();
            if (tag === 'br') {
                n.remove();
                continue;
            }
            if (isEmptyBlock(n)) {
                n.remove();
                continue;
            }
        }
        break;
    }

    return body.innerHTML;
}

function stripLeadingBlankBlocks(container) {
    if (!container || typeof container.firstChild === 'undefined') return;
    while (container.firstChild) {
        const n = container.firstChild;
        if (n.nodeType === 3 && (!n.textContent || !n.textContent.trim())) {
            n.remove();
            continue;
        }
        if (n.nodeType === 1) {
            const tag = n.tagName.toLowerCase();
            if (tag === 'br') {
                n.remove();
                continue;
            }
            if ((tag === 'p' || tag === 'div') && (!n.textContent || !n.textContent.replace(/\u00a0/g, ' ').trim()) && !n.querySelector('img,table,ul,ol,pre,blockquote,h1,h2,h3,h4,h5,h6')) {
                n.remove();
                continue;
            }
        }
        break;
    }
}

function setInputMode(mode) {
    const next = mode === 'feishu' ? 'feishu' : 'markdown';
    state.inputMode = next;

    const isFeishu = next === 'feishu';
    if (elements.editor) elements.editor.hidden = isFeishu;
    if (elements.feishuEditor) elements.feishuEditor.hidden = !isFeishu;

    if (elements.modeButtons && elements.modeButtons.length) {
        elements.modeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-mode') === next);
        });
    }

    updatePreview();
}

function getSourceFromInput() {
    if (state.inputMode === 'feishu') {
        return (elements.feishuEditor && elements.feishuEditor.innerHTML) ? elements.feishuEditor.innerHTML : '';
    }
    return elements.editor ? elements.editor.value : '';
}

function getHtmlForPreviewAndCopy() {
    const source = getSourceFromInput().trim();
    if (!source) return '';

    if (state.inputMode === 'feishu') {
        return sanitizeHtml(normalizeFeishuHtml(source));
    }

    // markdown 模式：允许粘贴 HTML 直接预览/复制
    if (source.startsWith('<') || isProbablyHtml(source)) {
        return sanitizeHtml(source);
    }

    return sanitizeHtml(marked.parse(source));
}

function setFileInfo(text) {
    if (!elements.fileInfo) return;
    elements.fileInfo.textContent = text || '未选择文件';
}

function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(reader.error || new Error('读取文件失败'));
        reader.readAsText(file);
    });
}

function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error || new Error('读取文件失败'));
        reader.readAsArrayBuffer(file);
    });
}

async function handleUploadedFile(file) {
    if (!file) return;

    // 验证文件大小
    if (file.size > CONSTANTS.MAX_FILE_SIZE) {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
        showToast(`❌ 文件过大 (${sizeMB}MB)，请上传小于 ${CONSTANTS.MAX_FILE_SIZE / (1024 * 1024)}MB 的文件`);
        return;
    }

    const name = file.name || '';
    const ext = (name.split('.').pop() || '').toLowerCase();
    setFileInfo(name);

    try {
        // Markdown / Text
        if (ext === 'md' || ext === 'markdown' || ext === 'txt') {
            const text = await readFileAsText(file);
            setInputMode('markdown');
            if (elements.editor) elements.editor.value = text;
            updatePreview();
            showToast('✅ 文件已导入（Markdown）');
            return;
        }

        // Word (.docx) -> HTML（切换到飞书模式承载富文本结构）
        if (ext === 'docx') {
            if (typeof mammoth === 'undefined' || !mammoth || typeof mammoth.convertToHtml !== 'function') {
                showToast('❌ Word 解析库未加载（mammoth）');
                return;
            }
            const arrayBuffer = await readFileAsArrayBuffer(file);
            const result = await mammoth.convertToHtml({ arrayBuffer });
            const html = result && result.value ? result.value : '';
            setInputMode('feishu');
            if (elements.feishuEditor) {
                elements.feishuEditor.innerHTML = sanitizeHtml(normalizeFeishuHtml(html));
            }
            updatePreview();
            showToast('✅ Word 已导入');
            return;
        }

        showToast('⚠️ 不支持的文件类型');
    } catch (err) {
        console.error('文件导入失败:', err);
        showToast('❌ 导入失败：' + (err && err.message ? err.message : '未知错误'));
    }
}

/**
 * 解析 style 字符串为对象（key 为小写 CSS 属性名）
 */
function parseInlineStyle(styleStr) {
    const map = {};
    if (!styleStr || typeof styleStr !== 'string') return map;

    styleStr
        .split(';')
        .map(s => s.trim())
        .filter(Boolean)
        .forEach(decl => {
            const idx = decl.indexOf(':');
            if (idx <= 0) return;
            const prop = decl.slice(0, idx).trim().toLowerCase();
            const value = decl.slice(idx + 1).trim();
            if (!prop) return;
            map[prop] = value;
        });

    return map;
}

/**
 * 从 background/background-color 中提取一个“可用于 bgcolor”的纯色值
 * - 渐变：取第一个出现的颜色（#hex 或 rgb/rgba）
 */
function pickBgColorForWechat(backgroundValue) {
    if (!backgroundValue || typeof backgroundValue !== 'string') return null;

    const hex = backgroundValue.match(/#(?:[0-9a-fA-F]{3,8})/);
    if (hex) return hex[0];

    const rgb = backgroundValue.match(/rgba?\([^)]+\)/i);
    if (rgb) return rgb[0];

    return null;
}

/**
 * 为公众号复制构建“可保留背景”的外层包装（尽量用 table/td 的 bgcolor）。
 * 返回 { open, close } 字符串。
 */
function buildWechatBackgroundWrapper(containerStyle) {
    const styleMap = parseInlineStyle(containerStyle);
    const backgroundValue = styleMap['background-color'] || styleMap['background'] || '';
    const bgColor = pickBgColorForWechat(backgroundValue);

    // 移除背景相关字段，避免重复/被微信编辑器清洗时影响其余样式
    delete styleMap['background-color'];
    delete styleMap['background'];

    const styleWithoutBg = Object.entries(styleMap)
        .map(([k, v]) => `${k}:${v}`)
        .join(';');

    if (!bgColor) {
        return {
            open: '<div style="' + (containerStyle || '') + '">',
            close: '</div>'
        };
    }

    // table + td bgcolor：公众号里通常比 div background 更容易保留
    const safeBg = escapeHtml(bgColor);
    const tdStyle = (styleWithoutBg ? styleWithoutBg + ';' : '') + `background-color:${bgColor};`;

    return {
        open:
            `<table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${safeBg}" ` +
            `style="width:100%;border-collapse:collapse;background-color:${bgColor};">` +
            `<tbody><tr><td style="${tdStyle}">`,
        close: '</td></tr></tbody></table>'
    };
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('=== 应用初始化开始 ===');

    // 检查依赖库（更友好的错误提示）
    if (typeof marked === 'undefined') {
        console.error('❌ marked.js 未加载！');
        showToast('❌ 加载失败：请刷新页面重试（网络问题）');
        return;
    }

    if (typeof WECHAT_THEMES === 'undefined') {
        console.error('❌ themes.js 未加载！');
        showToast('❌ 加载失败：请刷新页面重试（主题文件缺失）');
        return;
    }

    // 检查关键库（可选降级）
    if (typeof DOMPurify === 'undefined') {
        console.warn('⚠️ DOMPurify 未加载，XSS 防护功能受限');
        showToast('⚠️ 安全组件加载失败，建议刷新页面');
    }

    if (typeof mammoth === 'undefined') {
        console.warn('⚠️ mammoth.js 未加载，Word 导入功能不可用');
    }

    // 初始化代码高亮
    if (typeof hljs !== 'undefined' && hljs) {
        hljs.highlightAll();
        console.log('✅ 代码高亮初始化完成');
    } else {
        console.warn('⚠️ highlight.js 未加载，代码块无高亮');
    }

    console.log('✅ 依赖库加载正常');

    // 获取元素
    elements = {
        editor: document.getElementById('editor'),
        feishuEditor: document.getElementById('feishu-editor'),
        preview: document.getElementById('preview-content'),
        themeSelect: document.getElementById('theme-select'),
        fileUpload: document.getElementById('file-upload'),
        fileInfo: document.getElementById('file-info'),
        copyBtn: document.getElementById('copy-btn'),
        resetBtn: document.getElementById('reset-btn'),
        toast: document.getElementById('toast'),
        modeButtons: Array.from(document.querySelectorAll('.mode-btn'))
    };

    if (!elements.editor) {
        console.error('❌ 找不到编辑器元素');
        return;
    }

    console.log('✅ DOM 元素获取成功');
    setFileInfo('未选择文件');

    // 配置 marked
    try {
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: false,
            sanitize: false
        });
        console.log('✅ marked 配置完成');
    } catch (e) {
        console.error('❌ marked 配置失败:', e);
    }

    // 绑定模式切换
    if (elements.modeButtons && elements.modeButtons.length) {
        elements.modeButtons.forEach(btn => {
            btn.addEventListener('click', () => setInputMode(btn.getAttribute('data-mode')));
        });
    }

    // 绑定事件 - 使用防抖优化性能
    const debouncedUpdate = debounce(updatePreview, CONSTANTS.DEBOUNCE_DELAY);

    elements.editor.addEventListener('input', function() {
        console.log('编辑器输入事件触发');
        debouncedUpdate();
    });

    if (elements.feishuEditor) {
        elements.feishuEditor.addEventListener('input', function() {
            debouncedUpdate();
        });
    }

    // 上传文件
    if (elements.fileUpload) {
        elements.fileUpload.addEventListener('change', async function(e) {
            const file = e.target && e.target.files ? e.target.files[0] : null;
            if (!file) return;
            await handleUploadedFile(file);
        });
    }

    // 在 Markdown 模式粘贴飞书富文本时，自动切换到"飞书文档"模式
    elements.editor.addEventListener('paste', function(e) {
        try {
            const html = e.clipboardData && e.clipboardData.getData ? e.clipboardData.getData('text/html') : '';

            // 验证粘贴内容大小
            if (html && html.length > CONSTANTS.MAX_PASTE_SIZE) {
                const sizeMB = (html.length / (1024 * 1024)).toFixed(1);
                showToast(`⚠️ 内容过大 (${sizeMB}MB)，请分段粘贴`);
                e.preventDefault();
                return;
            }

            if (html && isProbablyHtml(html)) {
                e.preventDefault();
                setInputMode('feishu');
                const cleaned = sanitizeHtml(normalizeFeishuHtml(html));
                if (elements.feishuEditor) elements.feishuEditor.innerHTML = cleaned;
                showToast('✅ 已识别飞书富文本，已切换到"飞书文档"模式');
            }
        } catch (_) {}
    });

    // 飞书模式：优先读取剪贴板 HTML，避免默认插入杂乱样式
    if (elements.feishuEditor) {
        elements.feishuEditor.addEventListener('paste', function(e) {
            try {
                const html = e.clipboardData && e.clipboardData.getData ? e.clipboardData.getData('text/html') : '';

                // 验证粘贴内容大小
                if (html && html.length > CONSTANTS.MAX_PASTE_SIZE) {
                    const sizeMB = (html.length / (1024 * 1024)).toFixed(1);
                    showToast(`⚠️ 内容过大 (${sizeMB}MB)，请分段粘贴`);
                    e.preventDefault();
                    return;
                }

                if (html && isProbablyHtml(html)) {
                    e.preventDefault();
                    const cleaned = sanitizeHtml(normalizeFeishuHtml(html));
                    elements.feishuEditor.innerHTML = cleaned;
                    updatePreview();
                }
            } catch (_) {}
        });
    }

    elements.themeSelect.addEventListener('change', function(e) {
        console.log('主题切换:', e.target.value);
        state.currentTheme = e.target.value;
        updatePreview();
    });

    elements.resetBtn.addEventListener('click', function() {
        console.log('重置按钮点击');
        elements.editor.value = '';
        if (elements.feishuEditor) elements.feishuEditor.innerHTML = '';
        if (elements.fileUpload) elements.fileUpload.value = '';
        setFileInfo('未选择文件');
        updatePreview();
        showToast('🗑️ 已清空');
    });

    elements.copyBtn.addEventListener('click', function() {
        console.log('复制按钮点击');
        copyToWechat();
    });

    // 页面加载后立即更新一次预览
    console.log('=== 应用初始化完成，执行首次预览更新 ===');
    setTimeout(updatePreview, 100);
});

function updatePreview() {
    console.log('updatePreview 被调用');

    const source = getSourceFromInput();
    const content = source.trim();
    console.log('内容长度:', content.length, '模式:', state.inputMode);

    if (!content) {
        elements.preview.innerHTML = '<div class="placeholder">✨ 在左侧粘贴内容或上传文件<br>精美的排版预览将在这里呈现</div>';
        // 预览不再依赖主题背景色（公众号粘贴通常不保留 background）
        elements.preview.className = 'wechat-content';
        return;
    }

    try {
        const html = getHtmlForPreviewAndCopy();

        // 统一处理任务清单 checkbox，使预览效果更接近公众号粘贴效果
        const temp = document.createElement('div');
        temp.innerHTML = html;
        stripLeadingBlankBlocks(temp);
        replaceTaskListCheckboxes(temp);

        // 预览使用“和复制一致”的内联样式，而不是依赖 CSS 主题类
        // 这样你在右侧看到的效果更接近公众号粘贴后的效果（尤其是背景色相关差异）
        let rendered = temp.innerHTML;

        // 按需求：移除所有 SVG
        removeAllSvg(temp);
        rendered = temp.innerHTML;

        elements.preview.innerHTML = '<div class="content-inner">' + rendered + '</div>';
        elements.preview.className = 'wechat-content';

        // 应用主题内联样式（来自 themes.js）
        const inner = elements.preview.querySelector('.content-inner');
        if (inner && typeof applyWechatStyles === 'function') {
            applyWechatStyles(inner, state.currentTheme);
        }

        // 应用代码高亮（微信原生格式不需要特殊处理，只需确保格式正确）
        if (typeof hljs !== 'undefined' && hljs) {
            // 转换所有 pre 代码块为微信原生格式
            inner.querySelectorAll('pre').forEach((pre) => {
                const code = pre.querySelector('code');
                const codeContent = code ? (code.textContent || code.innerText || '') : (pre.textContent || pre.innerText || '');

                // 创建微信原生代码块结构
                const wrapper = document.createElement('section');
                wrapper.style.cssText = 'padding: 15px; border: 1px solid rgb(209, 209, 209); border-radius: 4px; margin: 16px 0px; background: rgb(248, 248, 248);';

                const newPre = document.createElement('pre');
                newPre.style.cssText = 'white-space: pre-wrap; word-break: break-word; font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; font-size: 14px; line-height: 1.6; margin: 0px; padding: 0px; overflow-x: auto; color: rgb(51, 51, 51);';
                newPre.textContent = codeContent;

                wrapper.appendChild(newPre);
                pre.replaceWith(wrapper);
            });

            // 处理行内代码
            inner.querySelectorAll('code').forEach((codeEl) => {
                // 跳过已经在 pre 中的 code
                if (codeEl.closest('pre')) return;

                codeEl.style.cssText = 'padding: 2px 6px; background-color: rgb(248, 248, 248); border: 1px solid rgb(209, 209, 209); border-radius: 4px; font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; font-size: 0.9em; color: rgb(233, 30, 99);';
            });
        }

        console.log('预览更新完成');

    } catch (error) {
        console.error('updatePreview 错误:', error);
        elements.preview.innerHTML = '<div class="placeholder" style="color:red;">❌ 解析失败: ' + error.message + '</div>';
    }
}

// 关键：复制到微信
async function copyToWechat() {
    const content = getSourceFromInput().trim();
    if (!content) {
        showToast('⚠️ 没有内容');
        return;
    }

    let themeName = state.currentTheme;
    let theme = WECHAT_THEMES[themeName];

    if (!theme) {
        // 主题被移除或不存在时，自动回退到默认主题，避免复制失败
        themeName = 'chenlu';
        state.currentTheme = themeName;
        if (elements.themeSelect) elements.themeSelect.value = themeName;
        theme = WECHAT_THEMES[themeName];
    }

    console.log('开始复制到微信，主题:', themeName);

    try {
        // 输入源 -> HTML（Markdown / 飞书富文本）
        let html = getHtmlForPreviewAndCopy();

        // 外链转脚注收集器（iter-01 平台兜底）
        const footnotes = [];

        // 构建带内联样式的 HTML
        // 关键：背景色在公众号里经常会被清洗，优先用 table/td bgcolor 包裹
        const wrapper = buildWechatBackgroundWrapper(theme.container || '');
        let styled = wrapper.open;

        // 解析 HTML
        const temp = document.createElement('div');
        temp.innerHTML = html;
        stripLeadingBlankBlocks(temp);
        // 关键：把任务清单 checkbox 转成文本，保证公众号可见且样式一致
        replaceTaskListCheckboxes(temp);
        // 按需求：移除所有 SVG
        removeAllSvg(temp);

        // 遍历所有顶级元素
        Array.from(temp.childNodes).forEach(function(node) {
            if (node.nodeType === 3) { // 文本节点
                if (node.textContent.trim()) {
                    styled += '<p style="' + (theme.p || '') + '">' + escapeHtml(node.textContent) + '</p>';
                }
            } else if (node.nodeType === 1) { // 元素节点
                styled += processElement(node, theme, themeName, footnotes);
            }
        });

        // 文末脚注区（外链转脚注的落点，iter-01）
        if (footnotes.length) {
            styled += '<div style="margin:32px 0 0;padding:16px 0 0;border-top:1px solid #e5e5e5;font-size:13px;color:#999;line-height:1.8;">';
            footnotes.forEach(function(f, i) {
                styled += '<p style="margin:4px 0;">[' + (i + 1) + '] ' + escapeHtml(f.text) +
                          '：<span style="word-break:break-all;color:#bbb;">' + escapeHtml(f.href) + '</span></p>';
            });
            styled += '</div>';
        }

        styled += wrapper.close;

        console.log('生成 HTML 长度:', styled.length);

        // 复制到剪贴板
        if (navigator.clipboard && navigator.clipboard.write) {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': new Blob([styled], { type: 'text/html' })
                })
            ]);
            console.log('✅ 复制成功');
            showToast('✅ 已复制到剪贴板');
        } else {
            // 降级方案
            console.log('使用降级复制方案');
            fallbackCopy(styled);
        }
    } catch (error) {
        console.error('复制失败:', error);
        showToast('❌ 复制失败: ' + error.message);
    }
}

// 辅助函数：处理元素的所有子节点
function processElementChildren(el, theme, themeName, footnotes) {
    let result = '';
    Array.from(el.childNodes).forEach(function(child) {
        if (child.nodeType === 3) { // 文本节点
            result += escapeHtml(child.textContent);
        } else if (child.nodeType === 1) { // 元素节点
            result += processElement(child, theme, themeName, footnotes);
        }
    });
    return result;
}

// 处理单个元素
function processElement(el, theme, themeName, footnotes) {
    const tag = el.tagName.toLowerCase();

    // void 元素
    if (tag === 'br') {
        return '<br>';
    }
    if (tag === 'hr') {
        const baseStyle = theme.hr || '';
        const existingStyle = el.getAttribute('style') || '';
        const style = cleanStyleValue((baseStyle || '') + (existingStyle || ''));
        return '<hr' + (style ? ' style="' + style + '"' : '') + '>';
    }

    // 特殊处理 img
    if (tag === 'img') {
        const src = escapeHtml(el.getAttribute('src') || '');
        const alt = escapeHtml(el.getAttribute('alt') || '');
        return '<img src="' + src + '" alt="' + alt + '" style="' + (theme.img || 'max-width:100%;height:auto;display:block;margin:20px auto;') + '">';
    }

    // 特殊处理 pre 代码块 - 使用微信公众号原生代码块格式
    if (tag === 'pre') {
        // 提取代码内容
        let codeContent = '';
        const codeEl = el.querySelector('code');
        if (codeEl) {
            codeContent = codeEl.textContent || codeEl.innerText || '';
        } else {
            codeContent = el.textContent || el.innerText || '';
        }

        // 使用微信公众号原生的代码块格式
        // section 标签 + 特定 class 是微信编辑器的代码块组件格式
        const codeBlock = `
<section style="padding: 15px; border: 1px solid rgb(209, 209, 209); border-radius: 4px; margin: 16px 0px; background: rgb(248, 248, 248);">
  <pre style="white-space: pre-wrap; word-break: break-word; font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, monospace; font-size: 14px; line-height: 1.6; margin: 0px; padding: 0px; overflow-x: auto; color: rgb(51, 51, 51);">${escapeHtml(codeContent)}</pre>
</section>`;

        return codeBlock;
    }

    // 特殊处理 a 链接（iter-01 平台兜底）
    if (tag === 'a') {
        const href = el.getAttribute('href') || '';
        const inner = processElementChildren(el, theme, themeName, footnotes);
        const aStyle = theme.a || 'color:#576b95;text-decoration:underline;';
        // 页内锚点：微信不支持跳转，移除 href 只留视觉
        if (href.startsWith('#')) {
            return '<a style="' + aStyle + '">' + inner + '</a>';
        }
        // 外链（非公众号文章链接）：转脚注 [n] + 文末脚注列表
        if (href && !/^https?:\/\/mp\.weixin\.qq\.com/i.test(href)) {
            const n = (footnotes ? footnotes.length : 0) + 1;
            if (footnotes) footnotes.push({ text: el.textContent || inner, href: href });
            return '<span style="' + aStyle + '">' + inner + '</span><sup style="font-size:12px;color:#999;padding-left:3px;">[' + n + ']</sup>';
        }
        // 公众号文章链接：保留
        return '<a href="' + escapeHtml(href) + '" style="' + aStyle + '">' + inner + '</a>';
    }

    // 获取样式
    const baseStyle = theme[tag] || '';
    const existingStyle = el.getAttribute('style') || '';
    const style = cleanStyleValue((baseStyle || '') + (existingStyle || ''));

    // 特殊处理 code（行内代码）- 使用微信原生格式
    if (tag === 'code' && el.parentElement.tagName.toLowerCase() !== 'pre') {
        const codeStyle = 'padding: 2px 6px; background-color: rgb(248, 248, 248); border: 1px solid rgb(209, 209, 209); border-radius: 4px; font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; font-size: 0.9em; color: rgb(233, 30, 99);';
        return '<code style="' + codeStyle + '">' + escapeHtml(el.textContent || el.innerText || '') + '</code>';
    }

    // 允许的属性（最小集合，避免把不安全属性带进公众号）
    const ATTR_ALLOW = {
        a: ['href', 'title', 'target', 'rel'],
        th: ['colspan', 'rowspan'],
        td: ['colspan', 'rowspan'],
        table: ['cellpadding', 'cellspacing', 'border'],
        code: ['class'],
        pre: ['class']
    };

    function serializeAllowedAttrs(node) {
        const allow = ATTR_ALLOW[tag] || [];
        if (allow.length === 0) return '';
        let attrs = '';
        allow.forEach(name => {
            if (!node.hasAttribute || !node.hasAttribute(name)) return;
            const val = node.getAttribute(name);
            if (val == null || val === '') return;
            attrs += ' ' + name + '="' + escapeHtml(String(val)) + '"';
        });
        return attrs;
    }

    // 构建标签
    const attrs = serializeAllowedAttrs(el);
    let result = '<' + tag + attrs + (style ? ' style="' + style + '"' : '') + '>';

    // 处理子节点
    result += processElementChildren(el, theme, themeName, footnotes);

    result += '</' + tag + '>';
    return result;
}

// HTML 转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 清理 style 值中的无效声明（iter-01 平台兜底）
// 过滤 "prop: undefined;" 等 juice/微信解析器会报错的片段
function cleanStyleValue(s) {
    return (s || '')
        .replace(/[^;]+:\s*undefined\s*;?/gi, '')
        .replace(/;{2,}/g, ';')
        .replace(/^\s*;/, '')
        .replace(/;\s*$/, '')
        .trim();
}

// 降级复制
function fallbackCopy(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    temp.style.cssText = 'position:fixed;left:-9999px;';
    document.body.appendChild(temp);

    const range = document.createRange();
    range.selectNodeContents(temp);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    try {
        document.execCommand('copy');
        console.log('✅ 降级复制成功');
        showToast('✅ 已复制');
    } catch (e) {
        console.error('降级复制也失败:', e);
        showToast('❌ 复制失败，请手动复制');
    }

    sel.removeAllRanges();
    document.body.removeChild(temp);
}

function showToast(msg) {
    if (!elements.toast) return;
    elements.toast.textContent = msg;
    elements.toast.classList.add('show');
    setTimeout(function() {
        elements.toast.classList.remove('show');
    }, 3000);
}

// ============================================
// 键盘快捷键支持
// ============================================
document.addEventListener('keydown', function(e) {
    if (!elements.editor) return;

    // 只在编辑器聚焦时生效的快捷键
    if (document.activeElement === elements.editor) {
        // Command/Ctrl + Enter = 复制到微信
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault();
            copyToWechat();
        }

        // Command/Ctrl + S = 提示使用复制功能
        if ((e.metaKey || e.ctrlKey) && e.key === 's') {
            e.preventDefault();
            showToast('💡 使用 Command+Enter 复制到微信');
        }

        // Command/Ctrl + K = 清空编辑器
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            elements.editor.value = '';
            updatePreview();
            showToast('🗑️ 已清空');
        }
    }

    // 全局快捷键

    // Command/Ctrl + Shift + C = 复制
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        copyToWechat();
    }

    // Command/Ctrl + 1-5 = 快速切换主题
    if ((e.metaKey || e.ctrlKey) && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        // 已移除：赛博、东方美学、极夜、极简专业
        const themeMap = ['chenlu', 'dushi', 'senxi', 'guochao', 'wabi'];
        const index = parseInt(e.key) - 1;
        if (themeMap[index]) {
            state.currentTheme = themeMap[index];
            elements.themeSelect.value = themeMap[index];
            updatePreview();
            showToast('🎨 已切换主题: ' + themeMap[index]);
        }
    }
});

console.log('app.js 已加载');
