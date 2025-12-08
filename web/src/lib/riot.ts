import { unstable_cache } from 'next/cache';

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

// Cache de contas para evitar buscar o mesmo jogador múltiplas vezes
const accountCache = new Map<string, { account: RiotAccount; timestamp: number }>();
const ACCOUNT_CACHE_TTL = 15 * 60 * 1000; // 15 minutos

export async function getAccountByRiotId(gameName: string, tagLine: string): Promise<RiotAccount | null> {
  const cacheKey = `${gameName}#${tagLine}`;
  
  // Verifica cache primeiro
  const cached = accountCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < ACCOUNT_CACHE_TTL) {
    console.log(`[CACHE] Usando conta do cache para ${cacheKey}`);
    return cached.account;
  }

  const url = `https://${REGION_AMERICAS}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
  
  try {
    // Cache de 15 minutos - reduz requisições à API
    const res = await fetch(url, { headers, next: { revalidate: 900 } });
    if (!res.ok) {
        console.error(`[API] Account not found: ${gameName}#${tagLine} (${res.status})`);
        return null;
    }
    const account = await res.json();
    
    // Salva no cache
    accountCache.set(cacheKey, { account, timestamp: Date.now() });
    
    return account;
  } catch (error) {
    console.error(`[API] Error fetching account ${gameName}#${tagLine}:`, error);
    return null;
  }
}

export async function getMatchIdsByPuuid(puuid: string, count: number = 10, queueId?: number, type: string = "ranked", forceRefresh: boolean = false): Promise<string[]> {
  // IMPORTANTE: Sempre usa cache em memória primeiro (independente de queueId)
  // Isso garante que mudar filtros não faz novas requisições
  const cacheKey = `${puuid}_all`;
  if (!forceRefresh) {
    const cached = matchIdsCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < MATCH_IDS_CACHE_TTL) {
      console.log(`[CACHE] Usando IDs de partidas do cache para ${puuid}`);
      return cached.ids.slice(0, count);
    }
  }
  
  // Limpa cache se for forceRefresh
  if (forceRefresh) {
    matchIdsCache.delete(cacheKey);
  }
  
  // IMPORTANTE: Sempre busca TODAS as partidas (sem filtro de queueId)
  // O filtro será aplicado depois localmente
  let url = `https://${REGION_AMERICAS}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`;
  
  // Ignora queueId aqui - sempre busca todas para cache compartilhado
  if (type) {
      url += `&type=${type}`;
  }
  
  try {
    console.log(`[API] Buscando IDs de partidas para ${puuid} (forceRefresh: ${forceRefresh})`);
    // Cache de 15 minutos - reduz requisições à API (mas ignora se forceRefresh)
    const res = await fetch(url, { 
      headers, 
      next: forceRefresh ? { revalidate: 0 } : { revalidate: 900 } 
    });
    if (!res.ok) {
      console.error(`[API] Erro ao buscar IDs de partidas: ${res.status}`);
      return [];
    }
    const ids = await res.json();
    
    // Salva no cache em memória (sempre, para reutilizar entre filtros)
    matchIdsCache.set(cacheKey, { ids, timestamp: Date.now() });
    console.log(`[CACHE] IDs de partidas salvos no cache para ${puuid} (${ids.length} partidas)`);
    
    return ids;
  } catch (error) {
    console.error(`[API] Erro ao buscar IDs de partidas:`, error);
    return [];
  }
}

// Cache em memória para partidas já carregadas (melhora navegação)
const matchCache = new Map<string, { data: MatchInfo; timestamp: number }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutos (aumentado para melhor performance entre filtros)

// Cache para IDs de partidas por PUUID (evita buscar IDs novamente ao mudar filtros)
const matchIdsCache = new Map<string, { ids: string[]; timestamp: number }>();
const MATCH_IDS_CACHE_TTL = 15 * 60 * 1000; // 15 minutos

