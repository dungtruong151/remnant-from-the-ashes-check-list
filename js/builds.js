/**
 * builds.js - Pro Builds từ Fextralife Wiki
 * Parse từ wiki/pro_build.html và hiển thị dạng interactive
 */

const BUILDS_DATA = [
  {
    id: "melting_pot",
    name: "Melting Pot",
    author: "ZAKR13L",
    playstyle: "DPS",
    desc: "Dọn quái tốt, cực mạnh khi đối đầu boss. Chú ý: fat-roll cần luyện tập.",
    equipment: {
      longGun: "Beam Rifle",
      handGun: "Submachine Gun",
      melee: "Guardian Axe",
      mods: ["Hunter's Mark", "Swarm"],
      armor: "Radiant Set",
      amulet: "Storm Amulet",
      rings: ["Stone of Balance", "Devouring Loop"],
    },
    traits: ["Quick Hands", "Executioner", "Kingslayer", "Trigger Happy", "Exploiter", "Mind's Eye", "Vigor", "Endurance", "Mother's Blessing", "Keeper's Blessing", "Guardian's Blessing", "Bark Skin", "Spirit", "World Walker", "Recovery", "Glutton", "Handling", "Arcane Strike", "Swiftness", "Warrior", "Rapid Strike"],
  },
  {
    id: "just_melts",
    name: "Just Melts",
    author: "Anonymous",
    playstyle: "DPS",
    desc: "Build đơn giản, sát thương cao với Hot Shot + Song of Swords.",
    equipment: {
      longGun: "Assault Rifle",
      handGun: "Submachine Gun",
      mods: ["Hot Shot", "Song of Swords"],
    },
    traits: ["Quick Hands", "Vigor", "Endurance", "Mind's Eye", "Kingslayer", "Executioner", "Trigger Happy", "Exploiter", "Spirit", "Catalyst"],
  },
  {
    id: "crit_crusher",
    name: "Crit Crusher",
    author: "Roran",
    playstyle: "Crit",
    desc: "Build crit kết hợp Eye of the Storm với Static Field Shot + Breath of the Desert.",
    equipment: {
      longGun: "Eye of the Storm",
      handGun: "Submachine Gun",
      mods: ["Static Field Shot", "Breath of the Desert"],
      armor: "Hunter Set",
      amulet: "Storm Amulet",
      rings: ["Devouring Loop", "Heartseeker"],
    },
    traits: ["Shadow Walker", "Exploiter", "Spirit", "Quick Hands", "Executioner", "Kingslayer", "Mind's Eye", "Catalyst"],
  },
  {
    id: "one_shot",
    name: "One-Shot",
    author: "Dareitus",
    playstyle: "Burst",
    desc: "+40% crit chance cơ bản, +35% bonus damage mỗi viên. Crossbow cần kỹ năng để dùng.",
    equipment: {
      longGun: "Crossbow",
      mods: ["Hunter's Mark"],
      armor: "Slayer Set",
      amulet: "Gunslinger's Charm",
      rings: ["Heartseeker", "Braided Thorns"],
    },
    traits: ["Executioner", "Quick Hands", "Exploiter", "Kingslayer", "Mind's Eye"],
  },
  {
    id: "the_unkillable",
    name: "The Unkillable",
    author: "Blankfacegamer",
    playstyle: "Tank",
    desc: "Build gần như bất tử với Ruin (tự hồi sinh) + Cultist Set + Leech Ember. Lifestealing + mod power cực cao.",
    equipment: {
      longGun: "Ruin",
      mods: ["Undying"],
      armor: "Cultist's Set",
      amulet: "Galenic Charm",
      rings: ["Leech Ember", "Root Circlet"],
    },
    traits: ["Vigor", "Endurance", "Spirit", "Recovery", "Triage"],
  },
  {
    id: "heavy_hitter_sustained",
    name: "Heavy Hitter (Sustained)",
    author: "Plat",
    playstyle: "DPS",
    desc: "Sustained DPS cao với Sporebloom. Mix giáp: 1x Drifter + 1x Slayer + 1x Bandit.",
    equipment: {
      longGun: "Sporebloom",
      handGun: "Magnum Revolver",
      mods: ["Spore Shot", "Hot Shot"],
      armor: "Drifter's Set",
      amulet: "Gunslinger's Charm",
      rings: ["Devouring Loop", "Stone of Balance"],
    },
    traits: ["Quick Hands", "Executioner", "Kingslayer", "Mind's Eye", "Exploiter", "Trigger Happy"],
  },
  {
    id: "heavy_hitter_elemental",
    name: "Heavy Hitter (Elemental)",
    author: "Plat",
    playstyle: "Elemental",
    desc: "Elemental burst damage với Sporebloom (Rot) + Spitfire (Fire). Crit synergy cao.",
    equipment: {
      longGun: "Sporebloom",
      handGun: "Spitfire",
      mods: ["Spore Shot", "Flame Thrower"],
      armor: "Slayer Set",
      amulet: "Storm Amulet",
      rings: ["Devouring Loop", "Stone of Balance"],
    },
    traits: ["Executioner", "Kingslayer", "Mind's Eye", "Exploiter", "Catalyst"],
  },
  {
    id: "crit_build",
    name: "Crit Build",
    author: "HolyApplebutter",
    playstyle: "Crit",
    desc: "Radiant Set + Chicago Typewriter cho crit DPS liên tục.",
    equipment: {
      longGun: "Chicago Typewriter",
      handGun: "Submachine Gun",
      mods: ["Hunter's Mark", "Breath of the Desert"],
      armor: "Radiant Set",
      amulet: "Gunslinger's Charm",
      rings: ["Braided Thorns", "Stone of Balance"],
    },
    traits: ["Executioner", "Kingslayer", "Quick Hands", "Trigger Happy", "Mind's Eye", "Spirit"],
  },
  {
    id: "the_headhunter",
    name: "The Headhunter",
    author: "Anonymous",
    playstyle: "Crit",
    desc: "Hunter Set + Hunter's Mark tăng weak spot damage tối đa.",
    equipment: {
      longGun: "Assault Rifle",
      handGun: "Hunting Pistol",
      mods: ["Hunter's Mark", "Song of Swords"],
      armor: "Hunter Set",
      amulet: "Gunslinger's Charm",
      rings: ["Braided Thorns", "Hunter's Band"],
    },
    traits: ["Executioner", "Exploiter", "Quick Hands", "Kingslayer", "Mind's Eye"],
  },
  {
    id: "devastation",
    name: "Devastation",
    author: "Anonymous",
    playstyle: "Burst",
    desc: "Dodge ít nhất có thể — Void Set chuyển damage nhận thành damage gây ra. Cực nguy hiểm nhưng sát thương khổng lồ.",
    equipment: {
      longGun: "Devastator",
      handGun: "Hunting Pistol",
      mods: ["Skewer", "Hunter's Mark"],
      armor: "Void Set",
      amulet: "Leto's Amulet",
      rings: ["Braided Thorns", "Jewel of the Black Sun"],
    },
    traits: ["Kingslayer", "Executioner", "Mind's Eye", "Exploiter", "Quick Hands"],
  },
  {
    id: "immortal_summoner",
    name: "Immortal Summoner",
    author: "Anonymous",
    playstyle: "Summon",
    desc: "Cultist Set + summon build. Soul Link hồi máu từ summon damage. Chủ yếu chơi co-op.",
    equipment: {
      longGun: "Chicago Typewriter",
      handGun: "Submachine Gun",
      mods: ["Seeker", "Beckon"],
      armor: "Cultist's Set",
      amulet: "Soul Anchor",
      rings: ["Soul Link", "Soul Ember"],
    },
    traits: ["Spirit", "Invoker", "Arcane Strike", "Vigor", "Recovery"],
  },
  {
    id: "crit_one_shot",
    name: "Crit One-Shot",
    author: "Anonymous",
    playstyle: "Burst",
    desc: "Slayer Set + Sniper Rifle cho đòn 1-shot chí mạng cực mạnh.",
    equipment: {
      longGun: "Sniper Rifle",
      handGun: "Hunting Pistol",
      mods: ["Hunter's Mark", "Song of Swords"],
      armor: "Slayer Set",
      amulet: "Gunslinger's Charm",
      rings: ["Heartseeker", "Hunter's Band"],
    },
    traits: ["Executioner", "Kingslayer", "Quick Hands", "Exploiter", "Mind's Eye"],
  },
  {
    id: "bottomless_stock",
    name: "Bottomless Stock",
    author: "Anonymous",
    playstyle: "Sustain",
    desc: "Bandit Set hoàn đạn liên tục với Chicago Typewriter. Không bao giờ hết đạn.",
    equipment: {
      longGun: "Chicago Typewriter",
      handGun: "Spitfire",
      mods: ["Iron Sentinel", "Flame Thrower"],
      armor: "Bandit Set",
      amulet: "Gunslinger's Charm",
      rings: ["Stockpile Circlet", "Ring of Elusion"],
    },
    traits: ["Quick Hands", "Trigger Happy", "Executioner", "Spirit", "Recovery"],
  },
  {
    id: "crit_auto_no_dlc",
    name: "Crit Auto (No DLC)",
    author: "Anonymous",
    playstyle: "Crit",
    desc: "Build crit không cần DLC. Radiant Set + Beam Rifle + Swarm.",
    equipment: {
      longGun: "Beam Rifle",
      handGun: "Submachine Gun",
      mods: ["Swarm", "Hunter's Mark"],
      armor: "Radiant Set",
      amulet: "Gunslinger's Charm",
      rings: ["Devouring Loop", "Braided Thorns"],
    },
    traits: ["Executioner", "Kingslayer", "Quick Hands", "Trigger Happy", "Mind's Eye", "Spirit"],
  },
  {
    id: "easy_mode",
    name: "Easy Mode",
    author: "Anonymous",
    playstyle: "DPS",
    desc: "Build dễ chơi với Radiant Set + Beam Rifle. DLC: Machine Pistol + Fan of Knives.",
    equipment: {
      longGun: "Beam Rifle",
      handGun: "Machine Pistol",
      mods: ["Fan of Knives", "Swarm"],
      armor: "Radiant Set",
      amulet: "Polished Whetstone",
      rings: ["Ring of the Mantis", "Heartseeker"],
    },
    traits: ["Executioner", "Kingslayer", "Quick Hands", "Mind's Eye", "Exploiter"],
  },
];

