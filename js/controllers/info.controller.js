// SwR-F03: Visualización de Información Detallada
// SwR-F04: Formato de Presentación de Datos
// SwR-U02: Retroalimentación Visual
// Trazabilidad: ISO/IEC/IEEE 29148:2018 8.4

/**
 * Controlador para mostrar información detallada de ubicaciones
 * Implementa SwR-F03, SwR-F04 y SwR-U02 según SRS v1.1.0.0
 */
class InfoController {
    constructor() {
        this.infoPanel = document.getElementById('info-panel');
    }

    // SwR-F03: Visualización de Información Detallada
    // Implementa requisito funcional SwR-F03 según ISO/IEC/IEEE 29148:2018
    showLocationInfo(feature) {
        if (!feature || !feature.properties) {
            this.showError('No hay información disponible para esta ubicación');
            return;
        }

        const props = feature.properties;
        let html = '<h3>' + (props.nombre || 'Ubicación') + '</h3>';
        html += '<div class="info-content">';

        // SwR-F04: Formato de Presentación de Datos
        // Implementa requisito funcional SwR-F04 según ISO/IEC/IEEE 29148:2018
        if (props.temperatura !== undefined) {
            html += '<p><strong>Temperatura:</strong> ' + this.formatTemperatura(props.temperatura) + '</p>';
        }
        if (props.humedad !== undefined) {
            html += '<p><strong>Humedad:</strong> ' + this.formatHumedad(props.humedad) + '</p>';
        }
        if (props.presion !== undefined) {
            html += '<p><strong>Presión:</strong> ' + this.formatPresion(props.presion) + '</p>';
        }
        if (props.fecha) {
            html += '<p><strong>Fecha:</strong> ' + this.formatFecha(props.fecha) + '</p>';
        }

        html += '</div>';
        this.infoPanel.innerHTML = html;
        this.infoPanel.style.display = 'block';
    }

    // SwR-F04: Formato de Presentación de Datos
    // Implementa requisito funcional SwR-F04 según ISO/IEC/IEEE 29148:2018
    formatTemperatura(valor) {
        return valor + ' °C';
    }

    // SwR-F04: Formato de Presentación de Datos
    // Implementa requisito funcional SwR-F04 según ISO/IEC/IEEE 29148:2018
    formatHumedad(valor) {
        return valor + ' %';
    }

    // SwR-F04: Formato de Presentación de Datos
    // Implementa requisito funcional SwR-F04 según ISO/IEC/IEEE 29148:2018
    formatPresion(valor) {
        return valor + ' hPa';
    }

    // SwR-F04: Formato de Presentación de Datos
    // Implementa requisito funcional SwR-F04 según ISO/IEC/IEEE 29148:2018
    formatFecha(fecha) {
        return new Date(fecha).toLocaleString('es-CO');
    }

    // SwR-U02: Retroalimentación Visual
    // Implementa requisito de usabilidad SwR-U02 según ISO/IEC/IEEE 29148:2018
    showLoading() {
        this.infoPanel.innerHTML = '<p>Cargando información...</p>';
        this.infoPanel.style.display = 'block';
    }

    // SwR-U02: Retroalimentación Visual
    // Implementa requisito de usabilidad SwR-U02 según ISO/IEC/IEEE 29148:2018
    showError(mensaje) {
        this.infoPanel.innerHTML = '<p class="error">' + (mensaje || 'Error al cargar información') + '</p>';
        this.infoPanel.style.display = 'block';
    }
}

// Exportar instancia global
window.infoController = new InfoController();
