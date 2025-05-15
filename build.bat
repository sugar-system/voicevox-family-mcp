@echo off
echo ===================================================
echo   AivisSpeech MCP Server - ビルドスクリプト
echo ===================================================
echo.

echo 📦 npmパッケージをインストールするよ～...
call npm install

if %errorlevel% neq 0 (
  echo ❌ npmパッケージのインストールに失敗しちゃった...
  pause
  exit /b %errorlevel%
)

echo ✨ TypeScriptをビルドするよ～...
call npm run build

if %errorlevel% neq 0 (
  echo ❌ ビルドに失敗しちゃった...
  pause
  exit /b %errorlevel%
)

echo.
echo 🎉 ビルド成功だよ～！おめでとう～♪(≧▽≦)ﾉ
echo.
echo 次は以下のコマンドでサーバーを起動してね:
echo   node dist/server.js
echo.
echo Claudeの設定ファイルにこのMCPサーバーを追加するのも忘れないでね♡
echo.

pause