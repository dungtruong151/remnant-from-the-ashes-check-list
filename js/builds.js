/**
 * builds.js - Pro Builds page (inline, không phải popup)
 */

const BUILDS_DATA = [
  { id:"melting_pot", name:"Melting Pot", author:"ZAKR13L", playstyle:"DPS",
    desc:"Dọn quái tốt, cực mạnh khi đối đầu boss. Chú ý fat-roll cần luyện tập.",
    equipment:{ longGun:"Beam Rifle", handGun:"Submachine Gun", melee:"Guardian Axe", mods:["Hunter's Mark","Swarm"], armor:"Radiant Set", amulet:"Storm Amulet", rings:["Stone of Balance","Devouring Loop"] },
    traits:["Quick Hands","Executioner","Kingslayer","Trigger Happy","Exploiter","Mind's Eye","Vigor","Endurance","Mother's Blessing","Keeper's Blessing","Guardian's Blessing","Bark Skin","Spirit","World Walker","Recovery","Glutton","Handling","Arcane Strike","Swiftness","Warrior","Rapid Strike"] },
  { id:"just_melts", name:"Just Melts", author:"Anonymous", playstyle:"DPS",
    desc:"Build đơn giản, sát thương cao với Hot Shot + Song of Swords.",
    equipment:{ longGun:"Assault Rifle", handGun:"Submachine Gun", mods:["Hot Shot","Song of Swords"] },
    traits:["Quick Hands","Vigor","Endurance","Mind's Eye","Kingslayer","Executioner","Trigger Happy","Exploiter","Spirit","Catalyst"] },
  { id:"crit_crusher", name:"Crit Crusher", author:"Roran", playstyle:"Crit",
    desc:"Eye of the Storm + Static Field Shot + Breath of the Desert. Crit synergy cao.",
    equipment:{ longGun:"Eye of the Storm", handGun:"Submachine Gun", mods:["Static Field Shot","Breath of the Desert"], armor:"Hunter Set", amulet:"Storm Amulet", rings:["Devouring Loop","Heartseeker"] },
    traits:["Shadow Walker","Exploiter","Spirit","Quick Hands","Executioner","Kingslayer","Mind's Eye","Catalyst"] },
  { id:"one_shot", name:"One-Shot", author:"Dareitus", playstyle:"Burst",
    desc:"+40% crit chance cơ bản. +35% bonus damage mỗi viên. Crossbow cần kỹ năng.",
    equipment:{ longGun:"Crossbow", mods:["Hunter's Mark"], armor:"Slayer Set", amulet:"Gunslinger's Charm", rings:["Heartseeker","Braided Thorns"] },
    traits:["Executioner","Quick Hands","Exploiter","Kingslayer","Mind's Eye"] },
  { id:"the_unkillable", name:"The Unkillable", author:"Blankfacegamer", playstyle:"Tank",
    desc:"Build gần như bất tử — Ruin (tự hồi sinh) + Cultist Set + Leech Ember.",
    equipment:{ longGun:"Ruin", mods:["Undying"], armor:"Cultist's Set", amulet:"Galenic Charm", rings:["Leech Ember","Root Circlet"] },
    traits:["Vigor","Endurance","Spirit","Recovery","Triage"] },
  { id:"heavy_hitter_sustained", name:"Heavy Hitter (Sustained)", author:"Plat", playstyle:"DPS",
    desc:"Sustained DPS cao với Sporebloom. Mix giáp Drifter + Slayer + Bandit.",
    equipment:{ longGun:"Sporebloom", handGun:"Magnum Revolver", mods:["Spore Shot","Hot Shot"], armor:"Drifter's Set", amulet:"Gunslinger's Charm", rings:["Devouring Loop","Stone of Balance"] },
    traits:["Quick Hands","Executioner","Kingslayer","Mind's Eye","Exploiter","Trigger Happy"] },
  { id:"heavy_hitter_elemental", name:"Heavy Hitter (Elemental)", author:"Plat", playstyle:"Elemental",
    desc:"Elemental burst với Sporebloom (Rot) + Spitfire (Fire). Crit synergy.",
    equipment:{ longGun:"Sporebloom", handGun:"Spitfire", mods:["Spore Shot","Flame Thrower"], armor:"Slayer Set", amulet:"Storm Amulet", rings:["Devouring Loop","Stone of Balance"] },
    traits:["Executioner","Kingslayer","Mind's Eye","Exploiter","Catalyst"] },
  { id:"crit_build", name:"Crit Build", author:"HolyApplebutter", playstyle:"Crit",
    desc:"Radiant Set + Chicago Typewriter cho crit DPS liên tục.",
    equipment:{ longGun:"Chicago Typewriter", handGun:"Submachine Gun", mods:["Hunter's Mark","Breath of the Desert"], armor:"Radiant Set", amulet:"Gunslinger's Charm", rings:["Braided Thorns","Stone of Balance"] },
    traits:["Executioner","Kingslayer","Quick Hands","Trigger Happy","Mind's Eye","Spirit"] },
  { id:"headhunter", name:"The Headhunter", author:"Anonymous", playstyle:"Crit",
    desc:"Hunter Set + Hunter's Mark tăng weak spot damage tối đa.",
    equipment:{ longGun:"Assault Rifle", handGun:"Hunting Pistol", mods:["Hunter's Mark","Song of Swords"], armor:"Hunter Set", amulet:"Gunslinger's Charm", rings:["Braided Thorns","Hunter's Band"] },
    traits:["Executioner","Exploiter","Quick Hands","Kingslayer","Mind's Eye"] },
  { id:"devastation", name:"Devastation", author:"Anonymous", playstyle:"Burst",
    desc:"Void Set chuyển damage nhận thành damage gây ra. Cực nguy hiểm nhưng sát thương khổng lồ.",
    equipment:{ longGun:"Devastator", handGun:"Hunting Pistol", mods:["Skewer","Hunter's Mark"], armor:"Void Set", amulet:"Leto's Amulet", rings:["Braided Thorns","Jewel of the Black Sun"] },
    traits:["Kingslayer","Executioner","Mind's Eye","Exploiter","Quick Hands"] },
  { id:"immortal_summoner", name:"Immortal Summoner", author:"Anonymous", playstyle:"Summon",
    desc:"Cultist Set + summon build. Soul Link hồi máu từ summon damage. Tốt cho co-op.",
    equipment:{ longGun:"Chicago Typewriter", handGun:"Submachine Gun", mods:["Seeker","Beckon"], armor:"Cultist's Set", amulet:"Soul Anchor", rings:["Soul Link","Soul Ember"] },
    traits:["Spirit","Invoker","Arcane Strike","Vigor","Recovery"] },
  { id:"crit_one_shot", name:"Crit One-Shot", author:"Anonymous", playstyle:"Burst",
    desc:"Slayer Set + Sniper Rifle cho đòn 1-shot chí mạng cực mạnh.",
    equipment:{ longGun:"Sniper Rifle", handGun:"Hunting Pistol", mods:["Hunter's Mark","Song of Swords"], armor:"Slayer Set", amulet:"Gunslinger's Charm", rings:["Heartseeker","Hunter's Band"] },
    traits:["Executioner","Kingslayer","Quick Hands","Exploiter","Mind's Eye"] },
  { id:"bottomless_stock", name:"Bottomless Stock", author:"Anonymous", playstyle:"Sustain",
    desc:"Bandit Set hoàn đạn liên tục. Không bao giờ hết đạn.",
    equipment:{ longGun:"Chicago Typewriter", handGun:"Spitfire", mods:["Iron Sentinel","Flame Thrower"], armor:"Bandit Set", amulet:"Gunslinger's Charm", rings:["Stockpile Circlet","Ring of Elusion"] },
    traits:["Quick Hands","Trigger Happy","Executioner","Spirit","Recovery"] },
  { id:"crit_auto_no_dlc", name:"Crit Auto (No DLC)", author:"Anonymous", playstyle:"Crit",
    desc:"Build crit không cần DLC. Radiant Set + Beam Rifle + Swarm.",
    equipment:{ longGun:"Beam Rifle", handGun:"Submachine Gun", mods:["Swarm","Hunter's Mark"], armor:"Radiant Set", amulet:"Gunslinger's Charm", rings:["Devouring Loop","Braided Thorns"] },
    traits:["Executioner","Kingslayer","Quick Hands","Trigger Happy","Mind's Eye","Spirit"] },
  { id:"easy_mode", name:"Easy Mode", author:"Anonymous", playstyle:"DPS",
    desc:"Build dễ chơi. DLC: Machine Pistol + Fan of Knives.",
    equipment:{ longGun:"Beam Rifle", handGun:"Machine Pistol", mods:["Fan of Knives","Swarm"], armor:"Radiant Set", amulet:"Polished Whetstone", rings:["Ring of the Mantis","Heartseeker"] },
    traits:["Executioner","Kingslayer","Quick Hands","Mind's Eye","Exploiter"] },
];

