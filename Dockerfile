# Dockerfile para Frontend SKYDATA
# Base Normativa: ISO/IEC 25010:2011 8.8.1 (Adaptability)

FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 8080

# Comando para iniciar (usamos el script dev que ya configuramos con http-server)
CMD ["npm", "run", "dev"]