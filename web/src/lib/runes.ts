// Função para obter a URL do ícone da runa
// Usa os IDs do Mobalytics que são compatíveis com o Data Dragon

const RUNE_ID_MAP: Record<string, number> = {
  // Resolve
  'Grasp of the Undying': 8437,
  'Aftershock': 8439,
  'Guardian': 8465,
  'Demolish': 8446,
  'Font of Life': 8463,
  'Shield Bash': 8401,
  'Conditioning': 8429,
  'Second Wind': 8444,
  'Bone Plating': 8473,
  'Overgrowth': 8451,
  'Revitalize': 8453,
  'Unflinching': 8242,
  
  // Inspiration
  'Hextech Flashtraption': 8306,
  'Magical Footwear': 8304,
  'Cash Back': 8321,
  'Triple Tonic': 8313,
  'Time Warp Tonic': 8352,
  'Biscuit Delivery': 8345,
  'Cosmic Insight': 8347,
  'Approach Velocity': 8410,
  'Jack Of All Trades': 8316,
  
  // Precision
  'Lethal Tempo': 8008,
  'Press the Attack': 8005,
  'Fleet Footwork': 8021,
  'Conqueror': 8010,
  'Presence of Mind': 8009,
  'Absorb Life': 9101,
  'Triumph': 9111,
  'Legend: Bloodline': 9103,
  'Legend: Alacrity': 9104,
  'Legend: Tenacity': 9105,
  'Legend: Haste': 9105,
  'Coup de Grace': 8014,
  'Cut Down': 8017,
  'Last Stand': 8299,
  
  // Domination
  'Electrocute': 8112,
  'Dark Harvest': 8128,
  'Predator': 8124,
  'Hail of Blades': 9923,
  'Cheap Shot': 8126,
  'Taste of Blood': 8139,
  'Sudden Impact': 8143,
  'Zombie Ward': 8136,
  'Ghost Poro': 8120,
  'Eyeball Collection': 8138,
  'Grisly Mementos': 8140,
  'Treasure Hunter': 8135,
  'Relentless Hunter': 8105,
  'Ultimate Hunter': 8106,
  'Ingenious Hunter': 8134,
  
  // Sorcery
  'Summon Aery': 8214,
  'Arcane Comet': 8229,
  'Phase Rush': 8230,
  'Manaflow Band': 8226,
  'Nimbus Cloak': 8275,
  'Transcendence': 8210,
  'Celerity': 8234,
  'Absolute Focus': 8233,
  'Scorch': 8237,
  'Waterwalking': 8232,
  'Gathering Storm': 8236,
};

// Stat Shards IDs
const STAT_SHARD_ID_MAP: Record<string, number> = {
  'Adaptive Force': 5008,
  'Attack Speed': 5005,
  'Ability Haste': 5007,
  'Armor': 5002,
  'Magic Resist': 5003,
  'Health Scaling': 5001,
  'Health': 5011,
  'Move Speed': 5010,
};

export function getRuneIconUrl(runeName: string, version: string): string | null {
  const runeId = RUNE_ID_MAP[runeName];
  if (!runeId) {
    console.warn(`Rune icon not found for: ${runeName}`);
    return null;
  }
  // Usa o CDN do Mobalytics que tem os ícones das runas
  return `https://cdn.mobalytics.gg/assets/lol/images/perks/${runeId}.png?v03`;
}

export function getStatShardIconUrl(statName: string, version: string): string | null {
  const statId = STAT_SHARD_ID_MAP[statName];
  if (!statId) {
    console.warn(`Stat shard icon not found for: ${statName}`);
    return null;
  }
  // Usa o CDN do Mobalytics que tem os ícones das stat shards
  return `https://cdn.mobalytics.gg/assets/lol/images/perks/${statId}.svg?v03`;
}

