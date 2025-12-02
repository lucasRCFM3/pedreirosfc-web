# Bem-vindo ao PedreirosFC Web!

Seu site está quase pronto. Siga estes passos para colocá-lo no ar:

## 1. Configurar a Riot API Key
Para buscar os dados das partidas, você precisa de uma chave de API da Riot.
1. Acesse [https://developer.riotgames.com/](https://developer.riotgames.com/) e faça login com sua conta Riot.
2. Copie a chave que aparece em "Development API Key" (começa com `RGAPI-`).
3. Crie um arquivo chamado `.env.local` dentro da pasta `web`.
4. Cole sua chave lá assim:

```bash
RIOT_API_KEY=RGAPI-sua-chave-aqui-copie-e-cole
```

**Nota:** Essa chave expira a cada 24h. Para um site permanente no futuro, você precisará solicitar uma chave de produção ou renovar essa diariamente enquanto desenvolve.

## 2. Configurar os Jogadores
Edite o arquivo `web/src/config/team.ts` para colocar os nomes corretos do seu time.

```typescript
export const TEAM_MEMBERS = {
  top: { gameName: "SeuNickTop", tagLine: "BR1" },
  jungle: { gameName: "SeuNickJg", tagLine: "BR1" },
  // ...
};
```

## 3. Rodar o Site
Abra o terminal na pasta `web` e rode:

```bash
cd web
npm run dev
```

O site estará disponível em [http://localhost:3000](http://localhost:3000).

---

## Estrutura
- **Cores:** As cores estão configuradas como `pedreiro-purple`, `pedreiro-blue` e `pedreiro-dark`.
- **Sidebar:** Navegação lateral com ícones para cada rota.
- **Dados:** Ao clicar na rota, o site busca automaticamente as últimas 20 partidas e calcula o farm.

