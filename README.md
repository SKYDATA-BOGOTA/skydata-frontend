# SKYDATA Frontend - Aplicación Web de Visualización

## 🎯 Descripción del Proyecto

Aplicación web frontend para el Sistema de Visualización de Información Ambiental de Bogotá (SKYDATA).
Interfaz de usuario con mapa interactivo que presenta datos ambientales de estaciones de monitoreo.

**Proyecto Académico** - Universidad Distrital Francisco José de Caldas  
**Curso**: Ingeniería de Software II  
**Propósito**: Demostración de competencias en ingeniería de software siguiendo estándares internacionales

## 📜 Cumplimiento Normativo

Este proyecto ha sido desarrollado siguiendo los siguientes estándares internacionales:

| Estándar | Sección | Aplicación |
|-----------|---------|-------------|
| **ISO/IEC/IEEE 29148:2018** | Sec 9.6.4, 9.6.13 | Product Perspective, Usability |
| **ISO/IEC 12207:2017** | Sec 6.4.6.4 | Implementation Process |
| **ISO/IEC 25010:2011** | Sec 4.2.3 | Usability Quality Model |
| **ISO/IEC 5055:2021** | Completo | Software Quality Measurement |
| **WCAG 2.1** | Level AA | Web Accessibility Guidelines |
| **W3C HTML5** | Completo | HTML5 Specification |
| **W3C CSS3** | Completo | CSS3 Specification |

## 🏗️ Arquitectura

### Estructura del Proyecto

```
skydata-frontend/
├── index.html                   # Punto de entrada - SwR-I01
├── css/
│   ├── styles.css             # Estilos principales - SwR-U01
│   └── map.css                # Estilos del mapa - SwR-F01
│
├── js/
│   ├── main.js                # Inicialización - CU-01
│   ├── config/
│   │   └── config.js          # Configuración - CU-04
│   ├── controllers/
│   │   ├── map.controller.js  # SwR-F01, SwR-F02
│   │   └── info.controller.js # SwR-F03, SwR-F04, SwR-U02
│   ├── services/
│   │   └── data.service.js    # SwR-F07, SwR-I02
│   └── models/
│
├── assets/                      # Imágenes, iconos
├── tests/                       # Pruebas - SwR-V03
├── docs/
│   └── TRACEABILITY.md        # Matriz de trazabilidad
│
├── .eslintrc.json               # Configuración ESLint (ISO 5055)
├── .gitignore
├── package.json
└── README.md
```

### Arquitectura de Componentes

```
┌──────────────────────────────────────────────────────┐
│  main.js (Orchestrator)                         │
└──────────────────────────────────────────────────────┘
            │
      ┌─────┼─────┐
      │           │
      ↓           ↓
┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│  MapController                │   │  InfoController              │
│  - initializeMap()            │   │  - showLocationInfo()        │
│  - renderMarkers()            │   │  - showLoading()             │
│  (SwR-F01, SwR-F02)           │   │  (SwR-F03, SwR-F04, SwR-U02) │
└─────────────────────────────────┘   └─────────────────────────────────┘
            │                              │
            ↓                              │
      ┌─────────────────────────────────┐    │
      │  DataService                │    │
      │  - fetchDatosAmbientales()  │    │
      │  (SwR-F07, SwR-I02)         │    │
      └─────────────────────────────────┘    │
            │                              │
            ↓                              ↓
      ┌────────────────────────────────────────────────────────────┐
      │  Backend API (http://localhost:3000/api/datos)  │
      └────────────────────────────────────────────────────────────┘
```

## 📊 Matriz de Trazabilidad: Requisitos → Código

### Requisitos Funcionales

| SwR | Descripción | Archivo de Implementación | Commit | Issue |
|-----|-------------|---------------------------|--------|-------|
| **SwR-F01** | Renderizado de Mapa Base | `js/controllers/map.controller.js`<br/>Función: `initializeMap()` | c323384 | #1 |
| **SwR-F02** | Marcadores en el Mapa | `js/controllers/map.controller.js`<br/>Función: `renderMarkers()` | c323384 | #2 |
| **SwR-F03** | Visualización Info Detallada | `js/controllers/info.controller.js`<br/>Función: `showLocationInfo()` | 0704ed2 | #4 |
| **SwR-F04** | Formato de Presentación | `js/controllers/info.controller.js`<br/>Funciones: `formatTemperatura()`, `formatHumedad()`, etc. | 0704ed2 | #4 |
| **SwR-F07** | Solicitud Datos Backend | `js/services/data.service.js`<br/>Función: `fetchDatosAmbientales()` | c323384 | #3 |

