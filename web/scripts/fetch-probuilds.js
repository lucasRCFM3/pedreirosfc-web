// Script para buscar informações do Probuilds.net
const https = require('https');

async function fetchProbuildsData(championName) {
  return new Promise((resolve, reject) => {
    const url = `https://probuilds.net/champions/details/${championName}/`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Procura por "Select Role" e extrai as opções disponíveis
        const roleMatch = data.match(/Select Role[\s\S]*?<select[^>]*>([\s\S]*?)<\/select>/i);
        
        if (roleMatch) {
          // Extrai as opções do select
          const options = roleMatch[1].match(/<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi);
          const roles = [];
          
          if (options) {
            options.forEach(option => {
              const valueMatch = option.match(/value="([^"]*)"/);
              const textMatch = option.match(/>([^<]*)</);
              if (valueMatch && textMatch) {
                const value = valueMatch[1];
                const text = textMatch[1].trim();
                if (value && text && value !== 'all') {
                  roles.push({ value, text });
                }
              }
            });
          }
          
          resolve(roles);
        } else {
          // Fallback: procura por padrões de role na página
          const rolePatterns = [
            /role[_-]?top/i,
            /role[_-]?jungle/i,
            /role[_-]?mid/i,
            /role[_-]?adc/i,
            /role[_-]?support/i,
          ];
          
          const foundRoles = [];
          rolePatterns.forEach((pattern, index) => {
            if (pattern.test(data)) {
              const roleNames = ['top', 'jungle', 'mid', 'adc', 'support'];
              foundRoles.push(roleNames[index]);
            }
          });
          
          resolve(foundRoles.length > 0 ? foundRoles : null);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Teste
const championName = process.argv[2] || 'Ornn';

fetchProbuildsData(championName)
  .then(roles => {
    console.log(`Posições disponíveis para ${championName}:`);
    console.log(JSON.stringify(roles, null, 2));
  })
  .catch(err => {
    console.error('Erro:', err);
  });
