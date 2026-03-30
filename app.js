// === STATE ===
const STORAGE_KEY = 'remnant_checklist';
let collectedItems = loadState();
let activeSection = null;

// === STORAGE ===
function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedItems));
}

function toggleItem(id) {
  if (collectedItems[id]) {
    delete collectedItems[id];
  } else {
    collectedItems[id] = true;
  }
  saveState();
  renderAll();
}

function resetAll() {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.innerHTML = `
    <div class="dialog">
      <h3>Reset toàn bộ?</h3>
      <p>Tất cả tiến trình sẽ bị xóa và không thể khôi phục.</p>
      <div class="dialog-actions">
        <button class="btn-cancel" id="dialog-cancel">Hủy</button>
        <button class="btn-confirm" id="dialog-confirm">Xóa hết</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById('dialog-cancel').onclick = () => overlay.remove();
  document.getElementById('dialog-confirm').onclick = () => {
    collectedItems = {};
    saveState();
    overlay.remove();
    renderAll();
  };
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

// === COUNTING ===
function countSection(sectionData) {
  let total = 0, collected = 0;
  for (const cat of Object.values(sectionData.categories)) {
    for (const item of cat.items) {
      total++;
      if (collectedItems[item.id]) collected++;
    }
  }
  return { total, collected };
}

function countAll() {
  let total = 0, collected = 0;
  for (const section of Object.values(GAME_DATA)) {
    const c = countSection(section);
    total += c.total;
    collected += c.collected;
  }
  return { total, collected };
}

// === FILTERS ===
function getFilters() {
  return {
    search: document.getElementById('search-input').value.toLowerCase().trim(),
    rarity: document.getElementById('filter-rarity').value,
    status: document.getElementById('filter-status').value
  };
}

function itemMatchesFilters(item, filters) {
  if (filters.search) {
    const text = (item.name + ' ' + item.location + ' ' + (item.effect || '') + ' ' + (item.bonus || '')).toLowerCase();
    if (!text.includes(filters.search)) return false;
  }
  if (filters.rarity !== 'all' && item.rarity !== filters.rarity) return false;
  if (filters.status === 'collected' && !collectedItems[item.id]) return false;
  if (filters.status === 'missing' && collectedItems[item.id]) return false;
  return true;
}

// === PLACEHOLDER ICONS ===
const SECTION_ICONS = {
  weapons: '⚔️',
  armor: '🛡️',
  bosses: '💀',
  traits: '📊',
  mods: '🔮',
  rings: '💍',
  amulets: '📿',
  events: '🎲'
};

// === ITEM DETAIL POPUP ===
function showItemPopup(item, sectionKey) {
  const isCollected = !!collectedItems[item.id];
  const placeholderIcon = SECTION_ICONS[sectionKey] || '❓';

  const imageContent = item.image
    ? `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
       <div class="item-image-placeholder" style="display:none">${placeholderIcon}</div>`
    : `<div class="item-image-placeholder">${placeholderIcon}</div>`;

  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';

  let detailRows = '';

  // Location
  detailRows += `
    <div class="popup-detail-row">
      <div class="popup-detail-icon">📍</div>
      <div class="popup-detail-content">
        <div class="popup-detail-label">Vị trí</div>
        <div class="popup-detail-value">${item.location}</div>
      </div>
    </div>`;

  // How to get
  if (item.guide) {
    detailRows += `
    <div class="popup-detail-row">
      <div class="popup-detail-icon">📖</div>
      <div class="popup-detail-content">
        <div class="popup-detail-label">Cách lấy</div>
        <div class="popup-detail-value">${item.guide}</div>
      </div>
    </div>`;
  }

  // Effect / Bonus
  if (item.effect) {
    detailRows += `
    <div class="popup-detail-row">
      <div class="popup-detail-icon">⚡</div>
      <div class="popup-detail-content">
        <div class="popup-detail-label">Hiệu ứng</div>
        <div class="popup-detail-value">${item.effect}</div>
      </div>
    </div>`;
  }
  if (item.bonus) {
    detailRows += `
    <div class="popup-detail-row">
      <div class="popup-detail-icon">🎯</div>
      <div class="popup-detail-content">
        <div class="popup-detail-label">Set Bonus</div>
        <div class="popup-detail-value">${item.bonus}</div>
      </div>
    </div>`;
  }

  // Alt Kill
  if (item.altKill && item.altKill !== 'Khong') {
    detailRows += `
    <div class="popup-detail-row">
      <div class="popup-detail-icon">💡</div>
      <div class="popup-detail-content">
        <div class="popup-detail-label">Cách giết khác</div>
        <div class="popup-detail-value">${item.altKill}</div>
      </div>
    </div>`;
  }

  // Category
  detailRows += `
    <div class="popup-detail-row">
      <div class="popup-detail-icon">${SECTION_ICONS[sectionKey] || '📦'}</div>
      <div class="popup-detail-content">
        <div class="popup-detail-label">Danh mục</div>
        <div class="popup-detail-value">${GAME_DATA[sectionKey]?.label || sectionKey}</div>
      </div>
    </div>`;

  // Rarity display
  const rarityLabel = { normal: 'Thường', rare: 'Hiếm', boss: 'Boss Drop', dlc: 'DLC' }[item.rarity] || item.rarity;

  // Wiki link
  const wikiName = item.name.replace(/\s/g, '+').replace(/'/g, '%27');
  const wikiUrl = `https://remnantfromtheashes.wiki.fextralife.com/${wikiName}`;

  overlay.innerHTML = `
    <div class="popup">
      <div class="popup-image ${isCollected ? 'collected-bg' : ''}">
        ${imageContent}
        <button class="popup-close">✕</button>
      </div>
      <div class="popup-body">
        <div class="popup-header">
          <div class="popup-title">${item.name}</div>
          <span class="popup-rarity rarity-badge rarity-${item.rarity}">${rarityLabel}</span>
        </div>
        <div class="popup-details">
          ${detailRows}
        </div>
        <div class="popup-actions">
          <button class="popup-btn popup-btn-collect ${isCollected ? 'is-collected' : ''}" id="popup-toggle">
            ${isCollected ? '↩ Bỏ đánh dấu' : '✓ Đã thu thập'}
          </button>
          <a href="${wikiUrl}" target="_blank" rel="noopener" class="popup-btn popup-btn-wiki" title="Xem trên Wiki">🔗</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Close popup
  overlay.querySelector('.popup-close').onclick = () => overlay.remove();
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  // Toggle collect
  overlay.querySelector('#popup-toggle').onclick = () => {
    toggleItem(item.id);
    overlay.remove();
  };

  // Close on ESC
  const escHandler = (e) => {
    if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', escHandler); }
  };
  document.addEventListener('keydown', escHandler);
}

// === RENDER NAV ===
function renderNav() {
  const nav = document.getElementById('category-nav');
  nav.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.className = `nav-btn ${activeSection === null ? 'active' : ''}`;
  const allCount = countAll();
  allBtn.innerHTML = `Tất cả <span class="nav-progress">${allCount.collected}/${allCount.total}</span>`;
  allBtn.onclick = () => { activeSection = null; renderAll(); };
  nav.appendChild(allBtn);

  for (const [key, section] of Object.entries(GAME_DATA)) {
    const btn = document.createElement('button');
    const count = countSection(section);
    btn.className = `nav-btn ${activeSection === key ? 'active' : ''}`;
    btn.innerHTML = `${section.icon} ${section.label} <span class="nav-progress">${count.collected}/${count.total}</span>`;
    btn.onclick = () => { activeSection = key; renderAll(); };
    nav.appendChild(btn);
  }
}

// === RENDER ITEMS ===
function renderItemCard(item, sectionKey, catKey) {
  const isCollected = !!collectedItems[item.id];
  const card = document.createElement('div');
  card.className = `item-card ${isCollected ? 'collected' : ''}`;
  card.onclick = () => showItemPopup(item, sectionKey);

  let extraHTML = '';
  if (item.effect) extraHTML = `<div class="item-extra">${item.effect}</div>`;
  if (item.bonus) extraHTML = `<div class="item-extra">${item.bonus}</div>`;
  if (item.altKill && item.altKill !== 'Khong') extraHTML += `<div class="item-extra">Alt Kill: ${item.altKill}</div>`;

  // Image or placeholder
  const placeholderIcon = SECTION_ICONS[sectionKey] || '❓';
  const imageContent = item.image
    ? `<img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
       <div class="item-image-placeholder" style="display:none">${placeholderIcon}</div>`
    : `<div class="item-image-placeholder">${placeholderIcon}</div>`;

  const collectedBadge = isCollected ? `<div class="item-collected-badge">✓</div>` : '';

  card.innerHTML = `
    <div class="item-image-wrap">
      ${imageContent}
      ${collectedBadge}
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
}

