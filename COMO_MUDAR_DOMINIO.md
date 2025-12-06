# 🌐 Como Mudar o Domínio do Site

Sim, é possível mudar o domínio! Existem várias opções dependendo do que você quer:

---

## 🎯 Opção 1: Mudar o Nome da URL no Netlify (Mais Simples)

Se você quer apenas uma URL mais curta e personalizada (ainda usando `.netlify.app`):

### Passos:

1. **Acesse o Netlify:**
   - Vá em: https://app.netlify.com
   - Faça login na sua conta

2. **Vá nas configurações do site:**
   - Clique no seu site
   - Vá em **"Site settings"** (no menu superior)

3. **Mude o nome:**
   - Clique em **"Change site name"** (ou "General" → "Site details" → "Change site name")
   - Escolha um nome (ex: `pedreirosfc`)
   - Clique em **"Save"**

4. **Pronto!**
   - Sua nova URL será: `https://pedreirosfc.netlify.app`
   - A URL antiga ainda funciona (redireciona para a nova)

**Vantagens:**
- ✅ Grátis
- ✅ Muito fácil (2 minutos)
- ✅ URL fixa que nunca muda
- ✅ Funciona imediatamente

**Desvantagens:**
- ⚠️ Ainda tem `.netlify.app` no final

---

## 🎯 Opção 2: Adicionar Domínio Customizado no Netlify (Mais Profissional)

Se você quer usar um domínio próprio (ex: `pedreirosfc.com`):

### Passo 1: Comprar/Registrar um Domínio

**Opções Gratuitas:**
- **Freenom** (`.tk`, `.ml`, `.ga`, `.cf`): https://freenom.com
- **No-IP** (subdomínio): https://www.noip.com
- **DuckDNS** (subdomínio): https://www.duckdns.org

**Opções Pagas (mais profissionais):**
- **Namecheap**: https://www.namecheap.com (~R$ 30-50/ano para `.com`)
- **GoDaddy**: https://www.godaddy.com
- **Registro.br**: https://registro.br (para `.com.br`)

### Passo 2: Adicionar o Domínio no Netlify

1. **No Netlify, vá em:**
   - Seu site → **"Site settings"** → **"Domain management"**

2. **Adicione o domínio:**
   - Clique em **"Add custom domain"**
   - Digite seu domínio (ex: `pedreirosfc.com`)
   - Clique em **"Verify"**

3. **Configure o DNS:**
   - O Netlify vai mostrar instruções de DNS
   - Você precisa adicionar registros DNS no seu registrador de domínio:
     - **Tipo:** A ou CNAME
     - **Valor:** O que o Netlify fornecer

4. **Aguarde a propagação:**
   - Pode demorar algumas horas (às vezes minutos)
   - O Netlify vai mostrar quando estiver ativo

**Vantagens:**
- ✅ URL profissional (sem `.netlify.app`)
- ✅ Grátis (se usar domínio gratuito)
- ✅ Funciona com Netlify (deploy automático continua)

**Desvantagens:**
- ⚠️ Requer configurar DNS
- ⚠️ Pode demorar algumas horas para propagar

---

## 🎯 Opção 3: Usar Cloudflare Tunnel com Domínio Próprio

Se você já usa ou quer usar Cloudflare Tunnel (para desenvolvimento local):

### Passos:

1. **Pegue um domínio** (mesmo processo da Opção 2)

2. **Adicione no Cloudflare:**
   - Acesse: https://dash.cloudflare.com
   - Clique em **"Add a Site"**
   - Adicione seu domínio
   - Configure os nameservers

3. **Configure o Tunnel:**
   - Use os scripts que já existem: `criar-tunnel-permanente.ps1`
   - Configure o DNS no Cloudflare para apontar para o tunnel

**Vantagens:**
- ✅ URL 100% fixa
- ✅ Funciona localmente (não precisa fazer deploy)

**Desvantagens:**
- ⚠️ Precisa deixar o PC ligado
- ⚠️ Mais complexo de configurar

**Veja o guia completo:** `URL_100_PORCENTO_FIXA.md`

---

## 📋 Comparação Rápida

| Opção | Dificuldade | Custo | URL | Quando Usar |
|-------|-------------|-------|-----|-------------|
| **Mudar nome Netlify** | ⭐ Fácil | Grátis | `pedreirosfc.netlify.app` | Quer URL mais curta rapidamente |
| **Domínio customizado Netlify** | ⭐⭐ Médio | Grátis/Pago | `pedreirosfc.com` | Quer URL profissional |
| **Cloudflare Tunnel** | ⭐⭐⭐ Difícil | Grátis/Pago | `pedreirosfc.com` | Desenvolvimento local |

---

## 🚀 Recomendação

**Para a maioria dos casos, recomendo a Opção 1:**
- ✅ É a mais fácil
- ✅ Funciona imediatamente
- ✅ URL fixa e estável
- ✅ Sem configuração complexa

**Se você quer algo mais profissional:**
- Use a Opção 2 com um domínio gratuito do Freenom (`.tk`, `.ml`)

---

## ❓ Qual opção você quer usar?

Me diga qual opção você prefere e eu te ajudo passo a passo! 🎯
