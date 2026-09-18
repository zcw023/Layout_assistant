// 微信兼容的主题样式 - 与 CSS 文件完全一致
const WECHAT_THEMES = {
    // 晨露 · 极简奶油
    chenlu: {
        container: 'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;font-size:16px;line-height:1.9;color:#3d3d3d;',
        h1: 'font-size:28px;font-weight:600;color:#1a1a1a;margin:48px 0 28px;padding-bottom:16px;border-bottom:2px solid #f0ebe3;letter-spacing:-0.5px;line-height:1.3;',
        h2: 'font-size:21px;font-weight:600;color:#2c2c2c;margin:40px 0 20px;padding-left:16px;border-left:3px solid #d4c4b0;letter-spacing:-0.3px;',
        h3: 'font-size:17px;font-weight:600;color:#3d3d3d;margin:28px 0 14px;',
        p: 'margin:18px 0;text-align:justify;text-justify:inter-ideograph;',
        strong: 'font-weight:600;color:#1a1a1a;',
        em: 'font-style:italic;color:#555;',
        blockquote: 'margin:28px 0;padding:24px 28px;border:1px solid #f0ebe3;border-left:4px solid #d4c4b0;border-radius:12px;color:#5a5a5a;font-style:italic;',
        img: 'max-width:100%;height:auto;display:block;margin:32px auto;border-radius:12px;',
        a: 'color:#8b7355;text-decoration:none;border-bottom:1px solid #d4c4b0;',
        code: 'font-family:SF Mono,Monaco,"Cascadia Code",monospace;border:1px solid #f0ebe3;color:#8b6914;padding:3px 8px;border-radius:5px;font-size:0.88em;',
        pre: 'padding:24px;border-radius:12px;overflow-x:auto;margin:24px 0;border:1px solid #f0ebe3;white-space:pre-wrap;word-break:break-word;font-family:SF Mono,Monaco,"Cascadia Code",monospace;font-size:13px;line-height:1.7;',
        ul: 'margin:20px 0;padding-left:2.2em;',
        ol: 'margin:20px 0;padding-left:2.2em;',
        li: 'margin:10px 0;padding-left:4px;',
        table: 'width:100%;border-collapse:separate;border-spacing:0;margin:28px 0;font-size:14px;',
        th: 'color:#3d3d3d;font-weight:600;padding:14px 16px;text-align:left;border-bottom:2px solid #e8e2d9;',
        td: 'padding:12px 16px;border-bottom:1px solid #f0ebe3;',
        hr: 'border:none;border-top:1px solid #e8e2d9;margin:48px 0;'
    },

    // 都市 · 杂志编辑
    dushi: {
        container: 'font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Segoe UI",sans-serif;font-size:15.5px;line-height:1.75;color:#1a1a1a;',
        h1: 'font-size:36px;font-weight:800;color:#000;margin:40px 0 28px;line-height:1.2;letter-spacing:-1px;text-transform:uppercase;',
        h2: 'font-size:22px;font-weight:700;color:#000;margin:40px 0 16px;padding-bottom:8px;border-bottom:3px solid #000;display:inline-block;',
        h3: 'font-size:16px;font-weight:700;color:#333;margin:28px 0 12px;text-transform:uppercase;letter-spacing:0.5px;',
        p: 'margin:16px 0;',
        strong: 'font-weight:700;color:#000;border-bottom:3px solid #ffeb3b;padding-bottom:1px;',
        em: 'font-style:italic;',
        blockquote: 'margin:32px 0;padding:24px 28px;border:2px solid #000;border-left:6px solid #000;color:#111;font-size:18px;font-weight:500;line-height:1.6;',
        img: 'max-width:100%;height:auto;display:block;margin:32px auto;',
        a: 'color:#000;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:3px;font-weight:600;',
        code: 'font-family:SF Mono,Monaco,monospace;border:1px solid #000;color:#e91e63;padding:3px 8px;border-radius:0;font-size:0.9em;font-weight:500;',
        pre: 'padding:24px;margin:24px 0;border:2px solid #000;color:#111;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:SF Mono,Monaco,monospace;font-size:13px;line-height:1.6;',
        ul: 'margin:20px 0;padding-left:1.8em;',
        ol: 'margin:20px 0;padding-left:1.8em;',
        li: 'margin:8px 0;',
        table: 'width:100%;border-collapse:collapse;margin:24px 0;font-size:14px;',
        th: 'color:#000;font-weight:700;padding:14px 16px;text-align:left;border-bottom:2px solid #000;',
        td: 'padding:12px 16px;border-bottom:1px solid #e0e0e0;',
        hr: 'border:none;border-top:4px solid #000;margin:40px 0;'
    },

    // 森系 · 自然治愈
    senxi: {
        container: 'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif;font-size:16px;line-height:1.9;color:#2d3a2d;',
        h1: 'font-size:29px;font-weight:600;color:#1a1a1a;margin:44px 0 24px;padding-bottom:16px;border-bottom:4px solid #4a7c59;letter-spacing:-0.5px;',
        h2: 'font-size:21px;font-weight:600;color:#2d5a3d;margin:36px 0 18px;padding-left:14px;border-left:4px solid #4a7c59;',
        h3: 'font-size:17px;font-weight:600;color:#3d6b4d;margin:26px 0 14px;',
        p: 'margin:18px 0;text-align:justify;',
        strong: 'font-weight:600;color:#1a1a1a;',
        em: 'font-style:italic;color:#4a5d4a;',
        blockquote: 'margin:28px 0;padding:22px 26px;border-radius:16px;border:1px solid #d0e0d0;border-left:4px solid #4a7c59;color:#4a5d4a;',
        img: 'max-width:100%;height:auto;display:block;margin:32px auto;border-radius:20px;',
        a: 'color:#4a7c59;text-decoration:none;border-bottom:1px solid #b8d4b8;',
        code: 'font-family:SF Mono,Monaco,monospace;border:1px solid #b8d4b8;color:#2d5a3d;padding:3px 8px;border-radius:6px;font-size:0.88em;',
        pre: 'padding:22px;border-radius:16px;margin:24px 0;border:1px solid #b8d4b8;color:#2d3a2d;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:SF Mono,Monaco,monospace;font-size:13px;',
        ul: 'margin:20px 0;padding-left:2.2em;',
        ol: 'margin:20px 0;padding-left:2.2em;',
        li: 'margin:10px 0;',
        hr: 'border:none;border-top:2px solid #b8d4b8;margin:44px 0;'
    },

    // ========== 新增 8 个主题 ==========

    // 新中式/国潮风
    guochao: {
        container: 'font-family:"Noto Serif SC","Source Han Serif SC","PingFang SC",serif;font-size:16px;line-height:2;color:#2b2b2b;',
        h1: 'font-size:32px;font-weight:700;color:#1a1a1a;margin:48px 0 24px;text-align:center;letter-spacing:4px;border-bottom:3px double #8b0000;padding-bottom:16px;',
        h2: 'font-size:22px;font-weight:600;color:#1a1a1a;margin:36px 0 18px;padding-left:20px;border-left:4px solid #c41e3a;',
        h3: 'font-size:18px;font-weight:600;color:#4a4a4a;margin:24px 0 12px;',
        p: 'margin:16px 0;text-align:justify;text-indent:2em;',
        strong: 'font-weight:700;color:#1a1a1a;',
        em: 'font-style:italic;color:#666;',
        blockquote: 'margin:28px 0;padding:20px 24px;border:1px solid #e0e0e0;border-left:4px solid #c41e3a;color:#555;font-style:italic;',
        img: 'max-width:100%;height:auto;display:block;margin:28px auto;border-radius:4px;border:1px solid #e0e0e0;padding:4px;',
        a: 'color:#8b0000;text-decoration:none;border-bottom:1px solid #c41e3a;',
        code: 'font-family:monospace;border:1px solid #e0e0e0;color:#8b4513;padding:2px 6px;border-radius:3px;font-size:0.9em;',
        pre: 'padding:20px;border:1px solid #e0e0e0;margin:20px 0;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:monospace;font-size:13px;line-height:1.6;',
        ul: 'margin:20px 0;padding-left:2.5em;',
        ol: 'margin:20px 0;padding-left:2.5em;',
        li: 'margin:10px 0;',
        hr: 'border:none;border-top:2px dashed #c41e3a;margin:40px 0;'
    },

    // 极简日式
    wabi: {
        container: 'font-family:"Hiragino Sans","Noto Sans JP","Yu Gothic",sans-serif;font-size:15px;line-height:2;color:#4a4a4a;',
        h1: 'font-size:26px;font-weight:400;color:#1a1a1a;margin:48px 0 32px;padding-bottom:24px;border-bottom:1px solid #d0d0d0;letter-spacing:2px;text-align:center;',
        h2: 'font-size:18px;font-weight:500;color:#333;margin:40px 0 20px;letter-spacing:1px;',
        h3: 'font-size:15px;font-weight:500;color:#555;margin:28px 0 12px;letter-spacing:0.5px;',
        p: 'margin:20px 0;',
        strong: 'font-weight:600;color:#1a1a1a;',
        em: 'font-style:italic;color:#777;',
        blockquote: 'margin:32px 0;padding:24px;color:#666;border-left:2px solid #999;font-size:14px;line-height:2.2;',
        img: 'max-width:100%;height:auto;display:block;margin:32px auto;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,0.08);',
        a: 'color:#333;text-decoration:none;border-bottom:1px solid #999;padding-bottom:2px;',
        code: 'font-family:monospace;border:1px solid #e8e8e8;color:#555;padding:2px 4px;font-size:0.85em;',
        pre: 'padding:20px;border-radius:2px;margin:20px 0;border:1px solid #e8e8e8;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:monospace;font-size:13px;line-height:2;',
        ul: 'margin:20px 0;padding-left:1.5em;list-style-type:"・";',
        ol: 'margin:20px 0;padding-left:1.5em;',
        li: 'margin:12px 0;color:#555;',
        hr: 'border:none;border-top:1px solid #e0e0e0;margin:48px 20%;'
    },

    // 复古胶片
    vintage: {
        container: 'font-family:"Georgia","Times New Roman",serif;font-size:16px;line-height:1.8;color:#3d3d3d;',
        h1: 'font-size:30px;font-weight:700;color:#2c241b;margin:44px 0 24px;text-align:center;border:3px double #8b7355;padding:20px;',
        h2: 'font-size:22px;font-weight:600;color:#4a3f35;margin:36px 0 18px;padding-bottom:8px;border-bottom:2px solid #a0826d;',
        h3: 'font-size:18px;font-weight:600;color:#5c4d3c;margin:24px 0 12px;font-style:italic;',
        p: 'margin:16px 0;text-align:justify;',
        strong: 'font-weight:700;color:#2c241b;',
        em: 'font-style:italic;color:#6b5b4f;',
        blockquote: 'margin:28px 0;padding:20px 24px;border:1px solid #d0c8b8;border-left:4px solid #8b7355;color:#5a4d3c;font-style:italic;',
        img: 'max-width:100%;height:auto;display:block;margin:28px auto;border:8px solid #fff;box-shadow:0 4px 15px rgba(0,0,0,0.15);filter:sepia(15%);',
        a: 'color:#8b4513;text-decoration:none;border-bottom:1px solid #a0826d;',
        code: 'font-family:monospace;border:1px solid #d0c8b8;color:#5c4d3c;padding:2px 6px;font-size:0.9em;',
        pre: 'padding:20px;border:1px solid #d0c8b8;margin:20px 0;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:monospace;font-size:13px;line-height:1.8;',
        ul: 'margin:20px 0;padding-left:2em;',
        ol: 'margin:20px 0;padding-left:2em;',
        li: 'margin:10px 0;',
        hr: 'border:none;border-top:2px dotted #a0826d;margin:40px 0;'
    },

    // 手绘插画
    sketch: {
        container: 'font-family:"Comic Sans MS","Chalkboard SE","Marker Felt",cursive;font-size:16px;line-height:1.9;color:#333;',
        h1: 'font-size:32px;font-weight:700;color:#1a1a1a;margin:44px 0 24px;transform:rotate(-1deg);text-shadow:2px 2px 0 #ffeaa7;',
        h2: 'font-size:22px;font-weight:600;color:#2d3436;margin:36px 0 18px;padding:8px 16px;border:2px solid #ffeaa7;display:inline-block;transform:rotate(0.5deg);border-radius:4px;',
        h3: 'font-size:18px;font-weight:600;color:#636e72;margin:24px 0 12px;border-bottom:3px wavy #74b9ff;padding-bottom:4px;',
        p: 'margin:16px 0;',
        strong: 'font-weight:700;color:#1a1a1a;border-bottom:3px solid #ffeaa7;padding-bottom:1px;',
        em: 'font-style:italic;color:#555555;',
        blockquote: 'margin:28px 0;padding:20px 24px;border:3px solid #dfe6e9;border-radius:12px;transform:rotate(0.3deg);',
        img: 'max-width:100%;height:auto;display:block;margin:28px auto;border:4px solid #2d3436;border-radius:8px;transform:rotate(-0.5deg);box-shadow:4px 4px 0 rgba(0,0,0,0.1);',
        a: 'color:#0984e3;text-decoration:none;border-bottom:3px solid #74b9ff;',
        code: 'font-family:monospace;border:2px solid #dfe6e9;color:#2d3436;padding:2px 6px;border-radius:4px;font-size:0.9em;',
        pre: 'padding:20px;border-radius:12px;margin:20px 0;border:3px solid #2d3436;color:#2d3436;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:monospace;font-size:13px;line-height:1.9;',
        ul: 'margin:20px 0;padding-left:1.5em;',
        ol: 'margin:20px 0;padding-left:1.5em;',
        li: 'margin:10px 0;color:#2d3436;',
        hr: 'border:none;height:4px;background:repeating-linear-gradient(90deg,#e74c3c,#e74c3c 8px,transparent 8px,transparent 12px);margin:36px 0;transform:rotate(0.2deg);'
    },

    // 文艺清新
    fresh: {
        container: 'font-family:"PingFang SC","Hiragino Sans GB",-apple-system,sans-serif;font-size:16px;line-height:1.85;color:#495057;',
        h1: 'font-size:28px;font-weight:600;color:#343a40;margin:44px 0 24px;padding-bottom:12px;border-bottom:2px solid #adb5bd;font-family:"STSong","SimSun",serif;',
        h2: 'font-size:20px;font-weight:500;color:#495057;margin:36px 0 16px;padding-left:12px;border-left:3px solid #74c0fc;',
        h3: 'font-size:17px;font-weight:500;color:#3d3d3d;margin:24px 0 10px;',
        p: 'margin:16px 0;',
        strong: 'font-weight:600;color:#212529;border-bottom:2px solid #74c0fc;padding-bottom:1px;',
        em: 'font-style:italic;color:#868e96;',
        blockquote: 'margin:28px 0;padding:20px 24px;border:1px solid #bee9e8;border-left:4px solid #74c0fc;border-radius:8px;color:#1864ab;font-size:15px;',
        img: 'max-width:100%;height:auto;display:block;margin:28px auto;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);',
        a: 'color:#1971c2;text-decoration:none;border-bottom:1px solid #74c0fc;',
        code: 'font-family:monospace;border:1px solid #dee2e6;color:#c2255c;padding:2px 6px;border-radius:4px;font-size:0.9em;',
        pre: 'padding:20px;border-radius:8px;margin:20px 0;border:1px solid #bee9e8;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:monospace;font-size:13px;line-height:1.85;',
        ul: 'margin:20px 0;padding-left:1.8em;',
        ol: 'margin:20px 0;padding-left:1.8em;',
        li: 'margin:10px 0;color:#495057;',
        hr: 'border:none;border-top:1px solid #adb5bd;margin:40px 0;'
    },

    // 工业风
    industrial: {
        // 重新设计：白底工业机能（警示黄+结构线框，不依赖任何 background）
        container: 'font-family:"Roboto Mono","SF Mono",monospace;font-size:14px;line-height:1.75;color:#111827;letter-spacing:0.2px;',
        h1: 'font-size:26px;font-weight:800;color:#111827;margin:40px 0 24px;text-transform:uppercase;letter-spacing:2px;border:2px solid #111827;border-left:12px solid #f59e0b;padding:14px 16px;display:inline-block;',
        h2: 'font-size:18px;font-weight:800;color:#111827;margin:32px 0 16px;padding-left:14px;border-left:8px solid #f59e0b;letter-spacing:1px;text-transform:uppercase;padding-bottom:8px;border-bottom:1px solid rgba(17,24,39,0.35);',
        h3: 'font-size:15px;font-weight:700;color:#374151;margin:24px 0 10px;text-transform:uppercase;letter-spacing:0.8px;',
        p: 'margin:14px 0;color:#111827;',
        strong: 'font-weight:800;color:#111827;border-bottom:3px solid rgba(245,158,11,0.9);padding-bottom:1px;',
        em: 'font-style:italic;color:#4b5563;',
        blockquote: 'margin:24px 0;padding:16px 20px;border:2px solid rgba(17,24,39,0.6);border-left:10px solid #f59e0b;color:#111827;',
        img: 'max-width:100%;height:auto;display:block;margin:24px auto;border:2px solid #111827;filter:grayscale(35%) contrast(115%);',
        a: 'color:#111827;text-decoration:none;border-bottom:2px dashed rgba(245,158,11,0.9);',
        code: 'font-family:"Roboto Mono","SF Mono",monospace;border:1px solid rgba(17,24,39,0.6);color:#b91c1c;padding:2px 6px;font-size:0.9em;',
        pre: 'padding:16px;border:2px solid rgba(17,24,39,0.6);border-left:10px solid #111827;margin:20px 0;overflow-x:auto;white-space:pre-wrap;word-break:break-word;color:#111827;font-family:"Roboto Mono","SF Mono",monospace;font-size:13px;line-height:1.75;',
        ul: 'margin:16px 0;padding-left:2em;',
        ol: 'margin:16px 0;padding-left:2em;',
        li: 'margin:8px 0;color:#111827;',
        hr: 'border:none;border-top:2px solid rgba(17,24,39,0.5);margin:32px 0;'
    },

    // 墨蓝 · 科技商务
    keji: {
        container: 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB",sans-serif;font-size:15.5px;line-height:1.85;color:#262626;',
        h1: 'font-size:26px;font-weight:700;color:#1a1a1a;margin:44px 0 22px;padding-bottom:14px;border-bottom:1px solid #d5dfe9;line-height:1.4;',
        h2: 'font-size:20px;font-weight:700;color:#2c2c2c;margin:38px 0 16px;padding-left:12px;border-left:4px solid #14366b;line-height:1.45;',
        h3: 'font-size:16.5px;font-weight:600;color:#3d3d3d;margin:26px 0 12px;',
        p: 'margin:18px 0;text-align:justify;text-justify:inter-ideograph;',
        strong: 'font-weight:700;color:#1a1a1a;',
        em: 'font-style:italic;color:#8c8c8c;',
        blockquote: 'margin:26px 0;padding:18px 22px;background:#f5f8fc;border-left:3px solid #14366b;color:#3d4a5c;',
        img: 'max-width:100%;height:auto;display:block;margin:30px auto;border-radius:6px;',
        a: 'color:#2f6fd0;text-decoration:none;border-bottom:1px solid #b8cfe8;',
        code: 'font-family:SF Mono,Monaco,monospace;background:#eef3f9;color:#14366b;padding:2px 7px;border-radius:4px;font-size:0.88em;',
        pre: 'padding:22px;border-radius:8px;margin:26px 0;background:#16233a;color:#d6e0ec;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:SF Mono,Monaco,monospace;font-size:13px;line-height:1.7;',
        ul: 'margin:20px 0;padding-left:1.8em;',
        ol: 'margin:20px 0;padding-left:1.8em;',
        li: 'margin:10px 0;',
        table: 'width:100%;border-collapse:collapse;margin:28px 0;font-size:14px;',
        th: 'color:#333333;font-weight:700;padding:12px 16px;text-align:left;border-bottom:2px solid #14366b;',
        td: 'padding:12px 16px;border-bottom:1px solid #e8edf2;',
        hr: 'border:none;border-top:1px solid #d5dfe9;margin:44px 0;',
    },

    // 金奢 · 品牌高级
    jinshe: {
        container: 'font-family:"Noto Serif SC","Songti SC","STSong",serif;font-size:15.5px;line-height:2;color:#3a3a3a;letter-spacing:0.5px;',
        h1: 'font-size:26px;font-weight:700;color:#1a1a1a;margin:56px 0 28px;text-align:center;letter-spacing:4px;padding:18px 0;border-top:1px solid #a78b57;border-bottom:1px solid #a78b57;line-height:1.5;',
        h2: 'font-size:19px;font-weight:600;color:#1a1a1a;margin:44px 0 20px;text-align:center;letter-spacing:3px;line-height:1.5;',
        h3: 'font-size:16.5px;font-weight:600;color:#a78b57;margin:28px 0 14px;letter-spacing:1px;text-align:center;',
        p: 'margin:20px 0;text-align:justify;text-justify:inter-ideograph;',
        strong: 'font-weight:700;color:#1a1a1a;',
        em: 'font-style:italic;color:#8a8a8a;',
        blockquote: 'margin:40px 24px;padding:24px 0;border-top:1px solid #d6c3a0;border-bottom:1px solid #d6c3a0;color:#6b5a3a;text-align:center;font-size:16.5px;line-height:2.1;',
        img: 'max-width:100%;height:auto;display:block;margin:36px auto;',
        a: 'color:#8a6d3b;text-decoration:none;border-bottom:1px solid #d6c3a0;',
        code: 'font-family:SF Mono,Monaco,monospace;background:#faf8f4;color:#8a6d3b;padding:2px 7px;font-size:0.88em;',
        pre: 'padding:22px;margin:28px 0;background:#faf8f4;border:1px solid #e8e0d0;color:#3a3a3a;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:SF Mono,Monaco,monospace;font-size:13px;line-height:1.8;',
        ul: 'margin:22px 0;padding-left:2em;',
        ol: 'margin:22px 0;padding-left:2em;',
        li: 'margin:12px 0;',
        table: 'width:100%;border-collapse:collapse;margin:32px 0;font-size:14px;',
        th: 'color:#333333;font-weight:600;padding:13px 16px;text-align:left;border-bottom:1px solid #a78b57;letter-spacing:1px;',
        td: 'padding:13px 16px;border-bottom:1px solid #efe9dd;',
        hr: 'border:none;border-top:1px solid #d6c3a0;margin:52px 30%;',
    },

    // 暖阳 · 活力橙
    nuanyang: {
        container: 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;font-size:15.5px;line-height:1.85;color:#333;',
        h1: 'font-size:26px;font-weight:800;color:#1a1a1a;margin:44px 0 22px;line-height:1.4;',
        h2: 'font-size:20px;font-weight:700;color:#2c2c2c;margin:36px 0 16px;padding-bottom:8px;border-bottom:2px solid #f0c9a8;line-height:1.45;',
        h3: 'font-size:16.5px;font-weight:700;color:#3d3d3d;margin:26px 0 12px;',
        p: 'margin:18px 0;',
        strong: 'font-weight:700;color:#1a1a1a;',
        em: 'font-style:italic;color:#999;',
        blockquote: 'margin:26px 0;padding:18px 22px;background:#fdf6ee;border-left:3px solid #e8813a;border-radius:0 8px 8px 0;color:#6b4a2e;',
        img: 'max-width:100%;height:auto;display:block;margin:30px auto;border-radius:12px;',
        a: 'color:#d4540a;text-decoration:none;border-bottom:1px solid #f0c9a8;font-weight:600;',
        code: 'font-family:SF Mono,Monaco,monospace;background:#fdf3ea;color:#b4450a;padding:2px 7px;border-radius:5px;font-size:0.88em;',
        pre: 'padding:22px;border-radius:10px;margin:24px 0;background:#fdf9f4;border:1px solid #f0e0cd;color:#333;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:SF Mono,Monaco,monospace;font-size:13px;line-height:1.7;',
        ul: 'margin:20px 0;padding-left:1.8em;',
        ol: 'margin:20px 0;padding-left:1.8em;',
        li: 'margin:10px 0;',
        table: 'width:100%;border-collapse:collapse;margin:28px 0;font-size:14px;',
        th: 'color:#333333;font-weight:700;padding:12px 16px;text-align:left;border-bottom:2px solid #e8813a;',
        td: 'padding:12px 16px;border-bottom:1px solid #f5e8d8;',
        hr: 'border:none;border-top:1px solid #f0dcc4;margin:44px 0;',
    },

    // 字节 · 清爽高效
    zijie: {
        container: 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;font-size:15.5px;line-height:1.8;color:#1f2329;',
        h1: 'font-size:26px;font-weight:700;color:#1f2329;margin:42px 0 22px;line-height:1.4;',
        h2: 'font-size:20px;font-weight:600;color:#1f2329;margin:36px 0 16px;padding-left:12px;border-left:4px solid #3370ff;line-height:1.45;',
        h3: 'font-size:16.5px;font-weight:600;color:#1f2329;margin:26px 0 12px;',
        p: 'margin:16px 0;',
        strong: 'font-weight:600;color:#1a1a1a;',
        em: 'font-style:italic;color:#8f959e;',
        blockquote: 'margin:24px 0;padding:18px 22px;background:#f5f6f7;border-radius:8px;color:#4e5560;',
        img: 'max-width:100%;height:auto;display:block;margin:28px auto;border-radius:10px;',
        a: 'color:#3370ff;text-decoration:none;font-weight:500;',
        code: 'font-family:SF Mono,Monaco,monospace;background:#f2f3f5;color:#d83931;padding:2px 7px;border-radius:5px;font-size:0.88em;',
        pre: 'padding:20px;border-radius:10px;margin:24px 0;background:#f7f8fa;border:1px solid #e5e6eb;color:#1f2329;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:SF Mono,Monaco,monospace;font-size:13px;line-height:1.7;',
        ul: 'margin:18px 0;padding-left:1.8em;',
        ol: 'margin:18px 0;padding-left:1.8em;',
        li: 'margin:9px 0;',
        table: 'width:100%;border-collapse:collapse;margin:26px 0;font-size:14px;',
        th: 'color:#1f2329;background:#f2f3f5;font-weight:600;padding:12px 16px;text-align:left;',
        td: 'padding:12px 16px;border-bottom:1px solid #e5e6eb;',
        hr: 'border:none;border-top:1px solid #e5e6eb;margin:40px 0;',
    },

    // 苹果 · 发布会极简
    pingguo: {
        container: 'font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","PingFang SC",sans-serif;font-size:16px;line-height:1.9;color:#1d1d1f;',
        h1: 'font-size:32px;font-weight:700;color:#1d1d1f;margin:56px 0 30px;line-height:1.25;letter-spacing:-0.5px;',
        h2: 'font-size:24px;font-weight:600;color:#1d1d1f;margin:52px 0 20px;letter-spacing:-0.3px;line-height:1.35;',
        h3: 'font-size:18px;font-weight:600;color:#1d1d1f;margin:32px 0 14px;',
        p: 'margin:22px 0;',
        strong: 'font-weight:600;color:#000;',
        em: 'font-style:normal;color:#86868b;',
        blockquote: 'margin:48px 16px;padding:0;color:#1d1d1f;font-size:20px;font-weight:600;line-height:1.7;text-align:center;',
        img: 'max-width:100%;height:auto;display:block;margin:44px auto;border-radius:16px;',
        a: 'color:#0066cc;text-decoration:none;',
        code: 'font-family:SF Mono,Monaco,monospace;background:#f5f5f7;color:#1d1d1f;padding:3px 9px;border-radius:8px;font-size:0.88em;',
        pre: 'padding:26px;border-radius:16px;margin:32px 0;background:#f5f5f7;color:#1d1d1f;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:SF Mono,Monaco,monospace;font-size:13px;line-height:1.7;',
        ul: 'margin:22px 0;padding-left:1.6em;',
        ol: 'margin:22px 0;padding-left:1.6em;',
        li: 'margin:12px 0;',
        table: 'width:100%;border-collapse:collapse;margin:36px 0;font-size:14px;',
        th: 'color:#86868b;font-weight:500;padding:14px 16px;text-align:left;border-bottom:1px solid #d2d2d7;font-size:13px;',
        td: 'padding:14px 16px;border-bottom:1px solid #f0f0f2;',
        hr: 'border:none;border-top:1px solid #d2d2d7;margin:64px 0;',
    },

    // 赛博 · 霓虹未来
    saibo: {
        container: 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;font-size:15.5px;line-height:1.85;color:#241f3a;',
        h1: 'font-size:26px;font-weight:800;color:#1a1a1a;margin:44px 0 22px;padding-bottom:14px;border-bottom:2px solid #4c1d95;line-height:1.4;letter-spacing:1px;',
        h2: 'font-size:20px;font-weight:700;color:#2c2c2c;margin:38px 0 16px;padding-bottom:6px;border-bottom:2px solid #22d3ee;display:inline-block;letter-spacing:1px;line-height:1.45;',
        h3: 'font-size:16.5px;font-weight:700;color:#3d3d3d;margin:26px 0 12px;letter-spacing:0.5px;',
        p: 'margin:18px 0;',
        strong: 'font-weight:700;color:#1a1a1a;',
        em: 'font-style:italic;color:#8a85a3;',
        blockquote: 'margin:28px 0;padding:18px 22px;background:#f8f6ff;border-left:3px solid #7c3aed;color:#453d6b;',
        img: 'max-width:100%;height:auto;display:block;margin:30px auto;border-radius:8px;',
        a: 'color:#0e7490;text-decoration:none;border-bottom:1px solid #67e8f9;font-weight:600;',
        code: 'font-family:SF Mono,Monaco,monospace;background:#f3e8ff;color:#6d28d9;padding:2px 7px;border-radius:4px;font-size:0.88em;',
        pre: 'padding:22px;border-radius:8px;margin:26px 0;background:#1e1b2e;color:#c4b5fd;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:SF Mono,Monaco,monospace;font-size:13px;line-height:1.7;',
        ul: 'margin:20px 0;padding-left:1.8em;',
        ol: 'margin:20px 0;padding-left:1.8em;',
        li: 'margin:10px 0;',
        table: 'width:100%;border-collapse:collapse;margin:28px 0;font-size:14px;',
        th: 'color:#333333;font-weight:700;padding:12px 16px;text-align:left;border-bottom:2px solid #7c3aed;',
        td: 'padding:12px 16px;border-bottom:1px solid #eae6f7;',
        hr: 'border:none;border-top:2px solid #e0dbf2;margin:44px 0;',
    },

    // 书摘 · 阅读笔记
    shuzhai: {
        container: 'font-family:Georgia,"Noto Serif SC","Songti SC","STSong",serif;font-size:16px;line-height:2;color:#33312e;',
        h1: 'font-size:25px;font-weight:700;color:#2a2724;margin:48px 0 24px;letter-spacing:2px;line-height:1.5;',
        h2: 'font-size:19px;font-weight:700;color:#2a2724;margin:40px 0 18px;padding-bottom:10px;border-bottom:1px solid #c4b9aa;letter-spacing:1px;',
        h3: 'font-size:16.5px;font-weight:700;color:#6b6157;margin:28px 0 12px;',
        p: 'margin:20px 0;text-align:justify;text-justify:inter-ideograph;text-indent:2em;',
        strong: 'font-weight:700;color:#1a1a1a;',
        em: 'font-style:italic;color:#8a8178;',
        blockquote: 'margin:36px 0;padding:26px 30px;background:#faf7f2;border-left:3px solid #c4b9aa;color:#4a453f;font-size:16.5px;line-height:2.05;font-style:italic;',
        img: 'max-width:100%;height:auto;display:block;margin:34px auto;border:1px solid #e3dcd2;padding:6px;background:#fff;',
        a: 'color:#8a5a2b;text-decoration:none;border-bottom:1px solid #d3bfa3;',
        code: 'font-family:SF Mono,Monaco,monospace;background:#f5f0e8;color:#6b4a2b;padding:2px 7px;font-size:0.88em;',
        pre: 'padding:22px;margin:26px 0;background:#faf7f2;border:1px solid #e3dcd2;color:#33312e;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:SF Mono,Monaco,monospace;font-size:13px;line-height:1.8;',
        ul: 'margin:20px 0;padding-left:2em;',
        ol: 'margin:20px 0;padding-left:2em;',
        li: 'margin:11px 0;',
        table: 'width:100%;border-collapse:collapse;margin:30px 0;font-size:14px;',
        th: 'color:#4a453f;font-weight:700;padding:13px 16px;text-align:left;border-bottom:2px solid #c4b9aa;',
        td: 'padding:12px 16px;border-bottom:1px solid #eae4da;',
        hr: 'border:none;border-top:1px solid #d8d0c4;margin:52px 35%;',
    },

    // 数据 · 研究报告
    baogao: {
        container: 'font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;font-size:15.5px;line-height:1.8;color:#262626;',
        h1: 'font-size:24px;font-weight:700;color:#fff;background:#123a63;margin:44px 0 24px;padding:16px 20px;line-height:1.45;',
        h2: 'font-size:20px;font-weight:700;color:#2c2c2c;margin:38px 0 16px;padding-bottom:8px;border-bottom:2px solid #123a63;',
        h3: 'font-size:16px;font-weight:600;color:#3d3d3d;margin:26px 0 12px;',
        p: 'margin:16px 0;text-align:justify;text-justify:inter-ideograph;',
        strong: 'font-weight:700;color:#1a1a1a;',
        em: 'font-style:italic;color:#8c8c8c;',
        blockquote: 'margin:26px 0;padding:18px 22px;background:#f7f9fb;border:1px solid #d9e2ec;border-left:4px solid #123a63;color:#33475b;',
        img: 'max-width:100%;height:auto;display:block;margin:28px auto;border:1px solid #e1e8ed;',
        a: 'color:#096dd9;text-decoration:none;border-bottom:1px solid #91caff;',
        code: 'font-family:SF Mono,Monaco,monospace;background:#f0f4f8;color:#c0392b;padding:2px 7px;font-size:0.88em;',
        pre: 'padding:20px;margin:24px 0;background:#f7f9fb;border:1px solid #d9e2ec;color:#262626;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:SF Mono,Monaco,monospace;font-size:13px;line-height:1.7;',
        ul: 'margin:18px 0;padding-left:1.8em;',
        ol: 'margin:18px 0;padding-left:1.8em;',
        li: 'margin:9px 0;',
        table: 'width:100%;border-collapse:collapse;margin:28px 0;font-size:14px;',
        th: 'color:#ffffff;background:#123a63;font-weight:600;padding:12px 16px;text-align:left;',
        td: 'padding:11px 16px;border-bottom:1px solid #e1e8ed;',
        hr: 'border:none;border-top:2px solid #d9e2ec;margin:40px 0;',
    },

    // 鱿鱼风 · 黑白杂志
    youyu: {
        container: 'font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","PingFang SC","Hiragino Sans GB",sans-serif;font-size:16px;line-height:1.9;color:#1f1f1f;letter-spacing:0.4px;',
        h1: 'font-size:32px;font-weight:800;color:#000;margin:56px 0 32px;line-height:1.35;letter-spacing:2px;',
        h2: 'font-size:24px;font-weight:800;color:#000;margin:64px 0 24px;padding-top:20px;border-top:4px solid #000;line-height:1.4;letter-spacing:2px;',
        h3: 'font-size:17px;font-weight:700;color:#000;margin:40px 0 14px;letter-spacing:0.5px;line-height:1.6;',
        p: 'margin:22px 0;text-align:justify;text-justify:inter-ideograph;',
        strong: 'font-weight:700;color:#000;',
        em: 'font-style:italic;color:#555;',
        blockquote: 'margin:36px 0;padding:26px 4px;border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;color:#000;font-size:17px;font-weight:600;line-height:2;',
        img: 'max-width:100%;height:auto;display:block;margin:36px auto;',
        a: 'color:#000;text-decoration:underline;text-underline-offset:4px;font-weight:600;',
        code: 'font-family:SF Mono,Monaco,monospace;background:#f5f5f5;color:#c7254e;padding:3px 8px;font-size:0.88em;',
        pre: 'padding:24px;margin:28px 0;background:#f7f7f7;border:1px solid #ececec;color:#1f1f1f;overflow-x:auto;white-space:pre-wrap;word-break:break-word;font-family:SF Mono,Monaco,monospace;font-size:13px;line-height:1.8;',
        ul: 'margin:24px 0;padding-left:1.6em;',
        ol: 'margin:24px 0;padding-left:1.6em;',
        li: 'margin:12px 0;',
        table: 'width:100%;border-collapse:collapse;margin:32px 0;font-size:14px;',
        th: 'color:#000;font-weight:700;padding:14px 16px;text-align:left;border-bottom:2px solid #000;',
        td: 'padding:12px 16px;border-bottom:1px solid #eee;',
        hr: 'border:none;border-top:1px solid #e6e6e6;margin:56px 0;',
    },

    // 已移除：所有 SVG 相关主题
};