### Requisitos de Interfaz

| SwR | Descripción | Archivo de Implementación | Commit | Issue |
|-----|-------------|---------------------------|--------|-------|
| **SwR-I01** | Interfaz Web Responsiva | `index.html`<br/>`css/styles.css` (media queries) | 8f8ee46<br/>caa7445 | - |
| **SwR-I02** | Cliente HTTP Frontend | `js/services/data.service.js` (Fetch API) | c323384 | #3 |

### Requisitos de Usabilidad

| SwR | Descripción | Archivo de Implementación | Commit | Issue |
|-----|-------------|---------------------------|--------|-------|
| **SwR-U01** | Interfaz Intuitiva | `css/styles.css`<br/>`js/controllers/info.controller.js` | caa7445<br/>0704ed2 | #6 |
| **SwR-U02** | Retroalimentación Visual | `js/controllers/info.controller.js`<br/>Funciones: `showLoading()`, `showError()` | 0704ed2<br/>8f8ee46 | #6 |

### Requisitos de Diseño

| SwR | Descripción | Implementación | Commit |
|-----|-------------|----------------|--------|
| **SwR-DC01** | Tecnologías Web Estándar | HTML5, CSS3, JavaScript ES6+ | 67bae97 |

## 🔗 Trazabilidad: Casos de Uso → Código

### CU-01: Consultar Información Ambiental

**Flujo Implementado**:
1. Usuario accede a la aplicación → `index.html`
2. Sistema carga interfaz → `main.js:initApp()`
3. Sistema inicializa mapa → `map.controller.js:initializeMap()` (SwR-F01)
4. Sistema solicita datos → `data.service.js:fetchDatosAmbientales()` (SwR-F07)
5. Sistema presenta marcadores → `map.controller.js:renderMarkers()` (SwR-F02)

**Archivos**: `main.js`, `map.controller.js`, `data.service.js`  
**Commits**: c323384, 8f8ee46  
**Issues**: #1, #2, #3

### CU-02: Visualizar Detalles de Ubicación

**Flujo Implementado**:
1. Usuario hace clic en marcador → Event listener en `map.controller.js`
2. Sistema muestra info detallada → `info.controller.js:showLocationInfo()` (SwR-F03)
3. Sistema formatea datos → Funciones `format*()` (SwR-F04)
4. Usuario lee información → Panel lateral con estilos `css/styles.css`

**Archivos**: `info.controller.js`, `map.controller.js`, `css/styles.css`  
**Commit**: 0704ed2, caa7445  
**Issue**: #4

## 🏗️ Trazabilidad: ADRs → Código

| ADR | Decisión Arquitectónica | Implementación en Frontend |
|-----|------------------------|-----------------------------|
| **AD-01** | Arquitectura de Dos Capas | Frontend separado que consume API REST<br/>Cliente HTTP con Fetch API<br/>Separación de responsabilidades (MVC pattern) |
| **AD-02** | GeoJSON como Formato de Datos | Procesamiento de GeoJSON en `data.service.js`<br/>Renderizado basado en Features de GeoJSON<br/>Compatibilidad con Leaflet.js (GeoJSON nativo) |

## 💾 Instalación y Configuración

### Prerrequisitos

- **Node.js** >= 18.0.0 (para herramientas de desarrollo)
- **npm** >= 9.0.0
- **Backend** ejecutándose en http://localhost:3000

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/SKYDATA-BOGOTA/skydata-frontend.git
cd skydata-frontend

# Instalar dependencias
npm install
```

### Configuración

Editar `js/config/config.js` si es necesario:

```javascript
export const CONFIG = {
  API_BASE_URL: 'http://localhost:3000',  // URL del backend
  API_DATOS_ENDPOINT: '/api/datos',
  MAP_CENTER: [4.6097, -74.0817],         // Bogotá
  MAP_ZOOM: 11
};
```

### Ejecución

#### Opción 1: Usando live-server (Recomendado)

```bash
npm run dev
```

Abre automáticamente en http://localhost:8080

#### Opción 2: Usando cualquier servidor HTTP

```bash
# Python 3
python -m http.server 8080

# Node.js http-server
npx http-server -p 8080

# PHP
php -S localhost:8080
```

Luego abrir: http://localhost:8080

### Verificar Integración con Backend

```bash
# 1. Verificar que el backend esté corriendo
curl http://localhost:3000/health

# 2. Verificar que retorna datos GeoJSON
curl http://localhost:3000/api/datos

