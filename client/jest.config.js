module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/utils/test/setupTests.ts'],
  moduleNameMapper: {
    '^Api$': '<rootDir>/src/generated/graphql.tsx',
    '^Components(.*)$': '<rootDir>/src/components$1',
    '^Utils(.*)$': '<rootDir>/src/utils$1',
  },
};
