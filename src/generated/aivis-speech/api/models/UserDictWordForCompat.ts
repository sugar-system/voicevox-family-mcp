/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * UserDictWord とほとんど同じだが、ユーザー辞書関連 API の後方互換性を保つための互換レイヤー。
 *
 * stem, yomi, pronunciation, accent_type, mora_count はリストではなく文字列/数値で表す。
 * 既に UserDictWord にバリデーションが実装されていることから、重複するバリデーション定義は削られている。
 */
export type UserDictWordForCompat = {
  /**
   * 表層形
   */
  surface: string;
  /**
   * 優先度
   */
  priority: number;
  /**
   * 文脈 ID
   */
  context_id?: number;
  /**
   * 品詞
   */
  part_of_speech: string;
  /**
   * 品詞細分類1
   */
  part_of_speech_detail_1: string;
  /**
   * 品詞細分類2
   */
  part_of_speech_detail_2: string;
  /**
   * 品詞細分類3
   */
  part_of_speech_detail_3: string;
  /**
   * 活用型
   */
  inflectional_type: string;
  /**
   * 活用形
   */
  inflectional_form: string;
  /**
   * 原形
   */
  stem: string;
  /**
   * 読み
   */
  yomi: string;
  /**
   * 発音
   */
  pronunciation: string;
  /**
   * アクセント型
   */
  accent_type: number;
  /**
   * モーラ数
   */
  mora_count?: number;
  /**
   * アクセント結合規則
   */
  accent_associative_rule: string;
};
