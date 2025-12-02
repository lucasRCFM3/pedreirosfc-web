# 🚀 Configurar Túnel Permanente do Cloudflare (URL Fixa)

Este guia vai te ajudar a configurar um túnel permanente do Cloudflare que mantém a mesma URL por muito tempo, ideal para compartilhar no Discord.

---

## 📋 Pré-requisitos

- ✅ Cloudflare Tunnel instalado (já temos isso!)
- ✅ Conta no Cloudflare (grátis - vamos criar se não tiver)

---

## 🎯 Passo 1: Fazer Login no Cloudflare

Abra o PowerShell na pasta `web` e rode:

```powershell
cloudflared tunnel login
```

**O que vai acontecer:**
1. Vai abrir seu navegador automaticamente
2. Vai pedir para você fazer login na Cloudflare (ou criar conta se não tiver)
3. Vai pedir para autorizar o acesso
4. Após autorizar, volta para o terminal

**✅ Quando terminar:** Você verá uma mensagem de sucesso no terminal.

---

## 🎯 Passo 2: Criar o Túnel Permanente

Crie um túnel com um nome fixo:

```powershell
cloudflared tunnel create pedreirosfc
```

**O que acontece:**
- ✅ Cria um túnel chamado `pedreirosfc`
- ✅ Gera um arquivo de credenciais (guardado automaticamente)
- ✅ Mostra o UUID do túnel (guarde isso!)

**✅ Você verá algo como:**
```
Tunnel pedreirosfc created with ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

---

## 🎯 Passo 3: Configurar o Túnel

O Cloudflare vai criar automaticamente uma pasta `.cloudflared` no seu perfil do usuário.

**Localização:** `C:\Users\[SEU_USUARIO]\.cloudflared\`

Vamos criar o arquivo de configuração:

```powershell
# Navegue para a pasta
cd $env:USERPROFILE\.cloudflared

# Crie o arquivo de configuração
New-Item -ItemType File -Name "config.yml" -Force
```

Agora vamos editar o arquivo. **Substitua `[UUID_DO_TUNEL]` pelo UUID que você viu no passo anterior:**

```yaml
tunnel: pedreirosfc
credentials-file: C:\Users\[SEU_USUARIO]\.cloudflared\[UUID_DO_TUNEL].json

ingress:
  - service: http://localhost:3000
```

**📝 Exemplo:**
```yaml
tunnel: pedreirosfc
credentials-file: C:\Users\rcfm\.cloudflared\a1b2c3d4-e5f6-7890-abcd-ef1234567890.json

ingress:
  - service: http://localhost:3000
```

---

## 🎯 Passo 4: Rodar o Túnel

Agora você pode rodar o túnel permanente:

```powershell
cloudflared tunnel run pedreirosfc
```

**O que acontece:**
- ✅ Conecta ao túnel permanente
- ✅ Mostra uma URL do tipo: `https://pedreirosfc-[random].trycloudflare.com`
- ✅ Esta URL será **mais estável** que as URLs temporárias

**🎉 Parabéns!** Agora você tem um túnel permanente!

---

## 🔄 Como Usar no Dia a Dia

### Iniciar o Túnel:

1. **Certifique-se que o servidor Next.js está rodando:**
   ```powershell
   cd web
   npm run dev
   ```

2. **Em outro terminal, inicie o túnel:**
   ```powershell
   cloudflared tunnel run pedreirosfc
   ```

3. **Copie a URL que aparece** e compartilhe no Discord!

### A URL vai mudar?

- ⚠️ A URL ainda pode mudar ocasionalmente
- ✅ Mas será **muito mais estável** que o modo temporário
- ✅ Geralmente dura semanas/meses
- ✅ Melhor para compartilhar no Discord

---

## 🚀 Tornar Ainda Mais Automático (Opcional)

### Criar Script para Iniciar Tudo

Vou criar um script que inicia o servidor e o túnel juntos! Fica mais fácil.

---

## 📝 Notas Importantes

### A URL Ainda Não É 100% Fixa

Para uma URL **100% fixa** que nunca muda, você precisaria:

1. **Ter um domínio próprio** (ex: `pedreirosfc.xyz` - ~R$15/ano)
2. **Configurar DNS na Cloudflare**
3. **Apontar o domínio para o túnel**

Mas o túnel permanente já é **muito melhor** que o temporário!

---

## ❓ Problemas Comuns

### Erro: "tunnel not found"
- Verifique se você criou o túnel com `cloudflared tunnel create pedreirosfc`
- Verifique se o nome está correto no comando `run`

### Erro: "credentials file not found"
- Verifique o caminho do arquivo `.json` no `config.yml`
- O arquivo deve estar em `C:\Users\[SEU_USUARIO]\.cloudflared\`

### A URL ainda muda
- Isso pode acontecer ocasionalmente
- Mas será muito mais estável que antes
- Para URL 100% fixa, precisa de domínio próprio

---

## 🎯 Próximos Passos

1. ✅ Seguir este guia passo a passo
2. ✅ Compartilhar a URL no Discord
3. ✅ Deixar o túnel rodando sempre que quiser o site acessível

**Quer ajuda em algum passo específico? Me avise!** 🚀

