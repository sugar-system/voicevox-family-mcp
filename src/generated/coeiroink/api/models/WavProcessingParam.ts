/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MoraDuration } from './MoraDuration';
export type WavProcessingParam = {
  volumeScale: number;
  pitchScale: number;
  intonationScale: number;
  prePhonemeLength: number;
  postPhonemeLength: number;
  outputSamplingRate: number;
  sampledIntervalValue?: number;
  adjustedF0?: Array<number>;
  processingAlgorithm?: string;
  startTrimBuffer?: number;
  endTrimBuffer?: number;
  pauseLength?: number;
  pauseStartTrimBuffer?: number;
  pauseEndTrimBuffer?: number;
  wavBase64: string;
  moraDurations?: Array<MoraDuration>;
};
