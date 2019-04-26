module.exports = function () {
  return {
    debug: false,
    files: [
      { pattern: 'examples/**/*.ts', load: false },
      { pattern: 'examples/**/*.json', load: false },
      { pattern: 'examples/**/*.test.ts', ignore: true },
      { pattern: 'examples/**/*.story.ts', ignore: true }
    ],
    tests: [{ pattern: 'examples/**/*.test.ts' }],
    env: { type: 'node' },
    testFramework: 'jest',
    setup (wallaby) {}
  }
}
