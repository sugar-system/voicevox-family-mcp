/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WordTypes } from './WordTypes';
/**
 * ユーザー辞書のビルドに必要な単語情報。
 *
 * 単語登録・変更リクエストで受け取った単語情報のバリデーションと JSON への保存に用いる。
 */
export type UserDictWord = {
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
     * 品詞種別
     */
    word_type?: WordTypes;
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
    stem: Array<string>;
    /**
     * 読み
     */
    yomi: Array<string>;
    /**
     * 発音
     */
    pronunciation: Array<string>;
    /**
     * アクセント型
     */
    accent_type: Array<number>;
    /**
     * モーラ数
     */
    mora_count?: Array<number>;
    /**
     * アクセント結合規則
     */
    accent_associative_rule: string;
};

