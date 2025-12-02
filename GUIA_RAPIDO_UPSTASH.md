# ⚡ Guia Rápido: Configurar Upstash Redis

## 🎯 Resumo

O código já está pronto! Só falta configurar o banco de dados.

---

## 📋 Passos Rápidos (5 minutos)

### 1. Criar Conta e Banco (2 min)
1. Acesse: https://console.upstash.com/
2. Crie conta (pode usar GitHub)
3. Clique em **"Create Database"**
4. Nome: `pedreirosfc-data`
5. Type: **Redis**
6. Region: Qualquer (ex: `us-east-1`)
7. **Create**

### 2. Copiar Credenciais (1 min)
Após criar, você verá:
- **UPSTASH_REDIS_REST_URL** (copie)
- **UPSTASH_REDIS_REST_TOKEN** (copie)

### 3. Adicionar no Netlify (1 min)
1. Netlify → Seu Site → **"Site settings"**
2. **"Environment variables"**
3. Adicione:
   - `UPSTASH_REDIS_REST_URL` = (cole a URL)
   - `UPSTASH_REDIS_REST_TOKEN` = (cole o token)
4. **Save**

### 4. Fazer Novo Deploy (1 min)
1. **"Deploys"** → **3 pontinhos** → **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## ✅ Pronto!

Agora tudo vai funcionar:
- ✅ Champion Pool salva
- ✅ Composições funcionam
- ✅ Dados persistem

---

**Guia completo:** Veja `CONFIGURAR_UPSTASH.md` para detalhes!

