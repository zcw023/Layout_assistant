#!/usr/bin/env bash
# 一键验证 · 微信公众号排版助手
# 三段: ① 关键文件完整性 ② 静态引用一致性 ③ 本地服务器 smoke
# 全部可自动判定; exit 0 = 全绿, 1 = 有失败项
# (BP-001: 首跑失败先看完整输出定位根因, 别先怀疑文件缺失)
set -uo pipefail
cd "$(dirname "$0")/.."

FAIL=0
pass() { echo "  ✅ $1"; }
fail() { echo "  ❌ $1"; FAIL=1; }

echo "== 1/3 关键文件完整性 =="
for f in index.html css/style.css js/app.js js/themes.js single-file.html \
         LICENSE README.md \
         project-docs/CONSTITUTION.md project-docs/STATUS.md \
         project-docs/system/README.md project-docs/decisions/001-技术栈与交付形态.md \
         scripts/start.sh scripts/verify.sh; do
  [ -f "$f" ] && pass "$f" || fail "缺 $f"
done

echo "== 2/3 静态引用一致性 =="
# index.html 引用的本地资源必须存在 (只认 src=/href= 属性里的相对路径, 排除 CDN URL)
refs=$(grep -oE '(src|href)="(css|js)/[A-Za-z0-9._-]+(\?v=[0-9]+)?"' index.html \
        | sed -E 's/^(src|href)="//; s/"$//; s/\?.*//' | sort -u)
if [ -z "$refs" ]; then fail "index.html 未解析出本地资源引用"; fi
for ref in $refs; do
  [ -f "$ref" ] && pass "引用存在: $ref" || fail "引用缺失: $ref"
done
# 单文件版结构完整性与核心依赖声明
grep -q '</html>' single-file.html && pass "single-file.html 结构完整" || fail "single-file.html 疑似截断 (无 </html>)"
grep -q 'marked' single-file.html && grep -q 'mammoth' single-file.html \
  && pass "single-file.html 核心依赖声明完整" || fail "single-file.html 缺 marked/mammoth 依赖"
# 主题 key: index.html 的 option 与 themes.js 数据保持 9 个
opt_n=$(grep -c '<option value=' index.html || true)
grep -q 'WECHAT_THEMES' js/themes.js && pass "themes.js 含 WECHAT_THEMES 数据" || fail "themes.js 缺 WECHAT_THEMES"
[ "$opt_n" = "9" ] && pass "index.html 主题下拉 = 9 款" || fail "index.html 主题下拉数量异常: $opt_n (期望 9)"

echo "== 3/3 本地服务器 smoke =="
PORT=18899
python3 -m http.server "$PORT" >/dev/null 2>&1 &
SRV=$!
sleep 1
for path in "/" "/css/style.css" "/js/app.js" "/js/themes.js" "/single-file.html"; do
  code=$(curl -sf -o /dev/null -w "%{http_code}" "http://localhost:${PORT}${path}" 2>/dev/null || echo 000)
  [ "$code" = "200" ] && pass "GET $path → 200" || fail "GET $path → $code"
done
kill "$SRV" 2>/dev/null || true
wait "$SRV" 2>/dev/null || true

echo ""
if [ "$FAIL" -eq 0 ]; then echo "✅ 验证全绿"; else echo "❌ 验证存在失败项 (见上)"; fi
exit "$FAIL"
