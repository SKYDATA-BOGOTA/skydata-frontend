// SwR-F03: Visualización de Información Detallada
// SwR-F04: Formato de Presentación de Datos
// CU-02: Visualizar Detalles de Ubicación
// ISO/IEC 25010:2011: Usability

/**
 * Info Controller
 * 
 * Trazabilidad:
 * - SwR-F03: Visualización de Información Detallada
 * - SwR-F04: Formato de Presentación de Datos
 * - SwR-U01: Interfaz Intuitiva
 * - SwR-U02: Retroalimentación Visual
 * - CU-02: Visualizar Detalles de Ubicación
 * 
 * Responsabilidades:
 * - Mostrar información detallada de estaciones
 * - Formatear datos con unidades apropiadas
 * - Gestionar estados (loading, error, success)
 */

/**
 * SwR-F03: Muestra información detallada de una ubicación
 * @param {Object} feature - Feature de GeoJSON
 */
export function showLocationInfo(feature) {
  const infoPanel = document.getElementById('info-panel');
  const infoContent = document.getElementById('info-content');

  if (!feature || !feature.properties) {
    showError('No hay información disponible para esta ubicación');
    return;
  }

  const props = feature.properties;

  // SwR-F04: Formato de Presentación de Datos
  // SyR-F02: Presentar temperatura, humedad, calidad del aire, ruido
  const html = `
    <div class="station-info">
      <h3>${props.estacion || 'Estación Desconocida'}</h3>
      ${props.localidad ? `<p class="localidad"><strong>Localidad:</strong> ${props.localidad}</p>` : ''}
      ${props.descripcion ? `<p class="descripcion">${props.descripcion}</p>` : ''}
      
      <div class="variables-grid">
        <div class="variable-card temperature">
          <span class="variable-icon">🌡️</span>
          <span class="variable-label">Temperatura</span>
          <span class="variable-value">${formatTemperatura(props.temperatura)}</span>
        </div>
        
        <div class="variable-card humidity">
          <span class="variable-icon">💧</span>
          <span class="variable-label">Humedad</span>
          <span class="variable-value">${formatHumedad(props.humedad)}</span>
        </div>
        
        <div class="variable-card air-quality">
          <span class="variable-icon">🌫️</span>
          <span class="variable-label">Calidad del Aire</span>
          <span class="variable-value">${formatCalidadAire(props.calidad_aire)}</span>
        </div>
        
        <div class="variable-card noise">
          <span class="variable-icon">🔊</span>
          <span class="variable-label">Nivel de Ruido</span>
          <span class="variable-value">${formatRuido(props.ruido)}</span>
        </div>
      </div>
      
      ${props.timestamp ? `<p class="timestamp"><strong>Última actualización:</strong> ${formatTimestamp(props.timestamp)}</p>` : ''}
    </div>
  `;

  infoContent.innerHTML = html;
  infoPanel.classList.remove('hidden');
}

/**
 * SwR-U02: Muestra estado de carga
 * @param {string} message - Mensaje a mostrar
 */
export function showLoading(message = 'Cargando...') {
  const loadingEl = document.getElementById('loading-indicator');
  if (loadingEl) {
    loadingEl.textContent = message;
    loadingEl.style.display = 'block';
  }
}

/**
 * SwR-U02: Oculta estado de carga
 */
export function hideLoading() {
  const loadingEl = document.getElementById('loading-indicator');
  if (loadingEl) {
    loadingEl.style.display = 'none';
  }
}

/**
 * SwR-U02: Muestra mensaje de error
 * @param {string} message - Mensaje de error
 */
export function showError(message) {
  const errorEl = document.getElementById('error-message');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      errorEl.style.display = 'none';
    }, CONFIG.ERROR_DISPLAY_TIME);
  } else {
    alert(message); // Fallback
  }
}

// ═════════════════════════════════════════════════════════════════
// SwR-F04: FUNCIONES DE FORMATO
// ISO/IEC 25010:2011: Usability - Presentación clara de información
// ═════════════════════════════════════════════════════════════════

/**
 * Formatea temperatura con unidad
 * @param {number} temp - Temperatura en °C
 * @returns {string} Temperatura formateada
 */
function formatTemperatura(temp) {
  if (temp === undefined || temp === null) {
    return 'N/A';
  }
  return `${temp.toFixed(1)} °C`;
}

/**
 * Formatea humedad con unidad
 * @param {number} humedad - Humedad en %
 * @returns {string} Humedad formateada
 */
function formatHumedad(humedad) {
  if (humedad === undefined || humedad === null) {
    return 'N/A';
  }
  return `${humedad} %`;
}

/**
 * Formatea calidad del aire con índice y descripción
 * @param {number} indice - Índice de calidad (0-100)
 * @returns {string} Calidad formateada
 */
function formatCalidadAire(indice) {
  if (indice === undefined || indice === null) {
    return 'N/A';
  }
  
  let categoria = '';
  if (indice <= 25) categoria = 'Excelente';
  else if (indice <= 50) categoria = 'Buena';
  else if (indice <= 75) categoria = 'Moderada';
  else categoria = 'Mala';
  
  return `${indice} (${categoria})`;
}

/**
 * Formatea nivel de ruido con unidad
 * @param {number} ruido - Ruido en dB
 * @returns {string} Ruido formateado
 */
function formatRuido(ruido) {
  if (ruido === undefined || ruido === null) {
    return 'N/A';
  }
  return `${ruido} dB`;
}

/**
 * Formatea timestamp a formato legible
 * @param {string} timestamp - ISO 8601 timestamp
 * @returns {string} Fecha formateada
 */
function formatTimestamp(timestamp) {
  if (!timestamp) {
    return 'N/A';
  }
  
  try {
    const date = new Date(timestamp);
    return date.toLocaleString('es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  } catch (error) {
    return timestamp;
  }
}