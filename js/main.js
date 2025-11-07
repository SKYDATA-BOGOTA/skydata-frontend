// SwR-F01, SwR-F07: Inicialización de la Aplicación
// CU-01: Consultar Información Ambiental
// ISO/IEC 12207:2017: Sec 6.4.6.4 - Implementation

import { mapController } from './controllers/map.controller.js';
import { dataService } from './services/data.service.js';
import { showError, showLoading, hideLoading } from './controllers/info.controller.js';

/**
 * Inicialización de la Aplicación SKYDATA Frontend
 * 
 * Trazabilidad:
 * - CU-01: Consultar Información Ambiental
 * - SwR-F01: Renderizado de Mapa Base
 * - SwR-F07: Solicitud de Datos al Backend
 * - SwR-U02: Retroalimentación Visual
 */

/**
 * Inicializa la aplicación
 */
async function initApp() {
  try {
    console.info('═════════════════════════════════════════════════');
    console.info('  SKYDATA Bogotá - Sistema de Monitoreo Ambiental');
    console.info('═════════════════════════════════════════════════');
    console.info('Cumplimiento normativo:');
    console.info('  • ISO/IEC/IEEE 29148:2018 - Requirements Engineering');
    console.info('  • ISO/IEC 12207:2017 - Software Life Cycle');
    console.info('  • ISO/IEC 25010:2011 - Usability');
    console.info('═════════════════════════════════════════════════');

    // Paso 1: SwR-F01 - Inicializar mapa
    console.info('Paso 1: Inicializando mapa...');
    mapController.initializeMap();
    console.info('✓ Mapa inicializado');

    // Paso 2: SwR-F07 - Cargar datos del backend
    // SwR-U02: Mostrar feedback visual
    console.info('Paso 2: Cargando datos ambientales...');
    showLoading('Cargando estaciones de monitoreo...');

    const datos = await dataService.fetchDatosAmbientales();
    console.info(`✓ Datos cargados: ${datos.features.length} estaciones`);

    // Paso 3: SwR-F02 - Renderizar marcadores
    console.info('Paso 3: Renderizando marcadores...');
    mapController.renderMarkers(datos);
    console.info('✓ Marcadores renderizados');

    hideLoading();
    console.info('═════════════════════════════════════════════════');
    console.info('✓ Aplicación inicializada correctamente');
    console.info('═════════════════════════════════════════════════');
  } catch (error) {
    // SwR-R01: Manejo de Errores
    console.error('Error al inicializar aplicación:', error);
    hideLoading();
    showError('Error al cargar la aplicación. Por favor, verifique que el servidor backend esté en ejecución.');
  }
}

// Inicializar cuando el DOM esté listo
// SwR-I01: Interfaz Web
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}