// 应用主题样式到元素
function applyWechatStyles(element, themeName) {
    const theme = WECHAT_THEMES[themeName] || WECHAT_THEMES.chenlu;
    
    function applyStyles(el) {
        if (el.nodeType !== 1) return;
        
        const tagName = el.tagName.toLowerCase();
        
        if (theme[tagName]) {
            const existingStyle = el.getAttribute('style') || '';
            el.setAttribute('style', theme[tagName] + existingStyle);
        }
        
        // 特殊处理图片
        if (tagName === 'img') {
            const src = el.getAttribute('src') || '';
            const alt = el.getAttribute('alt') || '';
            el.setAttribute('style', theme.img);
            el.setAttribute('src', src);
            el.setAttribute('alt', alt);
        }
        
        // 递归处理子元素
        Array.from(el.children).forEach(applyStyles);
    }
    
    // 应用容器样式
    element.setAttribute('style', theme.container);
    
    // 应用到所有子元素
    Array.from(element.children).forEach(applyStyles);
}

// 生成微信兼容的 HTML（全局函数）
function generateWechatHtmlGlobal(sourceHtml, themeName) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sourceHtml, 'text/html');
    const body = doc.body;
    
    // 应用样式
    applyWechatStyles(body, themeName);
    
    return body.innerHTML;
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WECHAT_THEMES, applyWechatStyles, generateWechatHtmlGlobal };
}
