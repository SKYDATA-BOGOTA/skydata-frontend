// SwR-F01: Renderizado de Mapa Base
// SwR-F07: Solicitud de Datos al Backend
// Trazabilidad: ISO/IEC/IEEE 29148:2018 8.4

/**
 * Punto de entrada principal de la aplicación
 * Implementa SwR-F01 y SwR-F07 según SRS v1.1.0.0
 */

// SwR-F01: Renderizado de Mapa Base
// SwR-F07: Solicitud de Datos al Backend
// Implementa requisitos funcionales SwR-F01 y SwR-F07 según ISO/IEC/IEEE 29148:2018
document.addEventListener('DOMContentLoaded', async () => {
    // Inicializar mapa
    if (window.mapController) {
        window.mapController.initializeMap();
    }

    // Mostrar estado de carga
    if (window.infoController) {
        window.infoController.showLoading();
    }

    // Obtener datos del backend
    try {
        const data = await window.dataService.fetchDatosAmbientales();
        
        // Renderizar marcadores en el mapa
        if (window.mapController && data) {
            window.mapController.renderMarkers(data);
        }

        // Ocultar estado de carga
        if (window.infoController) {
            window.infoController.infoPanel.style.display = 'none';
        }
    } catch (error) {
        console.error('Error al inicializar aplicación:', error);
        if (window.infoController) {
            window.infoController.showError('No se pudieron cargar los datos ambientales');
        }
    }
});
