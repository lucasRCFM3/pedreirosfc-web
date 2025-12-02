// Script para buscar build do Mobalytics
const https = require('https');

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Lista de todos os itens conhecidos do LoL (para extração mais robusta)
const ALL_ITEMS = [
  'Sunfire Aegis', 'Plated Steelcaps', 'Thornmail', 'Jak\'Sho, The Protean', 
  'Unending Despair', 'Frozen Heart', 'Heartsteel', 'Kaenic Rookern', 
  'Randuin\'s Omen', 'Warmog\'s Armor', 'Force of Nature', 'Winter\'s Approach',
  'Hollow Radiance', 'Berserker\'s Greaves', 'Infinity Edge', 'Runaan\'s Hurricane',
  'Lord Dominik\'s Regards', 'Bloodthirster', 'Blackfire Torch', 'Sorcerer\'s Shoes',
  'Horizon Focus', 'Zhonya\'s Hourglass', 'Rabadon\'s Deathcap', 'Void Staff',
  'Dream Maker', 'Ionian Boots of Lucidity', 'Ardent Censer', 'Moonstone Renewer',
  'Redemption', 'Vigilant Wardstone', 'Mikael\'s Blessing', 'Shurelya\'s Battlesong',
  'Chemtech Putrifier', 'Staff of Flowing Water', 'Locket of the Iron Solari',
  'Yun Tal Wildarrows', 'Guardian Angel', 'Immortal Shieldbow', 'Mortal Reminder',
  'Rapid Firecannon', 'Phantom Dancer', 'Rod of Ages', 'Seraph\'s Embrace',
  'Archangel\'s Staff', 'Liandry\'s Anguish'
];

async function getMobalyticsBuild(championName, role = 'top') {
  try {
    const html = await fetchHTML(`https://mobalytics.gg/lol/champions/${championName.toLowerCase()}/build`);
    
    const items = [];
    const situationalItems = [];
    
    // Procura pela seção "Full Build" da build "Most Popular"
    // Procura por padrões mais específicos no HTML
    const fullBuildMatch = html.match(/Full Build[\s\S]*?(@\s+\d+\s+min)/i);
    
    // Extrai itens da seção "Full Build"
    if (fullBuildMatch) {
      const fullBuildSection = fullBuildMatch[0];
      
      // Procura por todos os itens conhecidos na seção
      ALL_ITEMS.forEach(item => {
        // Escapa caracteres especiais para regex
        const escapedItem = item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedItem, 'gi');
        if (regex.test(fullBuildSection) && !items.includes(item)) {
          items.push(item);
        }
      });
    }
    
    // Procura por itens situacionais - procura pela seção específica
    const situationalMatch = html.match(/situational items[\s\S]*?(?=<h[23]|<\/section|<\/div>)/i);
    if (situationalMatch) {
      const situationalSection = situationalMatch[0];
      
      // Procura por todos os itens conhecidos na seção situacional
      ALL_ITEMS.forEach(item => {
        const escapedItem = item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedItem, 'gi');
        if (regex.test(situationalSection) && !items.includes(item) && !situationalItems.includes(item)) {
          situationalItems.push(item);
        }
      });
    }
    
    // Procura por runas - procura pela seção "runes"
    const runes = [];
    const runeSection = html.match(/runes[\s\S]*?Most Popular[\s\S]*?(?=<h[23]|<\/section|<\/div>)/i);
    if (runeSection) {
      const runeNames = [
        'Grasp of the Undying', 'Demolish', 'Bone Plating', 'Overgrowth',
        'Biscuit Delivery', 'Magical Footwear', 'Aftershock', 'Font of Life',
        'Conditioning', 'Revitalize', 'Unflinching', 'Second Wind',
        'Shield Bash', 'Hextech Flashtraption', 'Cash Back', 'Triple Tonic',
        'Time Warp Tonic', 'Cosmic Insight', 'Approach Velocity', 'Jack Of All Trades'
      ];
      
      runeNames.forEach(rune => {
        const escapedRune = rune.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedRune, 'gi');
        if (regex.test(runeSection[0]) && !runes.includes(rune)) {
          runes.push(rune);
        }
      });
    }
    
    // Procura por summoner spells
    const summoners = [];
    const spellSection = html.match(/spells[\s\S]*?(?=<h[23]|<\/section|<\/div>)/i);
    if (spellSection) {
      summoners.push('Flash');
      const spellText = spellSection[0];
      if (spellText.match(/Teleport/i)) {
        summoners.push('Teleport');
      } else if (spellText.match(/Barrier/i)) {
        summoners.push('Barrier');
      } else if (spellText.match(/Heal/i)) {
        summoners.push('Heal');
      } else if (spellText.match(/Ignite/i)) {
        summoners.push('Ignite');
      } else if (spellText.match(/Smite/i)) {
        summoners.push('Smite');
      }
    }
    
    console.log('Build encontrada:');
    console.log('Itens:', JSON.stringify(items, null, 2));
    console.log('Itens Situacionais:', JSON.stringify(situationalItems, null, 2));
    console.log('Runas:', JSON.stringify(runes, null, 2));
    console.log('Spells:', JSON.stringify(summoners, null, 2));
    
    return { items, situationalItems, runes, summoners };
  } catch (error) {
    console.error('Erro:', error.message);
    return null;
  }
}

const championName = process.argv[2] || 'Ornn';
getMobalyticsBuild(championName);

