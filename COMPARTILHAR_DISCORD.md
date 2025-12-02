# 🔗 Como Compartilhar o Site com seu Servidor do Discord

Para compartilhar o site apenas com seu servidor do Discord, aqui estão as melhores opções:

## 🏆 Opção 1: Cloudflare Tunnel (Recomendado - Gratuito e URL Fixa)

**Melhor para:** Compartilhar de forma permanente com URL fixa que não muda.

### Por que Cloudflare Tunnel?
- ✅ **Gratuito e ilimitado**
- ✅ **URL fixa** (não muda como ngrok)
- ✅ **HTTPS automático**
- ✅ **Funciona de qualquer lugar**
- ✅ **Privado** (só quem tem o link acessa)

### Passos:

1. **Instalar Cloudflare Tunnel:**
   - Baixe em [https://github.com/cloudflare/cloudflared/releases](https://github.com/cloudflare/cloudflared/releases)
   - Ou via Chocolatey (Windows):
     ```powershell
     choco install cloudflared
     ```
   - Ou via Winget:
     ```powershell
     winget install --id Cloudflare.cloudflared
     ```

2. **Criar conta no Cloudflare (gratuita):**
   - Acesse [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
   - Faça login com email (grátis)

3. **Autenticar:**
   ```powershell
   cloudflared tunnel login
   ```
   - Isso vai abrir o navegador para você autorizar

4. **Criar um tunnel:**
   ```powershell
   cloudflared tunnel create pedreirosfc
   ```
   - Isso cria um tunnel chamado "pedreirosfc"

5. **Criar arquivo de configuração:**
   
   Crie um arquivo `config.yml` na sua pasta home (ex: `C:\Users\rcfm\.cloudflared\config.yml`):
   ```yaml
   tunnel: pedreirosfc
   credentials-file: C:\Users\rcfm\.cloudflared\<ID_DO_TUNNEL>.json

   ingress:
     - hostname: pedreirosfc.your-subdomain.trycloudflare.com
       service: http://localhost:3000
     - service: http_status:404
   ```

6. **Iniciar o tunnel:**
   ```powershell
   cloudflared tunnel --config config.yml run pedreirosfc
   ```
   
   Ou mais simples (sem config):
   ```powershell
   cloudflared tunnel --url http://localhost:3000
   ```

7. **Compartilhar a URL:**
   - O Cloudflare vai mostrar uma URL tipo: `https://abc-123-456.trycloudflare.com`
   - Compartilhe essa URL no seu Discord!

**Nota:** A URL do `trycloudflare.com` é temporária (dura enquanto o tunnel estiver ativo). Para uma URL permanente, você precisa configurar um domínio no Cloudflare.

---

## 🚀 Opção 2: Deploy na Vercel com Preview (Gratuito e Permanente)

**Melhor para:** Ter o site sempre online, mas ainda controlar quem acessa.

### Passos:

1. **Deploy na Vercel:**
   ```bash
   cd web
   npm install -g vercel
   vercel
   ```
   
   Ou pela interface web:
   - Acesse [https://vercel.com/new](https://vercel.com/new)
   - Conecte seu repositório GitHub/GitLab
   - Configure o projeto

2. **Configurar Preview Deployment:**
   - A Vercel te dá uma URL tipo: `https://pedreirosfc-web-abc123.vercel.app`
   - Você pode compartilhar essa URL no Discord

3. **Opcional - Adicionar proteção por senha:**
   - Vercel não tem proteção nativa, mas você pode:
     - Usar branches diferentes para público/privado
     - Compartilhar só a URL do preview deployment
     - Configurar autenticação customizada (mais complexo)

**Vantagens:**
- ✅ Site sempre online
- ✅ HTTPS automático
- ✅ Deploy automático quando você faz push no GitHub
- ✅ URL permanente
- ✅ Grátis

---

## ⚡ Opção 3: ngrok (Rápido e Simples)

**Melhor para:** Testes rápidos quando você quer testar algo agora mesmo.

### Passos:

1. **Instalar ngrok:**
   ```powershell
   winget install ngrok
   ```
   Ou baixe em [https://ngrok.com/download](https://ngrok.com/download)

2. **Criar conta (grátis):**
   - Acesse [https://ngrok.com](https://ngrok.com)
   - Crie uma conta e copie seu authtoken

3. **Configurar:**
   ```powershell
   ngrok config add-authtoken SEU_TOKEN_AQUI
   ```

4. **Iniciar o site:**
   ```bash
   cd web
   npm run dev
   ```

5. **Em outro terminal, criar o tunnel:**
   ```powershell
   ngrok http 3000
   ```

6. **Compartilhar:**
   - Vai aparecer algo como: `https://abc123.ngrok.io`
   - Compartilhe essa URL no Discord!

**⚠️ Importante:**
- Na versão gratuita, a URL muda a cada vez que você reinicia o ngrok
- Ideal para testes temporários

---

## 🔐 Opção 4: Deploy com Autenticação Básica

**Melhor para:** Ter controle total sobre quem acessa, mesmo com deploy público.

Você pode adicionar uma senha simples ao site usando middleware do Next.js ou uma solução externa.

### Exemplo rápido com middleware:

1. **Criar arquivo `web/middleware.ts`:**
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const basicAuth = process.env.BASIC_AUTH || 'pedreirosfc:senha123';

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Autenticação necessária', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="PedreirosFC"',
      },
    });
  }

  const encoded = authHeader.replace('Basic ', '');
  const decoded = Buffer.from(encoded, 'base64').toString('utf-8');

  if (decoded !== basicAuth) {
    return new NextResponse('Senha incorreta', { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
```

2. **Adicionar senha no `.env.local`:**
```
BASIC_AUTH=usuario:senha
```

3. **Fazer deploy na Vercel** com essa variável de ambiente

---

## 📊 Comparação Rápida

| Opção | URL Fixa? | Gratuito? | Complexidade | Quando Usar |
|-------|-----------|-----------|--------------|-------------|
| **Cloudflare Tunnel** | ✅ Sim (com domínio) | ✅ Sim | Média | Uso contínuo, URL fixa |
| **Vercel Deploy** | ✅ Sim | ✅ Sim | Baixa | Sempre online, permanente |
| **ngrok** | ❌ Não (gratuito) | ✅ Sim | Baixa | Testes rápidos |
| **Auth Básica** | ✅ Sim | ✅ Sim | Alta | Controle total de acesso |

---

## 💡 Minha Recomendação para Discord

### Para começar rápido hoje:
**Use ngrok** - É o mais rápido para testar agora mesmo:
```powershell
cd web
npm run dev
# Em outro terminal:
ngrok http 3000
```
Compartilhe a URL no Discord e pronto!

### Para uso contínuo:
**Use Cloudflare Tunnel** - URL mais estável e funciona bem:
```powershell
cloudflared tunnel --url http://localhost:3000
```
Compartilhe a URL no Discord.

### Para sempre online:
**Use Vercel** - Deploy permanente, site sempre no ar:
- Faça deploy na Vercel
- Compartilhe a URL no Discord
- O site fica sempre online, mesmo com seu PC desligado

---

## 🔒 Segurança

**Importante:** Todas essas opções tornam o site acessível para quem tiver o link. Para restringir acesso:

1. **Não compartilhe o link publicamente**
2. **Use autenticação básica** (Opção 4)
3. **Configure IP whitelist** (avançado, requer servidor próprio)
4. **Use branches diferentes** (público/privado no Git)

Para um servidor do Discord privado, geralmente basta **não compartilhar o link fora do servidor**. Se quiser mais segurança, use a Opção 4 (Autenticação Básica).

---

**Qual você prefere testar primeiro?** 🚀

