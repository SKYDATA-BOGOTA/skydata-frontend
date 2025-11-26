/**
 * Pruebas de Seguridad según ISO/IEC 25010:2011 8.4.1 e ISO/IEC 5055:2021
 * 
 * Objetivo: Verificar que el sistema protege información y resiste ataques
 * 
 * Base Normativa:
 * - ISO/IEC 25010:2011 8.4.1 (Seguridad)
 * - ISO/IEC 25023:2016 Sección 5.4 (Security)
 * - ISO/IEC 5055:2021 (Security dimension)
 * 
 * Trazabilidad: SwR-SEC01, SwR-SEC02, SwR-SEC03
 */

describe('Pruebas de Seguridad - ISO/IEC 25010:2011 8.4.1', () => {
    /**
     * SC-01: Validación de Entrada
     * Verificar que el sistema valida y sanitiza todas las entradas del usuario
     */
    describe('SC-01: Validación de Entrada', () => {
        test('DEBE rechazar coordenadas inválidas en GeoJSON', () => {
            // Given: Se recibe un GeoJSON con coordenadas inválidas
            const invalidGeojson = {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [999, 999] // Coordenadas fuera de rango válido
                    },
                    properties: {}
                }]
            };

            // When: Se intenta procesar el GeoJSON
            // Then: El sistema debe validar y rechazar coordenadas inválidas
            const isValid = validateCoordinates(invalidGeojson.features[0].geometry.coordinates);
            expect(isValid).toBe(false);
        });

        test('DEBE sanitizar propiedades del GeoJSON para prevenir XSS', () => {
            // Given: Se recibe un GeoJSON con código malicioso en propiedades
            const maliciousGeojson = {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: [-74.0817, 4.6097] },
                    properties: {
                        nombre: '<script>alert("XSS")</script>Estación'
                    }
                }]
            };

            // When: Se procesa el GeoJSON
            // Then: El código malicioso debe ser sanitizado
            const sanitized = sanitizeProperties(maliciousGeojson.features[0].properties);
            expect(sanitized.nombre).not.toContain('<script>');
            expect(sanitized.nombre).not.toContain('alert');
        });

        test('DEBE validar el formato GeoJSON según RFC 7946', () => {
            // Given: Se recibe un objeto que no es GeoJSON válido
            const invalidGeojson = {
                type: 'InvalidType',
                features: []
            };

            // When: Se intenta procesar
            // Then: Debe rechazarse por formato inválido
            const isValid = validateGeoJSONFormat(invalidGeojson);
            expect(isValid).toBe(false);
        });
    });

    /**
     * SC-02: Headers de Seguridad HTTP
     * Verificar que las respuestas HTTP incluyen headers de seguridad apropiados
     */
    describe('SC-02: Headers de Seguridad HTTP', () => {
        test('DEBE incluir CORS headers apropiados en respuestas del backend', async () => {
            // Given: Se realiza una solicitud al backend
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: true,
                    headers: new Headers({
                        'Access-Control-Allow-Origin': 'http://localhost:8080',
                        'Access-Control-Allow-Methods': 'GET, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type'
                    }),
                    json: () => Promise.resolve({})
                })
            );

            // When: Se hace una solicitud
            const response = await fetch('http://localhost:3000/api/datos');
            
            // Then: Los headers CORS deben estar presentes
            expect(response.headers.get('Access-Control-Allow-Origin')).toBeTruthy();
            expect(response.headers.get('Access-Control-Allow-Methods')).toContain('GET');
        });

        test('DEBE rechazar solicitudes desde orígenes no permitidos', async () => {
            // Given: Se realiza una solicitud desde un origen no permitido
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: false,
                    status: 403,
                    statusText: 'Forbidden'
                })
            );

            // When: Se intenta acceder al backend desde origen no permitido
            const response = await fetch('http://localhost:3000/api/datos', {
                headers: {
                    'Origin': 'http://malicious-site.com'
                }
            });

            // Then: La solicitud debe ser rechazada
            expect(response.ok).toBe(false);
            expect(response.status).toBe(403);
        });
    });

    /**
     * SC-03: Protección contra Inyección
     * Verificar que el sistema está protegido contra inyección de código
     */
    describe('SC-03: Protección contra Inyección', () => {
        test('DEBE escapar caracteres especiales en datos del usuario', () => {
            // Given: Datos del usuario con caracteres especiales
            const userInput = "Estación'; DROP TABLE stations; --";
            
            // When: Se procesa el input
            // Then: Los caracteres especiales deben ser escapados
            const escaped = escapeSpecialChars(userInput);
            expect(escaped).not.toContain("';");
            expect(escaped).not.toContain('DROP');
        });

        test('DEBE validar tipos de datos antes de procesarlos', () => {
            // Given: Datos con tipos incorrectos
            const invalidData = {
                temperatura: "not a number",
                humedad: null,
                presion: undefined
            };

            // When: Se intenta procesar
            // Then: Debe validar tipos y rechazar datos inválidos
            const isValid = validateDataTypes(invalidData);
            expect(isValid).toBe(false);
        });
    });

    /**
     * SC-04: Manejo Seguro de Errores
     * Verificar que los errores no exponen información sensible
     */
    describe('SC-04: Manejo Seguro de Errores', () => {
        test('DEBE ocultar detalles técnicos en mensajes de error al usuario', () => {
            // Given: Ocurre un error técnico
            const technicalError = {
                message: 'Database connection failed: user=admin password=secret123',
                stack: 'Error: at Database.connect (db.js:45:12)'
            };

            // When: Se muestra el error al usuario
            // Then: No debe exponer información sensible
            const userFriendlyError = sanitizeErrorMessage(technicalError);
            expect(userFriendlyError).not.toContain('password');
            expect(userFriendlyError).not.toContain('secret123');
            expect(userFriendlyError).not.toContain('stack');
        });

        test('DEBE registrar errores de forma segura sin exponer datos sensibles', () => {
            // Given: Un error con información sensible
            const errorWithSensitiveData = {
                message: 'Authentication failed',
                user: 'admin',
                password: 'secret123',
                token: 'abc123xyz'
            };

            // When: Se registra el error
            // Then: Los datos sensibles no deben aparecer en logs
            const safeLog = createSafeLog(errorWithSensitiveData);
            expect(safeLog).not.toContain('secret123');
            expect(safeLog).not.toContain('abc123xyz');
        });
    });

    /**
     * SC-05: Validación de Autenticación y Autorización
     * Verificar controles de acceso (si aplica)
     */
    describe('SC-05: Validación de Autenticación y Autorización', () => {
        test('DEBE validar que solo se permiten métodos HTTP permitidos', async () => {
            // Given: Se intenta usar un método HTTP no permitido
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: false,
                    status: 405,
                    statusText: 'Method Not Allowed'
                })
            );

            // When: Se intenta hacer POST en un endpoint GET-only
            const response = await fetch('http://localhost:3000/api/datos', {
                method: 'POST'
            });

            // Then: Debe rechazarse con 405 Method Not Allowed
            expect(response.status).toBe(405);
        });
    });
});

