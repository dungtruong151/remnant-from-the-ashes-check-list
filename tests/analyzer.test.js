/**
 * analyzer.test.js - Kiểm tra Save File Analyzer parsing logic
 */

const { createTestEnv } = require('./setup');

let env;
beforeAll(() => { env = createTestEnv(); });
beforeEach(() => {
  document.querySelectorAll('.popup-overlay').forEach(el => el.remove());
  Analyzer._fileHandle = null;
  Analyzer._lastData = null;
});

describe('Analyzer - Name mapping', () => {
  test('_nameMap chuyển đổi tên internal → display', () => {
    expect(Analyzer._nameMap.RootBrute).toBe('Gorefist');
    expect(Analyzer._nameMap.RootDragon).toBe('Singe');
    expect(Analyzer._nameMap.SlimeHulk).toBe('Canker');
    expect(Analyzer._nameMap.Fatty).toBe('The Unclean One');
    expect(Analyzer._nameMap.Wolf).toBe('The Ravager');
    expect(Analyzer._nameMap.RatRider).toBe('Brudvaak & Vargr');
  });

  test('_worldMap chuyển đổi world name', () => {
    expect(Analyzer._worldMap.World_City).toBe('Earth');
    expect(Analyzer._worldMap.World_Wasteland).toBe('Rhom');
    expect(Analyzer._worldMap.World_Jungle).toBe('Yaesha');
    expect(Analyzer._worldMap.World_Swamp).toBe('Corsus');
    expect(Analyzer._worldMap.World_Snow).toBe('Reisum');
  });

  test('_sublocations có đủ mapping', () => {
    expect(Object.keys(Analyzer._sublocations).length).toBeGreaterThan(40);
    expect(Analyzer._sublocations.RootBrute).toBe('Sunken Passage');
    expect(Analyzer._sublocations.TheHarrow).toBe('The Bunker');
  });
});

describe('Analyzer - _parseLines()', () => {
  test('parse boss line đúng', () => {
    const lines = [
      '/World_City/Quests/Quest_Boss_RootBrute/something',
    ];
    const events = Analyzer._parseLines(lines);
    expect(events).toHaveLength(1);
    expect(events[0].world).toBe('Earth');
    expect(events[0].type).toBe('World Boss');
    expect(events[0].name).toBe('Gorefist');
    expect(events[0].sublocation).toBe('Sunken Passage');
  });

  test('parse side dungeon line đúng', () => {
    const lines = [
      '/World_Wasteland/Templates/SmallD_Quest_TheHarrow/something',
    ];
    const events = Analyzer._parseLines(lines);
    expect(events).toHaveLength(1);
    expect(events[0].world).toBe('Rhom');
    expect(events[0].type).toBe('Side Dungeon');
    expect(events[0].name).toBe('The Harrow');
  });

  test('parse event line đúng', () => {
    const lines = [
      '/World_City/Templates/Quest_Event_HuntersHideout/something',
    ];
    const events = Analyzer._parseLines(lines);
    expect(events).toHaveLength(1);
    expect(events[0].type).toBe('Event');
    expect(events[0].name).toBe("Hunter's Hideout");
  });

  test('parse miniboss line đúng', () => {
    const lines = [
      '/World_Swamp/Templates/Mini_Quest_BarbTerror/something',
    ];
    const events = Analyzer._parseLines(lines);
    expect(events).toHaveLength(1);
    expect(events[0].type).toBe('Miniboss');
    expect(events[0].name).toBe('Barbed Terror');
  });

  test('deduplicate events', () => {
    const lines = [
      '/World_City/Quests/Quest_Boss_RootBrute/a',
      '/World_City/Quests/Quest_Boss_RootBrute/b',
    ];
    const events = Analyzer._parseLines(lines);
    expect(events).toHaveLength(1);
  });

  test('bỏ qua dòng không hợp lệ', () => {
    const lines = ['', 'garbage', 'no/world/here'];
    const events = Analyzer._parseLines(lines);
    expect(events).toHaveLength(0);
  });

  test('parse nhiều world cùng lúc', () => {
    const lines = [
      '/World_City/Quests/Quest_Boss_RootBrute/a',
      '/World_Wasteland/Templates/SmallD_Quest_TheHarrow/b',
      '/World_Jungle/Quests/Quest_Boss_Wolf/c',
      '/World_Swamp/Templates/Quest_Event_FetidPool/d',
      '/World_Snow/Templates/SmallD_Quest_RatRider/e',
    ];
    const events = Analyzer._parseLines(lines);
    expect(events).toHaveLength(5);
    const worlds = events.map(e => e.world);
    expect(worlds).toContain('Earth');
    expect(worlds).toContain('Rhom');
    expect(worlds).toContain('Yaesha');
    expect(worlds).toContain('Corsus');
    expect(worlds).toContain('Reisum');
  });

  test('tên không có trong _nameMap được format tự động', () => {
    const lines = ['/World_City/Quests/Quest_Boss_SomeNewBoss/a'];
    const events = Analyzer._parseLines(lines);
    expect(events[0].name).toBe('Some New Boss');
  });
});

describe('Analyzer - UI', () => {
  test('showPanel() tạo popup overlay', () => {
    Analyzer.showPanel();
    expect(document.querySelector('.popup-overlay')).toBeTruthy();
    expect(document.querySelector('.analyzer-popup')).toBeTruthy();
  });

  test('showPanel() có nút chọn file', () => {
    Analyzer.showPanel();
    expect(document.querySelector('#analyzer-pick')).toBeTruthy();
  });

  test('showPanel() không có nút reload khi chưa chọn file', () => {
    Analyzer.showPanel();
    expect(document.querySelector('#analyzer-reload')).toBeNull();
  });

  test('showPanel() có nút reload khi đã có file handle', () => {
    Analyzer._fileHandle = { name: 'save_0.sav' };
    Analyzer._lastData = { campaign: [], adventure: [] };
    Analyzer.showPanel();
    expect(document.querySelector('#analyzer-reload')).toBeTruthy();
  });

  test('showPanel() hiển thị tên file khi đã chọn', () => {
    Analyzer._fileHandle = { name: 'save_0.sav' };
    Analyzer._lastData = { campaign: [], adventure: [] };
    Analyzer.showPanel();
    const info = document.querySelector('.analyzer-file-info');
    expect(info).toBeTruthy();
    expect(info.textContent).toContain('save_0.sav');
  });

  test('close popup bằng nút X', () => {
    Analyzer.showPanel();
    document.querySelector('.popup-close').click();
    expect(document.querySelector('.popup-overlay')).toBeNull();
  });

  test('_renderResults() hiển thị events theo world', () => {
    Analyzer.showPanel();
    const container = document.querySelector('#analyzer-content');
    const events = [
      { world: 'Earth', type: 'World Boss', rawName: 'RootBrute', name: 'Gorefist', sublocation: 'Sunken Passage' },
      { world: 'Rhom', type: 'Side Dungeon', rawName: 'TheHarrow', name: 'The Harrow', sublocation: 'The Bunker' },
    ];
    Analyzer._renderResults(events, container);
    expect(container.querySelectorAll('.analyzer-world').length).toBe(2);
    expect(container.querySelectorAll('.analyzer-event').length).toBe(2);
    expect(container.textContent).toContain('Gorefist');
    expect(container.textContent).toContain('The Harrow');
  });

  test('_renderResults() hiển thị empty message khi không có events', () => {
    Analyzer.showPanel();
    const container = document.querySelector('#analyzer-content');
    Analyzer._renderResults([], container);
    expect(container.querySelector('.analyzer-empty')).toBeTruthy();
  });
});
