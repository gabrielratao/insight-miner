module.exports = {
    setupFilesAfterEnv: ['./jest.setup.js'],
    modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
    testEnvironment: 'node',
    forceExit: true,
    testTimeout: 10000,
  };
  
