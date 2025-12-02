// Script simples para buscar informações do Probuilds.net
// Usa fetch para buscar o HTML e extrair informações básicas

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

async function getChampionRoles(championName) {
  try {
    const html = await fetchHTML(`https://probuilds.net/champions/details/${championName}/`);
    
    // Procura por links de roles no formato /champions/details/ChampionName/Role
    const roleLinks = html.match(/\/champions\/details\/[^/]+\/(Top|Jungle|Mid|ADC|Support)"/gi);
    
    const roles = [];
    if (roleLinks) {
      roleLinks.forEach(link => {
        const roleMatch = link.match(/\/(Top|Jungle|Mid|ADC|Support)"/i);
        if (roleMatch) {
          const role = roleMatch[1].toLowerCase();
          if (role === 'adc') {
            roles.push('adc');
          } else if (!roles.includes(role)) {
            roles.push(role);
          }
        }
      });
    }
    
    // Remove duplicatas e ordena
    const uniqueRoles = [...new Set(roles)];
    
    console.log(`Posições disponíveis para ${championName}:`);
    console.log(uniqueRoles);
    
    return uniqueRoles;
  } catch (error) {
    console.error('Erro:', error.message);
    return null;
  }
}

const championName = process.argv[2] || 'Ornn';
getChampionRoles(championName);
