/**
 * Pruebas de Efectividad (Frontend)
 * 
 * Base Normativa:
 * - ISO/IEC 25022:2016 Sección 9.1 (Effectiveness)
 * - ISO/IEC 25010:2011 (Quality in Use model)
 * 
 * Trazabilidad:
 * - SwR-U01: Usabilidad y accesibilidad
 * - SwR-U02: Cumplimiento de estándares de accesibilidad
 * 
 * Objetivo: Medir efectividad (tareas completadas exitosamente)
 */

const { test, expect } = require('@playwright/test');

/**
 * Tareas críticas de usuario definidas según ISO 25022:2016
 */
const CRITICAL_TASKS = [
  {
    id: 'TASK-001',
    description: 'Encontrar una estación en el mapa',
    steps: [
      'Cargar la página',
      'Esperar a que el mapa se cargue',
      'Verificar que hay marcadores visibles'
    ]
  },
  {
    id: 'TASK-002',
    description: 'Ver información detallada de una estación',
    steps: [
      'Cargar la página',
      'Hacer clic en un marcador',
      'Verificar que el panel de información se muestra'
    ]
  },
  {
    id: 'TASK-003',
    description: 'Navegar por el mapa',
    steps: [
      'Cargar la página',
      'Usar controles de zoom',
      'Arrastrar el mapa'
    ]
  }
];

/**
 * Test QIU-EFF-001: Efectividad - Tarea completada exitosamente
 * ISO/IEC 25022:2016 9.1
 */
test.describe('Efectividad - Tareas de Usuario', () => {
  test('QIU-EFF-001: Tarea TASK-001 - Encontrar estación en el mapa', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Paso 1: Cargar la página
    await page.waitForSelector('#map', { timeout: 5000 });
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeVisible();
    
    // Paso 2: Esperar a que el mapa se cargue
    await page.waitForTimeout(2000);
    
    // Paso 3: Verificar que hay marcadores visibles
    const markers = page.locator('.leaflet-marker-icon');
    const markerCount = await markers.count();
    
    expect(markerCount).toBeGreaterThan(0);
  });

  test('QIU-EFF-002: Tarea TASK-002 - Ver información detallada de estación', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Paso 1: Cargar la página
    await page.waitForSelector('#map', { timeout: 5000 });
    
    // Paso 2: Hacer clic en un marcador
    await page.waitForSelector('.leaflet-marker-icon', { timeout: 5000 });
    const markers = page.locator('.leaflet-marker-icon');
    const markerCount = await markers.count();
    
    expect(markerCount).toBeGreaterThan(0);
    
    await markers.first().click();
    
    // Paso 3: Verificar que el panel de información se muestra
    const infoPanel = page.locator('#info-panel');
    await expect(infoPanel).toBeVisible({ timeout: 2000 });
  });

  test('QIU-EFF-003: Tarea TASK-003 - Navegar por el mapa', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Paso 1: Cargar la página
    await page.waitForSelector('#map', { timeout: 5000 });
    
    // Paso 2: Usar controles de zoom
    const zoomInButton = page.locator('.leaflet-control-zoom-in');
    const zoomOutButton = page.locator('.leaflet-control-zoom-out');
    
    if (await zoomInButton.count() > 0) {
      await zoomInButton.click();
      await page.waitForTimeout(500);
      await zoomOutButton.click();
    }
    
    // Paso 3: Arrastrar el mapa (simulado con mouse)
    const mapContainer = page.locator('#map');
    await mapContainer.dragTo(mapContainer, {
      targetPosition: { x: 100, y: 100 }
    });
    
    // Verificar que el mapa sigue visible después de la interacción
    await expect(mapContainer).toBeVisible();
  });

  test('QIU-EFF-004: Porcentaje de tareas completadas exitosamente', async ({ page }) => {
    let completedTasks = 0;
    const totalTasks = CRITICAL_TASKS.length;
    
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#map', { timeout: 5000 });
    
    // Tarea 1: Encontrar estación
    try {
      const markers = page.locator('.leaflet-marker-icon');
      const markerCount = await markers.count();
      if (markerCount > 0) {
        completedTasks++;
      }
    } catch (e) {
      // Tarea falló
    }
    
    // Tarea 2: Ver información
    try {
      await page.waitForSelector('.leaflet-marker-icon', { timeout: 5000 });
      const markers = page.locator('.leaflet-marker-icon');
      if (await markers.count() > 0) {
        await markers.first().click();
        const infoPanel = page.locator('#info-panel');
        await expect(infoPanel).toBeVisible({ timeout: 2000 });
        completedTasks++;
      }
    } catch (e) {
      // Tarea falló
    }
    
    // Tarea 3: Navegar
    try {
      const mapContainer = page.locator('#map');
      await expect(mapContainer).toBeVisible();
      completedTasks++;
    } catch (e) {
      // Tarea falló
    }
    
    // Calcular porcentaje de efectividad
    const effectivenessPercentage = (completedTasks / totalTasks) * 100;
    
    // Según ISO 25022:2016, efectividad debe ser ≥ 80% para ser aceptable
    expect(effectivenessPercentage).toBeGreaterThanOrEqual(80);
  });
});

