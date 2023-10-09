// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json'),
  },
  plugins: [
    "tailwindcss",
    "@typescript-eslint",
  ],
  ignorePatterns: ["*.json"],
  settings: {
    tailwindcss: {
      callees: [
        "cn"
      ],
      config: "tailwind.config.js"
    },
    next: {
      rootDir: true
    }
  },
  overrides: [
    {
      files: [
        "*.ts",
        "*.tsx"
      ],
    }
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "error",
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
}
