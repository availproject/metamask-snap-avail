const path = require('path');

module.exports = {
  extends: '../../.eslintrc.js',
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json'),
    tsconfigRootDir: path.join(__dirname)
  },
  rules: {
    'import/order': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off'
  }
};
