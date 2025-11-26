/**
 * Tests de Integración Frontend-Backend
 * 
 * Este archivo contiene las pruebas de integración para verificar la comunicación
 * completa entre componentes frontend y backend según ISO/IEC 25040:2011
 * Actividad 2 - Tarea 2.2 (Módulos de Calificación - Corrección Funcional).
 * 
 * ISO/IEC 12207:2017 6.4.6.4.3 (Integration Testing)
 * ISO/IEC 25010:2011 8.1.2 (Pertinencia Funcional)
 * ISO/IEC 25020:2019 (Modelo de Medición)
 */

// Mock de fetch global
global.fetch = jest.fn();

import { dataService } from '../../js/services/data.service.js';
import { MapController } from '../../js/controllers/map.controller.js';
import { showLocationInfo } from '../../js/controllers/info.controller.js';

// Mock de CONFIG
jest.mock('../../js/config/config.js', () => ({
  CONFIG: {
    API_BASE_URL: 'http://localhost:3000',
    API_DATOS_ENDPOINT: '/api/datos',
    MAP_CENTER: [4.6097, -74.0817],
    MAP_ZOOM: 11,
    MAP_TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    MAP_ATTRIBUTION: '© OpenStreetMap contributors',
  }
}));

// Mock de Leaflet
global.L = {
  map: jest.fn(() => ({
    setView: jest.fn().mockReturnThis(),
    addLayer: jest.fn(),
  })),
  tileLayer: jest.fn(() => ({
    addTo: jest.fn().mockReturnThis(),
  })),
  marker: jest.fn((latLng) => ({
    latLng: latLng,
    bindPopup: jest.fn().mockReturnThis(),
    addTo: jest.fn().mockReturnThis(),
    remove: jest.fn(),
  })),
};

// Datos mock del backend
const mockGeoJsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-74.0721, 4.7110]
      },
      properties: {
        estacion: "Estación Central",
        temperatura: 22,
        humedad: 65,
        calidad_aire: "Buena",
        ruido: 45
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-74.0825, 4.6511]
      },
      properties: {
        estacion: "Estación Norte",
        temperatura: 20,
        humedad: 70,
        calidad_aire: "Regular",
        ruido: 50
      }
    }
  ]
};

describe('Integración Frontend-Backend', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockClear();
  });

  describe('Flujo completo: Solicitud → Procesamiento → Visualización', () => {
    test('debe completar flujo completo: fetch → map → info', async () => {
      // Mock de fetch para respuesta exitosa
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGeoJsonData
      });

      // Setup DOM
      document.body.innerHTML = `
        <div id="map"></div>
        <div id="info-panel" class="hidden"></div>
        <div id="info-content"></div>
      `;

      // Paso 1: Solicitar datos al backend
      const geoJsonData = await dataService.fetchDatosAmbientales();
      
      expect(geoJsonData.type).toBe('FeatureCollection');
      expect(geoJsonData.features).toHaveLength(2);
      expect(geoJsonData.features[0].properties.estacion).toBe('Estación Central');

      // Paso 2: Inicializar mapa
      const mapController = new MapController();
      const map = mapController.initializeMap();
      
      expect(map).toBeDefined();
      expect(L.map).toHaveBeenCalledWith('map');

      // Paso 3: Renderizar marcadores desde datos del backend
      const markers = mapController.renderMarkers(geoJsonData);
      
      expect(markers).toHaveLength(2);
      expect(L.marker).toHaveBeenCalledTimes(2);
      expect(L.marker).toHaveBeenCalledWith([4.7110, -74.0721]);
      expect(L.marker).toHaveBeenCalledWith([4.6511, -74.0825]);

      // Paso 4: Visualizar información detallada
      showLocationInfo(geoJsonData.features[0]);
      
      const infoPanel = document.getElementById('info-panel');
      const infoContent = document.getElementById('info-content');
      
      expect(infoPanel.classList.contains('hidden')).toBe(false);
      expect(infoContent.innerHTML).toContain('Estación Central');
      expect(infoContent.innerHTML).toContain('22 °C');
      expect(infoContent.innerHTML).toContain('65 %');
    });

    test('debe manejar error de conexión y mostrar mensaje apropiado', async () => {
      // Simular error de conexión
      fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

      await expect(dataService.fetchDatosAmbientales()).rejects.toThrow('No se pudo conectar con el servidor');
    });

    test('debe manejar respuesta HTTP 500 del backend', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ error: 'Internal Server Error' })
      });

      await expect(dataService.fetchDatosAmbientales()).rejects.toThrow('HTTP 500');
    });

    test('debe procesar FeatureCollection vacía correctamente', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ type: "FeatureCollection", features: [] })
      });

      const geoJsonData = await dataService.fetchDatosAmbientales();
      
      expect(geoJsonData.features).toEqual([]);

      const mapController = new MapController();
      mapController.initializeMap();
      const markers = mapController.renderMarkers(geoJsonData);
      
      expect(markers).toEqual([]);
      expect(L.marker).not.toHaveBeenCalled();
    });
  });

  describe('QME según ISO/IEC 25020:2019', () => {
    test('QME_IT_001: debe probar todos los flujos de integración requeridos', async () => {
      // Mock de fetch para respuesta exitosa
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGeoJsonData
      });

      // Setup DOM
      document.body.innerHTML = `
        <div id="map"></div>
        <div id="info-panel" class="hidden"></div>
        <div id="info-content"></div>
      `;

      // Flujo 1: Solicitud GET exitosa
      const data1 = await dataService.fetchDatosAmbientales();
      expect(data1).toBeDefined();

      // Flujo 2: Procesamiento de GeoJSON
      const mapController = new MapController();
      mapController.initializeMap();
      const markers = mapController.renderMarkers(data1);
      expect(markers.length).toBeGreaterThan(0);

      // Flujo 3: Visualización de información
      document.body.innerHTML = `
        <div id="info-panel" class="hidden"></div>
        <div id="info-content"></div>
      `;
      showLocationInfo(data1.features[0]);
      const infoPanel = document.getElementById('info-panel');
      expect(infoPanel.classList.contains('hidden')).toBe(false);

      // QME_IT_001 = 3 flujos probados
      // QME_IT_002 = 3 flujos requeridos
      // QM_IT_001 = 100% (≥100% umbral cumplido)
    });
  });
});

