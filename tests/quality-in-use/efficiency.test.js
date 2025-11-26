/**
 * Pruebas de Eficiencia del Usuario (Frontend)
 * 
 * Base Normativa:
 * - ISO/IEC 25022:2016 Sección 9.2 (Efficiency)
 * - ISO/IEC 25010:2011 (Quality in Use model)
 * 
 * Trazabilidad:
 * - SwR-U01: Usabilidad y accesibilidad
 * 
 * Objetivo: Medir eficiencia (tiempo para completar tareas)
 */

const { test, expect } = require('@playwright/test');

/**
 * Tiempos objetivo para tareas críticas (en milisegundos)
 */
const TARGET_TIMES = {
  'TASK-001': 3000,  // Encontrar estación: 3 segundos
  'TASK-002': 5000,  // Ver información: 5 segundos
  'TASK-003': 2000   // Navegar mapa: 2 segundos
};

/**
 * Test QIU-EFFI-001: Eficiencia - Tiempo para completar tarea
 * ISO/IEC 25022:2016 9.2
 */
test.describe('Eficiencia del Usuario', () => {
  test('QIU-EFFI-001: Tiempo para encontrar estación en el mapa', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#map', { timeout: 5000 });
    
    const markers = page.locator('.leaflet-marker-icon');
    await markers.first().waitFor({ timeout: 5000 });
    
    const endTime = Date.now();
    const taskTime = endTime - startTime;
    
    // Verificar que el tiempo está dentro del objetivo
    expect(taskTime).toBeLessThanOrEqual(TARGET_TIMES['TASK-001']);
  });

  test('QIU-EFFI-002: Tiempo para ver información detallada', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#map', { timeout: 5000 });
    
    const startTime = Date.now();
    
    await page.waitForSelector('.leaflet-marker-icon', { timeout: 5000 });
    const markers = page.locator('.leaflet-marker-icon');
    await markers.first().click();
    
    const infoPanel = page.locator('#info-panel');
    await expect(infoPanel).toBeVisible({ timeout: 2000 });
    
    const endTime = Date.now();
    const taskTime = endTime - startTime;
    
    // Verificar que el tiempo está dentro del objetivo
    expect(taskTime).toBeLessThanOrEqual(TARGET_TIMES['TASK-002']);
  });

  test('QIU-EFFI-003: Tiempo para navegar por el mapa', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#map', { timeout: 5000 });
    
    const startTime = Date.now();
    
    const zoomInButton = page.locator('.leaflet-control-zoom-in');
    if (await zoomInButton.count() > 0) {
      await zoomInButton.click();
    }
    
    const endTime = Date.now();
    const taskTime = endTime - startTime;
    
    // Verificar que el tiempo está dentro del objetivo
    expect(taskTime).toBeLessThanOrEqual(TARGET_TIMES['TASK-003']);
  });

  test('QIU-EFFI-004: Comparación con tiempos objetivo', async ({ page }) => {
    const taskTimes = {};
    
    // Tarea 1
    const start1 = Date.now();
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#map', { timeout: 5000 });
    await page.waitForSelector('.leaflet-marker-icon', { timeout: 5000 });
    taskTimes['TASK-001'] = Date.now() - start1;
    
    // Tarea 2
    const start2 = Date.now();
    const markers = page.locator('.leaflet-marker-icon');
    await markers.first().click();
    const infoPanel = page.locator('#info-panel');
    await expect(infoPanel).toBeVisible({ timeout: 2000 });
    taskTimes['TASK-002'] = Date.now() - start2;
    
    // Verificar que los tiempos están dentro de los objetivos
    Object.keys(TARGET_TIMES).forEach(taskId => {
      if (taskTimes[taskId] !== undefined) {
        expect(taskTimes[taskId]).toBeLessThanOrEqual(TARGET_TIMES[taskId] * 1.5); // 50% de tolerancia
      }
    });
  });
});

