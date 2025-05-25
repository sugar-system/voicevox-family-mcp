# Development Standards

**Last Updated:** 2025/05/24
**Status:** 開発中

## Coding Standards

### TypeScript Guidelines

- **Null vs Undefined:** `undefined`を優先、ただし`value == null`と`value != null`は積極的に使用
- **Type Safety:** 厳密な型定義を心がけ、`any`の使用は最小限に
- **JSDoc:** 関数の目的、パラメータ、戻り値を明記

### Code Structure

- **Single Responsibility:** 各関数・クラスは単一の責務を持つ
- **Error Handling:** 適切なエラーハンドリングを実装
- **Early Returns:** ガード節には早期リターンを使用
- **Module Organization:** 関連する機能はモジュールまたはクラスとしてまとめる

### Testing Guidelines

- **Test Command:** `npm test`でテスト実行可能
- **Dependency Injection:** テスト容易性のため依存性を注入
- **Pure Functions:** 副作用を持つ関数は明確に分離
- **Logic Separation:** 条件分岐のあるロジックは、条件判定と処理を分離

## File Organization

```
src/
├── core/           # コアロジック
├── api/            # API層
├── http/           # HTTP通信層
├── types/          # 型定義
├── utils/          # ユーティリティ
└── __tests__/      # テストファイル
```

## Naming Conventions

- **Files:** kebab-case (`voice-mcp-server.ts`)
- **Classes:** PascalCase (`VoiceMcpServer`)
- **Functions:** camelCase (`createVoiceService`)
- **Constants:** UPPER_SNAKE_CASE (`DEFAULT_PORT`)
- **Interfaces:** PascalCase with 'I' prefix (`IVoiceSynthesisService`)

## Git Workflow

- **Branch Naming:** feature/機能名, fix/修正内容
- **Commit Messages:** 日本語OK、変更内容を明確に
- **Pull Requests:** 機能単位でPR作成

## Documentation Standards

- **README:** プロジェクト概要、セットアップ手順、使用方法
- **JSDoc:** 全ての公開関数・クラスに必須
- **Memory Bank:** 重要な設計決定や変更は必ず記録

## Quality Assurance

- **Linting:** ESLint + Prettier
- **Type Checking:** TypeScript strict mode
- **Testing:** Jest for unit tests
- **Coverage:** 主要ロジックは80%以上のカバレッジ目標

---

_Update this file when coding standards or conventions change._
