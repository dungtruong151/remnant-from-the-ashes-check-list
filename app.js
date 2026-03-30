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
      <h3>Reset toan bo?</h3>
      <p>Tat ca tien trinh se bi xoa va khong the khoi phuc.</p>
      <div class="dialog-actions">
        <button class="btn-cancel" id="dialog-cancel">Huy</button>
        <button class="btn-confirm" id="dialog-confirm">Xoa het</button>
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

// === RENDER NAV ===
function renderNav() {
  const nav = document.getElementById('category-nav');
  nav.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.className = `nav-btn ${activeSection === null ? 'active' : ''}`;
  const allCount = countAll();
  allBtn.innerHTML = `Tat ca <span class="nav-progress">${allCount.collected}/${allCount.total}</span>`;
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
  card.onclick = () => toggleItem(item.id);

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
        <div class="count-label">${pct}% hoan thanh</div>
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
        Khong tim thay vat pham nao phu hop.
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