function renderSection(key, section) {
  const filters = getFilters();
  const meta = SECTION_META[key] || {};

  // Check if any items match
  let hasVisibleItems = false;
  for (const cat of Object.values(section.categories)) {
    if (cat.items.some(item => itemMatchesFilters(item, filters))) {
      hasVisibleItems = true;
      break;
    }
  }
  if (!hasVisibleItems) return null;

  const container = document.createElement('div');
  container.className = 'section';
  container.id = `section-${key}`;

  const count = countSection(section);
  const pct = count.total > 0 ? Math.round((count.collected / count.total) * 100) : 0;

  // Banner
  const bannerClass = meta.banner ? `banner-${meta.banner}` : 'banner-weapons';
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

  for (const [catKey, cat] of Object.entries(section.categories)) {
    const filteredItems = cat.items.filter(item => itemMatchesFilters(item, filters));
    if (filteredItems.length === 0) continue;

    const subcategory = document.createElement('div');
    subcategory.className = 'subcategory';

    if (Object.keys(section.categories).length > 1) {
      subcategory.innerHTML = `<div class="subcategory-title">${cat.label}</div>`;
    }

    const grid = document.createElement('div');
    grid.className = 'item-grid';

    for (const item of filteredItems) {
      grid.appendChild(renderItemCard(item, key, catKey));
    }

    subcategory.appendChild(grid);
    body.appendChild(subcategory);
  }

  container.appendChild(body);
  return container;
}

