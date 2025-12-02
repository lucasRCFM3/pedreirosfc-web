// Função para obter a URL do ícone do summoner spell

const SUMMONER_SPELL_MAP: Record<string, string> = {
  'Flash': 'SummonerFlash',
  'Teleport': 'SummonerTeleport',
  'Barrier': 'SummonerBarrier',
  'Heal': 'SummonerHeal',
  'Smite': 'SummonerSmite',
  'Ignite': 'SummonerDot',
  'Ghost': 'SummonerHaste',
  'Exhaust': 'SummonerExhaust',
  'Cleanse': 'SummonerBoost',
};

export function getSummonerSpellIconUrl(spellName: string, version: string): string {
  const spellKey = SUMMONER_SPELL_MAP[spellName] || spellName;
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellKey}.png`;
}

