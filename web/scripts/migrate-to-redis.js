// Script para migrar dados locais para o Redis
// Uso: node scripts/migrate-to-redis.js

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CHAMPION_POOL_FILE = path.join(DATA_DIR, 'champion-pool.json');
const COMPOSITIONS_FILE = path.join(DATA_DIR, 'compositions.json');

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!REDIS_URL || !REDIS_TOKEN) {
  console.error('❌ Variáveis de ambiente não configuradas!');
  console.error('Configure UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN');
  process.exit(1);
}

async function saveToRedis(key, value) {
  try {
    const valueStr = JSON.stringify(value);
    const response = await fetch(REDIS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['SET', key, valueStr]),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    return result.result === 'OK';
  } catch (error) {
    console.error(`Erro ao salvar ${key}:`, error.message);
    return false;
  }
}

async function migrate() {
  console.log('🔄 Iniciando migração para Redis...\n');

  // Migrar Champion Pool
  if (fs.existsSync(CHAMPION_POOL_FILE)) {
    console.log('📦 Migrando Champion Pool...');
    try {
      const data = JSON.parse(fs.readFileSync(CHAMPION_POOL_FILE, 'utf-8'));
      const success = await saveToRedis('champion-pool', data);
      if (success) {
        console.log('✅ Champion Pool migrado com sucesso!\n');
      } else {
        console.log('❌ Erro ao migrar Champion Pool\n');
      }
    } catch (error) {
      console.error('❌ Erro ao ler arquivo champion-pool.json:', error.message);
    }
  } else {
    console.log('⚠️  Arquivo champion-pool.json não encontrado\n');
  }

  // Migrar Composições
  if (fs.existsSync(COMPOSITIONS_FILE)) {
    console.log('📦 Migrando Composições...');
    try {
      const data = JSON.parse(fs.readFileSync(COMPOSITIONS_FILE, 'utf-8'));
      const success = await saveToRedis('compositions', data);
      if (success) {
        console.log('✅ Composições migradas com sucesso!\n');
      } else {
        console.log('❌ Erro ao migrar Composições\n');
      }
    } catch (error) {
      console.error('❌ Erro ao ler arquivo compositions.json:', error.message);
    }
  } else {
    console.log('⚠️  Arquivo compositions.json não encontrado\n');
  }

  console.log('✨ Migração concluída!');
}

migrate().catch(console.error);

