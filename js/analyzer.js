/**
 * analyzer.js - Phân tích save file game Remnant: From the Ashes
 * Dựa trên: https://github.com/hzla/Remnant-World-Analyzer
 * Sử dụng File System Access API để nhớ file handle → reload không cần chọn lại
 */

const Analyzer = {
  // File handle lưu lại sau lần chọn đầu tiên
  _fileHandle: null,
  _lastData: null,
  _overlay: null,

  // Mapping tên internal → tên hiển thị
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

  /**
   * Render analyzer trực tiếp vào page (không phải popup)
   */
  renderPage() {
    const container = document.getElementById('analyzer-page-content');
    if (!container) return;
    const hasFile = !!this._fileHandle;

    container.innerHTML = `
      <div class="analyzer-upload-zone">
        <div class="analyzer-btn-row">
          <button class="analyzer-btn analyzer-btn-pick" id="ap-pick">
            📂 ${hasFile ? 'Chọn file khác' : 'Chọn file save'}
          </button>
          ${hasFile ? `<button class="analyzer-btn analyzer-btn-reload" id="ap-reload">🔄 Reload</button>` : ''}
        </div>
        ${hasFile ? `
          <div class="analyzer-file-status">
            <span>📎 ${this._fileHandle.name}</span>
            <span style="opacity:0.7;font-size:11px">Nhấn Reload sau khi reroll world mới</span>
          </div>` : `
          <div class="analyzer-drop-zone" id="ap-drop">
            <div class="drop-icon">📁</div>
            <div class="drop-text">Kéo thả file save vào đây</div>
            <div class="drop-sub">.sav / .bak</div>
          </div>`}
      </div>

      ${this._lastData ? `
      <div class="analyzer-results-section">
        <div class="analyzer-mode-tabs">
          <button class="analyzer-tab active" data-mode="campaign">Campaign</button>
          <button class="analyzer-tab" data-mode="adventure">Adventure</button>
        </div>
        <div id="ap-worlds" class="analyzer-worlds"></div>
      </div>` : ''}
    `;

    // Bind pick
    container.querySelector('#ap-pick')?.addEventListener('click', () => this._pickFileForPage(container));

    // Bind reload
    container.querySelector('#ap-reload')?.addEventListener('click', async () => {
      if (!this._fileHandle) return;
      const btn = container.querySelector('#ap-reload');
      btn.disabled = true; btn.textContent = '⏳ Đang đọc...';
      try { const file = await this._fileHandle.getFile(); this._processFileForPage(file, null, container); }
      catch { this._fileHandle = null; this.renderPage(); }
    });

    // Bind drop
    const dropZone = container.querySelector('#ap-drop');
    if (dropZone) {
      dropZone.onclick = () => this._pickFileForPage(container);
      ['dragenter','dragover'].forEach(e => dropZone.addEventListener(e, ev => { ev.preventDefault(); dropZone.classList.add('highlight'); }));
      ['dragleave','drop'].forEach(e => dropZone.addEventListener(e, ev => { ev.preventDefault(); dropZone.classList.remove('highlight'); }));
      dropZone.addEventListener('drop', e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) this._processFileForPage(f, null, container); });
    }

    // Mode tabs
    container.querySelectorAll('.analyzer-tab').forEach(tab => {
      tab.onclick = () => {
        container.querySelectorAll('.analyzer-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const data = tab.dataset.mode === 'adventure' ? this._lastData?.adventure : this._lastData?.campaign;
        this._renderWorldsInPage(data, container.querySelector('#ap-worlds'));
      };
    });

    // Render default campaign data
    if (this._lastData) {
      this._renderWorldsInPage(this._lastData.campaign, container.querySelector('#ap-worlds'));
    }
  },

  async _pickFileForPage(container) {
    if (window.showOpenFilePicker) {
      try {
        const [handle] = await window.showOpenFilePicker({ types: [{ description: 'Save File', accept: { 'application/octet-stream': ['.sav','.bak'] } }] });
        this._fileHandle = handle;
        const file = await handle.getFile();
        this._processFileForPage(file, handle, container);
        return;
      } catch(e) { if (e.name === 'AbortError') return; }
    }
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.sav,.bak';
    input.onchange = e => { const f = e.target.files[0]; if (f) this._processFileForPage(f, null, container); };
    input.click();
  },

  _processFileForPage(file, handle, container) {
    if (handle) this._fileHandle = handle;
    const reader = new FileReader();
    reader.onload = e => {
      const raw = e.target.result;
      this._lastData = { campaign: this._parseCampaign(raw), adventure: this._parseAdventure(raw) };
      this.renderPage();
    };
    reader.readAsText(file);
  },

  _renderWorldsInPage(events, container) {
    if (!container) return;
    if (!events || !events.length) {
      container.innerHTML = '<div class="analyzer-empty">Không tìm thấy dữ liệu. Hãy đến ít nhất 1 checkpoint trong game trước.</div>';
      return;
    }
    const byWorld = {};
    for (const e of events) { if (!byWorld[e.world]) byWorld[e.world] = []; byWorld[e.world].push(e); }
    container.innerHTML = Object.entries(byWorld).map(([world, evts]) => `
      <div class="analyzer-world">
        <div class="analyzer-world-header">
          <span>${world}</span>
          <span class="analyzer-world-count">${evts.length} items</span>
        </div>
        <div class="analyzer-events">
          ${evts.map(ev => {
            const cls = ev.type.includes('Boss') ? 'type-boss' : ev.type.includes('Dungeon') ? 'type-dungeon' : ev.type.includes('Event') || ev.type.includes('Interest') ? 'type-event' : 'type-other';
            return `<div class="analyzer-event">
              <span class="event-type-tag ${cls}">${ev.type}</span>
              <span class="event-name">${ev.name}</span>
              ${ev.sublocation ? `<span class="event-sub">${ev.sublocation}</span>` : ''}
            </div>`;
          }).join('')}
        </div>
      </div>`).join('');
  },

  /**
   * Hiển thị panel analyzer (legacy popup - giữ lại để không break)
   */
  showPanel() {
    const hasFile = !!this._fileHandle;
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    this._overlay = overlay;

    overlay.innerHTML = `
      <div class="popup analyzer-popup">
        <div class="popup-body">
          <div class="popup-header">
            <div class="popup-title">🔍 Phân tích Save File</div>
            <button class="popup-close">✕</button>
          </div>

          <div class="analyzer-intro">
            <p>Phân tích file save game để xem world hiện tại có những boss, event, dungeon nào.</p>
            <p class="analyzer-path">📂 <code>%LOCALAPPDATA%\\Remnant\\Saved\\SaveGames\\save_0.sav</code></p>
          </div>

          <div class="analyzer-actions">
            <button class="analyzer-btn analyzer-btn-pick" id="analyzer-pick">
              📂 ${hasFile ? 'Chọn file khác' : 'Chọn file save'}
            </button>
            ${hasFile ? `
              <button class="analyzer-btn analyzer-btn-reload" id="analyzer-reload">
                🔄 Reload (đọc lại file)
              </button>
            ` : ''}
          </div>

          ${!hasFile ? `
          <div class="analyzer-drop" id="analyzer-drop">
            <div class="analyzer-drop-icon">📁</div>
            <div class="analyzer-drop-text">Hoặc kéo thả file save vào đây</div>
            <div class="analyzer-drop-sub">.sav / .bak</div>
          </div>
          ` : ''}

          ${hasFile ? `
          <div class="analyzer-file-info" id="analyzer-file-info">
            📎 Đang dùng: <strong>${this._fileHandle.name}</strong>
            <span class="analyzer-file-hint">— Nhấn Reload sau khi reroll world mới</span>
          </div>
          ` : ''}

          <div class="analyzer-results" id="analyzer-results" style="display:${hasFile && this._lastData ? 'block' : 'none'}">
            <div class="analyzer-mode-toggle">
              <button class="analyzer-mode-btn active" data-mode="campaign">Campaign</button>
              <button class="analyzer-mode-btn" data-mode="adventure">Adventure</button>
            </div>
            <div id="analyzer-content"></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Nếu đã có data từ trước, render lại
    if (hasFile && this._lastData) {
      this._renderResults(this._lastData.campaign, overlay.querySelector('#analyzer-content'));
      this._bindModeToggle(overlay);
    }

    // Bind events
    this._bindPanelEvents(overlay);
  },

  _bindPanelEvents(overlay) {
    const close = () => { overlay.remove(); this._overlay = null; };
    overlay.querySelector('.popup-close').onclick = close;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    // Nút chọn file
    overlay.querySelector('#analyzer-pick').onclick = () => this._pickFile(overlay);

    // Nút reload (nếu có)
    const reloadBtn = overlay.querySelector('#analyzer-reload');
    if (reloadBtn) reloadBtn.onclick = () => this._reloadFile(overlay);

    // Drop zone (nếu có)
    const dropArea = overlay.querySelector('#analyzer-drop');
    if (dropArea) {
      dropArea.onclick = () => this._pickFile(overlay);
      ['dragenter', 'dragover'].forEach(evt =>
        dropArea.addEventListener(evt, (e) => { e.preventDefault(); dropArea.classList.add('highlight'); })
      );
      ['dragleave', 'drop'].forEach(evt =>
        dropArea.addEventListener(evt, (e) => { e.preventDefault(); dropArea.classList.remove('highlight'); })
      );
      dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) this._processFile(file, null, overlay);
      });
    }

    // ESC close
    const escHandler = (e) => {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); }
    };
    document.addEventListener('keydown', escHandler);
  },

  /**
   * Chọn file bằng File System Access API (Chrome/Edge) hoặc fallback input
   */
  async _pickFile(overlay) {
    // Thử File System Access API trước (cho phép reload sau này)
    if (window.showOpenFilePicker) {
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [{
            description: 'Remnant Save File',
            accept: { 'application/octet-stream': ['.sav', '.bak'] },
          }],
          startIn: 'desktop',
        });
        this._fileHandle = handle;
        const file = await handle.getFile();
        this._processFile(file, handle, overlay);
        return;
      } catch (e) {
        if (e.name === 'AbortError') return; // User cancelled
      }
    }

    // Fallback cho Firefox / trình duyệt không hỗ trợ
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.sav,.bak';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) this._processFile(file, null, overlay);
    };
    input.click();
  },

  /**
   * Reload file đã chọn trước đó (không cần chọn lại)
   */
  async _reloadFile(overlay) {
    if (!this._fileHandle) return;

    const reloadBtn = overlay.querySelector('#analyzer-reload');
    if (reloadBtn) {
      reloadBtn.disabled = true;
      reloadBtn.innerHTML = '⏳ Đang đọc...';
    }

    try {
      const file = await this._fileHandle.getFile();
      this._processFile(file, this._fileHandle, overlay);
    } catch (e) {
      // Permission bị revoke → phải chọn lại
      this._fileHandle = null;
      this.showPanel();
    }
  },

  /**
   * Xử lý file save: parse và hiển thị kết quả
   */
  _processFile(file, handle, overlay) {
    if (handle) this._fileHandle = handle;

    const reader = new FileReader();
    reader.onload = (e) => {
      const raw = e.target.result;
      const campaign = this._parseCampaign(raw);
      const adventure = this._parseAdventure(raw);
      this._lastData = { campaign, adventure };

      // Refresh panel với data mới
      overlay.remove();
      this._overlay = null;
      this.showPanel();
    };
    reader.readAsText(file);
  },

  _bindModeToggle(overlay) {
    overlay.querySelectorAll('.analyzer-mode-btn').forEach(btn => {
      btn.onclick = () => {
        overlay.querySelectorAll('.analyzer-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const data = btn.dataset.mode === 'adventure'
          ? this._lastData.adventure
          : this._lastData.campaign;
        this._renderResults(data, overlay.querySelector('#analyzer-content'));
      };
    });
  },

  // === Parsing logic ===

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
      if (line.includes('SmallD'))        { type = 'Side Dungeon'; rawName = parts[3]?.split('_')[2]; }
      if (line.includes('OverworldPOI'))   { type = 'Point of Interest'; rawName = parts[3]?.split('_')[2]; }
      if (line.includes('Quest_Boss'))     { type = 'World Boss'; rawName = parts[3]?.split('_')[2]; }
      if (line.includes('Siege'))          { type = 'Siege'; rawName = parts[3]?.split('_')[2]; }
      if (line.includes('Mini'))           { type = 'Miniboss'; rawName = parts[3]?.split('_')[2]; }
      if (line.includes('Quest_Event'))    { type = 'Event'; rawName = parts[3]?.split('_')[2]; }

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

  // === Rendering ===

  _renderResults(events, container) {
    if (!events || !events.length) {
      container.innerHTML = '<div class="analyzer-empty">Không tìm thấy dữ liệu. Hãy chắc chắn đã travel đến ít nhất 1 checkpoint (red crystal) trong game.</div>';
      return;
    }

    const byWorld = {};
    for (const evt of events) {
      if (!byWorld[evt.world]) byWorld[evt.world] = [];
      byWorld[evt.world].push(evt);
    }

    const worldColors = {
      Earth: '#e74c3c', Rhom: '#f39c12', Corsus: '#27ae60',
      Yaesha: '#3498db', Reisum: '#8e44ad',
    };

    let html = '';
    for (const [world, worldEvents] of Object.entries(byWorld)) {
      const color = worldColors[world] || '#666';
      html += `<div class="analyzer-world">
        <div class="analyzer-world-header" style="border-left: 4px solid ${color}">
          <strong>${world}</strong>
          <span class="analyzer-count">${worldEvents.length} items</span>
        </div>`;

      for (const evt of worldEvents) {
        const typeClass = evt.type.includes('Boss') ? 'type-boss'
          : evt.type.includes('Dungeon') ? 'type-dungeon'
          : evt.type.includes('Event') || evt.type.includes('Interest') ? 'type-event'
          : 'type-other';

        html += `<div class="analyzer-event">
          <span class="analyzer-type ${typeClass}">${evt.type}</span>
          <span class="analyzer-name">${evt.name}</span>
          ${evt.sublocation ? `<span class="analyzer-subloc">${evt.sublocation}</span>` : ''}
        </div>`;
      }
      html += '</div>';
    }

    container.innerHTML = html;
  },
};
