module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es2022: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  plugins: ['@typescript-eslint', 'react'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
  ],

  ignorePatterns: ['node_modules/', 'dist/', 'build/', '.next/', '.turbo/', 'coverage/'],

  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
