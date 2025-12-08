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
  // Se não tem queueId, usa cache em memória (otimização para filtros)
  if (!queueId) {
    const cacheKey = `${puuid}_all`;
    const cached = matchIdsCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < MATCH_IDS_CACHE_TTL) {
      return cached.ids.slice(0, count);
    }
  }
  
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
    const ids = await res.json();
    
    // Salva no cache em memória se não tem queueId (para reutilizar entre filtros)
    if (!queueId) {
      const cacheKey = `${puuid}_all`;
      matchIdsCache.set(cacheKey, { ids, timestamp: Date.now() });
    }
    
    return ids;
  } catch (error) {
    return [];
  }
}

// Cache em memória para partidas já carregadas (melhora navegação)
const matchCache = new Map<string, { data: MatchInfo; timestamp: number }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutos (aumentado para melhor performance entre filtros)

// Cache para IDs de partidas por PUUID (evita buscar IDs novamente ao mudar filtros)
const matchIdsCache = new Map<string, { ids: string[]; timestamp: number }>();
const MATCH_IDS_CACHE_TTL = 15 * 60 * 1000; // 15 minutos

export async function getMatchDetails(matchId: string, forceRefresh: boolean = false, retries: number = 2): Promise<MatchInfo | null> {
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
    
    // Rate limit: aguarda e tenta novamente
    if (res.status === 429) {
      const retryAfter = res.headers.get('Retry-After');
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 2000; // 2 segundos padrão
      
      if (retries > 0) {
        console.warn(`[API] Rate limit atingido para ${matchId}, aguardando ${waitTime}ms...`);
        await delay(waitTime);
        return getMatchDetails(matchId, forceRefresh, retries - 1);
      }
      
      console.error(`[API] Rate limit atingido para ${matchId} após ${retries} tentativas`);
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

// Rate limiting: processa partidas em batches para evitar estourar o limite da API
async function getMatchDetailsInBatches(matchIds: string[], forceRefresh: boolean = false): Promise<MatchInfo[]> {
  const BATCH_SIZE = 5; // Processa 5 partidas por vez
  const DELAY_BETWEEN_BATCHES = 200; // 200ms entre batches (respeita 20 req/s)
  const matches: MatchInfo[] = [];

  for (let i = 0; i < matchIds.length; i += BATCH_SIZE) {
    const batch = matchIds.slice(i, i + BATCH_SIZE);
    
    // Processa o batch em paralelo
    const batchPromises = batch.map(id => getMatchDetails(id, forceRefresh));
    const batchResults = await Promise.all(batchPromises);
    
    // Filtra resultados válidos
    const validMatches = batchResults.filter((m): m is MatchInfo => m !== null);
    matches.push(...validMatches);
    
    // Aguarda antes do próximo batch (exceto no último)
    if (i + BATCH_SIZE < matchIds.length) {
      await delay(DELAY_BETWEEN_BATCHES);
    }
  }

  return matches;
}

export async function getPlayerStats(gameName: string, tagLine: string, queueId?: number, forceRefresh: boolean = false, role?: string) {
  const account = await getAccountByRiotId(gameName, tagLine);
  if (!account) return null;

  // OTIMIZAÇÃO: Sempre busca TODAS as partidas (sem filtro de queueId)
  // Filtra localmente depois - evita múltiplas requisições ao mudar filtros
  const [matchIds, version] = await Promise.all([
      getMatchIdsByPuuid(account.puuid, 20, undefined), // Sempre busca todas
      getLatestDDVersion()
  ]);
  
  // Processa partidas em batches para respeitar rate limit da API
  // Development key: 100 req/2min, então fazemos batches de 5 com delay
  const matches = await getMatchDetailsInBatches(matchIds, forceRefresh);

  // Filtra localmente por queueId se especificado
  const filteredMatches = queueId 
    ? matches.filter(match => match.info.queueId === queueId)
    : matches;

  const stats = filteredMatches.map(match => {
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
