# 🚀 Guia Rápido: Túnel Permanente do Cloudflare

## 📋 O Que Você Precisa Fazer

### ✅ Passo 1: Configurar o Túnel (Só Precisa Fazer UMA VEZ)

Abra o PowerShell na pasta `web` e rode:

```powershell
.\criar-tunnel-permanente.ps1
```

**O script vai:**
1. ✅ Verificar se o Cloudflare Tunnel está instalado
2. ✅ Abrir navegador para você fazer login no Cloudflare
3. ✅ Criar o túnel permanente chamado `pedreirosfc`
4. ✅ Configurar tudo automaticamente

**⏱️ Tempo:** ~5 minutos

---

### ✅ Passo 2: Iniciar o Túnel (Sempre Que Quiser Compartilhar)

Quando quiser deixar o site acessível:

**Terminal 1 - Servidor Next.js:**
```powershell
cd web
npm run dev
```

**Terminal 2 - Túnel:**
```powershell
cd web
.\iniciar-tunnel-permanente.ps1
```

**Copie a URL que aparece** e compartilhe no Discord! 🎉

---

## 🎯 Vantagens do Túnel Permanente

- ✅ URL **muito mais estável** (dura semanas/meses)
- ✅ Menos chance de mudar a URL
- ✅ Melhor para compartilhar no Discord
- ✅ Configuração feita uma vez só

---

## ❓ Problemas?

### Erro: "tunnel not found"
Execute primeiro: `.\criar-tunnel-permanente.ps1`

### Erro: "cloudflared não encontrado"
Instale com: `winget install --id Cloudflare.cloudflared`

### A URL ainda muda?
Isso pode acontecer ocasionalmente, mas será muito mais estável que antes!

---

## 📝 Manual (Se Preferir)

Se preferir fazer manualmente, veja: `web/TUNEL_PERMANENTE.md`

---

**Pronto! É só isso!** 🚀

