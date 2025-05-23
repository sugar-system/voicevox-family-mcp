/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Mora } from './Mora';
/**
 * アクセント句ごとの情報
 */
export type AccentPhrase = {
    moras: Array<Mora>;
    accent: number;
    pause_mora?: Mora;
    is_interrogative?: boolean;
};

