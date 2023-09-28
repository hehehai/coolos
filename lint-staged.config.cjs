// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('node:path')

const buildEslintCommand = (filenames) =>
  `bun next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  "*.{js,jsx,ts,tsx,md,css}": "prettier --ignore-unknown --write",
}
