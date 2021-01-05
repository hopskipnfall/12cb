module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    es2017: true,
    jest: true,
  },
  extends: [
    'airbnb-typescript/base',
    'prettier', // Prettier modules must go last.
    'prettier/unicorn',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    project: ['./onetwocb-webapp/tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['@typescript-eslint', 'unicorn', 'prettier'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    // Broken for type imports...
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    'import/no-extraneous-dependencies': 'warn',
    '@typescript-eslint/indent': 'off',
  },
  ignorePatterns: [
    'node_modules/**',
    'server/**',
    'amplify/**',
    'jyuunikyara/**',
    'onetwocb-webapp/e2e/**', // TODO: Remove.
    'onetwocb-webapp/dist/**',
    'coverage/**',
    'main.js',
  ],
};
