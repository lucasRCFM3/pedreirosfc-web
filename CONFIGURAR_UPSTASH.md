# 🗄️ Como Configurar Upstash Redis (5 Minutos)

## 🎯 Passo 1: Criar Conta no Upstash

1. **Acesse:** https://console.upstash.com/
2. **Clique em:** "Sign Up" (pode usar GitHub para mais rápido)
3. **Complete o cadastro**

---

## 🎯 Passo 2: Criar Banco de Dados

1. No dashboard, clique em **"Create Database"**
2. Preencha:
   - **Name:** `pedreirosfc-data`
   - **Type:** Redis
   - **Region:** Escolha o mais próximo do Brasil (ex: `us-east-1` ou `eu-west-1`)
   - **Tier:** Free (gratuito)
3. **Clique em:** "Create"

---

## 🎯 Passo 3: Copiar Credenciais

Após criar o banco, você verá uma página com:

### **UPSTASH_REDIS_REST_URL**
Algo como: `https://pedreirosfc-data-12345.upstash.io`

### **UPSTASH_REDIS_REST_TOKEN**
Um token longo tipo: `AXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

**📋 COPIE AMBOS!**

---

## 🎯 Passo 4: Adicionar no Netlify

1. **Acesse:** https://app.netlify.com
2. **Vá no seu site** → **"Site settings"**
3. **Clique em:** "Environment variables"
4. **Adicione duas variáveis:**

   **Variável 1:**
   - **Key:** `UPSTASH_REDIS_REST_URL`
   - **Value:** Cole a URL que você copiou
   - **Scopes:** Production, Preview, Deploy previews
   - **Save**

   **Variável 2:**
   - **Key:** `UPSTASH_REDIS_REST_TOKEN`
   - **Value:** Cole o token que você copiou
   - **Scopes:** Production, Preview, Deploy previews
   - **Save**

---

## 🎯 Passo 5: Fazer Novo Deploy

1. No Netlify, vá em **"Deploys"**
2. Clique nos **3 pontinhos** (⋮) do último deploy
3. Escolha **"Trigger deploy"** → **"Clear cache and deploy site"**
4. Aguarde o deploy completar

---

## ✅ Pronto!

Agora:
- ✅ Champion Pool vai salvar no banco
- ✅ Composições vão salvar no banco
- ✅ Dados persistem entre deploys
- ✅ Tudo funciona normalmente!

---

## ❓ Problemas?

### "Erro ao salvar dados"
- Verifique se as variáveis de ambiente estão configuradas
- Verifique se fez o novo deploy após adicionar as variáveis

### "Dados não aparecem"
- Os dados antigos (locais) não foram migrados
- Você precisa recriar no site publicado
- Ou posso criar um script de migração

---

**Depois de configurar, me avise e testamos!** 🚀

