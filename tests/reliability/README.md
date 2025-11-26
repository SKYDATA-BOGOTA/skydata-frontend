# Pruebas de Confiabilidad Frontend

## Instalación

Estos archivos deben copiarse a `skydata-frontend/tests/reliability/`

### Dependencias necesarias

```bash
npm install --save-dev @playwright/test
```

### Scripts en package.json

```json
{
  "scripts": {
    "test:reliability": "playwright test tests/reliability"
  }
}
```

## Ejecución

```bash
npm run test:reliability
```

## Base Normativa

- ISO/IEC 25010:2011 Sección 8.5.3 (Confiabilidad - Tolerancia a fallos)

## Trazabilidad

- SwR-ST01: Confiabilidad y estabilidad del sistema

