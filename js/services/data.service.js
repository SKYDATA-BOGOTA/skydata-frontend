// SwR-F07: Solicitud de Datos al Backend
import { CONFIG } from '../config/config.js';

class DataService {
  async fetchDatosAmbientales() {
    try {
      const url = `${CONFIG.API_BASE_URL}${CONFIG.API_DATOS_ENDPOINT}`;
      const response = await fetch(url, { method: 'GET', mode: 'cors' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      if (!data || data.type !== 'FeatureCollection') {
        throw new Error('GeoJSON inválido recibido del servidor');
      }
      return data;
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('No se pudo conectar con el servidor');
      }
      throw error;
    }
  }
}

export const dataService = new DataService();