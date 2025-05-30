/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 読み仮名のパースに失敗した。
 */
export type ParseKanaBadRequest = {
  /**
   * エラーメッセージ
   */
  text: string;
  /**
   * エラー名
   *
   * |name|description|
   * |---|---|
   * | UNKNOWN_TEXT | 判別できない読み仮名があります: {text} |
   * | ACCENT_TOP | 句頭にアクセントは置けません: {text} |
   * | ACCENT_TWICE | 1つのアクセント句に二つ以上のアクセントは置けません: {text} |
   * | ACCENT_NOTFOUND | アクセントを指定していないアクセント句があります: {text} |
   * | EMPTY_PHRASE | {position}番目のアクセント句が空白です |
   * | INTERROGATION_MARK_NOT_AT_END | アクセント句末以外に「？」は置けません: {text} |
   * | INFINITE_LOOP | 処理時に無限ループになってしまいました...バグ報告をお願いします。 |
   */
  error_name: string;
  /**
   * エラーを起こした箇所
   */
  error_args: Record<string, string>;
};
