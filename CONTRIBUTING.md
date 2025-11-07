# Guía de Contribución - SKYDATA Frontend

## 🎯 Contexto del Proyecto

**Estado Actual**: El proyecto frontend está 83% implementado (5 de 6 tareas completas).

TODO el código funcional está en la rama `main`. Las branches de features existen para:
- Demostrar el flujo de trabajo propuesto
- Permitir que cada colaborador revise su código asignado
- Facilitar la evaluación por parte del docente

## 👥 Tu Responsabilidad

Cada miembro del equipo tiene asignadas tareas específicas. Revisa los issues con tu @usuario en el título:

- Issues con **[@jeissonmp15]**: 2 tareas (#1, #5)
- Issues con **[@giancarloprieto]**: 2 tareas (#2, #6)
- Issues con **[@carlosperdomo376]**: 1 tarea (#3)
- Issues con **[@eab1362]**: 1 tarea (#4)

## 🔧 Configuración Inicial

### 1. Aceptar Invitación
- Revisa tu email de GitHub
- Acepta la invitación como colaborador

### 2. Clonar el Repositorio

```bash
git clone https://github.com/SKYDATA-BOGOTA/skydata-frontend.git
cd skydata-frontend
npm install
```

### 3. Configurar el Backend

El frontend necesita el backend corriendo:

```bash
# En otra terminal
git clone https://github.com/SKYDATA-BOGOTA/skydata-backend.git
cd skydata-backend
npm install
cp .env.example .env
npm run dev
```

### 4. Ejecutar el Frontend

```bash
# En tu terminal del frontend
npm run dev

# Abrir http://localhost:8080
```

## 📝 Cómo Revisar tu Código Asignado

### Si eres @jeissonmp15

**Tarea 1: Renderizado de Mapa (Issue #1)** ✅
```bash
git checkout feature/SwR-F01-map-rendering
cat js/controllers/map.controller.js
# Buscar función: initializeMap()
```

**Tarea 2: Pruebas UI (Issue #5)** ⏳
```bash
git checkout feature/SwR-V03-ui-tests
# Esta tarea está PENDIENTE de implementar
# Archivos a crear:
# - tests/map.controller.test.js
# - tests/data.service.test.js
# - docs/MANUAL_TESTING.md
```

### Si eres @giancarloprieto

**Tarea 1: Marcadores (Issue #2)** ✅
```bash
git checkout feature/SwR-F02-map-markers
cat js/controllers/map.controller.js
# Buscar función: renderMarkers()
```

**Tarea 2: Estilos UI/UX (Issue #6)** ✅
```bash
git checkout feature/SwR-U01-U02-ui-ux-styles
cat css/styles.css
cat css/map.css
# Ver: Variables CSS, grid layouts, responsive design
```

### Si eres @carlosperdomo376

**Tarea: Cliente HTTP (Issue #3)** ✅
```bash
git checkout feature/SwR-F07-I02-http-client
cat js/services/data.service.js
# Buscar función: fetchDatosAmbientales()
```

### Si eres @eab1362

**Tarea: Visualización Info Detallada (Issue #4)** ✅
```bash
git checkout feature/SwR-F03-F04-info-display
cat js/controllers/info.controller.js
# Ver funciones: showLocationInfo(), formatTemperatura(), etc.
```

## ✅ Checklist de Verificación

Para cada tarea asignada:

- [ ] He clonado el repositorio
- [ ] He revisado el issue asignado a mí
- [ ] He ejecutado el proyecto localmente
- [ ] He verificado que mi código funciona
- [ ] He revisado la trazabilidad en los comentarios
- [ ] Entiendo cómo mi código cumple con los requisitos SwR
- [ ] He leído el README.md completo

## 📚 Recursos de Referencia

### Documentos del Proyecto
1. **BRS, SRS, SyRS**: Ver carpeta `1. REQUERIMIENTOS/`
2. **Architecture Description**: Ver carpeta `2. ARQUITECTURA/`
3. **Construction Plan**: Ver carpeta `3. CONSTRUCCIÓN/`

### Estándares ISO
1. **ISO 29148**: Requirements Engineering
2. **ISO 12207**: Software Life Cycle
3. **ISO 25010**: Usability
4. **ISO 5055**: Quality Measurement

### Tutoriales
1. **Leaflet.js**: https://leafletjs.com/examples.html
2. **Fetch API**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
3. **ES6 Modules**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

## 🤝 Colaboración

### Code Review

Cuando revises código de compañeros:

1. Verificar trazabilidad (comentarios // SwR-XXX)
2. Verificar que funciona correctamente
3. Verificar cumplimiento de estándares
4. Dar feedback constructivo

### Comunicación

- **Issues**: Para discutir tareas específicas
- **PRs**: Para review de código  
- **Commits**: Para documentar cambios

## 📞 Ayuda

Si tienes dudas:

1. Revisa el README.md
2. Revisa los documentos en `docs/`
3. Pregunta en el issue correspondiente
4. Menciona a otro miembro del equipo

---

**Equipo SKYDATA** 🚀  
**Universidad Distrital Francisco José de Caldas**