// Cache para última partida conhecida (para verificar se há novas partidas)
const lastMatchCache = new Map<string, { matchId: string; timestamp: number }>();

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
  if (!account) {
    console.error(`[API] Conta não encontrada: ${gameName}#${tagLine}`);
    return null;
  }

  // OTIMIZAÇÃO: Sempre busca TODAS as partidas (sem filtro de queueId)
  // Filtra localmente depois - evita múltiplas requisições ao mudar filtros
  const [matchIds, version] = await Promise.all([
      getMatchIdsByPuuid(account.puuid, 10, undefined, "ranked", forceRefresh), // Sempre busca todas
      getLatestDDVersion()
  ]);
  
  if (!matchIds || matchIds.length === 0) {
    console.warn(`[API] Nenhuma partida encontrada para ${gameName}#${tagLine}`);
    // Retorna objeto vazio mas válido ao invés de null
    return {
      account,
      matches: [],
      avgCs: "0",
      avgVision: "0",
      avgDuration: 0,
      avgKillParticipation: 0,
      topChampions: []
    };
  }
  
  // Processa partidas em batches para respeitar rate limit da API
  // Development key: 100 req/2min, então fazemos batches de 5 com delay
  const matches = await getMatchDetailsInBatches(matchIds, forceRefresh);

  if (!matches || matches.length === 0) {
    console.warn(`[API] Nenhum detalhe de partida encontrado para ${gameName}#${tagLine}`);
    return {
      account,
      matches: [],
      avgCs: "0",
      avgVision: "0",
      avgDuration: 0,
      avgKillParticipation: 0,
      topChampions: []
    };
  }

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

  // Salva a última partida conhecida no cache
  if (stats.length > 0) {
    const lastMatch = stats[0]; // Primeira é a mais recente
    const cacheKey = `${account.puuid}_last`;
    lastMatchCache.set(cacheKey, { matchId: lastMatch.matchId, timestamp: Date.now() });
  }

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

