# entities · 实体与数据

> **等级**：system（已实现现状）

## WECHAT_THEMES（js/themes.js）

9 个主题对象，key = 主题拼音，value = 按标签分组的**内联样式字符串**：

- 容器级：`container`
- 元素级：`h1` `h2` `h3` `p` `strong` `blockquote` `img` `a` `code` `pre` `ul` `ol` `li` `table` `th` `td` `hr`
- 无嵌套结构、无外部引用——纯字符串映射，复制时逐标签内联

## 运行时状态（js/app.js 内部）

- `state.currentTheme`：当前主题 key（默认 chenlu，与 index.html `#preview-content` 初始类名一致）
- 编辑模式：`markdown`（textarea）/ `feishu`（contenteditable）二选一
- 字数统计：字符数 / 字数（状态栏展示）

## 无持久化

- 当前版本无 localStorage / 无后端存储——刷新即失，属已知产品现状（README 路线图中"导出/图片管理"为未做项）

> 同步：iter-00 立项收编 · 见 git log 首条立项 commit · 2026-09-16
