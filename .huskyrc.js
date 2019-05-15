/*
 * Git hooks
 * https://github.com/typicode/husky
 *
 * Full list of available hooks:
 * https://githooks.com/
 */

module.exports = {
  hooks: {
    'pre-commit': 'lint-staged -c .lintstagedrc.js',
    'post-commit': 'git update-index --again',
    'post-checkout': './lib/bin/postcheckout'
  }
}
