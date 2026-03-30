/**
 * setup.js - Load HTML + eval modules vào global scope cho Jest
 */

const fs = require('fs');
const path = require('path');

function createTestEnv() {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  document.documentElement.innerHTML = html;

  global.alert = jest.fn();
  global.confirm = jest.fn(() => true);
  global.prompt = jest.fn((msg, def) => def || 'Test');

  const scripts = [
    'data.js',
    'js/storage.js',
    'js/state.js',
    'js/popup.js',
    'js/renderer.js',
    'js/analyzer.js',
    'js/profiles.js',
  ];

  for (const script of scripts) {
    const code = fs.readFileSync(path.join(__dirname, '..', script), 'utf8');
    const fn = new Function(code);
    fn.call(global);
  }

  // Gắn tất cả vào global (vì new Function chạy trong scope riêng)
  // Các const/let trong script không leak ra global, nên cần eval
  const allCode = scripts.map(s =>
    fs.readFileSync(path.join(__dirname, '..', s), 'utf8')
  ).join('\n;\n');

  // eval trong global scope
  const script = new Function(`
    ${allCode}
    Object.assign(this, {
      GAME_DATA, SECTION_META, Storage, State, Popup, Renderer, Analyzer, Profiles,
      SECTION_ICONS, RARITY_LABELS, IMG, HTR, RSN, R2W
    });
  `);
  script.call(global);
}

module.exports = { createTestEnv };
