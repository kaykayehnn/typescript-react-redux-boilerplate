const restrictedGlobals = require('confusing-browser-globals')

module.exports = {
  root: true,
  plugins: ['react-hooks'],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        // This is a workaround for ESLint not supporting extending overrides
        // See https://github.com/eslint/eslint/issues/8813
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:promise/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:array-func/all',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    // Prettier rule
    'prettier/prettier': 'error',
    // React hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // Restricted globals rule
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
    // Disabled rules from presets
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
  },
}
