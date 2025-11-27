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
        const nombre = props.estacion || props.nombre || 'Ubicación';
        const localidad = props.localidad || 'Bogotá';
        const timestamp = props.timestamp || props.fecha;

        let html = `<div class="info-header">
            <h3>${nombre}</h3>
            <span class="badge-localidad">${localidad}</span>
        </div>`;
        
        html += '<div class="info-content">';
        html += '<div class="variables-grid">';

        // SwR-F04: Formato de Presentación de Datos
        // Implementa requisito funcional SwR-F04 según ISO/IEC/IEEE 29148:2018
        
        if (props.temperatura !== undefined) {
            html += this.createVariableCard('Temperatura', this.formatTemperatura(props.temperatura), '🌡️');
        }
        if (props.humedad !== undefined) {
            html += this.createVariableCard('Humedad', this.formatHumedad(props.humedad), '💧');
        }
        if (props.calidad_aire !== undefined) {
            html += this.createVariableCard('Calidad Aire', props.calidad_aire + ' ICA', '🍃');
        }
        if (props.ruido !== undefined) {
            html += this.createVariableCard('Ruido', props.ruido + ' dB', '🔊');
        }
        if (props.presion !== undefined) {
            html += this.createVariableCard('Presión', this.formatPresion(props.presion), '⏲️');
        }
        
        html += '</div>'; // Cierre grid

        if (timestamp) {
            html += `<div class="timestamp-info">
                <p><strong>Última actualización:</strong> ${this.formatFecha(timestamp)}</p>
            </div>`;
        }

        html += '</div>'; // Cierre content
        
        this.infoPanel.innerHTML = html;
        this.infoPanel.style.display = '';
        this.infoPanel.classList.remove('hidden');
    }

    createVariableCard(label, value, icon) {
        return `
            <div class="variable-card">
                <div class="variable-icon">${icon}</div>
                <div class="variable-data">
                    <span class="variable-label">${label}</span>
                    <span class="variable-value">${value}</span>
                </div>
            </div>
        `;
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
        this.infoPanel.style.display = '';
        this.infoPanel.classList.remove('hidden');
    }

    // SwR-U02: Retroalimentación Visual
    // Implementa requisito de usabilidad SwR-U02 según ISO/IEC/IEEE 29148:2018
    showError(mensaje) {
        this.infoPanel.innerHTML = '<p class="error">' + (mensaje || 'Error al cargar información') + '</p>';
        this.infoPanel.style.display = '';
        this.infoPanel.classList.remove('hidden');
    }
}

// Exportar instancia global
window.infoController = new InfoController();
