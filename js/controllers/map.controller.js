// SwR-F01: Renderizado de Mapa Base
// SwR-F02: Marcadores en el Mapa
// Trazabilidad: ISO/IEC/IEEE 29148:2018 8.4

/**
 * Controlador para el mapa interactivo
 * Implementa SwR-F01 y SwR-F02 según SRS v1.1.0.0
 */
class MapController {
    constructor() {
        this.map = null;
        this.markers = [];
    }

    // SwR-F01: Renderizado de Mapa Base
    // Implementa requisito funcional SwR-F01 según ISO/IEC/IEEE 29148:2018
    initializeMap() {
        // Inicializar mapa centrado en Bogotá
        this.map = L.map('map').setView([4.6097, -74.0817], 12);
        
        // Agregar capa de tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    }

    // SwR-F02: Marcadores en el Mapa
    // Implementa requisito funcional SwR-F02 según ISO/IEC/IEEE 29148:2018
    renderMarkers(geojsonData) {
        // Limpiar marcadores existentes
        this.markers.forEach(marker => marker.remove());
        this.markers = [];

        // Agregar marcadores por cada feature del GeoJSON
        if (geojsonData && geojsonData.features) {
            geojsonData.features.forEach(feature => {
                const [lng, lat] = feature.geometry.coordinates;
                const marker = L.marker([lat, lng]).addTo(this.map);
                
                // Agregar popup con información básica
                if (feature.properties) {
                    marker.bindPopup(`<b>${feature.properties.nombre || 'Ubicación'}</b>`);
                }
                
                // Agregar evento de clic
                marker.on('click', () => {
                    if (window.infoController) {
                        window.infoController.showLocationInfo(feature);
                    }
                });
                
                this.markers.push(marker);
            });
        }
    }
}

// Exportar instancia global
window.mapController = new MapController();