# 3. Abrir el frontend
# http://localhost:8080

# 4. Abrir DevTools Console para ver logs
# Debería mostrar:
# ✓ Mapa inicializado
# ✓ Datos cargados: 7 estaciones
# ✓ Marcadores renderizados
```

## ✨ Funcionalidades Implementadas

### 1. Visualización de Mapa (SwR-F01)
- ✅ Mapa interactivo con Leaflet.js
- ✅ Centrado en Bogotá (4.6097, -74.0817)
- ✅ Zoom inicial nivel 11
- ✅ Tiles de OpenStreetMap
- ✅ Controles de zoom
- ✅ Navegación con mouse/touch

### 2. Marcadores de Estaciones (SwR-F02)
- ✅ Renderizado automático desde GeoJSON
- ✅ 7 estaciones en diferentes localidades
- ✅ Popups con nombre de estación
- ✅ Eventos de click
- ✅ Limpieza de marcadores anteriores

### 3. Información Detallada (SwR-F03, SwR-F04)
- ✅ Panel lateral con detalles
- ✅ Variables ambientales formateadas:
  - Temperatura (°C)
  - Humedad (%)
  - Calidad del aire (índice + categoría)
  - Nivel de ruido (dB)
- ✅ Timestamp formateado
- ✅ Iconos visuales por variable
- ✅ Cards con hover effects

### 4. Comunicación con Backend (SwR-F07, SwR-I02)
- ✅ Fetch API para solicitudes HTTP
- ✅ Manejo de respuestas JSON
- ✅ Manejo de errores de red
- ✅ Validación de formato GeoJSON
- ✅ Health check del backend

### 5. Usabilidad (SwR-U01, SwR-U02)
- ✅ Interfaz moderna y limpia
- ✅ Loading indicator durante carga
- ✅ Mensajes de error claros
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Colores con buen contraste (WCAG 2.1)
- ✅ Transiciones suaves
- ✅ Feedback visual en todas las acciones

## 🧪 Pruebas

### Estrategia de Pruebas (ISO/IEC 29119:2013)

#### Pruebas Manuales (SwR-V03)

**Checklist de Pruebas**:

1. **Renderizado de Mapa** (SwR-F01)
   - [ ] Abrir http://localhost:8080
   - [ ] Verificar que el mapa carga correctamente
   - [ ] Verificar que está centrado en Bogotá
   - [ ] Probar zoom in/out
   - [ ] Probar navegación (pan/drag)

2. **Marcadores** (SwR-F02)
   - [ ] Verificar que aparecen 7 marcadores
   - [ ] Verificar ubicaciones correctas
   - [ ] Click en cada marcador
   - [ ] Verificar que muestra popup con nombre

3. **Información Detallada** (SwR-F03, SwR-F04)
   - [ ] Click en marcador
   - [ ] Panel lateral se abre
   - [ ] Todas las variables se muestran
   - [ ] Formato con unidades correcto
   - [ ] Timestamp formateado

4. **Comunicación Backend** (SwR-F07)
   - [ ] Abrir DevTools → Network tab
   - [ ] Recargar página
   - [ ] Verificar request GET a /api/datos
   - [ ] Verificar response 200 OK
   - [ ] Verificar datos GeoJSON recibidos

5. **Manejo de Errores** (SwR-R01, SwR-U02)
   - [ ] Detener backend
   - [ ] Recargar frontend
   - [ ] Verificar mensaje de error claro
   - [ ] Verificar que la UI no se rompe

6. **Compatibilidad de Navegadores** (SwR-I01)
   - [ ] Probar en Chrome
   - [ ] Probar en Firefox
   - [ ] Probar en Edge
   - [ ] Probar en Safari (si disponible)

7. **Responsividad** (SwR-I01)
   - [ ] Redimensionar ventana
   - [ ] Probar en tablet (responsive mode)
   - [ ] Probar en móvil (responsive mode)
   - [ ] Verificar que todo funciona correctamente

### Ejecutar Tests Automatizados

```bash
# Tests unitarios
npm test

