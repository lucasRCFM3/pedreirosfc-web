# 🔧 Solução: Migrar para Banco de Dados

## 🎯 Vamos Usar: Upstash Redis

É **gratuito** e funciona perfeitamente com Next.js no Netlify!

---

## 📋 Passos para Resolver

### 1. Criar Conta no Upstash (2 min)

1. Acesse: https://upstash.com
2. Clique em **"Sign Up"** (pode usar GitHub)
3. É grátis!

### 2. Criar Banco de Dados

1. No dashboard, clique em **"Create Database"**
2. Escolha:
   - **Name:** `pedreirosfc-data`
   - **Type:** Redis
   - **Region:** Escolha o mais próximo (ex: `us-east-1`)
3. Clique em **"Create"**

### 3. Copiar Credenciais

Após criar, você verá:
- **UPSTASH_REDIS_REST_URL**
- **UPSTASH_REDIS_REST_TOKEN**

**Copie esses valores!**

### 4. Adicionar no Netlify

1. No Netlify, vá em **"Site settings"** → **"Environment variables"**
2. Adicione:
   - **Key:** `UPSTASH_REDIS_REST_URL` | **Value:** (cole a URL)
   - **Key:** `UPSTASH_REDIS_REST_TOKEN` | **Value:** (cole o token)

### 5. Instalar Pacote

Vou criar os arquivos necessários e você só precisa fazer deploy!

---

## ✅ Depois Disso

- ✅ Champion Pool vai salvar no banco
- ✅ Composições vão salvar no banco
- ✅ Dados persistem entre deploys
- ✅ Tudo funciona normalmente!

---

**Quer que eu implemente a migração agora?** 🚀

