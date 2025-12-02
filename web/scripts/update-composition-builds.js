// Script para atualizar builds de todos os campeões da composição
const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function getMobalyticsBuild(championName, role = 'top') {
  try {
    const url = `https://mobalytics.gg/lol/champions/${championName.toLowerCase()}/build`;
    const html = await fetchHTML(url);
    
    const items = [];
    const situationalItems = [];
    
    // Extrai itens do Full Build
    const fullBuildRegex = /Full\s+Build[\s\S]{0,8000}?(?=ability\s+order|situational)/i;
    const fullBuildMatch = html.match(fullBuildRegex);
    
    if (fullBuildMatch) {
      const section = fullBuildMatch[0];
      const imgMatches = section.match(/<img[^>]*src=["'][^"']*\/game-items\/[^"']*["'][^>]*alt=["']([^"']+)["'][^>]*>/gi);
      
      if (imgMatches) {
        imgMatches.forEach(imgTag => {
          const altMatch = imgTag.match(/alt=["']([^"']+)["']/i);
          if (altMatch && altMatch[1]) {
            let itemName = altMatch[1].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
            if (!items.includes(itemName)) {
              items.push(itemName);
            }
          }
        });
      }
    }
    
    // Extrai itens situacionais
    const situationalRegex = /situational\s+items[\s\S]{0,8000}?(?=Matchups|<\/div><\/div><\/div><\/div><div class="m-dhvm0a">)/i;
    const situationalMatch = html.match(situationalRegex);
    
    if (situationalMatch) {
      const section = situationalMatch[0];
      const imgMatches = section.match(/<img[^>]*src=["'][^"']*\/game-items\/[^"']*["'][^>]*alt=["']([^"']+)["'][^>]*>/gi);
      
      if (imgMatches) {
        imgMatches.forEach(imgTag => {
          const altMatch = imgTag.match(/alt=["']([^"']+)["']/i);
          if (altMatch && altMatch[1]) {
            let itemName = altMatch[1].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
            if (!items.includes(itemName) && !situationalItems.includes(itemName)) {
              situationalItems.push(itemName);
            }
          }
        });
      }
    }
    
    // Procura por runas
    const runes = [];
    const runeSection = html.match(/Most Popular[\s\S]{0,5000}?runes[\s\S]{0,5000}?(?=spells|items|ability)/i);
    if (runeSection) {
      const runeList = [
        'Grasp of the Undying', 'Demolish', 'Bone Plating', 'Overgrowth',
        'Biscuit Delivery', 'Magical Footwear', 'Aftershock', 'Font of Life',
        'Conditioning', 'Revitalize', 'Unflinching', 'Second Wind',
        'Shield Bash', 'Phase Rush', 'Manaflow Band', 'Transcendence',
        'Scorch', 'Lethal Tempo', 'Presence of Mind', 'Legend: Bloodline',
        'Coup de Grace', 'Summon Aery'
      ];
      
      runeList.forEach(rune => {
        const pattern = rune.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '[\\s,]*');
        const regex = new RegExp(pattern, 'i');
        if (regex.test(runeSection[0]) && !runes.includes(rune)) {
          runes.push(rune);
        }
      });
    }
    
    // Procura por summoner spells
    const summoners = [];
    if (html.match(/Flash/i)) {
      summoners.push('Flash');
    }
    if (html.match(/Teleport/i)) {
      summoners.push('Teleport');
    } else if (html.match(/Barrier/i)) {
      summoners.push('Barrier');
    } else if (html.match(/Heal/i)) {
      summoners.push('Heal');
    } else if (html.match(/Ignite/i)) {
      summoners.push('Ignite');
    } else if (html.match(/Smite/i)) {
      summoners.push('Smite');
    }
    
    return {
      items: items.length > 0 ? items : [],
      situationalItems: situationalItems.length > 0 ? situationalItems : [],
      runes: runes.length > 0 ? runes : [],
      summoners: summoners.length > 0 ? summoners : ['Flash', 'Teleport']
    };
  } catch (error) {
    console.error(`Erro ao buscar build do ${championName}:`, error.message);
    return null;
  }
}

async function getProbuildsRoles(championName) {
  try {
    const html = await fetchHTML(`https://probuilds.net/champions/details/${championName}/`);
    const roleLinks = html.match(/\/champions\/details\/[^/]+\/(Top|Jungle|Mid|ADC|Support)"/gi);
    
    const roles = [];
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
    console.error(`Erro ao buscar roles do ${championName}:`, error.message);
    return [];
  }
}

// Campeões da composição atual
const champions = [
  { name: 'Ornn', role: 'top' },
  { name: 'Sejuani', role: 'jungle' },
  { name: 'Orianna', role: 'mid' },
  { name: 'Jinx', role: 'adc' },
  { name: 'Lulu', role: 'support' }
];

async function updateAllBuilds() {
  console.log('Iniciando busca de builds...\n');
  
  const results = {};
  
  for (const champ of champions) {
    console.log(`Buscando build para ${champ.name} (${champ.role})...`);
    
    // Busca roles do Probuilds
    const roles = await getProbuildsRoles(champ.name);
    console.log(`  Posições disponíveis: ${roles.join(', ') || 'Nenhuma encontrada'}`);
    
    // Busca build do Mobalytics
    const build = await getMobalyticsBuild(champ.name, champ.role);
    
    if (build) {
      results[champ.name] = {
        roles,
        build: {
          items: build.items,
          situationalItems: build.situationalItems,
          runes: build.runes,
          summoners: build.summoners
        }
      };
      
      console.log(`  ✓ Build encontrada:`);
      console.log(`    - Itens principais: ${build.items.length}`);
      console.log(`    - Itens situacionais: ${build.situationalItems.length}`);
      console.log(`    - Runas: ${build.runes.length}`);
      console.log(`    - Spells: ${build.summoners.join(', ')}`);
    } else {
      console.log(`  ✗ Erro ao buscar build`);
    }
    
    console.log('');
    
    // Delay para não sobrecarregar os servidores
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Salva os resultados
  const outputPath = path.join(__dirname, 'champion-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nDados salvos em: ${outputPath}`);
  
  return results;
}

updateAllBuilds().catch(console.error);

