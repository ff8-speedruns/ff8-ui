module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '19.2' } },
  overrides: [
    {
      // Build tooling, not browser code.
      files: ['scripts/**/*.js', 'vite.config.js'],
      env: { node: true, browser: false },
    },
  ],
};
