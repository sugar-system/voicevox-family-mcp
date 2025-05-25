/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * スタイルの追加情報
 */
export type StyleInfo = {
  /**
   * スタイル ID
   */
  id: number;
  /**
   * このスタイルのアイコンを base64 エンコードしたもの、あるいは URL
   */
  icon: string;
  /**
   * AivisSpeech Engine では常に None を返す (「このスタイルの立ち絵画像を base64 エンコードしたもの」ではない点で VOICEVOX ENGINE と異なる)
   */
  portrait?: string;
  /**
   * ボイスサンプルの音声データを base64 エンコードしたもの、あるいは URL
   */
  voice_samples: Array<string>;
  /**
   * ボイスサンプルの書き起こしテキスト (voice_samples の配列インデックスと対応し、存在しない場合は空文字列)
   */
  voice_sample_transcripts?: Array<string>;
};
