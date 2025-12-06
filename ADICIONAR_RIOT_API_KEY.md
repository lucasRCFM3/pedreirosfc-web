# 🔑 Como Adicionar a Riot API Key no Netlify

## ✅ Passo a Passo

1. **Acesse o Netlify:**
   - Vá em: https://app.netlify.com
   - Faça login na sua conta

2. **Vá nas configurações do site:**
   - Clique no seu site (pedreirosfc-web ou o nome que você escolheu)
   - Clique em **"Site settings"** (no menu superior)

3. **Adicione a variável de ambiente:**
   - No menu lateral, clique em **"Environment variables"**
   - Clique em **"Add a variable"** (ou "Add variable")
   - Preencha:
     - **Key:** `RIOT_API_KEY`
     - **Value:** `RGAPI-96579009-9923-4d83-ba57-f5fd98fe2c0b`
   - Clique em **"Save"**

4. **Faça um novo deploy:**
   - Vá em **"Deploys"** (menu superior)
   - Clique nos **3 pontinhos** (⋮) do último deploy
   - Escolha **"Trigger deploy"** → **"Clear cache and deploy site"**
   - Aguarde o deploy completar (~2-5 minutos)

## ✅ Pronto!

Agora o site vai conseguir buscar os dados da API da Riot!

---

## 📝 Nota Importante

A chave de desenvolvimento da Riot expira a cada **24 horas**. Quando expirar:

1. Acesse: https://developer.riotgames.com/
2. Faça login
3. Copie a nova chave
4. Atualize no Netlify (mesmo processo acima)

---

## 🔍 Verificar se Funcionou

Após o deploy, acesse seu site e:
- Clique em uma role (top, jungle, mid, adc, support)
- Se aparecerem as partidas, está funcionando! ✅
- Se aparecer erro ou "jogador não encontrado", verifique se a chave está correta
