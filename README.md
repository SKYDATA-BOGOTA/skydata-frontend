# SKYDATA Frontend - Scaffolding

## Estado de la Rama Main

⚠️ **Esta rama contiene SOLO el scaffolding inicial del proyecto.**

**El código funcional está en las branches de features.**

## Estructura del Proyecto (Scaffolding)

```
frontend/
├── index.html               # HTML base
├── css/
│   ├── styles.css         # Estilos (en branches)
│   └── map.css            # Estilos mapa (en branches)
├── js/
│   ├── config/            # Configuración
│   ├── controllers/       # Controladores (en branches)
│   ├── services/          # Servicios (en branches)
│   └── models/            # Modelos
├── assets/
├── tests/
├── .gitignore
├── .eslintrc.json
├── package.json
└── README.md
```

## Branches con Implementaciones

| Branch | Issue | Responsable | Descripción |
|--------|-------|-------------|-------------|
| `feature/SwR-F01-map-rendering` | #1 | @jeissonmp15 | Renderizado Mapa |
| `feature/SwR-F02-map-markers` | #2 | @giancarloprieto | Marcadores |
| `feature/SwR-F07-I02-http-client` | #3 | @carlosperdomo376 | Cliente HTTP |
| `feature/SwR-F03-F04-info-display` | #4 | @eab1362 | Info Detallada |
| `feature/SwR-V03-ui-tests` | #5 | @jeissonmp15 | Tests UI (Pendiente) |
| `feature/SwR-U01-U02-ui-ux-styles` | #6 | @giancarloprieto | UI/UX Estilos |

## Cómo Trabajar

```bash
git clone https://github.com/SKYDATA-BOGOTA/skydata-frontend.git
cd skydata-frontend
git checkout feature/SwR-XXX-tu-feature
npm install
npm run dev
```

## Enlaces

- **Backend**: https://github.com/SKYDATA-BOGOTA/skydata-backend
- **Issues**: https://github.com/SKYDATA-BOGOTA/skydata-frontend/issues
- **Proyecto**: https://github.com/orgs/SKYDATA-BOGOTA/projects/1