/**
 * Configuración de Jest para pruebas unitarias del frontend
 * Base Normativa: ISO/IEC 25020:2019, ISO/IEC 25040:2011
 */

module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/*.test.js',
    '**/*.spec.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/e2e/',
    '/tests/compatibility/',
    '/tests/usability/',
    '/tests/reliability/',
    '/tests/quality-in-use/'
  ],
  moduleFileExtensions: ['js', 'json'],
  collectCoverageFrom: [
    'js/**/*.js',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage',
  verbose: true,
  testTimeout: 10000
};
