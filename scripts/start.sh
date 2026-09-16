#!/usr/bin/env bash
# 一键启动 · 微信公众号排版助手
# 用法: bash scripts/start.sh [端口]   （默认 8888）
# 说明: 复制功能依赖 navigator.clipboard，必须在 localhost/https 下打开
set -euo pipefail
cd "$(dirname "$0")/.."
PORT="${1:-8888}"
echo "→ 微信公众号排版助手: http://localhost:${PORT}   (Ctrl+C 停止)"
exec python3 -m http.server "$PORT"
