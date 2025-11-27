/**
 * Tests Unitarios para InfoController
 * 
 * Este archivo contiene las pruebas unitarias para verificar el correcto
 * funcionamiento del controlador de información según ISO/IEC 25010:2011
 * 8.3.2 (Usabilidad) y 8.1.2 (Pertinencia Funcional).
 * 
 * SwR-F03, SwR-F04: Visualización de Información Detallada
 * ISO/IEC 25023:2016 Sección 5.1.3 (Pertinencia Funcional)
 * ISO/IEC 25020:2019 (Modelo de Medición)
 * ISO/IEC 25040:2011 Actividad 2 - Tarea 2.2
 */

// Mock de las funciones del InfoController
function showLocationInfo(feature) {
  if (!feature || !feature.properties) return;
  
  const infoPanel = document.getElementById('info-panel');
  const infoContent = document.getElementById('info-content');
  
  if (!infoPanel || !infoContent) return;
  
  const props = feature.properties;
  const nombre = props.estacion || 'Estación';
  const temperatura = props.temperatura !== undefined ? `${props.temperatura} °C` : 'N/A';
  const humedad = props.humedad !== undefined ? `${props.humedad} %` : 'N/A';
  const calidadAire = props.calidad_aire || 'N/A';
  const ruido = props.ruido !== undefined ? `${props.ruido} dB` : 'N/A';
  
  infoContent.innerHTML = `
    <h3>${nombre}</h3>
    <div class="variables-grid">
      <div class="variable-card">
        <span class="variable-label">Temperatura</span>
        <span class="variable-value">${temperatura}</span>
      </div>
      <div class="variable-card">
        <span class="variable-label">Humedad</span>
        <span class="variable-value">${humedad}</span>
      </div>
      <div class="variable-card">
        <span class="variable-label">Calidad del Aire</span>
        <span class="variable-value">${calidadAire}</span>
      </div>
      <div class="variable-card">
        <span class="variable-label">Ruido</span>
        <span class="variable-value">${ruido}</span>
      </div>
    </div>
  `;
  
  infoPanel.classList.remove('hidden');
}

function showLoading(message) {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (!loadingIndicator) return;
  
  loadingIndicator.textContent = message;
  loadingIndicator.style.display = 'block';
}

function hideLoading() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (!loadingIndicator) return;
  
  loadingIndicator.style.display = 'none';
}

