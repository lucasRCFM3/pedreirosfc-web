# Guia: Como Adicionar Novos Campeões

Este guia explica como adicionar um novo campeão ao sistema, incluindo build, runas, stat shards e lanes.

## 📋 Pré-requisitos

- Node.js instalado
- Acesso à internet (para scraping do Mobalytics e Probuilds)

## 🚀 Processo Completo

### Passo 1: Extrair Informações do Campeão

Execute os seguintes scripts na ordem:

#### 1.1. Extrair Build, Runas e Stat Shards (Mobalytics)

```bash
node scripts/fetch-mobalytics-advanced.js [NomeDoCampeao]
```

**Exemplo:**
```bash
node scripts/fetch-mobalytics-advanced.js Kaisa
```

**O que este script extrai:**
- 6 itens principais (Full Build)
- 6 itens situacionais
- 6 runas (keystone + 3 da árvore primária + 2 da árvore secundária)
- Árvore primária e secundária
- 3 stat shards
- Summoner spells

**Saída esperada:**
```
Build encontrada:
Itens: [...]
Itens Situacionais: [...]
Árvore Primária: Precision
Árvore Secundária: Inspiration
Runas: [...]
Stat Shards: [...]
Spells: [...]
```

#### 1.2. Extrair IDs das Runas (para verificar/corrigir ícones)

```bash
node scripts/get-rune-ids.js [NomeDoCampeao]
```

**Exemplo:**
```bash
node scripts/get-rune-ids.js Kaisa
```

**O que este script faz:**
- Extrai os IDs corretos das runas do Mobalytics
- Útil para verificar se os IDs no mapeamento estão corretos

#### 1.3. Extrair Lanes/Roles (Probuilds)

```bash
node scripts/fetch-probuilds-simple.js [NomeDoCampeao]
```

**Exemplo:**
```bash
node scripts/fetch-probuilds-simple.js Kaisa
```

**O que este script extrai:**
- Lista de lanes/roles que o campeão pode jogar (ex: `['adc']`, `['top', 'jungle']`)

**Saída esperada:**
```
Posições disponíveis para Kaisa:
[ 'adc' ]
```

### Passo 2: Verificar/Atualizar IDs das Runas

Se alguma runa não estiver no mapeamento ou tiver ID incorreto:

1. Abra `web/src/lib/runes.ts`
2. Localize a seção `RUNE_ID_MAP`
3. Adicione ou corrija o ID da runa:

```typescript
const RUNE_ID_MAP: Record<string, number> = {
  // ... runas existentes ...
  'Nome da Runa': ID_NUMERO, // Adicione aqui
};
```

**Exemplo:**
```typescript
'Triumph': 9111,
'Legend: Haste': 9105,
```

**Nota:** Os IDs são extraídos do Mobalytics. Use o script `get-rune-ids.js` para obter os IDs corretos.

### Passo 3: Adicionar à Memória

1. Abra `web/src/lib/champion-memory.ts`
2. Adicione o novo campeão no objeto `CHAMPION_MEMORY`:

```typescript
export const CHAMPION_MEMORY: Record<string, ChampionMemory> = {
  // ... campeões existentes ...
  'NomeDoCampeao': {
    roles: ['role1', 'role2'], // Ex: ['adc'], ['top', 'jungle']
    build: {
      items: [
        'Item 1',
        'Item 2',
        // ... 6 itens principais
      ],
      situationalItems: [
        'Item Situacional 1',
        'Item Situacional 2',
        // ... 6 itens situacionais
      ],
      runes: [
        'Keystone',        // Primeira runa (keystone)
        'Runa 2',          // Segunda runa (árvore primária)
        'Runa 3',          // Terceira runa (árvore primária)
        'Runa 4',          // Quarta runa (árvore primária)
        'Runa 5',          // Quinta runa (árvore secundária)
        'Runa 6',          // Sexta runa (árvore secundária)
      ],
      primaryTree: 'Nome da Árvore Primária',    // Ex: 'Precision', 'Sorcery'
      secondaryTree: 'Nome da Árvore Secundária', // Ex: 'Inspiration', 'Resolve'
      statShards: [
        'Stat Shard 1',    // Ex: 'Attack Speed'
        'Stat Shard 2',    // Ex: 'Adaptive Force'
        'Stat Shard 3',    // Ex: 'Health Scaling'
      ],
      summoners: ['Flash', 'Barrier'] // Ou ['Flash', 'Teleport'], etc.
    }
  }
};
```

**Exemplo Completo (Kaisa):**

```typescript
'Kaisa': {
  roles: ['adc'],
  build: {
    items: [
      'Kraken Slayer',
      'Berserker\'s Greaves',
      'Guinsoo\'s Rageblade',
      'Nashor\'s Tooth',
      'Zhonya\'s Hourglass',
      'Rabadon\'s Deathcap'
    ],
    situationalItems: [
      'Terminus',
      'Phantom Dancer',
      'Infinity Edge',
      'Bloodthirster',
      'Shadowflame',
      'Guardian Angel'
    ],
    runes: [
      'Lethal Tempo',
      'Presence of Mind',
      'Legend: Bloodline',
      'Coup de Grace',
      'Magical Footwear',
      'Biscuit Delivery'
    ],
    primaryTree: 'Precision',
    secondaryTree: 'Inspiration',
    statShards: [
      'Attack Speed',
      'Adaptive Force',
      'Health Scaling'
    ],
    summoners: ['Flash', 'Barrier']
  }
}
```