# Linting
npm run lint
```

## 🌍 Tecnologías Utilizadas

### Core Technologies (SwR-DC01)
- **HTML5**: Estructura semántica
- **CSS3**: Estilos con variables CSS, grid, flexbox
- **JavaScript ES6+**: Módulos, async/await, arrow functions

### Librerías y Frameworks
- **Leaflet.js 1.9.4**: Biblioteca de mapas interactivos
  - Ligera y rápida
  - Soporte nativo para GeoJSON
  - Mobile-friendly
  - [Documentación](https://leafletjs.com/)

### Herramientas de Desarrollo
- **live-server**: Servidor de desarrollo con hot-reload
- **ESLint**: Linter para calidad de código (ISO 5055)
- **Jest**: Framework de testing

## 🔍 Calidad del Código (ISO/IEC 5055:2021)

### Métricas de Calidad Implementadas

#### Mantenibilidad
- ✅ Complejidad ciclomática < 10
- ✅ Funciones < 50 líneas
- ✅ Profundidad de anidamiento < 4
- ✅ Nombres descriptivos (inglés)
- ✅ Comentarios con trazabilidad (// SwR-XXX)
- ✅ Estructura modular clara

#### Usabilidad (ISO/IEC 25010:2011)
- ✅ Interfaz intuitiva sin entrenamiento requerido
- ✅ Feedback visual en todas las acciones
- ✅ Mensajes de error claros y accionables
- ✅ Responsive design para múltiples dispositivos
- ✅ Contraste de colores adecuado (WCAG AA)
- ✅ Tamaños de fuente legibles

### Verificar Calidad

```bash
# Linting
npm run lint

# Fix automático
npm run lint:fix
```

## 👥 Equipo y Tareas

### Distribución de Tareas Frontend

| Miembro | Tareas Implementadas | Issues |
|---------|----------------------|--------|
| **@jeissonmp15** | SwR-F01 (Mapa Base), SwR-V03 (Tests UI) | #1, #5 |
| **@giancarloprieto** | SwR-F02 (Marcadores), SwR-U01/U02 (UI/UX) | #2, #6 |
| **@carlosperdomo376** | SwR-F07 (HTTP Client) | #3 |
| **@eab1362** | SwR-F03/F04 (Info Detallada) | #4 |

### Issues del Frontend

- [#1: Map Rendering SwR-F01](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/1) - @jeissonmp15
- [#2: Map Markers SwR-F02](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/2) - @giancarloprieto
- [#3: HTTP Client SwR-F07](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/3) - @carlosperdomo376
- [#4: Info Display SwR-F03/F04](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/4) - @eab1362
- [#5: UI Tests SwR-V03](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/5) - @jeissonmp15
- [#6: UI/UX Styles SwR-U01/U02](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues/6) - @giancarloprieto

## 🛠️ Desarrollo

### Estructura del Código

**Separación de Responsabilidades**:

- **Controllers**: Lógica de UI y eventos
- **Services**: Comunicación con API
- **Models**: Estructuras de datos (si es necesario)
- **Config**: Configuración centralizada

### Convenciones de Código

```javascript
// Formato de comentarios con trazabilidad
// SwR-XXX: Descripción del requisito
function nombreFuncion() {
  // Implementación
}

// Nombres en inglés, descriptivos
// Usar camelCase para variables y funciones
// Usar UPPER_CASE para constantes
```

## 🌐 Enlaces

- **Organización GitHub**: [SKYDATA-BOGOTA](https://github.com/SKYDATA-BOGOTA)
- **Repositorio Backend**: [skydata-backend](https://github.com/SKYDATA-BOGOTA/skydata-backend)
- **Issues Frontend**: [Ver Issues](https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues)
- **Documentación Completa**: Ver carpeta `docs/`

## 📚 Referencias

1. ISO/IEC/IEEE 29148:2018. *Systems and software engineering — Requirements engineering*.
2. ISO/IEC 12207:2017. *Systems and software engineering — Software life cycle processes*.
3. ISO/IEC 25010:2011. *Systems and software engineering — Quality models*.
4. W3C. *HTML5 Specification*. https://www.w3.org/TR/html5/
5. W3C. *CSS3 Specification*. https://www.w3.org/Style/CSS/
6. WCAG 2.1. *Web Content Accessibility Guidelines*. https://www.w3.org/WAI/WCAG21/
7. Leaflet.js Documentation. https://leafletjs.com/reference.html
8. RFC 7946. *The GeoJSON Format*. IETF, 2016.

## 📝 Licencia

Proyecto Académico - Universidad Distrital Francisco José de Caldas

## ✍️ Autores

- **Edgar Andrade** (@eab1362)
- **Giancarlo Prieto** (@giancarloprieto)
- **Carlos Perdomo** (@carlosperdomo376)
- **Jeisson Moreno** (@jeissonmp15)

---

**Última actualización**: 2024-01-15  
**Versión**: 1.0.0  
**Estado**: 🟢 Productivo