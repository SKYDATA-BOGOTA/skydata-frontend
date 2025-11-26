# Guía de Instalación - Frontend SKYDATA

**Base Normativa:** ISO/IEC 25010:2011 8.8.2 (Installability)

---

## Requisitos del Sistema

### Requisitos Mínimos

- **Node.js**: Versión 18.x o superior
- **npm**: Versión 9.x o superior
- **RAM**: Mínimo 2GB
- **Espacio en disco**: 500MB libres

### Requisitos Recomendados

- **Node.js**: Versión 20.x LTS
- **RAM**: 4GB o superior
- **Espacio en disco**: 2GB libres

---

## Instalación Local

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/SKYDATA-BOGOTA/skydata-frontend.git
cd skydata-frontend
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Configurar Variables de Entorno

Copiar `.env.example` a `.env`:

```bash
cp .env.example .env
```

Editar `.env` con la configuración necesaria:

```env
API_URL=http://localhost:3001
NODE_ENV=development
```

### Paso 4: Ejecutar en Modo Desarrollo

```bash
npm start
```

El frontend estará disponible en `http://localhost:3000`

### Paso 5: Verificar Instalación

Abrir navegador en `http://localhost:3000` y verificar que:
- El mapa se carga correctamente
- Los marcadores se muestran
- La información se muestra al hacer clic en marcadores

---

## Instalación con Docker

### Requisitos

- Docker 20.x o superior
- Docker Compose 2.x o superior

### Paso 1: Crear Red Docker (si no existe)

```bash
docker network create skydata-network
```

### Paso 2: Construir Imagen Docker

```bash
docker build -t skydata-frontend .
```

### Paso 3: Ejecutar con Docker Compose

```bash
docker-compose up -d
```

### Paso 4: Verificar Instalación

```bash
docker-compose ps
docker-compose logs frontend
curl http://localhost:3000
```

---

## Compatibilidad con Sistemas Operativos

El frontend ha sido probado y funciona en:

- ✅ **Windows 10/11** (con Node.js 18.x/20.x)
- ✅ **Linux** (Ubuntu 20.04+, Debian 11+, CentOS 8+)
- ✅ **macOS** (10.15+, con Node.js 18.x/20.x)

---

## Troubleshooting

### Error: Puerto 3000 ya está en uso

```bash
# Windows
netstat -ano | findstr :3000
# Linux/macOS
lsof -i :3000
```

Cambiar el puerto en `.env` o detener el proceso que usa el puerto.

### Error: Dependencias no se instalan

```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: El mapa no se carga

Verificar que:
- El backend está ejecutándose en `http://localhost:3001`
- La variable `API_URL` está configurada correctamente
- No hay errores de CORS

---

## Verificación de Instalación según ISO 25010:2011 8.8.2

- ✅ Node.js versión compatible instalado
- ✅ Dependencias instaladas correctamente
- ✅ Variables de entorno configuradas
- ✅ Aplicación inicia correctamente
- ✅ Mapa se carga y muestra marcadores
- ✅ Interacciones funcionan correctamente

---

**Última Actualización**: 2025-01-XX
**Mantenido por**: Proyecto SKYDATA según ISO 25000

