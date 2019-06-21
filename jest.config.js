module.exports = {
  preset: 'react-native',
  roots: ['<rootDir>'],
  setupFiles: ['<rootDir>/App/__tests__/setup-files/setup-jest.js'],
  setupFilesAfterEnv: ['<rootDir>/App/__tests__/setup-files/setup-enzyme.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-navigation|@react-navigation.*|redux-persist-sensitive-storage)'
  ],
  testPathIgnorePatterns: [
    '__tests__/mock-data',
    '__tests__/coverage',
    '__tests__/setup-files',
    'node_modules'
  ],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.js'],
  coveragePathIgnorePatterns: [
    '__tests__',
    'node_modules',
    'babel.config.js',
    'jest.config.js',
    'metro.config.js',
    'ReactotronConfig.js'
  ],
  coverageDirectory: '<rootDir>/App/__tests__/coverage'
}
