# 🔄 Passos para Migrar Dados Locais para o Redis

## 🎯 Problema

Os dados do jungler estão salvos **localmente** no seu PC, mas não estão no **Redis** (banco de dados).

Por isso não aparecem no site publicado!

---

## ✅ Solução: Migrar os Dados

### Passo 1: Configurar Variáveis Localmente

Na pasta `web`, crie/edite o arquivo `.env.local`:

```env
UPSTASH_REDIS_REST_URL=https://loyal-wombat-43396.upstash.io
UPSTASH_REDIS_REST_TOKEN=AamEAAIncDIxNzhmZmNmNGQwNGY0ZjViOTc4YjIzZWM2MjQwNzJiOHAyNDMzOTY
```

**⚠️ SEM ASPAS!** (igual você fez no Netlify)

### Passo 2: Rodar Script de Migração

No PowerShell:

```powershell
cd web
node scripts/migrate-to-redis.js
```

Isso vai:
- ✅ Ler os dados locais
- ✅ Enviar para o Redis
- ✅ Os dados vão aparecer no site!

### Passo 3: Verificar no Site

Depois de rodar o script:
1. Aguarde alguns segundos
2. Recarregue o site
3. Os dados do jungler devem aparecer!

---

## 🔍 Sobre a Página de Composições

Vou corrigir o código para garantir que funcione. O problema pode ser que está tentando carregar dados que não existem ainda.

---

**Quer que eu te guie para rodar o script agora?** 🚀

