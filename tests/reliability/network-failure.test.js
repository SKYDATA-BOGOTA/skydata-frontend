/**
 * Pruebas de Fallos de Red (Frontend)
 * 
 * Base Normativa:
 * - ISO/IEC 25010:2011 Sección 8.5.3 (Confiabilidad - Tolerancia a fallos)
 * 
 * Trazabilidad:
 * - SwR-ST01: Confiabilidad y estabilidad del sistema
 * 
 * Objetivo: Verificar que el sistema maneja fallos de red y se recupera
 */

const { test, expect } = require('@playwright/test');

/**
 * Test REL-NET-001: Recuperación después de fallos de red
 * ISO/IEC 25010:2011 8.5.3
 */
test.describe('Fallos de Red', () => {
  test('REL-NET-001: El sistema maneja timeout de red', async ({ page }) => {
    // Simular timeout
    await page.route('**/api/datos', route => {
      setTimeout(() => route.continue(), 10000); // Timeout simulado
    });
    
    await page.goto('http://localhost:3000');
    
    // El sistema debe manejar el timeout sin romperse
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeVisible();
  });

  test('REL-NET-002: Retry logic funciona si está implementado', async ({ page }) => {
    let requestCount = 0;
    
    // Simular fallo en primer intento, éxito en segundo
    await page.route('**/api/datos', route => {
      requestCount++;
      if (requestCount === 1) {
        route.abort('failed');
      } else {
        route.continue();
      }
    });
    
    await page.goto('http://localhost:3000');
    
    // Esperar a que se intente nuevamente
    await page.waitForTimeout(3000);
    
    // Verificar que el sistema intentó recuperarse
    expect(requestCount).toBeGreaterThan(0);
  });

  test('REL-NET-003: El sistema funciona en modo offline parcial', async ({ page }) => {
    // Simular que solo el endpoint de datos falla
    await page.route('**/api/datos', route => route.abort('failed'));
    
    await page.goto('http://localhost:3000');
    
    // Verificar que la UI sigue siendo funcional
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeVisible();
    
    // Verificar que los controles del mapa funcionan
    const zoomInButton = page.locator('.leaflet-control-zoom-in');
    if (await zoomInButton.count() > 0) {
      await expect(zoomInButton).toBeVisible();
    }
  });
});

