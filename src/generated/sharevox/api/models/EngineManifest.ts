/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LicenseInfo } from './LicenseInfo';
import type { SupportedFeatures } from './SupportedFeatures';
import type { UpdateInfo } from './UpdateInfo';
/**
 * エンジン自体に関する情報
 */
export type EngineManifest = {
    manifest_version: string;
    name: string;
    brand_name: string;
    uuid: string;
    url: string;
    icon: string;
    default_sampling_rate: number;
    terms_of_service: string;
    update_infos: Array<UpdateInfo>;
    dependency_licenses: Array<LicenseInfo>;
    downloadable_libraries_path?: string;
    downloadable_libraries_url?: string;
    supported_features: SupportedFeatures;
};

