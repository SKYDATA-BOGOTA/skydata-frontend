# Matriz de Trazabilidad - SKYDATA Frontend

## Trazabilidad: BRS → StRS → SyRS → SRS → Código

### Requisitos Software → Código

| SwR | Descripción | Archivo Principal | ISO/Norma |
|-----|-------------|-------------------|----------|
| SwR-F01 | Renderizado Mapa | `js/controllers/map.controller.js` | ISO 12207 Sec 6.4.6.4 |
| SwR-F02 | Marcadores | `js/controllers/map.controller.js` | CU-01 |
| SwR-F03 | Info Detallada | `js/controllers/info.controller.js` | CU-02 |
| SwR-F04 | Formato Presentación | `js/models/location.model.js` | SwR-DB01 |
| SwR-F07 | Cliente HTTP | `js/services/data.service.js` | ADR-01 |
| SwR-I01 | Interfaz Web | `index.html`, `css/` | ISO 25010 Usability |
| SwR-I02 | Cliente HTTP | `js/services/data.service.js` | SyR-I02 |
| SwR-U01 | Usabilidad | `css/styles.css` | ISO 25010:2011 |
| SwR-U02 | Feedback Visual | `css/styles.css` | ISO 25010:2011 |
| SwR-DC01 | Tecnologías Web | HTML5, CSS3, JS ES6+ | SwR-DC01 |

### Casos de Uso → Código

| Caso de Uso | Implementación Principal | Archivos Relacionados |
|-------------|--------------------------|----------------------|
| CU-01 | `js/main.js`, `js/controllers/map.controller.js` | SwR-F01, SwR-F02, SwR-F07 |
| CU-02 | `js/controllers/info.controller.js` | SwR-F03, SwR-F04 |

### ISOs Aplicadas

| ISO | Sección | Aplicación en Código |
|-----|---------|---------------------|
| ISO/IEC/IEEE 29148:2018 | Sec 9.6.4, 9.6.13 | Estructura y Usabilidad |
| ISO/IEC 12207:2017 | Sec 6.4.6.4 | Implementation Process |
| ISO/IEC 25010:2011 | Sec 4.2.3 | Usability |
| ISO/IEC 5055:2021 | Completo | ESLint, calidad código |