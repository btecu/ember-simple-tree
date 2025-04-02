'use strict';

module.exports = {
  plugins: ['prettier-plugin-ember-template-tag'],
  overrides: [
    {
      files: '*.{js,gjs,ts,gts,mjs,mts,cjs,cts}',
      options: {
        printWidth: 120,
        singleQuote: true,
        templateSingleQuote: false,
      },
    },
  ],
};
