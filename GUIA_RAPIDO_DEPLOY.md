# ⚡ Guia Rápido: Deploy via GitHub (5 Minutos)

## 🎯 Resumo

1. **Enviar código para GitHub** (2 min)
2. **Conectar no Netlify** (2 min)
3. **Configurar variáveis** (1 min)

**Resultado:** URL fixa que nunca muda! 🚀

---

## 📋 Passo 1: GitHub (2 minutos)

### Criar Repositório

1. Acesse: https://github.com/new
2. Nome: `pedreirosfc-web`
3. Deixe **público** ou **privado** (como preferir)
4. **NÃO** marque "Add README"
5. Clique em **"Create repository"**

### Enviar Código

```powershell
cd "C:\Users\rcfm\Documents\pedreirosfc web"

git init
git add .
git commit -m "Initial commit"

# Substitua SEU_USUARIO pelo seu usuário do GitHub
git remote add origin https://github.com/SEU_USUARIO/pedreirosfc-web.git
git branch -M main
git push -u origin main
```

Se pedir login, use suas credenciais do GitHub.

---

## 📋 Passo 2: Netlify (2 minutos)

1. **Acesse:** https://app.netlify.com/signup
2. **Clique em:** "Sign up with GitHub"
3. **Autorize** o Netlify
4. **Clique em:** "Add new site" → "Import an existing project"
5. **Selecione** seu repositório `pedreirosfc-web`
6. **Configure:**
   - Base directory: `web`
   - Build command: `npm run build`
7. **Clique em:** "Deploy site"

---

## 📋 Passo 3: Variáveis de Ambiente (1 minuto)

1. No Netlify, vá em **"Site settings"**
2. Clique em **"Environment variables"**
3. Adicione:
   - Key: `RIOT_API_KEY`
   - Value: Sua chave da API (começa com `RGAPI-`)
4. Clique em **"Save"**
5. Vá em **"Deploys"** → **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## ✅ Pronto!

Sua URL fixa será: `https://pedreirosfc-web.netlify.app` (ou outro nome)

**Pode mudar o nome em:** Site settings → Change site name

---

## 🔄 Para Atualizar

Sempre que quiser atualizar o site:

```powershell
git add .
git commit -m "Atualização"
git push
```

O Netlify atualiza automaticamente em ~2 minutos!

---

## 💡 Dica

Se quiser uma URL mais curta, no Netlify:
- Site settings → Change site name → `pedreirosfc`
- Sua URL será: `https://pedreirosfc.netlify.app`

---

**Muito mais fácil que Cloudflare Tunnel!** 🎉

