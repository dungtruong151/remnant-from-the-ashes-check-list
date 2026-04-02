/**
 * state.test.js - Kiểm tra State: toggle, đếm, lọc
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

describe('State - Toggle items', () => {
  test('toggle() thêm item chưa có', () => {
    State.toggle('hunting_rifle');
    expect(State.isCollected('hunting_rifle')).toBe(true);
  });

  test('toggle() bỏ item đã có', () => {
    State.toggle('hunting_rifle');
    State.toggle('hunting_rifle');
    expect(State.isCollected('hunting_rifle')).toBe(false);
  });

  test('toggle() lưu vào localStorage', () => {
    State.toggle('ruin');
    const saved = Storage.load();
    expect(saved.ruin).toBe(true);
  });

  test('isCollected() trả false cho item chưa collect', () => {
    expect(State.isCollected('nonexistent')).toBe(false);
  });

  test('resetAll() xóa hết', () => {
    State.toggle('a');
    State.toggle('b');
    State.toggle('c');
    State.resetAll();
    expect(State.collected).toEqual({});
    expect(Storage.load()).toEqual({});
  });
});

describe('State - Counting', () => {
  test('countAll() trả đúng khi chưa collect gì', () => {
    const c = State.countAll();
    expect(c.total).toBe(300);
    expect(c.collected).toBe(0);
  });

  test('countAll() đếm đúng sau khi toggle', () => {
    State.toggle('hunting_rifle');
    State.toggle('ruin');
    State.toggle('devastator');
    const c = State.countAll();
    expect(c.collected).toBe(3);
  });

  test('countSection() đếm đúng cho weapons', () => {
    State.toggle('hunting_rifle');
    State.toggle('shotgun');
    const c = State.countSection(GAME_DATA.weapons);
    expect(c.total).toBe(49);
    expect(c.collected).toBe(2);
  });

  test('countCompletedSections() trả 0 khi chưa hoàn thành section nào', () => {
    const s = State.countCompletedSections();
    expect(s.completed).toBe(0);
    expect(s.total).toBe(7);
  });
});

describe('State - Filters', () => {
  const makeItem = (overrides = {}) => ({
    id: 'test', name: 'Test Item', location: 'Earth', rarity: 'normal',
    effect: '', bonus: '', ...overrides,
  });

  test('itemMatchesFilters() mặc định match tất cả', () => {
    const filters = { search: '', rarity: 'all', status: 'all' };
    expect(State.itemMatchesFilters(makeItem(), filters)).toBe(true);
  });

  test('lọc theo search text', () => {
    const filters = { search: 'hunting', rarity: 'all', status: 'all' };
    expect(State.itemMatchesFilters(makeItem({ name: 'Hunting Rifle' }), filters)).toBe(true);
    expect(State.itemMatchesFilters(makeItem({ name: 'Ruin' }), filters)).toBe(false);
  });

  test('search tìm trong location', () => {
    const filters = { search: 'corsus', rarity: 'all', status: 'all' };
    expect(State.itemMatchesFilters(makeItem({ location: 'Corsus - Boss' }), filters)).toBe(true);
    expect(State.itemMatchesFilters(makeItem({ location: 'Earth - Boss' }), filters)).toBe(false);
  });

  test('search tìm trong effect', () => {
    const filters = { search: 'crit', rarity: 'all', status: 'all' };
    expect(State.itemMatchesFilters(makeItem({ effect: '+25% Crit Chance' }), filters)).toBe(true);
  });

  test('lọc theo rarity', () => {
    const filters = { search: '', rarity: 'boss', status: 'all' };
    expect(State.itemMatchesFilters(makeItem({ rarity: 'boss' }), filters)).toBe(true);
    expect(State.itemMatchesFilters(makeItem({ rarity: 'normal' }), filters)).toBe(false);
  });

  test('lọc theo status: collected', () => {
    State.collected = { test_item: true };
    const filters = { search: '', rarity: 'all', status: 'collected' };
    expect(State.itemMatchesFilters(makeItem({ id: 'test_item' }), filters)).toBe(true);
    expect(State.itemMatchesFilters(makeItem({ id: 'other' }), filters)).toBe(false);
  });

  test('lọc theo status: missing', () => {
    State.collected = { test_item: true };
    const filters = { search: '', rarity: 'all', status: 'missing' };
    expect(State.itemMatchesFilters(makeItem({ id: 'test_item' }), filters)).toBe(false);
    expect(State.itemMatchesFilters(makeItem({ id: 'other' }), filters)).toBe(true);
  });

  test('kết hợp nhiều filter', () => {
    State.collected = { boss_item: true };
    const filters = { search: 'fire', rarity: 'boss', status: 'collected' };
    expect(State.itemMatchesFilters(
      makeItem({ id: 'boss_item', name: 'Fire Ring', rarity: 'boss' }), filters
    )).toBe(true);
    expect(State.itemMatchesFilters(
      makeItem({ id: 'boss_item', name: 'Ice Ring', rarity: 'boss' }), filters
    )).toBe(false);
  });
});

describe('State - Constants', () => {
  test('SECTION_ICONS có đủ 7 icons', () => {
    expect(Object.keys(SECTION_ICONS)).toHaveLength(7);
  });

  test('RARITY_LABELS có đủ 4 labels', () => {
    expect(RARITY_LABELS.normal).toBe('Thường');
    expect(RARITY_LABELS.rare).toBe('Hiếm');
    expect(RARITY_LABELS.boss).toBe('Boss Drop');
    expect(RARITY_LABELS.dlc).toBe('DLC');
  });
});
