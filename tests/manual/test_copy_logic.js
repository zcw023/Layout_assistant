// 测试复制逻辑

// 1. 模拟 Markdown
const testContent = '# 测试标题\n\n这是正文，**加粗文字**和*斜体*。\n\n> 引用块\n\n---\n\n另一段';

// 2. 模拟 marked.parse
function mockParse(md) {
    return md
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
        .replace(/^---$/gm, '<hr>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[hbe]|<hr)(.+)$/gm, '<p>$1</p>');
}

const html = mockParse(testContent);
console.log('原始 HTML:');
console.log(html);
console.log('');

// 3. 模拟主题配置
const theme = {
    container: 'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:15.5px;line-height:1.75;color:#1a1a1a;background:#ffffff;',
    h1: 'font-size:36px;font-weight:800;color:#000;margin:40px 0 28px;line-height:1.2;letter-spacing:-1px;text-transform:uppercase;',
    p: 'margin:16px 0;',
    strong: 'font-weight:700;color:#000;background:linear-gradient(transparent 60%,#ffeb3b 60%);padding:0 2px;',
    em: 'font-style:italic;',
    blockquote: 'margin:32px 0;padding:24px 28px;background:#000;color:#fff;font-size:18px;font-weight:500;line-height:1.6;',
    hr: 'border:none;height:4px;background:#000;margin:40px 0;'
};

// 4. 模拟复制逻辑
function generateStyledHtml(html, theme) {
    // 简单替换 - 实际应该解析 DOM
    let styled = '<div style="' + theme.container + '">';
    
    // 替换各个标签
    styled += html
        .replace(/<h1>/g, '<h1 style="' + theme.h1 + '">')
        .replace(/<p>/g, '<p style="' + theme.p + '">')
        .replace(/<strong>/g, '<strong style="' + theme.strong + '">')
        .replace(/<em>/g, '<em style="' + theme.em + '">')
        .replace(/<blockquote>/g, '<blockquote style="' + theme.blockquote + '">')
        .replace(/<hr>/g, '<hr style="' + theme.hr + '">');
    
    styled += '</div>';
    return styled;
}

const styledHtml = generateStyledHtml(html, theme);

console.log('生成的带样式 HTML:');
console.log(styledHtml.substring(0, 800));
console.log('...');
console.log('');

// 5. 验证关键点
console.log('验证:');
console.log('- 包含 container style:', styledHtml.includes('font-family:-apple-system') ? '✅' : '❌');
console.log('- 包含 h1 36px:', styledHtml.includes('font-size:36px') ? '✅' : '❌');
console.log('- 包含 h1 800:', styledHtml.includes('font-weight:800') ? '✅' : '❌');
console.log('- 包含 strong 背景色:', styledHtml.includes('#ffeb3b') ? '✅' : '❌');
console.log('- 包含 blockquote 黑底:', styledHtml.includes('background:#000') ? '✅' : '❌');
