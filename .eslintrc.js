module.exports = {
  extends: ['standard', 'prettier/standard', 'plugin:import/errors'],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'import/no-useless-path-segments': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': ['error', 'never'],
    'object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: true
      }
    ]
  }
}
