/**
 * storage.js - Quản lý localStorage theo profile
 *
 * Cấu trúc localStorage:
 *   remnant_profiles       → { profiles: [{id, name, createdAt}], activeId: "xxx" }
 *   remnant_data_{id}      → { item_id: true, ... }
 */

const PROFILES_KEY = 'remnant_profiles';
const DATA_PREFIX = 'remnant_data_';

const Storage = {
  // === Profile management ===

  _getProfileStore() {
    try {
      return JSON.parse(localStorage.getItem(PROFILES_KEY)) || null;
    } catch { return null; }
  },

  _saveProfileStore(store) {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(store));
  },

  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  },

  /**
   * Khởi tạo hệ thống profile. Nếu chưa có, tạo profile mặc định.
   * Migrate data cũ (trước khi có profile system) vào profile đầu tiên.
   */
  init() {
    let store = this._getProfileStore();
    if (store && store.profiles.length > 0) return store;

    // Migrate data cũ
    const oldData = this._loadLegacy();
    const defaultId = this._generateId();

    store = {
      profiles: [{ id: defaultId, name: 'Người chơi 1', createdAt: Date.now() }],
      activeId: defaultId,
    };
    this._saveProfileStore(store);
    this.saveData(defaultId, oldData);

    // Xóa key cũ
    localStorage.removeItem('remnant_checklist');

    return store;
  },

  _loadLegacy() {
    try {
      return JSON.parse(localStorage.getItem('remnant_checklist')) || {};
    } catch { return {}; }
  },

  getProfiles() {
    const store = this._getProfileStore();
    return store ? store.profiles : [];
  },

  getActiveProfileId() {
    const store = this._getProfileStore();
    return store ? store.activeId : null;
  },

  getActiveProfile() {
    const store = this._getProfileStore();
    if (!store) return null;
    return store.profiles.find(p => p.id === store.activeId) || store.profiles[0];
  },

  setActiveProfile(id) {
    const store = this._getProfileStore();
    if (!store) return;
    store.activeId = id;
    this._saveProfileStore(store);
  },

  createProfile(name) {
    const store = this._getProfileStore();
    const id = this._generateId();
    store.profiles.push({ id, name, createdAt: Date.now() });
    store.activeId = id;
    this._saveProfileStore(store);
    this.saveData(id, {});
    return id;
  },

  renameProfile(id, newName) {
    const store = this._getProfileStore();
    const profile = store.profiles.find(p => p.id === id);
    if (profile) {
      profile.name = newName;
      this._saveProfileStore(store);
    }
  },

  deleteProfile(id) {
    const store = this._getProfileStore();
    store.profiles = store.profiles.filter(p => p.id !== id);
    localStorage.removeItem(DATA_PREFIX + id);
    if (store.activeId === id) {
      store.activeId = store.profiles[0]?.id || null;
    }
    this._saveProfileStore(store);
    return store.activeId;
  },

  // === Checklist data per profile ===

  loadData(profileId) {
    try {
      return JSON.parse(localStorage.getItem(DATA_PREFIX + (profileId || this.getActiveProfileId()))) || {};
    } catch { return {}; }
  },

  saveData(profileId, data) {
    localStorage.setItem(DATA_PREFIX + (profileId || this.getActiveProfileId()), JSON.stringify(data));
  },

  // Shortcut cho active profile
  load() { return this.loadData(this.getActiveProfileId()); },
  save(data) { this.saveData(this.getActiveProfileId(), data); },
  clear() { this.saveData(this.getActiveProfileId(), {}); },

  // === Export / Import ===

  exportProfile(profileId) {
    const id = profileId || this.getActiveProfileId();
    const profile = this.getProfiles().find(p => p.id === id);
    const data = this.loadData(id);
    return {
      version: 1,
      app: 'remnant-checklist',
      exportedAt: new Date().toISOString(),
      profile: { name: profile?.name || 'Unknown', createdAt: profile?.createdAt },
      collected: data,
    };
  },

  importProfile(json, profileName) {
    const parsed = typeof json === 'string' ? JSON.parse(json) : json;
    if (!parsed.collected || parsed.app !== 'remnant-checklist') {
      throw new Error('File không hợp lệ');
    }
    const name = profileName || parsed.profile?.name || 'Imported';
    const id = this.createProfile(name);
    this.saveData(id, parsed.collected);
    return id;
  },
};
