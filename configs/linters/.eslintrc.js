const path = require('path'),
  root = path.resolve(__dirname, '../..')

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'prefer-rest-params': 1,
  },
}
