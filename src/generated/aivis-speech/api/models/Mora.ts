/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * モーラ（子音＋母音）ごとの情報。
 */
export type Mora = {
  /**
   * 子音＋母音に対応する文字。
   * VOICEVOX ENGINE と異なり、感嘆符・句読点などの記号もモーラに含まれる。
   * 記号モーラの場合、`text` には記号がそのまま、`vowel` には "pau" が設定される。
   */
  text: string;
  consonant?: string;
  /**
   * 子音の音長。
   * AivisSpeech Engine の実装上算出できないため、ダミー値として常に 0.0 が返される。
   */
  consonant_length?: number;
  vowel: string;
  /**
   * 母音の音長。
   * AivisSpeech Engine の実装上算出できないため、ダミー値として常に 0.0 が返される。
   */
  vowel_length: number;
  /**
   * 音高。
   * AivisSpeech Engine の実装上算出できないため、ダミー値として常に 0.0 が返される。
   */
  pitch: number;
};
