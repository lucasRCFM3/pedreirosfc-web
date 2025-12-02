# 🔧 Correção: Erro de Build no Netlify

## 🐛 Problema

```
npm error path /opt/build/repo/package.json
npm error errno -2
npm error enoent Could not read package.json
```

**Causa:** O Netlify estava procurando o `package.json` na raiz do repositório, mas ele está na pasta `web/`.

## ✅ Solução Aplicada

Criei um arquivo `netlify.toml` na **raiz do projeto** que configura o Netlify para:

1. ✅ Usar a pasta `web` como base
2. ✅ Executar o build na pasta correta
3. ✅ Publicar a partir de `web/.next`

### Arquivo criado: `netlify.toml`

```toml
[build]
  base = "web"
  command = "npm install && npm run build"
  publish = "web/.next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
```

## 📋 Próximos Passos

1. ✅ Arquivo `netlify.toml` criado na raiz
2. ✅ Arquivo enviado para o GitHub
3. ⏳ **Aguarde o Netlify detectar automaticamente** e refazer o deploy

Ou:

1. No Netlify, vá em **"Deploys"**
2. Clique nos **3 pontinhos** do último deploy
3. Escolha **"Trigger deploy"** → **"Clear cache and deploy site"**

## 🎯 Resultado Esperado

Agora o Netlify vai:
- ✅ Procurar o `package.json` em `web/package.json`
- ✅ Executar o build na pasta `web`
- ✅ Publicar a partir de `web/.next`

**O build deve funcionar agora!** 🚀

