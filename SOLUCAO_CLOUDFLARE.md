# 🔧 Solução: Cloudflare Tunnel Não Funciona

## ⚡ Solução Rápida

O `cloudflared` está instalado, mas o PowerShell não encontrou ele. Use uma dessas opções:

### Opção 1: Usar o Caminho Completo (Mais Rápido)

No PowerShell, rode:

```powershell
& "$env:LOCALAPPDATA\Microsoft\WinGet\Links\cloudflared.exe" tunnel --url http://localhost:3000
```

Isso vai funcionar direto! ✅

---

### Opção 2: Atualizar o PATH e Depois Usar

No PowerShell, rode:

```powershell
$env:Path += ";$env:LOCALAPPDATA\Microsoft\WinGet\Links"
cloudflared tunnel --url http://localhost:3000
```

---

### Opção 3: Usar o Script (Mais Fácil)

Criei um script para facilitar! Na pasta `web`, rode:

```powershell
cd web
.\iniciar-tunnel.ps1
```

---

## 🎯 Como Usar Agora (Passo a Passo)

### 1. Terminal 1 - Iniciar o Site:

```powershell
cd "C:\Users\rcfm\Documents\pedreirosfc web\web"
npm run dev
```

**Deixe rodando!**

### 2. Terminal 2 - Iniciar o Tunnel:

Use o caminho completo:

```powershell
& "$env:LOCALAPPDATA\Microsoft\WinGet\Links\cloudflared.exe" tunnel --url http://localhost:3000
```

Ou atualize o PATH primeiro:

```powershell
$env:Path += ";$env:LOCALAPPDATA\Microsoft\WinGet\Links"
cloudflared tunnel --url http://localhost:3000
```

**Deixe rodando também!**

### 3. Copiar a URL

Vai aparecer algo assim:

```
https://abc-123-456.trycloudflare.com
```

Copie e compartilhe no Discord! 🎉

---

## 💡 Dica: Criar um Atalho

Se você vai usar sempre, pode criar um arquivo `.ps1` para facilitar:

Crie `iniciar-tunnel.ps1` na pasta raiz do projeto:

```powershell
$env:Path += ";$env:LOCALAPPDATA\Microsoft\WinGet\Links"
cloudflared tunnel --url http://localhost:3000
```

Depois é só rodar: `.\iniciar-tunnel.ps1`

---

## ✅ Teste Rápido

Para testar se funciona, rode:

```powershell
& "$env:LOCALAPPDATA\Microsoft\WinGet\Links\cloudflared.exe" --version
```

Se mostrar a versão, está funcionando! ✅

---

**Use a Opção 1 (caminho completo) que é a mais rápida!** 🚀

