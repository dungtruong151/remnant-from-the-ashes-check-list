/**
 * renderer.js - Render giao diện: nav, cards, sections, stats
 */

const Renderer = {
  /**
   * Render toàn bộ giao diện
   */
  renderAll() {
    this._renderNav();
    this._renderSections();
    this._renderGlobalStats();
  },

  // === Navigation ===

  _renderNav() {
    const nav = document.getElementById('category-nav');
    nav.innerHTML = '';

    // Nút "Tất cả"
    const allCount = State.countAll();
    nav.appendChild(this._createNavBtn(
      `Tất cả <span class="nav-progress">${allCount.collected}/${allCount.total}</span>`,
      State.activeSection === null,
      () => { State.activeSection = null; this.renderAll(); }
    ));

    // Nút từng danh mục
    for (const [key, section] of Object.entries(GAME_DATA)) {
      const count = State.countSection(section);
      nav.appendChild(this._createNavBtn(
        `${section.icon} ${section.label} <span class="nav-progress">${count.collected}/${count.total}</span>`,
        State.activeSection === key,
        () => { State.activeSection = key; this.renderAll(); }
      ));
    }
  },

  _createNavBtn(html, isActive, onClick) {
    const btn = document.createElement('button');
    btn.className = `nav-btn ${isActive ? 'active' : ''}`;
    btn.innerHTML = html;
    btn.onclick = onClick;
    return btn;
  },

  // === Sections ===

  _renderSections() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const sections = State.activeSection
      ? { [State.activeSection]: GAME_DATA[State.activeSection] }
      : GAME_DATA;

    let anyVisible = false;
    for (const [key, section] of Object.entries(sections)) {
      const el = this._renderSection(key, section);
      if (el) { app.appendChild(el); anyVisible = true; }
    }

    if (!anyVisible) {
      app.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          Không tìm thấy vật phẩm nào phù hợp.
        </div>`;
    }
  },

  _renderSection(key, section) {
    const filters = State.getFilters();
    const meta = SECTION_META[key] || {};

    // Kiểm tra có item nào hiển thị không
    const hasVisible = Object.values(section.categories)
      .some(cat => cat.items.some(item => State.itemMatchesFilters(item, filters)));
    if (!hasVisible) return null;

    const count = State.countSection(section);
    const pct = count.total > 0 ? Math.round((count.collected / count.total) * 100) : 0;
    const bannerClass = meta.banner ? `banner-${meta.banner}` : 'banner-weapons';

    const container = document.createElement('div');
    container.className = 'section';
    container.id = `section-${key}`;
    container.innerHTML = `
      <div class="section-banner ${bannerClass}">
        <div class="section-banner-icon">${section.icon}</div>
        <div class="section-banner-info">
          <h2>${section.label}</h2>
          <div class="section-desc">${meta.desc || ''}</div>
        </div>
        <div class="section-banner-stats">
          <div class="count-text">${count.collected}/${count.total}</div>
          <div class="count-label">${pct}% hoàn thành</div>
        </div>
      </div>
      <div class="section-progress-bar-full">
        <div class="section-progress-fill-full" style="width: ${pct}%"></div>
      </div>
    `;

    const body = document.createElement('div');
    body.className = 'section-body';

    const hasMultiCats = Object.keys(section.categories).length > 1;
    for (const [catKey, cat] of Object.entries(section.categories)) {
      const items = cat.items.filter(item => State.itemMatchesFilters(item, filters));
      if (items.length === 0) continue;

      const sub = document.createElement('div');
      sub.className = 'subcategory';
      if (hasMultiCats) {
        sub.innerHTML = `<div class="subcategory-title">${cat.label}</div>`;
      }

      const grid = document.createElement('div');
      grid.className = 'item-grid';
      for (const item of items) {
        grid.appendChild(this._renderCard(item, key));
      }

      sub.appendChild(grid);
      body.appendChild(sub);
    }

    container.appendChild(body);
    return container;
  },

  // === Item Card ===

  _renderCard(item, sectionKey) {
    const isCollected = State.isCollected(item.id);
    const icon = SECTION_ICONS[sectionKey] || '❓';

    const card = document.createElement('div');
    card.className = `item-card ${isCollected ? 'collected' : ''}`;
    card.onclick = () => Popup.showItem(item, sectionKey);

    let extraHTML = '';
    if (item.effect) extraHTML += `<div class="item-extra">${item.effect}</div>`;
    if (item.bonus)  extraHTML += `<div class="item-extra">${item.bonus}</div>`;
    if (item.altKill && item.altKill !== 'Không') {
      extraHTML += `<div class="item-extra">Alt Kill: ${item.altKill}</div>`;
    }

    const imgContent = item.image
      ? `<img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
         <div class="item-image-placeholder" style="display:none">${icon}</div>`
      : `<div class="item-image-placeholder">${icon}</div>`;

    const badge = isCollected ? '<div class="item-collected-badge">✓</div>' : '';

    card.innerHTML = `
      <div class="item-image-wrap">
        ${imgContent}
        ${badge}
      </div>
      <div class="item-body">
        <div class="item-top-row">
          <div class="item-name">${item.name}</div>
          <span class="rarity-badge rarity-${item.rarity}">${item.rarity}</span>
        </div>
        <div class="item-location">${item.location}</div>
        ${extraHTML}
      </div>
    `;
    return card;
  },

  // === Global Stats ===

  _renderGlobalStats() {
    const all = State.countAll();
    const pct = all.total > 0 ? Math.round((all.collected / all.total) * 100) : 0;

    document.getElementById('total-progress').textContent = `${pct}%`;
    document.getElementById('total-collected').textContent = `${all.collected}/${all.total}`;

    // Progress bar
    const fill = document.getElementById('progress-bar-fill');
    if (fill) fill.style.width = `${pct}%`;

    // Sections completed
    const sections = State.countCompletedSections();
    const sectEl = document.getElementById('total-sections-text');
    if (sectEl) sectEl.textContent = `${sections.completed}/${sections.total} danh mục`;
  },
};
