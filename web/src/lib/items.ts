// Mapeamento de nomes de itens (português e inglês) para IDs do Data Dragon
// IDs baseados no Data Dragon patch 15.23.1
// Função para buscar IDs dinamicamente do Data Dragon

let itemCache: Record<string, number> | null = null;

async function fetchItemIds(version: string): Promise<Record<string, number>> {
  if (itemCache) return itemCache;
  
  try {
    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`, {
      next: { revalidate: 86400 } // Cache por 24 horas
    });
    const data = await res.json();
    
    const mapping: Record<string, number> = {};
    
    // Mapeia todos os itens pelo nome em inglês
    Object.entries(data.data).forEach(([id, item]: [string, any]) => {
      if (item.name) {
        mapping[item.name] = parseInt(id);
      }
    });
    
    itemCache = mapping;
    return mapping;
  } catch (error) {
    console.error('Error fetching items:', error);
    return {};
  }
}

// Mapeamento estático de fallback (nomes em português para inglês)
const PORTUGUESE_TO_ENGLISH: Record<string, string> = {
  // ADC
  'Flechas Selvagens de Yun Tal': 'Yun Tal Wildarrows',
  'Grevas do Berserker': 'Berserker\'s Greaves',
  'Gume do Infinito': 'Infinity Edge',
  'Furacão de Runaan': 'Runaan\'s Hurricane',
  'Lembranças do Lorde Dominik': 'Lord Dominik\'s Regards',
  'Sedenta por Sangue': 'Bloodthirster',
  'Anjo Guardião': 'Guardian Angel',
  'Arco-escudo Imortal': 'Immortal Shieldbow',
  'Lembrete Mortal': 'Mortal Reminder',
  'Canhão Fumegante': 'Rapid Firecannon',
  'Dançarina Fantasma': 'Phantom Dancer',
  
  // Mago
  'Bastão das Eras': 'Rod of Ages',
  'Cajado das Eras': 'Rod of Ages',
  'Sapatos do Feiticeiro': 'Sorcerer\'s Shoes',
  'Abraço de Seraph': 'Seraph\'s Embrace',
  'Cajado do Arcanjo': 'Archangel\'s Staff',
  'Tormento de Liandry': 'Liandry\'s Anguish',
  'Ampulheta de Zhonya': 'Zhonya\'s Hourglass',
  'Capuz da Morte de Rabadon': 'Rabadon\'s Deathcap',
  'Cajado do Vazio': 'Void Staff',
  'Tocha de Fogo Negro': 'Blackfire Torch',
  'Foco do Horizonte': 'Horizon Focus',
  
  // Tank
  'Égide de Fogo Solar': 'Sunfire Aegis',
  'Botas Galvanizadas de Aço': 'Plated Steelcaps',
  'Armadura de Espinhos': 'Thornmail',
  'Jak\'Sho, o Proteico': 'Jak\'Sho, The Protean',
  'Desespero Eterno': 'Unending Despair',
  'Coração Congelado': 'Frozen Heart',
  'Coração de Aço': 'Heartsteel',
  
  // Support
  'Criador de Sonhos': 'Dream Maker',
  'Botas Ionianas da Lucidez': 'Ionian Boots of Lucidity',
  'Turíbulo Ardente': 'Ardent Censer',
  'Renovador da Pedra Lunar': 'Moonstone Renewer',
  'Redenção': 'Redemption',
  'Vigia da Lua': 'Vigilant Wardstone',
  'Bênção de Mikael': 'Mikael\'s Blessing',
  'Canção de Batalha de Shurelya': 'Shurelya\'s Battlesong',
  'Putrificador Quimtec': 'Chemtech Putrifier',
  'Cajado das Águas Correntes': 'Staff of Flowing Water',
  'Medalhão dos Solari de Ferro': 'Locket of the Iron Solari',
  
  // Novos itens encontrados
  'Knight\'s Vow': 'Knight\'s Vow',
  'Shadowflame': 'Shadowflame',
  'Cryptbloom': 'Cryptbloom',
  'Banshee\'s Veil': 'Banshee\'s Veil',
  'Morellonomicon': 'Morellonomicon',
  'Liandry\'s Torment': 'Liandry\'s Torment',
  'Stormsurge': 'Stormsurge',
  'Mercurial Scimitar': 'Mercurial Scimitar',
  'Dawncore': 'Dawncore',
};

// Função para obter o ID do item pelo nome (português ou inglês)
export async function getItemId(itemName: string, version: string): Promise<number | null> {
  // Primeiro tenta buscar do Data Dragon
  const itemMap = await fetchItemIds(version);
  
  // Tenta encontrar pelo nome em inglês (se for português, converte primeiro)
  const englishName = PORTUGUESE_TO_ENGLISH[itemName] || itemName;
  
  // Busca no mapa do Data Dragon
  let itemId = itemMap[englishName];
  if (itemId) return itemId;
  
  // Tenta variações comuns
  const variations = [
    englishName,
    itemName,
    englishName.replace(/'/g, '\''), // Tenta com aspas diferentes
    englishName.replace(/'/g, ''),
  ];
  
  for (const variation of variations) {
    itemId = itemMap[variation];
    if (itemId) return itemId;
  }
  
  // Busca parcial (case-insensitive)
  const lowerName = englishName.toLowerCase();
  for (const [name, id] of Object.entries(itemMap)) {
    if (name.toLowerCase() === lowerName) {
      return id as number;
    }
  }
  
  return null;
}

// Função para obter a URL do ícone do item
export function getItemIconUrl(itemId: number, version: string): string {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`;
}

// Função para obter a URL do ícone do item pelo nome (async)
export async function getItemIconUrlByName(itemName: string, version: string): Promise<string | null> {
  const itemId = await getItemId(itemName, version);
  if (!itemId) return null;
  return getItemIconUrl(itemId, version);
}
