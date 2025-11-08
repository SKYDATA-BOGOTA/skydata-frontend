// SwR-F01: Renderizado de Mapa Base
import { CONFIG } from '../config/config.js';

class MapController {
  constructor() {
    this.map = null;
    this.markers = [];
  }

  initializeMap() {
    this.map = L.map('map').setView(CONFIG.MAP_CENTER, CONFIG.MAP_ZOOM);
    L.tileLayer(CONFIG.MAP_TILE_URL, {
      attribution: CONFIG.MAP_ATTRIBUTION,
      maxZoom: 18,
      minZoom: 10
    }).addTo(this.map);
    console.info('✓ Mapa inicializado');
    return this.map;
  }
}

export const mapController = new MapController();