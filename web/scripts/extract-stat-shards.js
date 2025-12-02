const https = require('https');
const fs = require('fs');

https.get('https://mobalytics.gg/lol/champions/ornn/build', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const index = data.indexOf('m-krpiie');
    if (index !== -1) {
      const section = data.substring(index - 100, index + 1000);
      fs.writeFileSync('stat-shards-html.html', section);
      console.log('Seção de stat shards HTML salva!');
      console.log('Tamanho:', section.length);
    } else {
      console.log('Não encontrou m-krpiie');
    }
  });
});

