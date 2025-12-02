// Funções para buscar informações do Probuilds.net e Mobalytics

export async function getProbuildsRoles(championName: string): Promise<string[]> {
  try {
    const response = await fetch(`https://probuilds.net/champions/details/${championName}/`, {
      next: { revalidate: 86400 } // Cache por 24 horas
    });
    
    const html = await response.text();
    
    // Procura por links de roles no formato /champions/details/ChampionName/Role
    const roleLinks = html.match(/\/champions\/details\/[^/]+\/(Top|Jungle|Mid|ADC|Support)"/gi);
    
    const roles: string[] = [];
    if (roleLinks) {
      roleLinks.forEach(link => {
        const roleMatch = link.match(/\/(Top|Jungle|Mid|ADC|Support)"/i);
        if (roleMatch) {
          const role = roleMatch[1].toLowerCase();
          if (role === 'adc') {
            if (!roles.includes('adc')) roles.push('adc');
          } else if (!roles.includes(role)) {
            roles.push(role);
          }
        }
      });
    }
    
    return [...new Set(roles)];
  } catch (error) {
    console.error('Erro ao buscar roles do Probuilds:', error);
    return [];
  }
}

export interface MobalyticsBuild {
  items: string[];
  situationalItems: string[];
  runes: string[];
  primaryTree: string | null;
  secondaryTree: string | null;
  statShards: string[];
  summoners: string[];
}

// Lista de itens conhecidos para extração
const KNOWN_ITEMS = [
  'Sunfire Aegis', 'Plated Steelcaps', 'Thornmail', 
  'Jak\'Sho, The Protean', 'Unending Despair', 'Frozen Heart',
  'Heartsteel', 'Kaenic Rookern', 'Randuin\'s Omen', 
  'Warmog\'s Armor', 'Force of Nature', 'Winter\'s Approach',
  'Hollow Radiance', 'Berserker\'s Greaves', 'Infinity Edge', 
  'Runaan\'s Hurricane', 'Lord Dominik\'s Regards', 'Bloodthirster',
  'Blackfire Torch', 'Sorcerer\'s Shoes', 'Horizon Focus',
  'Zhonya\'s Hourglass', 'Rabadon\'s Deathcap', 'Void Staff',
  'Dream Maker', 'Ionian Boots of Lucidity', 'Ardent Censer',
  'Moonstone Renewer', 'Redemption', 'Vigilant Wardstone',
  'Mikael\'s Blessing', 'Shurelya\'s Battlesong', 'Chemtech Putrifier',
  'Staff of Flowing Water', 'Locket of the Iron Solari',
  'Yun Tal Wildarrows', 'Guardian Angel', 'Immortal Shieldbow',
  'Mortal Reminder', 'Rapid Firecannon', 'Phantom Dancer',
  'Rod of Ages', 'Seraph\'s Embrace', 'Archangel\'s Staff',
  'Liandry\'s Anguish'
];

export async function getMobalyticsBuild(championName: string, role: string = 'top'): Promise<MobalyticsBuild | null> {
  try {
    const url = `https://mobalytics.gg/lol/champions/${championName.toLowerCase()}/build`;
    const response = await fetch(url, {
      next: { revalidate: 86400 } // Cache por 24 horas
    });
    
    const html = await response.text();
    
    const items: string[] = [];
    const situationalItems: string[] = [];
    
    // Extrai itens do Full Build usando os atributos alt das imagens
    // Limita a busca até "ability order" para não pegar habilidades
    const fullBuildRegex = /Full\s+Build[\s\S]{0,8000}?(?=ability\s+order|situational)/i;
    const fullBuildMatch = html.match(fullBuildRegex);
    
    if (fullBuildMatch) {
      const section = fullBuildMatch[0];
      // Procura por todas as tags img com alt dentro da seção Full Build
      // Filtra apenas imagens de itens (que têm /game-items/ na URL)
      const imgMatches = section.match(/<img[^>]*src=["'][^"']*\/game-items\/[^"']*["'][^>]*alt=["']([^"']+)["'][^>]*>/gi);
      
      if (imgMatches) {
        imgMatches.forEach(imgTag => {
          const altMatch = imgTag.match(/alt=["']([^"']+)["']/i);
          if (altMatch && altMatch[1]) {
            // Decodifica entidades HTML como &#x27; para '
            let itemName = altMatch[1].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
            if (!items.includes(itemName)) {
              items.push(itemName);
            }
          }
        });
      }
    }
    
    // Extrai itens situacionais usando os atributos alt das imagens
    // Limita a busca até a próxima seção
    const situationalRegex = /situational\s+items[\s\S]{0,8000}?(?=Matchups|<\/div><\/div><\/div><\/div><div class="m-dhvm0a">)/i;
    const situationalMatch = html.match(situationalRegex);
    
    if (situationalMatch) {
      const section = situationalMatch[0];
      // Procura por todas as tags img com alt dentro da seção Situational Items
      // Filtra apenas imagens de itens (que têm /game-items/ na URL)
      const imgMatches = section.match(/<img[^>]*src=["'][^"']*\/game-items\/[^"']*["'][^>]*alt=["']([^"']+)["'][^>]*>/gi);
      
      if (imgMatches) {
        imgMatches.forEach(imgTag => {
          const altMatch = imgTag.match(/alt=["']([^"']+)["']/i);
          if (altMatch && altMatch[1]) {
            // Decodifica entidades HTML
            let itemName = altMatch[1].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
            if (!items.includes(itemName) && !situationalItems.includes(itemName)) {
              situationalItems.push(itemName);
            }
          }
        });
      }
    }
    
    // Procura por runas - busca na seção "runes" 
    // As runas selecionadas têm border destacado (m-kr04v7 ou m-1nx2cdb)
    let primaryTree: string | null = null;
    let secondaryTree: string | null = null;
    const statShards: string[] = [];
    const runes: string[] = [];
    const runeSection = html.match(/<h3>runes<\/h3>[\s\S]{0,20000}?(?=<h3|spells|ability)/i);
    
    if (runeSection) {
      const section = runeSection[0];
      
      // Identifica as árvores de runas (primária e secundária)
      const treeMatches = section.match(/<div class="m-1jwy3wt">([^<]+)<\/div>/g);
      if (treeMatches && treeMatches.length >= 2) {
        const primaryMatch = treeMatches[0].match(/<div class="m-1jwy3wt">([^<]+)<\/div>/);
        const secondaryMatch = treeMatches[1].match(/<div class="m-1jwy3wt">([^<]+)<\/div>/);
        if (primaryMatch) primaryTree = primaryMatch[1];
        if (secondaryMatch) secondaryTree = secondaryMatch[1];
      }
      
      // PRIMEIRO: Pega a keystone da árvore primária (primeira runa, classe m-1iebrlh)
      // A keystone aparece na primeira linha de runas da árvore primária (dentro do primeiro m-lneq)
      let keystone: string | null = null;
      
      // Tenta múltiplos padrões para encontrar a keystone
      // Padrão 1: classe m-1iebrlh dentro de m-lneq
      let keystoneMatch = section.match(/<div class="m-lneq">[\s\S]*?<img[^>]*class="[^"]*m-1iebrlh[^"]*"[^>]*alt=["']([^"']+)["'][^>]*>/i);
      
      // Padrão 2: procura por keystones conhecidas na seção (Lethal Tempo, Press the Attack, etc)
      if (!keystoneMatch) {
        const keystoneNames = ['Lethal Tempo', 'Press the Attack', 'Fleet Footwork', 'Conqueror', 
                              'Grasp of the Undying', 'Aftershock', 'Guardian', 
                              'Electrocute', 'Dark Harvest', 'Predator', 'Hail of Blades',
                              'Arcane Comet', 'Summon Aery', 'Phase Rush'];
        for (const name of keystoneNames) {
          const nameMatch = section.match(new RegExp(`<img[^>]*alt=["']${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*class="[^"]*m-1iebrlh[^"]*"`, 'i'));
          if (nameMatch) {
            keystoneMatch = ['', name] as RegExpMatchArray;
            break;
          }
        }
      }
      
      // Padrão 3: procura pela primeira runa que aparece na árvore primária (antes das outras runas)
      if (!keystoneMatch) {
        // Procura por runas dentro da primeira árvore (antes da segunda árvore aparecer)
        const primaryTreeSection = section.split(/<div class="m-1953d5c">/)[0]; // Tudo antes da árvore secundária
        const firstRuneMatch = primaryTreeSection.match(/<img[^>]*alt=["']([^"']+)["'][^>]*src=["'][^"']*\/perks\/\d+\.png[^"']*["'][^>]*>/i);
        if (firstRuneMatch && firstRuneMatch[1]) {
          let runeName = firstRuneMatch[1].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
          const ignoreList = ['Resolve', 'Inspiration', 'Precision', 'Domination', 'Sorcery'];
          if (!ignoreList.some(ignore => runeName.toLowerCase() === ignore.toLowerCase())) {
            keystoneMatch = ['', runeName] as RegExpMatchArray;
          }
        }
      }
      
      if (keystoneMatch && keystoneMatch[1]) {
        let runeName = keystoneMatch[1].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
        const ignoreList = ['Resolve', 'Inspiration', 'Precision', 'Domination', 'Sorcery'];
        if (!ignoreList.some(ignore => runeName.toLowerCase() === ignore.toLowerCase())) {
          keystone = runeName;
          runes.push(runeName); // Adiciona a keystone primeiro
        }
      }
      
      // SEGUNDO: Procura por divs que contêm runas selecionadas (com border destacado)
      // Padrão: <div style="border-color:..." class="m-kr04v7"> ou class="m-1nx2cdb"
      const selectedRunesPattern = /<div[^>]*class="[^"]*(?:m-kr04v7|m-1nx2cdb)[^"]*"[^>]*>[\s\S]*?<img[^>]*alt=["']([^"']+)["'][^>]*>/gi;
      let match;
      
      while ((match = selectedRunesPattern.exec(section)) !== null) {
        if (match[1]) {
          let runeName = match[1].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
          // Ignora nomes de árvores e stat shards
          const ignoreList = ['Resolve', 'Inspiration', 'Precision', 'Domination', 'Sorcery', 
                             'Adaptive Force', 'Attack Speed', 'Ability Haste', 'Armor', 
                             'Magic Resist', 'Health Scaling', 'Health'];
          // Não adiciona se já é a keystone ou se já está na lista
          if (!ignoreList.some(ignore => runeName.toLowerCase() === ignore.toLowerCase()) && 
              runeName !== keystone && !runes.includes(runeName)) {
            runes.push(runeName);
          }
        }
      }
      
      // Extrai stat shards (as runinhas pequenas)
      // As stat shards selecionadas têm classe m-1dj96r2 na div e m-1u3ui07 na img (opacity:1)
      // As não selecionadas têm m-1a2hiv na div e m-1ad9kem na img (opacity:0.3)
      // IMPORTANTE: Pode haver múltiplas stat shards do mesmo tipo (ex: 2x Health Scaling)
      // Busca diretamente no HTML completo, não apenas na seção de runas
      const statShardsPattern = /<div[^>]*class="[^"]*m-1dj96r2[^"]*"[^>]*>[\s\S]*?<img[^>]*alt=["']([^"']+)["'][^>]*class="[^"]*m-1u3ui07[^"]*"[^>]*>/gi;
      let statMatch;
      
      while ((statMatch = statShardsPattern.exec(html)) !== null) {
        if (statMatch[1]) {
          let statName = statMatch[1].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
          // Ignora nomes de árvores
          const ignoreList = ['Resolve', 'Inspiration', 'Precision', 'Domination', 'Sorcery'];
          if (!ignoreList.some(ignore => statName.toLowerCase() === ignore.toLowerCase())) {
            // Adiciona TODAS as ocorrências (incluindo duplicatas)
            statShards.push(statName);
          }
        }
      }
    }
    
    // Procura por summoner spells na seção específica
    const summoners: string[] = [];
    const spellsSection = html.match(/<h3>spells<\/h3>[\s\S]{0,5000}?(?=<h3|ability|$)/i);
    
    if (spellsSection) {
      const section = spellsSection[0];
      // Procura por imagens de spells com alt contendo o nome do spell
      const spellPattern = /<img[^>]*alt=["']([^"']*(?:Flash|Teleport|Barrier|Heal|Ignite|Smite|Ghost|Cleanse|Exhaust)[^"']*)["'][^>]*>/gi;
      let spellMatch;
      const foundSpells = new Set<string>();
      
      while ((spellMatch = spellPattern.exec(section)) !== null) {
        if (spellMatch[1]) {
          const spellName = spellMatch[1].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
          // Extrai o nome do spell do alt
          if (spellName.includes('Flash') && !foundSpells.has('Flash')) {
            summoners.push('Flash');
            foundSpells.add('Flash');
          } else if (spellName.includes('Teleport') && !foundSpells.has('Teleport')) {
            summoners.push('Teleport');
            foundSpells.add('Teleport');
          } else if (spellName.includes('Barrier') && !foundSpells.has('Barrier')) {
            summoners.push('Barrier');
            foundSpells.add('Barrier');
          } else if (spellName.includes('Heal') && !foundSpells.has('Heal')) {
            summoners.push('Heal');
            foundSpells.add('Heal');
          } else if (spellName.includes('Ignite') && !foundSpells.has('Ignite')) {
            summoners.push('Ignite');
            foundSpells.add('Ignite');
          } else if (spellName.includes('Smite') && !foundSpells.has('Smite')) {
            summoners.push('Smite');
            foundSpells.add('Smite');
          } else if (spellName.includes('Ghost') && !foundSpells.has('Ghost')) {
            summoners.push('Ghost');
            foundSpells.add('Ghost');
          } else if (spellName.includes('Cleanse') && !foundSpells.has('Cleanse')) {
            summoners.push('Cleanse');
            foundSpells.add('Cleanse');
          } else if (spellName.includes('Exhaust') && !foundSpells.has('Exhaust')) {
            summoners.push('Exhaust');
            foundSpells.add('Exhaust');
          }
        }
      }
    }
    
    // Fallback: se não encontrou na seção, procura no HTML inteiro
    if (summoners.length === 0) {
      if (html.match(/Flash/i)) {
        summoners.push('Flash');
      }
      if (html.match(/Barrier/i)) {
        summoners.push('Barrier');
      } else if (html.match(/Teleport/i)) {
        summoners.push('Teleport');
      } else if (html.match(/Heal/i)) {
        summoners.push('Heal');
      } else if (html.match(/Ignite/i)) {
        summoners.push('Ignite');
      } else if (html.match(/Smite/i)) {
        summoners.push('Smite');
      }
    }
    
    return {
      items: items.length > 0 ? items : [],
      situationalItems: situationalItems.length > 0 ? situationalItems : [],
      runes: runes.length > 0 ? runes : [],
      primaryTree: primaryTree || null,
      secondaryTree: secondaryTree || null,
      statShards: statShards.length > 0 ? statShards : [],
      summoners: summoners.length > 0 ? summoners : ['Flash', 'Teleport']
    };
  } catch (error) {
    console.error('Erro ao buscar build do Mobalytics:', error);
    return null;
  }
}
