import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginJest from "eslint-plugin-jest";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  { ignores: ["node_modules/**", "dist/**", "docs/**", "dist-tests/**"] },
  {
    // Apply Jest rules to both JS and TS test files
    files: [
      "**/*.spec.js",
      "**/*.test.js",
      "**/*.spec.ts",
      "**/*.test.ts",
      "**/*.spec.tsx",
      "**/*.test.tsx",
    ],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
);
