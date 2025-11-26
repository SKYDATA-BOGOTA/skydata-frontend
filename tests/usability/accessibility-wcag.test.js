/**
 * Pruebas de Accesibilidad WCAG 2.1 (Frontend)
 * 
 * Base Normativa:
 * - ISO/IEC 25010:2011 Sección 8.4.6 (Usabilidad - Accesibilidad)
 * - ISO/IEC 25023:2016 Sección 5.3 (Usability Measurement)
 * - WCAG 2.1 nivel AA (Web Content Accessibility Guidelines)
 * 
 * Trazabilidad:
 * - SwR-U01: Usabilidad y accesibilidad
 * - SwR-U02: Cumplimiento de estándares de accesibilidad
 * 
 * Objetivo: Verificar nivel AA de WCAG 2.1 usando axe-core con Playwright
 */

const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

/**
 * Test USAB-ACC-001: Verificación de accesibilidad WCAG 2.1 nivel AA
 * ISO/IEC 25010:2011 8.4.6, WCAG 2.1 nivel AA
 */
test.describe('Accesibilidad WCAG 2.1', () => {
  test('USAB-ACC-001: La página cumple con WCAG 2.1 nivel AA', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toHaveLength(0);
  });

  test('USAB-ACC-002: Estructura semántica HTML correcta', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Verificar que hay elementos semánticos
    const main = page.locator('main, [role="main"]');
    const heading = page.locator('h1, h2, h3');
    
    await expect(heading.first()).toBeVisible();
  });

  test('USAB-ACC-003: Atributos ARIA correctos', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Verificar que los elementos interactivos tienen roles ARIA apropiados
    const buttons = page.locator('button, [role="button"]');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      const ariaLabel = await firstButton.getAttribute('aria-label');
      const ariaLabelledBy = await firstButton.getAttribute('aria-labelledby');
      const textContent = await firstButton.textContent();
      
      // Al menos uno de estos debe estar presente para accesibilidad
      expect(ariaLabel || ariaLabelledBy || textContent).toBeTruthy();
    }
  });

  test('USAB-ACC-004: Navegación por teclado funcional', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Verificar que los elementos interactivos son accesibles por teclado
    const interactiveElements = page.locator('button, a, input, select, textarea, [tabindex]');
    const count = await interactiveElements.count();
    
    if (count > 0) {
      // Verificar que al menos algunos elementos tienen tabindex apropiado
      for (let i = 0; i < Math.min(count, 5); i++) {
        const element = interactiveElements.nth(i);
        const tagName = await element.evaluate(el => el.tagName.toLowerCase());
        
        // Los elementos nativos son accesibles por teclado por defecto
        if (['button', 'a', 'input', 'select', 'textarea'].includes(tagName)) {
          const tabIndex = await element.getAttribute('tabindex');
          // tabindex no debe ser -1 (a menos que sea intencional)
          if (tabIndex !== null) {
            expect(parseInt(tabIndex)).not.toBe(-1);
          }
        }
      }
    }
  });

  test('USAB-ACC-005: Imágenes tienen texto alternativo', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        const ariaLabel = await img.getAttribute('aria-label');
        
        // Las imágenes deben tener alt o aria-label (o ser decorativas con alt="")
        expect(alt !== null || ariaLabel !== null).toBeTruthy();
      }
    }
  });
});

