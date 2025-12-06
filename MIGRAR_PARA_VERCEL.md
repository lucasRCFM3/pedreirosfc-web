# 🚀 Migrar para Vercel - Passo a Passo Completo

## ✅ Passo 1: Criar Conta no Vercel

1. **Acesse:** https://vercel.com
2. Clique em **"Sign Up"** (canto superior direito)
3. Escolha **"Continue with GitHub"** (recomendado - mais fácil)
4. Autorize o Vercel a acessar seu GitHub
5. Pronto! Conta criada ✅

---

## ✅ Passo 2: Conectar Repositório

1. **No Vercel, clique em:** **"Add New..."** → **"Project"**
2. Você verá uma lista dos seus repositórios do GitHub
3. **Procure e clique em:** `pedreirosfc-web` (ou o nome do seu repositório)
4. Clique em **"Import"**

---

## ✅ Passo 3: Configurar o Projeto

O Vercel vai detectar automaticamente que é um projeto Next.js! Mas vamos configurar:

### 3.1 Configurações de Build:

- **Framework Preset:** Next.js (já detectado automaticamente)
- **Root Directory:** `web` (IMPORTANTE!)
  - Clique em **"Edit"** ao lado de "Root Directory"
  - Digite: `web`
  - Clique em **"Continue"**

### 3.2 Variáveis de Ambiente:

**IMPORTANTE:** Você precisa adicionar as variáveis de ambiente antes de fazer o deploy!

1. **Na tela de configuração, role até:** **"Environment Variables"**
2. **Adicione as seguintes variáveis:**

   **Variável 1:**
   - **Key:** `RIOT_API_KEY`
   - **Value:** `RGAPI-96579009-9923-4d83-ba57-f5fd98fe2c0b`
   - **Environments:** Marque todas (Production, Preview, Development)
   - Clique em **"Add"**

   **Variável 2:**
   - **Key:** `UPSTASH_REDIS_REST_URL`
   - **Value:** (cole a URL do Upstash - a mesma que você tem no Netlify)
   - **Environments:** Marque todas
   - Clique em **"Add"**

   **Variável 3:**
   - **Key:** `UPSTASH_REDIS_REST_TOKEN`
   - **Value:** (cole o token do Upstash - a mesma que você tem no Netlify)
   - **Environments:** Marque todas
   - Clique em **"Add"**

### 3.3 Configurações Avançadas (Opcional):

- **Build Command:** Deixe padrão (Next.js detecta automaticamente)
- **Output Directory:** Deixe padrão (`.next`)
- **Install Command:** Deixe padrão (`npm install`)

---

## ✅ Passo 4: Fazer o Deploy

1. **Após configurar tudo, clique em:** **"Deploy"**
2. Aguarde alguns minutos enquanto o Vercel:
   - Instala as dependências
   - Faz o build do projeto
   - Faz o deploy
3. **Você verá os logs em tempo real!**

---

## ✅ Passo 5: Verificar o Deploy

1. **Quando terminar, você verá:**
   - ✅ "Congratulations! Your project has been deployed"
   - Um link tipo: `https://pedreirosfc-web-xyz.vercel.app`

2. **Clique no link para testar!**
   - O site deve estar funcionando
   - Teste as páginas principais

---

## ✅ Passo 6: Configurar Domínio Personalizado (Opcional)

Se você tinha um domínio customizado no Netlify:

1. **No Vercel, vá em:** Seu projeto → **"Settings"** → **"Domains"**
2. Clique em **"Add Domain"**
3. Digite seu domínio (ex: `pedreirosfc.com`)
4. Siga as instruções para configurar o DNS
5. Aguarde a propagação (pode demorar algumas horas)

---

## ✅ Passo 7: Deploy Automático Configurado!

**Pronto!** Agora sempre que você fizer `git push`, o Vercel vai fazer deploy automaticamente!

**Teste:**
```bash
cd "c:\Users\rcfm\Documents\pedreirosfc web"
git add .
git commit -m "Teste deploy Vercel"
git push
```

O Vercel vai detectar o push e fazer deploy automaticamente! 🚀

---

## 📋 Resumo das Configurações

| Configuração | Valor |
|--------------|-------|
| **Root Directory** | `web` |
| **Framework** | Next.js |
| **Build Command** | (automático) |
| **Output Directory** | (automático) |
| **Variáveis de Ambiente** | RIOT_API_KEY, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN |

---

## ⚠️ Importante

1. **Não precisa deletar o Netlify agora** - pode deixar lá (não vai fazer deploy, mas não atrapalha)
2. **O Vercel usa a mesma URL do GitHub** - então o deploy automático funciona igual
3. **As variáveis de ambiente** precisam ser adicionadas manualmente (não migram automaticamente do Netlify)

---

## 🎉 Pronto!

Agora seu site está no Vercel com:
- ✅ Deploy automático
- ✅ URL fixa
- ✅ Mais limites no plano gratuito
- ✅ Melhor suporte para Next.js

**Me avise quando terminar cada passo ou se tiver alguma dúvida!** 🚀
