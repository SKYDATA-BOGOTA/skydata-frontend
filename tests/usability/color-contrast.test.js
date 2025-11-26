/**
 * Pruebas de Contraste de Colores (Frontend)
 * 
 * Base Normativa:
 * - ISO/IEC 25010:2011 Sección 8.4.5 (Usabilidad - Estética de la interfaz de usuario)
 * - WCAG 2.1 1.4.3 (Contraste mínimo)
 * 
 * Trazabilidad:
 * - SwR-U01: Usabilidad y accesibilidad
 * - SwR-U02: Cumplimiento de estándares de accesibilidad
 * 
 * Objetivo: Verificar contraste de colores según WCAG 2.1
 */

const { test, expect } = require('@playwright/test');

/**
 * Calcula el ratio de contraste entre dos colores RGB
 * Según WCAG 2.1: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */
function calculateContrastRatio(rgb1, rgb2) {
  const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.b, rgb2.b);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Extrae color RGB de un elemento
 */
async function getElementColor(page, selector, property = 'color') {
  const color = await page.evaluate(({ sel, prop }) => {
    const element = document.querySelector(sel);
    if (!element) return null;
    const computed = window.getComputedStyle(element);
    const rgb = computed.getPropertyValue(prop);
    const match = rgb.match(/\d+/g);
    if (match && match.length >= 3) {
      return {
        r: parseInt(match[0]),
        g: parseInt(match[1]),
        b: parseInt(match[2])
      };
    }
    return null;
  }, { sel: selector, prop: property });
  
  return color;
}

/**
 * Test USAB-CONT-001: Contraste mínimo para texto normal
 * WCAG 2.1 1.4.3, ISO/IEC 25010:2011 8.4.5
 */
test.describe('Contraste de Colores', () => {
  test('USAB-CONT-001: El texto tiene contraste mínimo 4.5:1 para texto normal', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Obtener color del texto y fondo
    const textColor = await getElementColor(page, 'body', 'color');
    const bgColor = await getElementColor(page, 'body', 'background-color');
    
    if (textColor && bgColor) {
      const contrastRatio = calculateContrastRatio(textColor, bgColor);
      expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
    }
  });

  test('USAB-CONT-002: El texto grande tiene contraste mínimo 3:1', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Buscar elementos con texto grande (h1, h2, etc.)
    const headings = page.locator('h1, h2, h3');
    const headingCount = await headings.count();
    
    if (headingCount > 0) {
      const firstHeading = headings.first();
      const textColor = await getElementColor(page, 'h1, h2, h3', 'color');
      const bgColor = await getElementColor(page, 'h1, h2, h3', 'background-color');
      
      if (textColor && bgColor) {
        const contrastRatio = calculateContrastRatio(textColor, bgColor);
        // Para texto grande (18pt+ o 14pt+ bold), el mínimo es 3:1
        expect(contrastRatio).toBeGreaterThanOrEqual(3.0);
      }
    }
  });

  test('USAB-CONT-003: Los elementos interactivos tienen contraste adecuado', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const buttons = page.locator('button, a.button, [role="button"]');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      const textColor = await getElementColor(page, 'button, a.button, [role="button"]', 'color');
      const bgColor = await getElementColor(page, 'button, a.button, [role="button"]', 'background-color');
      
      if (textColor && bgColor) {
        const contrastRatio = calculateContrastRatio(textColor, bgColor);
        // Los elementos interactivos deben tener al menos 3:1
        expect(contrastRatio).toBeGreaterThanOrEqual(3.0);
      }
    }
  });
});

