/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { coeirocore__mora__Mora } from './coeirocore__mora__Mora';
export type SynthesisParam = {
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
  speakerUuid: string;
  styleId: number;
  text: string;
  prosodyDetail?: Array<Array<coeirocore__mora__Mora>>;
  speedScale: number;
};
