/**
 * Configuración de Babel para Jest
 * 
 * Transforma módulos ES6 a CommonJS para compatibilidad con Jest
 * 
 * SwR-V01: Configuración de entorno de pruebas
 */

module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      }
    }]
  ]
};

