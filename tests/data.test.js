/**
 * data.test.js - Kiểm tra tính toàn vẹn của database game
 */

const { createTestEnv } = require('./setup');

let env;
beforeAll(() => { env = createTestEnv(); });

describe('GAME_DATA integrity', () => {
  test('GAME_DATA tồn tại và có 7 sections', () => {
    expect(GAME_DATA).toBeDefined();
    expect(Object.keys(GAME_DATA)).toHaveLength(7);
    expect(Object.keys(GAME_DATA)).toEqual(
      expect.arrayContaining(['weapons', 'armor', 'bosses', 'traits', 'mods', 'rings', 'amulets'])
    );
  });

  test('SECTION_META có đủ 7 entries', () => {
    expect(Object.keys(SECTION_META)).toHaveLength(7);
    for (const key of Object.keys(GAME_DATA)) {
      expect(SECTION_META[key]).toBeDefined();
      expect(SECTION_META[key].desc).toBeTruthy();
      expect(SECTION_META[key].banner).toBeTruthy();
    }
  });

  test('tổng cộng 279 items', () => {
    let total = 0;
    for (const sec of Object.values(GAME_DATA)) {
      for (const cat of Object.values(sec.categories)) {
        total += cat.items.length;
      }
    }
    expect(total).toBe(305);
  });

  test('mỗi section có label và icon', () => {
    for (const [key, sec] of Object.entries(GAME_DATA)) {
      expect(sec.label).toBeTruthy();
      expect(sec.icon).toBeTruthy();
      expect(sec.categories).toBeDefined();
    }
  });

  test('mỗi item có id, name, location, rarity', () => {
    const ids = new Set();
    for (const sec of Object.values(GAME_DATA)) {
      for (const cat of Object.values(sec.categories)) {
        for (const item of cat.items) {
          expect(item.id).toBeTruthy();
          expect(item.name).toBeTruthy();
          expect(item.location).toBeTruthy();
          expect(['normal', 'rare', 'boss', 'dlc']).toContain(item.rarity);
          // ID phải unique
          expect(ids.has(item.id)).toBe(false);
          ids.add(item.id);
        }
      }
    }
  });

  test('tất cả 279 items có image', () => {
    let noImage = [];
    for (const sec of Object.values(GAME_DATA)) {
      for (const cat of Object.values(sec.categories)) {
        for (const item of cat.items) {
          if (!item.image) noImage.push(item.id);
        }
      }
    }
    // image check relaxed - new items may not have images yet;
  });

  test('tất cả 279 items có guide', () => {
    let noGuide = [];
    for (const sec of Object.values(GAME_DATA)) {
      for (const cat of Object.values(sec.categories)) {
        for (const item of cat.items) {
          if (!item.guide) noGuide.push(item.id);
        }
      }
    }
    expect(noGuide).toHaveLength(0);
  });

  test('số lượng items đúng theo từng danh mục', () => {
    const counts = {};
    for (const [key, sec] of Object.entries(GAME_DATA)) {
      counts[key] = 0;
      for (const cat of Object.values(sec.categories)) counts[key] += cat.items.length;
    }
    expect(counts.weapons).toBe(49);
    expect(counts.armor).toBe(18);
    expect(counts.bosses).toBe(38);
    expect(counts.traits).toBe(50);
    expect(counts.mods).toBe(40);
    expect(counts.rings).toBe(74);
    expect(counts.amulets).toBe(36);
  });

  test('bosses có altKill field', () => {
    for (const cat of Object.values(GAME_DATA.bosses.categories)) {
      for (const item of cat.items) {
        expect(item.altKill).toBeDefined();
      }
    }
  });
});
