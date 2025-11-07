# SKYDATA Frontend - Aplicación Web

## Descripción del Proyecto

Frontend web para el Sistema de Visualización de Información Ambiental de Bogotá (SKYDATA).
Interfaz de usuario con mapa interactivo que muestra datos ambientales en tiempo real.

**Proyecto Académico** - Universidad Distrital Francisco José de Caldas  
**Curso**: Ingeniería de Software II  
**Propósito**: Demostración de competencias en ingeniería de software siguiendo estándares internacionales

## Cumplimiento Normativo

Este proyecto ha sido desarrollado siguiendo los siguientes estándares internacionales:

- **ISO/IEC/IEEE 29148:2018**: Requirements Engineering
- **ISO/IEC 12207:2017**: Software Life Cycle Processes (Sec 6.4.6.4)
- **ISO/IEC/IEEE 42010:2011**: Architecture Description
- **ISO/IEC 25010:2011**: Systems and Software Quality Models (Usability)
- **ISO/IEC 5055:2021**: Software Measurement

## Arquitectura

```
frontend/
├── index.html               # Punto de entrada
├── css/
│   ├── styles.css         # Estilos principales
│   └── map.css            # Estilos del mapa
├── js/
│   ├── main.js            # Inicialización
│   ├── controllers/
│   │   └── map.controller.js
│   ├── services/
│   │   └── data.service.js
│   ├── models/
│   │   └── location.model.js
│   └── config/
│       └── config.js
├── assets/
├── tests/
└── docs/
```

## Instalación

```bash
npm install
npm run dev
```

## Requisitos Implementados

| Requisito | Descripción | Implementación |
|-----------|-------------|----------------|
| SwR-F01 | Renderizado Mapa | Leaflet.js |
| SwR-F02 | Marcadores | L.marker() |
| SwR-F03 | Info Detallada | Popup/Panel |
| SwR-F07 | Cliente HTTP | fetch API |
| SwR-U01 | Usabilidad | Interfaz intuitiva |

## Tecnologías

- HTML5, CSS3, JavaScript ES6+
- Leaflet.js (Mapas)
- Fetch API (HTTP Client)

## Licencia

Proyecto Académico - Universidad Distrital