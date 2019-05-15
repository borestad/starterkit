// ========================================================================
//  Eslint Configuration
//  Now supports TypeScript!
//
//  🔗 https://babeljs.io/docs/en/config-files
//  🔗 https://new.babeljs.io/docs/en/next/babelconfigjs.html
//
// ======================================================================== */

const js = ['.js', '.jsx']
const ts = ['.ts', '.tsx']
const extensions = { js, ts, all: [...js, ...ts] }

// TODO: Add: https://github.com/typescript-eslint/typescript-eslint/issues/464

module.exports = {
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports

    // This setting is required if you want to use rules which require type information.
    // Slows down linting a bit
    // project: require('path').resolve(__dirname, './tsconfig.json'),
    // tsconfigRootDir: __dirname,
  },
  settings: {
    'import/extensions': extensions.all,
    'import/parsers': {
      '@typescript-eslint/parser': extensions.ts
    },
    'import/resolver': {
      node: { extensions: extensions.all }
    }
  },
  extends: [
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',

    // https://github.com/standard/eslint-config-standard/blob/master/eslintrc.json
    'standard',

    // https://github.com/benmosher/eslint-plugin-import
    'plugin:import/errors',

    // Uses eslint-config-prettier to disable ESLint rules from
    // @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/@typescript-eslint',

    // 'prettier/standard',

    // Enables eslint-plugin-prettier and eslint-config-prettier.
    // This will display prettier errors as ESLint errors.
    // Make sure this is always the last configuration in the extends array.
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
    // '@typescript-eslint/indent': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/explicit-function-return-type': [
      'warning',
      { allowExpressions: true },
      { allowTypedFunctionExpressions: false }
    ],
    '@typescript-eslint/explicit-member-accessibility': {
      accessibility: 'no-public'
    },
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': [
      'error',
      { 'allow-arguments': true }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_'
      }
    ],
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'global-require': 'off',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true
      }
    ],
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': ['error', 'never'],
    'import/newline-after-import': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'index',
          'sibling',
          'parent',
          'internal',
          'external',
          'builtin'
        ]
      }
    ],
    'object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: true
      }
    ],
    'padding-line-between-statements': [
      'error',
      ...(() => {
        // eslint-disable-next-line prettier/prettier
        const common = [
          'block',
          'block-like',
          'cjs-export',
          'class',
          'directive',
          'empty',
          'export',
          'for',
          'function',
          'if',
          'multiline-const',
          'throw',
          'try'
        ]

        return [
          { blankLine: 'always', prev: common, next: '*' },
          { blankLine: 'always', prev: '*', next: common }
        ]
      })()
      // {
      //   blankLine: 'always',
      //   prev: ['multiline-const', 'multiline-expression', 'if', 'block', 'class', 'for', 'export'],
      //   next: ['multiline-const', 'multiline-expression', 'if', 'block', 'class', 'for', 'export']
      // }
    ]
  }
}
