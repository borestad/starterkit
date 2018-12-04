const pkg = require('./package')

module.exports = {
  displayName: pkg.name,
  name: pkg.name,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$',
  moduleFileExtensions: ['ts', 'js']
}
