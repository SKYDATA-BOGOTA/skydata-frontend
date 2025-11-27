// SwR-F07: Solicitud de Datos al Backend
// SwR-I02: Cliente HTTP Frontend
// Trazabilidad: ISO/IEC/IEEE 29148:2018 8.4

/**
 * Servicio para obtener datos del backend
 * Implementa SwR-F07 y SwR-I02 según SRS v1.1.0.0
 */
class DataService {
    constructor() {
        this.apiBaseUrl = window.API_URL || 'http://localhost:3000/api';
    }

    // SwR-F07: Solicitud de Datos al Backend
    // SwR-I02: Cliente HTTP Frontend
    // Implementa requisitos funcionales SwR-F07 y SwR-I02 según ISO/IEC/IEEE 29148:2018
    async fetchDatosAmbientales() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/datos`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener datos:', error);
            throw error;
        }
    }
}

// Exportar instancia global
window.dataService = new DataService();
