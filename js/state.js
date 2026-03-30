/**
 * state.js - Trạng thái ứng dụng và logic đếm/lọc
 */

const SECTION_ICONS = {
  weapons: '⚔️',
  armor: '🛡️',
  bosses: '💀',
  traits: '📊',
  mods: '🔮',
  rings: '💍',
  amulets: '📿',
};

const RARITY_LABELS = {
  normal: 'Thường',
  rare: 'Hiếm',
  boss: 'Boss Drop',
  dlc: 'DLC',
};

const State = {
  collected: {},
  activeSection: null,

  isCollected(id) {
    return !!this.collected[id];
  },

  toggle(id) {
    if (this.collected[id]) {
      delete this.collected[id];
    } else {
      this.collected[id] = true;
    }
    Storage.save(this.collected);
  },

  resetAll() {
    this.collected = {};
    Storage.save(this.collected);
  },

  countSection(section) {
    let total = 0, collected = 0;
    for (const cat of Object.values(section.categories)) {
      for (const item of cat.items) {
        total++;
        if (this.collected[item.id]) collected++;
      }
    }
    return { total, collected };
  },

  countAll() {
    let total = 0, collected = 0;
    for (const section of Object.values(GAME_DATA)) {
      const c = this.countSection(section);
      total += c.total;
      collected += c.collected;
    }
    return { total, collected };
  },

  countCompletedSections() {
    let completed = 0;
    for (const section of Object.values(GAME_DATA)) {
      const c = this.countSection(section);
      if (c.collected === c.total && c.total > 0) completed++;
    }
    return { completed, total: Object.keys(GAME_DATA).length };
  },

  getFilters() {
    return {
      search: document.getElementById('search-input').value.toLowerCase().trim(),
      rarity: document.getElementById('filter-rarity').value,
      status: document.getElementById('filter-status').value,
    };
  },

  itemMatchesFilters(item, filters) {
    if (filters.search) {
      const text = [item.name, item.location, item.effect || '', item.bonus || '']
        .join(' ').toLowerCase();
      if (!text.includes(filters.search)) return false;
    }
    if (filters.rarity !== 'all' && item.rarity !== filters.rarity) return false;
    if (filters.status === 'collected' && !this.collected[item.id]) return false;
    if (filters.status === 'missing' && this.collected[item.id]) return false;
    return true;
  },
};
