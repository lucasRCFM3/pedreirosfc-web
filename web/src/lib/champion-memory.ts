// Memória de informações sobre campeões (posições e builds)
// Este arquivo é atualizado automaticamente quando buscamos builds

export interface ChampionMemory {
  roles: string[];
  build: {
    items: string[];
    situationalItems: string[];
    runes: string[];
    primaryTree?: string | null;
    secondaryTree?: string | null;
    statShards?: string[];
    summoners: string[];
  };
}

export const CHAMPION_MEMORY: Record<string, ChampionMemory> = {
  'Ornn': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Sunfire Aegis',
        'Plated Steelcaps',
        'Thornmail',
        'Jak\'Sho, The Protean',
        'Unending Despair',
        'Frozen Heart'
      ],
      situationalItems: [
        'Kaenic Rookern',
        'Randuin\'s Omen',
        'Warmog\'s Armor',
        'Heartsteel',
        'Force of Nature',
        'Winter\'s Approach'
      ],
      runes: [
        'Grasp of the Undying',
        'Demolish',
        'Bone Plating',
        'Overgrowth',
        'Magical Footwear',
        'Biscuit Delivery'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Sejuani': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Heartsteel',
        'Plated Steelcaps',
        'Unending Despair',
        'Thornmail',
        'Jak\'Sho, The Protean',
        'Frozen Heart'
      ],
      situationalItems: [
        'Kaenic Rookern',
        'Sunfire Aegis',
        'Randuin\'s Omen',
        'Warmog\'s Armor',
        'Knight\'s Vow',
        'Hollow Radiance'
      ],
      runes: [
        'Aftershock',
        'Font of Life',
        'Conditioning',
        'Overgrowth',
        'Triumph',
        'Legend: Alacrity'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Precision',
      statShards: [
        'Attack Speed',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite'] // Corrigido: Sejuani usa Smite
    }
  },
  'Orianna': {
    roles: ['mid'], // Não encontrado no Probuilds, mas sabemos que é mid
    build: {
      items: [
        'Blackfire Torch',
        'Sorcerer\'s Shoes',
        'Horizon Focus',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Shadowflame',
        'Cryptbloom',
        'Banshee\'s Veil',
        'Morellonomicon',
        'Liandry\'s Torment',
        'Stormsurge'
      ],
      runes: [
        'Phase Rush',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Presence of Mind',
        'Legend: Haste'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Precision',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Jinx': {
    roles: ['adc'],
    build: {
      items: [
        'Yun Tal Wildarrows',
        'Berserker\'s Greaves',
        'Infinity Edge',
        'Runaan\'s Hurricane',
        'Lord Dominik\'s Regards',
        'Bloodthirster'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Phantom Dancer',
        'Guardian Angel',
        'Rapid Firecannon',
        'Immortal Shieldbow',
        'Mercurial Scimitar'
      ],
      runes: [
        'Lethal Tempo',
        'Presence of Mind',
        'Legend: Bloodline',
        'Coup de Grace',
        'Absolute Focus',
        'Gathering Storm'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier'] // Corrigido: Jinx usa Barrier
    }
  },
  'Lulu': {
    roles: ['support'],
    build: {
      items: [
        'Dream Maker',
        'Ionian Boots of Lucidity',
        'Ardent Censer',
        'Moonstone Renewer',
        'Redemption',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Shurelya\'s Battlesong',
        'Mikael\'s Blessing',
        'Locket of the Iron Solari',
        'Staff of Flowing Water',
        'Dawncore',
        'Morellonomicon'
      ],
      runes: [
        'Summon Aery',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Bone Plating',
        'Revitalize'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Ability Haste',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal'] // Corrigido: Lulu usa Heal
    }
  },
  'Kaisa': {
    roles: ['adc'],
    build: {
      items: [
        'Kraken Slayer',
        'Berserker\'s Greaves',
        'Guinsoo\'s Rageblade',
        'Nashor\'s Tooth',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap'
      ],
      situationalItems: [
        'Terminus',
        'Phantom Dancer',
        'Infinity Edge',
        'Bloodthirster',
        'Shadowflame',
        'Guardian Angel'
      ],
      runes: [
        'Lethal Tempo',
        'Presence of Mind',
        'Legend: Bloodline',
        'Coup de Grace',
        'Magical Footwear',
        'Biscuit Delivery'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Ambessa': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Eclipse',
        'Plated Steelcaps',
        'Spear of Shojin',
        'Death\'s Dance',
        'Sterak\'s Gage',
        'Guardian Angel'
      ],
      situationalItems: [
        'Maw of Malmortius',
        'Black Cleaver',
        'Serpent\'s Fang',
        'Voltaic Cyclosword',
        'Chempunk Chainsword',
        'Serylda\'s Grudge'
      ],
      runes: [
        'Grasp of the Undying',
        'Shield Bash',
        'Second Wind',
        'Overgrowth',
        'Magical Footwear',
        'Biscuit Delivery'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Galio': {
    roles: ['mid', 'support'],
    build: {
      items: [
        'Hollow Radiance',
        'Mercury\'s Treads',
        'Riftmaker',
        'Zhonya\'s Hourglass',
        'Thornmail',
        'Frozen Heart'
      ],
      situationalItems: [
        'Rabadon\'s Deathcap',
        'Liandry\'s Torment',
        'Randuin\'s Omen',
        'Hextech Rocketbelt',
        'Bloodletter\'s Curse',
        'Morellonomicon'
      ],
      runes: [
        'Phase Rush',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Second Wind',
        'Unflinching'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Vi': {
    roles: ['jungle'],
    build: {
      items: [
        'Sundered Sky',
        'Plated Steelcaps',
        'Black Cleaver',
        'Sterak\'s Gage',
        'Guardian Angel',
        'Death\'s Dance'
      ],
      situationalItems: [
        'Maw of Malmortius',
        'Thornmail',
        'Kaenic Rookern',
        'Eclipse',
        'Randuin\'s Omen',
        'Chempunk Chainsword'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Haste',
        'Coup de Grace',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Leona': {
    roles: ['support'],
    build: {
      items: [
        'Celestial Opposition',
        'Plated Steelcaps',
        'Locket of the Iron Solari',
        'Redemption',
        'Knight\'s Vow',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Thornmail',
        'Kaenic Rookern',
        'Zeke\'s Convergence',
        'Frozen Heart',
        'Randuin\'s Omen',
        'Mikael\'s Blessing'
      ],
      runes: [
        'Aftershock',
        'Font of Life',
        'Bone Plating',
        'Unflinching',
        'Biscuit Delivery',
        'Cosmic Insight'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Ability Haste',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Yasuo': {
    roles: ['top', 'mid', 'adc'],
    build: {
      items: [
        'Blade of The Ruined King',
        'Berserker\'s Greaves',
        'Immortal Shieldbow',
        'Infinity Edge',
        'Death\'s Dance',
        'Guardian Angel'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Wit\'s End',
        'Lord Dominik\'s Regards',
        'Bloodthirster',
        'Jak\'Sho, The Protean',
        'Mercurial Scimitar'
      ],
      runes: [
        'Lethal Tempo',
        'Absorb Life',
        'Legend: Alacrity',
        'Last Stand',
        'Second Wind',
        'Overgrowth'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Exhaust']
    }
  },
  'Renekton': {
    roles: ['top'],
    build: {
      items: [
        'Eclipse',
        'Plated Steelcaps',
        'Black Cleaver',
        'Sterak\'s Gage',
        'Death\'s Dance',
        'Spirit Visage'
      ],
      situationalItems: [
        'Spear of Shojin',
        'Maw of Malmortius',
        'Stridebreaker',
        'Guardian Angel',
        'Sundered Sky',
        'Thornmail'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Bone Plating',
        'Unflinching'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Lissandra': {
    roles: ['mid'],
    build: {
      items: [
        'Malignance',
        'Sorcerer\'s Shoes',
        'Shadowflame',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Cryptbloom',
        'Stormsurge',
        'Liandry\'s Torment',
        'Banshee\'s Veil',
        'Morellonomicon',
        'Luden\'s Companion'
      ],
      runes: [
        'Electrocute',
        'Cheap Shot',
        'Grisly Mementos',
        'Ultimate Hunter',
        'Manaflow Band',
        'Transcendence'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Vex': {
    roles: ['mid'],
    build: {
      items: [
        'Luden\'s Companion',
        'Sorcerer\'s Shoes',
        'Shadowflame',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Stormsurge',
        'Banshee\'s Veil',
        'Morellonomicon',
        'Cryptbloom',
        'Liandry\'s Torment',
        'Horizon Focus'
      ],
      runes: [
        'Electrocute',
        'Taste of Blood',
        'Grisly Mementos',
        'Ultimate Hunter',
        'Manaflow Band',
        'Transcendence'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Samira': {
    roles: ['adc'],
    build: {
      items: [
        'The Collector',
        'Plated Steelcaps',
        'Infinity Edge',
        'Lord Dominik\'s Regards',
        'Immortal Shieldbow',
        'Guardian Angel'
      ],
      situationalItems: [
        'Bloodthirster',
        'Mortal Reminder',
        'Maw of Malmortius',
        'Mercurial Scimitar',
        'Death\'s Dance',
        'Serpent\'s Fang'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Bloodline',
        'Last Stand',
        'Taste of Blood',
        'Treasure Hunter'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Domination',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Yunara': {
    roles: ['adc'],
    build: {
      items: [
        'Kraken Slayer',
        'Berserker\'s Greaves',
        'Runaan\'s Hurricane',
        'Infinity Edge',
        'Lord Dominik\'s Regards',
        'Immortal Shieldbow'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Bloodthirster',
        'Guardian Angel',
        'Phantom Dancer',
        'Blade of The Ruined King',
        'Mercurial Scimitar'
      ],
      runes: [
        'Lethal Tempo',
        'Triumph',
        'Legend: Alacrity',
        'Cut Down',
        'Magical Footwear',
        'Biscuit Delivery'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Smolder': {
    roles: ['adc'],
    build: {
      items: [
        'Essence Reaver',
        'Ionian Boots of Lucidity',
        'Spear of Shojin',
        'Rapid Firecannon',
        'Infinity Edge',
        'Lord Dominik\'s Regards'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Bloodthirster',
        'Guardian Angel',
        'Immortal Shieldbow',
        'Trinity Force',
        'Maw of Malmortius'
      ],
      runes: [
        'Fleet Footwork',
        'Presence of Mind',
        'Legend: Bloodline',
        'Cut Down',
        'Magical Footwear',
        'Biscuit Delivery'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Lucian': {
    roles: ['adc'],
    build: {
      items: [
        'Essence Reaver',
        'Ionian Boots of Lucidity',
        'Navori Flickerblade',
        'Infinity Edge',
        'Lord Dominik\'s Regards',
        'Guardian Angel'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Black Cleaver',
        'Bloodthirster',
        'Immortal Shieldbow',
        'Maw of Malmortius',
        'Rapid Firecannon'
      ],
      runes: [
        'Press the Attack',
        'Presence of Mind',
        'Legend: Bloodline',
        'Coup de Grace',
        'Magical Footwear',
        'Biscuit Delivery'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Ezreal': {
    roles: ['adc'],
    build: {
      items: [
        'Trinity Force',
        'Ionian Boots of Lucidity',
        'Manamune',
        'Spear of Shojin',
        'Serylda\'s Grudge',
        'Bloodthirster'
      ],
      situationalItems: [
        'Maw of Malmortius',
        'Frozen Heart',
        'Voltaic Cyclosword',
        'Mortal Reminder',
        'Guardian Angel',
        'Serpent\'s Fang'
      ],
      runes: [
        'Press the Attack',
        'Presence of Mind',
        'Legend: Bloodline',
        'Coup de Grace',
        'Magical Footwear',
        'Biscuit Delivery'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Jhin': {
    roles: ['adc'],
    build: {
      items: [
        'The Collector',
        'Boots of Swiftness',
        'Infinity Edge',
        'Rapid Firecannon',
        'Lord Dominik\'s Regards',
        'Guardian Angel'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Bloodthirster',
        'Youmuu\'s Ghostblade',
        'Maw of Malmortius',
        'Phantom Dancer',
        'Immortal Shieldbow'
      ],
      runes: [
        'Fleet Footwork',
        'Presence of Mind',
        'Legend: Bloodline',
        'Coup de Grace',
        'Celerity',
        'Gathering Storm'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Sorcery',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Sivir': {
    roles: ['adc'],
    build: {
      items: [
        'Essence Reaver',
        'Berserker\'s Greaves',
        'Navori Flickerblade',
        'Infinity Edge',
        'Mortal Reminder',
        'Lord Dominik\'s Regards'
      ],
      situationalItems: [
        'Bloodthirster',
        'Guardian Angel',
        'Immortal Shieldbow',
        'Maw of Malmortius',
        'Yun Tal Wildarrows',
        'Serpent\'s Fang'
      ],
      runes: [
        'Lethal Tempo',
        'Presence of Mind',
        'Legend: Alacrity',
        'Cut Down',
        'Magical Footwear',
        'Biscuit Delivery'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Xayah': {
    roles: ['adc'],
    build: {
      items: [
        'Essence Reaver',
        'Berserker\'s Greaves',
        'Navori Flickerblade',
        'Infinity Edge',
        'Lord Dominik\'s Regards',
        'Mortal Reminder'
      ],
      situationalItems: [
        'Bloodthirster',
        'Guardian Angel',
        'Immortal Shieldbow',
        'Maw of Malmortius',
        'Mercurial Scimitar',
        'Phantom Dancer'
      ],
      runes: [
        'Lethal Tempo',
        'Presence of Mind',
        'Legend: Bloodline',
        'Coup de Grace',
        'Magical Footwear',
        'Biscuit Delivery'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Nilah': {
    roles: ['adc'],
    build: {
      items: [
        'The Collector',
        'Plated Steelcaps',
        'Infinity Edge',
        'Lord Dominik\'s Regards',
        'Immortal Shieldbow',
        'Death\'s Dance'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Bloodthirster',
        'Navori Flickerblade',
        'Guardian Angel',
        'Maw of Malmortius',
        'Mercurial Scimitar'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Bloodline',
        'Last Stand',
        'Sudden Impact',
        'Treasure Hunter'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Domination',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Tristana': {
    roles: ['adc'],
    build: {
      items: [
        'Yun Tal Wildarrows',
        'Berserker\'s Greaves',
        'Infinity Edge',
        'Navori Flickerblade',
        'Lord Dominik\'s Regards',
        'Bloodthirster'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Guardian Angel',
        'Maw of Malmortius',
        'The Collector',
        'Immortal Shieldbow',
        'Mercurial Scimitar'
      ],
      runes: [
        'Lethal Tempo',
        'Triumph',
        'Legend: Alacrity',
        'Cut Down',
        'Magical Footwear',
        'Biscuit Delivery'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Twitch': {
    roles: ['adc'],
    build: {
      items: [
        'Nashor\'s Tooth',
        'Ionian Boots of Lucidity',
        'Rabadon\'s Deathcap',
        'Zhonya\'s Hourglass',
        'Banshee\'s Veil',
        'Shadowflame'
      ],
      situationalItems: [
        'Void Staff',
        'Horizon Focus',
        'Riftmaker',
        'Cosmic Drive',
        'Runaan\'s Hurricane',
        'Morellonomicon'
      ],
      runes: [
        'Press the Attack',
        'Presence of Mind',
        'Legend: Alacrity',
        'Coup de Grace',
        'Absolute Focus',
        'Gathering Storm'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Vayne': {
    roles: ['top', 'adc'],
    build: {
      items: [
        'Blade of The Ruined King',
        'Berserker\'s Greaves',
        'Guinsoo\'s Rageblade',
        'Terminus',
        'Jak\'Sho, The Protean',
        'Experimental Hexplate'
      ],
      situationalItems: [
        'Wit\'s End',
        'Kraken Slayer',
        'Phantom Dancer',
        'Randuin\'s Omen',
        'Guardian Angel',
        'Mercurial Scimitar'
      ],
      runes: [
        'Lethal Tempo',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Conditioning',
        'Overgrowth'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Zeri': {
    roles: ['adc'],
    build: {
      items: [
        'Yun Tal Wildarrows',
        'Berserker\'s Greaves',
        'Runaan\'s Hurricane',
        'Infinity Edge',
        'Lord Dominik\'s Regards',
        'Bloodthirster'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Immortal Shieldbow',
        'Guardian Angel',
        'Experimental Hexplate',
        'Mercurial Scimitar',
        'Maw of Malmortius'
      ],
      runes: [
        'Lethal Tempo',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Conditioning',
        'Overgrowth'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Corki': {
    roles: ['adc'],
    build: {
      items: [
        'Trinity Force',
        'Plated Steelcaps',
        'Manamune',
        'The Collector',
        'Infinity Edge',
        'Rapid Firecannon'
      ],
      situationalItems: [
        'Lord Dominik\'s Regards',
        'Mortal Reminder',
        'Spear of Shojin',
        'Guardian Angel',
        'Immortal Shieldbow',
        'Maw of Malmortius'
      ],
      runes: [
        'Conqueror',
        'Presence of Mind',
        'Legend: Alacrity',
        'Cut Down',
        'Biscuit Delivery',
        'Jack Of All Trades'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Kog\'Maw': {
    roles: ['adc'],
    build: {
      items: [
        'Blade of The Ruined King',
        'Berserker\'s Greaves',
        'Guinsoo\'s Rageblade',
        'Runaan\'s Hurricane',
        'Terminus',
        'Jak\'Sho, The Protean'
      ],
      situationalItems: [
        'Wit\'s End',
        'Navori Flickerblade',
        'Kraken Slayer',
        'Randuin\'s Omen',
        'Mercurial Scimitar',
        'Titanic Hydra'
      ],
      runes: [
        'Lethal Tempo',
        'Triumph',
        'Legend: Bloodline',
        'Last Stand',
        'Conditioning',
        'Overgrowth'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Senna': {
    roles: ['support'],
    build: {
      items: [
        'Bloodsong',
        'Boots of Swiftness',
        'Black Cleaver',
        'Rapid Firecannon',
        'Infinity Edge',
        'Chempunk Chainsword'
      ],
      situationalItems: [
        'The Collector',
        'Edge of Night',
        'Serpent\'s Fang',
        'Manamune',
        'Phantom Dancer',
        'Umbral Glaive'
      ],
      runes: [
        'Fleet Footwork',
        'Presence of Mind',
        'Legend: Alacrity',
        'Cut Down',
        'Bone Plating',
        'Revitalize'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Aatrox': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Spear of Shojin',
        'Plated Steelcaps',
        'Voltaic Cyclosword',
        'Serylda\'s Grudge',
        'Sterak\'s Gage',
        'Death\'s Dance'
      ],
      situationalItems: [
        'Sundered Sky',
        'Maw of Malmortius',
        'Serpent\'s Fang',
        'Black Cleaver',
        'Spirit Visage',
        'Mortal Reminder'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Haste',
        'Last Stand',
        'Bone Plating',
        'Revitalize'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Akali': {
    roles: ['top', 'mid'],
    build: {
      items: [
        'Stormsurge',
        'Sorcerer\'s Shoes',
        'Shadowflame',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Banshee\'s Veil',
        'Lich Bane',
        'Hextech Rocketbelt',
        'Morellonomicon',
        'Liandry\'s Torment',
        'Cryptbloom'
      ],
      runes: [
        'Electrocute',
        'Sudden Impact',
        'Grisly Mementos',
        'Ultimate Hunter',
        'Second Wind',
        'Overgrowth'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Resolve',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Ahri': {
    roles: ['mid'],
    build: {
      items: [
        'Malignance',
        'Sorcerer\'s Shoes',
        'Shadowflame',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Horizon Focus',
        'Banshee\'s Veil',
        'Liandry\'s Torment',
        'Stormsurge',
        'Cryptbloom',
        'Morellonomicon'
      ],
      runes: [
        'Electrocute',
        'Taste of Blood',
        'Grisly Mementos',
        'Ultimate Hunter',
        'Manaflow Band',
        'Transcendence'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Akshan': {
    roles: ['mid', 'adc'],
    build: {
      items: [
        'Statikk Shiv',
        'Symbiotic Soles',
        'The Collector',
        'Infinity Edge',
        'Lord Dominik\'s Regards',
        'Rapid Firecannon'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Immortal Shieldbow',
        'Guardian Angel',
        'Serpent\'s Fang',
        'Bloodthirster',
        'Blade of The Ruined King'
      ],
      runes: [
        'Press the Attack',
        'Presence of Mind',
        'Legend: Alacrity',
        'Coup de Grace',
        'Bone Plating',
        'Overgrowth'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Alistar': {
    roles: ['support'],
    build: {
      items: [
        'Celestial Opposition',
        'Boots of Swiftness',
        'Locket of the Iron Solari',
        'Redemption',
        'Knight\'s Vow',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Zeke\'s Convergence',
        'Thornmail',
        'Frozen Heart',
        'Kaenic Rookern',
        'Randuin\'s Omen',
        'Abyssal Mask'
      ],
      runes: [
        'Aftershock',
        'Font of Life',
        'Bone Plating',
        'Unflinching',
        'Hextech Flashtraption',
        'Cosmic Insight'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Ability Haste',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Amumu': {
    roles: ['jungle', 'support'],
    build: {
      items: [
        'Liandry\'s Torment',
        'Plated Steelcaps',
        'Sunfire Aegis',
        'Abyssal Mask',
        'Thornmail',
        'Jak\'Sho, The Protean'
      ],
      situationalItems: [
        'Unending Despair',
        'Frozen Heart',
        'Kaenic Rookern',
        'Randuin\'s Omen',
        'Morellonomicon',
        'Zhonya\'s Hourglass'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Haste',
        'Last Stand',
        'Cheap Shot',
        'Ultimate Hunter'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Domination',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Anivia': {
    roles: ['mid', 'support'],
    build: {
      items: [
        'Rod of Ages',
        'Sorcerer\'s Shoes',
        'Archangel\'s Staff',
        'Liandry\'s Torment',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap'
      ],
      situationalItems: [
        'Malignance',
        'Void Staff',
        'Cryptbloom',
        'Morellonomicon',
        'Banshee\'s Veil',
        'Bloodletter\'s Curse'
      ],
      runes: [
        'Electrocute',
        'Cheap Shot',
        'Grisly Mementos',
        'Relentless Hunter',
        'Presence of Mind',
        'Coup de Grace'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Precision',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Annie': {
    roles: ['mid', 'support'],
    build: {
      items: [
        'Malignance',
        'Sorcerer\'s Shoes',
        'Stormsurge',
        'Shadowflame',
        'Rabadon\'s Deathcap',
        'Zhonya\'s Hourglass'
      ],
      situationalItems: [
        'Void Staff',
        'Rylai\'s Crystal Scepter',
        'Banshee\'s Veil',
        'Liandry\'s Torment',
        'Hextech Rocketbelt',
        'Morellonomicon'
      ],
      runes: [
        'Electrocute',
        'Cheap Shot',
        'Grisly Mementos',
        'Relentless Hunter',
        'Axiom Arcanist',
        'Absolute Focus'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Aphelios': {
    roles: ['adc'],
    build: {
      items: [
        'The Collector',
        'Berserker\'s Greaves',
        'Infinity Edge',
        'Lord Dominik\'s Regards',
        'Immortal Shieldbow',
        'Bloodthirster'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Runaan\'s Hurricane',
        'Guardian Angel',
        'Phantom Dancer',
        'Mercurial Scimitar',
        'Rapid Firecannon'
      ],
      runes: [
        'Press the Attack',
        'Absorb Life',
        'Legend: Bloodline',
        'Cut Down',
        'Absolute Focus',
        'Gathering Storm'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Ashe': {
    roles: ['adc'],
    build: {
      items: [
        'Kraken Slayer',
        'Berserker\'s Greaves',
        'Phantom Dancer',
        'Infinity Edge',
        'Bloodthirster',
        'Mortal Reminder'
      ],
      situationalItems: [
        'Lord Dominik\'s Regards',
        'Guardian Angel',
        'Blade of The Ruined King',
        'Runaan\'s Hurricane',
        'Wit\'s End',
        'Immortal Shieldbow'
      ],
      runes: [
        'Lethal Tempo',
        'Presence of Mind',
        'Legend: Alacrity',
        'Cut Down',
        'Biscuit Delivery',
        'Approach Velocity'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Aurelion Sol': {
    roles: ['mid'],
    build: {
      items: [
        'Blackfire Torch',
        'Sorcerer\'s Shoes',
        'Rylai\'s Crystal Scepter',
        'Liandry\'s Torment',
        'Rabadon\'s Deathcap',
        'Zhonya\'s Hourglass'
      ],
      situationalItems: [
        'Banshee\'s Veil',
        'Bloodletter\'s Curse',
        'Void Staff',
        'Shadowflame',
        'Archangel\'s Staff',
        'Morellonomicon'
      ],
      runes: [
        'Arcane Comet',
        'Manaflow Band',
        'Absolute Focus',
        'Scorch',
        'Bone Plating',
        'Overgrowth'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Aurora': {
    roles: ['top', 'mid'],
    build: {
      items: [
        'Luden\'s Companion',
        'Sorcerer\'s Shoes',
        'Shadowflame',
        'Rabadon\'s Deathcap',
        'Void Staff',
        'Zhonya\'s Hourglass'
      ],
      situationalItems: [
        'Stormsurge',
        'Banshee\'s Veil',
        'Liandry\'s Torment',
        'Cryptbloom',
        'Morellonomicon',
        'Malignance'
      ],
      runes: [
        'Electrocute',
        'Taste of Blood',
        'Grisly Mementos',
        'Ultimate Hunter',
        'Manaflow Band',
        'Transcendence'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Azir': {
    roles: ['mid'],
    build: {
      items: [
        'Nashor\'s Tooth',
        'Sorcerer\'s Shoes',
        'Rylai\'s Crystal Scepter',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Liandry\'s Torment',
        'Shadowflame',
        'Banshee\'s Veil',
        'Morellonomicon',
        'Cryptbloom',
        'Bloodletter\'s Curse'
      ],
      runes: [
        'Lethal Tempo',
        'Presence of Mind',
        'Legend: Alacrity',
        'Cut Down',
        'Bone Plating',
        'Overgrowth'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Bard': {
    roles: ['support'],
    build: {
      items: [
        'Bloodsong',
        'Boots of Swiftness',
        'Dead Man\'s Plate',
        'Liandry\'s Torment',
        'Locket of the Iron Solari',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Redemption',
        'Wit\'s End',
        'Jak\'Sho, The Protean',
        'Kaenic Rookern',
        'Shurelya\'s Battlesong',
        'Abyssal Mask'
      ],
      runes: [
        'Electrocute',
        'Cheap Shot',
        'Deep Ward',
        'Relentless Hunter',
        'Celerity',
        'Scorch'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Bel\'Veth': {
    roles: ['jungle'],
    build: {
      items: [
        'Kraken Slayer',
        'Plated Steelcaps',
        'Stridebreaker',
        'Wit\'s End',
        'Death\'s Dance',
        'Jak\'Sho, The Protean'
      ],
      situationalItems: [
        'Blade of The Ruined King',
        'Terminus',
        'Black Cleaver',
        'Guardian Angel',
        'Randuin\'s Omen',
        'Sterak\'s Gage'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Blitzcrank': {
    roles: ['support'],
    build: {
      items: [
        'Celestial Opposition',
        'Boots of Swiftness',
        'Locket of the Iron Solari',
        'Redemption',
        'Zeke\'s Convergence',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Frozen Heart',
        'Thornmail',
        'Shurelya\'s Battlesong',
        'Knight\'s Vow',
        'Mikael\'s Blessing',
        'Trailblazer'
      ],
      runes: [
        'Hextech Flashtraption',
        'Biscuit Delivery',
        'Cosmic Insight',
        'Nimbus Cloak',
        'Celerity'
      ],
      primaryTree: 'Inspiration',
      secondaryTree: 'Sorcery',
      statShards: [
        'Ability Haste',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Brand': {
    roles: ['adc', 'support'],
    build: {
      items: [
        'Zaz\'Zak\'s Realmspike',
        'Sorcerer\'s Shoes',
        'Rylai\'s Crystal Scepter',
        'Liandry\'s Torment',
        'Morellonomicon',
        'Zhonya\'s Hourglass'
      ],
      situationalItems: [
        'Blackfire Torch',
        'Malignance',
        'Bloodletter\'s Curse',
        'Shadowflame',
        'Void Staff',
        'Imperial Mandate'
      ],
      runes: [
        'Arcane Comet',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Biscuit Delivery',
        'Cosmic Insight'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Braum': {
    roles: ['support'],
    build: {
      items: [
        'Solstice Sleigh',
        'Plated Steelcaps',
        'Locket of the Iron Solari',
        'Redemption',
        'Knight\'s Vow',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Thornmail',
        'Frozen Heart',
        'Kaenic Rookern',
        'Mikael\'s Blessing',
        'Abyssal Mask',
        'Randuin\'s Omen'
      ],
      runes: [
        'Guardian',
        'Font of Life',
        'Bone Plating',
        'Unflinching',
        'Biscuit Delivery',
        'Cosmic Insight'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Briar': {
    roles: ['jungle'],
    build: {
      items: [
        'Blade of The Ruined King',
        'Plated Steelcaps',
        'Black Cleaver',
        'Death\'s Dance',
        'Spirit Visage',
        'Sterak\'s Gage'
      ],
      situationalItems: [
        'Sundered Sky',
        'Titanic Hydra',
        'Guardian Angel',
        'Randuin\'s Omen',
        'Kraken Slayer',
        'Maw of Malmortius'
      ],
      runes: [
        'Press the Attack',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Sudden Impact',
        'Treasure Hunter'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Domination',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Caitlyn': {
    roles: ['adc'],
    build: {
      items: [
        'The Collector',
        'Berserker\'s Greaves',
        'Infinity Edge',
        'Rapid Firecannon',
        'Lord Dominik\'s Regards',
        'Guardian Angel'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Bloodthirster',
        'Phantom Dancer',
        'Immortal Shieldbow',
        'Mercurial Scimitar',
        'Maw of Malmortius'
      ],
      runes: [
        'Lethal Tempo',
        'Presence of Mind',
        'Legend: Bloodline',
        'Coup de Grace',
        'Absolute Focus',
        'Gathering Storm'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Camille': {
    roles: ['top'],
    build: {
      items: [
        'Trinity Force',
        'Plated Steelcaps',
        'Ravenous Hydra',
        'Spear of Shojin',
        'Death\'s Dance',
        'Guardian Angel'
      ],
      situationalItems: [
        'Sterak\'s Gage',
        'Maw of Malmortius',
        'Sundered Sky',
        'Chempunk Chainsword',
        'Hullbreaker',
        'Randuin\'s Omen'
      ],
      runes: [
        'Grasp of the Undying',
        'Shield Bash',
        'Bone Plating',
        'Unflinching',
        'Magical Footwear',
        'Biscuit Delivery'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Cassiopeia': {
    roles: ['mid', 'top'],
    build: {
      items: [
        'Rod of Ages',
        'Archangel\'s Staff',
        'Rylai\'s Crystal Scepter',
        'Liandry\'s Torment',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap'
      ],
      situationalItems: [
        'Cosmic Drive',
        'Void Staff',
        'Bloodletter\'s Curse',
        'Morellonomicon',
        'Banshee\'s Veil',
        'Riftmaker'
      ],
      runes: [
        'Conqueror',
        'Presence of Mind',
        'Legend: Haste',
        'Last Stand',
        'Manaflow Band',
        'Transcendence'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Sorcery',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Cho\'Gath': {
    roles: ['top', 'mid'],
    build: {
      items: [
        'Hextech Rocketbelt',
        'Boots of Swiftness',
        'Riftmaker',
        'Unending Despair',
        'Jak\'Sho, The Protean',
        'Thornmail'
      ],
      situationalItems: [
        'Dead Man\'s Plate',
        'Shadowflame',
        'Randuin\'s Omen',
        'Rabadon\'s Deathcap',
        'Force of Nature',
        'Kaenic Rookern'
      ],
      runes: [
        'Hail of Blades',
        'Cheap Shot',
        'Grisly Mementos',
        'Ultimate Hunter',
        'Axiom Arcanist',
        'Celerity'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Adaptive Force',
        'Move Speed',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Darius': {
    roles: ['top'],
    build: {
      items: [
        'Stridebreaker',
        'Plated Steelcaps',
        'Sterak\'s Gage',
        'Dead Man\'s Plate',
        'Force of Nature',
        'Death\'s Dance'
      ],
      situationalItems: [
        'Spear of Shojin',
        'Thornmail',
        'Randuin\'s Omen',
        'Jak\'Sho, The Protean',
        'Kaenic Rookern',
        'Spirit Visage'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Axiom Arcanist',
        'Celerity'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Diana': {
    roles: ['jungle'],
    build: {
      items: [
        'Liandry\'s Torment',
        'Sorcerer\'s Shoes',
        'Riftmaker',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Shadowflame'
      ],
      situationalItems: [
        'Unending Despair',
        'Bloodletter\'s Curse',
        'Nashor\'s Tooth',
        'Abyssal Mask',
        'Morellonomicon',
        'Jak\'Sho, The Protean'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Dr. Mundo': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Heartsteel',
        'Boots of Swiftness',
        'Dead Man\'s Plate',
        'Spirit Visage',
        'Thornmail',
        'Overlord\'s Bloodmail'
      ],
      situationalItems: [
        'Titanic Hydra',
        'Randuin\'s Omen',
        'Unending Despair',
        'Warmog\'s Armor',
        'Frozen Heart',
        'Force of Nature'
      ],
      runes: [
        'Fleet Footwork',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Magical Footwear',
        'Approach Velocity'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Ekko': {
    roles: ['jungle', 'mid'],
    build: {
      items: [
        'Nashor\'s Tooth',
        'Sorcerer\'s Shoes',
        'Lich Bane',
        'Rabadon\'s Deathcap',
        'Zhonya\'s Hourglass',
        'Void Staff'
      ],
      situationalItems: [
        'Shadowflame',
        'Banshee\'s Veil',
        'Hextech Rocketbelt',
        'Stormsurge',
        'Morellonomicon',
        'Cryptbloom'
      ],
      runes: [
        'Dark Harvest',
        'Sudden Impact',
        'Grisly Mementos',
        'Treasure Hunter',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Elise': {
    roles: ['jungle', 'support'],
    build: {
      items: [
        'Stormsurge',
        'Sorcerer\'s Shoes',
        'Shadowflame',
        'Zhonya\'s Hourglass',
        'Void Staff',
        'Banshee\'s Veil'
      ],
      situationalItems: [
        'Rabadon\'s Deathcap',
        'Lich Bane',
        'Liandry\'s Torment',
        'Morellonomicon',
        'Cryptbloom',
        'Rylai\'s Crystal Scepter'
      ],
      runes: [
        'Dark Harvest',
        'Cheap Shot',
        'Grisly Mementos',
        'Relentless Hunter',
        'Triumph',
        'Coup de Grace'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Precision',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Evelynn': {
    roles: ['jungle'],
    build: {
      items: [
        'Lich Bane',
        'Sorcerer\'s Shoes',
        'Rabadon\'s Deathcap',
        'Void Staff',
        'Banshee\'s Veil',
        'Shadowflame'
      ],
      situationalItems: [
        'Zhonya\'s Hourglass',
        'Stormsurge',
        'Hextech Rocketbelt',
        'Cryptbloom',
        'Morellonomicon',
        'Ardent Censer'
      ],
      runes: [
        'Electrocute',
        'Sudden Impact',
        'Grisly Mementos',
        'Relentless Hunter',
        'Absolute Focus',
        'Gathering Storm'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Fiddlesticks': {
    roles: ['jungle', 'support'],
    build: {
      items: [
        'Malignance',
        'Sorcerer\'s Shoes',
        'Liandry\'s Torment',
        'Zhonya\'s Hourglass',
        'Shadowflame',
        'Rabadon\'s Deathcap'
      ],
      situationalItems: [
        'Void Staff',
        'Hextech Rocketbelt',
        'Banshee\'s Veil',
        'Morellonomicon',
        'Bloodletter\'s Curse',
        'Rylai\'s Crystal Scepter'
      ],
      runes: [
        'Electrocute',
        'Cheap Shot',
        'Grisly Mementos',
        'Ultimate Hunter',
        'Axiom Arcanist',
        'Transcendence'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Fiora': {
    roles: ['top'],
    build: {
      items: [
        'Ravenous Hydra',
        'Plated Steelcaps',
        'Trinity Force',
        'Death\'s Dance',
        'Spear of Shojin',
        'Sterak\'s Gage'
      ],
      situationalItems: [
        'Hullbreaker',
        'Maw of Malmortius',
        'Guardian Angel',
        'Eclipse',
        'Chempunk Chainsword',
        'Randuin\'s Omen'
      ],
      runes: [
        'Press the Attack',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Biscuit Delivery',
        'Jack Of All Trades'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Fizz': {
    roles: ['mid', 'jungle'],
    build: {
      items: [
        'Lich Bane',
        'Sorcerer\'s Shoes',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff',
        'Shadowflame'
      ],
      situationalItems: [
        'Cryptbloom',
        'Stormsurge',
        'Banshee\'s Veil',
        'Morellonomicon',
        'Luden\'s Companion',
        'Hextech Rocketbelt'
      ],
      runes: [
        'Electrocute',
        'Sudden Impact',
        'Grisly Mementos',
        'Treasure Hunter',
        'Transcendence',
        'Scorch'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Gangplank': {
    roles: ['top'],
    build: {
      items: [
        'Trinity Force',
        'Plated Steelcaps',
        'The Collector',
        'Infinity Edge',
        'Lord Dominik\'s Regards',
        'Immortal Shieldbow'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Serpent\'s Fang',
        'Youmuu\'s Ghostblade',
        'Opportunity',
        'Maw of Malmortius',
        'Guardian Angel'
      ],
      runes: [
        'Grasp of the Undying',
        'Demolish',
        'Bone Plating',
        'Overgrowth',
        'Biscuit Delivery',
        'Cosmic Insight'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Garen': {
    roles: ['top'],
    build: {
      items: [
        'Stridebreaker',
        'Berserker\'s Greaves',
        'Phantom Dancer',
        'Spear of Shojin',
        'Mortal Reminder',
        'Sterak\'s Gage'
      ],
      situationalItems: [
        'Infinity Edge',
        'Dead Man\'s Plate',
        'Black Cleaver',
        'Death\'s Dance',
        'Force of Nature',
        'Serpent\'s Fang'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Haste',
        'Last Stand',
        'Axiom Arcanist',
        'Celerity'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Sorcery',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Gnar': {
    roles: ['top'],
    build: {
      items: [
        'Trinity Force',
        'Plated Steelcaps',
        'Black Cleaver',
        'Sterak\'s Gage',
        'Randuin\'s Omen',
        'Thornmail'
      ],
      situationalItems: [
        'Wit\'s End',
        'Force of Nature',
        'Hullbreaker',
        'Blade of The Ruined King',
        'Jak\'Sho, The Protean',
        'Kaenic Rookern'
      ],
      runes: [
        'Fleet Footwork',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Bone Plating',
        'Overgrowth'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Gragas': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Rod of Ages',
        'Ionian Boots of Lucidity',
        'Winter\'s Approach',
        'Cosmic Drive',
        'Zhonya\'s Hourglass',
        'Shadowflame'
      ],
      situationalItems: [
        'Hextech Rocketbelt',
        'Morellonomicon',
        'Frozen Heart',
        'Lich Bane',
        'Rabadon\'s Deathcap',
        'Thornmail'
      ],
      runes: [
        'Phase Rush',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Biscuit Delivery',
        'Cosmic Insight'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Graves': {
    roles: ['jungle'],
    build: {
      items: [
        'Youmuu\'s Ghostblade',
        'Plated Steelcaps',
        'The Collector',
        'Lord Dominik\'s Regards',
        'Immortal Shieldbow',
        'Infinity Edge'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Bloodthirster',
        'Maw of Malmortius',
        'Guardian Angel',
        'Serpent\'s Fang',
        'Black Cleaver'
      ],
      runes: [
        'Dark Harvest',
        'Sudden Impact',
        'Grisly Mementos',
        'Treasure Hunter',
        'Triumph',
        'Legend: Alacrity'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Precision',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Gwen': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Nashor\'s Tooth',
        'Plated Steelcaps',
        'Riftmaker',
        'Rabadon\'s Deathcap',
        'Zhonya\'s Hourglass',
        'Void Staff'
      ],
      situationalItems: [
        'Shadowflame',
        'Cosmic Drive',
        'Lich Bane',
        'Morellonomicon',
        'Banshee\'s Veil',
        'Bloodletter\'s Curse'
      ],
      runes: [
        'Conqueror',
        'Presence of Mind',
        'Legend: Alacrity',
        'Last Stand',
        'Bone Plating',
        'Unflinching'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Hecarim': {
    roles: ['jungle'],
    build: {
      items: [
        'Spear of Shojin',
        'Ionian Boots of Lucidity',
        'Black Cleaver',
        'Death\'s Dance',
        'Maw of Malmortius',
        'Eclipse'
      ],
      situationalItems: [
        'Sterak\'s Gage',
        'Serpent\'s Fang',
        'Chempunk Chainsword',
        'Guardian Angel',
        'Spirit Visage',
        'Youmuu\'s Ghostblade'
      ],
      runes: [
        'Phase Rush',
        'Nimbus Cloak',
        'Celerity',
        'Waterwalking',
        'Triumph',
        'Legend: Haste'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Precision',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Heimerdinger': {
    roles: ['top', 'support'],
    build: {
      items: [
        'Blackfire Torch',
        'Sorcerer\'s Shoes',
        'Liandry\'s Torment',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Rylai\'s Crystal Scepter',
        'Shadowflame',
        'Morellonomicon',
        'Bloodletter\'s Curse',
        'Banshee\'s Veil',
        'Cryptbloom'
      ],
      runes: [
        'Conqueror',
        'Presence of Mind',
        'Legend: Haste',
        'Cut Down',
        'Absolute Focus',
        'Gathering Storm'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Sorcery',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Hwei': {
    roles: ['mid', 'adc'],
    build: {
      items: [
        'Blackfire Torch',
        'Sorcerer\'s Shoes',
        'Liandry\'s Torment',
        'Shadowflame',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Zhonya\'s Hourglass',
        'Horizon Focus',
        'Bloodletter\'s Curse',
        'Cryptbloom',
        'Morellonomicon',
        'Archangel\'s Staff'
      ],
      runes: [
        'Arcane Comet',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Legend: Haste',
        'Cut Down'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Precision',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Illaoi': {
    roles: ['top'],
    build: {
      items: [
        'Iceborn Gauntlet',
        'Plated Steelcaps',
        'Black Cleaver',
        'Sterak\'s Gage',
        'Spirit Visage',
        'Thornmail'
      ],
      situationalItems: [
        'Sundered Sky',
        'Death\'s Dance',
        'Winter\'s Approach',
        'Hullbreaker',
        'Randuin\'s Omen',
        'Kaenic Rookern'
      ],
      runes: [
        'Grasp of the Undying',
        'Demolish',
        'Bone Plating',
        'Overgrowth',
        'Presence of Mind',
        'Last Stand'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Precision',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Irelia': {
    roles: ['top', 'mid'],
    build: {
      items: [
        'Blade of The Ruined King',
        'Plated Steelcaps',
        'Hullbreaker',
        'Wit\'s End',
        'Death\'s Dance',
        'Guardian Angel'
      ],
      situationalItems: [
        'Kraken Slayer',
        'Sterak\'s Gage',
        'Frozen Heart',
        'Sundered Sky',
        'Randuin\'s Omen',
        'Terminus'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Biscuit Delivery',
        'Jack Of All Trades'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Ivern': {
    roles: ['jungle', 'support'],
    build: {
      items: [
        'Redemption',
        'Ionian Boots of Lucidity',
        'Moonstone Renewer',
        'Ardent Censer',
        'Dawncore',
        'Shurelya\'s Battlesong'
      ],
      situationalItems: [
        'Staff of Flowing Water',
        'Mikael\'s Blessing',
        'Rylai\'s Crystal Scepter',
        'Malignance',
        'Locket of the Iron Solari',
        'Morellonomicon'
      ],
      runes: [
        'Summon Aery',
        'Nimbus Cloak',
        'Transcendence',
        'Waterwalking',
        'Cash Back',
        'Cosmic Insight'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Inspiration',
      statShards: [
        'Ability Haste',
        'Move Speed',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Janna': {
    roles: ['support'],
    build: {
      items: [
        'Dream Maker',
        'Boots of Swiftness',
        'Moonstone Renewer',
        'Redemption',
        'Dawncore',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Ardent Censer',
        'Shurelya\'s Battlesong',
        'Mikael\'s Blessing',
        'Imperial Mandate',
        'Staff of Flowing Water',
        'Locket of the Iron Solari'
      ],
      runes: [
        'Summon Aery',
        'Manaflow Band',
        'Celerity',
        'Gathering Storm',
        'Font of Life',
        'Revitalize'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Adaptive Force',
        'Move Speed',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Jarvan IV': {
    roles: ['jungle', 'top'],
    build: {
      items: [
        'Sundered Sky',
        'Plated Steelcaps',
        'Black Cleaver',
        'Frozen Heart',
        'Spirit Visage',
        'Thornmail'
      ],
      situationalItems: [
        'Sterak\'s Gage',
        'Guardian Angel',
        'Spear of Shojin',
        'Randuin\'s Omen',
        'Death\'s Dance',
        'Maw of Malmortius'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Jax': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Trinity Force',
        'Plated Steelcaps',
        'Sundered Sky',
        'Zhonya\'s Hourglass',
        'Sterak\'s Gage',
        'Frozen Heart'
      ],
      situationalItems: [
        'Wit\'s End',
        'Death\'s Dance',
        'Spear of Shojin',
        'Blade of The Ruined King',
        'Randuin\'s Omen',
        'Kaenic Rookern'
      ],
      runes: [
        'Grasp of the Undying',
        'Demolish',
        'Second Wind',
        'Unflinching',
        'Biscuit Delivery',
        'Cosmic Insight'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Jayce': {
    roles: ['top', 'mid'],
    build: {
      items: [
        'Youmuu\'s Ghostblade',
        'Ionian Boots of Lucidity',
        'Manamune',
        'Serylda\'s Grudge',
        'Edge of Night',
        'Serpent\'s Fang'
      ],
      situationalItems: [
        'Spear of Shojin',
        'Eclipse',
        'Opportunity',
        'Maw of Malmortius',
        'Guardian Angel',
        'Mortal Reminder'
      ],
      runes: [
        'Phase Rush',
        'Manaflow Band',
        'Absolute Focus',
        'Gathering Storm',
        'Magical Footwear',
        'Biscuit Delivery'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'K\'Sante': {
    roles: ['top'],
    build: {
      items: [
        'Iceborn Gauntlet',
        'Plated Steelcaps',
        'Unending Despair',
        'Jak\'Sho, The Protean',
        'Thornmail',
        'Randuin\'s Omen'
      ],
      situationalItems: [
        'Spirit Visage',
        'Kaenic Rookern',
        'Frozen Heart',
        'Force of Nature',
        'Hollow Radiance',
        'Winter\'s Approach'
      ],
      runes: [
        'Grasp of the Undying',
        'Shield Bash',
        'Second Wind',
        'Overgrowth',
        'Biscuit Delivery',
        'Cosmic Insight'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Kalista': {
    roles: ['adc'],
    build: {
      items: [
        'Blade of The Ruined King',
        'Berserker\'s Greaves',
        'Guinsoo\'s Rageblade',
        'Terminus',
        'Jak\'Sho, The Protean',
        'Wit\'s End'
      ],
      situationalItems: [
        'Runaan\'s Hurricane',
        'Bloodthirster',
        'Guardian Angel',
        'Randuin\'s Omen',
        'Mercurial Scimitar',
        'Immortal Shieldbow'
      ],
      runes: [
        'Lethal Tempo',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Sudden Impact',
        'Treasure Hunter'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Domination',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Karma': {
    roles: ['support', 'mid'],
    build: {
      items: [
        'Dream Maker',
        'Ionian Boots of Lucidity',
        'Moonstone Renewer',
        'Redemption',
        'Dawncore',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Ardent Censer',
        'Mikael\'s Blessing',
        'Shurelya\'s Battlesong',
        'Imperial Mandate',
        'Staff of Flowing Water',
        'Malignance'
      ],
      runes: [
        'Summon Aery',
        'Manaflow Band',
        'Transcendence',
        'Gathering Storm',
        'Font of Life',
        'Revitalize'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Ability Haste',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Karthus': {
    roles: ['jungle', 'adc'],
    build: {
      items: [
        'Blackfire Torch',
        'Sorcerer\'s Shoes',
        'Shadowflame',
        'Rabadon\'s Deathcap',
        'Void Staff',
        'Zhonya\'s Hourglass'
      ],
      situationalItems: [
        'Liandry\'s Torment',
        'Cryptbloom',
        'Horizon Focus',
        'Morellonomicon',
        'Malignance',
        'Stormsurge'
      ],
      runes: [
        'Dark Harvest',
        'Cheap Shot',
        'Sixth Sense',
        'Treasure Hunter',
        'Triumph',
        'Last Stand'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Precision',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Kassadin': {
    roles: ['mid'],
    build: {
      items: [
        'Malignance',
        'Sorcerer\'s Shoes',
        'Archangel\'s Staff',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Lich Bane',
        'Frozen Heart',
        'Shadowflame',
        'Banshee\'s Veil',
        'Abyssal Mask',
        'Rod of Ages'
      ],
      runes: [
        'Electrocute',
        'Sudden Impact',
        'Grisly Mementos',
        'Ultimate Hunter',
        'Presence of Mind',
        'Last Stand'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Precision',
      statShards: [
        'Adaptive Force',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Katarina': {
    roles: ['mid'],
    build: {
      items: [
        'Lich Bane',
        'Sorcerer\'s Shoes',
        'Shadowflame',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Banshee\'s Veil',
        'Stormsurge',
        'Nashor\'s Tooth',
        'Liandry\'s Torment',
        'Cryptbloom',
        'Morellonomicon'
      ],
      runes: [
        'Electrocute',
        'Sudden Impact',
        'Grisly Mementos',
        'Relentless Hunter',
        'Triumph',
        'Coup de Grace'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Precision',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Kayle': {
    roles: ['top', 'mid'],
    build: {
      items: [
        'Nashor\'s Tooth',
        'Boots of Swiftness',
        'Rabadon\'s Deathcap',
        'Shadowflame',
        'Lich Bane',
        'Void Staff'
      ],
      situationalItems: [
        'Zhonya\'s Hourglass',
        'Rylai\'s Crystal Scepter',
        'Banshee\'s Veil',
        'Guinsoo\'s Rageblade',
        'Morellonomicon',
        'Stormsurge'
      ],
      runes: [
        'Press the Attack',
        'Absorb Life',
        'Legend: Alacrity',
        'Last Stand',
        'Celerity',
        'Gathering Storm'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Kayn': {
    roles: ['jungle'],
    build: {
      items: [
        'Eclipse',
        'Plated Steelcaps',
        'Black Cleaver',
        'Spear of Shojin',
        'Spirit Visage',
        'Sterak\'s Gage'
      ],
      situationalItems: [
        'Death\'s Dance',
        'Maw of Malmortius',
        'Guardian Angel',
        'Thornmail',
        'Chempunk Chainsword',
        'Serpent\'s Fang'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Haste',
        'Last Stand',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Kennen': {
    roles: ['top', 'mid'],
    build: {
      items: [
        'Hextech Rocketbelt',
        'Sorcerer\'s Shoes',
        'Shadowflame',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Stormsurge',
        'Banshee\'s Veil',
        'Morellonomicon',
        'Liandry\'s Torment',
        'Cryptbloom',
        'Bloodletter\'s Curse'
      ],
      runes: [
        'Electrocute',
        'Taste of Blood',
        'Grisly Mementos',
        'Ultimate Hunter',
        'Absolute Focus',
        'Scorch'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Kha\'Zix': {
    roles: ['jungle'],
    build: {
      items: [
        'Youmuu\'s Ghostblade',
        'Ionian Boots of Lucidity',
        'Opportunity',
        'Edge of Night',
        'Serylda\'s Grudge',
        'Guardian Angel'
      ],
      situationalItems: [
        'Serpent\'s Fang',
        'Maw of Malmortius',
        'Profane Hydra',
        'Hubris',
        'Axiom Arc',
        'Death\'s Dance'
      ],
      runes: [
        'Dark Harvest',
        'Sudden Impact',
        'Grisly Mementos',
        'Treasure Hunter',
        'Triumph',
        'Coup de Grace'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Precision',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Kindred': {
    roles: ['jungle'],
    build: {
      items: [
        'Kraken Slayer',
        'Plated Steelcaps',
        'The Collector',
        'Infinity Edge',
        'Lord Dominik\'s Regards',
        'Rapid Firecannon'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Wit\'s End',
        'Guardian Angel',
        'Immortal Shieldbow',
        'Trinity Force',
        'Maw of Malmortius'
      ],
      runes: [
        'Press the Attack',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Sudden Impact',
        'Treasure Hunter'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Domination',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Kled': {
    roles: ['top'],
    build: {
      items: [
        'Titanic Hydra',
        'Plated Steelcaps',
        'Hullbreaker',
        'Overlord\'s Bloodmail',
        'Sterak\'s Gage',
        'Black Cleaver'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Randuin\'s Omen',
        'Sundered Sky',
        'Jak\'Sho, The Protean',
        'Serpent\'s Fang',
        'Death\'s Dance'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Demolish',
        'Bone Plating'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'LeBlanc': {
    roles: ['mid'],
    build: {
      items: [
        'Luden\'s Companion',
        'Sorcerer\'s Shoes',
        'Shadowflame',
        'Rabadon\'s Deathcap',
        'Zhonya\'s Hourglass',
        'Void Staff'
      ],
      situationalItems: [
        'Banshee\'s Veil',
        'Stormsurge',
        'Horizon Focus',
        'Cryptbloom',
        'Morellonomicon',
        'Malignance'
      ],
      runes: [
        'Electrocute',
        'Sudden Impact',
        'Grisly Mementos',
        'Relentless Hunter',
        'Transcendence',
        'Gathering Storm'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Lee Sin': {
    roles: ['jungle'],
    build: {
      items: [
        'Eclipse',
        'Plated Steelcaps',
        'Sundered Sky',
        'Black Cleaver',
        'Death\'s Dance',
        'Guardian Angel'
      ],
      situationalItems: [
        'Sterak\'s Gage',
        'Maw of Malmortius',
        'Serpent\'s Fang',
        'Profane Hydra',
        'Spirit Visage',
        'Chempunk Chainsword'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Lillia': {
    roles: ['jungle'],
    build: {
      items: [
        'Liandry\'s Torment',
        'Sorcerer\'s Shoes',
        'Riftmaker',
        'Zhonya\'s Hourglass',
        'Rylai\'s Crystal Scepter',
        'Rabadon\'s Deathcap'
      ],
      situationalItems: [
        'Cosmic Drive',
        'Bloodletter\'s Curse',
        'Morellonomicon',
        'Banshee\'s Veil',
        'Jak\'Sho, The Protean',
        'Blackfire Torch'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Haste',
        'Coup de Grace',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Lux': {
    roles: ['support', 'mid'],
    build: {
      items: [
        'Zaz\'Zak\'s Realmspike',
        'Sorcerer\'s Shoes',
        'Luden\'s Companion',
        'Stormsurge',
        'Shadowflame',
        'Rabadon\'s Deathcap'
      ],
      situationalItems: [
        'Zhonya\'s Hourglass',
        'Malignance',
        'Horizon Focus',
        'Morellonomicon',
        'Banshee\'s Veil',
        'Void Staff'
      ],
      runes: [
        'Arcane Comet',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Cheap Shot',
        'Ultimate Hunter'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Domination',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Malphite': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Sunfire Aegis',
        'Plated Steelcaps',
        'Thornmail',
        'Frozen Heart',
        'Jak\'Sho, The Protean',
        'Unending Despair'
      ],
      situationalItems: [
        'Kaenic Rookern',
        'Randuin\'s Omen',
        'Malignance',
        'Abyssal Mask',
        'Iceborn Gauntlet',
        'Force of Nature'
      ],
      runes: [
        'Arcane Comet',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Second Wind',
        'Overgrowth'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Malzahar': {
    roles: ['mid'],
    build: {
      items: [
        'Blackfire Torch',
        'Sorcerer\'s Shoes',
        'Liandry\'s Torment',
        'Rylai\'s Crystal Scepter',
        'Rabadon\'s Deathcap',
        'Zhonya\'s Hourglass'
      ],
      situationalItems: [
        'Shadowflame',
        'Void Staff',
        'Morellonomicon',
        'Malignance',
        'Bloodletter\'s Curse',
        'Archangel\'s Staff'
      ],
      runes: [
        'Arcane Comet',
        'Manaflow Band',
        'Transcendence',
        'Gathering Storm',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Maokai': {
    roles: ['top', 'support'],
    build: {
      items: [
        'Solstice Sleigh',
        'Boots of Swiftness',
        'Trailblazer',
        'Locket of the Iron Solari',
        'Redemption',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Thornmail',
        'Unending Despair',
        'Knight\'s Vow',
        'Spirit Visage',
        'Abyssal Mask',
        'Frozen Heart'
      ],
      runes: [
        'Aftershock',
        'Font of Life',
        'Bone Plating',
        'Unflinching',
        'Biscuit Delivery',
        'Cosmic Insight'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Master Yi': {
    roles: ['jungle'],
    build: {
      items: [
        'Kraken Slayer',
        'Berserker\'s Greaves',
        'Guinsoo\'s Rageblade',
        'Experimental Hexplate',
        'Death\'s Dance',
        'Wit\'s End'
      ],
      situationalItems: [
        'Blade of The Ruined King',
        'Titanic Hydra',
        'Guardian Angel',
        'Terminus',
        'Randuin\'s Omen',
        'Hullbreaker'
      ],
      runes: [
        'Lethal Tempo',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Milio': {
    roles: ['support'],
    build: {
      items: [
        'Dream Maker',
        'Ionian Boots of Lucidity',
        'Echoes of Helia',
        'Moonstone Renewer',
        'Redemption',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Ardent Censer',
        'Shurelya\'s Battlesong',
        'Dawncore',
        'Mikael\'s Blessing',
        'Staff of Flowing Water',
        'Locket of the Iron Solari'
      ],
      runes: [
        'Summon Aery',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Bone Plating',
        'Revitalize'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Ability Haste',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Miss Fortune': {
    roles: ['adc'],
    build: {
      items: [
        'Bloodthirster',
        'Boots of Swiftness',
        'The Collector',
        'Infinity Edge',
        'Lord Dominik\'s Regards',
        'Guardian Angel'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Rapid Firecannon',
        'Edge of Night',
        'Immortal Shieldbow',
        'Youmuu\'s Ghostblade',
        'Serpent\'s Fang'
      ],
      runes: [
        'Press the Attack',
        'Presence of Mind',
        'Legend: Bloodline',
        'Coup de Grace',
        'Magical Footwear',
        'Biscuit Delivery'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier']
    }
  },
  'Mordekaiser': {
    roles: ['top'],
    build: {
      items: [
        'Rylai\'s Crystal Scepter',
        'Plated Steelcaps',
        'Riftmaker',
        'Liandry\'s Torment',
        'Spirit Visage',
        'Thornmail'
      ],
      situationalItems: [
        'Experimental Hexplate',
        'Zhonya\'s Hourglass',
        'Jak\'Sho, The Protean',
        'Hextech Rocketbelt',
        'Randuin\'s Omen',
        'Bloodletter\'s Curse'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Haste',
        'Last Stand',
        'Bone Plating',
        'Revitalize'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Morgana': {
    roles: ['support', 'jungle'],
    build: {
      items: [
        'Zaz\'Zak\'s Realmspike',
        'Ionian Boots of Lucidity',
        'Liandry\'s Torment',
        'Zhonya\'s Hourglass',
        'Redemption',
        'Morellonomicon'
      ],
      situationalItems: [
        'Rylai\'s Crystal Scepter',
        'Blackfire Torch',
        'Horizon Focus',
        'Imperial Mandate',
        'Mikael\'s Blessing',
        'Cryptbloom'
      ],
      runes: [
        'Arcane Comet',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Cheap Shot',
        'Ultimate Hunter'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Domination',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Naafiri': {
    roles: ['jungle', 'mid'],
    build: {
      items: [
        'Eclipse',
        'Ionian Boots of Lucidity',
        'Black Cleaver',
        'Spear of Shojin',
        'Death\'s Dance',
        'Guardian Angel'
      ],
      situationalItems: [
        'Edge of Night',
        'Serpent\'s Fang',
        'Maw of Malmortius',
        'Chempunk Chainsword',
        'Profane Hydra',
        'Axiom Arc'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Nami': {
    roles: ['support'],
    build: {
      items: [
        'Dream Maker',
        'Ionian Boots of Lucidity',
        'Imperial Mandate',
        'Moonstone Renewer',
        'Redemption',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Ardent Censer',
        'Shurelya\'s Battlesong',
        'Mikael\'s Blessing',
        'Staff of Flowing Water',
        'Echoes of Helia',
        'Morellonomicon'
      ],
      runes: [
        'Summon Aery',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Bone Plating',
        'Revitalize'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Nasus': {
    roles: ['top'],
    build: {
      items: [
        'Trinity Force',
        'Ionian Boots of Lucidity',
        'Frozen Heart',
        'Spirit Visage',
        'Thornmail',
        'Jak\'Sho, The Protean'
      ],
      situationalItems: [
        'Sundered Sky',
        'Force of Nature',
        'Dead Man\'s Plate',
        'Randuin\'s Omen',
        'Sterak\'s Gage',
        'Kaenic Rookern'
      ],
      runes: [
        'Fleet Footwork',
        'Triumph',
        'Legend: Haste',
        'Last Stand',
        'Second Wind',
        'Unflinching'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Ability Haste',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Nautilus': {
    roles: ['support'],
    build: {
      items: [
        'Celestial Opposition',
        'Plated Steelcaps',
        'Locket of the Iron Solari',
        'Redemption',
        'Knight\'s Vow',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Thornmail',
        'Kaenic Rookern',
        'Frozen Heart',
        'Zeke\'s Convergence',
        'Abyssal Mask',
        'Randuin\'s Omen'
      ],
      runes: [
        'Aftershock',
        'Shield Bash',
        'Bone Plating',
        'Unflinching',
        'Biscuit Delivery',
        'Cosmic Insight'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Ability Haste',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Neeko': {
    roles: ['support', 'mid'],
    build: {
      items: [
        'Celestial Opposition',
        'Ionian Boots of Lucidity',
        'Hextech Rocketbelt',
        'Zhonya\'s Hourglass',
        'Morellonomicon',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Frozen Heart',
        'Redemption',
        'Stormsurge',
        'Abyssal Mask',
        'Shadowflame',
        'Banshee\'s Veil'
      ],
      runes: [
        'Arcane Comet',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Biscuit Delivery',
        'Cosmic Insight'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Nidalee': {
    roles: ['jungle', 'support'],
    build: {
      items: [
        'Lich Bane',
        'Sorcerer\'s Shoes',
        'Shadowflame',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Banshee\'s Veil',
        'Stormsurge',
        'Hextech Rocketbelt',
        'Cryptbloom',
        'Horizon Focus',
        'Liandry\'s Torment'
      ],
      runes: [
        'Dark Harvest',
        'Sudden Impact',
        'Grisly Mementos',
        'Treasure Hunter',
        'Transcendence',
        'Waterwalking'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Nocturne': {
    roles: ['jungle'],
    build: {
      items: [
        'Stridebreaker',
        'Plated Steelcaps',
        'Experimental Hexplate',
        'Black Cleaver',
        'Death\'s Dance',
        'Guardian Angel'
      ],
      situationalItems: [
        'Sterak\'s Gage',
        'Axiom Arc',
        'Maw of Malmortius',
        'Eclipse',
        'Serpent\'s Fang',
        'Chempunk Chainsword'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Grisly Mementos',
        'Ultimate Hunter'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Domination',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Nunu': {
    roles: ['jungle'],
    build: {
      items: [
        'Liandry\'s Torment',
        'Plated Steelcaps',
        'Frozen Heart',
        'Kaenic Rookern',
        'Thornmail',
        'Spirit Visage'
      ],
      situationalItems: [
        'Jak\'Sho, The Protean',
        'Abyssal Mask',
        'Randuin\'s Omen',
        'Dead Man\'s Plate',
        'Sunfire Aegis',
        'Knight\'s Vow'
      ],
      runes: [
        'Phase Rush',
        'Nimbus Cloak',
        'Celerity',
        'Waterwalking',
        'Triumph',
        'Legend: Haste'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Precision',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Olaf': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Stridebreaker',
        'Plated Steelcaps',
        'Sundered Sky',
        'Death\'s Dance',
        'Experimental Hexplate',
        'Sterak\'s Gage'
      ],
      situationalItems: [
        'Maw of Malmortius',
        'Overlord\'s Bloodmail',
        'Spirit Visage',
        'Randuin\'s Omen',
        'Force of Nature',
        'Thornmail'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Biscuit Delivery',
        'Approach Velocity'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Pantheon': {
    roles: ['top', 'jungle', 'support'],
    build: {
      items: [
        'Bloodsong',
        'Symbiotic Soles',
        'Umbral Glaive',
        'Eclipse',
        'Black Cleaver',
        'Sundered Sky'
      ],
      situationalItems: [
        'Youmuu\'s Ghostblade',
        'Serpent\'s Fang',
        'Edge of Night',
        'Chempunk Chainsword',
        'Blade of The Ruined King',
        'Maw of Malmortius'
      ],
      runes: [
        'Press the Attack',
        'Triumph',
        'Legend: Haste',
        'Coup de Grace',
        'Cheap Shot',
        'Relentless Hunter'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Domination',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Poppy': {
    roles: ['top', 'jungle', 'support'],
    build: {
      items: [
        'Celestial Opposition',
        'Boots of Swiftness',
        'Dead Man\'s Plate',
        'Redemption',
        'Locket of the Iron Solari',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Thornmail',
        'Force of Nature',
        'Sundered Sky',
        'Knight\'s Vow',
        'Frozen Heart',
        'Randuin\'s Omen'
      ],
      runes: [
        'Aftershock',
        'Font of Life',
        'Bone Plating',
        'Unflinching',
        'Hextech Flashtraption',
        'Cosmic Insight'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Pyke': {
    roles: ['support'],
    build: {
      items: [
        'Celestial Opposition',
        'Symbiotic Soles',
        'Umbral Glaive',
        'Edge of Night',
        'Youmuu\'s Ghostblade',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Axiom Arc',
        'Opportunity',
        'Voltaic Cyclosword',
        'Maw of Malmortius',
        'Serpent\'s Fang',
        'Guardian Angel'
      ],
      runes: [
        'Hail of Blades',
        'Cheap Shot',
        'Sixth Sense',
        'Ultimate Hunter',
        'Bone Plating',
        'Unflinching'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Resolve',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Qiyana': {
    roles: ['jungle', 'mid'],
    build: {
      items: [
        'Profane Hydra',
        'Ionian Boots of Lucidity',
        'Axiom Arc',
        'Serylda\'s Grudge',
        'Edge of Night',
        'Guardian Angel'
      ],
      situationalItems: [
        'Serpent\'s Fang',
        'Opportunity',
        'Youmuu\'s Ghostblade',
        'Umbral Glaive',
        'Maw of Malmortius',
        'Death\'s Dance'
      ],
      runes: [
        'Magical Footwear',
        'Triple Tonic',
        'Cosmic Insight',
        'Sudden Impact',
        'Ultimate Hunter'
      ],
      primaryTree: 'Inspiration',
      secondaryTree: 'Domination',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Quinn': {
    roles: ['top'],
    build: {
      items: [
        'Profane Hydra',
        'Symbiotic Soles',
        'Edge of Night',
        'The Collector',
        'Lord Dominik\'s Regards',
        'Infinity Edge'
      ],
      situationalItems: [
        'Mortal Reminder',
        'Serpent\'s Fang',
        'Guardian Angel',
        'Immortal Shieldbow',
        'Opportunity',
        'Youmuu\'s Ghostblade'
      ],
      runes: [
        'Electrocute',
        'Sudden Impact',
        'Grisly Mementos',
        'Treasure Hunter',
        'Absolute Focus',
        'Gathering Storm'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Rakan': {
    roles: ['support'],
    build: {
      items: [
        'Celestial Opposition',
        'Ionian Boots of Lucidity',
        'Redemption',
        'Locket of the Iron Solari',
        'Zeke\'s Convergence',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Knight\'s Vow',
        'Shurelya\'s Battlesong',
        'Mikael\'s Blessing',
        'Thornmail',
        'Frozen Heart',
        'Abyssal Mask'
      ],
      runes: [
        'Guardian',
        'Font of Life',
        'Bone Plating',
        'Unflinching',
        'Sixth Sense',
        'Ultimate Hunter'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Domination',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Rammus': {
    roles: ['jungle', 'support'],
    build: {
      items: [
        'Thornmail',
        'Plated Steelcaps',
        'Sunfire Aegis',
        'Jak\'Sho, The Protean',
        'Unending Despair',
        'Randuin\'s Omen'
      ],
      situationalItems: [
        'Dead Man\'s Plate',
        'Kaenic Rookern',
        'Force of Nature',
        'Frozen Heart',
        'Abyssal Mask',
        'Hollow Radiance'
      ],
      runes: [
        'Aftershock',
        'Font of Life',
        'Conditioning',
        'Unflinching',
        'Triumph',
        'Legend: Alacrity'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Precision',
      statShards: [
        'Attack Speed',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Rek\'Sai': {
    roles: ['jungle'],
    build: {
      items: [
        'Stridebreaker',
        'Plated Steelcaps',
        'Spear of Shojin',
        'Sterak\'s Gage',
        'Death\'s Dance',
        'Guardian Angel'
      ],
      situationalItems: [
        'Black Cleaver',
        'Maw of Malmortius',
        'Spirit Visage',
        'Serpent\'s Fang',
        'Sundered Sky',
        'Randuin\'s Omen'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Rell': {
    roles: ['support'],
    build: {
      items: [
        'Celestial Opposition',
        'Plated Steelcaps',
        'Locket of the Iron Solari',
        'Redemption',
        'Zeke\'s Convergence',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Thornmail',
        'Knight\'s Vow',
        'Kaenic Rookern',
        'Frozen Heart',
        'Abyssal Mask',
        'Randuin\'s Omen'
      ],
      runes: [
        'Aftershock',
        'Shield Bash',
        'Bone Plating',
        'Unflinching',
        'Hextech Flashtraption',
        'Cosmic Insight'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Ability Haste',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Renata Glasc': {
    roles: ['support'],
    build: {
      items: [
        'Celestial Opposition',
        'Ionian Boots of Lucidity',
        'Redemption',
        'Locket of the Iron Solari',
        'Shurelya\'s Battlesong',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Imperial Mandate',
        'Mikael\'s Blessing',
        'Knight\'s Vow',
        'Ardent Censer',
        'Morellonomicon',
        'Frozen Heart'
      ],
      runes: [
        'Guardian',
        'Shield Bash',
        'Bone Plating',
        'Unflinching',
        'Sixth Sense',
        'Relentless Hunter'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Domination',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Rengar': {
    roles: ['jungle', 'top'],
    build: {
      items: [
        'Youmuu\'s Ghostblade',
        'Ionian Boots of Lucidity',
        'Profane Hydra',
        'Edge of Night',
        'Lord Dominik\'s Regards',
        'Infinity Edge'
      ],
      situationalItems: [
        'Serpent\'s Fang',
        'Opportunity',
        'Mortal Reminder',
        'Axiom Arc',
        'Serylda\'s Grudge',
        'Guardian Angel'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Sudden Impact',
        'Ultimate Hunter'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Domination',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Riven': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Eclipse',
        'Ionian Boots of Lucidity',
        'Sundered Sky',
        'Death\'s Dance',
        'Serylda\'s Grudge',
        'Maw of Malmortius'
      ],
      situationalItems: [
        'Black Cleaver',
        'Profane Hydra',
        'Guardian Angel',
        'Serpent\'s Fang',
        'Mortal Reminder',
        'Ravenous Hydra'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Haste',
        'Last Stand',
        'Biscuit Delivery',
        'Jack Of All Trades'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Ability Haste',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Rumble': {
    roles: ['top', 'mid'],
    build: {
      items: [
        'Liandry\'s Torment',
        'Sorcerer\'s Shoes',
        'Bloodletter\'s Curse',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Morellonomicon'
      ],
      situationalItems: [
        'Riftmaker',
        'Shadowflame',
        'Rylai\'s Crystal Scepter',
        'Hextech Rocketbelt',
        'Banshee\'s Veil',
        'Horizon Focus'
      ],
      runes: [
        'Arcane Comet',
        'Nimbus Cloak',
        'Absolute Focus',
        'Scorch',
        'Bone Plating',
        'Unflinching'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Ryze': {
    roles: ['mid', 'top'],
    build: {
      items: [
        'Rod of Ages',
        'Mercury\'s Treads',
        'Archangel\'s Staff',
        'Rabadon\'s Deathcap',
        'Zhonya\'s Hourglass',
        'Void Staff'
      ],
      situationalItems: [
        'Frozen Heart',
        'Cosmic Drive',
        'Banshee\'s Veil',
        'Cryptbloom',
        'Morellonomicon',
        'Shadowflame'
      ],
      runes: [
        'Phase Rush',
        'Manaflow Band',
        'Transcendence',
        'Gathering Storm',
        'Bone Plating',
        'Overgrowth'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Seraphine': {
    roles: ['support', 'mid', 'adc'],
    build: {
      items: [
        'Dream Maker',
        'Ionian Boots of Lucidity',
        'Redemption',
        'Moonstone Renewer',
        'Dawncore',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Mikael\'s Blessing',
        'Rylai\'s Crystal Scepter',
        'Echoes of Helia',
        'Ardent Censer',
        'Locket of the Iron Solari',
        'Morellonomicon'
      ],
      runes: [
        'Summon Aery',
        'Manaflow Band',
        'Transcendence',
        'Gathering Storm',
        'Font of Life',
        'Revitalize'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Ability Haste',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Sett': {
    roles: ['top'],
    build: {
      items: [
        'Stridebreaker',
        'Plated Steelcaps',
        'Overlord\'s Bloodmail',
        'Sterak\'s Gage',
        'Spear of Shojin',
        'Warmog\'s Armor'
      ],
      situationalItems: [
        'Black Cleaver',
        'Hullbreaker',
        'Thornmail',
        'Force of Nature',
        'Chempunk Chainsword',
        'Dead Man\'s Plate'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Second Wind',
        'Unflinching'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Shaco': {
    roles: ['jungle', 'support'],
    build: {
      items: [
        'Youmuu\'s Ghostblade',
        'Berserker\'s Greaves',
        'The Collector',
        'Infinity Edge',
        'Lord Dominik\'s Regards',
        'Voltaic Cyclosword'
      ],
      situationalItems: [
        'Serpent\'s Fang',
        'Mortal Reminder',
        'Guardian Angel',
        'Edge of Night',
        'Profane Hydra',
        'Immortal Shieldbow'
      ],
      runes: [
        'Hail of Blades',
        'Sudden Impact',
        'Grisly Mementos',
        'Relentless Hunter',
        'Legend: Alacrity',
        'Coup de Grace'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Precision',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Shen': {
    roles: ['top', 'support'],
    build: {
      items: [
        'Titanic Hydra',
        'Plated Steelcaps',
        'Heartsteel',
        'Unending Despair',
        'Thornmail',
        'Randuin\'s Omen'
      ],
      situationalItems: [
        'Kaenic Rookern',
        'Hollow Radiance',
        'Dead Man\'s Plate',
        'Sunfire Aegis',
        'Spirit Visage',
        'Jak\'Sho, The Protean'
      ],
      runes: [
        'Grasp of the Undying',
        'Shield Bash',
        'Second Wind',
        'Overgrowth',
        'Biscuit Delivery',
        'Approach Velocity'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Shyvana': {
    roles: ['jungle'],
    build: {
      items: [
        'Spear of Shojin',
        'Sorcerer\'s Shoes',
        'Liandry\'s Torment',
        'Riftmaker',
        'Rabadon\'s Deathcap',
        'Zhonya\'s Hourglass'
      ],
      situationalItems: [
        'Horizon Focus',
        'Zeke\'s Convergence',
        'Shadowflame',
        'Navori Flickerblade',
        'Bloodletter\'s Curse',
        'Morellonomicon'
      ],
      runes: [
        'Fleet Footwork',
        'Triumph',
        'Legend: Haste',
        'Cut Down',
        'Magical Footwear',
        'Jack Of All Trades'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Singed': {
    roles: ['top'],
    build: {
      items: [
        'Liandry\'s Torment',
        'Boots of Swiftness',
        'Rylai\'s Crystal Scepter',
        'Dead Man\'s Plate',
        'Jak\'Sho, The Protean',
        'Bloodletter\'s Curse'
      ],
      situationalItems: [
        'Riftmaker',
        'Force of Nature',
        'Zhonya\'s Hourglass',
        'Randuin\'s Omen',
        'Rabadon\'s Deathcap',
        'Frozen Heart'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Nimbus Cloak',
        'Celerity'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Sorcery',
      statShards: [
        'Adaptive Force',
        'Move Speed',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Sion': {
    roles: ['top'],
    build: {
      items: [
        'Sunfire Aegis',
        'Plated Steelcaps',
        'Unending Despair',
        'Thornmail',
        'Jak\'Sho, The Protean',
        'Overlord\'s Bloodmail'
      ],
      situationalItems: [
        'Titanic Hydra',
        'Randuin\'s Omen',
        'Kaenic Rookern',
        'Spirit Visage',
        'Frozen Heart',
        'Heartsteel'
      ],
      runes: [
        'Grasp of the Undying',
        'Demolish',
        'Conditioning',
        'Overgrowth',
        'Cash Back',
        'Approach Velocity'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Skarner': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Heartsteel',
        'Plated Steelcaps',
        'Unending Despair',
        'Thornmail',
        'Jak\'Sho, The Protean',
        'Randuin\'s Omen'
      ],
      situationalItems: [
        'Spirit Visage',
        'Sterak\'s Gage',
        'Sunfire Aegis',
        'Kaenic Rookern',
        'Titanic Hydra',
        'Frozen Heart'
      ],
      runes: [
        'Grasp of the Undying',
        'Shield Bash',
        'Conditioning',
        'Overgrowth',
        'Magical Footwear',
        'Approach Velocity'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Ability Haste',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Sona': {
    roles: ['support'],
    build: {
      items: [
        'Bloodsong',
        'Boots of Swiftness',
        'Echoes of Helia',
        'Moonstone Renewer',
        'Dawncore',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Archangel\'s Staff',
        'Redemption',
        'Staff of Flowing Water',
        'Ardent Censer',
        'Mikael\'s Blessing',
        'Shurelya\'s Battlesong'
      ],
      runes: [
        'Summon Aery',
        'Manaflow Band',
        'Celerity',
        'Gathering Storm',
        'Presence of Mind',
        'Legend: Haste'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Precision',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Soraka': {
    roles: ['support'],
    build: {
      items: [
        'Dream Maker',
        'Ionian Boots of Lucidity',
        'Moonstone Renewer',
        'Redemption',
        'Dawncore',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Ardent Censer',
        'Mikael\'s Blessing',
        'Warmog\'s Armor',
        'Locket of the Iron Solari',
        'Shurelya\'s Battlesong',
        'Staff of Flowing Water'
      ],
      runes: [
        'Summon Aery',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Bone Plating',
        'Revitalize'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Swain': {
    roles: ['top', 'adc', 'support'],
    build: {
      items: [
        'Zaz\'Zak\'s Realmspike',
        'Sorcerer\'s Shoes',
        'Rylai\'s Crystal Scepter',
        'Liandry\'s Torment',
        'Zhonya\'s Hourglass',
        'Unending Despair'
      ],
      situationalItems: [
        'Malignance',
        'Spirit Visage',
        'Winter\'s Approach',
        'Morellonomicon',
        'Frozen Heart',
        'Jak\'Sho, The Protean'
      ],
      runes: [
        'Electrocute',
        'Cheap Shot',
        'Grisly Mementos',
        'Ultimate Hunter',
        'Presence of Mind',
        'Coup de Grace'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Precision',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Sylas': {
    roles: ['jungle', 'mid'],
    build: {
      items: [
        'Hextech Rocketbelt',
        'Sorcerer\'s Shoes',
        'Riftmaker',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Shadowflame',
        'Cosmic Drive',
        'Bloodletter\'s Curse',
        'Banshee\'s Veil',
        'Morellonomicon',
        'Cryptbloom'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Haste',
        'Last Stand',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Syndra': {
    roles: ['mid'],
    build: {
      items: [
        'Blackfire Torch',
        'Sorcerer\'s Shoes',
        'Cosmic Drive',
        'Rabadon\'s Deathcap',
        'Zhonya\'s Hourglass',
        'Void Staff'
      ],
      situationalItems: [
        'Cryptbloom',
        'Shadowflame',
        'Banshee\'s Veil',
        'Stormsurge',
        'Morellonomicon',
        'Horizon Focus'
      ],
      runes: [
        'Magical Footwear',
        'Biscuit Delivery',
        'Cosmic Insight',
        'Manaflow Band',
        'Transcendence'
      ],
      primaryTree: 'Inspiration',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Tahm Kench': {
    roles: ['top', 'support'],
    build: {
      items: [
        'Solstice Sleigh',
        'Plated Steelcaps',
        'Heartsteel',
        'Unending Despair',
        'Thornmail',
        'Spirit Visage'
      ],
      situationalItems: [
        'Locket of the Iron Solari',
        'Warmog\'s Armor',
        'Randuin\'s Omen',
        'Sunfire Aegis',
        'Riftmaker',
        'Frozen Heart'
      ],
      runes: [
        'Grasp of the Undying',
        'Shield Bash',
        'Second Wind',
        'Unflinching',
        'Triumph',
        'Legend: Alacrity'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Precision',
      statShards: [
        'Attack Speed',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Taliyah': {
    roles: ['jungle', 'mid'],
    build: {
      items: [
        'Archangel\'s Staff',
        'Ionian Boots of Lucidity',
        'Rylai\'s Crystal Scepter',
        'Liandry\'s Torment',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap'
      ],
      situationalItems: [
        'Cryptbloom',
        'Void Staff',
        'Shadowflame',
        'Morellonomicon',
        'Banshee\'s Veil',
        'Horizon Focus'
      ],
      runes: [
        'Phase Rush',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Presence of Mind',
        'Legend: Haste'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Precision',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Talon': {
    roles: ['jungle', 'mid'],
    build: {
      items: [
        'Youmuu\'s Ghostblade',
        'Ionian Boots of Lucidity',
        'Axiom Arc',
        'Opportunity',
        'Serylda\'s Grudge',
        'Edge of Night'
      ],
      situationalItems: [
        'Serpent\'s Fang',
        'Death\'s Dance',
        'Black Cleaver',
        'Guardian Angel',
        'Mortal Reminder',
        'Maw of Malmortius'
      ],
      runes: [
        'Fleet Footwork',
        'Triumph',
        'Legend: Haste',
        'Coup de Grace',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Taric': {
    roles: ['support'],
    build: {
      items: [
        'Dream Maker',
        'Ionian Boots of Lucidity',
        'Locket of the Iron Solari',
        'Winter\'s Approach',
        'Redemption',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Knight\'s Vow',
        'Frozen Heart',
        'Thornmail',
        'Spirit Visage',
        'Mikael\'s Blessing',
        'Kaenic Rookern'
      ],
      runes: [
        'Magical Footwear',
        'Biscuit Delivery',
        'Cosmic Insight',
        'Conditioning',
        'Revitalize'
      ],
      primaryTree: 'Inspiration',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Health Scaling',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Teemo': {
    roles: ['top', 'jungle', 'support'],
    build: {
      items: [
        'Nashor\'s Tooth',
        'Sorcerer\'s Shoes',
        'Liandry\'s Torment',
        'Malignance',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Shadowflame',
        'Morellonomicon',
        'Zhonya\'s Hourglass',
        'Bloodletter\'s Curse',
        'Blackfire Torch',
        'Banshee\'s Veil'
      ],
      runes: [
        'Press the Attack',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Bone Plating',
        'Overgrowth'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Thresh': {
    roles: ['support'],
    build: {
      items: [
        'Celestial Opposition',
        'Boots of Swiftness',
        'Locket of the Iron Solari',
        'Redemption',
        'Knight\'s Vow',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Zeke\'s Convergence',
        'Frozen Heart',
        'Thornmail',
        'Mikael\'s Blessing',
        'Kaenic Rookern',
        'Abyssal Mask'
      ],
      runes: [
        'Aftershock',
        'Font of Life',
        'Bone Plating',
        'Unflinching',
        'Biscuit Delivery',
        'Cosmic Insight'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  },
  'Trundle': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Trinity Force',
        'Plated Steelcaps',
        'Dead Man\'s Plate',
        'Spirit Visage',
        'Thornmail',
        'Blade of The Ruined King'
      ],
      situationalItems: [
        'Titanic Hydra',
        'Randuin\'s Omen',
        'Frozen Heart',
        'Wit\'s End',
        'Force of Nature',
        'Sterak\'s Gage'
      ],
      runes: [
        'Press the Attack',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Magical Footwear',
        'Approach Velocity'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Tryndamere': {
    roles: ['top'],
    build: {
      items: [
        'Profane Hydra',
        'Ionian Boots of Lucidity',
        'Lord Dominik\'s Regards',
        'Infinity Edge',
        'Voltaic Cyclosword',
        'Mercurial Scimitar'
      ],
      situationalItems: [
        'Phantom Dancer',
        'Serpent\'s Fang',
        'Blade of The Ruined King',
        'Opportunity',
        'The Collector',
        'Navori Flickerblade'
      ],
      runes: [
        'Hail of Blades',
        'Sudden Impact',
        'Grisly Mementos',
        'Treasure Hunter',
        'Legend: Alacrity',
        'Last Stand'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Precision',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Twisted Fate': {
    roles: ['mid'],
    build: {
      items: [
        'Rod of Ages',
        'Boots of Swiftness',
        'Lich Bane',
        'Rapid Firecannon',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap'
      ],
      situationalItems: [
        'Banshee\'s Veil',
        'Morellonomicon',
        'Stormsurge',
        'Void Staff',
        'Cryptbloom',
        'Luden\'s Companion'
      ],
      runes: [
        'Cash Back',
        'Biscuit Delivery',
        'Jack Of All Trades',
        'Bone Plating',
        'Unflinching'
      ],
      primaryTree: 'Inspiration',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Move Speed',
        'Health'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Udyr': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Liandry\'s Torment',
        'Boots of Swiftness',
        'Dead Man\'s Plate',
        'Spirit Visage',
        'Jak\'Sho, The Protean',
        'Riftmaker'
      ],
      situationalItems: [
        'Unending Despair',
        'Randuin\'s Omen',
        'Force of Nature',
        'Kaenic Rookern',
        'Thornmail',
        'Frozen Heart'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Haste',
        'Last Stand',
        'Magical Footwear',
        'Approach Velocity'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Urgot': {
    roles: ['top'],
    build: {
      items: [
        'Black Cleaver',
        'Plated Steelcaps',
        'Sterak\'s Gage',
        'Jak\'Sho, The Protean',
        'Overlord\'s Bloodmail',
        'Thornmail'
      ],
      situationalItems: [
        'Dead Man\'s Plate',
        'Randuin\'s Omen',
        'Force of Nature',
        'Kaenic Rookern',
        'Hullbreaker',
        'Titanic Hydra'
      ],
      runes: [
        'Press the Attack',
        'Triumph',
        'Legend: Haste',
        'Last Stand',
        'Bone Plating',
        'Overgrowth'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Veigar': {
    roles: ['mid', 'adc'],
    build: {
      items: [
        'Rod of Ages',
        'Sorcerer\'s Shoes',
        'Archangel\'s Staff',
        'Rabadon\'s Deathcap',
        'Zhonya\'s Hourglass',
        'Void Staff'
      ],
      situationalItems: [
        'Cryptbloom',
        'Shadowflame',
        'Banshee\'s Veil',
        'Luden\'s Companion',
        'Stormsurge',
        'Morellonomicon'
      ],
      runes: [
        'Magical Footwear',
        'Biscuit Delivery',
        'Cosmic Insight',
        'Manaflow Band',
        'Transcendence'
      ],
      primaryTree: 'Inspiration',
      secondaryTree: 'Sorcery',
      statShards: [
        'Ability Haste',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Vel\'Koz': {
    roles: ['support', 'mid'],
    build: {
      items: [
        'Zaz\'Zak\'s Realmspike',
        'Sorcerer\'s Shoes',
        'Luden\'s Companion',
        'Horizon Focus',
        'Shadowflame',
        'Zhonya\'s Hourglass'
      ],
      situationalItems: [
        'Liandry\'s Torment',
        'Morellonomicon',
        'Banshee\'s Veil',
        'Rabadon\'s Deathcap',
        'Malignance',
        'Rylai\'s Crystal Scepter'
      ],
      runes: [
        'Arcane Comet',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Cheap Shot',
        'Ultimate Hunter'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Domination',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Viego': {
    roles: ['jungle'],
    build: {
      items: [
        'Kraken Slayer',
        'Plated Steelcaps',
        'The Collector',
        'Immortal Shieldbow',
        'Lord Dominik\'s Regards',
        'Guardian Angel'
      ],
      situationalItems: [
        'Infinity Edge',
        'Mortal Reminder',
        'Death\'s Dance',
        'Sundered Sky',
        'Maw of Malmortius',
        'Serpent\'s Fang'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Viktor': {
    roles: ['mid'],
    build: {
      items: [
        'Blackfire Torch',
        'Sorcerer\'s Shoes',
        'Liandry\'s Torment',
        'Zhonya\'s Hourglass',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Shadowflame',
        'Cryptbloom',
        'Morellonomicon',
        'Banshee\'s Veil',
        'Lich Bane',
        'Bloodletter\'s Curse'
      ],
      runes: [
        'Summon Aery',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Shield Bash',
        'Bone Plating'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Vladimir': {
    roles: ['top', 'mid'],
    build: {
      items: [
        'Horizon Focus',
        'Ionian Boots of Lucidity',
        'Rabadon\'s Deathcap',
        'Riftmaker',
        'Zhonya\'s Hourglass',
        'Void Staff'
      ],
      situationalItems: [
        'Shadowflame',
        'Stormsurge',
        'Cosmic Drive',
        'Cryptbloom',
        'Hextech Rocketbelt',
        'Banshee\'s Veil'
      ],
      runes: [
        'Phase Rush',
        'Nimbus Cloak',
        'Transcendence',
        'Gathering Storm',
        'Legend: Haste',
        'Last Stand'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Precision',
      statShards: [
        'Ability Haste',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Volibear': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Rod of Ages',
        'Ionian Boots of Lucidity',
        'Navori Flickerblade',
        'Spirit Visage',
        'Unending Despair',
        'Thornmail'
      ],
      situationalItems: [
        'Iceborn Gauntlet',
        'Riftmaker',
        'Cosmic Drive',
        'Nashor\'s Tooth',
        'Randuin\'s Omen',
        'Frozen Heart'
      ],
      runes: [
        'Lethal Tempo',
        'Triumph',
        'Legend: Haste',
        'Last Stand',
        'Demolish',
        'Revitalize'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Warwick': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Stridebreaker',
        'Mercury\'s Treads',
        'Blade of The Ruined King',
        'Thornmail',
        'Spirit Visage',
        'Jak\'Sho, The Protean'
      ],
      situationalItems: [
        'Sterak\'s Gage',
        'Death\'s Dance',
        'Randuin\'s Omen',
        'Wit\'s End',
        'Guardian Angel',
        'Dead Man\'s Plate'
      ],
      runes: [
        'Lethal Tempo',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Celerity',
        'Waterwalking'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Wukong': {
    roles: ['top', 'jungle'],
    build: {
      items: [
        'Trinity Force',
        'Plated Steelcaps',
        'Sundered Sky',
        'Black Cleaver',
        'Death\'s Dance',
        'Guardian Angel'
      ],
      situationalItems: [
        'Sterak\'s Gage',
        'Maw of Malmortius',
        'Profane Hydra',
        'Chempunk Chainsword',
        'Serpent\'s Fang',
        'Randuin\'s Omen'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Last Stand',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Xerath': {
    roles: ['support', 'mid'],
    build: {
      items: [
        'Luden\'s Companion',
        'Sorcerer\'s Shoes',
        'Horizon Focus',
        'Shadowflame',
        'Rabadon\'s Deathcap',
        'Void Staff'
      ],
      situationalItems: [
        'Zhonya\'s Hourglass',
        'Stormsurge',
        'Banshee\'s Veil',
        'Morellonomicon',
        'Rylai\'s Crystal Scepter',
        'Cryptbloom'
      ],
      runes: [
        'Arcane Comet',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Presence of Mind',
        'Coup de Grace'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Precision',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Xin Zhao': {
    roles: ['jungle'],
    build: {
      items: [
        'Sundered Sky',
        'Plated Steelcaps',
        'Black Cleaver',
        'Sterak\'s Gage',
        'Death\'s Dance',
        'Guardian Angel'
      ],
      situationalItems: [
        'Maw of Malmortius',
        'Titanic Hydra',
        'Spirit Visage',
        'Randuin\'s Omen',
        'Chempunk Chainsword',
        'Eclipse'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Alacrity',
        'Coup de Grace',
        'Magical Footwear',
        'Cosmic Insight'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Inspiration',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Yone': {
    roles: ['top', 'mid'],
    build: {
      items: [
        'Blade of The Ruined King',
        'Berserker\'s Greaves',
        'Immortal Shieldbow',
        'Infinity Edge',
        'Death\'s Dance',
        'Guardian Angel'
      ],
      situationalItems: [
        'Wit\'s End',
        'Mortal Reminder',
        'Jak\'Sho, The Protean',
        'Lord Dominik\'s Regards',
        'Bloodthirster',
        'Randuin\'s Omen'
      ],
      runes: [
        'Lethal Tempo',
        'Absorb Life',
        'Legend: Alacrity',
        'Last Stand',
        'Second Wind',
        'Overgrowth'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Yorick': {
    roles: ['top'],
    build: {
      items: [
        'Trinity Force',
        'Plated Steelcaps',
        'Spear of Shojin',
        'Serylda\'s Grudge',
        'Sterak\'s Gage',
        'Thornmail'
      ],
      situationalItems: [
        'Hullbreaker',
        'Black Cleaver',
        'Spirit Visage',
        'Randuin\'s Omen',
        'Jak\'Sho, The Protean',
        'Chempunk Chainsword'
      ],
      runes: [
        'Grasp of the Undying',
        'Demolish',
        'Bone Plating',
        'Overgrowth',
        'Presence of Mind',
        'Legend: Bloodline'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Precision',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Yuumi': {
    roles: ['support'],
    build: {
      items: [
        'Dream Maker',
        'Ionian Boots of Lucidity',
        'Moonstone Renewer',
        'Ardent Censer',
        'Mikael\'s Blessing',
        'Dawncore',
        'Redemption'
      ],
      situationalItems: [
        'Imperial Mandate',
        'Knight\'s Vow',
        'Staff of Flowing Water',
        'Shurelya\'s Battlesong',
        'Echoes of Helia',
        'Vigilant Wardstone'
      ],
      runes: [
        'Summon Aery',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Font of Life',
        'Revitalize'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Resolve',
      statShards: [
        'Ability Haste',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Zaahen': {
    roles: ['top'],
    build: {
      items: [
        'Trinity Force',
        'Plated Steelcaps',
        'Sundered Sky',
        'Sterak\'s Gage',
        'Death\'s Dance',
        'Overlord\'s Bloodmail'
      ],
      situationalItems: [
        'Titanic Hydra',
        'Maw of Malmortius',
        'Ravenous Hydra',
        'Spear of Shojin',
        'Stridebreaker',
        'Spirit Visage'
      ],
      runes: [
        'Conqueror',
        'Triumph',
        'Legend: Haste',
        'Coup de Grace',
        'Bone Plating',
        'Revitalize'
      ],
      primaryTree: 'Precision',
      secondaryTree: 'Resolve',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Zac': {
    roles: ['top', 'jungle', 'support'],
    build: {
      items: [
        'Sunfire Aegis',
        'Ionian Boots of Lucidity',
        'Spirit Visage',
        'Thornmail',
        'Unending Despair',
        'Randuin\'s Omen'
      ],
      situationalItems: [
        'Liandry\'s Torment',
        'Jak\'Sho, The Protean',
        'Abyssal Mask',
        'Hextech Rocketbelt',
        'Kaenic Rookern',
        'Riftmaker'
      ],
      runes: [
        'Aftershock',
        'Font of Life',
        'Conditioning',
        'Revitalize',
        'Triumph',
        'Legend: Haste'
      ],
      primaryTree: 'Resolve',
      secondaryTree: 'Precision',
      statShards: [
        'Ability Haste',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Smite']
    }
  },
  'Zed': {
    roles: ['mid', 'jungle'],
    build: {
      items: [
        'Eclipse',
        'Ionian Boots of Lucidity',
        'Voltaic Cyclosword',
        'Serylda\'s Grudge',
        'Edge of Night',
        'Axiom Arc'
      ],
      situationalItems: [
        'Serpent\'s Fang',
        'Spear of Shojin',
        'Youmuu\'s Ghostblade',
        'Black Cleaver',
        'Maw of Malmortius',
        'Guardian Angel'
      ],
      runes: [
        'Electrocute',
        'Taste of Blood',
        'Grisly Mementos',
        'Ultimate Hunter',
        'Transcendence',
        'Scorch'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Zilean': {
    roles: ['support'],
    build: {
      items: [
        'Solstice Sleigh',
        'Ionian Boots of Lucidity',
        'Shurelya\'s Battlesong',
        'Imperial Mandate',
        'Redemption',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Locket of the Iron Solari',
        'Archangel\'s Staff',
        'Cosmic Drive',
        'Morellonomicon',
        'Mikael\'s Blessing',
        'Trailblazer'
      ],
      runes: [
        'Summon Aery',
        'Manaflow Band',
        'Transcendence',
        'Waterwalking',
        'Cheap Shot',
        'Relentless Hunter'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Domination',
      statShards: [
        'Ability Haste',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Heal']
    }
  },
  'Zoe': {
    roles: ['mid', 'support'],
    build: {
      items: [
        'Luden\'s Companion',
        'Sorcerer\'s Shoes',
        'Shadowflame',
        'Rabadon\'s Deathcap',
        'Void Staff',
        'Zhonya\'s Hourglass'
      ],
      situationalItems: [
        'Horizon Focus',
        'Lich Bane',
        'Stormsurge',
        'Banshee\'s Veil',
        'Cryptbloom',
        'Morellonomicon'
      ],
      runes: [
        'Electrocute',
        'Sudden Impact',
        'Grisly Mementos',
        'Relentless Hunter',
        'Nimbus Cloak',
        'Transcendence'
      ],
      primaryTree: 'Domination',
      secondaryTree: 'Sorcery',
      statShards: [
        'Attack Speed',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Teleport']
    }
  },
  'Zyra': {
    roles: ['jungle', 'support'],
    build: {
      items: [
        'Zaz\'Zak\'s Realmspike',
        'Sorcerer\'s Shoes',
        'Liandry\'s Torment',
        'Rylai\'s Crystal Scepter',
        'Morellonomicon',
        'Vigilant Wardstone'
      ],
      situationalItems: [
        'Zhonya\'s Hourglass',
        'Blackfire Torch',
        'Shadowflame',
        'Malignance',
        'Bloodletter\'s Curse',
        'Void Staff'
      ],
      runes: [
        'Arcane Comet',
        'Manaflow Band',
        'Transcendence',
        'Scorch',
        'Taste of Blood',
        'Relentless Hunter'
      ],
      primaryTree: 'Sorcery',
      secondaryTree: 'Domination',
      statShards: [
        'Adaptive Force',
        'Adaptive Force',
        'Health Scaling'
      ],
      summoners: ['Flash', 'Ignite']
    }
  }
};

