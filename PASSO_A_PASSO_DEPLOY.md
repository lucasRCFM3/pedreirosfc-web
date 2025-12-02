# 🚀 Passo a Passo Completo: Deploy no Netlify via GitHub

## ✅ Checklist do que vamos fazer:

- [ ] 1. Verificar/criar conta GitHub
- [ ] 2. Configurar Git no projeto
- [ ] 3. Criar repositório no GitHub
- [ ] 4. Enviar código para GitHub
- [ ] 5. Criar conta no Netlify
- [ ] 6. Conectar GitHub no Netlify
- [ ] 7. Configurar deploy
- [ ] 8. Adicionar variáveis de ambiente
- [ ] 9. Testar o site!

---

## 📋 PASSO 1: Verificar Conta GitHub

**Você já tem conta no GitHub?**

- ✅ **SIM** → Vá para o Passo 2
- ❌ **NÃO** → Crie agora:
  1. Acesse: https://github.com/signup
  2. Escolha um nome de usuário
  3. Digite seu email
  4. Crie uma senha
  5. Complete o registro (pode pedir verificação de email)

**Anote seu nome de usuário do GitHub aqui:** _______________

---

## 📋 PASSO 2: Configurar Git (Se Precisar)

Vamos verificar se o Git já está configurado:

```powershell
git config user.name
git config user.email
```

**Se não aparecer nada ou aparecer erro:**

Configure seu Git:

```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

**Substitua** pelos seus dados reais!

---

## 📋 PASSO 3: Criar Repositório no GitHub

1. **Acesse:** https://github.com/new
2. **Preencha:**
   - **Repository name:** `pedreirosfc-web`
   - **Description:** (opcional) Site do PedreirosFC
   - **Visibility:** Escolha **Public** ou **Private** (como preferir)
   - **NÃO marque** "Add a README file"
   - **NÃO marque** "Add .gitignore"
   - **NÃO marque** "Choose a license"
3. **Clique em:** "Create repository"

**Anote a URL do seu repositório:** `https://github.com/SEU_USUARIO/pedreirosfc-web`

---

## 📋 PASSO 4: Enviar Código para GitHub

Agora vamos enviar seu código. No terminal, na pasta do projeto:

```powershell
cd "C:\Users\rcfm\Documents\pedreirosfc web"
```

**Agora vamos verificar e enviar:**

### 4.1 Verificar se já tem Git inicializado

Se aparecer erro ou "not a git repository", inicialize:

```powershell
git init
```

### 4.2 Adicionar todos os arquivos

```powershell
git add .
```

### 4.3 Fazer o primeiro commit

```powershell
git commit -m "Initial commit: PedreirosFC Web"
```

### 4.4 Adicionar o repositório remoto

**Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub:**

```powershell
git remote add origin https://github.com/SEU_USUARIO/pedreirosfc-web.git
```

### 4.5 Enviar para o GitHub

```powershell
git branch -M main
git push -u origin main
```

**Se pedir login:**
- **Usuário:** Seu nome de usuário do GitHub
- **Senha:** Use um **Personal Access Token** (veja abaixo)

### ⚠️ Se Pedir Senha

GitHub não aceita mais senha normal. Você precisa criar um **Personal Access Token**:

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token (classic)"**
3. Dê um nome (ex: "netlify-deploy")
4. Marque a opção **"repo"** (todas as permissões de repositório)
5. Clique em **"Generate token"**
6. **COPIE o token** (você só vai ver uma vez!)
7. Use esse token como senha no terminal

---

## 📋 PASSO 5: Criar Conta no Netlify

1. **Acesse:** https://app.netlify.com/signup
2. **Clique em:** "Sign up with GitHub"
3. **Autorize** o Netlify a acessar seus repositórios
4. Complete o registro se necessário

---

## 📋 PASSO 6: Fazer Deploy no Netlify

### 6.1 Importar Projeto

1. No Netlify, clique em **"Add new site"**
2. Escolha **"Import an existing project"**
3. Clique em **"Deploy with GitHub"**
4. Autorize se pedir
5. **Selecione o repositório:** `pedreirosfc-web`

### 6.2 Configurar Build

Configure assim:

- **Base directory:** `web`
- **Build command:** `npm install && npm run build`
- **Publish directory:** (deixe vazio - Netlify detecta automaticamente)

**OU** clique em **"Show advanced"** e configure:
- **Base directory:** `web`
- **Build command:** `npm install && npm run build`
- **Publish directory:** `.next`

### 6.3 Deploy!

1. Clique em **"Deploy site"**
2. Aguarde alguns minutos...

---

## 📋 PASSO 7: Configurar Variáveis de Ambiente

### 7.1 Adicionar RIOT_API_KEY

1. No Netlify, vá em **"Site settings"**
2. Clique em **"Environment variables"** (no menu lateral)
3. Clique em **"Add a variable"**
4. Preencha:
   - **Key:** `RIOT_API_KEY`
   - **Value:** Sua chave da API Riot (começa com `RGAPI-`)
5. Clique em **"Save"**

### 7.2 Fazer Deploy Novamente

1. Vá em **"Deploys"** (no menu superior)
2. Clique nos **3 pontinhos** do último deploy
3. Escolha **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## 📋 PASSO 8: Testar!

1. Aguarde o deploy completar (vai aparecer "Published" verde)
2. Clique no link do seu site (algo como `pedreirosfc-web.netlify.app`)
3. Teste se está funcionando!

---

## 🎉 Pronto!

Agora você tem:
- ✅ URL fixa que nunca muda
- ✅ Deploy automático (sempre que fizer `git push`)
- ✅ Site sempre online (24/7)

---

## 🔄 Para Atualizar o Site Depois

Sempre que quiser atualizar:

```powershell
cd "C:\Users\rcfm\Documents\pedreirosfc web"
git add .
git commit -m "Atualização: [descreva o que mudou]"
git push
```

O Netlify atualiza automaticamente em ~2 minutos!

---

## 💡 Mudar o Nome da URL

1. No Netlify, vá em **"Site settings"**
2. Clique em **"Change site name"**
3. Escolha um nome (ex: `pedreirosfc`)
4. Sua URL será: `https://pedreirosfc.netlify.app`

---

## ❓ Problemas?

Me avise em qualquer passo se tiver dúvida ou erro! 🚀

