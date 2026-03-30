/**
 * profiles.js - UI quản lý profiles: tạo, chuyển, đổi tên, xóa, xuất, nhập
 */

const Profiles = {
  showPanel() {
    const profiles = Storage.getProfiles();
    const activeId = Storage.getActiveProfileId();

    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';

    overlay.innerHTML = `
      <div class="popup profiles-popup">
        <div class="popup-body">
          <div class="popup-header">
            <div class="popup-title">👤 Quản lý Profile</div>
            <button class="popup-close">✕</button>
          </div>

          <div class="profiles-list" id="profiles-list">
            ${profiles.map(p => this._renderProfileItem(p, p.id === activeId)).join('')}
          </div>

          <div class="profiles-actions">
            <button class="profile-action-btn" id="profile-create">
              ➕ Tạo profile mới
            </button>
          </div>

          <div class="profiles-divider"></div>

          <div class="profiles-transfer">
            <h4>📦 Chuyển dữ liệu giữa các máy</h4>
            <p>Xuất profile hiện tại thành file JSON để dùng ở máy khác, hoặc nhập file từ máy khác vào.</p>
            <div class="profiles-transfer-btns">
              <button class="profile-action-btn profile-export-btn" id="profile-export">
                ⬇️ Xuất file (.json)
              </button>
              <button class="profile-action-btn profile-import-btn" id="profile-import">
                ⬆️ Nhập file (.json)
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this._bindEvents(overlay);
  },

  _renderProfileItem(profile, isActive) {
    const data = Storage.loadData(profile.id);
    const count = Object.keys(data).length;
    const date = new Date(profile.createdAt).toLocaleDateString('vi-VN');

    return `
      <div class="profile-item ${isActive ? 'active' : ''}" data-id="${profile.id}">
        <div class="profile-info">
          <div class="profile-name">
            ${isActive ? '✅' : '👤'} <span class="profile-name-text">${profile.name}</span>
          </div>
          <div class="profile-meta">${count}/279 items · Tạo ngày ${date}</div>
        </div>
        <div class="profile-btns">
          ${!isActive ? `<button class="profile-mini-btn switch-btn" data-id="${profile.id}" title="Chuyển sang profile này">🔄</button>` : ''}
          <button class="profile-mini-btn rename-btn" data-id="${profile.id}" title="Đổi tên">✏️</button>
          ${Storage.getProfiles().length > 1 ? `<button class="profile-mini-btn delete-btn" data-id="${profile.id}" title="Xóa">🗑️</button>` : ''}
        </div>
      </div>`;
  },

  _bindEvents(overlay) {
    const close = () => overlay.remove();
    overlay.querySelector('.popup-close').onclick = close;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    // Tạo profile mới
    overlay.querySelector('#profile-create').onclick = () => {
      const name = prompt('Tên profile mới:');
      if (!name || !name.trim()) return;
      Storage.createProfile(name.trim());
      State.collected = Storage.load();
      close();
      this.showPanel();
      Renderer.renderAll();
      this._updateProfileIndicator();
    };

    // Chuyển profile
    overlay.querySelectorAll('.switch-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        Storage.setActiveProfile(btn.dataset.id);
        State.collected = Storage.load();
        close();
        Renderer.renderAll();
        this._updateProfileIndicator();
      };
    });

    // Đổi tên
    overlay.querySelectorAll('.rename-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const profile = Storage.getProfiles().find(p => p.id === btn.dataset.id);
        const newName = prompt('Tên mới:', profile?.name || '');
        if (!newName || !newName.trim()) return;
        Storage.renameProfile(btn.dataset.id, newName.trim());
        close();
        this.showPanel();
        this._updateProfileIndicator();
      };
    });

    // Xóa
    overlay.querySelectorAll('.delete-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const profile = Storage.getProfiles().find(p => p.id === btn.dataset.id);
        if (!confirm(`Xóa profile "${profile?.name}"? Dữ liệu sẽ mất vĩnh viễn.`)) return;
        const newActiveId = Storage.deleteProfile(btn.dataset.id);
        if (newActiveId) {
          State.collected = Storage.load();
          Renderer.renderAll();
        }
        close();
        this.showPanel();
        this._updateProfileIndicator();
      };
    });

    // Xuất
    overlay.querySelector('#profile-export').onclick = () => {
      const exported = Storage.exportProfile();
      const profile = Storage.getActiveProfile();
      const blob = new Blob([JSON.stringify(exported, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `remnant-${profile.name.replace(/\s+/g, '_')}-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    };

    // Nhập
    overlay.querySelector('#profile-import').onclick = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const id = Storage.importProfile(ev.target.result);
            State.collected = Storage.load();
            close();
            Renderer.renderAll();
            this._updateProfileIndicator();
            alert('✅ Đã nhập profile thành công!');
          } catch (err) {
            alert('❌ Lỗi: ' + err.message);
          }
        };
        reader.readAsText(file);
      };
      input.click();
    };

    // ESC
    const esc = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } };
    document.addEventListener('keydown', esc);
  },

  /**
   * Cập nhật tên profile hiển thị trên header
   */
  _updateProfileIndicator() {
    const el = document.getElementById('profile-indicator');
    if (!el) return;
    const profile = Storage.getActiveProfile();
    if (profile) el.textContent = profile.name;
  },

  /**
   * Khởi tạo indicator trên header
   */
  initIndicator() {
    const profile = Storage.getActiveProfile();
    const el = document.getElementById('profile-indicator');
    if (el && profile) el.textContent = profile.name;
  },
};
