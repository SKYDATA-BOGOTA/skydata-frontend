/**
 * Controlador para la gestión del mapa y marcadores
 * 
 * Este módulo se encarga de:
 * - Inicializar el mapa usando Leaflet
 * - Renderizar marcadores desde datos GeoJSON
 * - Gestionar la interacción con los marcadores (clicks, popups)
 * - Limpiar marcadores del mapa
 * 
 * SwR-F01, SwR-F02: Mapa y Marcadores
 */
import { CONFIG } from '../config/config.js';
import { showLocationInfo } from './info.controller.js';

/**
 * Clase que controla la funcionalidad del mapa y sus marcadores
 */
class MapController {
  constructor() {
    this.map = null;
    this.markers = [];
  }

  /**
   * Inicializa el mapa Leaflet con la configuración definida
   * @returns {L.Map} Instancia del mapa creado
   */
  initializeMap() {
    this.map = L.map('map').setView(CONFIG.MAP_CENTER, CONFIG.MAP_ZOOM);
    L.tileLayer(CONFIG.MAP_TILE_URL, {
      attribution: CONFIG.MAP_ATTRIBUTION,
      maxZoom: 18,
      minZoom: 10
    }).addTo(this.map);
    return this.map;
  }

  /**
   * Renderiza marcadores en el mapa a partir de datos GeoJSON
   * @param {Object} geoJsonData - Datos GeoJSON con las características a mostrar
   * @returns {Array} Array de marcadores creados
   */
  renderMarkers(geoJsonData) {
    this.clearMarkers();
    if (!geoJsonData || !geoJsonData.features) return [];
    
    geoJsonData.features.forEach((feature) => {
      if (feature.geometry && feature.geometry.type === 'Point') {
        const coords = feature.geometry.coordinates;
        const latLng = [coords[1], coords[0]];
        const marker = L.marker(latLng);
        marker.on('click', () => showLocationInfo(feature));
        if (feature.properties && feature.properties.estacion) {
          marker.bindPopup(`<b>${feature.properties.estacion}</b>`);
        }
        marker.addTo(this.map);
        this.markers.push(marker);
      }
    });
    return this.markers;
  }

  /**
   * Elimina todos los marcadores del mapa
   */
  clearMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }
}

export const mapController = new MapController();