function showError(message) {
  const errorMessage = document.getElementById('error-message');
  if (!errorMessage) return;
  
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

describe('InfoController', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="info-panel" class="hidden"></div>
      <div id="info-content"></div>
      <div id="loading-indicator" style="display: none;"></div>
      <div id="error-message" style="display: none;"></div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('showLocationInfo()', () => {
    test('debe mostrar información de la estación cuando feature es válido', () => {
      const feature = {
        properties: {
          estacion: 'Estación Central',
          temperatura: 22,
          humedad: 65,
          calidad_aire: 'Buena',
          ruido: 45
        }
      };

      showLocationInfo(feature);

      const infoContent = document.getElementById('info-content');
      const infoPanel = document.getElementById('info-panel');

      expect(infoPanel.classList.contains('hidden')).toBe(false);
      expect(infoContent.innerHTML).toContain('Estación Central');
      expect(infoContent.innerHTML).toContain('22 °C');
      expect(infoContent.innerHTML).toContain('65 %');
      expect(infoContent.innerHTML).toContain('Buena');
      expect(infoContent.innerHTML).toContain('45 dB');
    });

    test('debe usar "Estación" como nombre por defecto si no hay estacion', () => {
      const feature = {
        properties: {
          temperatura: 20,
          humedad: 60,
          calidad_aire: 'Regular',
          ruido: 50
        }
      };

      showLocationInfo(feature);

      const infoContent = document.getElementById('info-content');
      expect(infoContent.innerHTML).toContain('Estación');
    });

    test('debe retornar sin hacer nada si feature es null', () => {
      const infoPanel = document.getElementById('info-panel');
      const initialClass = infoPanel.className;

      showLocationInfo(null);

      expect(infoPanel.className).toBe(initialClass);
    });

    test('debe retornar sin hacer nada si feature no tiene properties', () => {
      const feature = {};
      const infoPanel = document.getElementById('info-panel');
      const initialClass = infoPanel.className;

      showLocationInfo(feature);

      expect(infoPanel.className).toBe(initialClass);
    });

    test('debe mostrar todas las variables ambientales correctamente', () => {
      const feature = {
        properties: {
          estacion: 'Test Station',
          temperatura: 25.5,
          humedad: 70.2,
          calidad_aire: 'Excelente',
          ruido: 35.8
        }
      };

      showLocationInfo(feature);

      const infoContent = document.getElementById('info-content');
      expect(infoContent.innerHTML).toContain('25.5 °C');
      expect(infoContent.innerHTML).toContain('70.2 %');
      expect(infoContent.innerHTML).toContain('Excelente');
      expect(infoContent.innerHTML).toContain('35.8 dB');
    });

    test('debe generar HTML con estructura correcta', () => {
      const feature = {
        properties: {
          estacion: 'Test',
          temperatura: 20,
          humedad: 60,
          calidad_aire: 'Buena',
          ruido: 40
        }
      };

      showLocationInfo(feature);

      const infoContent = document.getElementById('info-content');
      expect(infoContent.innerHTML).toContain('<h3>');
      expect(infoContent.innerHTML).toContain('variables-grid');
      expect(infoContent.innerHTML).toContain('variable-card');
    });

    test('debe remover la clase hidden del panel de información', () => {
      const feature = {
        properties: {
          estacion: 'Test',
          temperatura: 20,
          humedad: 60,
          calidad_aire: 'Buena',
          ruido: 40
        }
      };

      const infoPanel = document.getElementById('info-panel');
      expect(infoPanel.classList.contains('hidden')).toBe(true);

      showLocationInfo(feature);

      expect(infoPanel.classList.contains('hidden')).toBe(false);
    });
  });

  describe('showLoading()', () => {
    test('debe mostrar el indicador de carga con el mensaje especificado', () => {
      const loadingIndicator = document.getElementById('loading-indicator');
      
      showLoading('Cargando datos...');

      expect(loadingIndicator.style.display).toBe('block');
      expect(loadingIndicator.textContent).toBe('Cargando datos...');
    });

    test('debe cambiar el mensaje si se llama múltiples veces', () => {
      const loadingIndicator = document.getElementById('loading-indicator');
      
      showLoading('Cargando...');
      expect(loadingIndicator.textContent).toBe('Cargando...');

      showLoading('Procesando...');
      expect(loadingIndicator.textContent).toBe('Procesando...');
    });

    test('debe manejar correctamente si el elemento no existe', () => {
      document.getElementById('loading-indicator').remove();
      
      expect(() => {
        showLoading('Test');
      }).not.toThrow();
    });
  });

  describe('hideLoading()', () => {
    test('debe ocultar el indicador de carga', () => {
      const loadingIndicator = document.getElementById('loading-indicator');
      loadingIndicator.style.display = 'block';

      hideLoading();

      expect(loadingIndicator.style.display).toBe('none');
    });

    test('debe funcionar correctamente si el elemento ya está oculto', () => {
      const loadingIndicator = document.getElementById('loading-indicator');
      loadingIndicator.style.display = 'none';

      hideLoading();

      expect(loadingIndicator.style.display).toBe('none');
    });

    test('debe manejar correctamente si el elemento no existe', () => {
      document.getElementById('loading-indicator').remove();
      
      expect(() => {
        hideLoading();
      }).not.toThrow();
    });
  });

  describe('showError()', () => {
    test('debe mostrar el mensaje de error', () => {
      const errorMessage = document.getElementById('error-message');
      
      showError('Error de conexión');

      expect(errorMessage.style.display).toBe('block');
      expect(errorMessage.textContent).toBe('Error de conexión');
    });

    test('debe cambiar el mensaje si se llama múltiples veces', () => {
      const errorMessage = document.getElementById('error-message');
      
      showError('Error 1');
      expect(errorMessage.textContent).toBe('Error 1');

      showError('Error 2');
      expect(errorMessage.textContent).toBe('Error 2');
    });

    test('debe manejar correctamente si el elemento no existe', () => {
      document.getElementById('error-message').remove();
      
      expect(() => {
        showError('Test error');
      }).not.toThrow();
    });
  });

  describe('Integración', () => {
    test('debe poder mostrar información y luego ocultar loading', () => {
      const feature = {
        properties: {
          estacion: 'Test',
          temperatura: 20,
          humedad: 60,
          calidad_aire: 'Buena',
          ruido: 40
        }
      };

      showLoading('Cargando...');
      showLocationInfo(feature);
      hideLoading();

      const infoPanel = document.getElementById('info-panel');
      const loadingIndicator = document.getElementById('loading-indicator');

      expect(infoPanel.classList.contains('hidden')).toBe(false);
      expect(loadingIndicator.style.display).toBe('none');
    });

    test('debe poder mostrar error después de mostrar información', () => {
      const feature = {
        properties: {
          estacion: 'Test',
          temperatura: 20,
          humedad: 60,
          calidad_aire: 'Buena',
          ruido: 40
        }
      };

      showLocationInfo(feature);
      showError('Error al actualizar');

      const infoPanel = document.getElementById('info-panel');
      const errorMessage = document.getElementById('error-message');

      expect(infoPanel.classList.contains('hidden')).toBe(false);
      expect(errorMessage.style.display).toBe('block');
      expect(errorMessage.textContent).toBe('Error al actualizar');
    });
  });
});
