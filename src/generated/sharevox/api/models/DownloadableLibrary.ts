/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Speaker } from './Speaker';
import type { SpeakerInfo } from './SpeakerInfo';
/**
 * ダウンロード可能な音声ライブラリの情報（最新情報をwebで取得することを考慮して、ローカルの情報はない）
 */
export type DownloadableLibrary = {
  download_url: string;
  bytes: number;
  speaker: Speaker;
  speaker_info: SpeakerInfo;
};
