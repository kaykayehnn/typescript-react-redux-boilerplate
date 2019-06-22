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
      // TypeScript-specific rules
      files: ['*.{ts,tsx}'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
      },
    },
    {
      files: ['*.test.{js,ts,tsx}'],
      env: {
        jest: true,
      },
    },
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
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
    'react/prop-types': 'off',
    'no-console': 'off',
    // Other rules
    'prefer-const': [
      'warn',
      {
        destructuring: 'all',
      },
    ],
  },
}
