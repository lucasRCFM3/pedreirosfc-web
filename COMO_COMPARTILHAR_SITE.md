# 🌐 Como Compartilhar o Site com Seus Amigos

Existem várias formas de tornar seu site acessível para outras pessoas. Escolha a melhor opção para você:

## Opção 1: Acesso na Rede Local (Rápido para Testes) 🏠

**Melhor para:** Testes rápidos quando vocês estão na mesma rede Wi-Fi ou conectados à mesma rede.

### Passos:

1. **Iniciar o servidor em modo rede local:**
   ```bash
   cd web
   npm run dev:network
   ```
   Ou manualmente:
   ```bash
   cd web
   npm run dev -- -H 0.0.0.0
   ```

2. **Descobrir seu IP local:**
   - **Windows:** Abra o PowerShell e digite:
     ```powershell
     ipconfig
     ```
     Procure por "IPv4 Address" na seção da sua conexão Wi-Fi ou Ethernet. Será algo como `192.168.1.XXX` ou `10.0.0.XXX`.
   
   - **Mac/Linux:** Abra o terminal e digite:
     ```bash
     ifconfig
     ```
     Ou simplesmente:
     ```bash
     ip addr show
     ```

3. **Compartilhar o endereço:**
   - Seu site estará disponível em: `http://SEU_IP:3000`
   - Exemplo: `http://192.168.1.100:3000`
   - Compartilhe esse endereço com seus amigos

**⚠️ Importante:**
- Seus amigos precisam estar na **mesma rede** (mesmo Wi-Fi/router)
- O firewall do Windows pode bloquear a conexão. Se não funcionar, você pode precisar permitir a porta 3000 nas configurações do firewall

---

## Opção 2: Deploy na Vercel (Recomendado - Gratuito e Permanente) 🚀

**Melhor para:** Ter o site sempre online, acessível de qualquer lugar, sem precisar deixar seu computador ligado.

### Passos:

1. **Criar conta na Vercel:**
   - Acesse [https://vercel.com](https://vercel.com)
   - Faça login com GitHub, GitLab ou email

2. **Instalar a CLI da Vercel (opcional, mas recomendado):**
   ```bash
   npm install -g vercel
   ```

3. **Deploy:**
   
   **Opção A - Via CLI (mais rápido):**
   ```bash
   cd web
   vercel
   ```
   Siga as instruções. Na primeira vez, ele vai pedir para fazer login e configurar o projeto.
   
   **Opção B - Via Interface Web:**
   - Acesse [https://vercel.com/new](https://vercel.com/new)
   - Conecte seu repositório GitHub/GitLab
   - Configure o projeto:
     - **Root Directory:** `web`
     - **Build Command:** `npm run build`
     - **Output Directory:** `.next`
     - **Install Command:** `npm install`

4. **Configurar variáveis de ambiente:**
   - Na dashboard da Vercel, vá em Settings > Environment Variables
   - Adicione: `RIOT_API_KEY` com o valor da sua chave

5. **Pronto!**
   - A Vercel vai te dar uma URL tipo: `https://seu-projeto.vercel.app`
   - Compartilhe essa URL com seus amigos!

**✅ Vantagens:**
- Site sempre online
- HTTPS automático
- Deploy automático quando você faz push no GitHub
- Grátis para projetos pessoais

---

## Opção 3: Tunneling com ngrok (Temporário, mas Funciona de Qualquer Lugar) 🌍

**Melhor para:** Testes rápidos quando vocês não estão na mesma rede, ou quando você quer testar sem fazer deploy.

### Passos:

1. **Instalar ngrok:**
   - Baixe em [https://ngrok.com/download](https://ngrok.com/download)
   - Ou via npm:
     ```bash
     npm install -g ngrok
     ```

2. **Criar conta no ngrok (grátis):**
   - Acesse [https://ngrok.com](https://ngrok.com)
   - Crie uma conta e copie seu authtoken

3. **Configurar ngrok:**
   ```bash
   ngrok config add-authtoken SEU_AUTHTOKEN_AQUI
   ```

4. **Iniciar o site normalmente:**
   ```bash
   cd web
   npm run dev
   ```

5. **Em outro terminal, criar o tunnel:**
   ```bash
   ngrok http 3000
   ```
   
6. **Copiar a URL:**
   - O ngrok vai mostrar algo como: `https://abc123.ngrok.io`
   - Compartilhe essa URL com seus amigos

**⚠️ Importante:**
- Na versão gratuita, a URL muda a cada vez que você reinicia o ngrok
- Ideal para testes temporários

---

## Opção 4: Netlify (Alternativa à Vercel) 🌐

Similar à Vercel, também grátis:

1. Acesse [https://netlify.com](https://netlify.com)
2. Faça login
3. Arraste a pasta `web/.next` (após fazer build) ou conecte ao GitHub
4. Configure as variáveis de ambiente
5. Pronto!

---

## Resumo Rápido

| Opção | Quando Usar | Diferença |
|-------|-------------|-----------|
| **Rede Local** | Testes rápidos na mesma casa/rede | Precisa estar na mesma rede |
| **Vercel** | Site permanente online | Melhor opção para produção |
| **ngrok** | Teste rápido de qualquer lugar | Temporário, URL muda |
| **Netlify** | Alternativa à Vercel | Similar à Vercel |

---

## 🔧 Configurar Firewall (Se a Opção 1 não funcionar)

### Windows:
1. Abra "Firewall do Windows Defender"
2. Clique em "Configurações avançadas"
3. Clique em "Regras de entrada" > "Nova regra"
4. Escolha "Porta" > "TCP" > Porta específica: `3000`
5. Permita a conexão
6. Pronto!

---

---

## 💡 Minha Recomendação para Você

Baseado no seu projeto (que usa API routes e precisa de uma chave da Riot API), aqui está minha sugestão:

### 🏆 Para Testes Rápidos HOJE:
**Use a Opção 1 (Rede Local)** - É o mais rápido:
```bash
cd web
npm run dev:network
```
Depois compartilhe seu IP local com seus amigos (eles precisam estar na mesma rede Wi-Fi).

### 🚀 Para Algo Permanente e Sempre Online:
**Use a Opção 2 (Vercel) OU Opção 4 (Netlify)** - Ambos são gratuitos e funcionam perfeitamente com Next.js.

**Importante:** Você vai precisar configurar a variável de ambiente `RIOT_API_KEY` na plataforma escolhida. A chave da Riot expira a cada 24h na versão de desenvolvimento, então você precisará renová-la periodicamente ou solicitar uma chave de produção.

### ⚡ Para Testar Agora Mesmo sem Configurar Nada:
**Use a Opção 3 (ngrok)** - Funciona de qualquer lugar e é super rápido para testes.

---

**TL;DR:** Se seus amigos estão na mesma casa/rede → **Rede Local**. Se quer algo sempre online → **Vercel ou Netlify**.

