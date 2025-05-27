# VOICEVOX互換TTS MCP (Model Context Protocol) サーバー

AIに指示して音声合成させ、それを再生するためのMCPサーバーです。主にVOICEVOX互換APIをもつTTSアプリケーションを利用します。

## 対応する音声合成(TTS)サーバー

- VOICEVOX
- AivisSpeech
- coeiroink（v1のみ）
- SHAREVOX

coeiroink v2（現行バージョン）には、今後対応予定です。

## セットアップ手順

1. リポジトリをクローンまたはダウンロードします:

```bash
git clone https://github.com/sugar-system/voicevox-family-mcp.git
cd voicevox-family-mcp
```

2. ビルドスクリプトを実行します:

   - Windows: `build.bat`を実行
   - Mac/Linux: `./build.sh`を実行

   これにより必要なパッケージのインストールとTypeScriptのコンパイルが自動的に行われます。

3. 設定ファイルに追加します:

アプリケーションの設定ファイルに以下の設定を追加してください。
ファイルの場所やファイル名は使用するアプリケーションによって異なります：

- Claude for Windows（Claudeデスクトップ）: `%AppData%\Claude\claude_desktop_config.json`
- その他のアプリケーション: 各アプリのドキュメントを参照してください

```json
{
  "mcpServers": {
    // 他のMCPサーバー設定

    "voicevox-family-mcp": {
      "command": "node",
      "args": [
        "path\\to\\voicevox-family-mcp\\dist\\server.js",
        "--server",
        "voicevox,http://localhost:50021,voicevox",
        "--server",
        "aivis,http://localhost:10101,aivis",
        "--server",
        "coeiroink,http://localhost:50032,voicevox",
        "--server",
        "sharevox,http://localhost:50025,voicevox"
      ]
    }
  }
}
```

※ `path\\to\\voicevox-family-mcp` は実際のインストールパスに置き換えてください。
例: `C:\\mcp\\voicevox-family-mcp\\dist\\server.js`（Windowsの場合）

### 設定ファイルに登録するサーバーについて

- 必要のないサーバー設定については、削除してもしなくても、どちらでも構いません。
- サーバーは追加可能です。たとえば、リモートのVOICEVOXサーバーなどがあれば追加できます
- "<サーバーID>,\<URL\>,<サーバー種別>"のフォーマットで登録してください
- サーバーIDはそれぞれ固有である必要があります
- サーバーの数に制限はありません

### 現在有効なサーバー種別

- voicevox
- aivis

※ SHAREVOX、coeiroink v1には、voicevoxを指定してください。（VOICEVOX互換なので）

## 使用方法

設定完了後、以下の手順で使用できます：

### 準備

- アプリケーション（Claudeデスクトップなど）を再起動します
- 使いたい音声合成サーバーを起動しておきます。VOICEVOXなどのエディターは音声合成サーバーとしても機能するので、エディターを立ち上げおくだけでOKです

### 方法１

話者を指定し、喋るようにAIに指示してください。

例:

- 「voicevox-family-mcpを使って、ずんだもんで喋って」
- 「四国めたんの声で話して」
- 「AivisSpeechのつくよみちゃんで『こんにちは』と言って」

### 方法2

まず使用可能な話者を調べる方法です。

1. 「voicevox-family-mcpを使って、話者を調べて」
2. 「ずんだもんで喋って」

## よくわからない、上手くいかない

何か困った場合には、AIに質問してしまうのが早いです。
