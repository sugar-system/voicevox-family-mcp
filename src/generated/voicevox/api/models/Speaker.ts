/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SpeakerStyle } from './SpeakerStyle';
import type { SpeakerSupportedFeatures } from './SpeakerSupportedFeatures';
/**
 * スピーカー情報
 */
export type Speaker = {
  supported_features?: SpeakerSupportedFeatures;
  name: string;
  speaker_uuid: string;
  styles: Array<SpeakerStyle>;
  version?: string;
};
