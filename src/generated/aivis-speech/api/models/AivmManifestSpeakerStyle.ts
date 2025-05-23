/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AivmManifestVoiceSample } from './AivmManifestVoiceSample';
/**
 * AIVM マニフェストの話者スタイル情報
 */
export type AivmManifestSpeakerStyle = {
    name: string;
    icon?: (string | null);
    local_id: number;
    voice_samples?: Array<AivmManifestVoiceSample>;
};