const EQ_ICONS = { longGun:"🔫", handGun:"🔫", melee:"⚔️", mods:"🔮", armor:"🛡️", amulet:"📿", rings:"💍" };
const EQ_LABELS = { longGun:"Long Gun", handGun:"Hand Gun", melee:"Melee", mods:"Mods", armor:"Armor", amulet:"Amulet", rings:"Rings" };

const Builds = {
  _activeStyle: 'all',
  _detailId: null,

  _nameToId(name) {
    const r = this._findFull(name);
    return r ? r.item.id : null;
  },

  _findFull(name) {
    if (!name) return null;
    const norm = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const [sk, sec] of Object.entries(GAME_DATA)) {
      for (const cat of Object.values(sec.categories)) {
        for (const item of cat.items) {
          const n = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (n === norm || n.startsWith(norm) || norm.startsWith(n)) return { item, sectionKey: sk };
        }
      }
    }
    return null;
  },

  _getProgress(build) {
    const eq = build.equipment;
    const items = [eq.longGun, eq.handGun, eq.melee, ...(eq.mods||[]), eq.armor, eq.amulet, ...(eq.rings||[])].filter(Boolean);
    let have = 0;
    for (const name of items) {
      const id = this._nameToId(name);
      if (id && State.isCollected(id)) have++;
    }
    return { have, total: items.length, pct: items.length ? Math.round(have/items.length*100) : 0 };
  },

  renderPage() {
    this._renderFilterBar();
    if (this._detailId) this._renderDetail(this._detailId);
    else this._renderList();
  },

  _renderFilterBar() {
    const bar = document.getElementById('builds-filter-bar');
    const styles = ['all', ...new Set(BUILDS_DATA.map(b => b.playstyle))];
    bar.innerHTML = styles.map(s => `
      <button class="builds-filter-btn ${this._activeStyle === s ? 'active' : ''}" data-style="${s}">
        ${s === 'all' ? 'Tất cả' : s}
      </button>`).join('');
    bar.querySelectorAll('.builds-filter-btn').forEach(btn => {
      btn.onclick = () => {
        this._activeStyle = btn.dataset.style;
        this._renderFilterBar();
        this._renderList();
      };
    });
  },

  _renderList() {
    const list = document.getElementById('builds-list');
    list.style.display = '';
    const detail = document.getElementById('build-detail-view');
    if (detail) detail.classList.remove('active');

    const filtered = this._activeStyle === 'all'
      ? BUILDS_DATA
      : BUILDS_DATA.filter(b => b.playstyle === this._activeStyle);

    list.innerHTML = filtered.map(b => {
      const prog = this._getProgress(b);
      const eq = b.equipment;
      return `
        <div class="build-card" data-id="${b.id}">
          <div class="build-card-head">
            <span class="build-card-name">${b.name}</span>
            <span class="build-playstyle-badge">${b.playstyle}</span>
          </div>
          <div class="build-card-body">
            <div class="build-author">by ${b.author}</div>
            <div class="build-desc">${b.desc}</div>
            <div class="build-equipment">
              ${eq.longGun ? `<div class="build-eq-row"><span class="build-eq-label">Long Gun</span><span class="build-eq-value ${this._itemClass(eq.longGun)}">${eq.longGun}</span></div>` : ''}
              ${eq.handGun ? `<div class="build-eq-row"><span class="build-eq-label">Hand Gun</span><span class="build-eq-value ${this._itemClass(eq.handGun)}">${eq.handGun}</span></div>` : ''}
              ${eq.armor   ? `<div class="build-eq-row"><span class="build-eq-label">Armor</span><span class="build-eq-value ${this._itemClass(eq.armor)}">${eq.armor}</span></div>` : ''}
              ${eq.amulet  ? `<div class="build-eq-row"><span class="build-eq-label">Amulet</span><span class="build-eq-value ${this._itemClass(eq.amulet)}">${eq.amulet}</span></div>` : ''}
            </div>
            <div class="build-progress">
              <div class="build-progress-bar"><div class="build-progress-fill" style="width:${prog.pct}%"></div></div>
              <span class="build-progress-text">${prog.have}/${prog.total} items</span>
            </div>
          </div>
        </div>`;
    }).join('');

    list.querySelectorAll('.build-card').forEach(card => {
      card.onclick = () => this._renderDetail(card.dataset.id);
    });
  },

  _itemClass(name) {
    const id = this._nameToId(name);
    if (!id) return '';
    return State.isCollected(id) ? 'have' : 'missing';
  },

  _renderDetail(id) {
    this._detailId = id;
    const build = BUILDS_DATA.find(b => b.id === id);
    if (!build) return;

    const list = document.getElementById('builds-list');
    list.style.display = 'none';

    let detailEl = document.getElementById('build-detail-view');
    if (!detailEl) {
      detailEl = document.createElement('div');
      detailEl.id = 'build-detail-view';
      document.getElementById('page-builds').appendChild(detailEl);
    }

    const eq = build.equipment;
    const prog = this._getProgress(build);

    const makeEqCards = (label, names) => {
      if (!names) return '';
      const arr = Array.isArray(names) ? names : [names];
      return arr.map(name => {
        const found = this._findFull(name);
        const item = found?.item;
        const sk = found?.sectionKey;
        const collected = item && State.isCollected(item.id);
        const cls = !item ? 'unknown' : collected ? 'have' : 'missing';

        const imgEl = item?.image
          ? `<img src="${item.image}" alt="${name}" loading="lazy" onerror="this.style.display='none'">`
          : '';

        return `<div class="bd-item-card ${cls} ${item ? 'bd-item-card--click' : ''}"
                    ${item ? `data-item-id="${item.id}" data-sk="${sk}"` : ''}>
          <div class="bd-item-img">${imgEl}</div>
          <div class="bd-item-info">
            <div class="bd-item-label">${label}</div>
            <div class="bd-item-name">${name}</div>
            ${collected
              ? `<span class="bd-item-badge have-badge">✓ Đã có</span>`
              : item ? `<span class="bd-item-badge missing-badge">Chưa có</span>` : ''}
          </div>
        </div>`;
      }).join('');
    };

    detailEl.innerHTML = `
      <div class="build-detail-back" id="build-back">← Quay lại danh sách</div>
      <div class="build-detail-content">
        <div class="build-detail-title">${build.name}</div>
        <div class="build-detail-meta">by ${build.author} · ${build.playstyle} · ${prog.have}/${prog.total} items đã có (${prog.pct}%)</div>
        <div class="build-detail-desc">${build.desc}</div>
        <div class="build-detail-grid">
          <div class="build-detail-section">
            <h4>Equipment</h4>
            <div class="bd-items-grid">
              ${makeEqCards('Long Gun', eq.longGun)}
              ${makeEqCards('Hand Gun', eq.handGun)}
              ${makeEqCards('Melee', eq.melee)}
              ${makeEqCards('Mod', eq.mods)}
              ${makeEqCards('Armor', eq.armor)}
              ${makeEqCards('Amulet', eq.amulet)}
              ${makeEqCards('Ring', eq.rings)}
            </div>
          </div>
          ${build.traits?.length ? `
          <div class="build-detail-section">
            <h4>Key Traits</h4>
            <div class="build-traits-grid">
              ${build.traits.map(t => {
                const found = this._findFull(t);
                const collected = found && State.isCollected(found.item.id);
                return `<span class="build-trait ${collected ? 'have' : ''} ${found ? 'build-trait--click' : ''}"
                             ${found ? `data-item-id="${found.item.id}" data-sk="${found.sectionKey}"` : ''}>${t}</span>`;
              }).join('')}
            </div>
          </div>` : ''}
        </div>
      </div>`;

    detailEl.classList.add('active');

    document.getElementById('build-back').onclick = () => {
      this._detailId = null;
      detailEl.classList.remove('active');
      list.style.display = '';
    };

    // Click equipment card → mở popup
    detailEl.querySelectorAll('.bd-item-card--click').forEach(card => {
      card.onclick = () => {
        const { itemId, sk } = card.dataset;
        const item = Object.values(GAME_DATA[sk]?.categories || {})
          .flatMap(c => c.items).find(i => i.id === itemId);
        if (item) Popup.showItem(item, sk);
      };
    });

    // Click trait tag → mở popup
    detailEl.querySelectorAll('.build-trait--click').forEach(tag => {
      tag.onclick = () => {
        const { itemId, sk } = tag.dataset;
        const item = Object.values(GAME_DATA[sk]?.categories || {})
          .flatMap(c => c.items).find(i => i.id === itemId);
        if (item) Popup.showItem(item, sk);
      };
    });
  },

  // Legacy popup method (giữ lại để không break)
  showPanel() { document.querySelector('.page-btn[data-page="builds"]')?.click(); },
};
