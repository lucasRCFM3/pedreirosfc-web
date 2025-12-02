// Script para buscar informações do Probuilds.net usando Puppeteer
// Instalar: npm install puppeteer

const puppeteer = require('puppeteer');

async function fetchProbuildsRoles(championName) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(`https://probuilds.net/champions/details/${championName}/`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Aguarda o conteúdo carregar
    await page.waitForTimeout(2000);
    
    // Procura por um seletor de role ou extrai do HTML
    const roles = await page.evaluate(() => {
      // Procura por um select com role
      const select = document.querySelector('select');
      if (select) {
        const options = Array.from(select.options);
        return options
          .filter(opt => opt.value && opt.value !== 'all')
          .map(opt => ({ value: opt.value, text: opt.text.trim() }));
      }
      
      // Procura por botões ou links de role
      const roleElements = document.querySelectorAll('[data-role], [class*="role"], [id*="role"]');
      const foundRoles = [];
      roleElements.forEach(el => {
        const role = el.getAttribute('data-role') || 
                    el.className.match(/role[_-]?(\w+)/i)?.[1] ||
                    el.id.match(/role[_-]?(\w+)/i)?.[1];
        if (role && !foundRoles.includes(role.toLowerCase())) {
          foundRoles.push(role.toLowerCase());
        }
      });
      
      return foundRoles.length > 0 ? foundRoles : null;
    });
    
    await browser.close();
    return roles;
  } catch (error) {
    await browser.close();
    throw error;
  }
}

// Teste
const championName = process.argv[2] || 'Ornn';

fetchProbuildsRoles(championName)
  .then(roles => {
    console.log(`Posições disponíveis para ${championName}:`);
    console.log(JSON.stringify(roles, null, 2));
  })
  .catch(err => {
    console.error('Erro:', err.message);
    console.log('Instale o Puppeteer: npm install puppeteer');
  });

