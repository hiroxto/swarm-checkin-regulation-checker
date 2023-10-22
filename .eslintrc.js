/** @type {import('eslint/lib/shared/types').ConfigData} */
const eslintConfig = {
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],
    "react/jsx-sort-props": "warn",
    "no-console": "off",
  },
};

module.exports = eslintConfig;
