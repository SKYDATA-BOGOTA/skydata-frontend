// SwR-F01, SwR-F07: Inicialización de la Aplicación
// CU-01: Consultar Información Ambiental

import { mapController } from './controllers/map.controller.js';
import { dataService } from './services/data.service.js';
import { showError, showLoading, hideLoading } from './controllers/info.controller.js';

/**
 * Inicialización de la Aplicación SKYDATA
 * 
 * Trazabilidad:
 * - CU-01: Consultar Información Ambiental
 * - SwR-F01: Renderizado de Mapa Base
 * - SwR-F07: Solicitud de Datos al Backend
 * - ISO/IEC 12207:2017
 */
async function initApp() {
  try {
    console.info('SKYDATA Frontend - Iniciando...');
    
    // Paso 1: Inicializar mapa
    mapController.initializeMap();
    
    // Paso 2: Cargar datos del backend
    showLoading('Cargando estaciones...');
    const datos = await dataService.fetchDatosAmbientales();
    
    // Paso 3: Renderizar marcadores
    mapController.renderMarkers(datos);
    
    hideLoading();
    console.info('✓ Aplicación inicializada');
  } catch (error) {
    console.error('Error:', error);
    hideLoading();
    showError('Error al cargar. Verifique que el backend esté ejecutándose.');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}