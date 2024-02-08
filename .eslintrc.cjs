/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
  ],
  rules: {
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/await-thenable": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
  },
};

module.exports = config;
