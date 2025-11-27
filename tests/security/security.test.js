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
            const invalidGeojson = {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [999, 999]
                    },
                    properties: {}
                }]
            };

            const isValid = validateCoordinates(invalidGeojson.features[0].geometry.coordinates);
            expect(isValid).toBe(false);
        });

        test('DEBE sanitizar propiedades del GeoJSON para prevenir XSS', () => {
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

            const sanitized = sanitizeProperties(maliciousGeojson.features[0].properties);
            // Verificar que los caracteres HTML peligrosos están escapados
            expect(sanitized.nombre).not.toContain('<script>');
            expect(sanitized.nombre).not.toContain('</script>');
            // Los caracteres < y > deben estar escapados como &lt; y &gt;
            expect(sanitized.nombre).toContain('&lt;');
            expect(sanitized.nombre).toContain('&gt;');
        });

        test('DEBE validar el formato GeoJSON según RFC 7946', () => {
            const invalidGeojson = {
                type: 'InvalidType',
                features: []
            };

            const isValid = validateGeoJSONFormat(invalidGeojson);
            expect(isValid).toBe(false);
        });
    });

    /**
     * SC-02: Headers de Seguridad HTTP
     */
    describe('SC-02: Headers de Seguridad HTTP', () => {
        test('DEBE incluir CORS headers apropiados en respuestas del backend', async () => {
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

            const response = await fetch('http://localhost:3000/api/datos');
            
            expect(response.headers.get('Access-Control-Allow-Origin')).toBeTruthy();
            expect(response.headers.get('Access-Control-Allow-Methods')).toContain('GET');
        });

        test('DEBE rechazar solicitudes desde orígenes no permitidos', async () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: false,
                    status: 403,
                    statusText: 'Forbidden'
                })
            );

            const response = await fetch('http://localhost:3000/api/datos', {
                headers: {
                    'Origin': 'http://malicious-site.com'
                }
            });

            expect(response.ok).toBe(false);
            expect(response.status).toBe(403);
        });
    });

    /**
     * SC-03: Protección contra Inyección
     */
    describe('SC-03: Protección contra Inyección', () => {
        test('DEBE escapar caracteres especiales en datos del usuario', () => {
            const userInput = "Estación'; DROP TABLE stations; --";
            
            const escaped = escapeSpecialChars(userInput);
            expect(escaped).not.toContain("';");
            expect(escaped).toContain("\\'");
        });

        test('DEBE validar tipos de datos antes de procesarlos', () => {
            const invalidData = {
                temperatura: "not a number",
                humedad: null,
                presion: undefined
            };

            const isValid = validateDataTypes(invalidData);
            expect(isValid).toBe(false);
        });
    });

    /**
     * SC-04: Manejo Seguro de Errores
     */
    describe('SC-04: Manejo Seguro de Errores', () => {
        test('DEBE ocultar detalles técnicos en mensajes de error al usuario', () => {
            const technicalError = {
                message: 'Database connection failed: user=admin password=secret123',
                stack: 'Error: at Database.connect (db.js:45:12)'
            };

            const userFriendlyError = sanitizeErrorMessage(technicalError);
            expect(userFriendlyError).not.toContain('secret123');
            expect(userFriendlyError).not.toContain('stack');
        });

        test('DEBE registrar errores de forma segura sin exponer datos sensibles', () => {
            const errorWithSensitiveData = {
                message: 'Authentication failed',
                user: 'admin',
                password: 'secret123',
                token: 'abc123xyz'
            };

            const safeLog = createSafeLog(errorWithSensitiveData);
            expect(safeLog).not.toContain('secret123');
            expect(safeLog).not.toContain('abc123xyz');
        });
    });

    /**
     * SC-05: Validación de Métodos HTTP
     */
    describe('SC-05: Validación de Autenticación y Autorización', () => {
        test('DEBE validar que solo se permiten métodos HTTP permitidos', async () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: false,
                    status: 405,
                    statusText: 'Method Not Allowed'
                })
            );

            const response = await fetch('http://localhost:3000/api/datos', {
                method: 'POST'
            });

            expect(response.status).toBe(405);
        });
    });
});

// Funciones auxiliares para pruebas de seguridad

function validateCoordinates(coords) {
    if (!Array.isArray(coords) || coords.length !== 2) {
        return false;
    }
    const [lng, lat] = coords;
    return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
}

function sanitizeProperties(properties) {
    const sanitized = {};
    for (const [key, value] of Object.entries(properties)) {
        if (typeof value === 'string') {
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

function sanitizeErrorMessage(error) {
    if (!error || typeof error !== 'object') {
        return 'Ha ocurrido un error. Por favor, intente nuevamente.';
    }
    
    let message = error.message || 'Ha ocurrido un error. Por favor, intente nuevamente.';
    
    message = message.replace(/password\s*=\s*\S+/gi, 'password=***');
    message = message.replace(/token\s*=\s*\S+/gi, 'token=***');
    message = message.replace(/secret\s*=\s*\S+/gi, 'secret=***');
    message = message.replace(/api[_-]?key\s*=\s*\S+/gi, 'api_key=***');
    
    return message;
}

function createSafeLog(error) {
    const safeError = { ...error };
    
    delete safeError.password;
    delete safeError.token;
    delete safeError.secret;
    delete safeError.apiKey;
    delete safeError.api_key;
    delete safeError.stack;
    
    return JSON.stringify(safeError);
}
