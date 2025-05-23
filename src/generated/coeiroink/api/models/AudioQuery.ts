/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccentPhrase } from './AccentPhrase';
export type AudioQuery = {
    accentPhrases: Array<AccentPhrase>;
    speedScale: number;
    pitchScale: number;
    intonationScale: number;
    volumeScale: number;
    prePhonemeLength: number;
    postPhonemeLength: number;
    outputSamplingRate: number;
    outputStereo: boolean;
    kana?: string;
};

