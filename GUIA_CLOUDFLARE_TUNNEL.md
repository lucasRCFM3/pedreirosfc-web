# 🚀 Guia Passo a Passo: Cloudflare Tunnel

Guia completo e simples para configurar o Cloudflare Tunnel no Windows.

---

## 📋 Passo 1: Instalar o Cloudflare Tunnel

### Via Winget (Recomendado - Mais Fácil)

Abra o PowerShell e execute:

```powershell
winget install --id Cloudflare.cloudflared
```

**Aguarde a instalação terminar!**

### Verificar se Instalou

Abra um **novo** PowerShell (importante: feche e abra de novo após instalar) e teste:

```powershell
cloudflared --version
```

Se aparecer a versão (tipo `cloudflared 2024.x.x`), está instalado! ✅

---

## 🚀 Passo 2: Usar o Tunnel (Modo Simples - Sem Config)

**Este é o modo mais fácil - não precisa criar conta ou configurar nada!**

### 2.1. Inicie seu site primeiro

Abra um terminal na pasta `web` e inicie o site:

```powershell
cd web
npm run dev
```

**Deixe esse terminal rodando!** O site deve estar em `http://localhost:3000`

Você deve ver algo assim:
```
▲ Next.js 16.0.6
- Local:        http://localhost:3000
✓ Ready in 2.3s
```

### 2.2. Em OUTRO terminal, rode o Cloudflare Tunnel

**IMPORTANTE:** Deixe o primeiro terminal rodando com `npm run dev` e abra um **segundo terminal**.

No segundo terminal, execute:

```powershell
cloudflared tunnel --url http://localhost:3000
```

### 2.3. Copie a URL que aparecer

O Cloudflare vai mostrar algo assim:

```
+----------------------------------------------------------------------------+
|  Your quick Tunnel has been created! Visit it at (it may take some time   |
|  to be reachable):                                                         |
|  https://abc-123-456-789-def.trycloudflare.com                           |
+----------------------------------------------------------------------------+
```

**Copie essa URL completa!** (a parte que começa com `https://`)

### 2.4. Compartilhe no Discord! 🎉

Cole a URL no seu servidor do Discord. Pronto!

---

## 📝 Exemplo Completo do Que Você Vai Ver

### Terminal 1 (Site):
```powershell
PS C:\Users\rcfm\Documents\pedreirosfc web> cd web
PS C:\Users\rcfm\Documents\pedreirosfc web\web> npm run dev

  ▲ Next.js 16.0.6
  - Local:        http://localhost:3000
  ✓ Ready in 2.3s
  [Deixe rodando...]
```

### Terminal 2 (Tunnel):
```powershell
PS C:\Users\rcfm\Documents\pedreirosfc web> cloudflared tunnel --url http://localhost:3000

+----------------------------------------------------------------------------+
|  Your quick Tunnel has been created! Visit it at (it may take some time   |
|  to be reachable):                                                         |
|  https://pedreirosfc-abc123-def456.trycloudflare.com                      |
+----------------------------------------------------------------------------+
  [Deixe rodando também...]
```

### No Discord:
```
🔗 Acesse nosso site: https://pedreirosfc-abc123-def456.trycloudflare.com
```

---

## ⚠️ IMPORTANTE - Para Funcionar

### Você Precisa de DOIS Terminais Rodando:

1. ✅ **Terminal 1:** `npm run dev` (seu site rodando)
2. ✅ **Terminal 2:** `cloudflared tunnel --url http://localhost:3000` (tunnel rodando)

**NÃO FECHE NENHUM DOS DOIS!** Se fechar, para de funcionar.

### Dicas:

- ✅ Deixe os dois terminais abertos
- ✅ A URL funciona enquanto os dois estiverem rodando
- ✅ Se você fechar e abrir de novo, a URL pode mudar (mas às vezes continua a mesma)
- ✅ Teste a URL no navegador antes de compartilhar

---

## 🔧 Comandos Resumidos

```powershell
# 1. Instalar (uma vez só)
winget install --id Cloudflare.cloudflared

# 2. Terminal 1 - Iniciar o site
cd web
npm run dev

# 3. Terminal 2 - Criar o tunnel (em outro terminal!)
cloudflared tunnel --url http://localhost:3000

# 4. Copiar a URL e compartilhar no Discord!
```

---

## 🐛 Problemas Comuns

### "cloudflared não é reconhecido como comando"

- Feche e abra um **novo** PowerShell após instalar
- Ou reinicie o terminal
- Verifique se instalou corretamente: `winget install --id Cloudflare.cloudflared`

### "Connection refused" ou erro de conexão

- Verifique se o site está rodando: abra `http://localhost:3000` no navegador
- Certifique-se de que está na porta 3000
- Verifique se não há outro processo usando a porta 3000

### URL não funciona

- Aguarde alguns segundos após o tunnel iniciar (pode demorar um pouco)
- Verifique se os dois terminais estão rodando
- Teste no navegador primeiro antes de compartilhar

---

## 💡 Dicas Extras

### Ver se está funcionando

1. Abra a URL no seu próprio navegador
2. Se aparecer seu site, está funcionando! ✅
3. Aí você pode compartilhar no Discord com segurança

### Fechou o tunnel e quer abrir de novo?

- Só rode o comando de novo: `cloudflared tunnel --url http://localhost:3000`
- A URL pode ser diferente, mas funciona igual
- Compartilhe a nova URL se ela mudar

### Quer deixar rodando sempre?

- Deixe os dois terminais abertos
- Não feche o PC (ou deixe ele ligado)
- Funciona enquanto estiver rodando!

---

## ✅ Pronto!

É só isso! Super simples, né?

**Resumo:**
1. Instalar: `winget install --id Cloudflare.cloudflared`
2. Terminal 1: `npm run dev`
3. Terminal 2: `cloudflared tunnel --url http://localhost:3000`
4. Copiar URL e compartilhar!

Se precisar de ajuda, me avise! 🚀
