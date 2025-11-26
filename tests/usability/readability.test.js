/**
 * Pruebas de Legibilidad (Frontend)
 * 
 * Base Normativa:
 * - ISO/IEC 25010:2011 Sección 8.4.5 (Usabilidad - Estética de la interfaz de usuario)
 * 
 * Trazabilidad:
 * - SwR-U01: Usabilidad y accesibilidad
 * 
 * Objetivo: Verificar tamaño de fuente, espaciado y legibilidad
 */

const { test, expect } = require('@playwright/test');

/**
 * Test USAB-READ-001: Tamaño de fuente mínimo
 * ISO/IEC 25010:2011 8.4.5
 */
test.describe('Legibilidad', () => {
  test('USAB-READ-001: El tamaño de fuente es legible (mínimo 12px)', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const bodyFontSize = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      const fontSize = computed.getPropertyValue('font-size');
      return parseFloat(fontSize);
    });
    
    // Verificar que el tamaño de fuente es al menos 12px (0.75rem típicamente)
    expect(bodyFontSize).toBeGreaterThanOrEqual(12);
  });

  test('USAB-READ-002: Espaciado entre líneas es adecuado', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const lineHeight = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      const lineHeightValue = computed.getPropertyValue('line-height');
      return parseFloat(lineHeightValue);
    });
    
    const fontSize = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return parseFloat(computed.getPropertyValue('font-size'));
    });
    
    // El line-height debe ser al menos 1.2 veces el font-size para legibilidad
    const ratio = lineHeight / fontSize;
    expect(ratio).toBeGreaterThanOrEqual(1.2);
  });

  test('USAB-READ-003: Longitud de línea es óptima (50-75 caracteres)', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Verificar que los contenedores de texto tienen ancho máximo razonable
    const textContainers = page.locator('p, div, article, section');
    const containerCount = await textContainers.count();
    
    if (containerCount > 0) {
      const firstContainer = textContainers.first();
      const containerBox = await firstContainer.boundingBox();
      
      if (containerBox) {
        // Asumiendo fuente de 16px, 75 caracteres ≈ 600px
        // Verificar que el ancho no es excesivo
        expect(containerBox.width).toBeLessThanOrEqual(800);
      }
    }
  });

  test('USAB-READ-004: Las fuentes son legibles', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const fontFamily = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return computed.getPropertyValue('font-family');
    });
    
    // Verificar que se usa una fuente legible (no solo fuentes decorativas)
    const legibleFonts = ['Arial', 'Helvetica', 'Verdana', 'Georgia', 'Times', 'sans-serif', 'serif'];
    const hasLegibleFont = legibleFonts.some(font => fontFamily.includes(font));
    
    expect(hasLegibleFont || fontFamily.includes('sans-serif') || fontFamily.includes('serif')).toBeTruthy();
  });
});

