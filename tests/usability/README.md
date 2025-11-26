# Pruebas de Usabilidad Extendida Frontend

## Instalación

Estos archivos deben copiarse a `skydata-frontend/tests/usability/`

### Dependencias necesarias

```bash
npm install --save-dev @axe-core/playwright @playwright/test
```

### Scripts en package.json

```json
{
  "scripts": {
    "test:usability": "playwright test tests/usability"
  }
}
```

## Ejecución

```bash
npm run test:usability
```

## Base Normativa

- ISO/IEC 25010:2011 Sección 8.4 (Usabilidad)
- ISO/IEC 25023:2016 Sección 5.3 (Usability Measurement)
- WCAG 2.1 nivel AA (Web Content Accessibility Guidelines)

## Trazabilidad

- SwR-U01: Usabilidad y accesibilidad
- SwR-U02: Cumplimiento de estándares de accesibilidad

## Tipos de Pruebas

1. **Accesibilidad WCAG 2.1**: Verificación de nivel AA usando axe-core
2. **Responsive Design**: Pruebas en móvil (375x667), tablet (768x1024), desktop (1920x1080)
3. **Contraste de Colores**: Verificación de contraste mínimo según WCAG 2.1
4. **Legibilidad**: Tamaño de fuente, espaciado, longitud de línea

