# SKYDATA Bogotá - Frontend

Sistema de visualización de información ambiental para la ciudad de Bogotá.

## Descripción

Frontend del sistema SKYDATA Bogotá desarrollado según estándares ISO/IEC 25000 (SQuaRE) e ISO/IEC 12207:2017.

## Características

- Visualización de datos ambientales en mapa interactivo
- Integración con backend mediante API REST
- Pruebas unitarias y de integración completas
- Pipeline CI/CD según ISO 25000 e ISO 12207
- Análisis de calidad con SonarCloud

## Tecnologías

- JavaScript (ES6+)
- Leaflet.js para mapas
- Jest para testing
- Playwright para pruebas E2E

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Testing

```bash
# Tests unitarios
npm test

# Tests con cobertura
npm run test:coverage

# Tests E2E
npm run test:e2e
```

## Calidad de Código

Este proyecto utiliza:
- **ESLint** para análisis estático
- **SonarCloud** para análisis avanzado de calidad
- **Jest** para pruebas y cobertura
- **Pipeline CI/CD** según ISO 25000 e ISO 12207

## Pipeline CI/CD

El pipeline ejecuta automáticamente:
- ✅ Lint y análisis estático
- ✅ Análisis SonarCloud
- ✅ Auditoría de seguridad
- ✅ Pruebas unitarias
- ✅ Cobertura de código (≥60%)
- ✅ Pruebas de integración
- ✅ Verificación de trazabilidad
- ✅ Build y validación

Ver `.github/workflows/ci-cd-iso-25000.yml` para más detalles.

## Documentación

- Pipeline CI/CD: `5. PRUEBAS/10_Pipeline_CI_CD_ISO_25000.tex`
- SonarCloud: `README_SONARCLOUD.md`
- Plan de Pruebas: `5. PRUEBAS/06_Plan_Implementacion_Pruebas_ISO_25000.tex`

## Trazabilidad

Todos los componentes del código tienen trazabilidad a requisitos mediante comentarios `SwR-XX` según ISO/IEC/IEEE 29148:2018.
