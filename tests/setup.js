/**
 * Configuración inicial para pruebas con Jest y jsdom
 * 
 * Configurado según ISO/IEC 25020:2019 (Modelo de Medición)
 * y ISO/IEC 25040:2011 Actividad 2 - Tarea 2.1
 * 
 * SwR-V01: Configuración de entorno de pruebas
 */

// Importar matchers adicionales de @testing-library/jest-dom
require('@testing-library/jest-dom');

// Configuración global para pruebas
// Mock de Leaflet si es necesario (se puede expandir según necesidades)
global.L = {
  map: jest.fn(() => ({
    setView: jest.fn(),
    addLayer: jest.fn(),
    removeLayer: jest.fn(),
    on: jest.fn(),
    off: jest.fn()
  })),
  tileLayer: jest.fn(() => ({
    addTo: jest.fn()
  })),
  marker: jest.fn(() => ({
    addTo: jest.fn(),
    bindPopup: jest.fn(),
    on: jest.fn()
  })),
  icon: jest.fn(),
  latLng: jest.fn()
};

// Limpiar mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
});

