// SKYDATA Frontend - Configuración
// Trazabilidad:
// - CU-04: Configurar Parámetros del Sistema
// - SwR-DC01: Tecnologías Web Estándar

export const CONFIG = {
    // API Backend
    API_BASE_URL: 'http://localhost:3000',
    API_DATOS_ENDPOINT: '/api/datos',
    
    // Mapa
    MAP_CENTER: [4.6097, -74.0817], // Bogotá, Colombia
    MAP_ZOOM: 11,
    MAP_TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    MAP_ATTRIBUTION: '© OpenStreetMap contributors',
    
    // UI
    UPDATE_INTERVAL: 30000, // 30 segundos
    ERROR_DISPLAY_TIME: 5000 // 5 segundos
};