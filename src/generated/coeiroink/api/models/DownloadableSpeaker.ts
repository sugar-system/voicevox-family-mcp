/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DownloadableStyle } from './DownloadableStyle';
export type DownloadableSpeaker = {
  speakerName: string;
  speakerUuid: string;
  subSpeakerUuids: Array<string>;
  styles: Array<DownloadableStyle>;
  version: string;
  portraitBase64: string;
  metaDownloadUrl: string;
  prefix: string;
};
