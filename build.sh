#!/bin/bash

echo "==================================================="
echo "  AivisSpeech MCP Server - ビルドスクリプト"
echo "==================================================="
echo ""

echo "📦 npmパッケージをインストールするよ～..."
npm install

if [ $? -ne 0 ]; then
  echo "❌ npmパッケージのインストールに失敗しちゃった..."
  read -p "Press any key to continue..."
  exit 1
fi

echo "✨ TypeScriptをビルドするよ～..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ ビルドに失敗しちゃった..."
  read -p "Press any key to continue..."
  exit 1
fi

echo ""
echo "🎉 ビルド成功だよ～！おめでとう～♪(≧▽≦)ﾉ"
echo ""
echo "次は以下のコマンドでサーバーを起動してね:"
echo "  ./run.sh"
echo ""
echo "Claudeの設定ファイルにこのMCPサーバーを追加するのも忘れないでね♡"
echo ""

read -p "Press any key to continue..."