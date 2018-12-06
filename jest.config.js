module.exports = {
  cacheDirectory: '.jest/cache',
  preset: 'react-native',

  globals: {
    'ts-jest': {
      useBabelrc: true
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx)$':
      '<rootDir>/node_modules/react-native/jest/preprocessor.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-router-native)/'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/']
};
