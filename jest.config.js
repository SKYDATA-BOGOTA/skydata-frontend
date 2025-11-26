/**
 * Configuración de Jest para pruebas unitarias del frontend
 * 
 * Configurado según ISO/IEC 25020:2019 (Modelo de Medición)
 * y ISO/IEC 25040:2011 Actividad 2 - Tarea 2.1 (Determinar entidades objetivo)
 * 
 * SwR-V01: Configuración de entorno de pruebas
 */

module.exports = {
  // Entorno de pruebas: jsdom para simular DOM del navegador
  testEnvironment: 'jsdom',
  
  // Directorios donde Jest buscará archivos de prueba
  roots: ['<rootDir>/tests'],
  
  // Patrones de archivos de prueba
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Archivos de setup que se ejecutan antes de cada test
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Directorios a ignorar
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  
  // Archivos de módulos a transformar con Babel
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  
  // Extensiones de módulos
  moduleFileExtensions: ['js', 'json'],
  
  // Cobertura de código
  collectCoverageFrom: [
    'js/**/*.js',
    '!js/main.js', // Excluir punto de entrada
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  
  // Umbrales de cobertura según ISO 25020:2019
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  },
  
  // Reportes de cobertura
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Directorio para reportes de cobertura
  coverageDirectory: 'coverage'
};