// Função para verificar apenas a última partida (otimizada para update rápido)
export async function checkLatestMatch(gameName: string, tagLine: string, queueId?: number, role?: string) {
  const account = await getAccountByRiotId(gameName, tagLine);
  if (!account) {
    console.error(`[API] Conta não encontrada: ${gameName}#${tagLine}`);
    return null;
  }

  // OTIMIZAÇÃO: Busca apenas a última partida (count=1) - apenas 1 requisição
  console.log(`[QUICK UPDATE] Verificando última partida para ${gameName}#${tagLine}`);
  const latestMatchIds = await getMatchIdsByPuuid(account.puuid, 1, undefined, "ranked", false);
  
  if (!latestMatchIds || latestMatchIds.length === 0) {
    return null;
  }

  const latestMatchId = latestMatchIds[0];
  const cacheKey = `${account.puuid}_last`;
  const cachedLastMatch = lastMatchCache.get(cacheKey);

  // Se a última partida é a mesma que já temos, não precisa atualizar
  if (cachedLastMatch && cachedLastMatch.matchId === latestMatchId) {
    console.log(`[QUICK UPDATE] Nenhuma partida nova para ${gameName}#${tagLine}`);
    return { hasNewMatch: false, matchId: latestMatchId };
  }

  console.log(`[QUICK UPDATE] Nova partida encontrada: ${latestMatchId}`);
  
  // OTIMIZAÇÃO: Busca apenas a nova partida (1 requisição) ao invés de todas
  const newMatch = await getMatchDetails(latestMatchId, true);
  if (!newMatch) {
    console.error(`[QUICK UPDATE] Erro ao buscar detalhes da nova partida ${latestMatchId}`);
    return null;
  }

  // Atualiza o cache da última partida
  lastMatchCache.set(cacheKey, { matchId: latestMatchId, timestamp: Date.now() });

  // Busca os dados existentes do cache (sem fazer novas requisições)
  // Se não tiver cache, busca todas (mas isso só acontece na primeira vez)
  const existingData = await getPlayerStats(gameName, tagLine, undefined, false, role);
  
  if (!existingData) {
    // Se não tem dados existentes, busca todas (primeira vez)
    return await getPlayerStats(gameName, tagLine, queueId, false, role);
  }

  // Verifica se a nova partida já está na lista (pode acontecer se o cache foi atualizado)
  const alreadyExists = existingData.matches.some(m => m.matchId === latestMatchId);
  if (alreadyExists) {
    console.log(`[QUICK UPDATE] Partida ${latestMatchId} já está nos dados existentes`);
    // Aplica filtro se necessário
    if (queueId) {
      return {
        ...existingData,
        matches: existingData.matches.filter(m => m.queueId === queueId)
      };
    }
    return existingData;
  }

  // Adiciona a nova partida no início da lista
  const version = await getLatestDDVersion();
  const participant = newMatch.info.participants.find(p => p.puuid === account.puuid);
  
  if (!participant) {
    console.error(`[QUICK UPDATE] Participante não encontrado na nova partida`);
    return existingData;
  }

  const cs = participant.totalMinionsKilled + participant.neutralMinionsKilled;
  const teamId = participant.teamId;
  const teamParticipants = newMatch.info.participants.filter(p => p.teamId === teamId);
  const teamTotalKills = teamParticipants.reduce((sum, p) => sum + p.kills, 0);
  const killParticipation = teamTotalKills > 0 
    ? ((participant.kills + participant.assists) / teamTotalKills * 100) 
    : 0;

  const newMatchData = {
    matchId: newMatch.metadata.matchId,
    queueId: newMatch.info.queueId,
    champion: participant.championName,
    championImageUrl: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${participant.championName}.png`,
    win: participant.win,
    kills: participant.kills,
    deaths: participant.deaths,
    assists: participant.assists,
    kda: `${participant.kills}/${participant.deaths}/${participant.assists}`,
    cs,
    visionScore: participant.visionScore,
    gameDuration: newMatch.info.gameDuration,
    gameCreation: newMatch.info.gameCreation,
    killParticipation,
    participant
  };

  // Adiciona a nova partida no início e mantém apenas as 10 mais recentes
  const updatedMatches = [newMatchData, ...existingData.matches].slice(0, 10);

  // Recalcula estatísticas
  const totalCs = updatedMatches.reduce((acc, curr) => acc + (curr?.cs || 0), 0);
  const avgCs = updatedMatches.length > 0 ? (totalCs / updatedMatches.length).toFixed(1) : "0";
  const totalVision = updatedMatches.reduce((acc, curr) => acc + (curr?.visionScore || 0), 0);
  const avgVision = updatedMatches.length > 0 ? (totalVision / updatedMatches.length).toFixed(1) : "0";
  const totalDuration = updatedMatches.reduce((acc, curr) => acc + (curr?.gameDuration || 0), 0);
  const avgDuration = updatedMatches.length > 0 ? totalDuration / updatedMatches.length : 0;
  const totalKillParticipation = updatedMatches.reduce((acc, curr) => acc + (curr?.killParticipation || 0), 0);
  const avgKillParticipation = updatedMatches.length > 0 ? totalKillParticipation / updatedMatches.length : 0;

  // Recalcula top champions (código simplificado)
  const champStats: Record<string, { name: string, wins: number, total: number, kills: number, deaths: number, assists: number }> = {};
  updatedMatches.forEach(match => {
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

  const topChampions = Object.values(champStats)
    .map(c => {
      const winRate = (c.wins / c.total) * 100;
      const kda = c.deaths === 0 ? (c.kills + c.assists) : ((c.kills + c.assists) / c.deaths);
      return {
        ...c,
        winRate: winRate.toFixed(0),
        kda: kda.toFixed(2),
        imageUrl: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${c.name}.png`
      };
    })
    .sort((a, b) => parseFloat(b.winRate) - parseFloat(a.winRate))
    .slice(0, 5);

  // Aplica filtro se necessário
  const filteredMatches = queueId 
    ? updatedMatches.filter(m => m.queueId === queueId)
    : updatedMatches;

  console.log(`[QUICK UPDATE] Nova partida adicionada. Total: ${filteredMatches.length} partidas`);

  return {
    account,
    matches: filteredMatches,
    avgCs,
    avgVision,
    avgDuration,
    avgKillParticipation,
    topChampions
  };
}
