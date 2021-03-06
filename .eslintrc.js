module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'import/no-extraneous-dependencies': 0,
    'no-multi-assign': 0,
    'comma-dangle': 0,
    'no-unused-vars': 0,
    'no-console': 0,
    'camelcase': 0,
    'max-len': 0,
    'padded-blocks': 0,
    'linebreak-style': 0,
    'no-await-in-loop':0,
    'prefer-rest-params':0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
