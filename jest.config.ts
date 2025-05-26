/**
 * Jest 設定ファイルだよ！(∩^o^)⊃━☆゚.*・。
 * TypeScript用(ts-jest)の設定もバッチリ！
 * @see https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/
 */
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  globals: {},
  // 失敗時に詳細なエラーを表示したい場合は下記を有効化
  // verbose: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@http/(.*)$': '<rootDir>/src/http/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
};

export default config;
