import type { Config } from "jest";
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
  });

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
    testPathIgnorePatterns: ["/node_modules/", "/.next/", "/tests/"],
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.jest.json", // 使用專門的 Jest tsconfig
        },
    },
};

export default createJestConfig(config);