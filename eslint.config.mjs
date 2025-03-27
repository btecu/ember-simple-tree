import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import ember from 'eslint-plugin-ember/recommended';
import node from 'eslint-plugin-n';
import prettier from 'eslint-plugin-prettier';
import qunit from 'eslint-plugin-qunit';

export default [
  {
    ignores: ['**/dist/', 'node_modules/'],
  },
  {
    files: ['{app,src,tests}/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        browser: true,
      },
      parser: babelParser,
      parserOptions: {
        babelOptions: {
          plugins: [
            ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
          ],
        },
        ecmaVersion: 'latest',
        requireConfigFile: false,
        sourceType: 'module',
      },
    },
    plugins: {
      ember: ember.configs.base,
      eslint: js.configs.recommended,
      prettier: prettier.configs.recommended,
      stylistic: stylistic.configs.recommended,
    },
  },
  {
    // Node files
    files: [
      './*.{cjs,js}',
      './blueprints/*/index.js',
      './config/**/*.{cjs,js}',
    ],
    languageOptions: {
      globals: {
        browser: true,
        node: true,
      },
      parserOptions: {
        sourceType: 'script',
      },
    },
    plugins: {
      node: node.configs.recommended,
    },
  },
  {
    // Test files
    files: ['tests/**/*-test.{js,ts}'],
    plugins: {
      qunit
    },
  },
];