// === RENDER ALL ===
function renderAll() {
  renderNav();

  const app = document.getElementById('app');
  app.innerHTML = '';

  const sections = activeSection
    ? { [activeSection]: GAME_DATA[activeSection] }
    : GAME_DATA;

  let anyVisible = false;

  for (const [key, section] of Object.entries(sections)) {
    const el = renderSection(key, section);
    if (el) {
      app.appendChild(el);
      anyVisible = true;
    }
  }

  if (!anyVisible) {
    app.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        Không tìm thấy vật phẩm nào phù hợp.
      </div>`;
  }

  // Update global stats
  const all = countAll();
  const pct = all.total > 0 ? Math.round((all.collected / all.total) * 100) : 0;
  document.getElementById('total-progress').textContent = `${pct}%`;
  document.getElementById('total-collected').textContent = `${all.collected}/${all.total}`;

  // Progress ring
  const circle = document.getElementById('progress-ring-circle');
  const circumference = 2 * Math.PI * 42; // r=42
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference - (pct / 100) * circumference;

  // Sections completed
  let completedSections = 0;
  const totalSections = Object.keys(GAME_DATA).length;
  for (const section of Object.values(GAME_DATA)) {
    const c = countSection(section);
    if (c.collected === c.total && c.total > 0) completedSections++;
  }
  document.getElementById('total-sections').textContent = `${completedSections}/${totalSections}`;
}

// === EVENT LISTENERS ===
document.getElementById('search-input').addEventListener('input', renderAll);
document.getElementById('filter-rarity').addEventListener('change', renderAll);
document.getElementById('filter-status').addEventListener('change', renderAll);
document.getElementById('btn-reset').addEventListener('click', resetAll);

// === INIT ===
renderAll();
