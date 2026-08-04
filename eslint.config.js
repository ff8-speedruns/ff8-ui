import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.es2020 },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: '19.2' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    // Build tooling, not library code - give it Node globals instead of browser.
    files: ['vite.config.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];
