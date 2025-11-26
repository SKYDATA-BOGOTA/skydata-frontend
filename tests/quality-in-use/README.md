# Pruebas de Calidad en Uso (Frontend)

## Instalación

Estos archivos deben copiarse a `skydata-frontend/tests/quality-in-use/`

### Dependencias necesarias

```bash
npm install --save-dev @playwright/test
```

### Scripts en package.json

```json
{
  "scripts": {
    "test:quality-in-use": "playwright test tests/quality-in-use"
  }
}
```

## Ejecución

```bash
npm run test:quality-in-use
```

## Base Normativa

- ISO/IEC 25022:2016 (Measurement of Quality in Use)
- ISO/IEC 25010:2011 (Quality in Use model)

## Trazabilidad

- SwR-U01: Usabilidad y accesibilidad
- SwR-U02: Cumplimiento de estándares de accesibilidad

## Tipos de Pruebas

1. **Efectividad**: Tareas completadas exitosamente (ISO 25022:2016 9.1)
2. **Eficiencia**: Tiempo para completar tareas (ISO 25022:2016 9.2)
3. **Satisfacción**: Encuesta SUS (ISO 25022:2016 9.3) - Requiere usuarios reales

## Notas

- Las pruebas de satisfacción con usuarios reales (encuestas SUS) no pueden automatizarse completamente
- La estructura de la encuesta SUS está documentada en `satisfaction-survey.md`
- Los resultados deben documentarse según ISO 25022:2016

