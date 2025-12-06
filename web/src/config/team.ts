export const TEAM_MEMBERS = {
  top: { gameName: "ShivaEspalhaLixo", tagLine: "shiva", region: "BR1" },
  jungle: { gameName: "sushi", tagLine: "other", region: "BR1" },
  mid: { gameName: "Dragpandi", tagLine: "BR1", region: "BR1" },
  adc: { gameName: "루카스", tagLine: "tag", region: "BR1" },
  support: { gameName: "still into you", tagLine: "εïз", region: "BR1" },
} as const;

export type Role = keyof typeof TEAM_MEMBERS;
