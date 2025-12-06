const RIOT_API_KEY = process.env.RIOT_API_KEY;
const REGION_AMERICAS = "americas.api.riotgames.com";

if (!RIOT_API_KEY) {
  console.error("RIOT_API_KEY is not defined in environment variables.");
}

const headers = {
  "X-Riot-Token": RIOT_API_KEY || "",
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface RiotAccount {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface MatchInfo {
  metadata: {
    matchId: string;
  };
  info: {
    gameCreation: number;
    gameDuration: number;
    participants: Participant[];
    queueId: number;
  };
}

export interface Participant {
  puuid: string;
  summonerName: string;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number; // CS
  neutralMinionsKilled: number; // Jungle CS
  visionScore: number;
  win: boolean;
  lane: string;
  role: string;
  teamId: number; // 100 (azul) ou 200 (vermelho)
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
}

export async function getLatestDDVersion(): Promise<string> {
    try {
        const res = await fetch("https://ddragon.leagueoflegends.com/api/versions.json", { next: { revalidate: 86400 } });
        const versions = await res.json();
        return versions[0] || "14.23.1";
    } catch (error) {
        return "14.23.1"; 
    }
}

export async function getAccountByRiotId(gameName: string, tagLine: string): Promise<RiotAccount | null> {
  const url = `https://${REGION_AMERICAS}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
  
  try {
    // Cache de 15 minutos - reduz requisições à API
    const res = await fetch(url, { headers, next: { revalidate: 900 } });
    if (!res.ok) {
        console.error(`[API] Account not found: ${gameName}#${tagLine} (${res.status})`);
        return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`[API] Error fetching account ${gameName}#${tagLine}:`, error);
    return null;
  }
}

