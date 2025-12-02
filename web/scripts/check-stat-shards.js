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

async function checkStatShards(championName) {
  const url = `https://mobalytics.gg/lol/champions/${championName.toLowerCase()}/build`;
  const html = await fetchHTML(url);
  
  const stats = {};
  // Busca por stat shards (SVG)
  const statShardsPattern = /<img[^>]*src=["'][^"']*\/perks\/(\d+)\.svg[^"']*["'][^>]*alt=["']([^"']*Health[^"']*)["'][^>]*>/gi;
  let match;
  
  while ((match = statShardsPattern.exec(html)) !== null) {
    if (match[1] && match[2]) {
      const name = match[2].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
      stats[name] = parseInt(match[1]);
    }
  }
  
  console.log('Stat Shards encontrados:');
  console.log(JSON.stringify(stats, null, 2));
}

const championName = process.argv[2] || 'Galio';
checkStatShards(championName).catch(console.error);

