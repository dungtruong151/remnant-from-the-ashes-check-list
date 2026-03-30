/**
 * popup.js - Popup chi tiết item và dialog xác nhận
 */

const Popup = {
  /**
   * Hiển thị popup chi tiết item
   */
  showItem(item, sectionKey) {
    const isCollected = State.isCollected(item.id);
    const icon = SECTION_ICONS[sectionKey] || '❓';

    const overlay = this._createOverlay('popup-overlay');
    overlay.innerHTML = `
      <div class="popup">
        ${this._renderImage(item, icon, isCollected)}
        <div class="popup-body">
          ${this._renderHeader(item)}
          <div class="popup-details">
            ${this._renderDetails(item, sectionKey)}
          </div>
          ${this._renderActions(item, isCollected)}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this._bindItemEvents(overlay, item);
  },

  /**
   * Hiển thị dialog xác nhận reset
   */
  showResetConfirm() {
    const overlay = this._createOverlay('overlay');
    overlay.innerHTML = `
      <div class="dialog">
        <h3>Reset toàn bộ?</h3>
        <p>Tất cả tiến trình sẽ bị xóa và không thể khôi phục.</p>
        <div class="dialog-actions">
          <button class="btn-cancel" data-action="cancel">Hủy</button>
          <button class="btn-confirm" data-action="confirm">Xóa hết</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('[data-action="cancel"]').onclick = () => overlay.remove();
    overlay.querySelector('[data-action="confirm"]').onclick = () => {
      State.resetAll();
      overlay.remove();
      Renderer.renderAll();
    };
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  },

  // === Private helpers ===

  _createOverlay(className) {
    const overlay = document.createElement('div');
    overlay.className = className;
    return overlay;
  },

  _renderImage(item, icon, isCollected) {
    const imgContent = item.image
      ? `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
         <div class="item-image-placeholder" style="display:none">${icon}</div>`
      : `<div class="item-image-placeholder">${icon}</div>`;

    return `
      <div class="popup-image ${isCollected ? 'collected-bg' : ''}">
        ${imgContent}
        <button class="popup-close">✕</button>
      </div>`;
  },

  _renderHeader(item) {
    const rarityLabel = RARITY_LABELS[item.rarity] || item.rarity;
    return `
      <div class="popup-header">
        <div class="popup-title">${item.name}</div>
        <span class="popup-rarity rarity-badge rarity-${item.rarity}">${rarityLabel}</span>
      </div>`;
  },

  _renderDetails(item, sectionKey) {
    const rows = [];

    rows.push(this._detailRow('📍', 'Vị trí', item.location));

    if (item.guide)   rows.push(this._detailRow('📖', 'Cách lấy', item.guide));
    if (item.effect)  rows.push(this._detailRow('⚡', 'Hiệu ứng', item.effect));
    if (item.bonus)   rows.push(this._detailRow('🎯', 'Set Bonus', item.bonus));
    if (item.altKill && item.altKill !== 'Không') {
      rows.push(this._detailRow('💡', 'Cách giết khác', item.altKill));
    }

    const sectionLabel = GAME_DATA[sectionKey]?.label || sectionKey;
    const sectionIcon = SECTION_ICONS[sectionKey] || '📦';
    rows.push(this._detailRow(sectionIcon, 'Danh mục', sectionLabel));

    return rows.join('');
  },

  _detailRow(icon, label, value) {
    return `
      <div class="popup-detail-row">
        <div class="popup-detail-icon">${icon}</div>
        <div class="popup-detail-content">
          <div class="popup-detail-label">${label}</div>
          <div class="popup-detail-value">${value}</div>
        </div>
      </div>`;
  },

  _renderActions(item, isCollected) {
    const wikiName = item.name.replace(/\s/g, '+').replace(/'/g, '%27');
    const wikiUrl = `https://remnantfromtheashes.wiki.fextralife.com/${wikiName}`;
    const btnClass = isCollected ? 'is-collected' : '';
    const btnText = isCollected ? '↩ Bỏ đánh dấu' : '✓ Đã thu thập';

    return `
      <div class="popup-actions">
        <button class="popup-btn popup-btn-collect ${btnClass}" data-action="toggle">${btnText}</button>
        <a href="${wikiUrl}" target="_blank" rel="noopener" class="popup-btn popup-btn-wiki" title="Xem trên Wiki">🔗</a>
      </div>`;
  },

  _bindItemEvents(overlay, item) {
    overlay.querySelector('.popup-close').onclick = () => overlay.remove();
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    overlay.querySelector('[data-action="toggle"]').onclick = () => {
      State.toggle(item.id);
      overlay.remove();
      Renderer.renderAll();
    };

    const escHandler = (e) => {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  },
};
