# 🔄 Como Migrar Dados Locais para o Redis

## ✅ Boa Notícia!

Encontrei os dados do seu jungler! Eles estão salvos localmente em `web/data/champion-pool.json`.

---

## 🎯 Solução Rápida (3 Passos)

### Passo 1: Configurar Variáveis Localmente

Na pasta `web`, crie ou edite o arquivo `.env.local`:

```env
UPSTASH_REDIS_REST_URL=https://loyal-wombat-43396.upstash.io
UPSTASH_REDIS_REST_TOKEN=AamEAAIncDIxNzhmZmNmNGQwNGY0ZjViOTc4YjIzZWM2MjQwNzJiOHAyNDMzOTY
```

**⚠️ SEM ASPAS!**

### Passo 2: Rodar Script de Migração

No PowerShell, na pasta `web`:

```powershell
cd web
node scripts/migrate-to-redis.js
```

### Passo 3: Verificar

O script vai mostrar:
- ✅ Champion Pool migrado com sucesso!
- ✅ Composições migradas com sucesso!

---

## 🔍 Sobre a Página de Composições

Estou corrigindo o código para garantir que funcione. O problema pode ser que está tentando carregar dados que não existem no Redis ainda.

---

**Quer que eu te guie passo a passo para rodar o script?** 🚀

