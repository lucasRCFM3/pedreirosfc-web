# 🚀 Configurar Deploy no Netlify - Passo a Passo

## ✅ Passo 6: Configurar Build no Netlify

Depois de selecionar o repositório `pedreirosfc-web`, configure assim:

### ⚙️ Configurações de Build:

1. **Base directory:** 
   - Clique em **"Show advanced"** ou **"Change settings"**
   - Digite: `web`

2. **Build command:**
   - Digite: `npm install && npm run build`

3. **Publish directory:**
   - Deixe **VAZIO** (Netlify detecta automaticamente para Next.js)

### Ou configure manualmente:

- **Base directory:** `web`
- **Build command:** `npm install && npm run build`  
- **Publish directory:** (vazio)

---

## ✅ Passo 7: Fazer Deploy

1. Clique em **"Deploy site"**
2. Aguarde alguns minutos enquanto o Netlify:
   - Instala as dependências
   - Faz o build do projeto
   - Faz o deploy

**Você verá os logs do build em tempo real!**

---

## ✅ Passo 8: Adicionar Variáveis de Ambiente

**IMPORTANTE:** Você precisa adicionar sua chave da API Riot!

1. Após o deploy iniciar, vá em **"Site settings"** (no menu superior)
2. Clique em **"Environment variables"** (no menu lateral)
3. Clique em **"Add a variable"**
4. Preencha:
   - **Key:** `RIOT_API_KEY`
   - **Value:** Sua chave da API Riot (começa com `RGAPI-`)
5. Clique em **"Save"**

### Após adicionar a variável:

1. Vá em **"Deploys"** (menu superior)
2. Clique nos **3 pontinhos** (⋮) do último deploy
3. Escolha **"Trigger deploy"** → **"Clear cache and deploy site"**
4. Aguarde o novo deploy completar

---

## ✅ Passo 9: Testar!

1. Aguarde o deploy completar (vai aparecer "Published" verde)
2. Clique no link do seu site (algo como `pedreirosfc-web-xyz123.netlify.app`)
3. Teste se está funcionando!

---

## 🎉 Pronto!

Agora você tem:
- ✅ URL fixa que nunca muda
- ✅ Deploy automático (sempre que fizer `git push`)
- ✅ Site sempre online (24/7)

---

## 💡 Mudar o Nome da URL

1. No Netlify, vá em **"Site settings"**
2. Clique em **"Change site name"**
3. Escolha um nome (ex: `pedreirosfc`)
4. Sua URL será: `https://pedreirosfc.netlify.app`

---

**Me avise quando terminar cada passo!** 🚀

