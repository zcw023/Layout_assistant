# interfaces · 对外接口与契约

> **等级**：system（已实现现状）

## 浏览器剪贴板（唯一对外边界）

- 写入：`navigator.clipboard.write` + `ClipboardItem({ 'text/html': Blob })`——产物为主题内联化 HTML
- 环境契约：仅在 localhost / https 可用（`scripts/start.sh` 存在的理由）
- 兜底：clipboard.js 2.0.11（CDN）作降级通道

## CDN 依赖清单（与 CSP 白名单联动）

| 库 | 版本 | 用途 | 源 |
|---|---|---|---|
| mammoth | 1.6.0 | Word(.docx)→HTML | cdn.jsdelivr.net |
| marked | 9.1.6 | Markdown→HTML | cdn.jsdelivr.net |
| clipboard.js | 2.0.11 | 复制降级 | cdn.jsdelivr.net |
| DOMPurify | 3.0.6 | XSS 清洗 | cdn.jsdelivr.net |
| highlight.js | 11.9.0 | 代码高亮（js+css） | cdnjs.cloudflare.com |

**契约**：增删库或换源 = 同步改 index.html CSP meta + 本表（宪法 §7 CSP 纪律）。

## 无服务端 API

- 纯静态，无 fetch 自有后端、无鉴权、无环境变量；`connect-src 'self' https:` 仅服务图片类直链展示

## 与微信编辑器的隐式契约

- 复制产物必须是**内联样式 HTML**（微信编辑器丢弃 `<style>` 块）——产品的存在前提，改动复制链路时必读 domain.md

> 同步：iter-00 立项收编 · 见 git log 首条立项 commit · 2026-09-16
