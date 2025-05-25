# 各サーバのAudioQuery

各TTSサーバ毎にAudioQueryについて、特にそれぞれの違いについてまとめる

## VOICEVOX と Aivis Speech

### Aivis Speechの追加プロパティ

Aivis SpeechはVOICEVOXのフォークで、TTSエンジン部分が変更されている。
AudioQueryにもいくつか追加プロパティがある。

### Aivis SpeechのAudioQueryでは音長・音高はダミー値である

Aivis Speechでは音声合成エンジンにStyle-Bert-VITS2を採用していて、VOICEVOXと音声合成エンジンのアーキテクチャが異なる。

> AivisSpeechで使っている Style-Bert-VITS2 (Bert-VITS2) はE2Eアーキテクチャで根本的に設計が異なり、音声合成時に音素長や音高を指定することができない。根本的に音声合成前の音素長算出が不可能なため...

とのことで、モーラに含まれる音長・音高はすべてダミー値である（後述）。

## VOICEVOX と coeiroink

coeiroink V2のAudioQueryはVOICEVOXと構造が全く同一。
AccentPhraseも、Moraに至るまで同一。

## AudioQueryの構造

### VOICEVOXのAudioQueryに含まれるプロパティ

説明文はAivis Speech APIのものを利用した。

- accent_phrases: Array\<AccentPhrase\>
- speedScale: number
  - 全体の話速を 0.5 ~ 2.0 の範囲で指定する (デフォルト: 1.0) 。
  - 2.0 で 2 倍速、0.5 で 0.5 倍速になる。
- intonationScale: number
  - 話者スタイルの声色の強弱を 0.0 ~ 2.0 の範囲で指定する (デフォルト: 1.0) 。
  - 値が大きいほどそのスタイルに近い抑揚がついた声になる。
  - 例えば話者スタイルが「うれしい」なら、値が大きいほどより嬉しそうな明るい話し方になる。
  - 一方、話者やスタイルによっては、数値を上げすぎると発声がおかしくなったり、棒読みで不自然な声になる場合もある。
  - ちゃんと発声できる「スタイルの強さ」の上限は話者やスタイルによって異なるため、適宜調整が必要。
  - 全スタイルの平均であるノーマルスタイルには指定できない (値にかかわらず無視される) 。
- pitchScale: number
  - 全体の音高を -0.15 ~ 0.15 の範囲で指定する (デフォルト: 0.0) 。
  - 値が大きいほど高い声になる。
  - VOICEVOX ENGINE と異なり、この値を 0.0 から変更すると音質が劣化するため注意が必要。
- volumeScale: number
  - 全体の音量を 0.0 ~ 2.0 の範囲で指定する (デフォルト: 1.0) 。
  - 値が大きいほど大きな声になる。
- prePhonemeLength: number
- postPhonemeLength: number
- outputSamplingRate: number
- outputStereo: boolean
- kana?: string
  - 読み上げるテキストを指定する。
  - VOICEVOX ENGINE では AquesTalk 風記法テキストが入る読み取り専用フィールドだが (音声合成時には無視される) 、AivisSpeech Engine では音声合成時に漢字や記号が含まれた通常の読み上げテキストも必要なため、苦肉の策で読み上げテキスト指定用のフィールドとして転用した。
  - VOICEVOX ENGINE との互換性のため None や空文字列が指定された場合も動作するが、その場合はアクセント句から自動生成されたひらがな文字列が読み上げテキストになるため、不自然なイントネーションになってしまう。
  - 可能な限り kana に通常の読み上げテキストを指定した上で音声合成 API に渡すことを推奨する。

### Aivis SpeechのAudioQuery固有のプロパティ

Aivis SpeechのAudioQueryは、VOICEVOXのプロパティに加えて以下の固有プロパティを持つ。

- tempoDynamicsScale?: number
  - 話す速さの緩急の強弱を 0.0 ~ 2.0 の範囲で指定する (デフォルト: 1.0) 。
  - 値が大きいほどより早口で生っぽい抑揚がついた声になる。
  - VOICEVOX ENGINE との互換性のため、未指定時はデフォルト値が適用される。
- pauseLength?: (number | null)
  - 句読点などの無音時間。null のときは無視される。デフォルト値は null 。
- pauseLengthScale?: number
  - 句読点などの無音時間（倍率）。デフォルト値は 1 。

### AccentPhrase

アクセント句ごとの情報。「調声」に大きな影響があると思われる。
これは本MCPが対応するTTSサーバすべてにおいて構造が同一だが、
前述の通りAivis Speechはこれを参照していない見込みが大きい。

- moras: Array\<Mora\>
  - モーラのリスト
- accent: number
  - アクセント箇所
- pause_mora?: Mora
  - 後ろに無音を付けるかどうか
- is_interrogative?: boolean
  - 疑問系かどうか

### Mora

子音＋母音に対応する文字。

- text: string;
- consonant?: string;
- consonant_length?: number
  - 子音の音長。
- vowel: string
- vowel_length: number
  - 母音の音長。
- pitch: number
  - 音高。

### Aivis SpeechのMora

音声合成エンジンのアーキテクチャが異なるため、VOICEVOXとは違いが大きい。

- VOICEVOX ENGINE と異なり、感嘆符・句読点などの記号もモーラに含まれる。
- 記号モーラの場合、`text` には記号がそのまま、`vowel` には "pau" が設定される。
- 音長・音高においては、AivisSpeech Engine の実装上算出できないため、ダミー値として常に 0.0 が返される。
