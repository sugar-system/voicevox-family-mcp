#!/bin/bash

echo "==================================================="
echo "  AivisSpeech MCP Server - 実行スクリプト"
echo "==================================================="
echo ""

echo "🎤 AivisSpeech MCPサーバーを起動するよ～..."
echo "📢 終了するには Ctrl+C を押してね！"
echo ""

node dist/server.js

if [ $? -ne 0 ]; then
  echo "❌ サーバーの実行中にエラーが発生しちゃった..."
  read -p "Press any key to continue..."
  exit 1
fi

read -p "Press any key to continue..."