// Playstyle colors
const PLAYSTYLE_COLORS = {
  DPS: '#e74c3c',
  Crit: '#f39c12',
  Burst: '#e67e22',
  Tank: '#3498db',
  Sustain: '#27ae60',
  Elemental: '#9b59b6',
  Summon: '#1abc9c',
};

const Builds = {
  _overlay: null,

  showPanel() {
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    this._overlay = overlay;

    overlay.innerHTML = `
      <div class="popup builds-popup">
        <div class="popup-body">
          <div class="popup-header">
            <div class="popup-title">🏆 Pro Builds</div>
            <button class="popup-close">✕</button>
          </div>
          <p class="builds-subtitle">Các build từ cộng đồng Fextralife Wiki. Click vào build để xem chi tiết.</p>
          <div class="builds-filter">
            ${[...new Set(BUILDS_DATA.map(b=>b.playstyle))].map(ps =>
              `<button class="builds-filter-btn" data-style="${ps}" style="background:${PLAYSTYLE_COLORS[ps]}20;border-color:${PLAYSTYLE_COLORS[ps]};color:${PLAYSTYLE_COLORS[ps]}">${ps}</button>`
            ).join('')}
            <button class="builds-filter-btn active" data-style="all">Tất cả</button>
          </div>
          <div class="builds-grid" id="builds-grid">
            ${BUILDS_DATA.map(b => this._renderBuildCard(b)).join('')}
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this._bindEvents(overlay);
  },

  _renderBuildCard(build) {
    const color = PLAYSTYLE_COLORS[build.playstyle] || '#666';
    const eq = build.equipment;
    const collected = this._getCollectedCount(build);

    return `
      <div class="build-card" data-id="${build.id}" data-style="${build.playstyle}">
        <div class="build-card-header" style="border-left:4px solid ${color}">
          <div class="build-card-name">${build.name}</div>
          <span class="build-playstyle-badge" style="background:${color}20;color:${color}">${build.playstyle}</span>
        </div>
        <div class="build-author">by ${build.author}</div>
        <div class="build-desc">${build.desc}</div>
        <div class="build-quick-info">
          ${eq.longGun ? `<span class="build-eq-tag">🔫 ${eq.longGun}</span>` : ''}
          ${eq.armor ? `<span class="build-eq-tag">🛡️ ${eq.armor}</span>` : ''}
        </div>
        <div class="build-collected-bar">
          <div class="build-collected-fill" style="width:${collected.pct}%;background:${color}"></div>
        </div>
        <div class="build-collected-text">${collected.have}/${collected.total} items đã có</div>
      </div>
    `;
  },

  _getCollectedCount(build) {
    const eq = build.equipment;
    const allItems = [
      ...(eq.longGun ? [eq.longGun] : []),
      ...(eq.handGun ? [eq.handGun] : []),
      ...(eq.melee ? [eq.melee] : []),
      ...(eq.mods || []),
      ...(eq.armor ? [eq.armor] : []),
      ...(eq.amulet ? [eq.amulet] : []),
      ...(eq.rings || []),
    ].filter(Boolean);

    let have = 0;
    const total = allItems.length;
    for (const itemName of allItems) {
      const id = this._nameToId(itemName);
      if (id && State.isCollected(id)) have++;
    }
    return { have, total, pct: total ? Math.round(have / total * 100) : 0 };
  },

  _nameToId(name) {
    // Try to match name to item id in GAME_DATA
    const norm = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const sec of Object.values(GAME_DATA)) {
      for (const cat of Object.values(sec.categories)) {
        for (const item of cat.items) {
          const itemNorm = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (itemNorm === norm || itemNorm.startsWith(norm) || norm.startsWith(itemNorm)) {
            return item.id;
          }
        }
      }
    }
    return null;
  },

  _showBuildDetail(build) {
    const eq = build.equipment;
    const color = PLAYSTYLE_COLORS[build.playstyle] || '#666';

    const makeItemRow = (icon, label, names) => {
      if (!names || (Array.isArray(names) && !names.length)) return '';
      const nameArr = Array.isArray(names) ? names : [names];
      return nameArr.map(name => {
        const id = this._nameToId(name);
        const isCollected = id && State.isCollected(id);
        const hasItem = id !== null;
        return `<div class="build-detail-row ${isCollected ? 'have' : hasItem ? 'missing' : 'unknown'}">
          <span class="build-detail-icon">${icon}</span>
          <span class="build-detail-label">${label}</span>
          <span class="build-detail-item">${name}
            ${isCollected ? '<span class="build-have-badge">✓ Đã có</span>' : hasItem ? '<span class="build-missing-badge">✗ Chưa có</span>' : ''}
          </span>
        </div>`;
      }).join('');
    };

    const detailOverlay = document.createElement('div');
    detailOverlay.className = 'popup-overlay';
    detailOverlay.innerHTML = `
      <div class="popup builds-detail-popup">
        <div class="popup-body">
          <div class="popup-header" style="border-bottom:3px solid ${color}">
            <div>
              <div class="popup-title">${build.name}</div>
              <div class="build-author">by ${build.author} · <span class="build-playstyle-badge" style="background:${color}20;color:${color}">${build.playstyle}</span></div>
            </div>
            <button class="popup-close">✕</button>
          </div>
          <p class="build-detail-desc">${build.desc}</p>
          <div class="build-detail-section">
            <h4>⚙️ Equipment</h4>
            ${makeItemRow('🔫', 'Long Gun', eq.longGun)}
            ${makeItemRow('🔫', 'Hand Gun', eq.handGun)}
            ${makeItemRow('⚔️', 'Melee', eq.melee)}
            ${makeItemRow('🔮', 'Mod', eq.mods)}
            ${makeItemRow('🛡️', 'Armor', eq.armor)}
            ${makeItemRow('📿', 'Amulet', eq.amulet)}
            ${makeItemRow('💍', 'Ring', eq.rings)}
          </div>
          ${build.traits?.length ? `
          <div class="build-detail-section">
            <h4>📊 Key Traits</h4>
            <div class="build-traits-grid">
              ${build.traits.map(t => {
                const id = this._nameToId(t);
                const isCollected = id && State.isCollected(id);
                return `<span class="build-trait-tag ${isCollected ? 'have' : ''}">${t}</span>`;
              }).join('')}
            </div>
          </div>` : ''}
        </div>
      </div>
    `;

    document.body.appendChild(detailOverlay);
    detailOverlay.querySelector('.popup-close').onclick = () => detailOverlay.remove();
    detailOverlay.addEventListener('click', e => { if (e.target === detailOverlay) detailOverlay.remove(); });
    const esc = e => { if (e.key === 'Escape') { detailOverlay.remove(); document.removeEventListener('keydown', esc); } };
    document.addEventListener('keydown', esc);
  },

  _bindEvents(overlay) {
    const close = () => { overlay.remove(); this._overlay = null; };
    overlay.querySelector('.popup-close').onclick = close;
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    // Build card click
    overlay.querySelectorAll('.build-card').forEach(card => {
      card.onclick = () => {
        const build = BUILDS_DATA.find(b => b.id === card.dataset.id);
        if (build) this._showBuildDetail(build);
      };
    });

    // Filter buttons
    overlay.querySelectorAll('.builds-filter-btn').forEach(btn => {
      btn.onclick = () => {
        overlay.querySelectorAll('.builds-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const style = btn.dataset.style;
        overlay.querySelectorAll('.build-card').forEach(card => {
          card.style.display = (style === 'all' || card.dataset.style === style) ? '' : 'none';
        });
      };
    });

    const esc = e => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } };
    document.addEventListener('keydown', esc);
  },
};
