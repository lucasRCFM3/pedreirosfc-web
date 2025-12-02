// Função para buscar todos os campeões do Data Dragon

export interface ChampionData {
  id: string;
  key: string;
  name: string;
}

export async function getAllChampions(version: string): Promise<ChampionData[]> {
  try {
    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
      { next: { revalidate: 86400 } } // Cache por 24 horas
    );
    
    if (!res.ok) {
      console.error('Error fetching champions:', res.status);
      return [];
    }
    
    const data = await res.json();
    const champions: ChampionData[] = Object.values(data.data);
    
    // Ordena alfabeticamente por nome
    champions.sort((a, b) => a.name.localeCompare(b.name));
    
    return champions;
  } catch (error) {
    console.error('Error fetching champions:', error);
    return [];
  }
}

// Função para normalizar nome do campeão para URL
// Usa o ID do campeão do Data Dragon, que é o formato correto para a URL
export function normalizeChampionName(nameOrId: string, championId?: string): string {
  // Se temos o ID do campeão, usa ele diretamente (é o formato correto)
  if (championId) {
    return championId;
  }
  
  // Caso contrário, tenta normalizar o nome
  let normalized = nameOrId.replace(/\s/g, '').replace(/'/g, '').replace(/\./g, '').replace(/&/g, '');
  
  // Casos especiais conhecidos (mapeamento nome -> ID do Data Dragon)
  const specialCases: Record<string, string> = {
    'LeBlanc': 'Leblanc',
    'KogMaw': 'KogMaw',
    'Kog\'Maw': 'KogMaw',
    'Miss Fortune': 'MissFortune',
    'MissFortune': 'MissFortune',
    'Wukong': 'MonkeyKing',
    'Fiddlesticks': 'Fiddlesticks',
    'Dr. Mundo': 'DrMundo',
    'DrMundo': 'DrMundo',
    'Aurelion Sol': 'AurelionSol',
    'AurelionSol': 'AurelionSol',
    'Jarvan IV': 'JarvanIV',
    'JarvanIV': 'JarvanIV',
    'Lee Sin': 'LeeSin',
    'LeeSin': 'LeeSin',
    'Master Yi': 'MasterYi',
    'MasterYi': 'MasterYi',
    'Tahm Kench': 'TahmKench',
    'TahmKench': 'TahmKench',
    'Twisted Fate': 'TwistedFate',
    'TwistedFate': 'TwistedFate',
    'Xin Zhao': 'XinZhao',
    'XinZhao': 'XinZhao',
    'Kai\'Sa': 'Kaisa',
    'KaiSa': 'Kaisa',
    'Bel\'Veth': 'Belveth',
    'BelVeth': 'Belveth',
    'Nunu & Willump': 'Nunu',
    'Nunu&Willump': 'Nunu',
    'Cho\'Gath': 'Chogath',
    'ChoGath': 'Chogath',
    'Kha\'Zix': 'Khazix',
    'KhaZix': 'Khazix',
    'Renata Glasc': 'Renata',
    'RenataGlasc': 'Renata',
    'Vel\'Koz': 'Velkoz',
    'VelKoz': 'Velkoz',
    'K\'Sante': 'KSante',
    'KSante': 'KSante',
    'Rek\'Sai': 'RekSai',
    'RekSai': 'RekSai',
  };
  
  if (specialCases[nameOrId]) {
    normalized = specialCases[nameOrId];
  }
  
  return normalized;
}

