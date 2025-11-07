// SwR-F07: Solicitud de Datos al Backend
// SwR-I02: Cliente HTTP en Frontend
// ISO/IEC 12207:2017: Sec 6.4.6.4 - Implementation

import { CONFIG } from '../config/config.js';

/**
 * Data Service
 * 
 * Trazabilidad:
 * - SwR-F07: Solicitud de Datos al Backend
 * - SwR-I02: Cliente HTTP en Frontend
 * - SyR-F05: Acceso a Información
 * - CU-01, CU-03: Acceder a datos
 * - ADR-01: Arquitectura de Dos Capas
 * 
 * Responsabilidades:
 * - Realizar peticiones HTTP al backend
 * - Procesar respuestas JSON
 * - Manejar errores de red
 */
class DataService {
  /**
   * SwR-F07: Solicita datos ambientales del backend
   * @returns {Promise<Object>} GeoJSON con datos ambientales
   * @throws {Error} Si hay error en la comunicación
   */
  async fetchDatosAmbientales() {
    try {
      const url = `${CONFIG.API_BASE_URL}${CONFIG.API_DATOS_ENDPOINT}`;
      console.info(`Solicitando datos: ${url}`);

      // SwR-I02: Cliente HTTP usando Fetch API
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // SwR-I04: CORS habilitado en backend
        mode: 'cors'
      });

      // ISO 5055:2021 - Reliability: Validar respuesta
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // SwR-F06: Procesar respuesta GeoJSON
      const data = await response.json();

      // Validación básica de estructura
      if (!data || data.type !== 'FeatureCollection') {
        throw new Error('Respuesta no es un GeoJSON válido');
      }

      console.info(`✓ Datos recibidos: ${data.features.length} estaciones`);
      return data;
    } catch (error) {
      // SwR-R01: Manejo de Errores
      console.error('Error al obtener datos del backend:', error);
      
      // SyR-U01: Mensajes claros para el usuario
      if (error.message.includes('Failed to fetch')) {
        throw new Error('No se pudo conectar con el servidor. Verifique que el backend esté en ejecución.');
      }
      
      throw error;
    }
  }

  /**
   * Verifica el estado del servidor backend
   * @returns {Promise<Object>} Estado del servidor
   */
  async checkHealth() {
    try {
      const url = `${CONFIG.API_BASE_URL}/health`;
      const response = await fetch(url);
      
      if (!response.ok) {
        return { status: 'ERROR', available: false };
      }

      const health = await response.json();
      return { ...health, available: true };
    } catch (error) {
      return { status: 'ERROR', available: false, message: error.message };
    }
  }
}

// Exportar instancia singleton
export const dataService = new DataService();