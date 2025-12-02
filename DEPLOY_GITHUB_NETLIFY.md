# 🚀 Deploy via GitHub + Netlify (URL 100% Fixa)

## 🎯 Vantagens

- ✅ **URL 100% fixa:** `pedreirosfc.netlify.app` (nunca muda!)
- ✅ **Grátis**
- ✅ **Deploy automático:** Sempre que você fizer push no GitHub, atualiza automaticamente
- ✅ **Sem configurar domínio:** URL fixa já vem pronta
- ✅ **Fácil de configurar:** Apenas conectar GitHub

---

## 📋 Passo 1: Preparar o Projeto

### 1.1 Criar repositório no GitHub

1. Acesse: https://github.com/new
2. Crie um repositório (ex: `pedreirosfc-web`)
3. **NÃO** inicialize com README (se já tiver código)

### 1.2 Enviar seu código para o GitHub

No terminal, na pasta raiz do projeto:

```powershell
cd "C:\Users\rcfm\Documents\pedreirosfc web"

# Inicializa git se não tiver
git init

# Adiciona todos os arquivos
git add .

# Faz commit
git commit -m "Initial commit"

# Adiciona o repositório remoto (substitua SEU_USUARIO pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU_USUARIO/pedreirosfc-web.git

# Envia para o GitHub
git branch -M main
git push -u origin main
```

**Se pedir login:** Use suas credenciais do GitHub ou configure um token de acesso.

---

## 📋 Passo 2: Configurar no Netlify

### 2.1 Criar conta no Netlify

1. Acesse: https://app.netlify.com/signup
2. Escolha **"Sign up with GitHub"**
3. Autorize o Netlify a acessar seus repositórios

### 2.2 Fazer Deploy

1. No Netlify, clique em **"Add new site"** → **"Import an existing project"**
2. Escolha **"Deploy with GitHub"**
3. Autorize o Netlify a acessar seus repositórios (se pedir)
4. **Selecione o repositório** `pedreirosfc-web`
5. Configure:
   - **Base directory:** `web` (importante!)
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (ou deixe em branco, o Netlify detecta automaticamente)
   - **Node version:** 18 ou superior

### 2.3 Configurar Variáveis de Ambiente

1. Vá em **"Site settings"** → **"Environment variables"**
2. Adicione:
   - **Key:** `RIOT_API_KEY`
   - **Value:** Sua chave da API Riot (começa com `RGAPI-`)
3. Clique em **"Save"**

### 2.4 Configurar para Next.js

1. Vá em **"Site settings"** → **"Build & deploy"**
2. Em **"Build settings"**, clique em **"Edit settings"**
3. Configure:
   - **Base directory:** `web`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `.next` (deixe vazio, Netlify detecta automaticamente para Next.js)

**OU** crie um arquivo `netlify.toml` na pasta `web`:

```toml
[build]
  base = "."
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## ✅ Pronto!

Agora você terá:

- ✅ **URL fixa:** `https://pedreirosfc-web.netlify.app` (ou outro nome)
- ✅ **Deploy automático:** Sempre que você fizer `git push`, o site atualiza
- ✅ **Sempre online:** 24/7, sem precisar deixar PC ligado
- ✅ **Grátis**

---

## 🔄 Atualizar o Site

Sempre que quiser atualizar:

```powershell
cd "C:\Users\rcfm\Documents\pedreirosfc web"
git add .
git commit -m "Atualização"
git push
```

O Netlify vai fazer deploy automaticamente em ~2 minutos!

---

## 🎨 Personalizar URL

Você pode mudar a URL:

1. No Netlify, vá em **"Site settings"** → **"Change site name"**
2. Escolha um nome (ex: `pedreirosfc`)
3. Sua URL será: `https://pedreirosfc.netlify.app`

---

## 📝 Notas Importantes

### Arquivo `.env.local`

O arquivo `.env.local` **NÃO** deve ir para o GitHub (já está no `.gitignore`).

Configure a `RIOT_API_KEY` nas variáveis de ambiente do Netlify (como explicado acima).

### Arquivo `netlify.toml`

Crie o arquivo `web/netlify.toml` com:

```toml
[build]
  base = "."
  command = "npm install && npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Isso garante que o Netlify configure tudo corretamente para Next.js.

---

## ❓ Problemas Comuns

### "Build failed"

- Verifique se a `RIOT_API_KEY` está configurada nas variáveis de ambiente
- Veja os logs do build no Netlify para mais detalhes

### "Site não carrega"

- Aguarde alguns minutos após o deploy
- Verifique os logs no Netlify

### "API routes não funcionam"

- Certifique-se de que o `netlify.toml` está configurado
- Ou instale o plugin Next.js no Netlify

---

**É muito mais fácil que Cloudflare Tunnel!** 🚀

