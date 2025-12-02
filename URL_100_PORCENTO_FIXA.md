# 🌐 Como Ter URL 100% Fixa com Cloudflare Tunnel

## 🎯 Objetivo

Ter uma URL que **NUNCA muda**, perfeita para compartilhar no Discord e usar permanentemente.

## 📋 O Que Você Precisa

Para uma URL 100% fixa, você precisa de:

1. ✅ **Um domínio** (mesmo que gratuito/temporário)
2. ✅ **Configurar no Cloudflare**
3. ✅ **Túnel permanente configurado**

## 🆓 Opção 1: Domínio Gratuito (Recomendado)

### Passo 1: Pegar um Domínio Gratuito

**Opção A: Freenom (Domínios .tk, .ml, .ga, .cf)**
1. Acesse: https://freenom.com
2. Crie uma conta (grátis)
3. Procure um nome de domínio (ex: `pedreirosfc.tk`)
4. Adicione ao carrinho e complete o registro
5. **Importante:** Selecione período de 12 meses (é gratuito!)

**Opção B: No-IP (Subdomínio gratuito)**
1. Acesse: https://www.noip.com
2. Crie uma conta
3. Crie um hostname grátis (ex: `pedreirosfc.ddns.net`)

**Opção C: DuckDNS (Subdomínio gratuito)**
1. Acesse: https://www.duckdns.org
2. Crie uma conta
3. Escolha um subdomínio (ex: `pedreirosfc.duckdns.org`)

### Passo 2: Adicionar o Domínio no Cloudflare

1. Acesse: https://dash.cloudflare.com
2. Clique em **"Add a Site"**
3. Cole seu domínio (ex: `pedreirosfc.tk`)
4. Escolha o plano **"Free"** (gratuito)
5. Cloudflare vai escanear os DNS records existentes
6. **Copie os nameservers** que o Cloudflare fornecer
7. Volte no site do domínio (Freenom, etc.) e **atualize os nameservers**
8. Aguarde a propagação (pode demorar algumas horas, mas às vezes é rápido)

### Passo 3: Autorizar o Tunnel

Agora que você tem uma zone no Cloudflare:

1. Volte no terminal e rode novamente:
   ```powershell
   .\criar-tunnel-permanente.ps1
   ```
2. Quando aparecer a tela de autorização, **selecione sua zone**
3. Clique em "Authorize"
4. Pronto! O túnel vai ser criado

### Passo 4: Configurar DNS do Tunnel

Após criar o túnel, você precisa configurar o DNS:

1. No Cloudflare Dashboard, vá em **DNS**
2. Adicione um registro:
   - **Type:** CNAME
   - **Name:** @ (ou www, ou o que você quiser)
   - **Target:** `[UUID-DO-TUNEL].cfargotunnel.com`
   - **Proxy:** ✅ (laranja/proxied)
3. Salve

**Agora sua URL será:** `https://pedreirosfc.tk` (100% fixa!)

---

## 💰 Opção 2: Domínio Pago (Mais Profissional)

Se quiser algo mais profissional:

1. **Compre um domínio:**
   - `.com`, `.net`, `.org` (R$ 30-50/ano)
   - Ou `.xyz`, `.site` (mais baratos, ~R$ 15/ano)
   - Registradores: Namecheap, GoDaddy, Registro.br

2. **Siga os mesmos passos** da Opção 1 (Passos 2-4)

---

## 🔧 Opção 3: Sem Domínio Próprio (Tunnel Temporário Melhorado)

Se não quiser usar domínio próprio, você pode:

1. **Criar um túnel permanente sem zone**
2. A URL será: `https://[nome-tunel]-[random].trycloudflare.com`
3. Essa URL é **muito mais estável** que a temporária
4. Pode durar semanas/meses sem mudar

Mas para isso, você ainda precisa passar pela autorização inicial. Vou criar uma solução alternativa.

---

## ⚡ Solução Rápida: Túnel com Nome Fixo

Vou criar um script que tenta criar um túnel sem precisar autorizar uma zone específica. Mas a forma mais garantida é ter uma zone mesmo.

---

## 📝 Recomendação Final

**Para URL 100% fixa de verdade:**

1. ✅ Pegue um domínio gratuito no Freenom (`.tk`, `.ml`, etc.)
2. ✅ Adicione no Cloudflare
3. ✅ Configure o túnel permanente
4. ✅ Configure o DNS

**Resultado:** `https://pedreirosfc.tk` - URL que nunca muda!

---

## 🚀 Quer que eu te ajude passo a passo?

Me diga qual opção você prefere e eu te guio em cada etapa! 🎯

