/**
 * analyzer.js — Save File Analyzer
 * Chức năng: upload file .sav/.bak → parse → hiển thị world content
 * Tham khảo: https://github.com/hzla/Remnant-World-Analyzer
 */

const Analyzer = {
  _lastData: null,
  _activeMode: 'campaign',

  // === Name mappings ===

  _nameMap: {
    FlickeringHorror: 'Dream Eater', Wisp: 'Hive Wisps', TheRisen: 'Reanimators',
    LizAndLiz: 'Chicago Typewriter', Fatty: 'The Unclean One', WastelandGuardian: 'Claviger',
    RootEnt: 'The Ent', RootDragon: 'Singe', SwarmMaster: 'Scourge',
    RootWraith: 'Shroud', RootTumbleweed: 'The Mangler', KinCaller: 'The Warden',
    Tyrant: 'The Thrall', Vyr: 'Shade & Shatter', ImmolatorAndZephyr: 'Scald & Sear',
    RootBrute: 'Gorefist', SlimeHulk: 'Canker', BlinkFiend: 'Onslaught',
    Sentinel: 'Raze', SwampGuardian: 'Ixillis', Splitter: 'Riphide',
    RatRider: 'Brudvaak & Vargr', ShieldWarden: 'Obryk', BlizzardMage: 'Ikro',
    TheJackal: 'Erfor', Wolf: 'The Ravager', TotemFather: 'Totem Father',
    StormCaller: 'Stormcaller', TheHarrow: 'The Harrow', BarbTerror: 'Barbed Terror',
    QueensTemple: 'Iskal Queen', LastWill: 'Supply Run', HuntersHideout: "Hunter's Hideout",
    MadMerchant: 'Mad Merchant', RootShrine: 'Root Shrine', RootCultist: 'Cult of the Root',
    StuckMerchant: 'Stuck Merchant', DoeShrine: 'Red Doe Shrine', WolfShrine: 'Ravager Shrine',
    FetidPool: 'Fetid Pools', BrainBug: 'Graveyard Elf', Brabus: 'Brabus',
    TheLostGantry: 'The Lost Gantry', ArmorVault: 'Vault of the Heralds',
    TheCleanRoom: 'The Clean Room', BlinkThief: 'Blink Thief',
    WarningTotems: 'Warning Totems', ShamanFlames: 'Shaman Flames',
    FrozenLords: 'Frozen Lords', IceSkimmer: 'Ice Skimmer',
    CreepersPeeper: "Creeper's Peeper", Penitent: "Leto's Lab",
    UrikkiBlademasters: 'Urikki Blademasters', HoundMaster: 'Maul',
  },

  _worldMap: {
    World_City: 'Earth', World_Wasteland: 'Rhom', World_Jungle: 'Yaesha',
    World_Swamp: 'Corsus', World_Snow: 'Reisum',
  },

  _sublocations: {
    RootWraith: 'The Hidden Sanctum', RootBrute: 'Sunken Passage',
    Brabus: 'Cutthroat Channel', RootTumbleweed: 'The Tangled Pass',
    Splitter: 'Research Station Alpha', RootEnt: 'The Choking Hollow',
    RootDragon: 'The Ash Yard', HuntersHideout: 'Hidden Grotto',
    MadMerchant: 'Junktown', LastWill: "Sorrow's Field",
    RootShrine: 'The Gallows', LizAndLiz: 'The Warren', RootCultist: 'Marrow Pass',
    SwarmMaster: 'The Iron Rift', HoundMaster: 'The Burrows',
    Sentinel: 'Shackled Canyon', Vyr: 'The Ardent Temple',
    WastelandGuardian: 'Loom of the Black Sun', TheHarrow: 'The Bunker',
    TheLostGantry: 'Concourse of the Sun', ArmorVault: 'Vault of the Heralds',
    TheCleanRoom: 'The Purge Hall',
    SlimeHulk: 'The Drowned Trench', Tyrant: 'The Capillary',
    FlickeringHorror: 'Hall of Whispers', BarbTerror: 'Needle Lair',
    QueensTemple: 'Iskal Temple', SwampGuardian: 'The Grotto',
    Wisp: 'Circlet Hatchery', FetidPool: 'Fetid Pools',
    BrainBug: 'Strange Pass', Fatty: 'The Shack',
    KinCaller: 'The Hall of Judgement', BlinkFiend: "Widow's Pass",
    BlinkThief: 'Verdant Strand', StormCaller: "Heretic's Nest",
    ImmolatorAndZephyr: 'Withering Village', Wolf: "Ravager's Haunt",
    DoeShrine: "Widow's Vestry", WolfShrine: 'Temple of the Ravager',
    TheRisen: "Ahanae's Lament", TotemFather: 'The Scalding Glade',
    StuckMerchant: 'Merchant Dungeon',
    UrikkiBlademasters: 'Valenhag Mines', ShieldWarden: "Exiles's Trench",
    BlizzardMage: 'Wuthering Keep', TheJackal: 'Wild Reach',
    WarningTotems: "Magir's Dirge", ShamanFlames: 'Grave of the Elders',
    RatRider: 'Crimson Hold', FrozenLords: "Judgement's Spear",
    IceSkimmer: 'The Frieran Sea', CreepersPeeper: "Watcher's Hollow",
  },

  // === Page rendering ===

  renderPage() {
    const container = document.getElementById('analyzer-page-content');
    if (!container) return;

    if (!this._lastData) {
      this._renderUpload(container);
    } else {
      this._renderResults(container);
    }
  },

  _renderUpload(container) {
    container.innerHTML = `
      <div class="analyzer-drop-zone" id="ap-drop">
        <div class="drop-icon">📁</div>
        <div class="drop-text">Kéo thả hoặc click để chọn file save</div>
        <div class="drop-sub">save_0.sav &nbsp;·&nbsp; save_0.bak</div>
        <div class="drop-path">%LOCALAPPDATA%\\Remnant\\Saved\\SaveGames\\</div>
        <input type="file" id="ap-file-input" accept=".sav,.bak" style="display:none">
      </div>
    `;

    const drop = container.querySelector('#ap-drop');
    const fileInput = container.querySelector('#ap-file-input');

    drop.onclick = () => fileInput.click();
    fileInput.onchange = e => { if (e.target.files[0]) this._readFile(e.target.files[0]); };

    drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('highlight'); });
    drop.addEventListener('dragleave', () => drop.classList.remove('highlight'));
    drop.addEventListener('drop', e => {
      e.preventDefault();
      drop.classList.remove('highlight');
      if (e.dataTransfer.files[0]) this._readFile(e.dataTransfer.files[0]);
    });
  },

  _renderResults(container) {
    const data = this._activeMode === 'adventure'
      ? this._lastData.adventure
      : this._lastData.campaign;

    const hasAdventure = this._lastData.adventure.length > 0;

    container.innerHTML = `
      <div class="analyzer-toolbar">
        <div class="analyzer-tabs">
          <button class="analyzer-tab ${this._activeMode === 'campaign' ? 'active' : ''}" data-mode="campaign">Campaign</button>
          <button class="analyzer-tab ${this._activeMode === 'adventure' ? 'active' : ''}" data-mode="adventure">Adventure ${!hasAdventure ? '(không có)' : ''}</button>
        </div>
        <button class="analyzer-new-file-btn" id="ap-new">↑ Tải file khác</button>
      </div>
      <div id="ap-worlds" class="analyzer-worlds">
        ${this._renderWorlds(data)}
      </div>
    `;

    container.querySelectorAll('.analyzer-tab').forEach(tab => {
      tab.onclick = () => {
        this._activeMode = tab.dataset.mode;
        this._renderResults(container);
      };
    });

    container.querySelector('#ap-new').onclick = () => {
      this._lastData = null;
      this._renderUpload(container);
    };
  },

  _renderWorlds(events) {
    if (!events || !events.length) {
      return '<div class="analyzer-empty">Không tìm thấy dữ liệu.<br>Hãy chắc chắn đã đến ít nhất 1 checkpoint (red crystal) trong game trước.</div>';
    }

    // Group by world
    const byWorld = {};
    for (const e of events) {
      if (!byWorld[e.world]) byWorld[e.world] = [];
      byWorld[e.world].push(e);
    }

    const typeOrder = ['World Boss', 'Side Dungeon', 'Miniboss', 'Siege', 'Point of Interest', 'Event'];
    const typeLabel = { 'World Boss': 'Boss', 'Side Dungeon': 'Dungeon', 'Point of Interest': 'POI', 'Siege': 'Siege', 'Miniboss': 'Mini', 'Event': 'Event' };
    const typeCls   = { 'World Boss': 'type-boss', 'Side Dungeon': 'type-dungeon', 'Point of Interest': 'type-event', 'Siege': 'type-other', 'Miniboss': 'type-other', 'Event': 'type-event' };

    return Object.entries(byWorld).map(([world, evts]) => {
      const byType = {};
      for (const e of evts) {
        if (!byType[e.type]) byType[e.type] = [];
        byType[e.type].push(e);
      }

      const sections = typeOrder.filter(t => byType[t]).map(t => {
        const cards = byType[t].map(e => {
          const item = this._findItem(e.name);
          const collected = item && State.isCollected(item.id);
          const hasImg = item?.image;

          const img = hasImg
            ? `<img src="${item.image}" alt="${e.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('no-img')">`
            : '';

          return `
            <div class="acard ${collected ? 'acard--collected' : ''} ${hasImg ? '' : 'acard--no-img'}">
              <div class="acard-img">${img}<span class="acard-img-placeholder">${collected ? '✓' : ''}</span></div>
              <div class="acard-body">
                <div class="acard-name">${e.name}</div>
                ${e.sublocation ? `<div class="acard-sub">${e.sublocation}</div>` : ''}
                <div class="acard-footer">
                  <span class="event-type-tag ${typeCls[t]}">${typeLabel[t]}</span>
                  ${collected
                    ? `<span class="acard-collected">✓ Đã có</span>`
                    : item ? `<span class="acard-missing">Chưa có</span>` : ''}
                </div>
              </div>
            </div>`;
        }).join('');

        return `<div class="analyzer-type-section">
          <div class="analyzer-type-label">${typeLabel[t]} <span>${byType[t].length}</span></div>
          <div class="acard-grid">${cards}</div>
        </div>`;
      }).join('');

      const total = evts.length;
      const collectedCount = evts.filter(e => { const it = this._findItem(e.name); return it && State.isCollected(it.id); }).length;

      return `
        <div class="analyzer-world-block">
          <div class="analyzer-world-header">
            <span class="aworld-name">${world}</span>
            <span class="aworld-meta">${collectedCount ? `${collectedCount}/${total} đã có` : `${total} items`}</span>
          </div>
          ${sections}
        </div>`;
    }).join('');
  },

  // === Checklist integration ===

  /** Tìm item trong GAME_DATA khớp với tên event từ analyzer */
  _findItem(eventName) {
    if (!eventName) return null;
    const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const target = norm(eventName);
    for (const sec of Object.values(GAME_DATA)) {
      for (const cat of Object.values(sec.categories)) {
        for (const item of cat.items) {
          const n = norm(item.name);
          if (n === target || n.includes(target) || target.includes(n)) return item;
        }
      }
    }
    return null;
  },

  // === File reading & parsing ===

  _readFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
      const raw = e.target.result;
      this._lastData = {
        campaign: this._parseCampaign(raw),
        adventure: this._parseAdventure(raw),
      };
      this._activeMode = 'campaign';
      this.renderPage();
    };
    reader.readAsText(file);
  },

  _parseCampaign(raw) {
    let text = raw.split('/Game/Campaign_Main/Quest_Campaign_Ward13.Quest_Campaign_Ward13')[0];
    let main = text.split('/Game/Campaign_Main/Quest_Campaign_City.Quest_Campaign_City')[1];
    if (main) {
      text = main.replace(/Game/g, '\n');
    } else {
      text = text.split('/Game/Campaign_Clementine/Quests/WardPrime/Quest_WardPrime_Template.Quest_WardPrime_Template')[0];
      const rural = text.split('/Game/World_Rural/Templates/Template_Rural_Overworld_02.Template_Rural_Overworld_02')[1];
      text = rural ? rural.replace(/Game/g, '\n') : '';
    }
    return this._parseLines(text.split('\n'));
  },

  _parseAdventure(raw) {
    const lines = raw.split('\n');
    const advLines = lines.filter(l => l.includes('Adventure'));
    const last = advLines[advLines.length - 1];
    if (!last) return [];
    return this._parseLines(last.replace(/Game/g, '\n').split('\n'));
  },

  _parseLines(lines) {
    const events = [];
    const seen = new Set();

    for (const line of lines) {
      const parts = line.split('/');
      if (!parts[1]) continue;

      let world = null;
      for (const [key, name] of Object.entries(this._worldMap)) {
        if (line.includes(key)) { world = name; break; }
      }
      if (!world) continue;

      let type = null, rawName = null;
      if (line.includes('SmallD'))       { type = 'Side Dungeon';     rawName = parts[3]?.split('_')[2]; }
      if (line.includes('OverworldPOI')) { type = 'Point of Interest'; rawName = parts[3]?.split('_')[2]; }
      if (line.includes('Quest_Boss'))   { type = 'World Boss';        rawName = parts[3]?.split('_')[2]; }
      if (line.includes('Siege'))        { type = 'Siege';             rawName = parts[3]?.split('_')[2]; }
      if (line.includes('Mini'))         { type = 'Miniboss';          rawName = parts[3]?.split('_')[2]; }
      if (line.includes('Quest_Event'))  { type = 'Event';             rawName = parts[3]?.split('_')[2]; }

      if (!type || !rawName) continue;

      const key = `${world}-${type}-${rawName}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const displayName = this._nameMap[rawName] || rawName.replace(/([A-Z])/g, ' $1').trim();
      const sublocation = this._sublocations[rawName] || '';

      events.push({ world, type, rawName, name: displayName, sublocation });
    }

    return events;
  },

  // Legacy stub
  showPanel() { document.querySelector('.page-btn[data-page="analyzer"]')?.click(); },
};
