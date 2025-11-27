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
    '/e2e/'
  ],
  moduleFileExtensions: ['js', 'json'],
  collectCoverageFrom: [
    'public/js/**/*.js',
    'src/**/*.js',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage',
  verbose: true,
  testTimeout: 10000
};
