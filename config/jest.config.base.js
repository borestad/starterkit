module.exports = pkg => {
  return {
    displayName: pkg.name,
    name: pkg.name,
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$',
    moduleFileExtensions: ['ts', 'js'],
    globals: {
      'ts-jest': {
        diagnostics: false,
        isolatedModules: false
      }
    },
    coverageThreshold: {
      global: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90
      }
    }
  }
}
