/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * プリセット情報。
 */
export type Preset = {
  id: number;
  name: string;
  speaker_uuid: string;
  style_id: number;
  /**
   * 全体の話速を 0.5 ~ 2.0 の範囲で指定する (デフォルト: 1.0) 。
   * 2.0 で 2 倍速、0.5 で 0.5 倍速になる。
   */
  speedScale: number;
  /**
   * 話者スタイルの声色の強弱を 0.0 ~ 2.0 の範囲で指定する (デフォルト: 1.0) 。
   * 値が大きいほどそのスタイルに近い抑揚がついた声になる。
   * 例えば話者スタイルが「うれしい」なら、値が大きいほどより嬉しそうな明るい話し方になる。
   * 一方、話者やスタイルによっては、数値を上げすぎると発声がおかしくなったり、棒読みで不自然な声になる場合もある。
   * ちゃんと発声できる「スタイルの強さ」の上限は話者やスタイルによって異なるため、適宜調整が必要。
   * 全スタイルの平均であるノーマルスタイルには指定できない (値にかかわらず無視される) 。
   */
  intonationScale: number;
  /**
   * 話す速さの緩急の強弱を 0.0 ~ 2.0 の範囲で指定する (デフォルト: 1.0) 。
   * 値が大きいほどより早口で生っぽい抑揚がついた声になる。
   * VOICEVOX ENGINE との互換性のため、未指定時はデフォルト値が適用される。
   */
  tempoDynamicsScale?: number;
  /**
   * 全体の音高を -0.15 ~ 0.15 の範囲で指定する (デフォルト: 0.0) 。
   * 値が大きいほど高い声になる。
   * VOICEVOX ENGINE と異なり、この値を 0.0 から変更すると音質が劣化するため注意が必要。
   */
  pitchScale: number;
  /**
   * 全体の音量を 0.0 ~ 2.0 の範囲で指定する (デフォルト: 1.0) 。
   * 値が大きいほど大きな声になる。
   */
  volumeScale: number;
  prePhonemeLength: number;
  postPhonemeLength: number;
  /**
   * 句読点などの無音時間。null のときは無視される。デフォルト値は null 。
   */
  pauseLength?: number;
  /**
   * 句読点などの無音時間（倍率）。デフォルト値は 1 。
   */
  pauseLengthScale?: number;
};
