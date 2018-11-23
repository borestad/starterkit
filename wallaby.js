module.exports = function() {
  return {
    debug: false,
    files: [
      { pattern: 'src/**/*.ts', load: false },
      { pattern: 'src/**/*.json', load: false },
      { pattern: 'src/**/*.test.ts', ignore: true },
      { pattern: 'src/**/*.story.ts', ignore: true },
      { pattern: 'src/client/index.ts', ignore: true }
    ],
    tests: [{ pattern: 'src/**/*.test.ts' }],
    env: { type: 'node' },
    testFramework: 'jest',
    setup(wallaby) {
      const jestConfig = require('./package.json').jest
      jestConfig.testEnvironment = 'node'
      wallaby.testFramework.configure(jestConfig)
    }
  }
}
