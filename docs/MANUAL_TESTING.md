# 🧪 Manual de Pruebas - SkyData Frontend

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Configuración del Entorno de Pruebas](#configuración-del-entorno-de-pruebas)
3. [Pruebas Unitarias Automatizadas](#pruebas-unitarias-automatizadas)
4. [Pruebas Manuales de Interfaz](#pruebas-manuales-de-interfaz)
5. [Casos de Prueba](#casos-de-prueba)
6. [Criterios de Aceptación](#criterios-de-aceptación)
7. [Reporte de Errores](#reporte-de-errores)

---

## 📖 Introducción

Este documento proporciona una guía completa para realizar pruebas manuales y automatizadas del frontend de SkyData. Las pruebas cubren la funcionalidad del mapa interactivo, la visualización de marcadores y la interacción del usuario.

**Requisitos Relacionados:**
- SwR-V03: Pruebas Unitarias de Interfaz
- SwR-F01: Renderizado de Mapa Base
- SwR-F02: Renderizado de Marcadores

---

## ⚙️ Configuración del Entorno de Pruebas

### Prerequisitos

```bash
# Verificar versiones
node --version  # v18.x o superior
npm --version   # v9.x o superior
```

### Instalación

```bash
# 1. Clonar el repositorio (si aún no lo has hecho)
git clone https://github.com/SKYDATA-BOGOTA/skydata-frontend.git
cd skydata-frontend

# 2. Instalar dependencias
npm install

# 3. Verificar instalación de dependencias de testing
npm list jest eslint
```

### Configuración de Variables de Entorno

Asegúrate de que `js/config/config.js` esté configurado correctamente:

```javascript
export const CONFIG = {
    API_BASE_URL: 'http://localhost:3000',
    API_DATOS_ENDPOINT: '/api/datos',
    MAP_CENTER: [4.6097, -74.0817],
    MAP_ZOOM: 11,
    // ...
};
```

---

## 🤖 Pruebas Unitarias Automatizadas

### Ejecutar Todas las Pruebas

```bash
# Ejecutar suite completa de tests
npm test

# Ejecutar con cobertura de código
npm test -- --coverage

# Ejecutar en modo watch (desarrollo)
npm test -- --watch
```

### Ejecutar Pruebas Específicas

```bash
# Solo tests de MapController
npm test map.controller.test.js

# Solo tests de DataService
npm test data.service.test.js

# Ejecutar tests con patrón específico
npm test -- --testNamePattern="initializeMap"
```

### Interpretación de Resultados

#### ✅ Resultado Exitoso
```
PASS  tests/map.controller.test.js
  MapController
    Constructor
      ✓ debe inicializar map como null (3 ms)
      ✓ debe inicializar markers como array vacío (1 ms)
    ...

Test Suites: 1 passed, 1 total
Tests:       20 passed, 20 total
```

#### ❌ Resultado con Fallos
```
FAIL  tests/map.controller.test.js
  MapController
    initializeMap()
      ✕ debe crear una instancia del mapa (15 ms)

  ● MapController › initializeMap() › debe crear una instancia del mapa

    expect(received).toBeDefined()
    Received: undefined
```

### Cobertura de Código

Objetivo: **>80% de cobertura**

```bash
npm test -- --coverage --collectCoverageFrom='js/**/*.js'
```

Resultados esperados:

| Archivo | Statements | Branches | Functions | Lines |
|---------|-----------|----------|-----------|-------|
| map.controller.js | 100% | 100% | 100% | 100% |
| data.service.js | 85% | 80% | 90% | 85% |

---

## 🖱️ Pruebas Manuales de Interfaz

### Preparación

1. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

2. **Abrir navegador:**
   - URL: `http://localhost:8080`
   - Navegadores recomendados: Chrome, Firefox, Edge (últimas versiones)

3. **Abrir DevTools:**
   - Presiona `F12` o `Ctrl+Shift+I` (Windows/Linux)
   - Presiona `Cmd+Option+I` (macOS)

---

## 🧪 Casos de Prueba

### CP-001: Carga Inicial de la Aplicación

**Objetivo:** Verificar que la aplicación carga correctamente

**Pasos:**
1. Abrir `http://localhost:8080` en el navegador
2. Observar la carga de la página

**Resultado Esperado:**
- ✅ La página carga sin errores visibles
- ✅ El contenedor del mapa es visible
- ✅ No hay errores en la consola del navegador
- ✅ Los estilos CSS se aplican correctamente

**Prioridad:** Alta  
**Tiempo Estimado:** 30 segundos

---

### CP-002: Inicialización del Mapa Base

**Objetivo:** Verificar que el mapa de Leaflet se inicializa correctamente

**Pasos:**
1. Cargar la aplicación
2. Observar el área del mapa
3. Verificar la consola del navegador

**Resultado Esperado:**
- ✅ El mapa se renderiza en el contenedor `#map`
- ✅ Los tiles de OpenStreetMap cargan correctamente
- ✅ El mapa está centrado en Bogotá: [4.6097, -74.0817]
- ✅ El nivel de zoom inicial es 11
- ✅ Se muestra la atribución "© OpenStreetMap contributors"
- ✅ No hay mensajes de error en consola

**Criterios de Fallo:**
- ❌ El mapa no se visualiza (contenedor vacío o blanco)
- ❌ Los tiles no cargan (cuadrícula gris)
- ❌ Errores de JavaScript en consola
- ❌ El mapa está centrado en ubicación incorrecta

**Prioridad:** Crítica  
**Tiempo Estimado:** 1 minuto

---

### CP-003: Controles de Navegación del Mapa

**Objetivo:** Verificar que los controles de navegación funcionan correctamente

**Pasos:**
1. Cargar la aplicación con el mapa visible
2. Hacer click en el botón de zoom in (+)
3. Hacer click en el botón de zoom out (-)
4. Hacer click y arrastrar el mapa (pan)
5. Usar la rueda del mouse para hacer zoom
6. Hacer doble click en el mapa

**Resultado Esperado:**
- ✅ El botón "+" aumenta el zoom (acerca)
- ✅ El botón "-" disminuye el zoom (aleja)
- ✅ El arrastre desplaza el mapa suavemente
- ✅ La rueda del mouse ajusta el zoom
- ✅ El doble click hace zoom y centra
- ✅ El zoom máximo es 18
- ✅ El zoom mínimo es 10

**Prioridad:** Alta  
**Tiempo Estimado:** 2 minutos

---

### CP-004: Renderizado de Marcadores

**Objetivo:** Verificar que los marcadores se muestran correctamente en el mapa

**Prerequisitos:**
- El servicio backend debe estar corriendo en `http://localhost:3000`
- El endpoint `/api/datos` debe retornar datos GeoJSON válidos

**Pasos:**
1. Cargar la aplicación
2. Esperar a que se carguen los datos del backend
3. Observar los marcadores en el mapa
4. Contar los marcadores visibles

**Resultado Esperado:**
- ✅ Los marcadores aparecen en las ubicaciones correctas
- ✅ Los íconos de los marcadores son visibles y claros
- ✅ La cantidad de marcadores coincide con los datos del backend
- ✅ Los marcadores respetan las coordenadas GeoJSON

**Datos de Prueba:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-74.0721, 4.7110]
      },
      "properties": {
        "estacion": "Kennedy"
      }
    }
  ]
}
```

**Prioridad:** Crítica  
**Tiempo Estimado:** 2 minutos

---

### CP-005: Interacción con Popups de Marcadores

**Objetivo:** Verificar que los popups se muestran al hacer click en los marcadores

**Pasos:**
1. Cargar la aplicación con marcadores visibles
2. Hacer click en un marcador
3. Observar el popup que aparece
4. Verificar el contenido del popup
5. Hacer click fuera del popup para cerrarlo
6. Hacer click en otro marcador

**Resultado Esperado:**
- ✅ Al hacer click en un marcador, aparece un popup
- ✅ El popup muestra el nombre de la estación en negrita
- ✅ El contenido del popup es legible
- ✅ El popup se posiciona correctamente sobre el marcador
- ✅ El popup se cierra al hacer click fuera
- ✅ Solo un popup está abierto a la vez

**Formato Esperado del Popup:**
```html
<b>Kennedy</b>
```

**Prioridad:** Alta  
**Tiempo Estimado:** 2 minutos

---

### CP-006: Limpieza de Marcadores

**Objetivo:** Verificar que los marcadores se pueden limpiar correctamente

**Pasos:**
1. Cargar la aplicación con marcadores visibles
2. Abrir la consola del navegador
3. Ejecutar: `mapController.clearMarkers()`
4. Observar el mapa

**Resultado Esperado:**
- ✅ Todos los marcadores desaparecen del mapa
- ✅ El array `mapController.markers` está vacío
- ✅ No quedan referencias en memoria
- ✅ No hay errores en consola

**Verificación en Consola:**
```javascript
console.log(mapController.markers.length); // Debe ser 0
```

**Prioridad:** Media  
**Tiempo Estimado:** 1 minuto

---

### CP-007: Actualización de Marcadores

**Objetivo:** Verificar que los marcadores se actualizan correctamente al recibir nuevos datos

**Pasos:**
1. Cargar la aplicación con marcadores iniciales
2. Anotar la cantidad de marcadores visibles
3. Simular actualización de datos (recargar página o llamar función de actualización)
4. Observar los cambios en el mapa

**Resultado Esperado:**
- ✅ Los marcadores antiguos se eliminan antes de añadir nuevos
- ✅ Los nuevos marcadores aparecen en las ubicaciones correctas
- ✅ No hay duplicación de marcadores
- ✅ La transición es fluida sin parpadeos

**Prioridad:** Alta  
**Tiempo Estimado:** 2 minutos

---

### CP-008: Manejo de Datos Vacíos

**Objetivo:** Verificar el comportamiento cuando no hay datos disponibles

**Pasos:**
1. Configurar el backend para retornar GeoJSON vacío:
   ```json
   {
     "type": "FeatureCollection",
     "features": []
   }
   ```
2. Cargar la aplicación
3. Observar el mapa

**Resultado Esperado:**
- ✅ El mapa se renderiza correctamente
- ✅ No aparecen marcadores
- ✅ No hay errores en consola
- ✅ La aplicación permanece estable

**Prioridad:** Media  
**Tiempo Estimado:** 1 minuto

---

### CP-009: Manejo de Datos Inválidos

**Objetivo:** Verificar que la aplicación maneja correctamente datos malformados

**Escenarios:**

#### 9.1 - GeoJSON sin propiedad 'features'
```json
{
  "type": "FeatureCollection"
}
```

#### 9.2 - Feature sin geometría
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": null,
      "properties": {}
    }
  ]
}
```

#### 9.3 - Geometría no tipo Point
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [[-74.0721, 4.7110], [-74.0722, 4.7111]]
      }
    }
  ]
}
```

**Resultado Esperado:**
- ✅ La aplicación no se rompe
- ✅ Se ignoran las características inválidas
- ✅ Se muestran solo los datos válidos
- ✅ Mensaje informativo en consola (opcional)

**Prioridad:** Media  
**Tiempo Estimado:** 3 minutos

---

### CP-010: Conversión de Coordenadas

**Objetivo:** Verificar que las coordenadas GeoJSON se convierten correctamente a formato Leaflet

**Datos de Prueba:**
- GeoJSON: `[-74.0721, 4.7110]` (longitud, latitud)
- Leaflet: `[4.7110, -74.0721]` (latitud, longitud)

**Pasos:**
1. Inspeccionar el código fuente de `renderMarkers()`
2. Verificar la línea de conversión:
   ```javascript
   const latLng = [coords[1], coords[0]];
   ```
3. Cargar datos de prueba con coordenadas conocidas
4. Verificar que los marcadores aparecen en la ubicación correcta

**Resultado Esperado:**
- ✅ La conversión invierte correctamente el orden de coordenadas
- ✅ Los marcadores aparecen en Bogotá, no en otro continente
- ✅ Las coordenadas en consola muestran el formato correcto

**Prioridad:** Crítica  
**Tiempo Estimado:** 2 minutos

---

## 🎯 Criterios de Aceptación

### Funcionalidad del Mapa

- [x] El mapa se inicializa correctamente
- [x] Los tiles de OpenStreetMap cargan sin errores
- [x] El mapa está centrado en Bogotá
- [x] Los controles de zoom funcionan (min: 10, max: 18)
- [x] El arrastre y navegación son fluidos

### Marcadores

- [x] Los marcadores se renderizan en ubicaciones correctas
- [x] Los popups muestran información correcta
- [x] La conversión de coordenadas es precisa
- [x] Los marcadores se pueden limpiar
- [x] No hay duplicación de marcadores

### Manejo de Errores

- [x] Datos vacíos no rompen la aplicación
- [x] Datos inválidos se ignoran gracefully
- [x] No hay errores de JavaScript en consola
- [x] La aplicación permanece estable

### Rendimiento

- [x] Carga inicial < 2 segundos
- [x] Renderizado de marcadores < 500ms (para 50 marcadores)
- [x] Navegación del mapa es fluida (sin lag)
- [x] No hay memory leaks visibles

### Cobertura de Tests

- [x] Cobertura unitaria > 80%
- [x] Todos los tests pasan exitosamente
- [x] No hay tests marcados como `.skip` (excepto data.service pendiente)

---

## 🐛 Reporte de Errores

### Plantilla de Reporte

Cuando encuentres un error, usa la siguiente plantilla:

```markdown
## 🐛 [TIPO] Título Descriptivo del Error

