/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StyleInfo } from './StyleInfo';
/**
 * キャラクターの追加情報
 */
export type SpeakerInfo = {
  /**
   * policy.md
   */
  policy: string;
  /**
   * アイコンを base64 エンコードしたもの、あるいは URL (「立ち絵画像を base64 エンコードしたもの」ではない点で VOICEVOX ENGINE と異なる)
   */
  portrait: string;
  /**
   * スタイルの追加情報
   */
  style_infos: Array<StyleInfo>;
};
