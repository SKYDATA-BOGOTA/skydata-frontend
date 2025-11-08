// SwR-F01: Renderizado de Mapa Base
import { CONFIG } from '../config/config.js';

/**
 * @class MapController
 * @description Controlador principal para la gestión del mapa interactivo.
 * Maneja la inicialización del mapa utilizando Leaflet y gestiona los marcadores
 * que se añaden a la visualización geográfica.
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
    
    // Log de confirmación de inicialización exitosa
    console.info('✓ Mapa inicializado');
    
    return this.map;
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