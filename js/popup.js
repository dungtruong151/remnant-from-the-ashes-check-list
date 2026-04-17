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

    if (item.guide)   rows.push(this._guideBlock(item.guide));
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

  /**
   * Render guide text thành dạng có cấu trúc dễ đọc.
   * Tách theo dấu câu / dấu chấm chấm / step number.
   */
  _guideBlock(text) {
    if (!text) return '';

    // Tách thành các sentences/steps có ý nghĩa
    const sentences = text
      // Tách tại: ". ", " → ", ". Bước ", ". Sau ", ". Khi ", ". Nếu ", ". Alt kill"
      .split(/(?<=\.)\s+(?=[A-ZĐÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ])|(?:\.\s+(?=Bước|Sau đó|Khi|Nếu|Alt|Lưu ý|Drop|Nhận|Mang|Dùng|Craft|Mua|Tìm|Đây))|→\s+/g)
      .map(s => s.trim())
      .filter(s => s.length > 3);

    // Nếu chỉ có 1 sentence ngắn, không cần list
    if (sentences.length <= 1 || text.length < 120) {
      return `
        <div class="popup-detail-row">
          <div class="popup-detail-icon">📖</div>
          <div class="popup-detail-label">Cách lấy</div>
          <div class="popup-detail-value">${text}</div>
        </div>`;
    }

    // Detect keyword → icon
    const getIcon = (s) => {
      const lower = s.toLowerCase();
      if (/craft|mccabe|lumenite|scrap/.test(lower)) return '🔨';
      if (/boss|giết|đánh|combat|phase|chiến thuật|dodge|né|bắn|tấn công/.test(lower)) return '⚔️';
      if (/drop|nhận|vật phẩm|material|ore|heart|shard/.test(lower)) return '📦';
      if (/mua|scrap|vendor|rigs|merchant/.test(lower)) return '🛒';
      if (/alt kill|cách giết khác|phá|cắt|đưa/.test(lower)) return '💡';
      if (/lưu ý|quan trọng|chú ý/.test(lower)) return '⚠️';
      if (/hardcore|survival mode/.test(lower)) return '🏆';
      if (/dlc|subject|swamps/.test(lower)) return '📀';
      return '→';
    };

    const steps = sentences.map(s => {
      // Làm sạch dấu câu dư ở đầu
      const clean = s.replace(/^[.\s→]+/, '').trim();
      return `<li class="guide-step"><span class="guide-step-icon">${getIcon(clean)}</span><span>${clean}</span></li>`;
    }).join('');

    return `
      <div class="popup-guide-block">
        <div class="popup-guide-label">📖 Cách lấy</div>
        <ul class="guide-steps">${steps}</ul>
      </div>`;
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
      if (typeof Analyzer !== 'undefined' && Analyzer._lastData) {
        Analyzer.renderPage();
      }
      if (typeof Builds !== 'undefined') {
        Builds.renderPage();
      }
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
