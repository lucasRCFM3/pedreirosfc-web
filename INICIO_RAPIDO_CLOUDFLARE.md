# ⚡ Início Rápido: Cloudflare Tunnel

## ✅ Passo 1: Instalar (JÁ FOI FEITO!)

O Cloudflare Tunnel já foi instalado no seu computador! ✅

**IMPORTANTE:** Feche e abra um **NOVO PowerShell** agora para o comando funcionar!

---

## 🚀 Passo 2: Usar o Tunnel

### Você precisa de DOIS terminais abertos:

#### 📍 Terminal 1 - Inicie o Site:

Abra um PowerShell e rode:
```powershell
cd "C:\Users\rcfm\Documents\pedreirosfc web\web"
npm run dev
```

**Deixe esse terminal rodando!** Você deve ver:
```
▲ Next.js 16.0.6
- Local:        http://localhost:3000
✓ Ready
```

#### 🌐 Terminal 2 - Crie o Tunnel:

Abra **OUTRO PowerShell** (não feche o primeiro!) e rode:

```powershell
cloudflared tunnel --url http://localhost:3000
```

**Deixe esse terminal rodando também!**

---

## 📋 O Que Você Vai Ver:

No Terminal 2, vai aparecer:

```
+----------------------------------------------------------------------------+
|  Your quick Tunnel has been created! Visit it at (it may take some time   |
|  to be reachable):                                                         |
|  https://abc-123-456-def.trycloudflare.com                               |
+----------------------------------------------------------------------------+
```

**Copie essa URL** (a parte `https://abc-123-456-def.trycloudflare.com`) e compartilhe no Discord! 🎉

---

## ⚠️ IMPORTANTE:

- ✅ **Deixe OS DOIS terminais abertos** (site e tunnel)
- ✅ **Não feche nenhum terminal** - se fechar, o site para
- ✅ A URL funciona enquanto os dois estiverem rodando
- ✅ Teste a URL no seu navegador antes de compartilhar

---

## 🎯 Comandos Resumidos:

```powershell
# TERMINAL 1
cd "C:\Users\rcfm\Documents\pedreirosfc web\web"
npm run dev

# TERMINAL 2 (abra outro PowerShell!)
cloudflared tunnel --url http://localhost:3000
```

---

## ✅ Pronto!

Se o comando `cloudflared` não funcionar, **feche e abra um novo PowerShell** - o Windows precisa reiniciar o PATH.

Qualquer dúvida, me avise! 🚀
