/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: { version: 'detect' },
    tailwindcss: {
      callees: ['twMerge', 'createTheme'],
      classRegex: '^(class(Name)|theme)?$',
    },
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': ['off'],
    'no-undef': 'off',
  },
}