### Passo 4: Verificar

1. **Verificar se não há erros de lint:**
   - O TypeScript deve compilar sem erros
   - Verifique se todos os campos obrigatórios estão preenchidos

2. **Testar no site:**
   - Acesse `/champs/[nome-do-campeao]` (ex: `/champs/kaisa`)
   - Verifique se:
     - Os ícones das runas aparecem corretamente
     - Os ícones dos itens aparecem corretamente
     - Os stat shards aparecem corretamente
     - Os summoner spells aparecem corretamente

## 📝 Notas Importantes

### Nomes dos Campeões

- Use o nome exato como aparece no jogo (ex: "Kaisa", não "Kai'Sa")
- O nome será normalizado automaticamente na URL (ex: "Kaisa" → `/champs/kaisa`)

### Ordem das Runas

**IMPORTANTE:** A ordem das runas deve ser:
1. **Keystone** (primeira runa da árvore primária)
2. **Runa 2** (segunda runa da árvore primária)
3. **Runa 3** (terceira runa da árvore primária)
4. **Runa 4** (quarta runa da árvore primária)
5. **Runa 5** (primeira runa da árvore secundária)
6. **Runa 6** (segunda runa da árvore secundária)

### Stat Shards

- Podem ter duplicatas (ex: 2x Health Scaling)
- Nomes comuns: `'Attack Speed'`, `'Adaptive Force'`, `'Ability Haste'`, `'Health Scaling'`, `'Health'`, `'Armor'`, `'Magic Resist'`

### Summoner Spells

- Nomes válidos: `'Flash'`, `'Barrier'`, `'Teleport'`, `'Heal'`, `'Ignite'`, `'Smite'`, `'Ghost'`, `'Cleanse'`, `'Exhaust'`
- Flash geralmente está presente
- O segundo spell varia por campeão/role

## 🔧 Troubleshooting

### Problema: Ícones das runas não aparecem

**Solução:**
1. Execute `node scripts/get-rune-ids.js [NomeDoCampeao]`
2. Verifique se o ID da runa está correto em `web/src/lib/runes.ts`
3. Adicione ou corrija o ID no `RUNE_ID_MAP`

### Problema: Script não encontra as runas

**Solução:**
1. Verifique se o nome do campeão está correto (exatamente como no Mobalytics)
2. Acesse manualmente: `https://mobalytics.gg/lol/champions/[nome]/build`
3. Se a página não existir, o campeão pode ter nome diferente no Mobalytics

### Problema: Stat shards não aparecem

**Solução:**
1. Verifique se os nomes dos stat shards estão corretos em `STAT_SHARD_ID_MAP` em `web/src/lib/runes.ts`
2. Os IDs dos stat shards são: `5001` (Health/Health Scaling), `5005` (Attack Speed), `5007` (Ability Haste), `5008` (Adaptive Force), etc.

## 📚 Estrutura de Arquivos

```
web/
├── scripts/
│   ├── fetch-mobalytics-advanced.js  # Extrai build, runas, stat shards
│   ├── get-rune-ids.js               # Extrai IDs das runas
│   └── fetch-probuilds-simple.js     # Extrai lanes/roles
├── src/
│   └── lib/
│       ├── champion-memory.ts        # Memória dos campeões
│       └── runes.ts                  # Mapeamento de IDs das runas
└── INSTRUCOES_CAMPEOES.md            # Este arquivo
```

## ✅ Checklist Final

Antes de considerar completo, verifique:

- [ ] Build extraída (6 itens principais + 6 situacionais)
- [ ] Runas extraídas (6 runas na ordem correta)
- [ ] Árvores primária e secundária identificadas
- [ ] Stat shards extraídos (3 stat shards)
- [ ] Summoner spells extraídos
- [ ] Lanes/roles extraídas
- [ ] IDs das runas verificados/corrigidos
- [ ] Campeão adicionado à memória (`champion-memory.ts`)
- [ ] Testado no site (`/champs/[nome]`)
- [ ] Ícones aparecem corretamente

## 🎯 Exemplo Rápido

Para adicionar um novo campeão chamado "Vex":

```bash
# 1. Extrair informações
node scripts/fetch-mobalytics-advanced.js Vex
node scripts/get-rune-ids.js Vex
node scripts/fetch-probuilds-simple.js Vex

# 2. Adicionar à memória (editar champion-memory.ts)
# 3. Verificar IDs das runas (editar runes.ts se necessário)
# 4. Testar no site
```

---

**Última atualização:** Dezembro 2025
**Versão do patch:** 25.23

