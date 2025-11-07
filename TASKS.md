# Distribución de Tareas - SKYDATA Frontend

## 📊 Resumen del Proyecto Frontend

**Repositorio**: https://github.com/SKYDATA-BOGOTA/skydata-frontend  
**Repositorio Backend**: https://github.com/SKYDATA-BOGOTA/skydata-backend  
**Total de Tareas Frontend**: 6  
**Estado**: 5 de 6 completadas (83%)  

---

## 👥 Distribución por Miembro

### 👤 @jeissonmp15 (2 tareas frontend)

#### Tarea 1: [Frontend] Renderizado de Mapa Base - SwR-F01 ✅
- **Issue**: [#1](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/1)
- **Branch**: `feature/SwR-F01-map-rendering`
- **Prioridad**: Alta 🔴
- **Trazabilidad**:
  - SwR-F01 (Renderizado de Mapa Base)
  - SyR-F01 (Visualización de Ubicaciones)
  - CU-01 (Consultar Información Ambiental)
  - ISO/IEC 12207:2017: Sec 6.4.6.4
- **Archivos**:
  - `js/controllers/map.controller.js` (función `initializeMap()`)
  - `js/main.js`
  - `css/map.css`
- **Commit**: `c323384`
- **Estado**: ✅ **IMPLEMENTADO**

#### Tarea 2: [Frontend] Pruebas de UI - SwR-V03 ⏳
- **Issue**: [#5](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/5)
- **Branch**: `feature/SwR-V03-ui-tests`
- **Prioridad**: Media 🟡
- **Trazabilidad**:
  - SwR-V03 (Pruebas de Interfaz de Usuario)
  - SyR-V02 (Verificación)
  - ISO/IEC 29119:2013 (Software Testing)
- **Archivos a Crear**:
  - `tests/map.controller.test.js`
  - `tests/data.service.test.js`
  - `tests/info.controller.test.js`
  - `docs/MANUAL_TESTING.md`
- **Estado**: ⏳ **PENDIENTE** (única tarea pendiente del proyecto)

---

### 👤 @giancarloprieto (2 tareas frontend)

#### Tarea 1: [Frontend] Marcadores en el Mapa - SwR-F02 ✅
- **Issue**: [#2](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/2)
- **Branch**: `feature/SwR-F02-map-markers`
- **Prioridad**: Alta 🔴
- **Trazabilidad**:
  - SwR-F02 (Marcadores en el Mapa)
  - SyR-F01 (Visualización de Ubicaciones)
  - CU-01 (Consultar Información Ambiental)
  - ADR-02 (GeoJSON)
- **Archivos**:
  - `js/controllers/map.controller.js` (función `renderMarkers()`)
- **Commit**: `c323384`
- **Estado**: ✅ **IMPLEMENTADO**

#### Tarea 2: [Frontend] Estilos y Usabilidad - SwR-U01, SwR-U02 ✅
- **Issue**: [#6](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/6)
- **Branch**: `feature/SwR-U01-U02-ui-ux-styles`
- **Prioridad**: Media 🟡
- **Trazabilidad**:
  - SwR-U01 (Interfaz Intuitiva)
  - SwR-U02 (Retroalimentación Visual)
  - ISO/IEC 25010:2011 Sec 4.2.3 (Usability)
  - WCAG 2.1 (Accessibility)
- **Archivos**:
  - `css/styles.css` (completo con variables CSS)
  - `css/map.css`
  - `js/controllers/info.controller.js` (showLoading, showError)
  - `index.html` (elementos de feedback)
- **Commits**: `caa7445`, `0704ed2`, `8f8ee46`
- **Estado**: ✅ **IMPLEMENTADO**

---

### 👤 @carlosperdomo376 (1 tarea frontend)

#### Tarea: [Frontend] Cliente HTTP - SwR-F07, SwR-I02 ✅
- **Issue**: [#3](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/3)
- **Branch**: `feature/SwR-F07-I02-http-client`
- **Prioridad**: Alta 🔴
- **Trazabilidad**:
  - SwR-F07 (Solicitud de Datos al Backend)
  - SwR-I02 (Cliente HTTP en Frontend)
  - SyR-F05 (Acceso a Información)
  - ADR-01 (Arquitectura de Dos Capas)
  - CU-01 (Consultar Información Ambiental)
- **Archivos**:
  - `js/services/data.service.js`
- **Commit**: `c323384`
- **Estado**: ✅ **IMPLEMENTADO**

**Nota**: @carlosperdomo376 tiene 2 tareas adicionales en el backend (#3, #6)

---

### 👤 @eab1362 (1 tarea frontend)

#### Tarea: [Frontend] Visualización Información Detallada - SwR-F03, SwR-F04 ✅
- **Issue**: [#4](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/4)
- **Branch**: `feature/SwR-F03-F04-info-display`
- **Prioridad**: Alta 🔴
- **Trazabilidad**:
  - SwR-F03 (Visualización de Información Detallada)
  - SwR-F04 (Formato de Presentación de Datos)
  - SyR-F02 (Presentación de Información Ambiental)
  - CU-02 (Visualizar Detalles de Ubicación)
  - ISO/IEC 25010:2011 (Usability)
- **Archivos**:
  - `js/controllers/info.controller.js`
  - `css/styles.css` (estilos del panel)
- **Commit**: `0704ed2`
- **Estado**: ✅ **IMPLEMENTADO**

**Nota**: @eab1362 tiene 2 tareas adicionales en el backend (#1, #2)

---

## 📊 Resumen Estadístico

### Estado de Implementación

| Estado | Cantidad | Porcentaje |
|--------|----------|------------|
| ✅ Implementado | 5 | 83.3% |
| ⏳ Pendiente | 1 | 16.7% |

### Distribución por Prioridad

| Prioridad | Cantidad |
|-----------|----------|
| Alta 🔴 | 4 |
| Media 🟡 | 2 |

### Distribución por Miembro

| Miembro | Tareas Frontend | Total Proyecto |
|---------|-----------------|----------------|
| @jeissonmp15 | 2 | 3 (1 backend + 2 frontend) |
| @giancarloprieto | 2 | 3 (1 backend + 2 frontend) |
| @carlosperdomo376 | 1 | 3 (2 backend + 1 frontend) |
| @eab1362 | 1 | 3 (2 backend + 1 frontend) |

---

## 🔗 Enlaces Rápidos

### Issues Frontend
- [Issue #1](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/1) - Mapa Base (@jeissonmp15) ✅
- [Issue #2](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/2) - Marcadores (@giancarloprieto) ✅
- [Issue #3](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/3) - Cliente HTTP (@carlosperdomo376) ✅
- [Issue #4](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/4) - Info Detallada (@eab1362) ✅
- [Issue #5](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/5) - Tests UI (@jeissonmp15) ⏳
- [Issue #6](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/6) - UI/UX (@giancarloprieto) ✅

### Documentación
- [README.md](README.md) - Documentación completa
- [CONTRIBUTING.md](CONTRIBUTING.md) - Guía de contribución
- [docs/TRACEABILITY.md](docs/TRACEABILITY.md) - Matriz de trazabilidad

---

## 🚀 Cómo Trabajar en tu Tarea

### 1. Verificar tu Asignación

Revisa los issues con tu @usuario en el título

### 2. Clonar el Repositorio

```bash
git clone https://github.com/SKYDATA-BOGOTA/skydata-frontend.git
cd skydata-frontend
npm install
```

### 3. Revisar tu Código

```bash
# Ver tu branch
git checkout feature/SwR-XXX-tu-feature

# Ver los archivos que implementaste
cat [archivo-asignado]
```

### 4. Ejecutar y Probar

```bash
# Ejecutar frontend
npm run dev

# Abrir en navegador
open http://localhost:8080
```

### 5. Documentar (Opcional)

Crear archivo explicando tu implementación:

```bash
echo "# Mi Implementación SwR-XXX" > docs/FEATURE_SwR-XXX.md
# Agregar descripción de lo que hiciste
```

---

**Última actualización**: 15 de Enero de 2024