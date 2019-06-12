// ========================================================================
//  Eslint Configuration (@starterkit)
//  Now supports TypeScript!
//
//  🔗 https://babeljs.io/docs/en/config-files
//  🔗 https://new.babeljs.io/docs/en/next/babelconfigjs.html
//
//  The philosophy behind these rules is that 99% should be autofix'able.
//
// ======================================================================== */

const js = ['.js', '.jsx']
const ts = ['.ts', '.tsx']
const extensions = { ts, all: [...js, ...ts] }

// TODO: Add: https://github.com/typescript-eslint/typescript-eslint/issues/464

module.exports = {
  config() {
    // Uncomment for debugging / live editing rules
    delete require.cache[require.resolve(__filename)]

    // parser: '@typescript-eslint/parser',
    return {
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

      plugins: ['unicorn', 'sonarjs'],

      extends: [
        // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended',

        // https://github.com/SonarSource/eslint-plugin-sonarjs
        'plugin:sonarjs/recommended',

        // https://github.com/standard/eslint-config-standard/blob/master/eslintrc.json
        'standard',

        // https://github.com/benmosher/eslint-plugin-import
        'plugin:import/errors',

        // Uses eslint-config-prettier to disable ESLint rules from
        // @typescript-eslint/eslint-plugin that would conflict with prettier
        'prettier/@typescript-eslint',

        // Turns off all rules that are unnecessary or might conflict with Prettier.
        // https://github.com/prettier/eslint-config-prettier/blob/master/standard.js
        'prettier/standard',

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

      overrides: [
        {
          // It's rather common for test files to contain duplicate content - let's ignore them.
          files: ['*.spec.*', '*.test.*'],
          rules: {
            'sonarjs/no-duplicate-string': 'off',
            'sonarjs/no-identical-functions': 'off'
          }
        }
      ],

      rules: {
        /**
         * Built-in Eslint Rules
         * https://eslint.org/docs/rules/
         * ----------------------------------------------------
         */
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'global-require': 'off',
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-template': 'error',
        'object-shorthand': [
          'error',
          'always',
          {
            ignoreConstructors: true
          }
        ],
        // Code-Style rules
        // https://eslint.org/docs/rules/padding-line-between-statements
        // Warning: Don't mess with these unless you know what you'e doing since
        // they can interfere with prettier
        'padding-line-between-statements': [
          'error',
          ...(() => {
            const common = [
              'block-like',
              'block',
              'cjs-export',
              'class',
              'directive',
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
        ],

        /**
         * Typescript-Eslint Rules
         * https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
         * ----------------------------------------------------
         */
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false }
        ],
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

        /**
         * Import Plugin Rules
         * ----------------------------------------------------
         */
        'import/no-useless-path-segments': ['error'],
        'import/named': 'error',
        'import/namespace': 'error',
        'import/default': 'error',
        'import/export': 'error',
        'import/extensions': ['error', 'never'],
        'import/newline-after-import': 'error',
        'import/no-extraneous-dependencies': 'error',
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index'
            ]
          }
        ],

        /**
         * Unicorn rules
         * https://github.com/sindresorhus/eslint-plugin-unicorn
         * ----------------------------------------------------
         */
        'unicorn/catch-error-name': 'error',
        'unicorn/custom-error-definition': 'off',
        'unicorn/error-message': 'error',
        'unicorn/filename-case': ['error', { case: 'kebabCase' }],
        'unicorn/import-index': 'error',
        'unicorn/new-for-builtins': 'error',
        'unicorn/no-abusive-eslint-disable': 'error',
        'unicorn/no-array-instanceof': 'error',
        'unicorn/no-console-spaces': 'error',
        'unicorn/no-for-loop': 'error',
        'unicorn/no-process-exit': 'error',
        'unicorn/no-unreadable-array-destructuring': 'error',
        'unicorn/no-unused-properties': 'error',
        'unicorn/no-zero-fractions': 'error',
        'unicorn/prefer-exponentiation-operator': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-type-error': 'error',
        'unicorn/regex-shorthand': 'error'
      }
    }
  }
}
