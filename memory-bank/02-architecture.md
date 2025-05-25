# System Architecture

**Last Updated:** 2025/05/24
**Status:** 開発中

## High-Level Architecture

<!-- Overall system design and major components -->

### System Components

- **Frontend:** なし（MCPサーバーのため）
- **Backend:** Node.js + TypeScript + MCP SDK
- **Database:** VOICEVOX系TTSエンジン（HTTP API）
- **Infrastructure:** クロスプラットフォーム対応（Windows/Mac/Linux）

### Architecture Diagram

```
   Claude/AI Tool
        ↓ (MCP Protocol)
   VoiceMcpServer (Core Layer)
        ↓
   VoiceSynthesisService (API Layer)
        ↓
   EngineClient (HTTP Layer)
        ↓
   VOICEVOX/Aivis/Coeiroink (External TTS Engine)
```

## Key Design Decisions

- レイヤード・アーキテクチャの採用
- ファクトリーパターンによるツール管理
- 依存性注入による疎結合設計
- インターフェース分離による拡張性確保

### Decision 1: レイヤード・アーキテクチャの採用

- **Context:** 複数のVOICEVOX系TTSエンジンに対応する必要があり、将来的な拡張性と保守性を確保したかった
- **Decision:** Core/API/HTTPの3層アーキテクチャを採用し、各層の責務を明確に分離
- **Rationale:**
  - 新しいTTSエンジン追加時の影響範囲を限定できる
  - テストしやすい構造になる
  - MCPプロトコルと音声合成ロジックを分離できる
- **Consequences:**
  - ✅ 高い拡張性と保守性を実現
  - ✅ 各層の単体テストが容易
  - ❌ 小規模な変更でも複数ファイルの修正が必要な場合がある

### Decision 2: ファクトリーパターンによるツール管理

- **Context:** MCPツールの追加・削除を柔軟に行いたく、ツールの生成ロジックを統一したかった
- **Decision:** IToolFactoryインターフェースを定義し、各ツールをファクトリーで生成する方式を採用

## Data Flow

1. MCPツール呼び出し → コアサーバー → APIサービス → HTTPクライアント → TTSエンジン
2. 音声データの逆方向フロー

## Security Considerations

- ローカルネットワーク通信前提
- 一時ファイルの適切な削除
- エラーハンドリングによる情報漏洩防止

## Performance Considerations

- 音声ファイルの一時保存と削除
- プラットフォーム別音声再生最適化
- 非同期処理による応答性確保

---

_Update this file when making significant architectural changes or decisions._
