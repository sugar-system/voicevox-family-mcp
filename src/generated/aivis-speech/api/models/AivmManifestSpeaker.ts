/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AivmManifestSpeakerStyle } from './AivmManifestSpeakerStyle';
/**
 * AIVM マニフェストの話者情報
 */
export type AivmManifestSpeaker = {
    name: string;
    icon: string;
    supported_languages: Array<string>;
    uuid: string;
    local_id: number;
    styles: Array<AivmManifestSpeakerStyle>;
};

