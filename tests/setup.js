/**
 * Configuración inicial para pruebas con Jest y jsdom
 * 
 * Configurado según ISO/IEC 25020:2019 (Modelo de Medición)
 * y ISO/IEC 25040:2011 Actividad 2 - Tarea 2.1
 * 
 * SwR-V01: Configuración de entorno de pruebas
 */

// Polyfills para Node.js
if (typeof TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Mock de Headers, Request, Response para fetch
global.Headers = class Headers {
  constructor(init = {}) {
    this._headers = {};
    if (init) {
      Object.entries(init).forEach(([key, value]) => {
        this._headers[key.toLowerCase()] = value;
      });
    }
  }
  get(name) {
    return this._headers[name.toLowerCase()] || null;
  }
  set(name, value) {
    this._headers[name.toLowerCase()] = value;
  }
};

// Mock de Leaflet
global.L = {
  map: jest.fn(() => ({
    setView: jest.fn().mockReturnThis(),
    addLayer: jest.fn().mockReturnThis(),
    removeLayer: jest.fn().mockReturnThis(),
    on: jest.fn().mockReturnThis(),
    off: jest.fn().mockReturnThis(),
    getZoom: jest.fn().mockReturnValue(12),
    getCenter: jest.fn().mockReturnValue({ lat: 4.6097, lng: -74.0817 })
  })),
  tileLayer: jest.fn(() => ({
    addTo: jest.fn().mockReturnThis()
  })),
  marker: jest.fn(() => ({
    addTo: jest.fn().mockReturnThis(),
    bindPopup: jest.fn().mockReturnThis(),
    on: jest.fn().mockReturnThis(),
    setLatLng: jest.fn().mockReturnThis()
  })),
  icon: jest.fn(() => ({})),
  latLng: jest.fn((lat, lng) => ({ lat, lng })),
  geoJSON: jest.fn(() => ({
    addTo: jest.fn().mockReturnThis(),
    clearLayers: jest.fn().mockReturnThis()
  })),
  circleMarker: jest.fn(() => ({
    addTo: jest.fn().mockReturnThis(),
    bindPopup: jest.fn().mockReturnThis()
  }))
};

// Mock de fetch
global.fetch = jest.fn();

// Limpiar mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
  if (global.fetch) {
    global.fetch.mockReset();
  }
});

// Silenciar console.error en tests (opcional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (args[0]?.includes?.('Warning:')) return;
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
