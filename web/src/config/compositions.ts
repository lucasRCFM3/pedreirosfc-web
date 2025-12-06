// Configuração das Composições de Time
export interface ChampionBuild {
  items: string[];
  situationalItems?: string[];
}

export interface CompositionChampion {
  name: string;
  role: 'top' | 'jungle' | 'mid' | 'adc' | 'support';
  type: string;
  function: string;
  description: string;
  build?: ChampionBuild;
  alternatives?: string[];
}

export interface WinCondition {
  id: number;
  title: string;
  details: string;
}

export interface WeakPoint {
  id: number;
  title: string;
  details: string;
}

export interface Composition {
  id: string;
  title: string;
  objective: string;
  champions: CompositionChampion[];
  winConditions: WinCondition[];
  weakPoints: WeakPoint[];
  draft: {
    bans: string[];
    picks: string[];
    notes: string;
  };
  inGame?: {
    macro?: string[];
    rotations?: string[];
    vision?: string[];
  };
  earlyGame: {
    [role: string]: {
      focus: string;
      dontDo: string;
    };
  };
  midGame: {
    objectives: string;
    priority: string;
    teamfight: string;
  };
  lateGame: {
    focus: string;
    jinxRole: string;
    execution: string;
    ifJinxDies: string;
  };
  synergies?: {
    [key: string]: string;
  };
}

