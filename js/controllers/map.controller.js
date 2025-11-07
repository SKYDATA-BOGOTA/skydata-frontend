// SwR-F01: Renderizado de Mapa Base
// SwR-F02: Marcadores en el Mapa
// ISO/IEC 12207:2017: Sec 6.4.6.4 - Implementation Process

import { CONFIG } from '../config/config.js';
import { showLocationInfo } from './info.controller.js';

/**
 * Map Controller
 * 
 * Trazabilidad:
 * - SwR-F01: Renderizado de Mapa Base
 * - SwR-F02: Marcadores en el Mapa
 * - SyR-F01: Visualización de Ubicaciones
 * - CU-01: Consultar Información Ambiental
 * 
 * Responsabilidades:
 * - Inicializar mapa con Leaflet.js
 * - Renderizar marcadores desde datos GeoJSON
 * - Manejar eventos de interacción del usuario
 */
class MapController {
  constructor() {
    this.map = null;
    this.markers = [];
  }

  /**
   * SwR-F01: Inicializa el mapa centrado en Bogotá
   * @returns {L.Map} Instancia del mapa Leaflet
   */
  initializeMap() {
    try {
      // SwR-F01: Renderizado de Mapa Base
      // CU-01: Sistema presenta el mapa con las ubicaciones
      this.map = L.map('map').setView(CONFIG.MAP_CENTER, CONFIG.MAP_ZOOM);

      // Agregar tiles de OpenStreetMap
      L.tileLayer(CONFIG.MAP_TILE_URL, {
        attribution: CONFIG.MAP_ATTRIBUTION,
        maxZoom: 18,
        minZoom: 10
      }).addTo(this.map);

      console.info('✓ Mapa inicializado correctamente');
      console.info(`✓ Centro: ${CONFIG.MAP_CENTER}`);
      console.info(`✓ Zoom: ${CONFIG.MAP_ZOOM}`);

      return this.map;
    } catch (error) {
      console.error('Error al inicializar mapa:', error);
      throw error;
    }
  }

  /**
   * SwR-F02: Renderiza marcadores en el mapa desde GeoJSON
   * @param {Object} geoJsonData - Datos en formato GeoJSON
   * @returns {Array} Array de marcadores creados
   */
  renderMarkers(geoJsonData) {
    try {
      // Limpiar marcadores anteriores
      this.clearMarkers();

      // SwR-F02: Crear marcador por cada Feature
      if (!geoJsonData || !geoJsonData.features) {
        console.warn('No hay features para renderizar');
        return [];
      }

      geoJsonData.features.forEach((feature) => {
        if (feature.geometry && feature.geometry.type === 'Point') {
          const coords = feature.geometry.coordinates;
          // RFC 7946: coordinates = [longitude, latitude]
          const latLng = [coords[1], coords[0]];

          // Crear marcador
          const marker = L.marker(latLng);

          // SwR-F03: Agregar evento de clic para mostrar info
          marker.on('click', () => {
            showLocationInfo(feature);
          });

          // Agregar popup con nombre de estación
          if (feature.properties && feature.properties.estacion) {
            marker.bindPopup(`<b>${feature.properties.estacion}</b>`);
          }

          marker.addTo(this.map);
          this.markers.push(marker);
        }
      });

      console.info(`✓ Renderizados ${this.markers.length} marcadores`);
      return this.markers;
    } catch (error) {
      console.error('Error al renderizar marcadores:', error);
      throw error;
    }
  }

  /**
   * Limpia todos los marcadores del mapa
   */
  clearMarkers() {
    this.markers.forEach(marker => {
      marker.remove();
    });
    this.markers = [];
  }

  /**
   * Centra el mapa en una ubicación específica
   * @param {Array} latLng - [latitud, longitud]
   * @param {number} zoom - Nivel de zoom (opcional)
   */
  centerMap(latLng, zoom) {
    if (this.map) {
      this.map.setView(latLng, zoom || CONFIG.MAP_ZOOM);
    }
  }
}

// Exportar instancia singleton
export const mapController = new MapController();