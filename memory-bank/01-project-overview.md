# Project Overview

**Last Updated:** 2025/05/24
**Status:** 開発中

## Project Summary

- **Project Name:** voicevox-family-mcp
- **Description:** VOICEVOX系列のTTSエンジンをClaude等のAIツールから統一的に操作するためのMCPサーバ
- **Primary Goal:** 複数のVOICEVOX互換TTSサーバに対応した、統一されたインターフェースの提供

## Supported TTS Engines

- VOICEVOX (オリジナル)
- Aivis Speech (VOICEVOX互換 + 拡張機能) **拡張AudioQueryには現在未対応**
- coeiroink v1 (VOICEVOX互換)
- coeiroink v2 (エンドポイント拡張、AudioQuery互換) **現在未対応**

## Success Criteria

1. 全てのサポート対象TTSエンジンでの音声生成
2. MCPプロトコルでの安定した動作（複雑すぎないツールAPI）
3. 構造化アーキテクチャの維持と発展
4. Windows, Mac, Linuxプラットフォームに対応

## Milestones

- **Milestone 1:** 複数TTSサーバの同時利用を可能に
- **Milestone 2:** coeiroink v2へ対応

---

_This file should be updated whenever project scope, goals, or key stakeholders change._
