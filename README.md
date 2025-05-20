# VOICEVOX互換TTS MCP (Model Context Protocol) サーバー

AIに指示して音声合成させ、それを再生するためのMCPサーバーです。VOICEVOX互換APIをもつTTSアプリケーション（VOICEVOX, Aivis Speech）を利用します。

## セットアップ手順

1. リポジトリをクローンまたはダウンロードします:

```bash
git clone https://github.com/sugar-system/voicevox-mcp.git
cd voicevox-mcp
```

2. ビルドスクリプトを実行します:

   - Windows: `build.bat`を実行
   - Mac/Linux: `./build.sh`を実行

   これにより必要なパッケージのインストールとTypeScriptのコンパイルが自動的に行われます。

3. 設定ファイルに追加します:

アプリケーションの設定ファイルに以下の設定を追加してください。
ファイルの場所やファイル名は使用するアプリケーションによって異なります：

- Claude for Windows: `%AppData%\Claude\claude_desktop_config.json`
- その他のアプリケーション: 各アプリのドキュメントを参照してください

Aivis Speechの場合:

```json
    "aivis-speech": {
      "command": "node",
      "args": [
        "path/to/voicevox-mcp/dist/server.js",
        "--engine",
        "aivis",
        "--url",
        "http://localhost:10101"
      ]
    }
```

VOICEVOXの場合:

```json
    "voicevox": {
      "command": "node",
      "args": [
        "path/to/voicevox-mcp/dist/server.js",
        "--engine",
        "voicevox",
        "--url",
        "http://localhost:50021"
      ]
    }
```

※ `path/to/voicevox-mcp` は実際のインストールパスに置き換えてください。
例: `C:\\mcp\\voicevox-mcp\\dist\\server.js`（Windowsの場合）

## 使用方法

設定完了後、以下の手順で使用できます：

- アプリケーションを再起動します
- VOICEVOXまたはAivis Speechのエディターを立ち上げます
- 「aivis-speechで話して」または「voicevoxで話して」とAIに指示すると、自動的に音声で返答が生成されます

## 注意事項

- 複数のTTS MCPサーバーを**同時に有効化するとAIが適切なTTS MCPサーバーを選べない**可能性があります
- 一度に一つのMCPサーバーのみを有効にするのが安全です
- 使用しないMCPサーバーの設定を一時的にコメントアウトするか削除するなどしてください

## よくわからない、上手くいかない

何か困った場合には、AIに質問してしまうのが早いです。
