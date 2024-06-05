/* eslint-env es6 */
const OFF = 0
const WARN = 1
const ERROR = 2

/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ['markdown'],
  extends: [
    './.eslintrc.js',
    '@remix-run/eslint-config/internal',
    'plugin:markdown/recommended-legacy',
  ],
  settings: {
    'import/internal-regex': '^~/',
  },
  rules: {
    'prefer-let/prefer-let': OFF,
    'prefer-const': WARN,
    'no-unused-vars': OFF,
    '@typescript-eslint/no-unused-vars': ERROR,
    'import/order': [
      WARN,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
      },
    ],

    'react/jsx-no-leaked-render': [WARN, { validStrategies: ['ternary'] }],
  },
}
