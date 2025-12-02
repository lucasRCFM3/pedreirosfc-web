# 🔄 Como Migrar Dados Locais para o Redis

## 🎯 Problema

Você tem dados salvos localmente (na pasta `web/data/`) que não estão no Redis:
- ✅ Arquivo local existe: `web/data/champion-pool.json`
- ❌ Redis está vazio (só tem dados padrão)

---

## ✅ Solução: Migrar os Dados

### Opção 1: Script de Migração (Recomendado)

Criei um script que migra automaticamente!

1. **Configure as variáveis de ambiente localmente:**

Crie um arquivo `.env.local` na pasta `web` (se não tiver):

```env
UPSTASH_REDIS_REST_URL=https://loyal-wombat-43396.upstash.io
UPSTASH_REDIS_REST_TOKEN=AamEAAIncDIxNzhmZmNmNGQwNGY0ZjViOTc4YjIzZWM2MjQwNzJiOHAyNDMzOTY
```

**⚠️ Sem aspas!** (como você fez no Netlify)

2. **Rode o script:**

```powershell
cd web
node scripts/migrate-to-redis.js
```

3. **Pronto!** Os dados vão ser enviados para o Redis!

---

### Opção 2: Migração Manual (Mais Simples)

1. **Abra o arquivo local:** `web/data/champion-pool.json`
2. **Copie todo o conteúdo** (Ctrl+A, Ctrl+C)
3. **No site publicado**, vá na Champion Pool
4. **Use as ferramentas de edição** para recriar os dados

---

### Opção 3: Endpoint de Migração (Via Site)

Posso criar um endpoint que você acessa no navegador para migrar automaticamente!

---

## 🔍 Sobre a Página de Composições

Vou corrigir o código para garantir que funcione mesmo sem dados no Redis.

---

**Qual opção você prefere?** 🚀

