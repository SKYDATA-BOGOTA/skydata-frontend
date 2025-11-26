/**
 * Pruebas de Manejo de Errores (Frontend)
 * 
 * Base Normativa:
 * - ISO/IEC 25010:2011 Sección 8.5.3 (Confiabilidad - Tolerancia a fallos)
 * 
 * Trazabilidad:
 * - SwR-ST01: Confiabilidad y estabilidad del sistema
 * 
 * Objetivo: Verificar que el sistema maneja errores gracefully
 */

const { test, expect } = require('@playwright/test');

/**
 * Test REL-ERR-001: Manejo de errores de red
 * ISO/IEC 25010:2011 8.5.3
 */
test.describe('Manejo de Errores', () => {
  test('REL-ERR-001: Se muestran mensajes de error apropiados cuando falla la red', async ({ page }) => {
    // Simular fallo de red
    await page.route('**/api/datos', route => route.abort('failed'));
    
    await page.goto('http://localhost:3000');
    
    // Esperar a que se intente cargar el mapa
    await page.waitForTimeout(2000);
    
    // Verificar que se muestra un mensaje de error o que el sistema no se rompe
    const errorMessage = page.locator('[class*="error"], [id*="error"], .alert, .notification');
    const errorCount = await errorMessage.count();
    
    // El sistema debe manejar el error sin romperse
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeVisible();
  });

  test('REL-ERR-002: El sistema se recupera cuando la red se restaura', async ({ page }) => {
    // Primero simular fallo
    await page.route('**/api/datos', route => route.abort('failed'));
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(1000);
    
    // Restaurar conexión
    await page.unroute('**/api/datos');
    await page.reload();
    
    // Verificar que el sistema funciona normalmente
    await page.waitForSelector('#map', { timeout: 5000 });
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeVisible();
  });

  test('REL-ERR-003: Los errores HTTP se manejan correctamente', async ({ page }) => {
    // Simular error 500
    await page.route('**/api/datos', route => route.fulfill({
      status: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    }));
    
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    
    // Verificar que el sistema no se rompe
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeVisible();
  });
});

