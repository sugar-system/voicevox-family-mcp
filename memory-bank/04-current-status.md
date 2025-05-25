# Current Development Status

**Last Updated:** 2025/05/25
**Status:** 開発中 - Phase 1完了、Phase 2準備中

## Current Sprint/Iteration

<!-- Phase 1完了、Phase 2のAudioQuery型システム再設計準備 -->

### Sprint Goals

1. **✅ 複数TTSサーバ同時対応機能の実装** - 完了！単一サーバ前提から複数サーバ管理への移行成功
2. **🔄 サーバ特化AudioQuery対応の準備** - Phase 2として再計画、Aivis Speech専用パラメータとcoeiroink v2対応
3. **🔄 アーキテクチャ再設計の準備** - Phase 2として再計画、基底クラス + 派生クラス構造でのVoiceSynthesisService再構築

### In Progress

- **Phase 2設計準備** - 設計フェーズ - AudioQuery型システムの詳細設計とジェネリック基底クラス設計
- **coeiroink v2仕様調査** - 調査フェーズ - 正確なAPI仕様とエンドポイント差分の確認
- **Aivis Speech拡張パラメータ調査** - 調査フェーズ - tempoDynamicsScale等の詳細仕様確認

### Completed This Sprint

- ✅ **Phase 1: 複数サーバ対応基盤整備** - 完全完了！
- ✅ 起動パラメータの複数サーバ対応（`--server "id,url,type"`形式）
- ✅ VoiceServiceのMap化とサーバ管理機能実装
- ✅ list_speakers/speak_responseツールのサーバID対応
- ✅ 後方互換性の確保（従来の`--engine`/`--url`形式も継続サポート）
- ✅ 関数リファクタリング（単一責任の原則に基づく分割）
- ✅ ユニットテストの実装（12テスト、100%パス）
- ✅ 既存テストの複数サーバ対応への更新

## Recent Major Changes

<!-- Phase 1完了とリファクタリング成果 -->

### 2025/05/24 - Phase 1: 複数TTSサーバ対応基盤整備完了

- **What Changed:** 複数サーバ同時利用機能の完全実装とテスト完了
- **Why:** ユーザーが複数のTTSサーバを使い分けたいニーズに対応するため
- **Impact:**
  - 新形式: `--server "voicevox-main,http://localhost:50021,voicevox"`（複数指定可能）
  - 後方互換性: 従来の`--engine`/`--url`形式も継続サポート
  - list_speakersで全サーバから話者リスト統合取得
  - speak_responseでserver_id指定による特定サーバでの音声合成
  - VoiceMcpServerの複数サーバ管理（Map<string, IVoiceSynthesisService>）

### 2025/05/24 - コード品質向上とテスト整備

- **What Changed:** 関数リファクタリングとユニットテスト実装
- **Why:** 保守性向上と今後の機能追加に向けた基盤強化のため
- **Impact:**
  - buildServerConfigs関数の単一責任分割（buildSingleServerConfig, buildMultiServerConfigs）
  - 包括的ユニットテスト（parseServerString, 統合テスト等）
  - 既存テストの複数サーバ対応更新
  - ESLint準拠による型安全性向上

## Current Blockers & Issues

<!-- Phase 1解決済み、Phase 2の新たな課題 -->

### High Priority Issues

1. **✅ 単一サーバ前提設計の制約** - Phase 1で完全解決！
2. **AudioQuery型の固定化** - Phase 2で解決予定、ジェネリック基底クラス設計が必要
3. **coeiroink v2仕様の詳細確認** - Phase 2開始前に正確なAPI仕様調査が必要

### Dependencies Waiting

- **Aivis Speech拡張AudioQuery仕様** - tempoDynamicsScale, pauseLength等の詳細動作確認
- **coeiroink v2エンドポイント仕様** - VOICEVOX互換性の範囲と独自拡張の確認
- **各サーバの実際の動作テスト** - 実サーバでの動作確認とエラーハンドリング検証

## Next Steps

<!-- Phase 2に向けた具体的計画 -->

### Immediate Next Actions (This Week)

1. **Phase 2詳細設計** - AudioQuery型システムのジェネリック化設計
2. **基底クラス設計** - IVoiceSynthesisService<T>のジェネリック化検討
3. **各サーバ仕様調査** - Aivis/coeiroink v2の詳細API仕様確認

### Upcoming Priorities (Next 2 Weeks)

1. **AudioQuery基底クラス実装** - ジェネリック型を活用した拡張可能な設計
2. **サーバ特化VoiceSynthesisService実装** - 各サーバ向け派生クラスの実装
3. **Phase 2テスト設計** - 新しいアーキテクチャのテスト戦略策定

## Technical Debt

<!-- Phase 1で解決された項目と新たな課題 -->

### Resolved Technical Debt

- **✅ 単一サーバ前提アーキテクチャ** - Phase 1で完全解決、複数サーバ管理に移行完了
- **✅ 関数の責任分散** - buildServerConfigs関数の適切な分割完了
- **✅ テストカバレッジ不足** - ユニットテスト実装により解決

### High Priority Technical Debt

- **AudioQuery型の固定化** - Impact: サーバ特化機能の制限 - Effort: 中（Phase 2で解決）
- **VoiceSynthesisServiceの単一実装** - Impact: サーバ別最適化の困難 - Effort: 中（Phase 2で解決）
- **型安全性の向上** - Impact: 各サーバ特有パラメータの型チェック不足 - Effort: 小（Phase 2で解決）

### Implementation Phases

#### ✅ Phase 1: 複数サーバ対応基盤整備 - 完了

- ✅ 起動パラメータ解析の複数サーバ対応
- ✅ VoiceServiceのMap化とサーバ管理機能
- ✅ list_speakers/speak_responseのサーバID対応
- ✅ 後方互換性確保
- ✅ 関数リファクタリングとテスト整備

#### 🔄 Phase 2: AudioQuery型システム再設計 - 準備中

- ジェネリック基底クラスの実装
- VOICEVOX/Aivis/Coeiroink用派生クラス
- VoiceSynthesisServiceの特殊化
- 各サーバ特化AudioQueryの型定義

#### 📋 Phase 3: サーバ特化機能実装 - 計画中

- Aivis Speech専用パラメータ対応
- coeiroink v2エンドポイント対応
- 各サーバ最適化機能の実装

## Current Capabilities

### ✅ 実装済み機能

- **複数サーバ同時利用**: 最大N個のTTSサーバを同時管理・利用可能
- **統合話者リスト**: 全サーバから話者情報を取得・統合表示
- **サーバ指定音声合成**: server_idによる特定サーバでの音声合成
- **後方互換性**: 既存の単一サーバ設定も継続サポート
- **エラーハンドリング**: サーバ障害時の適切な処理とフォールバック

### 🎯 使用例

```bash
# 複数サーバ同時利用
node server.js \
  --server "voicevox-main,http://localhost:50021,voicevox" \
  --server "aivis-local,http://localhost:10101,aivis" \
  --server "coeiroink,http://localhost:50032,coeiroink_v2"

# 従来の単一サーバ（後方互換性）
node server.js --engine aivis --url http://localhost:10101
```

---

_This file should be updated frequently - ideally daily or at minimum weekly._
