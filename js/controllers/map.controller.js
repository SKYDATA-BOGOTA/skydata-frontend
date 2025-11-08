// SwR-F01, SwR-F02: Mapa y Marcadores
import { CONFIG } from '../config/config.js';
import { showLocationInfo } from './info.controller.js';

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
    return this.map;
  }

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

  clearMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }
}

export const mapController = new MapController();