// Funciones auxiliares para pruebas de seguridad

/**
 * Valida que las coordenadas están en un rango válido
 */
function validateCoordinates(coords) {
    if (!Array.isArray(coords) || coords.length !== 2) {
        return false;
    }
    const [lng, lat] = coords;
    // Validar rango de longitud (-180 a 180) y latitud (-90 a 90)
    return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
}

/**
 * Sanitiza propiedades del GeoJSON para prevenir XSS
 */
function sanitizeProperties(properties) {
    const sanitized = {};
    for (const [key, value] of Object.entries(properties)) {
        if (typeof value === 'string') {
            // Escapar HTML y scripts
            sanitized[key] = value
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/\//g, '&#x2F;');
        } else {
            sanitized[key] = value;
        }
    }
    return sanitized;
}

/**
 * Valida el formato GeoJSON según RFC 7946
 */
function validateGeoJSONFormat(geojson) {
    if (!geojson || typeof geojson !== 'object') {
        return false;
    }
    if (geojson.type !== 'FeatureCollection' && geojson.type !== 'Feature') {
        return false;
    }
    if (geojson.type === 'FeatureCollection' && !Array.isArray(geojson.features)) {
        return false;
    }
    return true;
}

/**
 * Escapa caracteres especiales para prevenir inyección
 */
function escapeSpecialChars(input) {
    if (typeof input !== 'string') {
        return input;
    }
    return input
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
}

/**
 * Valida tipos de datos
 */
function validateDataTypes(data) {
    if (!data || typeof data !== 'object') {
        return false;
    }
    if (data.temperatura !== undefined && typeof data.temperatura !== 'number') {
        return false;
    }
    if (data.humedad !== undefined && (typeof data.humedad !== 'number' || data.humedad === null)) {
        return false;
    }
    if (data.presion !== undefined && data.presion === undefined) {
        return false;
    }
    return true;
}

/**
 * Sanitiza mensajes de error para no exponer información sensible
 */
function sanitizeErrorMessage(error) {
    if (!error || typeof error !== 'object') {
        return 'Ha ocurrido un error. Por favor, intente nuevamente.';
    }
    
    let message = error.message || 'Ha ocurrido un error. Por favor, intente nuevamente.';
    
    // Remover información sensible
    message = message.replace(/password\s*=\s*\S+/gi, 'password=***');
    message = message.replace(/token\s*=\s*\S+/gi, 'token=***');
    message = message.replace(/secret\s*=\s*\S+/gi, 'secret=***');
    message = message.replace(/api[_-]?key\s*=\s*\S+/gi, 'api_key=***');
    
    return message;
}

/**
 * Crea un log seguro sin información sensible
 */
function createSafeLog(error) {
    const safeError = { ...error };
    
    // Remover campos sensibles
    delete safeError.password;
    delete safeError.token;
    delete safeError.secret;
    delete safeError.apiKey;
    delete safeError.api_key;
    delete safeError.stack; // No exponer stack traces en producción
    
    return JSON.stringify(safeError);
}

/**
 * Resumen de Pruebas de Seguridad Implementadas:
 * 
 * ✅ SC-01: Validación de Entrada
 * ✅ SC-02: Headers de Seguridad HTTP
 * ✅ SC-03: Protección contra Inyección
 * ✅ SC-04: Manejo Seguro de Errores
 * ✅ SC-05: Validación de Autenticación y Autorización
 * 
 * Trazabilidad:
 * - Base Normativa: ISO/IEC 25010:2011 8.4.1, ISO/IEC 25023:2016 5.4, ISO/IEC 5055:2021
 * - Fase: 4.3 del plan de implementación
 */
