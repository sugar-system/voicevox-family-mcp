@echo off
echo ===================================================
echo   AivisSpeech MCP Server - 実行スクリプト
echo ===================================================
echo.

echo 🎤 AivisSpeech MCPサーバーを起動するよ～...
echo 📢 終了するには Ctrl+C を押してね！
echo.

node dist/server.js

if %errorlevel% neq 0 (
  echo ❌ サーバーの実行中にエラーが発生しちゃった...
  pause
  exit /b %errorlevel%
)

pause