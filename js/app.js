/**
 * app.js - Entry point: page routing, init
 */

(function init() {
  Storage.init();
  State.collected = Storage.load();

  // === Page routing ===
  function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`page-${name}`)?.classList.add('active');
    document.querySelector(`.page-btn[data-page="${name}"]`)?.classList.add('active');

    if (name === 'builds') Builds.renderPage();
    if (name === 'analyzer') Analyzer.renderPage();
  }

  document.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.page));
  });

  // === Checklist controls ===
  document.getElementById('search-input').addEventListener('input', () => Renderer.renderAll());
  document.getElementById('filter-rarity').addEventListener('change', () => Renderer.renderAll());
  document.getElementById('filter-status').addEventListener('change', () => Renderer.renderAll());
  document.getElementById('btn-reset').addEventListener('click', () => Popup.showResetConfirm());
  document.getElementById('btn-profiles').addEventListener('click', () => Profiles.showPanel());

  Profiles.initIndicator();
  Renderer.renderAll();
})();
