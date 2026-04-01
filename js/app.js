/**
 * app.js - Entry point: khởi tạo profile system, gắn event listeners
 */

(function init() {
  // Khởi tạo profile system (migrate data cũ nếu cần)
  Storage.init();
  State.collected = Storage.load();

  // Event listeners
  document.getElementById('search-input').addEventListener('input', () => Renderer.renderAll());
  document.getElementById('filter-rarity').addEventListener('change', () => Renderer.renderAll());
  document.getElementById('filter-status').addEventListener('change', () => Renderer.renderAll());
  document.getElementById('btn-reset').addEventListener('click', () => Popup.showResetConfirm());
  document.getElementById('btn-builds').addEventListener('click', () => Builds.showPanel());
  document.getElementById('btn-analyzer').addEventListener('click', () => Analyzer.showPanel());
  document.getElementById('btn-profiles').addEventListener('click', () => Profiles.showPanel());

  // Hiển thị tên profile hiện tại
  Profiles.initIndicator();

  // Render
  Renderer.renderAll();
})();
