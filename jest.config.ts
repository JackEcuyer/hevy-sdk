import type { Config } from "jest";

const config: Config = {
  rootDir: "dist-tests",
  testMatch: ["**/__tests__/**/*.test.js"],
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "node"],
};

export default config;
