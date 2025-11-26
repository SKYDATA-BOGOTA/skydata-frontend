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

// Polyfills para Node.js (necesarios para MSW y Fetch API)
if (typeof TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Polyfill para Response y Request (necesario para MSW en Node.js)
if (typeof Response === 'undefined') {
  const { Response, Request, Headers } = require('whatwg-fetch');
  global.Response = Response;
  global.Request = Request;
  global.Headers = Headers;
}

// Polyfill para BroadcastChannel (necesario para MSW)
if (typeof BroadcastChannel === 'undefined') {
  global.BroadcastChannel = class BroadcastChannel {
    constructor() {}
    postMessage() {}
    close() {}
    addEventListener() {}
    removeEventListener() {}
  };
}

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

// Polyfills para Node.js (necesarios para MSW)
if (typeof TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Limpiar mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
});

