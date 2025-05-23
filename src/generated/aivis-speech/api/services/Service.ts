/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccentPhrase } from '../models/AccentPhrase';
import type { AivmInfo } from '../models/AivmInfo';
import type { AudioQuery } from '../models/AudioQuery';
import type { Body_install_model_aivm_models_install_post } from '../models/Body_install_model_aivm_models_install_post';
import type { Body_setting_post_setting_post } from '../models/Body_setting_post_setting_post';
import type { Body_sing_frame_f0_sing_frame_f0_post } from '../models/Body_sing_frame_f0_sing_frame_f0_post';
import type { Body_sing_frame_volume_sing_frame_volume_post } from '../models/Body_sing_frame_volume_sing_frame_volume_post';
import type { EngineManifest } from '../models/EngineManifest';
import type { FrameAudioQuery } from '../models/FrameAudioQuery';
import type { MorphableTargetInfo } from '../models/MorphableTargetInfo';
import type { Preset } from '../models/Preset';
import type { Score } from '../models/Score';
import type { Speaker } from '../models/Speaker';
import type { SpeakerInfo } from '../models/SpeakerInfo';
import type { SupportedDevicesInfo } from '../models/SupportedDevicesInfo';
import type { UserDictWord } from '../models/UserDictWord';
import type { UserDictWordForCompat } from '../models/UserDictWordForCompat';
import type { WordTypes } from '../models/WordTypes';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class Service {
    /**
     * 音声合成用のクエリを作成する
     * 音声合成用のクエリの初期値を得ます。ここで得られたクエリはそのまま音声合成に利用できます。<br>
     * 各値の意味は `Schemas` を参照してください。
     * @param text
     * @param speaker
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns AudioQuery Successful Response
     * @throws ApiError
     */
    public static audioQuery(
        text: string,
        speaker: number,
        coreVersion?: string,
    ): CancelablePromise<AudioQuery> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/audio_query',
            query: {
                'text': text,
                'speaker': speaker,
                'core_version': coreVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 音声合成用のクエリをプリセットを用いて作成する
     * 音声合成用のクエリの初期値を得ます。ここで得られたクエリはそのまま音声合成に利用できます。<br>
     * 各値の意味は `Schemas` を参照してください。
     * @param text
     * @param presetId
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns AudioQuery Successful Response
     * @throws ApiError
     */
    public static audioQueryFromPreset(
        text: string,
        presetId: number,
        coreVersion?: string,
    ): CancelablePromise<AudioQuery> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/audio_query_from_preset',
            query: {
                'text': text,
                'preset_id': presetId,
                'core_version': coreVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * テキストからアクセント句を得る
     * テキストからアクセント句を得ます。<br>
     * is_kanaが`true`のとき、テキストは次の AquesTalk 風記法で解釈されます。デフォルトは`false`です。
     * * 全てのカナはカタカナで記述される
     * * アクセント句は`/`または`、`で区切る。`、`で区切った場合に限り無音区間が挿入される。
     * * カナの手前に`_`を入れるとそのカナは無声化される
     * * アクセント位置を`'`で指定する。全てのアクセント句にはアクセント位置を1つ指定する必要がある。
     * * アクセント句末に`？`(全角)を入れることにより疑問文の発音ができる。
     * @param text
     * @param speaker
     * @param isKana
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns AccentPhrase Successful Response
     * @throws ApiError
     */
    public static accentPhrases(
        text: string,
        speaker: number,
        isKana: boolean = false,
        coreVersion?: string,
    ): CancelablePromise<Array<AccentPhrase>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/accent_phrases',
            query: {
                'text': text,
                'speaker': speaker,
                'is_kana': isKana,
                'core_version': coreVersion,
            },
            errors: {
                400: `読み仮名のパースに失敗`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * アクセント句から音高・音素長を得る (AivisSpeech Engine では常にダミーの値が返されます)
     * @param speaker
     * @param requestBody
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns AccentPhrase Successful Response
     * @throws ApiError
     */
    public static moraData(
        speaker: number,
        requestBody: Array<AccentPhrase>,
        coreVersion?: string,
    ): CancelablePromise<Array<AccentPhrase>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/mora_data',
            query: {
                'speaker': speaker,
                'core_version': coreVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * アクセント句から音素長を得る (AivisSpeech Engine では常にダミーの値が返されます)
     * @param speaker
     * @param requestBody
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns AccentPhrase Successful Response
     * @throws ApiError
     */
    public static moraLength(
        speaker: number,
        requestBody: Array<AccentPhrase>,
        coreVersion?: string,
    ): CancelablePromise<Array<AccentPhrase>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/mora_length',
            query: {
                'speaker': speaker,
                'core_version': coreVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * アクセント句から音高を得る (AivisSpeech Engine では常にダミーの値が返されます)
     * @param speaker
     * @param requestBody
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns AccentPhrase Successful Response
     * @throws ApiError
     */
    public static moraPitch(
        speaker: number,
        requestBody: Array<AccentPhrase>,
        coreVersion?: string,
    ): CancelablePromise<Array<AccentPhrase>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/mora_pitch',
            query: {
                'speaker': speaker,
                'core_version': coreVersion,
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
     * 指定されたスタイル ID に紐づく音声合成モデルを用いて音声合成を行います。
     * @param speaker
     * @param requestBody
     * @param enableInterrogativeUpspeak AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns binary Successful Response
     * @throws ApiError
     */
    public static synthesis(
        speaker: number,
        requestBody: AudioQuery,
        enableInterrogativeUpspeak: boolean = true,
        coreVersion?: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/synthesis',
            query: {
                'speaker': speaker,
                'enable_interrogative_upspeak': enableInterrogativeUpspeak,
                'core_version': coreVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * AivisSpeech Engine ではサポートされていない API です (常に 501 Not Implemented を返します)
     * @param speaker
     * @param requestBody
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns binary Successful Response
     * @throws ApiError
     */
    public static cancellableSynthesis(
        speaker: number,
        requestBody: AudioQuery,
        coreVersion?: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cancellable_synthesis',
            query: {
                'speaker': speaker,
                'core_version': coreVersion,
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
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns binary Successful Response
     * @throws ApiError
     */
    public static multiSynthesis(
        speaker: number,
        requestBody: Array<AudioQuery>,
        coreVersion?: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/multi_synthesis',
            query: {
                'speaker': speaker,
                'core_version': coreVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * AivisSpeech Engine ではサポートされていない API です (常に 501 Not Implemented を返します)
     * @param speaker
     * @param requestBody
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns FrameAudioQuery Successful Response
     * @throws ApiError
     */
    public static singFrameAudioQuery(
        speaker: number,
        requestBody: Score,
        coreVersion?: string,
    ): CancelablePromise<FrameAudioQuery> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sing_frame_audio_query',
            query: {
                'speaker': speaker,
                'core_version': coreVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * AivisSpeech Engine ではサポートされていない API です (常に 501 Not Implemented を返します)
     * @param speaker
     * @param requestBody
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns number Successful Response
     * @throws ApiError
     */
    public static singFrameF0(
        speaker: number,
        requestBody: Body_sing_frame_f0_sing_frame_f0_post,
        coreVersion?: string,
    ): CancelablePromise<Array<number>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sing_frame_f0',
            query: {
                'speaker': speaker,
                'core_version': coreVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * AivisSpeech Engine ではサポートされていない API です (常に 501 Not Implemented を返します)
     * @param speaker
     * @param requestBody
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns number Successful Response
     * @throws ApiError
     */
    public static singFrameVolume(
        speaker: number,
        requestBody: Body_sing_frame_volume_sing_frame_volume_post,
        coreVersion?: string,
    ): CancelablePromise<Array<number>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sing_frame_volume',
            query: {
                'speaker': speaker,
                'core_version': coreVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * AivisSpeech Engine ではサポートされていない API です (常に 501 Not Implemented を返します)
     * @param speaker
     * @param requestBody
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns binary Successful Response
     * @throws ApiError
     */
    public static frameSynthesis(
        speaker: number,
        requestBody: FrameAudioQuery,
        coreVersion?: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/frame_synthesis',
            query: {
                'speaker': speaker,
                'core_version': coreVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Base64 エンコードされた複数の WAV データを一つに結合する
     * Base64 エンコードされた WAV データを一つに結合し、WAV ファイルで返します。
     * @param requestBody
     * @returns binary Successful Response
     * @throws ApiError
     */
    public static connectWaves(
        requestBody: Array<string>,
    ): CancelablePromise<Blob> {
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
     * テキストが AquesTalk 風記法に従っているか判定する
     * テキストが AquesTalk 風記法に従っているかどうかを判定します。従っていない場合はエラーが返ります。
     * @param text 判定する対象の文字列
     * @returns boolean Successful Response
     * @throws ApiError
     */
    public static validateKana(
        text: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/validate_kana',
            query: {
                'text': text,
            },
            errors: {
                400: `テキストが不正です`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 指定されたスタイル ID に紐づく音声合成モデルをロードする
     * 指定されたスタイル ID に紐づく音声合成モデルをロードします。<br>
     * 実行しなくても他の API は利用できますが、音声合成の初回実行時に時間がかかることがあります。
     * @param speaker
     * @param skipReinit 既にロード済みの音声合成モデルの再ロードをスキップするかどうか
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns void
     * @throws ApiError
     */
    public static initializeSpeaker(
        speaker: number,
        skipReinit: boolean = false,
        coreVersion?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/initialize_speaker',
            query: {
                'speaker': speaker,
                'skip_reinit': skipReinit,
                'core_version': coreVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 指定されたスタイル ID に紐づく音声合成モデルがロードされているかを確認する
     * 指定されたスタイル ID に紐づく音声合成モデルがロードされているかどうかを返します。
     * @param speaker
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns boolean Successful Response
     * @throws ApiError
     */
    public static isInitializedSpeaker(
        speaker: number,
        coreVersion?: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/is_initialized_speaker',
            query: {
                'speaker': speaker,
                'core_version': coreVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * このビルドでサポートされている、音声合成モデルの推論デバイスを取得する
     * このビルドでサポートされている、音声合成モデルの推論デバイスを返します。<br>
     * 通常、下記の値が返されます。true であっても実際に推論デバイスが利用可能とは限りません。
     * - Windows: `{"cpu": true, "cuda": false, "dml": true}`
     * - macOS: `{"cpu": true, "cuda": false, "dml": false}`
     * - Linux: `{"cpu": true, "cuda": true, "dml": false}`
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns SupportedDevicesInfo Successful Response
     * @throws ApiError
     */
    public static supportedDevices(
        coreVersion?: string,
    ): CancelablePromise<SupportedDevicesInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/supported_devices',
            query: {
                'core_version': coreVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 指定したスタイルに対してエンジン内のキャラクターがモーフィングが可能か判定する
     * 指定されたベーススタイルに対してエンジン内の各キャラクターがモーフィング機能を利用可能か返します。<br>
     * モーフィングの許可/禁止は `/speakers `の `speaker.supported_features.synthesis_morphing` に記載されています。<br>
     * プロパティが存在しない場合は、モーフィングが許可されているとみなします。<br>
     * 返り値のスタイル ID は string 型なので注意。<br>
     * AivisSpeech Engine では話者ごとに発声タイミングが異なる関係で実装不可能なため (動作こそするが聴くに耐えない) 、
     * 全ての話者でモーフィングが禁止されています。
     * @param requestBody
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns MorphableTargetInfo Successful Response
     * @throws ApiError
     */
    public static morphableTargets(
        requestBody: Array<number>,
        coreVersion?: string,
    ): CancelablePromise<Array<Record<string, MorphableTargetInfo>>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/morphable_targets',
            query: {
                'core_version': coreVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 2種類のスタイルでモーフィングした音声を合成する
     * 指定された 2 種類のスタイルで音声を合成、指定した割合でモーフィングした音声を得ます。<br>
     * モーフィングの割合は `morph_rate` で指定でき、0.0 でベースのスタイル、1.0 でターゲットのスタイルに近づきます。<br>
     * AivisSpeech Engine では話者ごとに発声タイミングが異なる関係で実装不可能なため (動作こそするが聴くに耐えない) 、
     * 常に 400 Bad Request を返します。
     * @param baseSpeaker
     * @param targetSpeaker
     * @param morphRate
     * @param requestBody
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns binary Successful Response
     * @throws ApiError
     */
    public static synthesisMorphing(
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
                'base_speaker': baseSpeaker,
                'target_speaker': targetSpeaker,
                'morph_rate': morphRate,
                'core_version': coreVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 話者情報の一覧を取得する
     * 話者情報の一覧を返します。
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns Speaker Successful Response
     * @throws ApiError
     */
    public static speakers(
        coreVersion?: string,
    ): CancelablePromise<Array<Speaker>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/speakers',
            query: {
                'core_version': coreVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * UUID で指定された話者の情報を取得する
     * UUID で指定された話者の情報を返します。
     * 画像や音声は resource_format で指定した形式で返されます。
     * @param speakerUuid
     * @param resourceFormat
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns SpeakerInfo Successful Response
     * @throws ApiError
     */
    public static speakerInfo(
        speakerUuid: string,
        resourceFormat: 'base64' | 'url' = 'base64',
        coreVersion?: string,
    ): CancelablePromise<SpeakerInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/speaker_info',
            query: {
                'speaker_uuid': speakerUuid,
                'resource_format': resourceFormat,
                'core_version': coreVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * AivisSpeech Engine ではサポートされていない API です (常に 501 Not Implemented を返します)
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns Speaker Successful Response
     * @throws ApiError
     */
    public static singers(
        coreVersion?: string,
    ): CancelablePromise<Array<Speaker>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/singers',
            query: {
                'core_version': coreVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * AivisSpeech Engine ではサポートされていない API です (常に 501 Not Implemented を返します)
     * @param speakerUuid
     * @param resourceFormat
     * @param coreVersion AivisSpeech Engine ではサポートされていないパラメータです (常に無視されます) 。
     * @returns SpeakerInfo Successful Response
     * @throws ApiError
     */
    public static singerInfo(
        speakerUuid: string,
        resourceFormat: 'base64' | 'url' = 'base64',
        coreVersion?: string,
    ): CancelablePromise<SpeakerInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/singer_info',
            query: {
                'speaker_uuid': speakerUuid,
                'resource_format': resourceFormat,
                'core_version': coreVersion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * インストール済みのすべての音声合成モデルの情報を取得する
     * インストール済みのすべての音声合成モデルの情報を返します。
     * @returns AivmInfo インストール済みのすべての音声合成モデルの情報
     * @throws ApiError
     */
    public static getInstalledAivmInfos(): CancelablePromise<Record<string, AivmInfo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/aivm_models',
        });
    }
    /**
     * 音声合成モデルをインストールする
     * 音声合成モデルをインストールします。<br>
     * ファイルからインストールする場合は `file` を指定してください。<br>
     * URL からインストールする場合は `url` を指定してください。
     * @param formData
     * @returns void
     * @throws ApiError
     */
    public static installModel(
        formData?: Body_install_model_aivm_models_install_post,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/aivm_models/install',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 指定された音声合成モデルの情報を取得する
     * 指定された音声合成モデルの情報を取得します。
     * @param aivmUuid 音声合成モデルの UUID
     * @returns AivmInfo 指定された音声合成モデルの情報
     * @throws ApiError
     */
    public static getAivmInfo(
        aivmUuid: string,
    ): CancelablePromise<AivmInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/aivm_models/{aivm_uuid}',
            path: {
                'aivm_uuid': aivmUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 指定された音声合成モデルをロードする
     * 指定された音声合成モデルをロードします。すでにロード済みの場合は何も行われません。<br>
     * 実行しなくても他の API は利用できますが、音声合成の初回実行時に時間がかかることがあります。
     * @param aivmUuid 音声合成モデルの UUID
     * @returns void
     * @throws ApiError
     */
    public static loadModel(
        aivmUuid: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/aivm_models/{aivm_uuid}/load',
            path: {
                'aivm_uuid': aivmUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 指定された音声合成モデルをアンロードする
     * 指定された音声合成モデルをアンロードします。
     * @param aivmUuid 音声合成モデルの UUID
     * @returns void
     * @throws ApiError
     */
    public static unloadModel(
        aivmUuid: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/aivm_models/{aivm_uuid}/unload',
            path: {
                'aivm_uuid': aivmUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 指定された音声合成モデルを更新する
     * AivisHub から指定された音声合成モデルの一番新しいバージョンをダウンロードし、
     * インストール済みの音声合成モデルへ上書き更新します。
     * @param aivmUuid 音声合成モデルの UUID
     * @returns void
     * @throws ApiError
     */
    public static updateModel(
        aivmUuid: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/aivm_models/{aivm_uuid}/update',
            path: {
                'aivm_uuid': aivmUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 指定された音声合成モデルをアンインストールする
     * 指定された音声合成モデルをアンインストールします。
     * @param aivmUuid 音声合成モデルの UUID
     * @returns void
     * @throws ApiError
     */
    public static uninstallModel(
        aivmUuid: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/aivm_models/{aivm_uuid}/uninstall',
            path: {
                'aivm_uuid': aivmUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * エンジンが保持しているプリセットの設定を取得する
     * エンジンが保持しているプリセットの設定を返します。
     * @returns Preset プリセットのリスト
     * @throws ApiError
     */
    public static getPresets(): CancelablePromise<Array<Preset>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/presets',
        });
    }
    /**
     * 新しいプリセットを追加する
     * 新しいプリセットを追加します。
     * @param requestBody
     * @returns number 追加したプリセットのプリセットID
     * @throws ApiError
     */
    public static addPreset(
        requestBody: Preset,
    ): CancelablePromise<number> {
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
     * 既存のプリセットを更新する
     * 既存のプリセットを更新します。
     * @param requestBody
     * @returns number 更新したプリセットのプリセットID
     * @throws ApiError
     */
    public static updatePreset(
        requestBody: Preset,
    ): CancelablePromise<number> {
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
     * 既存のプリセットを削除する
     * 既存のプリセットを削除します。
     * @param id 削除するプリセットのプリセットID
     * @returns void
     * @throws ApiError
     */
    public static deletePreset(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/delete_preset',
            query: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * ユーザー辞書に登録されている単語の一覧を取得する
     * ユーザー辞書に登録されている単語の一覧を返します。<br>
     * 複合語アクセントのサポートを有効にするか次第で、返されるデータ型が変化します。<br>
     * デフォルトでは、従来の API と互換性のある `UserDictWordForCompat` を返します。<br>
     * `?enable_compound_accent=true` を指定すると、AivisSpeech Engine 1.1.0 以降で利用可能な `UserDictWord` を返します。
     * @param enableCompoundAccent 複数のアクセント句を持つ単語の扱いを指定する<br>false の場合は API 互換性のため、最初のアクセント句の情報のみを返します。<br>未指定時は `false` が設定されます。
     * @returns any ユーザー辞書に登録されている単語情報のリスト
     * @throws ApiError
     */
    public static getUserDictWords(
        enableCompoundAccent: boolean = false,
    ): CancelablePromise<Record<string, (UserDictWord | UserDictWordForCompat)>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user_dict',
            query: {
                'enable_compound_accent': enableCompoundAccent,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * ユーザー辞書に単語を追加する
     * ユーザー辞書に単語を追加します。<br>
     * 複合語を辞書に追加するには、`?surface=新田&surface=真剣佑&pronunciation=あらた&pronunciation=まっけんゆう&accent_type=1&accent_type=3` のように、`surface`, `pronunciation`, `accent_type` を同じ長さのリストで指定します。
     * @param surface 単語の表層形
     * @param pronunciation 単語の発音（カタカナ）
     * @param accentType 東京式アクセントにおけるアクセント型<br>音高が下がる直前のモーラのインデックスを 1-indexed で指定します。0 は平板型を意味します。<br>例として、`surface: ["新田", "真剣佑"], pronunciation: ["あらた", "まっけんゆう"]` のとき、`accent_type: [1, 3]` (新田 → 頭高型, 真剣佑 → 中高型) のように指定します。
     * @param wordType 単語の品詞<br>固有名詞 / 地名 / 組織・施設名 / 人名 / 人名 (姓) / 人名 (名) / 普通名詞 / 動詞 / 形容詞 / 語尾 のいずれかを指定します。<br>未指定時は `固有名詞` が設定されます。
     * @param priority 単語の優先度 (1~9 の範囲を推奨)<br>数値が大きいほど、辞書適用時に優先して利用されます。<br>未指定時は `5` が設定されます。
     * @returns string 追加した単語の UUID
     * @throws ApiError
     */
    public static addUserDictWord(
        surface: Array<string>,
        pronunciation: Array<string>,
        accentType: Array<number>,
        wordType: WordTypes = 'PROPER_NOUN',
        priority: number = 5,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user_dict_word',
            query: {
                'surface': surface,
                'pronunciation': pronunciation,
                'accent_type': accentType,
                'word_type': wordType,
                'priority': priority,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * ユーザー辞書に登録されている単語を更新する
     * ユーザー辞書に登録されている単語を更新します。<br>
     * 複合語を辞書に追加するには、`?surface=新田&surface=真剣佑&pronunciation=あらた&pronunciation=まっけんゆう&accent_type=1&accent_type=3` のように、`surface`, `pronunciation`, `accent_type` を同じ長さのリストで指定します。
     * @param wordUuid 更新する単語の UUID
     * @param surface 単語の表層形
     * @param pronunciation 単語の発音（カタカナ）
     * @param accentType 東京式アクセントにおけるアクセント型<br>音高が下がる直前のモーラのインデックスを 1-indexed で指定します。0 は平板型を意味します。<br>例として、`surface: ["新田", "真剣佑"], pronunciation: ["あらた", "まっけんゆう"]` のとき、`accent_type: [1, 3]` (新田 → 頭高型, 真剣佑 → 中高型) のように指定します。
     * @param wordType 単語の品詞<br>固有名詞 / 地名 / 組織・施設名 / 人名 / 人名 (姓) / 人名 (名) / 普通名詞 / 動詞 / 形容詞 / 語尾 のいずれかを指定します。<br>未指定時は `固有名詞` が設定されます。
     * @param priority 単語の優先度 (1~9 の範囲を推奨)<br>数値が大きいほど、辞書適用時に優先して利用されます。<br>未指定時は `5` が設定されます。
     * @returns void
     * @throws ApiError
     */
    public static updateUserDictWord(
        wordUuid: string,
        surface: Array<string>,
        pronunciation: Array<string>,
        accentType: Array<number>,
        wordType: WordTypes = 'PROPER_NOUN',
        priority: number = 5,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user_dict_word/{word_uuid}',
            path: {
                'word_uuid': wordUuid,
            },
            query: {
                'surface': surface,
                'pronunciation': pronunciation,
                'accent_type': accentType,
                'word_type': wordType,
                'priority': priority,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * ユーザー辞書に登録されている単語を削除する
     * ユーザー辞書に登録されている単語を削除します。
     * @param wordUuid 削除する単語の UUID
     * @returns void
     * @throws ApiError
     */
    public static deleteUserDictWord(
        wordUuid: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user_dict_word/{word_uuid}',
            path: {
                'word_uuid': wordUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * ユーザー辞書をインポートする
     * 指定されたユーザー辞書をインポートします。<br>
     * 従来の API と互換性のある `UserDictWordForCompat` と、AivisSpeech Engine 1.1.0 以降で利用可能な `UserDictWord` の両方の型に対応しています。<br>
     * `?override=true` を指定すると、UUID が重複したエントリはインポートしたデータで上書きされます。
     * @param override 重複したエントリがあった場合、上書きするかどうか
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static importUserDictWords(
        override: boolean,
        requestBody: Record<string, (UserDictWord | UserDictWordForCompat)>,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/import_user_dict',
            query: {
                'override': override,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Setting Get
     * 設定ページを返します。
     * @returns any Successful Response
     * @throws ApiError
     */
    public static settingGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/setting',
        });
    }
    /**
     * Setting Post
     * 設定を更新します。
     * @param formData
     * @returns void
     * @throws ApiError
     */
    public static settingPost(
        formData: Body_setting_post_setting_post,
    ): CancelablePromise<void> {
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
    /**
     * Version
     * エンジンのバージョンを取得します。
     * @returns string Successful Response
     * @throws ApiError
     */
    public static version(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/version',
        });
    }
    /**
     * Core Versions
     * 利用可能なコアのバージョン一覧を取得します。
     * @returns string Successful Response
     * @throws ApiError
     */
    public static coreVersions(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/core_versions',
        });
    }
    /**
     * Engine Manifest
     * エンジンマニフェストを取得します。
     * @returns EngineManifest Successful Response
     * @throws ApiError
     */
    public static engineManifest(): CancelablePromise<EngineManifest> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/engine_manifest',
        });
    }
    /**
     * Get Portal Page
     * ポータルページを返します。
     * @returns string Successful Response
     * @throws ApiError
     */
    public static getPortalPage(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
}
