import coreWebVitals from "eslint-config-next/core-web-vitals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "out/**",
      "coverage/**",
      "jest.config.js",
      "next.config.js",
    ],
  },
  ...coreWebVitals,
  eslintConfigPrettier,
];

export default eslintConfig;
