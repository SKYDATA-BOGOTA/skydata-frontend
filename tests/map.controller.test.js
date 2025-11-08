/**
 * Tests Unitarios para MapController
 * 
 * Este archivo contiene las pruebas unitarias para verificar el correcto
 * funcionamiento del controlador de mapa y marcadores.
 * 
 * SwR-V03: Pruebas Unitarias de Interfaz
 */

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

// Mock de CONFIG
jest.mock('../js/config/config.js', () => ({
  CONFIG: {
    MAP_CENTER: [4.6097, -74.0817],
    MAP_ZOOM: 11,
    MAP_TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    MAP_ATTRIBUTION: '© OpenStreetMap contributors',
  }
}));

// Importar después de los mocks
import { MapController } from '../js/controllers/map.controller.js';

describe('MapController', () => {
  let mapController;

  beforeEach(() => {
    // Limpiar mocks antes de cada test
    jest.clearAllMocks();
    // Crear nueva instancia del controlador
    mapController = new MapController();
  });

  describe('Constructor', () => {
    test('debe inicializar map como null', () => {
      expect(mapController.map).toBeNull();
    });

    test('debe inicializar markers como array vacío', () => {
      expect(mapController.markers).toEqual([]);
      expect(Array.isArray(mapController.markers)).toBe(true);
    });
  });

  describe('initializeMap()', () => {
    test('debe crear una instancia del mapa', () => {
      const result = mapController.initializeMap();
      
      expect(L.map).toHaveBeenCalledWith('map');
      expect(result).toBeDefined();
      expect(mapController.map).not.toBeNull();
    });

    test('debe configurar la vista inicial con las coordenadas correctas', () => {
      mapController.initializeMap();
      
      const mapInstance = L.map.mock.results[0].value;
      expect(mapInstance.setView).toHaveBeenCalledWith(
        [4.6097, -74.0817],
        11
      );
    });

    test('debe añadir capa de tiles con configuración correcta', () => {
      mapController.initializeMap();
      
      expect(L.tileLayer).toHaveBeenCalledWith(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
          minZoom: 10
        }
      );
    });

    test('debe retornar la instancia del mapa', () => {
      const result = mapController.initializeMap();
      expect(result).toBe(mapController.map);
    });
  });

  describe('renderMarkers()', () => {
    beforeEach(() => {
      // Simular que el mapa está inicializado
      mapController.map = {
        addLayer: jest.fn(),
      };
    });

    test('debe retornar array vacío si geoJsonData es null', () => {
      const result = mapController.renderMarkers(null);
      expect(result).toEqual([]);
      expect(L.marker).not.toHaveBeenCalled();
    });

    test('debe retornar array vacío si geoJsonData no tiene features', () => {
      const result = mapController.renderMarkers({});
      expect(result).toEqual([]);
      expect(L.marker).not.toHaveBeenCalled();
    });

    test('debe crear marcadores para características tipo Point', () => {
      const geoJsonData = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-74.0721, 4.7110]
            },
            properties: {
              estacion: "Estación Central"
            }
          }
        ]
      };

      const result = mapController.renderMarkers(geoJsonData);

      // Verifica que se creó el marcador con coordenadas convertidas [lat, lng]
      expect(L.marker).toHaveBeenCalledWith([4.7110, -74.0721]);
      expect(result).toHaveLength(1);
      expect(mapController.markers).toHaveLength(1);
    });

    test('debe convertir correctamente coordenadas GeoJSON [lng, lat] a Leaflet [lat, lng]', () => {
      const geoJsonData = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-74.0721, 4.7110] // GeoJSON: [lng, lat]
            },
            properties: {}
          }
        ]
      };

      mapController.renderMarkers(geoJsonData);

      // Leaflet espera [lat, lng]
      expect(L.marker).toHaveBeenCalledWith([4.7110, -74.0721]);
    });

    test('debe añadir popup si hay nombre de estación', () => {
      const geoJsonData = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-74.0721, 4.7110]
            },
            properties: {
              estacion: "Estación Test"
            }
          }
        ]
      };

      mapController.renderMarkers(geoJsonData);

      const markerInstance = L.marker.mock.results[0].value;
      expect(markerInstance.bindPopup).toHaveBeenCalledWith("<b>Estación Test</b>");
    });

    test('debe ignorar características que no son tipo Point', () => {
      const geoJsonData = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [[-74.0721, 4.7110], [-74.0722, 4.7111]]
            },
            properties: {}
          },
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [[[-74.0721, 4.7110], [-74.0722, 4.7111], [-74.0721, 4.7110]]]
            },
            properties: {}
          }
        ]
      };

      const result = mapController.renderMarkers(geoJsonData);

      expect(L.marker).not.toHaveBeenCalled();
      expect(result).toHaveLength(0);
    });

    test('debe procesar múltiples marcadores correctamente', () => {
      const geoJsonData = {
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

      const result = mapController.renderMarkers(geoJsonData);

      expect(L.marker).toHaveBeenCalledTimes(3);
      expect(result).toHaveLength(3);
      expect(mapController.markers).toHaveLength(3);
    });

    test('debe limpiar marcadores previos antes de renderizar nuevos', () => {
      // Añadir algunos marcadores existentes
      const oldMarker = {
        remove: jest.fn(),
      };
      mapController.markers = [oldMarker];

      const geoJsonData = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-74.0721, 4.7110] },
            properties: { estacion: "Nueva Estación" }
          }
        ]
      };

      mapController.renderMarkers(geoJsonData);

      // Verifica que se llamó remove en el marcador antiguo
      expect(oldMarker.remove).toHaveBeenCalled();
    });
  });

  describe('clearMarkers()', () => {
    test('debe llamar remove() en todos los marcadores', () => {
      const marker1 = { remove: jest.fn() };
      const marker2 = { remove: jest.fn() };
      const marker3 = { remove: jest.fn() };
      
      mapController.markers = [marker1, marker2, marker3];
      mapController.clearMarkers();

      expect(marker1.remove).toHaveBeenCalled();
      expect(marker2.remove).toHaveBeenCalled();
      expect(marker3.remove).toHaveBeenCalled();
    });

    test('debe vaciar el array de marcadores', () => {
      const marker1 = { remove: jest.fn() };
      const marker2 = { remove: jest.fn() };
      
      mapController.markers = [marker1, marker2];
      mapController.clearMarkers();

      expect(mapController.markers).toEqual([]);
      expect(mapController.markers).toHaveLength(0);
    });

    test('debe funcionar correctamente con array vacío', () => {
      mapController.markers = [];
      
      expect(() => {
        mapController.clearMarkers();
      }).not.toThrow();
      
      expect(mapController.markers).toEqual([]);
    });
  });

  describe('Integración', () => {
    test('debe poder inicializar mapa y renderizar marcadores en secuencia', () => {
      // Inicializar mapa
      mapController.initializeMap();
      expect(mapController.map).not.toBeNull();

      // Renderizar marcadores
      const geoJsonData = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-74.0721, 4.7110] },
            properties: { estacion: "Estación Test" }
          }
        ]
      };

      const markers = mapController.renderMarkers(geoJsonData);
      expect(markers).toHaveLength(1);

      // Limpiar marcadores
      mapController.clearMarkers();
      expect(mapController.markers).toHaveLength(0);
    });

    test('debe manejar múltiples ciclos de render y clear', () => {
      mapController.initializeMap();

      const geoJsonData = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-74.0721, 4.7110] },
            properties: { estacion: "Estación 1" }
          }
        ]
      };

      // Primera renderización
      mapController.renderMarkers(geoJsonData);
      expect(mapController.markers).toHaveLength(1);

      // Limpiar
      mapController.clearMarkers();
      expect(mapController.markers).toHaveLength(0);

      // Segunda renderización
      mapController.renderMarkers(geoJsonData);
      expect(mapController.markers).toHaveLength(1);

      // No debería haber problemas con múltiples ciclos
      expect(L.marker).toHaveBeenCalledTimes(2);
    });
  });
});

