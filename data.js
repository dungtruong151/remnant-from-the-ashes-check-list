// Image base from Fandom wiki
const IMG = 'https://static.wikia.nocookie.net/remnantfromtheashes_gamepedia_en/images';
// Boss images from holdtoreset.com
const HTR = 'https://cdn.holdtoreset.com/wp-content/uploads';

// Section metadata for banners
const SECTION_META = {
  weapons: { desc: "Long Guns, Hand Guns & Melee Weapons", banner: "weapons" },
  armor: { desc: "Armor Sets & Set Bonuses", banner: "armor" },
  bosses: { desc: "World Bosses, Dungeon Bosses & Story Bosses", banner: "bosses" },
  traits: { desc: "Core, Combat & Survival Traits", banner: "traits" },
  mods: { desc: "Craftable & Purchasable Weapon Mods", banner: "mods" },
  rings: { desc: "Passive bonus rings", banner: "rings" },
  amulets: { desc: "Necklaces & Charms", banner: "amulets" },
  events: { desc: "Random World Events & Secrets", banner: "events" },
};

const GAME_DATA = {
  weapons: {
    label: "Vu Khi",
    icon: "⚔️",
    categories: {
      long_guns: {
        label: "Long Guns",
        items: [
          { id: "hunting_rifle", name: "Hunting Rifle", location: "Starter (Hunter)", rarity: "normal",
            image: `${IMG}/b/bd/Hunting_Rifle.png/revision/latest?cb=20190825211321` },
          { id: "coach_gun", name: "Coach Gun", location: "Starter (Ex-Cultist)", rarity: "normal",
            image: `${IMG}/e/eb/Coach_Gun.png/revision/latest?cb=20190825211313` },
          { id: "shotgun", name: "Shotgun", location: "Starter (Scrapper)", rarity: "normal",
            image: `${IMG}/6/61/Shotgun.png/revision/latest?cb=20190825211330` },
          { id: "assault_rifle", name: "Assault Rifle", location: "Ace - Ward 13 (Mua)", rarity: "normal",
            image: `${IMG}/e/e0/Assault_Rifle.png/revision/latest?cb=20190825211308` },
          { id: "sniper_rifle", name: "Sniper Rifle", location: "Ace - Ward 13 (Mua)", rarity: "normal",
            image: `${IMG}/c/cf/Sniper_Rifle.png/revision/latest?cb=20190825211331` },
          { id: "beam_rifle", name: "Beam Rifle", location: "Earth - Su kien ngau nhien", rarity: "rare",
            image: `${IMG}/3/30/Beam_Rifle.png/revision/latest?cb=20190825211309` },
          { id: "ruin", name: "Ruin", location: "Rhom - Undying King (Giet)", rarity: "boss",
            image: `${IMG}/b/bc/Ruin.png/revision/latest?cb=20200518095613` },
          { id: "devastator", name: "Devastator", location: "Craft tu Gorefist/Shroud", rarity: "boss",
            image: `${IMG}/d/da/Devastator.png/revision/latest?cb=20200518095558` },
          { id: "particle_accelerator", name: "Particle Accelerator", location: "Craft tu Claviger", rarity: "boss",
            image: `${IMG}/6/68/Particle_Accelerator.png/revision/latest?cb=20200518095605` },
          { id: "repulsor", name: "Repulsor", location: "Craft tu Onslaught (Rhom)", rarity: "boss",
            image: `${IMG}/0/0a/Repulsor.png/revision/latest?cb=20200518095611` },
          { id: "eye_of_the_storm", name: "Eye of the Storm", location: "Craft tu Totem Father", rarity: "boss",
            image: `${IMG}/9/99/Eye_of_the_Storm.png/revision/latest?cb=20200518095559` },
          { id: "sporebloom", name: "Sporebloom", location: "Craft tu The Ent", rarity: "boss",
            image: `${IMG}/7/73/Sporebloom.png/revision/latest?cb=20200518095621` },
          { id: "crossbow", name: "Crossbow", location: "Earth - Adventure Mode", rarity: "rare",
            image: `${IMG}/7/79/Crossbow.png/revision/latest?cb=20190825211315` },
          { id: "chicago_typewriter", name: "Chicago Typewriter", location: "Earth - Su kien Supply Run", rarity: "rare",
            image: `${IMG}/9/93/Chicago_Typewriter.png/revision/latest?cb=20190825211311` },
          { id: "ricochet_rifle", name: "Ricochet Rifle", location: "Yaesha - Stuck Merchant", rarity: "rare",
            image: `${IMG}/0/00/Ricochet_Rifle.png/revision/latest?cb=20190825211326` },
          { id: "fusion_rifle", name: "Fusion Rifle", location: "Rhom - Dungeon ngau nhien", rarity: "rare",
            image: `${HTR}/2020/08/21125104/Fusion-Rifle.jpg` },
          { id: "hive_cannon", name: "Hive Cannon", location: "Craft tu The Unclean One", rarity: "boss",
            image: `${IMG}/7/77/Hive_Cannon.png/revision/latest?cb=20200518095220` },
          { id: "pride_of_the_iskal", name: "Pride of the Iskal", location: "Corsus - Iskal Queen (Cho vat pham)", rarity: "boss",
            image: `${IMG}/2/20/Pride_of_the_Iskal.png/revision/latest?cb=20200518095609` },
          { id: "alternator", name: "Alternator", location: "Earth - Su kien ngau nhien", rarity: "rare",
            image: `${IMG}/6/66/Alternator.png/revision/latest?cb=20240318224258` },
          { id: "sniper_rifle_worldbreaker", name: "Worldbreaker", location: "Craft tu The Harrow", rarity: "boss" }
        ]
      },
      hand_guns: {
        label: "Hand Guns",
        items: [
          { id: "repeater_pistol", name: "Repeater Pistol", location: "Starter mac dinh", rarity: "normal",
            image: `${IMG}/b/b5/Repeater_Pistol.png/revision/latest?cb=20190818052509` },
          { id: "magnum_revolver", name: "Magnum Revolver", location: "Earth - Loot ngau nhien", rarity: "normal",
            image: `${IMG}/e/e7/Magnum_Revolver.png/revision/latest?cb=20190825210410` },
          { id: "submachine_gun", name: "Submachine Gun", location: "Ward 13 - Tang ham bi mat", rarity: "rare",
            image: `${IMG}/d/da/Submachine_Gun.png/revision/latest?cb=20190825193352` },
          { id: "defiler", name: "Defiler", location: "Craft tu Shade & Shatter", rarity: "boss",
            image: `${IMG}/4/41/Defiler.png/revision/latest?cb=20200518095741` },
          { id: "hive_pistol", name: "Hive Pistol", location: "Craft tu Canker (Corsus)", rarity: "boss" },
          { id: "spitfire", name: "Spitfire", location: "Craft tu Singe", rarity: "boss",
            image: `${IMG}/b/b2/Spitfire.png/revision/latest?cb=20200518095619` },
          { id: "curse_of_the_jungle_god", name: "Curse of the Jungle God", location: "Craft tu Ravager (Alt kill)", rarity: "boss",
            image: `${IMG}/c/c4/Curse_of_the_Jungle_God.png/revision/latest?cb=20200518095552` },
          { id: "hunting_pistol", name: "Hunting Pistol", location: "Earth - Su kien ngau nhien", rarity: "rare",
            image: `${IMG}/8/84/Hunting_Pistol.png/revision/latest?cb=20190825210408` },
          { id: "machine_pistol", name: "Machine Pistol", location: "Earth - Su kien ngau nhien", rarity: "rare",
            image: `${HTR}/2020/08/21124452/Machine-Pistol.jpg` },
          { id: "twin_shot", name: "Twin Shot", location: "Yaesha - Stuck Merchant", rarity: "rare" },
          { id: "pride_of_the_iskal_hg", name: "Pride of the Iskal", location: "Corsus - Iskal Temple", rarity: "boss" }
        ]
      },
      melee_weapons: {
        label: "Melee Weapons",
        items: [
          { id: "scrap_sword", name: "Scrap Sword", location: "Starter mac dinh", rarity: "normal",
            image: `${IMG}/b/b7/Scrap_Sword.png/revision/latest?cb=20190825211810` },
          { id: "scrap_hatchet", name: "Scrap Hatchet", location: "Starter mac dinh", rarity: "normal",
            image: `${IMG}/3/38/Scrap_Hatchet.png/revision/latest?cb=20190825211808` },
          { id: "scrap_hammer", name: "Scrap Hammer", location: "Starter mac dinh", rarity: "normal",
            image: `${IMG}/f/f6/Scrap_Hammer.png/revision/latest?cb=20190825211806` },
          { id: "smolder", name: "Smolder", location: "Craft tu Singe (Alt kill)", rarity: "boss",
            image: `${IMG}/c/c5/Smolder.png/revision/latest?cb=20200518095617` },
          { id: "riven", name: "Riven", location: "Craft tu The Harrow (Alt kill)", rarity: "boss",
            image: `${IMG}/2/20/Riven.png/revision/latest?cb=20190825211802` },
          { id: "world_breaker", name: "World Breaker", location: "Craft tu Claviger (Alt kill)", rarity: "boss",
            image: `${IMG}/3/30/World_Breaker.png/revision/latest?cb=20200518095625` },
          { id: "guardian_axe", name: "Guardian Axe", location: "Yaesha - Root Shrine", rarity: "rare",
            image: `${IMG}/2/25/Guardian_Axe.png/revision/latest?cb=20190825211824` },
          { id: "voice_of_the_tempest", name: "Voice of the Tempest", location: "Craft tu Totem Father (Alt kill)", rarity: "boss",
            image: `${IMG}/7/70/Voice_of_the_Tempest.png/revision/latest?cb=20200518095623` },
          { id: "petrified_maul", name: "Petrified Maul", location: "Earth - Su kien ngau nhien", rarity: "rare",
            image: `${IMG}/6/61/Petrified_Maul.png/revision/latest?cb=20200518095606` },
          { id: "butchers_flail", name: "Butcher's Flail", location: "Corsus - Dungeon ngau nhien", rarity: "rare",
            image: `${IMG}/4/4b/Butcher%27s_Flail.png/revision/latest?cb=20200518095556` },
          { id: "lost_harpoon", name: "Lost Harpoon", location: "Corsus - Su kien ngau nhien", rarity: "rare",
            image: `${IMG}/f/f5/Lost_Harpoon.png/revision/latest?cb=20190825211826` },
          { id: "wastelanders_flail", name: "Wastelander's Flail", location: "Earth - Dungeon ngau nhien", rarity: "rare",
            image: `${IMG}/a/a1/Wastelander_Flail.png/revision/latest?cb=20190825211819` },
          { id: "hero_sword", name: "Hero's Sword", location: "Ward 13 - Tang ham bi mat", rarity: "rare" }
        ]
      }
    }
  },

  armor: {
    label: "Giap",
    icon: "🛡️",
    categories: {
      armor_sets: {
        label: "Armor Sets",
        items: [
          { id: "scrapper_set", name: "Scrapper Set", location: "Starter (Scrapper) / Mua tai Rigs", rarity: "normal", bonus: "+30% sat thuong can chien",
            image: `${IMG}/f/f4/Scrapper_Set.jpg/revision/latest?cb=20200521130132` },
          { id: "hunter_set", name: "Hunter Set", location: "Starter (Hunter) / Mua tai Rigs", rarity: "normal", bonus: "+25% weak spot damage",
            image: `${IMG}/4/49/Hunter_Set.jpg/revision/latest?cb=20200521130123` },
          { id: "cultist_set", name: "Cultist Set", location: "Starter (Ex-Cultist) / Mua tai Rigs", rarity: "normal", bonus: "+30% mod power generation",
            image: `${IMG}/7/7a/Cultist_Set.jpg/revision/latest?cb=20200521130117` },
          { id: "drifter_set", name: "Drifter's Set", location: "Earth - Loot ngau nhien", rarity: "normal", bonus: "+25% stamina regen, giam stamina cost",
            image: `${IMG}/8/8c/Drifter%27s_Set.jpg/revision/latest?cb=20200521130119` },
          { id: "adventurer_set", name: "Adventurer's Set", location: "Earth - Su kien ngau nhien", rarity: "rare", bonus: "+20% exp bonus",
            image: `${IMG}/8/8f/Adventurer_Set.jpg/revision/latest?cb=20200521130100` },
          { id: "akari_set", name: "Akari Set", location: "Rhom - Dungeon ngau nhien", rarity: "rare", bonus: "Perfect dodge = +30% crit chance, +50% crit damage",
            image: `${IMG}/5/53/Akari_Set.jpg/revision/latest?cb=20200521130048` },
          { id: "bandit_set", name: "Bandit Set", location: "Earth - Su kien ngau nhien", rarity: "rare", bonus: "35% chance hoan dan khi ban",
            image: `${IMG}/b/be/Bandit_Set.jpg/revision/latest?cb=20200521130111` },
          { id: "elder_set", name: "Elder Set", location: "Yaesha - Tang tu NPC", rarity: "rare", bonus: "+30% mod power",
            image: `${IMG}/2/2e/Elder_Set.jpg/revision/latest?cb=20200521130121` },
          { id: "osseous_set", name: "Osseous Set", location: "Rhom - Dungeon ngau nhien", rarity: "rare", bonus: "Sat thuong tang dan khi ban lien tuc",
            image: `${IMG}/1/14/Ossesus_Set.jpg/revision/latest?cb=20200521130128` },
          { id: "radiant_set", name: "Radiant Set", location: "Rhom - Iskal dungeon", rarity: "rare", bonus: "Crit tang theo stack",
            image: `${IMG}/e/e9/Radiant_Set.jpg/revision/latest?cb=20200521130130` },
          { id: "slayer_set", name: "Slayer Set", location: "Earth - Dungeon ngau nhien", rarity: "rare", bonus: "+35% sat thuong phat dau tien",
            image: `${IMG}/c/c2/Slayer_Set.jpg/revision/latest?cb=20200521130135` },
          { id: "twisted_set", name: "Twisted Set", location: "Earth - Root Mother event", rarity: "rare", bonus: "Lifesteal khi sat thuong",
            image: `${IMG}/1/14/Twisted_Set.jpg/revision/latest?cb=20200521130137` },
          { id: "void_set", name: "Void Set", location: "Rhom - Dungeon ngau nhien", rarity: "rare", bonus: "Giam sat thuong nhan -> tang sat thuong gay",
            image: `${IMG}/5/50/Void_Set.jpg/revision/latest?cb=20200521130139` },
          { id: "labyrinth_set", name: "Labyrinth Set", location: "Labyrinth - World boss", rarity: "rare", bonus: "+50% mod damage",
            image: `${IMG}/0/0d/Labyrinth_Set.jpg/revision/latest?cb=20200521130125` },
          { id: "letos_set", name: "Leto's Set", location: "Earth - Leto's Lab", rarity: "rare", bonus: "Giam sat thuong cuc lon, fat roll",
            image: `${IMG}/d/d8/Leto%27s_Set.jpg/revision/latest?cb=20200521130126` },
          { id: "warlord_set", name: "Warlord Set", location: "Reisum (DLC)", rarity: "dlc", bonus: "Hoi mau khi dung Dragon Heart" }
        ]
      }
    }
  },

  bosses: {
    label: "Bosses",
    icon: "💀",
    categories: {
      earth_bosses: {
        label: "Earth",
        items: [
          { id: "gorefist", name: "Gorefist", location: "Earth - Dungeon Boss", rarity: "boss", altKill: "Co",
            image: `${HTR}/2019/08/18104233/Gorefist-750x422.jpg` },
          { id: "shroud", name: "Shroud", location: "Earth - Dungeon Boss", rarity: "boss", altKill: "Co",
            image: `${HTR}/2019/08/16111728/Remnant-Win64-Shipping-2019-08-16-10-11-54-496-750x422.jpg` },
          { id: "ent", name: "The Ent", location: "Earth - World Boss", rarity: "boss", altKill: "Pha tay",
            image: `${HTR}/2019/08/16130802/The-Ent-750x422.jpg` },
          { id: "singe", name: "Singe", location: "Earth - World Boss", rarity: "boss", altKill: "Cat duoi",
            image: `${HTR}/2019/08/18104442/Singe-750x422.jpg` },
          { id: "brabus", name: "Brabus", location: "Earth - Su kien ngau nhien", rarity: "boss", altKill: "Dua pocket watch",
            image: `${HTR}/2019/08/19175637/Barabus-750x422.jpg` },
          { id: "mangler", name: "Mangler", location: "Earth - Dungeon Boss", rarity: "boss", altKill: "Khong",
            image: `${HTR}/2019/08/17110358/The-Mangler-750x422.jpg` },
          { id: "riphide", name: "Riphide", location: "Earth - Dungeon Boss", rarity: "boss", altKill: "Khong",
            image: `${HTR}/2019/09/20101157/Riphide-750x422.jpg` },
          { id: "root_mother", name: "Root Mother", location: "Earth - Su kien bao ve", rarity: "boss", altKill: "Khong" },
          { id: "dreamer_nightmare", name: "Dreamer / Nightmare", location: "Earth - Final Boss", rarity: "boss", altKill: "Khong",
            image: `${HTR}/2019/08/17194223/Dreamer-Nightmare-750x422.jpg` }
        ]
      },
      rhom_bosses: {
        label: "Rhom",
        items: [
          { id: "claviger", name: "Claviger", location: "Rhom - Dungeon Boss", rarity: "boss", altKill: "Giet minions",
            image: `${HTR}/2019/08/16160111/Claviger-750x422.jpg` },
          { id: "the_harrow", name: "The Harrow", location: "Rhom - Dungeon Boss", rarity: "boss", altKill: "Pha chan",
            image: `${HTR}/2019/08/19083446/The-Harrow-750x422.jpg` },
          { id: "maul", name: "Maul", location: "Rhom - Dungeon Boss", rarity: "boss", altKill: "Khong",
            image: `${HTR}/2019/08/17193543/Houndsman-750x422.jpg` },
          { id: "shade_shatter", name: "Shade & Shatter", location: "Rhom - Dungeon Boss", rarity: "boss", altKill: "Giet Shade truoc",
            image: `${HTR}/2019/08/17121249/Shatter-and-Shade-750x422.jpg` },
          { id: "scourge", name: "Scourge", location: "Rhom - Dungeon Boss", rarity: "boss", altKill: "Khong",
            image: `${HTR}/2019/08/16150440/Scourge-750x422.jpg` },
          { id: "undying_king", name: "The Undying King", location: "Rhom - Story Boss", rarity: "boss", altKill: "Dua Guardian's Heart",
            image: `${HTR}/2019/08/18103504/Undying-King-750x422.jpg` },
          { id: "scald_sear", name: "Scald & Sear", location: "Rhom - Dungeon Boss", rarity: "boss", altKill: "Khong",
            image: `${HTR}/2019/08/17063857/Remnant-Win64-Shipping-2019-08-16-23-43-18-806-750x422.jpg` }
        ]
      },
      corsus_bosses: {
        label: "Corsus",
        items: [
          { id: "canker", name: "Canker", location: "Corsus - Dungeon Boss", rarity: "boss", altKill: "Khong",
            image: `${HTR}/2019/08/18102752/Canker-750x422.jpg` },
          { id: "the_unclean_one", name: "The Unclean One", location: "Corsus - Dungeon Boss", rarity: "boss", altKill: "Khong",
            image: `${HTR}/2019/08/16171134/The-Unclean-One-750x422.jpg` },
          { id: "ixillis", name: "Ixillis XV & XVI", location: "Corsus - World Boss (Bridge)", rarity: "boss", altKill: "Khong",
            image: `${HTR}/2019/08/16222314/IXILLIS-750x422.jpg` },
          { id: "iskal_queen", name: "Iskal Queen", location: "Corsus - DLC Boss", rarity: "dlc", altKill: "Cho Corsus Parasite",
            image: `${HTR}/2020/04/28150718/Iskal-Queen-750x422.jpg` },
          { id: "barbed_terror", name: "Barbed Terror", location: "Corsus - DLC Boss", rarity: "dlc", altKill: "Khong",
            image: `${HTR}/2020/04/28150105/Barbed-Terror-750x422.jpg` },
          { id: "dream_eater", name: "Dream Eater", location: "Corsus - DLC Survival", rarity: "dlc", altKill: "Khong",
            image: `${HTR}/2020/04/28101420/Dream-Eater-750x422.jpg` }
        ]
      },
      yaesha_bosses: {
        label: "Yaesha",
        items: [
          { id: "the_ravager", name: "The Ravager", location: "Yaesha - World Boss", rarity: "boss", altKill: "Choi nhac chuong",
            image: `${HTR}/2019/08/17150058/The-Ravager-750x422.jpg` },
          { id: "totem_father", name: "Totem Father", location: "Yaesha - Dungeon Boss", rarity: "boss", altKill: "Giet totems",
            image: `${HTR}/2019/08/19142415/Totem-Father-750x422.jpg` },
          { id: "the_warden", name: "The Warden", location: "Yaesha - Dungeon Boss", rarity: "boss", altKill: "Khong",
            image: `${HTR}/2019/08/20185902/The-Warden-750x422.jpg` },
          { id: "stormcaller", name: "Stormcaller", location: "Yaesha - Dungeon Boss", rarity: "boss", altKill: "Khong",
            image: `${HTR}/2019/08/20185713/Stormcaller-750x422.jpg` },
          { id: "root_horror", name: "Root Horror", location: "Yaesha - Dungeon Boss", rarity: "boss", altKill: "Khong" }
        ]
      },
      reisum_bosses: {
        label: "Reisum (DLC)",
        items: [
          { id: "brudvaak_vargr", name: "Brudvaak & Vargr", location: "Reisum - World Boss", rarity: "dlc", altKill: "Giet Brudvaak truoc",
            image: `${HTR}/2020/08/19082017/Brudvaak-and-Vargr-Subject-2923-Remnant-From-the-Ashes-boss.jpg` },
          { id: "ikro", name: "Ikro, the Ice Conjurer", location: "Reisum - Dungeon Boss", rarity: "dlc", altKill: "Khong",
            image: `${HTR}/2020/08/19082807/Ikro-the-Ice-Conjurer-Subject-2923-Remnant-From-the-Ashes-750x422.jpg` },
          { id: "obryk", name: "Obryk", location: "Reisum - Dungeon Boss", rarity: "dlc", altKill: "Khong",
            image: `${HTR}/2020/08/19080708/Obryk-The-Shield-Warden.jpg` },
          { id: "harsgaard", name: "Harsgaard", location: "Ward Prime - Final DLC Boss", rarity: "dlc", altKill: "Khong",
            image: `${HTR}/2020/08/19081435/Harsgaard-boss-Subject-2923-Remnant-From-the-Ashes.jpg` }
        ]
      }
    }
  },

  traits: {
    label: "Traits",
    icon: "📊",
    categories: {
      core_traits: {
        label: "Core Traits",
        items: [
          { id: "vigor", name: "Vigor", location: "Mac dinh", rarity: "normal", effect: "Tang Max HP",
            image: `${IMG}/f/f4/Vigor.png/revision/latest?cb=20190828041006` },
          { id: "endurance", name: "Endurance", location: "Mac dinh", rarity: "normal", effect: "Tang Max Stamina",
            image: `${IMG}/0/0a/Endurance.png/revision/latest?cb=20190828041013` },
          { id: "spirit", name: "Spirit", location: "Mac dinh", rarity: "normal", effect: "Tang Mod Power Generation",
            image: `${IMG}/9/97/Spirit.png/revision/latest?cb=20190828040957` },
          { id: "shadow_walker", name: "Shadow Walker", location: "Mac dinh", rarity: "normal", effect: "Giam enemy awareness",
            image: `${IMG}/a/a6/Shadow_Walker.png/revision/latest?cb=20190828040956` }
        ]
      },
      combat_traits: {
        label: "Combat Traits",
        items: [
          { id: "kingslayer", name: "Kingslayer", location: "Giet Undying King", rarity: "boss", effect: "+25% Critical Hit Damage",
            image: `${IMG}/c/c0/Kingslayer.png/revision/latest?cb=20190828041019` },
          { id: "executioner", name: "Executioner", location: "Earth - Su kien ngau nhien", rarity: "rare", effect: "+25% Critical Hit Chance",
            image: `${IMG}/9/93/Executioner.png/revision/latest?cb=20190828041013` },
          { id: "minds_eye", name: "Mind's Eye", location: "Giet Dreamer/Nightmare", rarity: "boss", effect: "+20% Ranged Damage",
            image: `${IMG}/5/5b/Mind%27s_Eye.png/revision/latest?cb=20190828041021` },
          { id: "catalyst", name: "Catalyst", location: "Corsus - Su kien ngau nhien", rarity: "rare", effect: "+20% Proc Chance",
            image: `${IMG}/b/b2/Catalyst.png/revision/latest?cb=20190828041011` },
          { id: "quick_hands", name: "Quick Hands", location: "Earth - Su kien ngau nhien", rarity: "rare", effect: "+50% Reload Speed",
            image: `${IMG}/7/79/Quick_Hands.png/revision/latest?cb=20190828041022` },
          { id: "trigger_happy", name: "Trigger Happy", location: "Earth - Su kien ngau nhien", rarity: "rare", effect: "+20% Fire Rate",
            image: `${IMG}/0/07/Trigger_Happy.png/revision/latest?cb=20190828041005` },
          { id: "swiftness", name: "Swiftness", location: "Yaesha - Su kien ngau nhien", rarity: "rare", effect: "+20% Movement Speed",
            image: `${IMG}/a/af/Swiftness.png/revision/latest?cb=20190828041002` },
          { id: "exploiter", name: "Exploiter", location: "Giet Ixillis", rarity: "boss", effect: "+20% Weak Spot Damage",
            image: `${IMG}/d/d5/Exploiter.png/revision/latest?cb=20190828041014` }
        ]
      },
      survival_traits: {
        label: "Survival Traits",
        items: [
          { id: "bark_skin", name: "Bark Skin", location: "Ent (Alt kill)", rarity: "boss", effect: "+15% Armor",
            image: `${IMG}/7/73/Barkskin.png/revision/latest?cb=20190828041010` },
          { id: "glutton", name: "Glutton", location: "Corsus - Su kien ngau nhien", rarity: "rare", effect: "+50% Consumable Speed",
            image: `${IMG}/3/39/Glutton.png/revision/latest?cb=20190828041015` },
          { id: "guardian_blessing", name: "Guardian's Blessing", location: "Yaesha - Root Shrine", rarity: "rare", effect: "+20% Elemental Resistance",
            image: `${IMG}/1/1b/Guardian%27s_Blessing.png/revision/latest?cb=20190828041016` },
          { id: "recovery", name: "Recovery", location: "Mua tu Reggie", rarity: "normal", effect: "+30% Stamina Regen",
            image: `${IMG}/a/a2/Recovery.png/revision/latest?cb=20190828041023` },
          { id: "triage", name: "Triage", location: "Yaesha - Su kien ngau nhien", rarity: "rare", effect: "+100% Healing Effectiveness",
            image: `${IMG}/9/94/Triage.png/revision/latest?cb=20190828041003` },
          { id: "blood_bond", name: "Blood Bond", location: "Giet Undying King hoac cho Heart", rarity: "boss", effect: "Pet nhan sat thuong thay",
            image: `${IMG}/8/8c/Bloodbond.png/revision/latest?cb=20200514155426` },
          { id: "world_walker", name: "World Walker", location: "Hoan thanh Campaign", rarity: "boss", effect: "+20% Movement Speed",
            image: `${IMG}/9/9d/World_Walker.png/revision/latest?cb=20190828041009` },
          { id: "teamwork", name: "Teamwork", location: "Choi Co-op", rarity: "normal", effect: "+100% Teamwork Range",
            image: `${IMG}/0/05/Teamwork.png/revision/latest?cb=20190828041003` },
          { id: "elder_knowledge", name: "Elder Knowledge", location: "Yaesha - NPC quest", rarity: "rare", effect: "+25% EXP Gained",
            image: `${IMG}/8/8f/Elder_Knowledge.png/revision/latest?cb=20190828041012` }
        ]
      }
    }
  },

  mods: {
    label: "Weapon Mods",
    icon: "🔮",
    categories: {
      craftable_mods: {
        label: "Craftable Mods (tu Boss)",
        items: [
          { id: "hot_shot", name: "Hot Shot", location: "Craft tu Singe", rarity: "boss", effect: "Dan lua +20% sat thuong",
            image: `${IMG}/f/f4/Hot_Shot.png/revision/latest?cb=20190829015910` },
          { id: "swarm", name: "Swarm", location: "Craft tu The Unclean One", rarity: "boss", effect: "Con trung tu dan duong",
            image: `${IMG}/1/1e/Swarm.png/revision/latest?cb=20190829012730` },
          { id: "breath_of_the_desert", name: "Breath of the Desert", location: "Craft tu Scourge", rarity: "boss", effect: "Skull phong xa",
            image: `${IMG}/2/22/Breath_of_the_Desert.png/revision/latest?cb=20190829015905` },
          { id: "seed_caller", name: "Seed Caller", location: "Craft tu Mangler", rarity: "boss", effect: "Trieu hoi dong minh",
            image: `${IMG}/1/1a/Seed_Caller.png/revision/latest?cb=20190829012726` },
          { id: "iron_sentinel", name: "Iron Sentinel", location: "Craft tu Riphide", rarity: "boss", effect: "Turret tu dong",
            image: `${IMG}/5/57/Iron_Sentinel.png/revision/latest?cb=20190829012721` },
          { id: "beckon", name: "Beckon", location: "Craft tu Shade & Shatter", rarity: "boss", effect: "Trieu hoi Skull",
            image: `${IMG}/e/ee/Beckon.png/revision/latest?cb=20190829015903` },
          { id: "mantle_of_thorns", name: "Mantle of Thorns", location: "Craft tu The Ent", rarity: "boss", effect: "Giap gai phan sat thuong",
            image: `${IMG}/2/2c/Mantle_of_Thorns.png/revision/latest?cb=20190829012722` },
          { id: "howlers_immunity", name: "Howler's Immunity", location: "Craft tu Maul", rarity: "boss", effect: "Mien nhiem stagger",
            image: `${IMG}/5/57/Howler%27s_Immunity.png/revision/latest?cb=20190829012717` },
          { id: "explosive_shot", name: "Explosive Shot", location: "Craft tu Brabus", rarity: "boss", effect: "Dan no dien rong",
            image: `${IMG}/8/87/Explosive_Shot.png/revision/latest?cb=20190829015901` },
          { id: "storm_caller_mod", name: "Storm Caller", location: "Craft tu Stormcaller", rarity: "boss", effect: "Goi set",
            image: `${IMG}/4/40/Storm_Caller.png/revision/latest?cb=20190829012729` },
          { id: "song_of_swords", name: "Song of Swords", location: "Craft tu The Warden", rarity: "boss", effect: "+30% sat thuong toan team",
            image: `${IMG}/b/b1/Song_of_Swords.png/revision/latest?cb=20190829013938` },
          { id: "gravity_core", name: "Gravity Core", location: "Gan san tren Particle Accelerator", rarity: "boss", effect: "Ban ra lo den",
            image: `${IMG}/4/45/Gravity_Core.png/revision/latest?cb=20190829012714` }
        ]
      },
      found_mods: {
        label: "Found/Purchased Mods",
        items: [
          { id: "menders_aura", name: "Mender's Aura", location: "Starter (Ex-Cultist) / Mua", rarity: "normal", effect: "Hoi mau dien rong",
            image: `${IMG}/1/17/Mender%27s_Aura.png/revision/latest?cb=20190829012723` },
          { id: "hunters_mark", name: "Hunter's Mark", location: "Starter (Hunter) / Mua", rarity: "normal", effect: "Danh dau ke dich, +crit",
            image: `${IMG}/b/bd/Hunter%27s_Mark.png/revision/latest?cb=20190829012719` },
          { id: "veil_of_the_black_tear", name: "Veil of the Black Tear", location: "Mua tai Ace", rarity: "normal", effect: "Chan dan projectile",
            image: `${IMG}/0/0d/Veil_of_the_Black_Tear.png/revision/latest?cb=20190829012732` },
          { id: "rattle_weed", name: "Rattle Weed", location: "Mua tai Ace", rarity: "normal", effect: "Thu hut aggro ke dich",
            image: `${IMG}/6/69/Rattle_Weed.png/revision/latest?cb=20190829012725` },
          { id: "very_good_boy", name: "Very Good Boy", location: "Mua tai Ace", rarity: "normal", effect: "Trieu hoi cho dong minh",
            image: `${IMG}/5/50/Very_Good_Boy.png/revision/latest?cb=20201025080630` },
          { id: "flicker_cloak", name: "Flicker Cloak", location: "Earth - Dungeon ngau nhien", rarity: "rare", effect: "Tang hinh ngan",
            image: `${IMG}/0/0f/Flicker_Cloak.png/revision/latest?cb=20190829012713` }
        ]
      }
    }
  },

  rings: {
    label: "Nhan",
    icon: "💍",
    categories: {
      rings: {
        label: "Rings",
        items: [
          { id: "heartseeker", name: "Heartseeker", location: "Earth - Loot ngau nhien", rarity: "normal", effect: "+100% Crit Chance (crit dmg giam)",
            image: `${IMG}/5/52/Heartseeker.png/revision/latest?cb=20190829004616` },
          { id: "braided_thorns", name: "Braided Thorns", location: "Earth - Su kien ngau nhien", rarity: "rare", effect: "+15% Crit Chance khi kill",
            image: `${IMG}/3/34/Braided_Thorns.png/revision/latest?cb=20190829004608` },
          { id: "pillar_of_stone", name: "Pillar of Stone", location: "Rhom - Su kien ngau nhien", rarity: "rare", effect: "+25% Stagger Resistance",
            image: `${IMG}/6/68/Pillar_of_Stone.png/revision/latest?cb=20190829004624` },
          { id: "stone_of_balance", name: "Stone of Balance", location: "Yaesha - Su kien ngau nhien", rarity: "rare", effect: "+10% ca Melee va Ranged DMG",
            image: `${IMG}/9/9a/Stone_of_Balance.png/revision/latest?cb=20190829004629` },
          { id: "ring_of_evasion", name: "Ring of Evasion", location: "Earth - Su kien ngau nhien", rarity: "rare", effect: "+30% Dodge Speed",
            image: `${IMG}/9/9b/Ring_of_Evasion.png/revision/latest?cb=20190829004626` },
          { id: "hunters_band", name: "Hunter's Band", location: "Earth - Dungeon ngau nhien", rarity: "rare", effect: "+25% Ranged Damage >10m",
            image: `${IMG}/d/d3/Hunter%27s_Band.png/revision/latest?cb=20190829004617` },
          { id: "akaris_ring", name: "Akari's Ring", location: "Rhom - Dungeon ngau nhien", rarity: "rare", effect: "Perfect dodge = +30% Crit Chance" },
          { id: "mothers_ring", name: "Mother's Ring", location: "Earth - Root Mother event", rarity: "rare", effect: "+30% Heal Effectiveness",
            image: `${IMG}/c/c4/Mother%27s_Ring.png/revision/latest?cb=20190829004622` },
          { id: "devouring_loop", name: "Devouring Loop", location: "Corsus - Su kien ngau nhien", rarity: "rare", effect: "Crit co chance x3 damage",
            image: `${IMG}/f/f6/Devouring_Loop.png/revision/latest?cb=20190829004611` },
          { id: "jewel_of_the_black_sun", name: "Jewel of the Black Sun", location: "Rhom - Giet Undying King", rarity: "boss", effect: "+15% sat thuong co ban",
            image: `${IMG}/b/b6/Jewel_of_the_Black_Sun.png/revision/latest?cb=20190829004619` },
          { id: "burden_of_the_gambler", name: "Burden of the Gambler", location: "Earth - Su kien ngau nhien", rarity: "rare", effect: "Khong crit nhung +35% base DMG" },
          { id: "leech_ember", name: "Leech Ember", location: "Earth - Su kien ngau nhien", rarity: "rare", effect: "3% Lifesteal",
            image: `${IMG}/4/4f/Leech_Ember.png/revision/latest?cb=20190829004621` }
        ]
      }
    }
  },

  amulets: {
    label: "Bua ho menh",
    icon: "📿",
    categories: {
      amulets: {
        label: "Amulets",
        items: [
          { id: "galenic_charm", name: "Galenic Charm", location: "Earth - Loot ngau nhien", rarity: "normal", effect: "+30% Healing Effectiveness",
            image: `${IMG}/0/06/Galenic_Charm.png/revision/latest?cb=20190828204757` },
          { id: "menders_charm", name: "Mender's Charm", location: "Ward 13 - Mua", rarity: "normal", effect: "Dragon Heart heal regen",
            image: `${IMG}/1/17/Mender%27s_Charm.png/revision/latest?cb=20190828204803` },
          { id: "cleansing_jewel", name: "Cleansing Jewel", location: "Corsus - Su kien ngau nhien", rarity: "rare", effect: "-50% Status Duration",
            image: `${IMG}/e/e8/Cleansing_Jewel.png/revision/latest?cb=20190828204756` },
          { id: "vengeance_idol", name: "Vengeance Idol", location: "Earth - Su kien ngau nhien", rarity: "rare", effect: "+30% DMG khi HP thap",
            image: `${IMG}/7/76/Vengeance_Idol.png/revision/latest?cb=20190828204811` },
          { id: "brutal_mark", name: "Brutal Mark", location: "Earth - Su kien ngau nhien", rarity: "rare", effect: "+15% sat thuong toan bo",
            image: `${IMG}/0/0e/Brutal_Mark.png/revision/latest?cb=20190828204812` },
          { id: "pocket_watch", name: "Pocket Watch", location: "Earth - Brabus event", rarity: "rare", effect: "-15% Stamina Cost",
            image: `${IMG}/1/10/Pocket_Watch.png/revision/latest?cb=20190828235942` },
          { id: "storm_amulet", name: "Storm Amulet", location: "Yaesha - Su kien ngau nhien", rarity: "rare", effect: "+20% Shock Damage",
            image: `${IMG}/b/b2/Storm_Amulet.png/revision/latest?cb=20190828204807` },
          { id: "radioactive_ember", name: "Radioactive Ember", location: "Rhom - Su kien ngau nhien", rarity: "rare", effect: "+20% Radiation Damage" },
          { id: "razorstone", name: "Razorstone", location: "Yaesha - Su kien ngau nhien", rarity: "rare", effect: "+30% Melee Damage",
            image: `${IMG}/f/f4/Razorstone.png/revision/latest?cb=20190829004625` },
          { id: "gunslingers_charm", name: "Gunslinger's Charm", location: "Ward 13 - Mua", rarity: "normal", effect: "+10% Fire Rate, +10% Reload Speed",
            image: `${IMG}/f/f2/Gunslinger%27s_Charm.png/revision/latest?cb=20190828204758` },
          { id: "soul_anchor", name: "Soul Anchor", location: "Corsus DLC", rarity: "dlc", effect: "Summon ton tai lau hon",
            image: `${IMG}/2/2e/Soul_Anchor.png/revision/latest?cb=20190828204806` },
          { id: "nightmare_spiral", name: "Nightmare Spiral", location: "Giet Nightmare", rarity: "boss", effect: "+20% Mod Power tu sat thuong" }
        ]
      }
    }
  },

  events: {
    label: "Su Kien Ngau Nhien",
    icon: "🎲",
    categories: {
      earth_events: {
        label: "Earth Events",
        items: [
          { id: "supply_run", name: "Supply Run (Ace's Quest)", location: "Earth - Church", rarity: "rare" },
          { id: "hidden_sanctum", name: "Hidden Sanctum", location: "Earth - Dungeon bi mat", rarity: "rare" },
          { id: "letos_lab", name: "Leto's Laboratory", location: "Earth - Dungeon bi mat", rarity: "rare" },
          { id: "hunters_hideout", name: "Hunter's Hideout", location: "Earth - Dungeon bi mat", rarity: "rare" },
          { id: "brabus_encounter", name: "Brabus Encounter", location: "Earth - Depot/Bridge", rarity: "rare" },
          { id: "root_mother_event", name: "Root Mother Protection", location: "Earth - Church", rarity: "rare" },
          { id: "monkey_key", name: "Monkey Key Puzzle", location: "Earth - Dungeon", rarity: "rare" },
          { id: "ward13_basement", name: "Ward 13 Basement", location: "Ward 13 - Bi mat", rarity: "rare" }
        ]
      },
      rhom_events: {
        label: "Rhom Events",
        items: [
          { id: "iskal_temple", name: "Iskal Temple", location: "Rhom - Dungeon bi mat", rarity: "rare" },
          { id: "guardian_shrine", name: "Guardian Shrine", location: "Rhom - Overworld", rarity: "rare" },
          { id: "wud_merchant", name: "Wud (Merchant)", location: "Rhom - An", rarity: "rare" },
          { id: "undying_king_deal", name: "Undying King Deal", location: "Rhom - Citadel", rarity: "rare" }
        ]
      },
      yaesha_events: {
        label: "Yaesha Events",
        items: [
          { id: "stuck_merchant_yaesha", name: "Stuck Merchant", location: "Yaesha - Overworld", rarity: "rare" },
          { id: "ravager_bell_puzzle", name: "Ravager Bell Puzzle", location: "Yaesha - Ravager Shrine", rarity: "rare" },
          { id: "red_doe", name: "Red Doe Shrine", location: "Yaesha - Overworld", rarity: "rare" },
          { id: "flautist_pan", name: "Flautist (Pan Musician)", location: "Yaesha - Overworld", rarity: "rare" }
        ]
      },
      corsus_events: {
        label: "Corsus Events",
        items: [
          { id: "fetid_pool", name: "Fetid Pool", location: "Corsus - Overworld", rarity: "rare" },
          { id: "graveyard_elf", name: "Graveyard Elf", location: "Corsus - Dungeon", rarity: "rare" },
          { id: "iskal_queen_event", name: "Iskal Queen Encounter", location: "Corsus DLC", rarity: "dlc" }
        ]
      }
    }
  }
};
