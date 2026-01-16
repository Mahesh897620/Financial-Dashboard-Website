module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  collectCoverageFrom: [
    'index.html',
    'css/**/*.css'
  ],
  moduleFileExtensions: ['js', 'json'],
  verbose: true
};
