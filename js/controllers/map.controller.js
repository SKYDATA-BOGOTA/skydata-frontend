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

/**
 * @class MapController
 * @description Controlador principal para la gestión del mapa interactivo.
 * Maneja la inicialización del mapa utilizando Leaflet, gestiona los marcadores
 * que se añaden a la visualización geográfica, y proporciona métodos para
 * renderizar datos GeoJSON y limpiar el mapa.
 * 
 * @author SkyData Team
 * @since 1.0.0
 */
class MapController {
  /**
   * @constructor
   * @description Inicializa una nueva instancia del controlador del mapa.
   * Establece el estado inicial con el mapa y los marcadores como nulos/vacíos.
   */
  constructor() {
    /**
     * @property {L.Map|null} map - Instancia del mapa de Leaflet.
     * Inicialmente null hasta que se llame a initializeMap().
     */
    this.map = null;
    
    /**
     * @property {Array} markers - Array que almacena los marcadores añadidos al mapa.
     * Se utiliza para mantener referencia a todos los marcadores para manipulación posterior.
     */
    this.markers = [];
  }

  /**
   * @method initializeMap
   * @description Inicializa el mapa base utilizando Leaflet y configura la capa de teselas.
   * Crea una instancia del mapa centrada en las coordenadas y zoom definidos en la configuración,
   * y añade una capa de teselas (tiles) de OpenStreetMap con límites de zoom configurables.
   * 
   * @returns {L.Map} La instancia del mapa de Leaflet inicializado
   * 
   * @throws {Error} Puede lanzar un error si el elemento DOM 'map' no existe o si
   * la configuración no está correctamente definida.
   * 
   * @example
   * const map = mapController.initializeMap();
   * // El mapa ahora está listo para agregar marcadores y otras capas
   */
  initializeMap() {
    // Crea la instancia del mapa y establece la vista inicial
    this.map = L.map('map').setView(CONFIG.MAP_CENTER, CONFIG.MAP_ZOOM);
    
    // Añade la capa de teselas (tiles) con configuración de zoom y atribución
    L.tileLayer(CONFIG.MAP_TILE_URL, {
      attribution: CONFIG.MAP_ATTRIBUTION,
      maxZoom: 18, // Nivel máximo de zoom permitido
      minZoom: 10  // Nivel mínimo de zoom permitido
    }).addTo(this.map);
    
    return this.map;
  }

  /**
   * @method renderMarkers
   * @description Renderiza marcadores en el mapa a partir de datos en formato GeoJSON.
   * Limpia los marcadores existentes antes de agregar nuevos. Solo procesa características
   * de tipo 'Point' del GeoJSON.
   * 
   * @param {Object} geoJsonData - Objeto GeoJSON con las características a mostrar
   * @param {Array} geoJsonData.features - Array de características GeoJSON
   * @returns {Array<L.Marker>} Array de marcadores de Leaflet creados y añadidos al mapa
   * 
   * @example
   * const geoData = {
   *   type: "FeatureCollection",
   *   features: [{
   *     type: "Feature",
   *     geometry: { type: "Point", coordinates: [-74.0721, 4.7110] },
   *     properties: { estacion: "Estación Central" }
   *   }]
   * };
   * mapController.renderMarkers(geoData);
   */
  renderMarkers(geoJsonData) {
    // Limpia marcadores previos antes de añadir nuevos
    this.clearMarkers();
    
    // Validación de datos de entrada
    if (!geoJsonData || !geoJsonData.features) return [];
    
    // Itera sobre cada característica del GeoJSON
    geoJsonData.features.forEach((feature) => {
      // Solo procesa puntos geográficos
      if (feature.geometry && feature.geometry.type === 'Point') {
        const coords = feature.geometry.coordinates;
        // GeoJSON usa [lng, lat], Leaflet usa [lat, lng]
        const latLng = [coords[1], coords[0]];
        
        // Crea el marcador en las coordenadas especificadas
        const marker = L.marker(latLng);
        
        // Añade popup con el nombre de la estación si está disponible
        if (feature.properties && feature.properties.estacion) {
          marker.bindPopup(`<b>${feature.properties.estacion}</b>`);
        }
        
        // Añade el marcador al mapa y lo guarda en el array
        marker.addTo(this.map);
        this.markers.push(marker);
      }
    });
    
    return this.markers;
  }

  /**
   * @method clearMarkers
   * @description Elimina todos los marcadores actualmente visibles del mapa
   * y limpia el array de marcadores. Útil para refrescar los datos mostrados.
   * 
   * @example
   * mapController.clearMarkers();
   * // Todos los marcadores han sido removidos del mapa
   */
  clearMarkers() {
    // Remueve cada marcador del mapa
    this.markers.forEach(marker => marker.remove());
    // Limpia el array de referencias
    this.markers = [];
  }
}

/**
 * @constant {MapController} mapController
 * @description Instancia singleton del controlador del mapa exportada para uso global.
 * Esta instancia única garantiza que solo exista un mapa activo en la aplicación.
 * 
 * @exports mapController
 */
export const mapController = new MapController();