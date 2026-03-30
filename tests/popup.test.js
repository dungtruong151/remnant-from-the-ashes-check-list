/**
 * popup.test.js - Kiểm tra popup chi tiết item và dialog reset
 */

const { createTestEnv } = require('./setup');

let env;
beforeAll(() => { env = createTestEnv(); });
beforeEach(() => {
  localStorage.clear();
  Storage.init();
  State.collected = {};
  // Xóa popup cũ
  document.querySelectorAll('.popup-overlay, .overlay').forEach(el => el.remove());
});

describe('Popup - showItem()', () => {
  const testItem = {
    id: 'hunting_rifle', name: 'Hunting Rifle', location: 'Starter (Hunter)',
    rarity: 'normal', image: 'test.png', guide: 'Chọn class Hunter.',
    effect: null, bonus: null, altKill: null,
  };

  test('tạo popup overlay', () => {
    Popup.showItem(testItem, 'weapons');
    expect(document.querySelector('.popup-overlay')).toBeTruthy();
    expect(document.querySelector('.popup')).toBeTruthy();
  });

  test('hiển thị tên item', () => {
    Popup.showItem(testItem, 'weapons');
    expect(document.querySelector('.popup-title').textContent).toBe('Hunting Rifle');
  });

  test('hiển thị rarity badge', () => {
    Popup.showItem(testItem, 'weapons');
    const badge = document.querySelector('.popup-rarity');
    expect(badge.textContent).toBe('Thường');
  });

  test('hiển thị vị trí', () => {
    Popup.showItem(testItem, 'weapons');
    const values = document.querySelectorAll('.popup-detail-value');
    expect(values[0].textContent).toBe('Starter (Hunter)');
  });

  test('hiển thị guide', () => {
    Popup.showItem(testItem, 'weapons');
    const labels = document.querySelectorAll('.popup-detail-label');
    const hasGuide = Array.from(labels).some(l => l.textContent === 'Cách lấy');
    expect(hasGuide).toBe(true);
  });

  test('hiển thị danh mục', () => {
    Popup.showItem(testItem, 'weapons');
    const values = document.querySelectorAll('.popup-detail-value');
    const hasCategory = Array.from(values).some(v => v.textContent === 'Vũ Khí');
    expect(hasCategory).toBe(true);
  });

  test('nút thu thập hiển thị đúng khi chưa collect', () => {
    Popup.showItem(testItem, 'weapons');
    const btn = document.querySelector('[data-action="toggle"]');
    expect(btn.textContent).toContain('Đã thu thập');
  });

  test('nút thu thập hiển thị đúng khi đã collect', () => {
    State.collected = { hunting_rifle: true };
    Popup.showItem(testItem, 'weapons');
    const btn = document.querySelector('[data-action="toggle"]');
    expect(btn.textContent).toContain('Bỏ đánh dấu');
  });

  test('nút close đóng popup', () => {
    Popup.showItem(testItem, 'weapons');
    document.querySelector('.popup-close').click();
    expect(document.querySelector('.popup-overlay')).toBeNull();
  });

  test('hiển thị wiki link', () => {
    Popup.showItem(testItem, 'weapons');
    const link = document.querySelector('.popup-btn-wiki');
    expect(link.href).toContain('fextralife.com');
    expect(link.href).toContain('Hunting+Rifle');
  });

  test('hiển thị alt kill cho boss', () => {
    const boss = { ...testItem, id: 'singe', name: 'Singe', altKill: 'Cắt đuôi' };
    Popup.showItem(boss, 'bosses');
    const labels = document.querySelectorAll('.popup-detail-label');
    const hasAltKill = Array.from(labels).some(l => l.textContent === 'Cách giết khác');
    expect(hasAltKill).toBe(true);
  });

  test('KHÔNG hiển thị alt kill khi giá trị là "Khong"', () => {
    const boss = { ...testItem, altKill: 'Khong' };
    Popup.showItem(boss, 'bosses');
    const labels = document.querySelectorAll('.popup-detail-label');
    const hasAltKill = Array.from(labels).some(l => l.textContent === 'Cách giết khác');
    expect(hasAltKill).toBe(false);
  });
});

describe('Popup - showResetConfirm()', () => {
  test('tạo dialog xác nhận', () => {
    Popup.showResetConfirm();
    expect(document.querySelector('.overlay')).toBeTruthy();
    expect(document.querySelector('.dialog')).toBeTruthy();
  });

  test('nút Hủy đóng dialog', () => {
    Popup.showResetConfirm();
    document.querySelector('[data-action="cancel"]').click();
    expect(document.querySelector('.overlay')).toBeNull();
  });

  test('nút Xóa hết reset data', () => {
    State.collected = { a: true, b: true };
    Storage.save(State.collected);
    Popup.showResetConfirm();
    document.querySelector('[data-action="confirm"]').click();
    expect(State.collected).toEqual({});
    expect(Storage.load()).toEqual({});
    expect(document.querySelector('.overlay')).toBeNull();
  });
});
