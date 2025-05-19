import z from 'zod';

/**
 * モーラ（子音＋母音）ごとの情報
 * @property {string} text - 子音＋母音に対応する文字
 * @property {string | null} consonant - 子音の音素（ない場合はnull）
 * @property {number | null} consonant_length - 子音の音長（ない場合はnull）
 * @property {string} vowel - 母音の音素
 * @property {number} vowel_length - 母音の音長
 * @property {number} pitch - 音高
 */
export const MoraSchema = z.object({
  text: z.string(),
  consonant: z.string().nullable(),
  consonant_length: z.number().nullable(),
  vowel: z.string(),
  vowel_length: z.number(),
  pitch: z.number(),
});
export type Mora = z.infer<typeof MoraSchema>;

/**
 * アクセント句ごとの情報
 * @property {Mora[]} moras - モーラのリスト
 * @property {number} accent - アクセント箇所
 * @property {Mora | null} pause_mora - 後ろに無音を付けるかどうか
 * @property {boolean} is_interrogative - 疑問系かどうか
 */
export const AccentPhraseSchema = z.object({
  moras: z.array(MoraSchema),
  accent: z.number(),
  pause_mora: MoraSchema.nullable(),
  is_interrogative: z.boolean(),
});
export type AccentPhrase = z.infer<typeof AccentPhraseSchema>;

/**
 * 音声合成用のクエリ
 * @property {AccentPhrase[]} accent_phrases - アクセント句のリスト
 * @property {number} speedScale - 全体の話速
 * @property {number} intonationScale - 全体のスタイルの強さ
 * @property {number} [tempoDynamicsScale] - 全体のテンポの緩急（省略可）
 * @property {number} pitchScale - 全体の音高
 * @property {number} volumeScale - 全体の音量
 * @property {number} prePhonemeLength - 音声の前の無音時間（秒）
 * @property {number} postPhonemeLength - 音声の後の無音時間（秒）
 * @property {number | null} [pauseLength] - 句読点などの無音時間（省略可）
 * @property {number} [pauseLengthScale] - 句読点などの無音時間（倍率、省略可）
 * @property {number} outputSamplingRate - 音声データの出力サンプリングレート
 * @property {boolean} outputStereo - 音声データをステレオ出力するか否か
 * @property {string} kana - 読み上げるテキスト
 */
export const AudioQuerySchema = z.object({
  accent_phrases: z.array(AccentPhraseSchema),
  speedScale: z.number(),
  intonationScale: z.number(),
  tempoDynamicsScale: z.number().optional(),
  pitchScale: z.number(),
  volumeScale: z.number(),
  prePhonemeLength: z.number(),
  postPhonemeLength: z.number(),
  pauseLength: z.number().nullable().optional(),
  pauseLengthScale: z.number().optional(),
  outputSamplingRate: z.number(),
  outputStereo: z.boolean(),
  kana: z.string(),
});
export type AudioQuery = z.infer<typeof AudioQuerySchema>;

/**
 * AudioQuery型かどうかを判定するユーザー定義型ガード
 * @param data - 判定したい値
 * @returns dataがAudioQuery型ならtrue
 */
export function isAudioQuery(data: unknown): data is AudioQuery {
  return AudioQuerySchema.safeParse(data).success;
}
