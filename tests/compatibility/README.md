# Pruebas de Compatibilidad Frontend

## Instalación

Estos archivos deben copiarse a `skydata-frontend/tests/compatibility/`

### Dependencias necesarias

```bash
npm install --save-dev @playwright/test
```

### Configuración de Playwright

Crear `playwright.config.js` en la raíz del proyecto frontend:

```javascript
module.exports = {
  testDir: './tests/compatibility',
  use: {
    browsers: ['chromium', 'firefox', 'webkit'], // Chrome, Firefox, Safari
  },
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
};
```

### Scripts en package.json

```json
{
  "scripts": {
    "test:compatibility": "playwright test tests/compatibility"
  }
}
```

## Ejecución

```bash
npm run test:compatibility
```

## Base Normativa

- ISO/IEC 25010:2011 Sección 8.5.1 (Compatibilidad)
- ISO/IEC 25023:2016 Sección 5.5 (Compatibility Measurement)
- RFC 7946 (GeoJSON standard)

## Trazabilidad

- SwR-I01: Compatibilidad con navegadores modernos
- SwR-I02: Compatibilidad con estándares web
- SwR-I03: Interoperabilidad Frontend-Backend

