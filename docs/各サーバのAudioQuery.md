# 各サーバのAudioQuery

各TTSサーバ毎にAudioQueryについて、特にそれぞれの違いについてまとめる

## VOICEVOX と Aivis Speech

### Aivis Speechの追加プロパティ

Aivis SpeechはVOICEVOXのフォークで、TTSエンジン部分が変更されている。
AudioQueryにもいくつか追加プロパティがある。

- tempoDynamicsScale?: number;

  - 話す速さの緩急の強弱を 0.0 ~ 2.0 の範囲で指定する (デフォルト: 1.0) 。
  - 値が大きいほどより早口で生っぽい抑揚がついた声になる。
  - VOICEVOX ENGINE との互換性のため、未指定時はデフォルト値が適用される。

- pauseLength?: (number | null);

  - 句読点などの無音時間。null のときは無視される。デフォルト値は null 。

- pauseLengthScale?: number;
  - 句読点などの無音時間（倍率）。デフォルト値は 1 。

他は共通。AccentPhraseも。

### AccentPhrase

アクセント句ごとの情報。「調声」に大きな影響があると思われる。

- moras: Array<Mora>;
  - モーラのリスト
- accent: number;
  - アクセント箇所
- pause_mora?: Mora;
  - 後ろに無音を付けるかどうか
- is_interrogative?: boolean;
  - 疑問系かどうか

## VOICEVOX と coeiroink

coeiroink V2のAudioQueryはVOICEVOXと構造が全く同一。
AccentPhraseも、Moraに至るまで同一。
