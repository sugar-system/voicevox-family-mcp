/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AivmManifestSpeaker } from './AivmManifestSpeaker';
import type { ModelArchitecture } from './ModelArchitecture';
import type { ModelFormat } from './ModelFormat';
/**
 * AIVM マニフェストのスキーマ
 */
export type AivmManifest = {
    manifest_version: string;
    name: string;
    description?: string;
    creators?: Array<string>;
    license?: (string | null);
    model_architecture: ModelArchitecture;
    model_format: ModelFormat;
    training_epochs?: (number | null);
    training_steps?: (number | null);
    uuid: string;
    version: string;
    speakers: Array<AivmManifestSpeaker>;
};

