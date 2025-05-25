/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ModelConfig } from './ModelConfig';
import type { Speaker } from './Speaker';
import type { SpeakerInfo } from './SpeakerInfo';
/**
 * SVモデルの情報
 */
export type SVModelInfo = {
    uuid: string;
    variance_model: string;
    embedder_model: string;
    decoder_model: string;
    metas: Array<Speaker>;
    model_config: ModelConfig;
    speaker_infos: Record<string, SpeakerInfo>;
};

