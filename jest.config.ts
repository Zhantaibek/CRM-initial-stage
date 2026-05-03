import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^core/(.*)$': '<rootDir>/src/core/$1',
  },
  testMatch: ['**/tests/**/*.test.ts'],
};

export default config;