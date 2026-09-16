# modules · 模块划分

> **等级**：system（已实现现状）

## 顶级视图

| 文件 | 职责 | 依赖 |
|---|---|---|
| `index.html` | 页面壳：工具栏（上传/主题选择/复制/重置）+ 双模式编辑区 + 预览区 + 状态栏；CSP meta 在此 | css/style.css、js/themes.js、js/app.js、CDN 五库 |
| `single-file.html` | 单文件分发形态：HTML+CSS+JS 自包含，仅 CDN 外链；与主形态**无代码共享**，独立维护；**18 款主题（拆分版仅 9 款，见 decisions/002）** | 仅 CDN |

## 主形态内部分工

| 模块 | 职责 | 依赖 |
|---|---|---|
| `js/themes.js` | WECHAT_THEMES 主题数据（只数据无逻辑） | 无 |
| `js/app.js` | 全部运行逻辑：marked 配置与解析、mammoth Word 转换、飞书富文本处理、主题应用（内联化）、剪贴板复制、快捷键、字数统计、拖拽分隔条 | themes.js、CDN 库 |
| `css/style.css` | 工具/界面样式（编辑器、工具栏、toast 等）——**微信内容样式在 themes.js 内联数据，不在此** | 无 |

## 依赖关系

```
index.html
  ├── css/style.css        （界面）
  ├── js/themes.js         （数据）
  ├── js/app.js            （逻辑）
  └── CDN: mammoth / marked / clipboard.js / DOMPurify / highlight.js
```

无构建、无打包器、无模块加载器——脚本按序全局加载（非 ESM），主题数据须先于 app.js。

> 同步：iter-00 立项收编 · 见 git log 首条立项 commit · 2026-09-16
