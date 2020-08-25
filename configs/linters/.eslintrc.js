const path = require('path'),
  root = path.resolve(__dirname, '../..')

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: root,
    createDefaultProgram: true,
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
  },
  plugins: [
    'import',
    '@typescript-eslint',
    '@typescript-eslint/tslint',
    'sonarjs',
    'unicorn',
    'react',
    'react-hooks',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:compat/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'esnext',
    'standard',
    'standard-react',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/standard',
  ],
  rules: {
    '@typescript-eslint/tslint/config': [
      'error',
      {
        lintFile: `${root}/configs/linters/tslint.json`,
      },
    ],
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-unsafe-member-access': 1,
    '@typescript-eslint/no-unsafe-assignment': 1,
    '@typescript-eslint/no-unsafe-return': 1,
    '@typescript-eslint/no-unsafe-call': 1,

    'one-var': 0,
    'spaced-comment': 0,
    'no-param-reassign': 1,
    'default-case': 1,
    'no-use-before-define': 0,
    'no-unused-vars': 1,
    'no-shadow': 1,
    'no-return-await': 0,
    'prefer-template': 0,
    'prefer-rest-params': 1,
    'global-require': 0,

    'react/prop-types': 0,
    'react/jsx-no-literals': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-closing-tag-location': 0,
    'react/destructuring-assignment': 0,
    'react/no-children-prop': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-pascal-case': 0,
    'react/button-has-type': 0,
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'react/require-default-props': 2,
    'react/jsx-max-depth': [1, { max: 5 }],
    'react-hooks/exhaustive-deps': 1,
    'react-hooks/rules-of-hooks': 2,
    // 'import/no-unresolved': 0, //temp
    // 'import/extensions': 0, //temp

    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0, //because of Yarn Workspaces
    'unicorn/no-null': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [`${root}/src`],
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      },
    },
    react: {
      version: 'detect',
    },
  },
}
