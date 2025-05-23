/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhonemeDuration } from './PhonemeDuration';
import type { TimeRange } from './TimeRange';
export type MoraDuration = {
    mora: string;
    hira: string;
    phonemePitches: Array<PhonemeDuration>;
    wavRange: TimeRange;
};

