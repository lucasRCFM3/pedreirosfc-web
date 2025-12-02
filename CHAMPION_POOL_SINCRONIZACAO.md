# 🔄 Sincronização da Champion Pool

A aba de Champion Pool agora está **sincronizada em tempo real** entre todos os usuários que acessarem o site!

## ✨ O que mudou?

### Antes:
- Cada pessoa tinha sua própria versão salva no `localStorage`
- Mudanças não eram compartilhadas entre usuários

### Agora:
- ✅ Dados salvos no servidor (arquivo `data/champion-pool.json`)
- ✅ Sincronização automática a cada 2 segundos
- ✅ Mudanças aparecem para todos os usuários em tempo real
- ✅ Indicador visual de status de sincronização

## 🎯 Como funciona?

1. **Ao carregar a página:** Os dados são carregados do servidor
2. **Ao fazer mudanças:** As alterações são salvas automaticamente após 1 segundo (debounce)
3. **Sincronização contínua:** A cada 2 segundos, o sistema verifica se há atualizações de outros usuários
4. **Indicador visual:** Você vê se está sincronizado ou se está salvando

## 📊 Indicadores de Status

- 🟢 **Sincronizado** - Tudo certo, dados atualizados
- 🟡 **Sincronizando...** - Salvando mudanças ou verificando atualizações
- 🔴 **Erro ao salvar/sincronizar** - Problema de conexão ou servidor

## 💾 Onde os dados são salvos?

Os dados são salvos em:
```
web/data/champion-pool.json
```

Este arquivo é criado automaticamente e está no `.gitignore`, então não será commitado no git.

## 🔧 Detalhes Técnicos

- **API Route:** `/api/champion-pool`
  - `GET` - Busca os dados atuais
  - `POST` - Salva novos dados
  
- **Polling:** Verifica atualizações a cada 2 segundos
- **Debounce:** Salva após 1 segundo sem novas mudanças
- **Resolução de conflitos:** Se você tiver mudanças locais pendentes, o sistema aguarda você salvar antes de puxar atualizações do servidor

## ⚠️ Notas Importantes

1. Os dados são compartilhados entre **todos** que acessarem o site
2. Se você fizer deploy na Vercel/Netlify, os dados serão compartilhados entre todos os usuários da versão online
3. Para desenvolvimento local, todos na mesma rede vão compartilhar os mesmos dados
4. Se o servidor reiniciar, os dados do arquivo JSON são preservados (a menos que você delete a pasta `data`)

## 🚀 Funcionalidades

- ✅ Drag & drop entre tiers (sincronizado)
- ✅ Remover campeões (sincronizado)
- ✅ Mudar de role (mantém os dados)
- ✅ Filtros por lane
- ✅ Visualização de campeões já na pool

---

**Agora vocês podem trabalhar juntos na champion pool em tempo real!** 🎉

