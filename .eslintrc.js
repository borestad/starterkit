module.exports = {
  plugins: ['cypress'],
  extends: [
    'standard',
    'prettier/standard',
    'plugin:import/errors',
    'plugin:cypress/recommended'
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    'cypress/globals': true
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
    'cypress/no-unnecessary-waiting': 'off',
    'no-unused-expressions': 'off',
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
