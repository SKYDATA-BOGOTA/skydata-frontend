/**
 * Validación GeoJSON RFC 7946 (Frontend)
 * 
 * Base Normativa:
 * - RFC 7946 (GeoJSON standard)
 * - ISO/IEC 25010:2011 Sección 8.5.1 (Compatibilidad)
 * 
 * Trazabilidad:
 * - SwR-I02: Compatibilidad con estándares web (GeoJSON RFC 7946)
 * 
 * Objetivo: Verificar que el formato GeoJSON recibido del backend cumple con RFC 7946
 */

const { test, expect } = require('@playwright/test');

/**
 * Validador básico de GeoJSON según RFC 7946
 */
function validateGeoJSON(geojson) {
  const errors = [];
  
  // Verificar que es un objeto
  if (typeof geojson !== 'object' || geojson === null) {
    errors.push('GeoJSON debe ser un objeto');
    return errors;
  }
  
  // Verificar tipo
  if (!geojson.type) {
    errors.push('GeoJSON debe tener propiedad "type"');
  } else if (geojson.type !== 'FeatureCollection' && 
             geojson.type !== 'Feature' && 
             geojson.type !== 'Point' && 
             geojson.type !== 'LineString' && 
             geojson.type !== 'Polygon' && 
             geojson.type !== 'MultiPoint' && 
             geojson.type !== 'MultiLineString' && 
             geojson.type !== 'MultiPolygon' && 
             geojson.type !== 'GeometryCollection') {
    errors.push(`Tipo GeoJSON inválido: ${geojson.type}`);
  }
  
  // Si es FeatureCollection, verificar features
  if (geojson.type === 'FeatureCollection') {
    if (!Array.isArray(geojson.features)) {
      errors.push('FeatureCollection debe tener propiedad "features" como array');
    } else {
      geojson.features.forEach((feature, index) => {
        if (!feature.type || feature.type !== 'Feature') {
          errors.push(`Feature ${index} debe tener type="Feature"`);
        }
        if (!feature.geometry) {
          errors.push(`Feature ${index} debe tener propiedad "geometry"`);
        } else {
          // Validar geometría
          const geomErrors = validateGeometry(feature.geometry, index);
          errors.push(...geomErrors);
        }
      });
    }
  }
  
  return errors;
}

/**
 * Validador de geometría según RFC 7946
 */
function validateGeometry(geometry, featureIndex = 0) {
  const errors = [];
  
  if (!geometry.type) {
    errors.push(`Geometría en feature ${featureIndex} debe tener propiedad "type"`);
  }
  
  if (!geometry.coordinates) {
    errors.push(`Geometría en feature ${featureIndex} debe tener propiedad "coordinates"`);
  } else if (geometry.type === 'Point') {
    // Point: [longitude, latitude]
    if (!Array.isArray(geometry.coordinates) || geometry.coordinates.length !== 2) {
      errors.push(`Point en feature ${featureIndex} debe tener coordinates como [longitude, latitude]`);
    } else {
      const [lon, lat] = geometry.coordinates;
      if (typeof lon !== 'number' || typeof lat !== 'number') {
        errors.push(`Point en feature ${featureIndex}: coordinates deben ser números`);
      }
      if (lon < -180 || lon > 180) {
        errors.push(`Point en feature ${featureIndex}: longitud debe estar entre -180 y 180`);
      }
      if (lat < -90 || lat > 90) {
        errors.push(`Point en feature ${featureIndex}: latitud debe estar entre -90 y 90`);
      }
    }
  }
  
  return errors;
}

/**
 * Test COMP-GEO-001: Validación de estructura FeatureCollection
 * RFC 7946, ISO/IEC 25010:2011 8.5.1
 */
test('COMP-GEO-001: El backend retorna FeatureCollection válido según RFC 7946', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Interceptar respuesta del backend
  const responsePromise = page.waitForResponse(response => 
    response.url().includes('/api/datos') && response.status() === 200
  );
  
  // Esperar a que se cargue el mapa (dispara la petición)
  await page.waitForSelector('#map', { timeout: 5000 });
  
  const response = await responsePromise;
  const geojson = await response.json();
  
  // Validar estructura GeoJSON
  const errors = validateGeoJSON(geojson);
  expect(errors).toHaveLength(0);
  
  // Verificar que es FeatureCollection
  expect(geojson.type).toBe('FeatureCollection');
  expect(Array.isArray(geojson.features)).toBe(true);
});

/**
 * Test COMP-GEO-002: Validación de coordenadas válidas
 * RFC 7946, ISO/IEC 25010:2011 8.5.1
 */
test('COMP-GEO-002: Las coordenadas están en rango válido según RFC 7946', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const responsePromise = page.waitForResponse(response => 
    response.url().includes('/api/datos') && response.status() === 200
  );
  
  await page.waitForSelector('#map', { timeout: 5000 });
  
  const response = await responsePromise;
  const geojson = await response.json();
  
  // Verificar cada feature
  if (geojson.type === 'FeatureCollection' && Array.isArray(geojson.features)) {
    geojson.features.forEach((feature, index) => {
      if (feature.geometry && feature.geometry.type === 'Point') {
        const [lon, lat] = feature.geometry.coordinates;
        expect(lon).toBeGreaterThanOrEqual(-180);
        expect(lon).toBeLessThanOrEqual(180);
        expect(lat).toBeGreaterThanOrEqual(-90);
        expect(lat).toBeLessThanOrEqual(90);
      }
    });
  }
});

/**
 * Test COMP-GEO-003: Validación de tipos de geometría válidos
 * RFC 7946, ISO/IEC 25010:2011 8.5.1
 */
test('COMP-GEO-003: Los tipos de geometría son válidos según RFC 7946', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const responsePromise = page.waitForResponse(response => 
    response.url().includes('/api/datos') && response.status() === 200
  );
  
  await page.waitForSelector('#map', { timeout: 5000 });
  
  const response = await responsePromise;
  const geojson = await response.json();
  
  const validTypes = ['Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon', 'GeometryCollection'];
  
  if (geojson.type === 'FeatureCollection' && Array.isArray(geojson.features)) {
    geojson.features.forEach((feature) => {
      if (feature.geometry && feature.geometry.type) {
        expect(validTypes).toContain(feature.geometry.type);
      }
    });
  }
});

