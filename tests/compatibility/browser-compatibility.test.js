/**
 * Pruebas de Compatibilidad con Navegadores (Frontend)
 * 
 * Base Normativa:
 * - ISO/IEC 25010:2011 Sección 8.5.1 (Compatibilidad)
 * - ISO/IEC 25023:2016 Sección 5.5 (Compatibility Measurement)
 * 
 * Trazabilidad:
 * - SwR-I01: Compatibilidad con navegadores modernos
 * - SwR-I02: Compatibilidad con estándares web
 * - SwR-I03: Interoperabilidad Frontend-Backend
 * 
 * Objetivo: Verificar que el mapa se renderiza correctamente en diferentes navegadores
 */

const { test, expect } = require('@playwright/test');

/**
 * Test COMP-BR-001: Compatibilidad con Chrome
 * ISO/IEC 25010:2011 8.5.1, ISO/IEC 25023:2016 5.5
 */
test.describe('Compatibilidad con Navegadores - Chrome', () => {
  test('COMP-BR-001: El mapa se renderiza correctamente en Chrome', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Solo ejecutar en Chrome');
    
    await page.goto('http://localhost:3000');
    
    // Verificar que el mapa está presente
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeVisible();
    
    // Verificar que los marcadores se muestran
    const markers = page.locator('.leaflet-marker-icon');
    await expect(markers.first()).toBeVisible({ timeout: 5000 });
  });

  test('COMP-BR-002: Los marcadores son clickeables en Chrome', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Solo ejecutar en Chrome');
    
    await page.goto('http://localhost:3000');
    
    // Esperar a que los marcadores se carguen
    await page.waitForSelector('.leaflet-marker-icon', { timeout: 5000 });
    
    // Hacer clic en el primer marcador
    const firstMarker = page.locator('.leaflet-marker-icon').first();
    await firstMarker.click();
    
    // Verificar que el panel de información se muestra
    const infoPanel = page.locator('#info-panel');
    await expect(infoPanel).toBeVisible();
  });

  test('COMP-BR-003: Las interacciones del mapa funcionan en Chrome', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Solo ejecutar en Chrome');
    
    await page.goto('http://localhost:3000');
    
    // Verificar zoom in
    const zoomInButton = page.locator('.leaflet-control-zoom-in');
    await zoomInButton.click();
    
    // Verificar zoom out
    const zoomOutButton = page.locator('.leaflet-control-zoom-out');
    await zoomOutButton.click();
    
    // Verificar que el mapa responde a las interacciones
    await expect(page.locator('#map')).toBeVisible();
  });
});

/**
 * Test COMP-BR-004: Compatibilidad con Firefox
 * ISO/IEC 25010:2011 8.5.1, ISO/IEC 25023:2016 5.5
 */
test.describe('Compatibilidad con Navegadores - Firefox', () => {
  test('COMP-BR-004: El mapa se renderiza correctamente en Firefox', async ({ page, browserName }) => {
    test.skip(browserName !== 'firefox', 'Solo ejecutar en Firefox');
    
    await page.goto('http://localhost:3000');
    
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeVisible();
    
    const markers = page.locator('.leaflet-marker-icon');
    await expect(markers.first()).toBeVisible({ timeout: 5000 });
  });

  test('COMP-BR-005: Los marcadores son clickeables en Firefox', async ({ page, browserName }) => {
    test.skip(browserName !== 'firefox', 'Solo ejecutar en Firefox');
    
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.leaflet-marker-icon', { timeout: 5000 });
    
    const firstMarker = page.locator('.leaflet-marker-icon').first();
    await firstMarker.click();
    
    const infoPanel = page.locator('#info-panel');
    await expect(infoPanel).toBeVisible();
  });
});

/**
 * Test COMP-BR-006: Compatibilidad con Safari
 * ISO/IEC 25010:2011 8.5.1, ISO/IEC 25023:2016 5.5
 */
test.describe('Compatibilidad con Navegadores - Safari', () => {
  test('COMP-BR-006: El mapa se renderiza correctamente en Safari', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit', 'Solo ejecutar en Safari/WebKit');
    
    await page.goto('http://localhost:3000');
    
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeVisible();
    
    const markers = page.locator('.leaflet-marker-icon');
    await expect(markers.first()).toBeVisible({ timeout: 5000 });
  });
});

/**
 * Test COMP-BR-007: Compatibilidad con Edge
 * ISO/IEC 25010:2011 8.5.1, ISO/IEC 25023:2016 5.5
 */
test.describe('Compatibilidad con Navegadores - Edge', () => {
  test('COMP-BR-007: El mapa se renderiza correctamente en Edge', async ({ page, browserName }) => {
    // Edge usa Chromium, así que se ejecuta en chromium
    test.skip(browserName !== 'chromium', 'Solo ejecutar en Chromium (Edge compatible)');
    
    await page.goto('http://localhost:3000');
    
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeVisible();
    
    const markers = page.locator('.leaflet-marker-icon');
    await expect(markers.first()).toBeVisible({ timeout: 5000 });
  });
});

