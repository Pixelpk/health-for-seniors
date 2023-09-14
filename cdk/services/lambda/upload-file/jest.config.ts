import type { Config } from '@jest/types';

const TEST_TIMEOUT_IN_SECONDS = 30;

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/'],

  setupFiles: ['./jest.setup.ts'],
  testTimeout: TEST_TIMEOUT_IN_SECONDS * 1000,
};

export default config;
