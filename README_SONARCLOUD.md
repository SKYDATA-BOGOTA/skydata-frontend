# Configuración de SonarCloud para SKYDATA Frontend

## Descripción

Este proyecto utiliza SonarCloud para análisis estático avanzado de código según ISO/IEC 5055:2021 (Source Code Quality Measurement).

## Base Normativa

- **ISO/IEC 5055:2021**: Source Code Quality Measurement
- **ISO/IEC 25010:2011 8.5.1**: Mantenibilidad
- **ISO/IEC 12207:2017 6.4.6.4.1**: Code Quality

## Configuración Inicial

### Paso 1: Crear cuenta en SonarCloud

1. Ir a https://sonarcloud.io/
2. Iniciar sesión con GitHub
3. Autorizar SonarCloud para acceder a la organización SKYDATA-BOGOTA

### Paso 2: Crear proyecto en SonarCloud

1. En SonarCloud, crear un nuevo proyecto
2. Seleccionar la organización: `SKYDATA-BOGOTA`
3. Seleccionar el repositorio: `skydata-frontend`
4. SonarCloud generará automáticamente un `SONAR_TOKEN`

### Paso 3: Configurar secreto en GitHub

1. Ir a: https://github.com/SKYDATA-BOGOTA/skydata-frontend/settings/secrets/actions
2. Agregar un nuevo secreto:
   - **Nombre**: `SONAR_TOKEN`
   - **Valor**: El token generado por SonarCloud

### Paso 4: Verificar configuración

El pipeline CI/CD ejecutará automáticamente el análisis de SonarCloud en cada PR y push.

## Qué Analiza SonarCloud

SonarCloud proporciona análisis de:

- **Bugs**: Errores en el código que pueden causar comportamiento incorrecto
- **Vulnerabilidades**: Problemas de seguridad
- **Code Smells**: Problemas de mantenibilidad y calidad de código
- **Cobertura de código**: Porcentaje de código cubierto por tests
- **Duplicación**: Código duplicado
- **Complejidad**: Complejidad ciclomática
- **Deuda técnica**: Tiempo estimado para corregir problemas

## Métricas según ISO 5055:2021

SonarCloud mide:

- **Complejidad Ciclomática**: Máximo 10 por función (configurado)
- **Líneas por función**: Máximo 120 caracteres (configurado)
- **Cobertura de código**: Integrado con reportes de Jest
- **Duplicación**: Detecta código duplicado
- **Mantenibilidad**: Rating A-E basado en code smells

## Integración con GitHub

SonarCloud se integra automáticamente con GitHub para:

- Mostrar análisis de calidad en Pull Requests
- Bloquear merges si la calidad no cumple umbrales (opcional)
- Mostrar badges de calidad en el README
- Generar reportes de calidad históricos

## Archivos de Configuración

- **`.github/workflows/ci-cd-iso-25000.yml`**: Job de SonarCloud en el pipeline
- **`sonar-project.properties`**: Configuración del proyecto SonarCloud

## Comandos Locales (Opcional)

Para ejecutar análisis localmente (requiere SonarQube Server):

```bash
# Instalar SonarScanner
npm install -g sonarqube-scanner

# Ejecutar análisis
sonar-scanner
```

## Enlaces Útiles

- SonarCloud: https://sonarcloud.io/
- Documentación: https://docs.sonarcloud.io/
- Dashboard del proyecto: https://sonarcloud.io/project/overview?id=SKYDATA-BOGOTA_skydata-frontend

## Notas

- El análisis de SonarCloud no bloquea el pipeline por defecto (`continue-on-error: true`)
- Esto permite que el proyecto funcione mientras se configura SonarCloud inicialmente
- Una vez configurado, se puede cambiar a `continue-on-error: false` para bloquear merges con problemas de calidad

## Trazabilidad

- SwR-M01, SwR-M02: Mantenibilidad del Código
- Documento: `10_Pipeline_CI_CD_ISO_25000.tex`
- Issue: #42