export const COMPOSITIONS: Composition[] = [
  {
    id: 'jinx-protect',
    title: 'Escudo de Fúria',
    objective: 'Maximizar a segurança da Jinx e o controle de área, garantindo disengage e peel.',
    champions: [
      {
        name: 'Ornn',
        role: 'top',
        type: 'Tank/Vanguarda',
        function: 'Principal Frontline, Engage Global e Disengage (R). Fornece upgrade de itens para o time (scaling passivo).',
        description: 'Principal Frontline, Engage Global e Disengage (R). Fornece upgrade de itens para o time (scaling passivo).',
        build: {
          items: ['Sunfire Aegis', 'Plated Steelcaps', 'Thornmail', 'Jak\'Sho, The Protean', 'Unending Despair', 'Frozen Heart'],
          situationalItems: ['Kaenic Rookern', 'Randuin\'s Omen', 'Warmog\'s Armor', 'Heartsteel', 'Force of Nature', 'Winter\'s Approach'],
        },
        alternatives: ['Malphite', 'Sion', 'Maokai']
      },
      {
        name: 'Sejuani',
        role: 'jungle',
        type: 'Tank/Vanguarda',
        function: 'Disengage e Lockdown (R). Excelente controle de objetivos. Garante que a Jinx possa atacar com segurança na backline.',
        description: 'Disengage e Lockdown (R). Excelente controle de objetivos. Garante que a Jinx possa atacar com segurança na backline.',
        build: {
          items: ['Heartsteel', 'Plated Steelcaps', 'Unending Despair', 'Thornmail', 'Jak\'Sho, The Protean', 'Frozen Heart'],
          situationalItems: ['Kaenic Rookern', 'Sunfire Aegis', 'Randuin\'s Omen', 'Warmog\'s Armor', 'Knight\'s Vow', 'Hollow Radiance'],
        },
        alternatives: ['Jarvan IV', 'Zac', 'Amumu']
      },
      {
        name: 'Orianna',
        role: 'mid',
        type: 'Mago de Controle',
        function: 'Utility e Teamfight (R). Controla o meio do mapa e fornece um escudo e aceleração cruciais para a Jinx.',
        description: 'Utility e Teamfight (R). Controla o meio do mapa e fornece um escudo e aceleração cruciais para a Jinx.',
        build: {
          items: ['Blackfire Torch', 'Sorcerer\'s Shoes', 'Horizon Focus', 'Zhonya\'s Hourglass', 'Rabadon\'s Deathcap', 'Void Staff'],
          situationalItems: ['Shadowflame', 'Cryptbloom', 'Banshee\'s Veil', 'Morellonomicon', 'Liandry\'s Torment', 'Stormsurge'],
        },
        alternatives: ['Syndra', 'Viktor', 'Anivia']
      },
      {
        name: 'Jinx',
        role: 'adc',
        type: 'Hyper Carry',
        function: 'Carry Principal. Dano massivo no Late Game em Teamfights por meio de ataques básicos em área (Foguetes).',
        description: 'Carry Principal. Dano massivo no Late Game em Teamfights por meio de ataques básicos em área (Foguetes).',
        build: {
          items: ['Yun Tal Wildarrows', 'Berserker\'s Greaves', 'Infinity Edge', 'Runaan\'s Hurricane', 'Lord Dominik\'s Regards', 'Bloodthirster'],
          situationalItems: ['Mortal Reminder', 'Phantom Dancer', 'Guardian Angel', 'Rapid Firecannon', 'Immortal Shieldbow', 'Mercurial Scimitar'],
        },
        alternatives: ['Aphelios', 'Kog\'Maw', 'Tristana']
      },
      {
        name: 'Lulu',
        role: 'support',
        type: 'Encantadora',
        function: 'Peel e Buffs. O melhor Enchanter para a Jinx (Velocidade de Ataque, Escudos, Knockup com o R). Aumenta o DPS da Jinx exponencialmente.',
        description: 'Peel e Buffs. O melhor Enchanter para a Jinx (Velocidade de Ataque, Escudos, Knockup com o R). Aumenta o DPS da Jinx exponencialmente.',
        build: {
          items: ['Dream Maker', 'Ionian Boots of Lucidity', 'Ardent Censer', 'Moonstone Renewer', 'Redemption', 'Vigilant Wardstone'],
          situationalItems: ['Shurelya\'s Battlesong', 'Mikael\'s Blessing', 'Locket of the Iron Solari', 'Staff of Flowing Water', 'Dawncore', 'Morellonomicon'],
        },
        alternatives: ['Janna', 'Nami', 'Milio']
      }
    ],
    winConditions: [
      {
        id: 1,
        title: 'Chegar ao Late Game',
        details: 'A Jinx precisa de 3+ itens (ex: Kraken Slayer, Infinity Edge, Lord Dominik\'s) e a Orianna precisa de 2+ itens. Evite lutas arriscadas no Early/Mid Game (antes dos 20 minutos).'
      },
      {
        id: 2,
        title: '"The Jinx Reset"',
        details: 'Garantir que a Jinx consiga seu primeiro abate ou assistência em uma Teamfight. A passiva Fúria! (Velocidade de Movimento e Ataque) garante que a luta não pare e permite que ela "clean up" (limpe) o time inimigo.'
      },
      {
        id: 3,
        title: 'Controle de Área (Orianna/Sejuani)',
        details: 'Em lutas de objetivos (Barão/Ancião), Orianna e Sejuani devem usar R (Ultimate) para ZONAR os adversários ou forçar o Engage sob o peel de Lulu/Ornn, garantindo um caminho livre para a Jinx causar dano.'
      }
    ],
    weakPoints: [],
    draft: {
      bans: [
        'Pantheon (Jungle/Flex): Prioridade Máxima no 25.23. Ele força pressão early em todas as rotas e pune scaling. Deve ser banido.',
        'Um Assassino/Engage Forte: Zed ou LeBlanc. Campeões que ignoram a Frontline e vão direto na Jinx/Orianna.',
        'Picks que punem Tank/Engage: Ex: Vayne (ADC) ou Fiora (Top). Não podemos dar picks que ignorem nossa Frontline.'
      ],
      picks: [
        'Orianna (Mid): Nosso Blind Pick mais seguro. Ela tem boa laning phase e é o núcleo de utility da composição.',
        'Sejuani (Jungle) e Ornn (Top): Engage de Frontline seguro. Sejuani garante nosso controle de objetivos e Disengage.',
        'Jinx (ADC) e Lulu (Support): Fechar nossa Bot Lane de Hyper Carry. Nunca pickar Jinx antes da Lulu e da Frontline.'
      ],
      notes: 'Nossa composição é previsível (Proteger o Carry). O Draft deve focar em tirar os Picks que punem Scaling e garantindo nossa Frontline.'
    },
    inGame: {
      macro: [
        'Prioridade de Rotação: Dragão > Torres T1 > Barão > Torres T2',
        'Nunca forçar objetivo sem Jinx próxima',
        'Controle de visão: Prioridade na área de dragão/barão',
        'Sejuani e Lulu responsáveis por wards principais',
        'Orianna coloca wards defensivas'
      ],
      rotations: [
        'Quando inverter Top/Bot: Após cair a T1 da bot lane. Jinx move para mid após T1 bot cair.',
        'Quando inverter Mid/Bot: Após 14 minutos (placas caem). Jinx sempre no mid após T1 bot cair.',
        'Orianna pode ir para side lane se necessário, mas sempre manter proximidade para teamfights.',
        'Ornn não deve split push agressivo (é a Frontline do time). Se houver split push, deve ser rápido e com visão.'
      ],
      vision: [
        'Prioridade: Área de dragão/barão',
        'Sejuani e Lulu responsáveis por wards',
        'Orianna coloca wards defensivas',
        'Sempre ter visão antes de forçar objetivos'
      ]
    },
    earlyGame: {
      'Jinx & Lulu (Bot)': {
        focus: 'Farmar. Jinx deve usar o Q (Mini-Gun) para farmar e o W (Zap!) para poke e criar distância. Lulu usa E (Ajuda, Pix!) agressivamente para dar dano e, defensivamente, para proteger a Jinx.',
        dontDo: 'Não jogue agressivamente no 2v2 a menos que o Jungler esteja por perto. Jinx é muito frágil no early. Não forçar all-in sem vantagem clara.'
      },
      'Sejuani (Jungle)': {
        focus: 'Rota de Farm (Acampamentos) e Ganks previsíveis (Mid/Top). Priorizar o Scuttle e o Farm. Proteger bot lane indiretamente.',
        dontDo: 'Não faça Ganks de risco na Bot Lane se não tiver certeza do sucesso. Não invadir jungle inimiga sem visão.'
      },
      'Orianna (Mid)': {
        focus: 'Farmar e controlar a onda. Usar Ball para zoneamento. Estar pronta para rotações.',
        dontDo: 'Não fazer roam sem visão. Não perder farm por roam arriscado.'
      },
      'Ornn (Top)': {
        focus: 'Farmar e usar a passiva para Upgrades no item mítico da Sejuani ou Orianna. Manter pressão sem morrer.',
        dontDo: 'Não Split Push agressivamente, ele é a Frontline do time. Não perder trades desnecessários.'
      }
    },
    midGame: {
      objectives: 'Focar no Dragão da Alma e na conquista das Torres Externas (Tier 1).',
      priority: 'A Jinx deve se mover para o Mid Lane após a torre T1 da Bot Lane cair. Isso permite que ela farme com segurança no meio do mapa, que é mais fácil de proteger.',
      teamfight: 'Orianna: Deve estar constantemente zonando o meio do mapa e buscando pick-offs com a Sejuani (Sejuani R -> Orianna R). Ornn: Deve estar pronto para usar o R para Engage ou Disengage em lutas de Dragão. Primeira Teamfight: Nossas primeiras lutas de 5v5 devem ser em torno do Dragão. O objetivo não é matar todos, mas sim garantir o objetivo, usando o Peel e o Disengage. Execução: Ornn/Sejuani Engage (Ornn R / Sejuani R) ou Disengage para proteger. Orianna usa a Ball na Sejuani/Ornn para o Follow Up R. Lulu usa R e E na Jinx. Jinx inicia o DPS de longe, usa foguetes (Q) para dano em área.'
    },
    lateGame: {
      focus: 'Barão ou Dragão Ancião (Elder Dragon). Executar as Win Conditions.',
      jinxRole: 'Jinx deve estar sempre atrás da Lulu e da Frontline (Ornn/Sejuani). Usar os Foguetes (Q) para causar dano em área, mantendo a distância. Guardar o E (Mordidinhas Flamejantes) para peel contra divers. Usar o R (Super Mega Míssil da Morte!) para finalizar alvos de longe ou dar dano explosivo no início da luta (nota: nerfado no patch 25.23, usar com cuidado). Foco: DPS contínuo. Priorizar alvos mais próximos e seguros. Evitar focar tanks (deixar para o time). Usar foguetes para dano em área.',
      execution: 'Ornn/Sejuani Engage (Ornn R / Sejuani R) ou Disengage para proteger. Orianna usa a Ball na Sejuani/Ornn para o Follow Up R. Lulu usa R e E na Jinx. Jinx inicia o DPS.',
      ifJinxDies: 'O time tem que dar Disengage imediatamente (usando o Disengage de Lulu R, Sejuani R e Ornn R). O dano dos outros Carries não será suficiente para vencer a luta sem ela. Recuar e reagrupar.'
    },
    synergies: {
      'Jinx + Lulu': 'Lulu é o melhor Enchanter para Jinx. W (Polimorfia): Peel contra divers. E (Ajuda, Pix!): Escudos e dano. R (Crescer e Crescer!): Knockup e HP extra. Aumenta o DPS da Jinx exponencialmente.',
      'Orianna + Sejuani': 'Combo: Sejuani R → Orianna R. Controle de área massivo. Pick-offs garantidos.',
      'Ornn + Sejuani': 'Dupla Frontline. Ornn R: Engage global. Sejuani R: Lockdown. Disengage garantido.',
      'Ornn + Orianna': 'Ornn pode receber upgrades de itens. Orianna pode receber upgrades de itens. Scaling passivo do time.'
    }
  },
  {
    id: 'kaisa-engage',
    title: 'Tempestade de Fúria',
    objective: 'Maximizar o potencial de pick-offs e teamfights através de engage coordenado, protegendo a Kaisa para que ela possa evoluir e carregar o late game.',
    champions: [
      {
        name: 'Renekton',
        role: 'top',
        type: 'Fighter/Diver',
        function: 'Frontline e Split Push. Excelente duelo 1v1 e pode criar pressão lateral. W (Ruthless Predator) fornece stun crucial para combos.',
        description: 'Frontline e Split Push. Excelente duelo 1v1 e pode criar pressão lateral. W (Ruthless Predator) fornece stun crucial para combos. Pode fazer split push quando necessário, mas deve estar pronto para TP em teamfights.',
        build: {
          items: ['Eclipse', 'Plated Steelcaps', 'Black Cleaver', 'Sterak\'s Gage', 'Death\'s Dance', 'Spirit Visage'],
          situationalItems: ['Spear of Shojin', 'Maw of Malmortius', 'Stridebreaker', 'Guardian Angel', 'Sundered Sky', 'Thornmail'],
        },
        alternatives: ['Jax', 'Camille', 'Fiora']
      },
      {
        name: 'Ambessa',
        role: 'jungle',
        type: 'Fighter/Assassin',
        function: 'Engage e Pick-offs. Excelente gankador com alta mobilidade e dano. Pode eliminar alvos prioritários rapidamente e criar vantagem numérica.',
        description: 'Engage e Pick-offs. Excelente gankador com alta mobilidade e dano. Pode eliminar alvos prioritários rapidamente e criar vantagem numérica. Prioriza ganks em mid e bot para garantir que Kaisa e Galio fiquem à frente.',
        build: {
          items: ['Eclipse', 'Plated Steelcaps', 'Spear of Shojin', 'Death\'s Dance', 'Sterak\'s Gage', 'Guardian Angel'],
          situationalItems: ['Maw of Malmortius', 'Black Cleaver', 'Serpent\'s Fang', 'Voltaic Cyclosword', 'Chempunk Chainsword', 'Serylda\'s Grudge'],
        },
        alternatives: ['Vi', 'Jarvan IV', 'Lee Sin']
      },
      {
        name: 'Galio',
        role: 'mid',
        type: 'Tank/Mage de Controle',
        function: 'Engage Global e Proteção. R (Hero\'s Entrance) fornece engage global e escudo para aliados. W (Shield of Durand) é crucial para absorver dano mágico e fornecer CC.',
        description: 'Engage Global e Proteção. R (Hero\'s Entrance) fornece engage global e escudo para aliados. W (Shield of Durand) é crucial para absorver dano mágico e fornecer CC. Controla o meio do mapa e está sempre pronto para rotações.',
        build: {
          items: ['Hollow Radiance', 'Mercury\'s Treads', 'Riftmaker', 'Zhonya\'s Hourglass', 'Thornmail', 'Frozen Heart'],
          situationalItems: ['Rabadon\'s Deathcap', 'Liandry\'s Torment', 'Randuin\'s Omen', 'Hextech Rocketbelt', 'Bloodletter\'s Curse', 'Morellonomicon'],
        },
        alternatives: ['Lissandra', 'Vex', 'Malphite']
      },
      {
        name: 'Kaisa',
        role: 'adc',
        type: 'Hyper Carry Híbrido',
        function: 'Carry Principal. Dano híbrido (AD/AP) que escala extremamente bem. Evoluções de habilidades são cruciais. R (Killer Instinct) permite reposicionamento agressivo após engage.',
        description: 'Carry Principal. Dano híbrido (AD/AP) que escala extremamente bem. Evoluções de habilidades são cruciais. R (Killer Instinct) permite reposicionamento agressivo após engage. Deve evoluir Q e E o mais rápido possível para maximizar o dano.',
        build: {
          items: ['Kraken Slayer', 'Berserker\'s Greaves', 'Guinsoo\'s Rageblade', 'Nashor\'s Tooth', 'Zhonya\'s Hourglass', 'Rabadon\'s Deathcap'],
          situationalItems: ['Terminus', 'Phantom Dancer', 'Infinity Edge', 'Bloodthirster', 'Shadowflame', 'Guardian Angel'],
        },
        alternatives: ['Jinx', 'Yunara', 'Zeri']
      },
      {
        name: 'Leona',
        role: 'support',
        type: 'Tank/Engage',
        function: 'Engage e Peel. E (Zenith Blade) + Q (Shield of Daybreak) fornece engage confiável. R (Solar Flare) é excelente para iniciar teamfights ou proteger a Kaisa.',
        description: 'Engage e Peel. E (Zenith Blade) + Q (Shield of Daybreak) fornece engage confiável. R (Solar Flare) é excelente para iniciar teamfights ou proteger a Kaisa. W (Eclipse) fornece resistências cruciais para sobreviver ao engage.',
        build: {
          items: ['Celestial Opposition', 'Plated Steelcaps', 'Locket of the Iron Solari', 'Redemption', 'Knight\'s Vow', 'Vigilant Wardstone'],
          situationalItems: ['Thornmail', 'Kaenic Rookern', 'Zeke\'s Convergence', 'Frozen Heart', 'Randuin\'s Omen', 'Mikael\'s Blessing'],
        },
        alternatives: ['Nautilus', 'Thresh', 'Rell']
      }
    ],
    winConditions: [
      {
        id: 1,
        title: 'Evoluções da Kaisa',
        details: 'Kaisa deve evoluir Q (Icathian Rain) e E (Supercharge) o mais rápido possível. Q evolui com 100 AD, E evolui com 100% Attack Speed. Priorizar farm e participação em kills para acelerar as evoluções.'
      },
      {
        id: 2,
        title: 'Pick-offs Coordenados',
        details: 'Ambessa e Galio devem trabalhar juntos para criar pick-offs. Combo: Ambessa engage → Galio R (Hero\'s Entrance) → Leona follow-up. Isso cria vantagem numérica antes de objetivos importantes.'
      },
      {
        id: 3,
        title: 'Controle de Objetivos',
        details: 'Com a composição de engage, devemos forçar objetivos (Dragão/Barão) quando temos vantagem numérica ou após um pick-off bem-sucedido. Galio R e Leona R são cruciais para iniciar teamfights em objetivos.'
      }
    ],
    weakPoints: [],
    draft: {
      bans: [
        'Campeões com Disengage Forte: Janna, Poppy, Gragas. Eles podem interromper nossos engages coordenados.',
        'Assassinos que punem Kaisa: Zed, LeBlanc, Katarina. Eles podem eliminar Kaisa antes dela evoluir.',
        'ADC com Range Superior: Caitlyn, Varus. Eles podem punir Kaisa no early game antes das evoluções.'
      ],
      picks: [
        'Galio (Mid): Blind pick seguro. Tem boa laning phase e o R global é crucial para a composição.',
        'Ambessa (Jungle) e Leona (Support): Dupla de engage. Ambessa prioriza ganks em mid/bot para garantir que Galio e Kaisa fiquem à frente.',
        'Kaisa (ADC) e Renekton (Top): Fechar a composição. Renekton fornece split push e frontline. Kaisa é o carry principal.'
      ],
      notes: 'Nossa composição é focada em engage e pick-offs. O Draft deve focar em remover disengage e assassinos que punem Kaisa.'
    },
    inGame: {
      macro: [
        'Prioridade de Rotação: Pick-offs > Dragão > Torres T1 > Barão > Torres T2',
        'Forçar objetivos apenas após pick-off ou vantagem numérica',
        'Controle de visão: Prioridade em áreas de rotação (river, jungle)',
        'Ambessa e Leona responsáveis por wards agressivas',
        'Galio coloca wards defensivas no mid'
      ],
      rotations: [
        'Quando inverter Top/Bot: Após cair a T1 da bot lane. Kaisa move para mid após T1 bot cair.',
        'Quando inverter Mid/Bot: Após 14 minutos (placas caem). Kaisa sempre no mid após T1 bot cair.',
        'Renekton pode fazer split push quando temos controle de objetivos. TP sempre pronto para teamfights.',
        'Galio deve estar sempre pronto para rotações com R. Priorizar rotações para bot/top quando Ambessa está próximo.'
      ],
      vision: [
        'Prioridade: Áreas de rotação e jungle',
        'Ambessa e Leona responsáveis por wards agressivas',
        'Galio coloca wards defensivas',
        'Sempre ter visão antes de forçar pick-offs'
      ]
    },
    earlyGame: {
      'Kaisa & Leona (Bot)': {
        focus: 'Farmar e evoluir Q. Kaisa deve priorizar farm para evoluir Q (100 AD) o mais rápido possível. Leona deve procurar oportunidades de engage quando Ambessa está próximo. Usar W (Eclipse) antes de engage para resistências.',
        dontDo: 'Não forçar all-in 2v2 sem vantagem clara ou sem Ambessa próximo. Kaisa é frágil antes das evoluções. Não perder farm por roam arriscado.'
      },
      'Ambessa (Jungle)': {
        focus: 'Ganks em Mid e Bot. Priorizar ganks para garantir que Galio e Kaisa fiquem à frente. Após level 6, coordenar com Galio R para ganks garantidos. Farmar entre ganks.',
        dontDo: 'Não fazer ganks sem visão. Não invadir jungle inimiga sem backup. Não perder tempo em ganks que não têm chance de sucesso.'
      },
      'Galio (Mid)': {
        focus: 'Farmar e controlar a onda. Usar Q (Winds of War) para push e poke. Estar sempre pronto para rotações com R. W (Shield of Durand) para absorver dano mágico.',
        dontDo: 'Não fazer roam sem visão. Não usar R sem coordenação com Ambessa ou Leona. Não perder farm por roam arriscado.'
      },
      'Renekton (Top)': {
        focus: 'Farmar e ganhar lane. Usar W (Ruthless Predator) para stun e trades. Manter pressão sem morrer. TP sempre pronto para teamfights ou objetivos.',
        dontDo: 'Não fazer split push sem visão. Não usar TP sem necessidade. Não perder trades desnecessários.'
      }
    },
    midGame: {
      objectives: 'Focar em pick-offs e depois objetivos. Após Kaisa evoluir Q e E, podemos forçar teamfights. Priorizar Dragão da Alma.',
      priority: 'Kaisa deve se mover para Mid após T1 bot cair. Isso permite que ela farme com segurança e esteja pronta para rotações. Renekton pode fazer split push quando temos controle de objetivos.',
      teamfight: 'Execução: Leona inicia com E+Q ou R. Ambessa segue com engage. Galio usa R em Ambessa ou Leona para follow-up massivo. Renekton pode flanquear ou proteger Kaisa. Kaisa usa R (Killer Instinct) para reposicionar após o engage e começar o DPS. Priorizar alvos que Ambessa e Galio marcaram. Usar E (Supercharge) evoluído para reposicionamento e invisibilidade.'
    },
    lateGame: {
      focus: 'Barão ou Dragão Ancião. Executar as Win Conditions. Kaisa deve estar com todas as evoluções (Q, E, W opcional).',
      jinxRole: 'Kaisa deve estar sempre pronta para usar R (Killer Instinct) após o engage. Usar Q (Icathian Rain) evoluído para dano massivo. E (Supercharge) evoluído para reposicionamento e invisibilidade. W (Void Seeker) evoluído para marcar alvos e reposicionar. Priorizar alvos marcados por Ambessa e Galio. Usar Zhonya\'s quando necessário para sobreviver.',
      execution: 'Leona inicia com R ou E+Q. Ambessa segue com engage. Galio usa R para follow-up massivo. Renekton flanqueia ou protege Kaisa. Kaisa usa R para reposicionar após engage e começar DPS. Coordenar para eliminar alvos prioritários rapidamente.',
      ifJinxDies: 'Se Kaisa morrer, o time deve recuar imediatamente. O dano dos outros não será suficiente sem ela. Usar disengage de Galio W, Leona R e Renekton para recuar. Reagrupar e tentar novamente.'
    },
    synergies: {
      'Ambessa + Galio': 'Combo: Ambessa engage → Galio R (Hero\'s Entrance). Pick-offs garantidos. Galio R fornece escudo e dano em área.',
      'Leona + Ambessa': 'Dupla de engage. Leona inicia com E+Q ou R, Ambessa segue. CC em cadeia garante eliminações.',
      'Galio + Kaisa': 'Galio R fornece escudo para Kaisa. Kaisa pode usar R (Killer Instinct) para seguir o engage de Galio.',
      'Leona + Kaisa': 'Leona fornece engage e peel. Kaisa pode usar R para seguir o engage de Leona. Leona W fornece resistências para ambos.',
      'Renekton + Ambessa': 'Dupla de dano físico. Renekton pode fazer split push enquanto Ambessa cria pressão no mapa. Ambos podem flanquear em teamfights.'
    }
  }
];

