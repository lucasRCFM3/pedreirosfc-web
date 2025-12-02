// Configuração das tier lists de Champion Pool por role
// Estrutura: { role: { tier: [championNames] } }

export type Tier = 'splus' | 's' | 'a' | 'b' | 'c';

export interface ChampionPool {
  [role: string]: {
    splus?: string[];
    s?: string[];
    a?: string[];
    b?: string[];
    c?: string[];
  };
}

export const CHAMPION_POOL: ChampionPool = {
  adc: {
    splus: ['Samira', 'Yasuo'],
    s: ['Jinx', 'Yunara', 'Smolder', 'Lucian', 'Ezreal', 'Jhin', 'Sivir'],
    a: ['Xayah', 'Nilah', 'Tristana', 'Twitch', 'Vayne', 'Zeri'],
    b: ['Corki', 'KogMaw', 'Senna'],
    c: ['Varus', 'Draven', 'Caitlyn', 'Ashe', 'Aphelios', 'Kalista', 'MissFortune', 'Ziggs']
  },
  top: {},
  jungle: {},
  mid: {},
  support: {}
};

