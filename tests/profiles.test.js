/**
 * profiles.test.js - Kiểm tra UI quản lý profiles
 */

const { createTestEnv } = require('./setup');

let env;
beforeAll(() => { env = createTestEnv(); });
beforeEach(() => {
  localStorage.clear();
  Storage.init();
  State.collected = Storage.load();
  document.querySelectorAll('.popup-overlay').forEach(el => el.remove());
});

describe('Profiles - showPanel()', () => {
  test('tạo popup overlay', () => {
    Profiles.showPanel();
    expect(document.querySelector('.popup-overlay')).toBeTruthy();
    expect(document.querySelector('.profiles-popup')).toBeTruthy();
  });

  test('hiển thị danh sách profiles', () => {
    Profiles.showPanel();
    const items = document.querySelectorAll('.profile-item');
    expect(items.length).toBe(1);
  });

  test('profile active có class "active"', () => {
    Profiles.showPanel();
    const activeItem = document.querySelector('.profile-item.active');
    expect(activeItem).toBeTruthy();
  });

  test('có nút tạo profile mới', () => {
    Profiles.showPanel();
    expect(document.querySelector('#profile-create')).toBeTruthy();
  });

  test('có nút xuất file', () => {
    Profiles.showPanel();
    expect(document.querySelector('#profile-export')).toBeTruthy();
  });

  test('có nút nhập file', () => {
    Profiles.showPanel();
    expect(document.querySelector('#profile-import')).toBeTruthy();
  });

  test('close popup bằng nút X', () => {
    Profiles.showPanel();
    document.querySelector('.popup-close').click();
    expect(document.querySelector('.popup-overlay')).toBeNull();
  });

  test('hiển thị số items collected cho mỗi profile', () => {
    State.toggle('hunting_rifle');
    State.toggle('ruin');
    Profiles.showPanel();
    const meta = document.querySelector('.profile-meta');
    expect(meta.textContent).toContain('2/279');
  });
});

describe('Profiles - Multi profile', () => {
  test('tạo profile thứ 2 hiển thị 2 items', () => {
    Storage.createProfile('Player 2');
    Profiles.showPanel();
    const items = document.querySelectorAll('.profile-item');
    expect(items.length).toBe(2);
  });

  test('profile không active có nút chuyển', () => {
    Storage.createProfile('Player 2');
    // Chuyển về profile đầu
    const firstId = Storage.getProfiles()[0].id;
    Storage.setActiveProfile(firstId);
    Profiles.showPanel();
    const switchBtns = document.querySelectorAll('.switch-btn');
    expect(switchBtns.length).toBe(1); // Chỉ profile không active mới có
  });

  test('có nút xóa khi có > 1 profile', () => {
    Storage.createProfile('Player 2');
    Profiles.showPanel();
    const deleteBtns = document.querySelectorAll('.delete-btn');
    expect(deleteBtns.length).toBe(2);
  });

  test('không có nút xóa khi chỉ có 1 profile', () => {
    Profiles.showPanel();
    const deleteBtns = document.querySelectorAll('.delete-btn');
    expect(deleteBtns.length).toBe(0);
  });
});

describe('Profiles - initIndicator()', () => {
  test('hiển thị tên profile trên header', () => {
    Profiles.initIndicator();
    const el = document.getElementById('profile-indicator');
    expect(el.textContent).toBe('Người chơi 1');
  });

  test('cập nhật khi đổi profile', () => {
    Storage.createProfile('Pro Gamer');
    Profiles._updateProfileIndicator();
    const el = document.getElementById('profile-indicator');
    expect(el.textContent).toBe('Pro Gamer');
  });
});
