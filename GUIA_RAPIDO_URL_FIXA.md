# 🚀 Guia Rápido: URL 100% Fixa em 3 Passos

## 🎯 Passo 1: Pegar Domínio Gratuito (5 minutos)

1. **Acesse:** https://www.freenom.com
2. **Procure um nome:** Digite algo como `pedreirosfc`
3. **Escolha a extensão:** `.tk`, `.ml`, `.ga`, ou `.cf` (todas grátis!)
4. **Complete o registro:**
   - Escolha período de **12 meses** (grátis)
   - Preencha seus dados
   - Confirme o email

**✅ Resultado:** Você terá `pedreirosfc.tk` (ou similar)

---

## 🎯 Passo 2: Adicionar no Cloudflare (10 minutos)

1. **Acesse:** https://dash.cloudflare.com/sign-up
   - Crie conta se não tiver (grátis)

2. **Adicione o site:**
   - Clique em **"Add a Site"**
   - Cole seu domínio: `pedreirosfc.tk`
   - Escolha o plano **FREE** (gratuito)
   - Clique em "Continue"

3. **Copie os Nameservers:**
   - Cloudflare vai mostrar 2 nameservers tipo:
     - `elmer.ns.cloudflare.com`
     - `mira.ns.cloudflare.com`
   - **COPIE esses nomes!**

4. **Atualize no Freenom:**
   - Volte no Freenom
   - Vá em "My Domains" → Seu domínio → "Management Tools" → "Nameservers"
   - Selecione "Use custom nameservers"
   - Cole os 2 nameservers do Cloudflare
   - Salve

5. **Volte no Cloudflare:**
   - Clique em "Continue" ou "Done"
   - Aguarde alguns minutos (pode ser rápido ou demorar até 24h)

---

## 🎯 Passo 3: Configurar o Tunnel (5 minutos)

Agora que você tem uma zone no Cloudflare:

1. **Pressione Ctrl+C** no terminal atual (para cancelar)

2. **Rode o script novamente:**
   ```powershell
   .\criar-tunnel-permanente.ps1
   ```

3. **Quando aparecer a tela de autorização:**
   - Procure por seu domínio `pedreirosfc.tk`
   - Selecione ele
   - Clique em "Authorize" ou similar

4. **O script vai continuar** e criar o túnel!

5. **Configure o DNS:**
   - No Cloudflare Dashboard → DNS
   - Clique em "Add record"
   - Configure:
     - **Type:** CNAME
     - **Name:** @ (ou `www` se quiser)
     - **Target:** `[UUID-DO-TUNEL].cfargotunnel.com`
       - (O UUID aparece no terminal ou você pode ver com: `cloudflared tunnel list`)
     - **Proxy status:** ✅ Proxied (laranja)
   - Salve

---

## ✅ Pronto!

Agora você terá:
- **URL fixa:** `https://pedreirosfc.tk`
- **Nunca muda!**
- **Pode compartilhar no Discord para sempre**

---

## 📝 Comandos Úteis

**Ver seus túneis:**
```powershell
cloudflared tunnel list
```

**Iniciar o túnel:**
```powershell
cloudflared tunnel run pedreirosfc
```

**Ou use o script:**
```powershell
.\iniciar-tunnel-permanente.ps1
```

---

## ❓ Problemas?

### "Nameservers não estão funcionando"
- Aguarde mais tempo (pode demorar até 24h)
- Verifique se colou os nameservers corretamente
- No Cloudflare, vá em "Overview" e veja o status

### "Não consigo encontrar meu domínio na autorização"
- Aguarde a propagação DNS completar
- Verifique no Cloudflare se o domínio está ativo (status verde)

### "Ainda pede zone"
- Certifique-se que o domínio está totalmente configurado no Cloudflare
- Aguarde a propagação DNS

---

**Precisa de ajuda em algum passo? Me avise!** 🚀

