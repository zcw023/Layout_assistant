# domain · 业务域

> **等级**：system（已实现现状）

## 核心概念

- **输入源**：三种进入方式——Markdown 文本（textarea 直输/粘贴）、飞书/语雀富文档（富文本粘贴，含图片表格，`feishu-editor` contenteditable）、Word 文档（.docx 上传，经 mammoth 转 HTML）
- **主题（Theme）**：一套微信兼容的内联样式集合（`WECHAT_THEMES` 的一个 key），决定预览与复制产物的视觉形态；共 9 款（3 经典 + 6 特色）
- **预览**：右侧 `#preview-content`，即所得渲染微信效果
- **复制**：把主题化 HTML 写入剪贴板（text/html），粘贴进公众号编辑器后格式保留——**微信编辑器只认内联样式**，这是整个产品存在的理由
- **双形态**：拆分版（9 款主题）与 `single-file.html`（单文件自包含，**18 款主题，多出 9 款新主题，迭代更靠前**）——两形态已分叉，拆分版落后，见 decisions/002

## 关键业务约束

- 数据不上传：一切解析、渲染、复制在浏览器本地完成
- 复制 API（`navigator.clipboard`）要求 localhost 或 https 环境
- 富文本入预览前必须过 XSS 清洗（见宪法 §7）

## 术语表

| 术语 | 含义 |
|---|---|
| 主题 key | 小写拼音标识：chenlu/dushi/senxi/guochao/wabi/vintage/sketch/fresh/industrial |
| 内联样式 | style 属性级 CSS，复制保真的唯一手段 |
| 飞书模式 | 编辑区富文本直贴模式，与 Markdown 模式互斥切换 |

> 同步：iter-00 立项收编 · 见 git log 首条立项 commit · 2026-09-16
