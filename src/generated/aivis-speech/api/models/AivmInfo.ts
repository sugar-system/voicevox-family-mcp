/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AivmManifest } from './AivmManifest';
import type { LibrarySpeaker } from './LibrarySpeaker';
/**
 * AIVM (Aivis Voice Model) 仕様に準拠した音声合成モデルのメタデータ情報。
 *
 * AIVM マニフェストには、音声合成モデルに関連する全てのメタデータが含まれる。
 * speakers フィールド内の話者情報は、VOICEVOX ENGINE との API 互換性のために、
 * AIVM マニフェストを基に Speaker / SpeakerStyle / SpeakerInfo / StyleInfo モデルに変換したもの。
 */
export type AivmInfo = {
  is_loaded: boolean;
  is_update_available: boolean;
  is_private_model: boolean;
  latest_version: string;
  file_path: string;
  file_size: number;
  manifest: AivmManifest;
  speakers: Array<LibrarySpeaker>;
};
