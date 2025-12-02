// Script simples para extrair IDs de runas específicas
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

async function getRuneIds(championName) {
  const url = `https://mobalytics.gg/lol/champions/${championName.toLowerCase()}/build`;
  const html = await fetchHTML(url);
  
  const runeIds = {};
  
  // Busca todas as runas na seção de runas
  const runeSection = html.match(/<h3>runes<\/h3>[\s\S]{0,20000}?(?=<h3|spells|ability)/i);
  
  if (runeSection) {
    const section = runeSection[0];
    // Procura por todas as imagens de runas com padrão: src="...perks/ID.png" e alt="Nome"
    const runePattern = /<img[^>]*src=["'][^"']*\/perks\/(\d+)\.png[^"']*["'][^>]*alt=["']([^"']+)["'][^>]*>/gi;
    let match;
    
    while ((match = runePattern.exec(section)) !== null) {
      if (match[1] && match[2]) {
        const runeName = match[2].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
        const runeId = parseInt(match[1]);
        
        // Ignora nomes de árvores e stat shards
        const ignoreList = ['Resolve', 'Inspiration', 'Precision', 'Domination', 'Sorcery',
                           'Adaptive Force', 'Attack Speed', 'Ability Haste', 'Armor',
                           'Magic Resist', 'Health Scaling', 'Health'];
        
        if (!ignoreList.some(ignore => runeName.toLowerCase() === ignore.toLowerCase())) {
          runeIds[runeName] = runeId;
        }
      }
    }
  }
  
  console.log('Rune IDs encontrados:');
  console.log(JSON.stringify(runeIds, null, 2));
  
  return runeIds;
}

const championName = process.argv[2] || 'Jinx';
getRuneIds(championName).catch(console.error);

