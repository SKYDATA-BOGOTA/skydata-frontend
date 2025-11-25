# Reporte de Cobertura según ISO/IEC 25020:2019

**Fecha**: 2025-11-25  
**Issue**: #35  
**Base Normativa**: ISO/IEC 25020:2019, ISO/IEC 25040:2011 Actividad 4, ISO/IEC 29119:2013

## Objetivo

Documentar cobertura de código según ISO/IEC 25020:2019 (Modelo de Medición) y ISO/IEC 25040:2011 Actividad 4 (Ejecutar la Evaluación).

## Métricas según ISO/IEC 25020:2019

### Elementos de Medición (QME)

Según ISO/IEC 25020:2019, los elementos de medición para cobertura de código son:

- **QME_Cov_001**: Líneas cubiertas por pruebas
- **QME_Cov_002**: Líneas totales de código

### Medida de Calidad (QM)

**QM_Cov_001** = (QME_Cov_001 / QME_Cov_002) × 100

- **Tipo de Escala**: Razón (0-100%)
- **Umbral**: ≥ 60%

## Resultados de Cobertura

### Resumen General

| Métrica | Cubiertas | Totales | Porcentaje |
|---------|-----------|---------|------------|
| **Statements** | 54 | 54 | **100%** |
| **Branches** | 32 | 32 | **100%** |
| **Functions** | 11 | 11 | **100%** |
| **Lines** | 46 | 46 | **100%** |

### Cálculo QM_Cov_001 según ISO 25020:2019

- **QME_Cov_001** (Líneas cubiertas): **46**
- **QME_Cov_002** (Líneas totales): **46**
- **QM_Cov_001** = (46 / 46) × 100 = **100%**

### Cumplimiento de Umbral

✅ **QM_Cov_001 = 100% ≥ 60%** (Umbral cumplido)

### Cobertura por Componente

#### Controllers

| Archivo | Statements | Branches | Functions | Lines |
|---------|------------|----------|-----------|-------|
| `info.controller.js` | 100% (13/13) | 100% (12/12) | 100% (4/4) | 100% (13/13) |
| `map.controller.js` | 100% (28/28) | 100% (12/12) | 100% (6/6) | 100% (20/20) |
| **Total Controllers** | **100% (41/41)** | **100% (24/24)** | **100% (10/10)** | **100% (33/33)** |

#### Services

| Archivo | Statements | Branches | Functions | Lines |
|---------|------------|----------|-----------|-------|
| `data.service.js` | 100% (13/13) | 100% (8/8) | 100% (1/1) | 100% (13/13) |
| **Total Services** | **100% (13/13)** | **100% (8/8)** | **100% (1/1)** | **100% (13/13)** |

## Análisis Detallado

### Archivos Cubiertos

1. **js/controllers/info.controller.js**
   - Líneas cubiertas: 13/13 (100%)
   - Funciones cubiertas: 4/4 (100%)
   - Branches cubiertas: 12/12 (100%)

2. **js/controllers/map.controller.js**
   - Líneas cubiertas: 20/20 (100%)
   - Funciones cubiertas: 6/6 (100%)
   - Branches cubiertas: 12/12 (100%)

3. **js/services/data.service.js**
   - Líneas cubiertas: 13/13 (100%)
   - Funciones cubiertas: 1/1 (100%)
   - Branches cubiertas: 8/8 (100%)

### Tests Ejecutados

- **Test Suites**: 4 passed, 4 total
- **Tests**: 54 passed, 54 total
- **Tiempo de Ejecución**: 3.615s

## Cumplimiento con ISO/IEC 25020:2019

✅ **Todas las métricas cumplen con el umbral requerido (≥ 60%)**

- QM_Cov_001 (Cobertura de Líneas): **100%** ≥ 60% ✅
- Cobertura de Statements: **100%** ≥ 60% ✅
- Cobertura de Branches: **100%** ≥ 60% ✅
- Cobertura de Functions: **100%** ≥ 60% ✅

## Trazabilidad

- ISO: ISO/IEC 25020:2019 (Measurement reference model and guide)
- ISO: ISO/IEC 25040:2011 Actividad 4 (Ejecutar la Evaluación)
- ISO: ISO/IEC 29119:2013 (Software Testing)
- Documento: `01_Modelo_Evaluacion_Adecuacion_Funcional.tex` (referencia QME)
- Issue: #35
- Fase: 6.1 del Plan de Implementación

## Reporte HTML

El reporte HTML completo está disponible en:
- `coverage/index.html` (Reporte principal)
- `coverage/lcov-report/index.html` (Reporte LCOV)

## Conclusión

El proyecto cumple completamente con los requisitos de cobertura de código según ISO/IEC 25020:2019, superando significativamente el umbral mínimo del 60% con una cobertura del 100% en todas las métricas.