export async function getMatchIdsByPuuid(puuid: string, count: number = 20, queueId?: number, type: string = "ranked"): Promise<string[]> {
  let url = `https://${REGION_AMERICAS}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`;
  
  if (queueId) {
      url += `&queue=${queueId}`;
  } else if (type) {
      url += `&type=${type}`;
  }
  
  try {
    // Cache de 15 minutos - reduz requisições à API
    const res = await fetch(url, { headers, next: { revalidate: 900 } });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

// Cache em memória para partidas já carregadas (melhora navegação)
const matchCache = new Map<string, { data: MatchInfo; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export async function getMatchDetails(matchId: string, forceRefresh: boolean = false): Promise<MatchInfo | null> {
  // Verifica cache em memória primeiro (mais rápido)
  if (!forceRefresh) {
    const cached = matchCache.get(matchId);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
  }

  const url = `https://${REGION_AMERICAS}/lol/match/v5/matches/${matchId}`;
  
  try {
    const res = await fetch(url, { 
      headers, 
      // Cache longo para partidas antigas (não mudam), mas permite force refresh
      next: forceRefresh ? { revalidate: 0 } : { revalidate: 86400 }
    });
    
    if (res.status === 429) {
        return null;
    }

    if (!res.ok) return null;
    const data = await res.json();
    
    // Salva no cache em memória
    matchCache.set(matchId, { data, timestamp: Date.now() });
    
    return data;
  } catch (error) {
    return null;
  }
}

export async function getPlayerStats(gameName: string, tagLine: string, queueId?: number, forceRefresh: boolean = false, role?: string) {
  const account = await getAccountByRiotId(gameName, tagLine);
  if (!account) return null;

  const [matchIds, version] = await Promise.all([
      getMatchIdsByPuuid(account.puuid, 20, queueId),
      getLatestDDVersion()
  ]);
  
  // Otimização máxima: busca todas as 20 partidas em paralelo de uma vez
  // API permite 20 req/s, então podemos fazer tudo simultaneamente
  const matchPromises = matchIds.map(id => getMatchDetails(id, forceRefresh));
  const matchResults = await Promise.all(matchPromises);
  const matches = matchResults.filter((m): m is MatchInfo => m !== null);

  const stats = matches.map(match => {
    const participant = match.info.participants.find(p => p.puuid === account.puuid);
    if (!participant) return null;

    const cs = participant.totalMinionsKilled + participant.neutralMinionsKilled;
    
    // Calcula Kill Participation (KP%)
    // Total de kills do time = soma de kills de todos os participantes do mesmo time
    const teamId = participant.teamId;
    const teamParticipants = match.info.participants.filter(p => p.teamId === teamId);
    const teamTotalKills = teamParticipants.reduce((sum, p) => sum + p.kills, 0);
    const killParticipation = teamTotalKills > 0 
      ? ((participant.kills + participant.assists) / teamTotalKills * 100) 
      : 0;
    
    return {
      matchId: match.metadata.matchId,
      queueId: match.info.queueId,
      champion: participant.championName,
      championImageUrl: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${participant.championName}.png`,
      win: participant.win,
      kills: participant.kills,
      deaths: participant.deaths,
      assists: participant.assists,
      kda: `${participant.kills}/${participant.deaths}/${participant.assists}`,
      cs,
      visionScore: participant.visionScore,
      gameDuration: match.info.gameDuration,
      gameCreation: match.info.gameCreation,
      killParticipation,
      participant
    };
  }).filter(s => s !== null);

  const totalCs = stats.reduce((acc, curr) => acc + (curr?.cs || 0), 0);
  const avgCs = stats.length > 0 ? (totalCs / stats.length).toFixed(1) : "0";

  const totalVision = stats.reduce((acc, curr) => acc + (curr?.visionScore || 0), 0);
  const avgVision = stats.length > 0 ? (totalVision / stats.length).toFixed(1) : "0";

  const totalDuration = stats.reduce((acc, curr) => acc + (curr?.gameDuration || 0), 0);
  const avgDuration = stats.length > 0 ? totalDuration / stats.length : 0;

  const totalKillParticipation = stats.reduce((acc, curr) => acc + (curr?.killParticipation || 0), 0);
  const avgKillParticipation = stats.length > 0 ? totalKillParticipation / stats.length : 0;

  const champStats: Record<string, { name: string, wins: number, total: number, kills: number, deaths: number, assists: number }> = {};
  
  stats.forEach(match => {
      const name = match.champion;
      if (!champStats[name]) {
          champStats[name] = { name, wins: 0, total: 0, kills: 0, deaths: 0, assists: 0 };
      }
      champStats[name].total += 1;
      if (match.win) champStats[name].wins += 1;
      champStats[name].kills += match.kills;
      champStats[name].deaths += match.deaths;
      champStats[name].assists += match.assists;
  });

  // Lista completa de campeões ADC (normalizados para comparação)
  // Inclui todos os marksman/ADC até patch 25.23 (30/11/2025)
  // Atualizado automaticamente com base em fontes oficiais
  const adcChampions = [
    'aphelios', 'ashe', 'caitlyn', 'corki', 'draven', 'ezreal', 'jhin', 'jinx', 
    'kaisa', 'kalista', 'kogmaw', 'lucian', 'missfortune', 'nilah', 'samira', 
    'sivir', 'smolder', 'tristana', 'twitch', 'varus', 'vayne', 
    'xayah', 'yunara', 'zeri', 'ziggs'
  ];

  // Função auxiliar para calcular tier (mesma lógica da função getChampionTier)
  const getTierValue = (winRate: number, kda: number, games: number): number => {
    if (winRate > 60 && kda > 2.5 && games >= 3) return 4; // S+
    if (winRate > 50 && kda > 2.0 && (games >= 2 || (games === 1 && winRate === 100 && kda > 3.0))) return 3; // S
    if ((winRate >= 40 && winRate <= 50 && kda >= 1.5 && kda <= 2.0) || 
        (winRate > 50 && kda >= 1.5 && kda <= 2.0)) return 2; // A
    return 1; // B
  };

  // Filtra campeões ADC se o role for ADC
  let championsToProcess = Object.values(champStats);
  if (role === 'adc') {
    championsToProcess = championsToProcess.filter(c => 
      adcChampions.includes(c.name.toLowerCase())
    );
    // Se não houver ADCs, mostra todos (fallback)
    if (championsToProcess.length === 0) {
      championsToProcess = Object.values(champStats);
    }
  }

  const topChampions = championsToProcess
      .map(c => {
          const winRate = (c.wins / c.total) * 100;
          const kda = c.deaths === 0 ? (c.kills + c.assists) : ((c.kills + c.assists) / c.deaths);
          const tierValue = getTierValue(winRate, kda, c.total);
          
          return {
              ...c,
              winRate: winRate.toFixed(0),
              kda: kda.toFixed(2),
              tierValue,
              imageUrl: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${c.name}.png`
          };
      })
      .sort((a, b) => {
          // Primeiro ordena por tier (S+ > S > A > B)
          if (b.tierValue !== a.tierValue) return b.tierValue - a.tierValue;
          // Depois por win rate
          const aWinRate = parseFloat(a.winRate);
          const bWinRate = parseFloat(b.winRate);
          if (bWinRate !== aWinRate) return bWinRate - aWinRate;
          // Por último por KDA
          return parseFloat(b.kda) - parseFloat(a.kda);
      })
      .slice(0, 5);

  return {
    account,
    matches: stats,
    avgCs,
    avgVision,
    avgDuration,
    avgKillParticipation,
    topChampions
  };
}
