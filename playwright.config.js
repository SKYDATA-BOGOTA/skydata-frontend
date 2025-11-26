/**
 * Configuración de Playwright para pruebas E2E
 * 
 * Configurado según ISO/IEC 29119-2:2013 (Test Design Techniques)
 * y ISO/IEC 12207:2017 6.4.6.4.3 (System Testing)
 * 
 * SwR-F01, SwR-F02, SwR-F03, SwR-F04, SwR-F07, SwR-I01, SwR-I02
 */

// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  
  // Timeout para cada test
  timeout: 30 * 1000,
  
  // Timeout para expectaciones
  expect: {
    timeout: 5000
  },
  
  // Ejecutar tests en paralelo
  fullyParallel: true,
  
  // Fallar el build en CI si accidentalmente dejaste test.only
  forbidOnly: !!process.env.CI,
  
  // Reintentos en CI
  retries: process.env.CI ? 2 : 0,
  
  // Workers en CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter para CI
  reporter: process.env.CI ? 'html' : 'list',
  
  // Configuración compartida para todos los proyectos
  use: {
    // Base URL para usar en navegación
    baseURL: 'http://localhost:8080',
    
    // Trazas en caso de fallo
    trace: 'on-first-retry',
    
    // Screenshots en caso de fallo
    screenshot: 'only-on-failure',
    
    // Video en caso de fallo
    video: 'retain-on-failure',
  },

  // Configurar proyectos para diferentes navegadores
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Servidor web para desarrollo
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
