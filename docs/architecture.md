# Voice MCP サーバー設計ドキュメント

## 概要

このドキュメントは、Aivis SpeechとVOICEVOXの両方をサポートするMCP（Model Context Protocol）サーバーの設計について記述しています。

## アーキテクチャ

MCPサーバーは以下の3層構造で設計されています：

1. **MCPサーバー層** (src/core/voiceMcpServer.ts)
   - MCPプロトコルの実装
   - クライアントとのインターフェース
   - ツール定義と設定管理

2. **API処理層** (src/api/voiceSynthesisService.ts)
   - 音声合成エンジンのAPIとのやり取り
   - 音声クエリの作成、合成、再生などのビジネスロジック

3. **HTTP通信層** (src/http/engineClient.ts)
   - 純粋なHTTPリクエスト処理
   - エンジンとの通信部分を抽象化

## エンジン対応

このMCPサーバーは、Aivis SpeechとVOICEVOX両方の音声合成エンジンに対応しています。

### 共通点
- どちらも同様のAPIエンドポイント構造を持つ
- `/speakers` - 話者情報の取得
- `/audio_query` - 音声合成クエリの作成
- `/synthesis` - 実際の音声合成

### 差異点
- デフォルトのポート番号が異なる（Aivis: 10101, VOICEVOX: 50021）
- 話者IDの体系が異なる
- 一部パラメータの扱いが微妙に異なる

## 設定方法

サーバーはコマンドライン引数を通じて設定できます：

```
node server.js --engine aivis --url http://localhost:10101
node server.js --engine voicevox --url http://localhost:50021
```

### 利用可能なオプション

- `--engine, -e`: 使用するエンジンタイプ（"aivis" または "voicevox"）
- `--url, -u`: エンジンのベースURL
- `--help, -h`: ヘルプメッセージの表示

## Claude Desktop との連携

Claude Desktopの設定ファイル（claude_desktop_config.json）で、以下のように設定できます：

```json
{
  "mcpServers": {
    "aivis-speech": {
      "command": "node",
      "args": ["D:\\proj\\mcp\\aivis-mcp\\dist\\server.js", "--engine", "aivis", "--url", "http://localhost:10101"]
    },
    "voicevox": {
      "command": "node",
      "args": ["D:\\proj\\mcp\\aivis-mcp\\dist\\server.js", "--engine", "voicevox", "--url", "http://localhost:50021"]
    }
  }
}
```

この設定により、同じMCPサーバーのコードベースを使って、2つの異なる音声合成エンジンを切り替えて使用できます。

## 話者ID情報

### Aivis Speech 話者ID
- Anneli - ノーマル: 888753760
- Anneli - 通常: 888753761
- Anneli - テンション高め: 888753762
- Anneli - 落ち着き: 888753763
- Anneli - 上機嫌: 888753764
- Anneli - 怒り・悲しみ: 888753765
- white - ノーマル: 706073888

### VOICEVOX 話者ID
- 四国めたん（あまあま）: 0
- ずんだもん（あまあま）: 1
- 春日部つむぎ（ノーマル）: 8
- など他多数

## 今後の拡張性

現在の設計は以下のような拡張が容易です：

- 話者一覧の取得と表示機能
- エンジン固有のパラメータ調整
- 新しい音声合成エンジンの追加
- 音声ファイルの保存と管理

## 使用ライブラリ

- minimist: コマンドライン引数のパース
- axios: HTTPリクエスト処理
- @modelcontextprotocol/sdk: MCPプロトコルの実装
