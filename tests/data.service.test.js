/**
 * Tests Unitarios para DataService
 * 
 * Este archivo contiene las pruebas unitarias para verificar el correcto
 * funcionamiento del servicio de datos según ISO/IEC 25010:2011 8.1.2
 * (Corrección Funcional).
 * 
 * SwR-F07, SwR-I02: Cliente HTTP y Obtención de Datos
 * ISO/IEC 25023:2016 Sección 5.1.2 (Corrección Funcional)
 * ISO/IEC 25020:2019 (Modelo de Medición)
 * ISO/IEC 25040:2011 Actividad 2 - Tarea 2.2
 */

// Mock de fetch global
global.fetch = jest.fn();

// Mock de CONFIG
jest.mock('../js/config/config.js', () => ({
  CONFIG: {
    API_BASE_URL: 'http://localhost:3000',
    API_DATOS_ENDPOINT: '/api/datos',
  }
}));

// Importar después de los mocks
import { dataService } from '../js/services/data.service.js';

describe('DataService', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    jest.clearAllMocks();
    fetch.mockClear();
  });

  describe('fetchDatosAmbientales()', () => {
    test('debe realizar petición GET a la URL correcta', async () => {
      const mockData = {
        type: "FeatureCollection",
        features: []
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      await dataService.fetchDatosAmbientales();
      
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/datos',
        { method: 'GET', mode: 'cors' }
      );
    });

    test('debe retornar datos GeoJSON válidos cuando la respuesta es exitosa', async () => {
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
              estacion: "Estación Test",
              temperatura: 20,
              humedad: 65
            }
          }
        ]
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGeoJsonData,
      });

      const result = await dataService.fetchDatosAmbientales();
      
      expect(result.type).toBe("FeatureCollection");
      expect(result.features).toHaveLength(1);
      expect(result.features[0].geometry.type).toBe("Point");
      expect(result.features[0].properties.estacion).toBe("Estación Test");
    });

    test('debe lanzar error si la respuesta HTTP no es exitosa', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(dataService.fetchDatosAmbientales()).rejects.toThrow('HTTP 404');
    });

    test('debe lanzar error si los datos recibidos no son GeoJSON válido', async () => {
      const invalidData = {
        data: []
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => invalidData,
      });

      await expect(dataService.fetchDatosAmbientales()).rejects.toThrow('GeoJSON inválido recibido del servidor');
    });

    test('debe lanzar error si los datos no tienen type FeatureCollection', async () => {
      const invalidData = {
        type: "InvalidType",
        features: []
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => invalidData,
      });

      await expect(dataService.fetchDatosAmbientales()).rejects.toThrow('GeoJSON inválido recibido del servidor');
    });

    test('debe manejar errores de conexión de red', async () => {
      fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

      await expect(dataService.fetchDatosAmbientales()).rejects.toThrow('No se pudo conectar con el servidor');
    });

    test('debe manejar errores de red genéricos', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(dataService.fetchDatosAmbientales()).rejects.toThrow('Network error');
    });

    test('debe manejar respuestas HTTP 500', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(dataService.fetchDatosAmbientales()).rejects.toThrow('HTTP 500');
    });

    test('debe manejar respuestas HTTP 400', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      });

      await expect(dataService.fetchDatosAmbientales()).rejects.toThrow('HTTP 400');
    });

    test('debe procesar FeatureCollection vacía correctamente', async () => {
      const emptyGeoJson = {
        type: "FeatureCollection",
        features: []
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => emptyGeoJson,
      });

      const result = await dataService.fetchDatosAmbientales();
      
      expect(result.type).toBe("FeatureCollection");
      expect(result.features).toEqual([]);
    });

    test('debe procesar múltiples features correctamente', async () => {
      const multiFeatureGeoJson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-74.0721, 4.7110] },
            properties: { estacion: "Estación 1" }
          },
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-74.0825, 4.6511] },
            properties: { estacion: "Estación 2" }
          },
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-74.1125, 4.6850] },
            properties: { estacion: "Estación 3" }
          }
        ]
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => multiFeatureGeoJson,
      });

      const result = await dataService.fetchDatosAmbientales();
      
      expect(result.features).toHaveLength(3);
      expect(result.features[0].properties.estacion).toBe("Estación 1");
      expect(result.features[1].properties.estacion).toBe("Estación 2");
      expect(result.features[2].properties.estacion).toBe("Estación 3");
    });

    test('debe usar modo CORS en la petición', async () => {
      const mockData = {
        type: "FeatureCollection",
        features: []
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      await dataService.fetchDatosAmbientales();
      
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          mode: 'cors'
        })
      );
    });
  });
});
