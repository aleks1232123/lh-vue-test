module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  globals: {
    'window': true,
    'localStorage': true,
    'document': true,
    'FormData': true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'import/no-unresolved': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'no-param-reassign': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
};
