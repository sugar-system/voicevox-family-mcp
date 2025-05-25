/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccentPhrase } from '../models/AccentPhrase';
import type { AudioQuery } from '../models/AudioQuery';
import type { Body_setting_post_setting_post } from '../models/Body_setting_post_setting_post';
import type { DownloadableLibrary } from '../models/DownloadableLibrary';
import type { EngineManifest } from '../models/EngineManifest';
import type { MorphableTargetInfo } from '../models/MorphableTargetInfo';
import type { Preset } from '../models/Preset';
import type { Speaker } from '../models/Speaker';
import type { SpeakerInfo } from '../models/SpeakerInfo';
import type { SupportedDevicesInfo } from '../models/SupportedDevicesInfo';
import type { SVModelInfo } from '../models/SVModelInfo';
import type { UserDictWord } from '../models/UserDictWord';
import type { WordTypes } from '../models/WordTypes';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class Service {
  /**
   * 音声合成用のクエリを作成する
   * クエリの初期値を得ます。ここで得られたクエリはそのまま音声合成に利用できます。各値の意味は`Schemas`を参照してください。
   * @param text
   * @param speaker
   * @param coreVersion
   * @returns AudioQuery Successful Response
   * @throws ApiError
   */
  public static audioQueryAudioQueryPost(
    text: string,
    speaker: number,
    coreVersion?: string,
  ): CancelablePromise<AudioQuery> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/audio_query',
      query: {
        text: text,
        speaker: speaker,
        core_version: coreVersion,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * 音声合成用のクエリをプリセットを用いて作成する
   * クエリの初期値を得ます。ここで得られたクエリはそのまま音声合成に利用できます。各値の意味は`Schemas`を参照してください。
   * @param text
   * @param presetId
   * @param coreVersion
   * @returns AudioQuery Successful Response
   * @throws ApiError
   */
  public static audioQueryFromPresetAudioQueryFromPresetPost(
    text: string,
    presetId: number,
    coreVersion?: string,
  ): CancelablePromise<AudioQuery> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/audio_query_from_preset',
      query: {
        text: text,
        preset_id: presetId,
        core_version: coreVersion,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * テキストからアクセント句を得る
   * テキストからアクセント句を得ます。
   * is_kanaが`true`のとき、テキストは次のようなAquesTalkライクな記法に従う読み仮名として処理されます。デフォルトは`false`です。
   * * 全てのカナはカタカナで記述される
   * * アクセント句は`/`または`、`で区切る。`、`で区切った場合に限り無音区間が挿入される。
   * * カナの手前に`_`を入れるとそのカナは無声化される
   * * アクセント位置を`'`で指定する。全てのアクセント句にはアクセント位置を1つ指定する必要がある。
   * * アクセント句末に`？`(全角)を入れることにより疑問文の発音ができる。
   * @param text
   * @param speaker
   * @param isKana
   * @param coreVersion
   * @returns AccentPhrase Successful Response
   * @throws ApiError
   */
  public static accentPhrasesAccentPhrasesPost(
    text: string,
    speaker: number,
    isKana: boolean = false,
    coreVersion?: string,
  ): CancelablePromise<Array<AccentPhrase>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/accent_phrases',
      query: {
        text: text,
        speaker: speaker,
        is_kana: isKana,
        core_version: coreVersion,
      },
      errors: {
        400: `読み仮名のパースに失敗`,
        422: `Validation Error`,
      },
    });
  }
  /**
   * アクセント句から音高・音素長を得る
   * @param speaker
   * @param requestBody
   * @param coreVersion
   * @returns AccentPhrase Successful Response
   * @throws ApiError
   */
  public static moraDataMoraDataPost(
    speaker: number,
    requestBody: Array<AccentPhrase>,
    coreVersion?: string,
  ): CancelablePromise<Array<AccentPhrase>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/mora_data',
      query: {
        speaker: speaker,
        core_version: coreVersion,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * アクセント句から音素長を得る
   * @param speaker
   * @param requestBody
   * @param coreVersion
   * @returns AccentPhrase Successful Response
   * @throws ApiError
   */
  public static moraLengthMoraLengthPost(
    speaker: number,
    requestBody: Array<AccentPhrase>,
    coreVersion?: string,
  ): CancelablePromise<Array<AccentPhrase>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/mora_length',
      query: {
        speaker: speaker,
        core_version: coreVersion,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * アクセント句から音高を得る
   * @param speaker
   * @param requestBody
   * @param coreVersion
   * @returns AccentPhrase Successful Response
   * @throws ApiError
   */
  public static moraPitchMoraPitchPost(
    speaker: number,
    requestBody: Array<AccentPhrase>,
    coreVersion?: string,
  ): CancelablePromise<Array<AccentPhrase>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/mora_pitch',
      query: {
        speaker: speaker,
        core_version: coreVersion,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * 音声合成する
   * @param speaker
   * @param requestBody
   * @param enableInterrogativeUpspeak 疑問系のテキストが与えられたら語尾を自動調整する
   * @param coreVersion
   * @returns binary Successful Response
   * @throws ApiError
   */
  public static synthesisSynthesisPost(
    speaker: number,
    requestBody: AudioQuery,
    enableInterrogativeUpspeak: boolean = true,
    coreVersion?: string,
  ): CancelablePromise<Blob> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/synthesis',
      query: {
        speaker: speaker,
        enable_interrogative_upspeak: enableInterrogativeUpspeak,
        core_version: coreVersion,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * 音声合成する（キャンセル可能）
   * @param speaker
   * @param requestBody
   * @param coreVersion
   * @returns binary Successful Response
   * @throws ApiError
   */
  public static cancellableSynthesisCancellableSynthesisPost(
    speaker: number,
    requestBody: AudioQuery,
    coreVersion?: string,
  ): CancelablePromise<Blob> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/cancellable_synthesis',
      query: {
        speaker: speaker,
        core_version: coreVersion,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * 複数まとめて音声合成する
   * @param speaker
   * @param requestBody
   * @param coreVersion
   * @returns binary Successful Response
   * @throws ApiError
   */
  public static multiSynthesisMultiSynthesisPost(
    speaker: number,
    requestBody: Array<AudioQuery>,
    coreVersion?: string,
  ): CancelablePromise<Blob> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/multi_synthesis',
      query: {
        speaker: speaker,
        core_version: coreVersion,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * 指定した話者に対してエンジン内の話者がモーフィングが可能か判定する
   * 指定されたベース話者に対してエンジン内の各話者がモーフィング機能を利用可能か返します。
   * モーフィングの許可/禁止は`/speakers`の`speaker.supported_features.synthesis_morphing`に記載されています。
   * プロパティが存在しない場合は、モーフィングが許可されているとみなします。
   * 返り値の話者はstring型なので注意。
   * @param requestBody
   * @param coreVersion
   * @returns MorphableTargetInfo Successful Response
   * @throws ApiError
   */
  public static morphableTargetsMorphableTargetsPost(
    requestBody: Array<number>,
    coreVersion?: string,
  ): CancelablePromise<Array<Record<string, MorphableTargetInfo>>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/morphable_targets',
      query: {
        core_version: coreVersion,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * 2人の話者でモーフィングした音声を合成する
   * 指定された2人の話者で音声を合成、指定した割合でモーフィングした音声を得ます。
   * モーフィングの割合は`morph_rate`で指定でき、0.0でベースの話者、1.0でターゲットの話者に近づきます。
   * @param baseSpeaker
   * @param targetSpeaker
   * @param morphRate
   * @param requestBody
   * @param coreVersion
   * @returns binary Successful Response
   * @throws ApiError
   */
  public static synthesisMorphingSynthesisMorphingPost(
    baseSpeaker: number,
    targetSpeaker: number,
    morphRate: number,
    requestBody: AudioQuery,
    coreVersion?: string,
  ): CancelablePromise<Blob> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/synthesis_morphing',
      query: {
        base_speaker: baseSpeaker,
        target_speaker: targetSpeaker,
        morph_rate: morphRate,
        core_version: coreVersion,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * base64エンコードされた複数のwavデータを一つに結合する
   * base64エンコードされたwavデータを一纏めにし、wavファイルで返します。
   * @param requestBody
   * @returns binary Successful Response
   * @throws ApiError
   */
  public static connectWavesConnectWavesPost(requestBody: Array<string>): CancelablePromise<Blob> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/connect_waves',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Get Presets
   * エンジンが保持しているプリセットの設定を返します
   *
   * Returns
   * -------
   * presets: List[Preset]
   * プリセットのリスト
   * @returns Preset Successful Response
   * @throws ApiError
   */
  public static getPresetsPresetsGet(): CancelablePromise<Array<Preset>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/presets',
    });
  }
  /**
   * Add Preset
   * 新しいプリセットを追加します
   *
   * Parameters
   * -------
   * preset: Preset
   * 新しいプリセット。
   * プリセットIDが既存のものと重複している場合は、新規のプリセットIDが採番されます。
   *
   * Returns
   * -------
   * id: int
   * 追加したプリセットのプリセットID
   * @param requestBody
   * @returns number Successful Response
   * @throws ApiError
   */
  public static addPresetAddPresetPost(requestBody: Preset): CancelablePromise<number> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/add_preset',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Update Preset
   * 既存のプリセットを更新します
   *
   * Parameters
   * -------
   * preset: Preset
   * 更新するプリセット。
   * プリセットIDが更新対象と一致している必要があります。
   *
   * Returns
   * -------
   * id: int
   * 更新したプリセットのプリセットID
   * @param requestBody
   * @returns number Successful Response
   * @throws ApiError
   */
  public static updatePresetUpdatePresetPost(requestBody: Preset): CancelablePromise<number> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/update_preset',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Delete Preset
   * 既存のプリセットを削除します
   *
   * Parameters
   * -------
   * id: int
   * 削除するプリセットのプリセットID
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static deletePresetDeletePresetPost(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/delete_preset',
      query: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Version
   * @returns any Successful Response
   * @throws ApiError
   */
  public static versionVersionGet(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/version',
    });
  }
  /**
   * Core Versions
   * @returns string Successful Response
   * @throws ApiError
   */
  public static coreVersionsCoreVersionsGet(): CancelablePromise<Array<string>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/core_versions',
    });
  }
  /**
   * Speakers
   * @param coreVersion
   * @returns Speaker Successful Response
   * @throws ApiError
   */
  public static speakersSpeakersGet(coreVersion?: string): CancelablePromise<Array<Speaker>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/speakers',
      query: {
        core_version: coreVersion,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Speaker Info
   * 指定されたspeaker_uuidに関する情報をjson形式で返します。
   * 画像や音声はbase64エンコードされたものが返されます。
   *
   * Returns
   * -------
   * ret_data: SpeakerInfo
   * @param speakerUuid
   * @param coreVersion
   * @returns SpeakerInfo Successful Response
   * @throws ApiError
   */
  public static speakerInfoSpeakerInfoGet(
    speakerUuid: string,
    coreVersion?: string,
  ): CancelablePromise<SpeakerInfo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/speaker_info',
      query: {
        speaker_uuid: speakerUuid,
        core_version: coreVersion,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Downloadable Libraries
   * ダウンロード可能なモデル情報を返します。
   *
   * Returns
   * -------
   * ret_data: List[DownloadableLibrary]
   * @returns DownloadableLibrary Successful Response
   * @throws ApiError
   */
  public static downloadableLibrariesDownloadableLibrariesGet(): CancelablePromise<
    Array<DownloadableLibrary>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/downloadable_libraries',
    });
  }
  /**
   * Initialize Speaker
   * 指定されたspeaker_idの話者を初期化します。
   * 実行しなくても他のAPIは使用できますが、初回実行時に時間がかかることがあります。
   * @param speaker
   * @param skipReinit 既に初期化済みの話者の再初期化をスキップするかどうか
   * @param coreVersion
   * @returns void
   * @throws ApiError
   */
  public static initializeSpeakerInitializeSpeakerPost(
    speaker: number,
    skipReinit: boolean = false,
    coreVersion?: string,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/initialize_speaker',
      query: {
        speaker: speaker,
        skip_reinit: skipReinit,
        core_version: coreVersion,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Is Initialized Speaker
   * 指定されたspeaker_idの話者が初期化されているかどうかを返します。
   * @param speaker
   * @param coreVersion
   * @returns boolean Successful Response
   * @throws ApiError
   */
  public static isInitializedSpeakerIsInitializedSpeakerGet(
    speaker: number,
    coreVersion?: string,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/is_initialized_speaker',
      query: {
        speaker: speaker,
        core_version: coreVersion,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Get User Dict Words
   * ユーザー辞書に登録されている単語の一覧を返します。
   * 単語の表層形(surface)は正規化済みの物を返します。
   *
   * Returns
   * -------
   * Dict[str, UserDictWord]
   * 単語のUUIDとその詳細
   * @returns UserDictWord Successful Response
   * @throws ApiError
   */
  public static getUserDictWordsUserDictGet(): CancelablePromise<Record<string, UserDictWord>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user_dict',
    });
  }
  /**
   * Add User Dict Word
   * ユーザー辞書に言葉を追加します。
   *
   * Parameters
   * ----------
   * surface : str
   * 言葉の表層形
   * pronunciation: str
   * 言葉の発音（カタカナ）
   * accent_type: int
   * アクセント型（音が下がる場所を指す）
   * word_type: WordTypes, optional
   * PROPER_NOUN（固有名詞）、COMMON_NOUN（普通名詞）、VERB（動詞）、ADJECTIVE（形容詞）、SUFFIX（語尾）のいずれか
   * priority: int, optional
   * 単語の優先度（0から10までの整数）
   * 数字が大きいほど優先度が高くなる
   * 1から9までの値を指定することを推奨
   * @param surface
   * @param pronunciation
   * @param accentType
   * @param wordType
   * @param priority
   * @returns string Successful Response
   * @throws ApiError
   */
  public static addUserDictWordUserDictWordPost(
    surface: string,
    pronunciation: string,
    accentType: number,
    wordType?: WordTypes,
    priority?: number,
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/user_dict_word',
      query: {
        surface: surface,
        pronunciation: pronunciation,
        accent_type: accentType,
        word_type: wordType,
        priority: priority,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Rewrite User Dict Word
   * ユーザー辞書に登録されている言葉を更新します。
   *
   * Parameters
   * ----------
   * surface : str
   * 言葉の表層形
   * pronunciation: str
   * 言葉の発音（カタカナ）
   * accent_type: int
   * アクセント型（音が下がる場所を指す）
   * word_uuid: str
   * 更新する言葉のUUID
   * word_type: WordTypes, optional
   * PROPER_NOUN（固有名詞）、COMMON_NOUN（普通名詞）、VERB（動詞）、ADJECTIVE（形容詞）、SUFFIX（語尾）のいずれか
   * priority: int, optional
   * 単語の優先度（0から10までの整数）
   * 数字が大きいほど優先度が高くなる
   * 1から9までの値を指定することを推奨
   * @param wordUuid
   * @param surface
   * @param pronunciation
   * @param accentType
   * @param wordType
   * @param priority
   * @returns void
   * @throws ApiError
   */
  public static rewriteUserDictWordUserDictWordWordUuidPut(
    wordUuid: string,
    surface: string,
    pronunciation: string,
    accentType: number,
    wordType?: WordTypes,
    priority?: number,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/user_dict_word/{word_uuid}',
      path: {
        word_uuid: wordUuid,
      },
      query: {
        surface: surface,
        pronunciation: pronunciation,
        accent_type: accentType,
        word_type: wordType,
        priority: priority,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Delete User Dict Word
   * ユーザー辞書に登録されている言葉を削除します。
   *
   * Parameters
   * ----------
   * word_uuid: str
   * 削除する言葉のUUID
   * @param wordUuid
   * @returns void
   * @throws ApiError
   */
  public static deleteUserDictWordUserDictWordWordUuidDelete(
    wordUuid: string,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/user_dict_word/{word_uuid}',
      path: {
        word_uuid: wordUuid,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Import User Dict Words
   * 他のユーザー辞書をインポートします。
   *
   * Parameters
   * ----------
   * import_dict_data: Dict[str, UserDictWord]
   * インポートするユーザー辞書のデータ
   * override: bool
   * 重複したエントリがあった場合、上書きするかどうか
   * @param override
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static importUserDictWordsImportUserDictPost(
    override: boolean,
    requestBody: Record<string, UserDictWord>,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/import_user_dict',
      query: {
        override: override,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Supported Devices
   * @param coreVersion
   * @returns SupportedDevicesInfo Successful Response
   * @throws ApiError
   */
  public static supportedDevicesSupportedDevicesGet(
    coreVersion?: string,
  ): CancelablePromise<SupportedDevicesInfo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/supported_devices',
      query: {
        core_version: coreVersion,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Engine Manifest
   * @returns EngineManifest Successful Response
   * @throws ApiError
   */
  public static engineManifestEngineManifestGet(): CancelablePromise<EngineManifest> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/engine_manifest',
    });
  }
  /**
   * Get Sv Models
   * @returns string Successful Response
   * @throws ApiError
   */
  public static getSvModelsSvModelsGet(): CancelablePromise<Array<string>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sv_models',
    });
  }
  /**
   * Post Sv Model
   * svモデルを登録します。
   *
   * Parameters
   * ----------
   * uuid: str
   * モデル固有のUUID
   * variance_model: str
   * variance_model.onnxをbase64エンコードした文字列
   * embedder_model: str
   * embedder_model.onnxをbase64エンコードした文字列
   * decoder_model: str
   * decoder_model.onnxをbase64エンコードした文字列
   * metas: List[Speakers]
   * モデルのメタ情報
   * metas.jsonをlistにしたもの
   * model_config: ModelConfig
   * model_config.jsonをdictにした機械学習に利用するための情報
   * speaker_infos: Dict[str, SpeakerInfo]
   * keyをspeakerInfoのUUIDとした複数のspeaker情報
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static postSvModelSvModelPost(requestBody: SVModelInfo): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/sv_model',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Setting Get
   * @returns string Successful Response
   * @throws ApiError
   */
  public static settingGetSettingGet(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/setting',
    });
  }
  /**
   * Setting Post
   * @param formData
   * @returns string Successful Response
   * @throws ApiError
   */
  public static settingPostSettingPost(
    formData?: Body_setting_post_setting_post,
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/setting',
      formData: formData,
      mediaType: 'application/x-www-form-urlencoded',
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