**Prioridad:** Alta / Media / Baja
**Caso de Prueba:** CP-XXX

### Descripción
Breve descripción del problema encontrado.

### Pasos para Reproducir
1. Paso 1
2. Paso 2
3. Paso 3

### Resultado Esperado
Lo que debería ocurrir.

### Resultado Actual
Lo que realmente ocurre.

### Evidencia
- Screenshots (si aplica)
- Logs de consola
- Información del navegador

### Entorno
- Navegador: Chrome 120.0
- Sistema Operativo: Windows 11
- Versión del Código: commit hash
- Fecha: YYYY-MM-DD

### Logs de Consola
```
[ERROR] Uncaught TypeError: Cannot read property...
```

### Posible Causa
Hipótesis sobre la causa del error (opcional).
```

### Categorías de Errores

- **[CRÍTICO]**: La aplicación no funciona
- **[ALTO]**: Funcionalidad principal afectada
- **[MEDIO]**: Funcionalidad secundaria afectada
- **[BAJO]**: Mejora o error cosmético

---

## 📊 Checklist de Testing Completo

### Antes de Crear Pull Request

- [ ] Todos los tests unitarios pasan (`npm test`)
- [ ] Cobertura de código > 80%
- [ ] No hay errores de linter (`npm run lint`)
- [ ] Todos los casos de prueba manuales ejecutados
- [ ] Documentación actualizada
- [ ] Screenshots/videos de funcionalidad (si aplica)

### Verificación en Diferentes Navegadores

- [ ] Chrome (última versión)
- [ ] Firefox (última versión)
- [ ] Edge (última versión)
- [ ] Safari (si disponible)

### Verificación en Diferentes Resoluciones

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## 📚 Referencias

- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [GeoJSON Specification](https://geojson.org/)
- [OpenStreetMap](https://www.openstreetmap.org/)

---

## 📝 Notas Adicionales

### Datos de Prueba Recomendados

Ubicaciones de estaciones en Bogotá para testing:

```javascript
const testLocations = [
  { coords: [-74.0721, 4.7110], name: "Kennedy" },
  { coords: [-74.0825, 4.6511], name: "Usaquén" },
  { coords: [-74.1125, 4.6850], name: "Suba" },
  { coords: [-74.0469, 4.6097], name: "Centro" },
  { coords: [-74.1469, 4.6597], name: "Engativá" }
];
```

### Automatización de Pruebas Manuales (Futuro)

Considerar implementar:
- Cypress para E2E testing
- Playwright para testing cross-browser
- Selenium para automatización de UI

---

**Última Actualización:** Noviembre 2024  
**Versión del Documento:** 1.0  
**Responsable:** SkyData Team

