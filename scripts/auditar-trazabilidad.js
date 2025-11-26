/**
 * Script de Auditoría de Comentarios de Trazabilidad
 * 
 * Verifica que todas las funciones tienen comentarios que referencian requisitos
 * según ISO/IEC/IEEE 29148:2018 Sección 8.4 (Requirements Traceability).
 * 
 * ISO/IEC 25040:2011 Actividad 1 - Tarea 1.4 (Requisitos de Rigurosidad - Trazabilidad)
 */

const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, '..', 'js');
const results = {
  archivos: [],
  totalFunciones: 0,
  funcionesConTrazabilidad: 0,
  funcionesSinTrazabilidad: [],
  porcentaje: 0
};

/**
 * Busca funciones en un archivo JavaScript
 */
function encontrarFunciones(contenido, archivo) {
  const funciones = [];
  
  // Buscar funciones: function nombre() o nombre = function() o nombre = () =>
  const patrones = [
    /(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*\(/g,
    /(?:export\s+)?(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?function\s*\(/g,
    /(?:export\s+)?(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?\([^)]*\)\s*=>/g,
    /class\s+(\w+)/g,
    /(?:export\s+)?(?:const|let|var)\s+(\w+)\s*=\s*new\s+\w+\(/g
  ];
  
  patrones.forEach(patron => {
    let match;
    while ((match = patron.exec(contenido)) !== null) {
      const nombre = match[1];
      const linea = contenido.substring(0, match.index).split('\n').length;
      
      // Verificar si tiene comentario SwR-XX antes
      const inicioArchivo = contenido.substring(0, match.index);
      const ultimasLineas = inicioArchivo.split('\n').slice(-10).join('\n');
      const tieneTrazabilidad = /SwR-[A-Z0-9]+/.test(ultimasLineas);
      
      funciones.push({
        nombre,
        linea,
        tieneTrazabilidad,
        archivo: path.basename(archivo)
      });
    }
  });
  
  return funciones;
}

/**
 * Procesa un archivo JavaScript
 */
function procesarArchivo(archivoPath) {
  const contenido = fs.readFileSync(archivoPath, 'utf8');
  const funciones = encontrarFunciones(contenido, archivoPath);
  
  const archivoInfo = {
    nombre: path.basename(archivoPath),
    ruta: archivoPath,
    funciones: funciones,
    totalFunciones: funciones.length,
    funcionesConTrazabilidad: funciones.filter(f => f.tieneTrazabilidad).length,
    funcionesSinTrazabilidad: funciones.filter(f => !f.tieneTrazabilidad)
  };
  
  results.archivos.push(archivoInfo);
  results.totalFunciones += funciones.length;
  results.funcionesConTrazabilidad += archivoInfo.funcionesConTrazabilidad;
  
  archivoInfo.funcionesSinTrazabilidad.forEach(f => {
    results.funcionesSinTrazabilidad.push({
      archivo: archivoInfo.nombre,
      funcion: f.nombre,
      linea: f.linea
    });
  });
}

/**
 * Recorre recursivamente un directorio
 */
function recorrerDirectorio(dir) {
  const archivos = fs.readdirSync(dir);
  
  archivos.forEach(archivo => {
    const archivoPath = path.join(dir, archivo);
    const stat = fs.statSync(archivoPath);
    
    if (stat.isDirectory()) {
      recorrerDirectorio(archivoPath);
    } else if (archivo.endsWith('.js')) {
      procesarArchivo(archivoPath);
    }
  });
}

// Ejecutar auditoría
console.log('=== Auditoría de Comentarios de Trazabilidad ===\n');
console.log('ISO/IEC/IEEE 29148:2018 Sección 8.4 (Requirements Traceability)\n');

recorrerDirectorio(jsDir);

// Calcular porcentaje
results.porcentaje = results.totalFunciones > 0
  ? ((results.funcionesConTrazabilidad / results.totalFunciones) * 100).toFixed(2)
  : 0;

// Mostrar resultados
console.log('RESULTADOS GENERALES:');
console.log(`Total de archivos procesados: ${results.archivos.length}`);
console.log(`Total de funciones encontradas: ${results.totalFunciones}`);
console.log(`Funciones con trazabilidad (SwR-XX): ${results.funcionesConTrazabilidad}`);
console.log(`Funciones sin trazabilidad: ${results.funcionesSinTrazabilidad.length}`);
console.log(`Porcentaje de trazabilidad: ${results.porcentaje}%\n`);

console.log('DETALLE POR ARCHIVO:');
results.archivos.forEach(archivo => {
  const porcentajeArchivo = archivo.totalFunciones > 0
    ? ((archivo.funcionesConTrazabilidad / archivo.totalFunciones) * 100).toFixed(2)
    : 0;
  
  console.log(`\n${archivo.nombre}:`);
  console.log(`  Total funciones: ${archivo.totalFunciones}`);
  console.log(`  Con trazabilidad: ${archivo.funcionesConTrazabilidad}`);
  console.log(`  Sin trazabilidad: ${archivo.funcionesSinTrazabilidad.length}`);
  console.log(`  Porcentaje: ${porcentajeArchivo}%`);
  
  if (archivo.funcionesSinTrazabilidad.length > 0) {
    console.log(`  Funciones sin trazabilidad:`);
    archivo.funcionesSinTrazabilidad.forEach(f => {
      console.log(`    - ${f.funcion} (línea ${f.linea})`);
    });
  }
});

if (results.funcionesSinTrazabilidad.length > 0) {
  console.log('\n⚠️  FUNCIONES SIN TRAZABILIDAD:');
  results.funcionesSinTrazabilidad.forEach(f => {
    console.log(`  ${f.archivo}::${f.funcion} (línea ${f.linea})`);
  });
}

console.log('\n=== FIN DE AUDITORÍA ===');

// Guardar resultados en JSON
const resultadosPath = path.join(__dirname, '..', 'auditoria-trazabilidad.json');
fs.writeFileSync(resultadosPath, JSON.stringify(results, null, 2));
console.log(`\nResultados guardados en: ${resultadosPath}`);

// Exit code según resultado
process.exit(results.funcionesSinTrazabilidad.length > 0 ? 1 : 0);

