/**
 * storage.test.js - Kiểm tra hệ thống storage + profile management
 */

const { createTestEnv } = require('./setup');

let env;
beforeAll(() => { env = createTestEnv(); });
beforeEach(() => { localStorage.clear(); });

describe('Storage - Profile system', () => {
  test('init() tạo profile mặc định', () => {
    const store = Storage.init();
    expect(store.profiles).toHaveLength(1);
    expect(store.profiles[0].name).toBe('Người chơi 1');
    expect(store.activeId).toBe(store.profiles[0].id);
  });

  test('init() migrate data cũ', () => {
    localStorage.setItem('remnant_checklist', JSON.stringify({ hunting_rifle: true, ruin: true }));
    Storage.init();
    const data = Storage.load();
    expect(data.hunting_rifle).toBe(true);
    expect(data.ruin).toBe(true);
    // Key cũ đã bị xóa
    expect(localStorage.getItem('remnant_checklist')).toBeNull();
  });

  test('init() idempotent - gọi nhiều lần không tạo duplicate', () => {
    Storage.init();
    Storage.init();
    Storage.init();
    expect(Storage.getProfiles()).toHaveLength(1);
  });

  test('createProfile() tạo profile mới và set active', () => {
    Storage.init();
    const id = Storage.createProfile('Player 2');
    expect(Storage.getProfiles()).toHaveLength(2);
    expect(Storage.getActiveProfileId()).toBe(id);
    expect(Storage.getActiveProfile().name).toBe('Player 2');
  });

  test('setActiveProfile() chuyển profile', () => {
    Storage.init();
    const firstId = Storage.getActiveProfileId();
    const secondId = Storage.createProfile('Player 2');
    Storage.setActiveProfile(firstId);
    expect(Storage.getActiveProfileId()).toBe(firstId);
  });

  test('renameProfile() đổi tên', () => {
    Storage.init();
    const id = Storage.getActiveProfileId();
    Storage.renameProfile(id, 'Tên Mới');
    expect(Storage.getActiveProfile().name).toBe('Tên Mới');
  });

  test('deleteProfile() xóa và chuyển sang profile khác', () => {
    Storage.init();
    const firstId = Storage.getActiveProfileId();
    const secondId = Storage.createProfile('Player 2');
    Storage.deleteProfile(secondId);
    expect(Storage.getProfiles()).toHaveLength(1);
    expect(Storage.getActiveProfileId()).toBe(firstId);
  });

  test('mỗi profile có data riêng biệt', () => {
    Storage.init();
    const id1 = Storage.getActiveProfileId();
    Storage.save({ hunting_rifle: true });

    const id2 = Storage.createProfile('Player 2');
    Storage.save({ ruin: true, devastator: true });

    expect(Storage.loadData(id1)).toEqual({ hunting_rifle: true });
    expect(Storage.loadData(id2)).toEqual({ ruin: true, devastator: true });
  });

  test('clear() xóa data của active profile', () => {
    Storage.init();
    Storage.save({ a: true, b: true });
    Storage.clear();
    expect(Storage.load()).toEqual({});
  });
});

describe('Storage - Export/Import', () => {
  test('exportProfile() tạo JSON hợp lệ', () => {
    Storage.init();
    Storage.save({ hunting_rifle: true, ruin: true });
    const exported = Storage.exportProfile();

    expect(exported.version).toBe(1);
    expect(exported.app).toBe('remnant-checklist');
    expect(exported.exportedAt).toBeTruthy();
    expect(exported.profile.name).toBeTruthy();
    expect(exported.collected).toEqual({ hunting_rifle: true, ruin: true });
  });

  test('importProfile() tạo profile mới từ JSON', () => {
    Storage.init();
    const json = {
      version: 1,
      app: 'remnant-checklist',
      profile: { name: 'Imported Player' },
      collected: { beam_rifle: true, crossbow: true },
    };

    const id = Storage.importProfile(json);
    expect(Storage.getProfiles()).toHaveLength(2);
    expect(Storage.getActiveProfile().name).toBe('Imported Player');
    expect(Storage.load()).toEqual({ beam_rifle: true, crossbow: true });
  });

  test('importProfile() reject file không hợp lệ', () => {
    Storage.init();
    expect(() => Storage.importProfile({ foo: 'bar' })).toThrow('File không hợp lệ');
    expect(() => Storage.importProfile('invalid json{')).toThrow();
  });

  test('export → import roundtrip giữ nguyên data', () => {
    Storage.init();
    const original = { hunting_rifle: true, ruin: true, devastator: true };
    Storage.save(original);
    const exported = Storage.exportProfile();
    const json = JSON.stringify(exported);

    // Tạo profile mới từ import
    const id = Storage.importProfile(json, 'Roundtrip');
    expect(Storage.load()).toEqual(original);
  });
});
