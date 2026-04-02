/**
 * renderer.test.js - Kiểm tra render: nav, cards, sections, stats
 */

const { createTestEnv } = require('./setup');

let env;
beforeAll(() => { env = createTestEnv(); });
beforeEach(() => {
  localStorage.clear();
  Storage.init();
  State.collected = {};
  State.activeSection = null;
});

describe('Renderer - renderAll()', () => {
  test('render không throw error', () => {
    expect(() => Renderer.renderAll()).not.toThrow();
  });

  test('render tạo nav buttons', () => {
    Renderer.renderAll();
    const nav = document.getElementById('category-nav');
    const btns = nav.querySelectorAll('.nav-btn');
    // 1 "Tất cả" + 7 sections = 8
    expect(btns.length).toBe(8);
  });

  test('nav button đầu tiên là "Tất cả" và active', () => {
    Renderer.renderAll();
    const firstBtn = document.querySelector('.nav-btn');
    expect(firstBtn.textContent).toContain('Tất cả');
    expect(firstBtn.classList.contains('active')).toBe(true);
  });

  test('render tạo 7 sections', () => {
    Renderer.renderAll();
    const sections = document.querySelectorAll('.section');
    expect(sections.length).toBe(7);
  });

  test('mỗi section có banner', () => {
    Renderer.renderAll();
    const banners = document.querySelectorAll('.section-banner');
    expect(banners.length).toBe(7);
  });

  test('render tạo item cards', () => {
    Renderer.renderAll();
    const cards = document.querySelectorAll('.item-card');
    expect(cards.length).toBe(305);
  });

  test('global stats hiển thị 0% ban đầu', () => {
    Renderer.renderAll();
    expect(document.getElementById('total-progress').textContent).toBe('0%');
    expect(document.getElementById('total-collected').textContent).toBe('0/305');
    expect(document.getElementById('total-sections-text').textContent).toBe('0/7 danh mục');
  });
});

describe('Renderer - activeSection filter', () => {
  test('chọn section chỉ hiển thị section đó', () => {
    State.activeSection = 'weapons';
    Renderer.renderAll();
    const sections = document.querySelectorAll('.section');
    expect(sections.length).toBe(1);
    expect(sections[0].id).toBe('section-weapons');
  });

  test('quay lại "Tất cả" hiển thị đủ 7', () => {
    State.activeSection = 'weapons';
    Renderer.renderAll();
    State.activeSection = null;
    Renderer.renderAll();
    expect(document.querySelectorAll('.section').length).toBe(7);
  });
});

describe('Renderer - collected state', () => {
  test('item card có class "collected" khi đã thu thập', () => {
    State.collected = { hunting_rifle: true };
    Renderer.renderAll();
    const cards = document.querySelectorAll('.item-card.collected');
    expect(cards.length).toBe(1);
  });

  test('global stats cập nhật khi có items collected', () => {
    State.collected = { hunting_rifle: true, ruin: true, devastator: true };
    Renderer.renderAll();
    expect(document.getElementById('total-collected').textContent).toBe('3/305');
    expect(document.getElementById('total-progress').textContent).toBe('1%');
  });

  test('collected badge hiển thị trên card', () => {
    State.collected = { hunting_rifle: true };
    Renderer.renderAll();
    const badges = document.querySelectorAll('.item-collected-badge');
    expect(badges.length).toBe(1);
  });
});

describe('Renderer - no results', () => {
  test('hiển thị no-results khi search không khớp', () => {
    document.getElementById('search-input').value = 'xyznonexistent999';
    Renderer.renderAll();
    expect(document.querySelector('.no-results')).toBeTruthy();
    document.getElementById('search-input').value = '';
  });
});
