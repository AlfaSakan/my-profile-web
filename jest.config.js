module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  // setupFilesAfterEnv: [],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
    '<rootDir>/.vscode/',
    '<rootDir>/.husky/',
  ],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>'],
  //   moduleNameMapper: {
  //     '@src/(.*)': '<rootDir>/src/$1',
  //     '@styles/(.*)': '<rootDir>/styles/$1',
  //   },
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
