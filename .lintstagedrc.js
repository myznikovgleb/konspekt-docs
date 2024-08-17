const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  'src/**/*.ts?(x)': () => 'tsc --noEmit',
  'app/**/*.ts?(x)': () => 'tsc --noEmit',
  '*.{ts,tsx}': [buildEslintCommand],
  'src/**/*.{ts,tsx,css}': 'prettier --write',
  'app/**/*.{ts,tsx,css}': 'prettier --write',
}
