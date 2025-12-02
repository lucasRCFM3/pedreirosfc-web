# ✏️ Composições Editáveis com Sincronização em Tempo Real

A aba de Composições agora permite que **qualquer pessoa edite, crie e remova composições** de forma visual, interativa, fácil e **didática**, com **sincronização em tempo real**!

## ✨ Funcionalidades Implementadas

### ✅ Editor Completo e Didático

- **Editor modal completo** - Abre um editor dedicado para editar TUDO da composição
- **Seções organizadas e expansíveis** - Cada parte da composição em sua própria seção
- **Instruções claras** - Tooltips e ajuda contextual em cada campo
- **Edição completa** - Edite literalmente TUDO:
  - ✅ Informações básicas (título, objetivo)
  - ✅ Campeões (trocar, tipo, função, descrição, alternativas)
  - ✅ Condições de Vitória (Win Conditions)
  - ✅ Fase de Draft (bans, picks, notas)
  - ✅ Estratégias In-Game (macro, rotações, visão)
  - ✅ Early Game (foco e não fazer para cada role)
  - ✅ Mid Game (objetivos, prioridade, teamfight)
  - ✅ Late Game (foco, papel do carry, execução)
  - ✅ Sinergias entre campeões

### ✅ Interface Intuitiva e Didática

- **Banner de instruções** - Explica como usar o editor
- **Seções clicáveis** - Clique para expandir/contrair cada seção
- **Ícones de ajuda** - Cada seção tem um ícone (?) com explicação
- **Campos com dicas** - Placeholders e textos de ajuda explicam o que cada campo faz
- **Visual limpo** - Interface moderna e organizada

### ✅ Sincronização em Tempo Real

- **Salvamento automático** - Salva após 1 segundo sem mudanças
- **Sincronização contínua** - Verifica atualizações a cada 2 segundos
- **Indicador de status** - Mostra se está sincronizado, salvando ou com erro
- **Dados compartilhados** - Todas as mudanças aparecem para todos os usuários instantaneamente

### ✅ Interface Intuitiva

- **Modo de edição** - Clique em "Editar" para entrar no modo de edição
- **Seletor de campeões** - Dropdown com busca para escolher campeões
- **Visual limpo** - Interface moderna e fácil de usar
- **Feedback visual** - Cores e animações indicam ações

## 🎯 Como Usar

### Criar Nova Composição

1. Clique no botão **"Nova Composição"** no topo da página
2. A composição será criada com campeões padrão (Aatrox, Lee Sin, Zed, Jinx, Thresh)
3. Clique em **"Editar"** para começar a personalizar

### Editar Composição Existente

1. Clique no botão **"Editar"** (ícone de lápis ✏️) na composição
2. Um **editor completo** abrirá em um modal
3. **Explore as seções** - Clique nos cabeçalhos para expandir/contrair cada seção
4. **Edite qualquer campo** - Todos os campos são editáveis
5. Use os **ícones de ajuda (?)** para entender o que cada campo significa
6. Clique em **"Salvar"** no topo para salvar todas as mudanças

### Como Usar o Editor Completo

O editor é organizado em seções expansíveis:

1. **Informações Básicas** - Título e objetivo da composição
2. **Campeões** - Edite cada campeão:
   - Clique no campeão para trocá-lo (dropdown com busca)
   - Edite tipo, função e descrição
   - Adicione alternativas de campeões
3. **Condições de Vitória** - Adicione/remova/edite win conditions
4. **Fase de Draft** - Configure bans, picks e notas
5. **Estratégias In-Game** - Macro, rotações e visão
6. **Early Game** - Estratégias para cada role no início
7. **Mid Game** - Objetivos e teamfights
8. **Late Game** - Execução final e papel do carry
9. **Sinergias** - Relacionamentos entre campeões

### Deletar Composição

1. Clique no botão **"Deletar"** (ícone de lixeira vermelho)
2. Confirme a ação
3. A composição será removida imediatamente

## 🔧 Detalhes Técnicos

### API Routes

- **GET `/api/compositions`** - Busca todas as composições
- **POST `/api/compositions`** - Salva composições (recebe array completo)

### Armazenamento

Os dados são salvos em:
```
web/data/compositions.json
```

Este arquivo é criado automaticamente e está no `.gitignore`.

### Sincronização

- **Polling**: Verifica atualizações a cada 2 segundos
- **Debounce**: Salva após 1 segundo sem novas mudanças
- **Resolução de conflitos**: Se você tiver mudanças locais pendentes, o sistema aguarda você salvar antes de puxar atualizações do servidor

## 📊 Indicadores de Status

- 🟢 **Sincronizado** - Tudo certo, dados atualizados
- 🟡 **Sincronizando...** - Salvando mudanças ou verificando atualizações
- 🔴 **Erro ao salvar/sincronizar** - Problema de conexão ou servidor

## ⚠️ Notas Importantes

1. As composições são compartilhadas entre **todos** que acessarem o site
2. Se você fizer deploy na Vercel/Netlify, os dados serão compartilhados entre todos os usuários da versão online
3. Para desenvolvimento local, todos na mesma rede vão compartilhar os mesmos dados
4. Se o servidor reiniciar, os dados do arquivo JSON são preservados (a menos que você delete a pasta `data`)

## 💡 Dicas de Uso

- **Seções expansíveis**: Clique nos cabeçalhos das seções para abrir/fechar
- **Busca de campeões**: Ao trocar um campeão, digite para filtrar a lista
- **Adicionar itens**: Use os botões "+ Adicionar" para adicionar novos itens em listas
- **Remover itens**: Clique no X vermelho ao lado de qualquer item para removê-lo
- **Salvamento automático**: Todas as mudanças são salvas automaticamente
- **Sincronização**: Veja o status no topo - verde = sincronizado

## 🎓 Estrutura da Composição

Cada composição pode ter:

- **5 Campeões** (um por role: Top, Jungle, Mid, ADC, Support)
- **Múltiplas Win Conditions** - Condições que garantem a vitória
- **Draft completo** - Bans recomendados, picks e notas
- **Estratégias In-Game** - Macro, rotações e controle de visão
- **Early/Mid/Late Game** - Estratégias para cada fase do jogo
- **Sinergias** - Combos e relacionamentos entre campeões

Tudo isso pode ser editado de forma fácil e intuitiva no editor completo!

---

**Agora vocês podem trabalhar juntos nas composições em tempo real com um editor completo e didático!** 🎉

