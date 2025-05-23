/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AlgorithmSettings } from '../models/AlgorithmSettings';
import type { AudioQuery } from '../models/AudioQuery';
import type { DictionaryWords } from '../models/DictionaryWords';
import type { DownloadableModel } from '../models/DownloadableModel';
import type { DownloadableSpeaker } from '../models/DownloadableSpeaker';
import type { EngineInfo } from '../models/EngineInfo';
import type { Phrase } from '../models/Phrase';
import type { Prosody } from '../models/Prosody';
import type { ProsodyMakingParam } from '../models/ProsodyMakingParam';
import type { SpeakerFolderPath } from '../models/SpeakerFolderPath';
import type { SpeakerMeta } from '../models/SpeakerMeta';
import type { SpeakerMetaForTextBox } from '../models/SpeakerMetaForTextBox';
import type { SpeakerMetaPathVariant } from '../models/SpeakerMetaPathVariant';
import type { SpeakerPolicy } from '../models/SpeakerPolicy';
import type { Status } from '../models/Status';
import type { SynthesisParam } from '../models/SynthesisParam';
import type { UpdateInfo } from '../models/UpdateInfo';
import type { WavMakingParam } from '../models/WavMakingParam';
import type { WavProcessingParam } from '../models/WavProcessingParam';
import type { WavWithDuration } from '../models/WavWithDuration';
import type { WorldF0 } from '../models/WorldF0';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Read Root
     * エンジンの起動状態を取得。
     * @returns Status Successful Response
     * @throws ApiError
     */
    public static readRootGet(): CancelablePromise<Status> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Get Speakers
     * 話者情報の取得。
     * @returns SpeakerMeta Successful Response
     * @throws ApiError
     */
    public static getSpeakersV1SpeakersGet(): CancelablePromise<Array<SpeakerMeta>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/speakers',
        });
    }
    /**
     * Get Speakers
     * 話者情報の取得。
     * @returns SpeakerMetaPathVariant Successful Response
     * @throws ApiError
     */
    public static getSpeakersV1SpeakersPathVariantGet(): CancelablePromise<Array<SpeakerMetaPathVariant>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/speakers_path_variant',
        });
    }
    /**
     * Estimate Prosody
     * テキストから韻律を取得。（辞書を用いた推論）
     * @param requestBody
     * @returns Prosody Successful Response
     * @throws ApiError
     */
    public static estimateProsodyV1EstimateProsodyPost(
        requestBody: ProsodyMakingParam,
    ): CancelablePromise<Prosody> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/estimate_prosody',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Estimate Prosody From Kana
     * テキストから韻律を取得。（辞書を用いない推論、かな文字のみ対応）
     * @param requestBody
     * @returns Phrase Successful Response
     * @throws ApiError
     */
    public static estimateProsodyFromKanaV1EstimateProsodyFromKanaPost(
        requestBody: ProsodyMakingParam,
    ): CancelablePromise<Phrase> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/estimate_prosody_from_kana',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Estimate F0
     * wavの周波数情報を取得。
     * @param requestBody
     * @returns WorldF0 Successful Response
     * @throws ApiError
     */
    public static estimateF0V1EstimateF0Post(
        requestBody: WavWithDuration,
    ): CancelablePromise<WorldF0> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/estimate_f0',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Predict
     * テキストから音声を予測。機械学習による推論処理なので時間がかかる。prosodyDetailなしでtextだけでも推論可能。textとprosodyDetailではprosodyDetailが優先される。
     * @param requestBody
     * @returns binary Successful Response
     * @throws ApiError
     */
    public static predictV1PredictPost(
        requestBody: WavMakingParam,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/predict',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Predict
     * predictと同時にduration情報も得る。
     * @param requestBody
     * @returns WavWithDuration Successful Response
     * @throws ApiError
     */
    public static predictV1PredictWithDurationPost(
        requestBody: WavMakingParam,
    ): CancelablePromise<WavWithDuration> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/predict_with_duration',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Process
     * 音声を加工。機械学習による推論ではないため処理時間は短い。
     * @param requestBody
     * @returns binary Successful Response
     * @throws ApiError
     */
    public static processV1ProcessPost(
        requestBody: WavProcessingParam,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/process',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Process With Pitch
     * 廃止。processにリダイレクト。
     * @returns any Successful Response
     * @throws ApiError
     */
    public static processWithPitchV1ProcessWithPitchPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/process_with_pitch',
            errors: {
                307: `Temporary Redirect to /v1/process`,
            },
        });
    }
    /**
     * Synthesis
     * predict+processの処理。
     * @param requestBody
     * @returns binary Successful Response
     * @throws ApiError
     */
    public static synthesisV1SynthesisPost(
        requestBody: SynthesisParam,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/synthesis',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Set Dictionary
     * 辞書の設定。
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static setDictionaryV1SetDictionaryPost(
        requestBody: DictionaryWords,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/set_dictionary',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Set Default Processing Algorithm
     * デフォルトの音声加工アルゴリズムの設定。
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static setDefaultProcessingAlgorithmV1SetDefaultProcessingAlgorithmPost(
        requestBody: AlgorithmSettings,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/set_default_processing_algorithm',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Download Info
     * キャラクターダウンロード情報を取得。
     * @returns DownloadableModel Successful Response
     * @throws ApiError
     */
    public static getDownloadInfoV1DownloadInfoGet(): CancelablePromise<Array<DownloadableModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/download_info',
        });
    }
    /**
     * Get Downloadable Speakers
     * キャラクターダウンロード情報を取得（話者を主体とした情報）。
     * @returns DownloadableSpeaker Successful Response
     * @throws ApiError
     */
    public static getDownloadableSpeakersV1DownloadableSpeakersGet(): CancelablePromise<Array<DownloadableSpeaker>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/downloadable_speakers',
        });
    }
    /**
     * Get Speaker Folder Path
     * キャラクターのフォルダパスを取得。
     * @param speakerUuid
     * @returns SpeakerFolderPath Successful Response
     * @throws ApiError
     */
    public static getSpeakerFolderPathV1SpeakerFolderPathGet(
        speakerUuid?: string,
    ): CancelablePromise<SpeakerFolderPath> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/speaker_folder_path',
            query: {
                'speakerUuid': speakerUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Speaker Folder Path
     * v1のqueryをprosodyに変換。
     * @param requestBody
     * @returns Prosody Successful Response
     * @throws ApiError
     */
    public static speakerFolderPathV1Query2ProsodyPost(
        requestBody: AudioQuery,
    ): CancelablePromise<Prosody> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/query2prosody',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Speaker Folder Path
     * style_idだけでスピーカー情報を取得。重複があった場合は後にロードしたスピーカーが優先される。
     * @param styleId
     * @returns SpeakerMetaForTextBox Successful Response
     * @throws ApiError
     */
    public static speakerFolderPathV1StyleIdToSpeakerMetaPost(
        styleId?: number,
    ): CancelablePromise<SpeakerMetaForTextBox> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/style_id_to_speaker_meta',
            query: {
                'styleId': styleId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Sample Voice
     * 話者のサンプルボイスを取得する。
     * @param speakerUuid
     * @param styleId
     * @param index
     * @returns binary Successful Response
     * @throws ApiError
     */
    public static getSampleVoiceV1SampleVoiceGet(
        speakerUuid?: string,
        styleId?: number,
        index?: number,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/sample_voice',
            query: {
                'speakerUuid': speakerUuid,
                'styleId': styleId,
                'index': index,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Speaker Policy
     * 話者のpolicyファイルを取得する
     * @param speakerUuid
     * @returns SpeakerPolicy Successful Response
     * @throws ApiError
     */
    public static getSpeakerPolicyV1SpeakerPolicyGet(
        speakerUuid?: string,
    ): CancelablePromise<SpeakerPolicy> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/speaker_policy',
            query: {
                'speakerUuid': speakerUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Update Info
     * アップデート情報を取得する。
     * @returns UpdateInfo Successful Response
     * @throws ApiError
     */
    public static getUpdateInfoV1UpdateInfoGet(): CancelablePromise<Array<UpdateInfo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/update_info',
        });
    }
    /**
     * Get Engine Info
     * エンジンの情報を取得する。
     * @returns EngineInfo Successful Response
     * @throws ApiError
     */
    public static getEngineInfoV1EngineInfoGet(): CancelablePromise<EngineInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/engine_info',
        });
    }
}
