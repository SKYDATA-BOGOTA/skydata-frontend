// SwR-F03, SwR-F04: Info Detallada
export function showLocationInfo(feature) {
  const infoContent = document.getElementById('info-content');
  const infoPanel = document.getElementById('info-panel');
  
  if (!feature || !feature.properties) return;
  
  const p = feature.properties;
  const html = `
    <div class="station-info">
      <h3>${p.estacion || 'Estación'}</h3>
      <div class="variables-grid">
        <div class="variable-card">
          <span>🌡️ Temperatura</span>
          <span class="value">${p.temperatura} °C</span>
        </div>
        <div class="variable-card">
          <span>💧 Humedad</span>
          <span class="value">${p.humedad} %</span>
        </div>
        <div class="variable-card">
          <span>🌫️ Calidad Aire</span>
          <span class="value">${p.calidad_aire}</span>
        </div>
        <div class="variable-card">
          <span>🔊 Ruido</span>
          <span class="value">${p.ruido} dB</span>
        </div>
      </div>
    </div>
  `;
  infoContent.innerHTML = html;
  infoPanel.classList.remove('hidden');
}

export function showLoading(msg) {
  const el = document.getElementById('loading-indicator');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

export function hideLoading() {
  const el = document.getElementById('loading-indicator');
  if (el) el.style.display = 'none';
}

export function showError(msg) {
  const el = document.getElementById('error-message');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}