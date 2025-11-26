/**
 * Pruebas de Responsive Design (Frontend)
 * 
 * Base Normativa:
 * - ISO/IEC 25010:2011 Sección 8.4.3 (Usabilidad - Apropiabilidad de uso)
 * 
 * Trazabilidad:
 * - SwR-U01: Usabilidad y accesibilidad
 * 
 * Objetivo: Verificar que el mapa se adapta correctamente a diferentes viewports
 */

const { test, expect } = require('@playwright/test');

/**
 * Test USAB-RESP-001: Responsive Design - Móvil
 * ISO/IEC 25010:2011 8.4.3
 */
test.describe('Responsive Design', () => {
  test('USAB-RESP-001: El mapa se adapta correctamente en móvil (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeVisible();
    
    // Verificar que el mapa tiene dimensiones apropiadas
    const mapBox = await mapContainer.boundingBox();
    expect(mapBox.width).toBeGreaterThan(0);
    expect(mapBox.height).toBeGreaterThan(0);
  });

  test('USAB-RESP-002: El panel de información es responsive en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    // Esperar a que se cargue el mapa
    await page.waitForSelector('#map', { timeout: 5000 });
    
    // Hacer clic en un marcador si existe
    const markers = page.locator('.leaflet-marker-icon');
    const markerCount = await markers.count();
    
    if (markerCount > 0) {
      await markers.first().click();
      
      const infoPanel = page.locator('#info-panel');
      await expect(infoPanel).toBeVisible();
      
      // Verificar que el panel es visible y no se sale de la pantalla
      const panelBox = await infoPanel.boundingBox();
      expect(panelBox.width).toBeLessThanOrEqual(375);
    }
  });

  test('USAB-RESP-003: Los marcadores son clickeables en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    await page.waitForSelector('.leaflet-marker-icon', { timeout: 5000 });
    
    const markers = page.locator('.leaflet-marker-icon');
    const markerCount = await markers.count();
    
    expect(markerCount).toBeGreaterThan(0);
    
    // Verificar que los marcadores son clickeables
    const firstMarker = markers.first();
    const markerBox = await firstMarker.boundingBox();
    
    // Verificar que el marcador tiene tamaño suficiente para ser clickeable
    expect(markerBox.width).toBeGreaterThan(0);
    expect(markerBox.height).toBeGreaterThan(0);
  });

  test('USAB-RESP-004: El mapa se adapta correctamente en tablet (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000');
    
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeVisible();
    
    const mapBox = await mapContainer.boundingBox();
    expect(mapBox.width).toBeGreaterThan(0);
    expect(mapBox.height).toBeGreaterThan(0);
  });

  test('USAB-RESP-005: El mapa se adapta correctamente en desktop (1920x1080)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeVisible();
    
    const mapBox = await mapContainer.boundingBox();
    expect(mapBox.width).toBeGreaterThan(0);
    expect(mapBox.height).toBeGreaterThan(0);
  });
});

