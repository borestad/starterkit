const jsExtensions = ['.js', '.jsx', '*.js']
const tsExtensions = ['.ts', '.tsx']
const allExtensions = [...jsExtensions, ...tsExtensions]

module.exports = {
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
    // project: 'tsconfig.json'
  },
  settings: {
    'import/extensions': allExtensions,
    'import/parsers': {
      '@typescript-eslint/parser': tsExtensions
    },
    'import/resolver': {
      node: {
        extensions: allExtensions
      }
    }
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'standard',
    // 'plugin:import/errors',
    'prettier/standard',
    // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended'
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: {
    // "@typescript-eslint/indent": "off",
    // "@typescript-eslint/no-explicit-any": "off",
    // "@typescript-eslint/no-non-null-assertion": "off",
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    // "@typescript-eslint/no-use-before-define": "off",
    // "@typescript-eslint/no-object-literal-type-assertion": "off",
    // "@typescript-eslint/no-parameter-properties": "off",
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false
      }
    ],
    // 'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'global-require': 'off',
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
