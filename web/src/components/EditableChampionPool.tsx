"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { CHAMPION_POOL, Tier } from "@/config/championPool";
import { CHAMPION_MEMORY } from "@/lib/champion-memory";
import { getAllChampions, normalizeChampionName, ChampionData } from "@/lib/champions";
import { Sword, TreeDeciduous, Zap, Crosshair, Heart, X, RefreshCw, Wifi, WifiOff } from "lucide-react";
import Image from "next/image";

const ROLE_ICONS = {
  top: Sword,
  jungle: TreeDeciduous,
  mid: Zap,
  adc: Crosshair,
  support: Heart,
};

const ROLE_LABELS = {
  top: 'Top',
  jungle: 'Jungle',
  mid: 'Mid',
  adc: 'ADC',
  support: 'Support',
};

const TIER_CONFIG: { [key in Tier]: { label: string; bgColor: string; textColor: string } } = {
  splus: { label: 'S+', bgColor: 'bg-red-600', textColor: 'text-white' },
  s: { label: 'S', bgColor: 'bg-orange-500', textColor: 'text-white' },
  a: { label: 'A', bgColor: 'bg-yellow-500', textColor: 'text-black' },
  b: { label: 'B', bgColor: 'bg-yellow-200', textColor: 'text-black' },
  c: { label: 'C', bgColor: 'bg-yellow-50', textColor: 'text-black' },
};

interface EditableChampionPoolProps {
  initialRole: string;
  version: string;
  allChampions: ChampionData[];
}

// Função para migrar dados antigos (com naoJogo) para novo formato
function migrateOldData(data: any): Record<string, Record<Tier, string[]>> {
  const migrated: Record<string, Record<Tier, string[]>> = {};
  
  Object.keys(data || {}).forEach(role => {
    const roleData = data[role] || {};
    
    // Migra dados antigos: move naoJogo para c, e reorganiza
    const oldNaoJogo = roleData.naoJogo || [];
    const oldC = roleData.c || [];
    const oldB = roleData.b || [];
    const oldS = roleData.s || [];
    const oldSplus = roleData.splus || [];
    
    // Cria estrutura nova com todas as tiers
    migrated[role] = {
      splus: Array.isArray(oldSplus) ? oldSplus : [],
      s: Array.isArray(oldS) ? oldS : [],
      a: Array.isArray(roleData.a) ? roleData.a : [],
      b: Array.isArray(oldB) ? oldB : [],
      c: Array.isArray(oldC) ? [...oldC, ...oldNaoJogo] : oldNaoJogo,
    };
  });
  
  return migrated;
}

// Função para normalizar dados (garante que todas as tiers existam)
function normalizePoolData(data: any): Record<string, Record<Tier, string[]>> {
  if (!data || typeof data !== 'object') {
    return createDefaultData();
  }
  
  // Migra dados antigos se necessário
  const migrated = migrateOldData(data);
  
  // Garante que todas as roles tenham todas as tiers
  const normalized: Record<string, Record<Tier, string[]>> = {};
  Object.keys(CHAMPION_POOL).forEach(role => {
    normalized[role] = {
      splus: Array.isArray(migrated[role]?.splus) ? migrated[role].splus : [],
      s: Array.isArray(migrated[role]?.s) ? migrated[role].s : [],
      a: Array.isArray(migrated[role]?.a) ? migrated[role].a : [],
      b: Array.isArray(migrated[role]?.b) ? migrated[role].b : [],
      c: Array.isArray(migrated[role]?.c) ? migrated[role].c : [],
    };
  });
  
  return normalized;
}

// Função para criar dados padrão
function createDefaultData(): Record<string, Record<Tier, string[]>> {
  const initial: Record<string, Record<Tier, string[]>> = {};
  Object.keys(CHAMPION_POOL).forEach(role => {
    initial[role] = {
      splus: CHAMPION_POOL[role]?.splus || [],
      s: CHAMPION_POOL[role]?.s || [],
      a: CHAMPION_POOL[role]?.a || [],
      b: CHAMPION_POOL[role]?.b || [],
      c: CHAMPION_POOL[role]?.c || [],
    };
  });
  return initial;
}

export function EditableChampionPool({ initialRole, version, allChampions }: EditableChampionPoolProps) {
  const [activeRole, setActiveRole] = useState(initialRole);
  const [selectedLane, setSelectedLane] = useState<string | null>(null);
  const [draggedChampion, setDraggedChampion] = useState<{ name: string; fromTier?: Tier } | null>(null);
  const [poolData, setPoolData] = useState<Record<string, Record<Tier, string[]>>>(createDefaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSynced, setIsSynced] = useState(true);
  const [lastModified, setLastModified] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  
  // Refs para controlar sincronização
  const lastKnownModified = useRef<string | null>(null);
  const hasLocalChanges = useRef(false);
  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSavingRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const lastInteractionTimeRef = useRef<number>(0);

  // Carrega dados da API
  const loadFromServer = useCallback(async () => {
    try {
      const response = await fetch("/api/champion-pool");
      if (!response.ok) throw new Error("Falha ao carregar dados");
      
      const result = await response.json();
      if (result.data) {
        // Normaliza os dados (migra formato antigo se necessário)
        const normalizedData = normalizePoolData(result.data);
        setPoolData(normalizedData);
        setLastModified(result.lastModified || null);
        lastKnownModified.current = result.lastModified || null;
        setIsSynced(true);
        setSyncError(null);
      }
    } catch (error) {
      console.error("Erro ao carregar champion pool:", error);
      setSyncError("Erro ao sincronizar");
      setIsSynced(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Salva dados na API
  const saveToServer = useCallback(async (data: Record<string, Record<Tier, string[]>>) => {
    if (isSavingRef.current) return; // Evita múltiplas chamadas simultâneas
    
    isSavingRef.current = true;
    setIsSaving(true);
    setSyncError(null);
    
    try {
      const response = await fetch("/api/champion-pool", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar dados");
      }

      const result = await response.json();
      setLastModified(result.lastModified || new Date().toISOString());
      lastKnownModified.current = result.lastModified || new Date().toISOString();
      hasLocalChanges.current = false;
      isUserInteractingRef.current = false;
      setIsSynced(true);
      
      // Após salvar com sucesso, espera um pouco antes de permitir novas sincronizações
      setTimeout(() => {
        isSavingRef.current = false;
      }, 500);
    } catch (error) {
      console.error("Erro ao salvar champion pool:", error);
      setSyncError("Erro ao salvar");
      setIsSynced(false);
      isSavingRef.current = false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Verifica se há atualizações no servidor
  const checkForUpdates = useCallback(async () => {
    // Não atualiza se estiver salvando, tiver mudanças locais, ou usuário interagindo recentemente
    const timeSinceLastInteraction = Date.now() - lastInteractionTimeRef.current;
    const recentlyInteracted = timeSinceLastInteraction < 5000; // 5 segundos após última interação
    
    if (isSavingRef.current || hasLocalChanges.current || isLoading || isUserInteractingRef.current || recentlyInteracted) {
      return;
    }

    try {
      const response = await fetch("/api/champion-pool");
      if (!response.ok) return;

      const result = await response.json();
      const serverModified = result.lastModified || null;

      // Se o servidor tem uma versão mais nova e não temos mudanças locais, atualiza
      if (serverModified && serverModified !== lastKnownModified.current) {
        // Verifica novamente antes de atualizar (race condition)
        if (!hasLocalChanges.current && !isUserInteractingRef.current) {
          setPoolData(prevData => {
            // Garante que não sobrescreve se houver mudanças locais agora
            if (!hasLocalChanges.current) {
              return normalizePoolData(result.data);
            }
            return prevData;
          });
          
          setLastModified(serverModified);
          lastKnownModified.current = serverModified;
          setIsSynced(true);
          setSyncError(null);
        }
      }
    } catch (error) {
      // Silenciosamente falha, apenas não atualiza
      console.error("Erro ao verificar atualizações:", error);
    }
  }, [isLoading]);

  // Carrega dados iniciais
  useEffect(() => {
    loadFromServer();
  }, [loadFromServer]);

  // Sincronização periódica (a cada 5 segundos - menos frequente para evitar piscar e rollbacks)
  useEffect(() => {
    if (isLoading) return;
    
    syncIntervalRef.current = setInterval(() => {
      checkForUpdates();
    }, 5000); // Aumentado de 3s para 5s para reduzir rollbacks

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [checkForUpdates, isLoading]);

  // Salva no servidor quando há mudanças locais (com debounce maior)
  useEffect(() => {
    if (isLoading) return;

    // Limpa timeout anterior
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Marca que temos mudanças locais
    hasLocalChanges.current = true;
    setIsSynced(false);

    // Debounce maior: salva após 1.5 segundos sem mudanças (aumentado de 1s)
    saveTimeoutRef.current = setTimeout(() => {
      if (!isSavingRef.current) {
        saveToServer(poolData);
      }
    }, 1500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [poolData, isLoading, saveToServer]);

  // Cria um mapa de nome -> ID para facilitar a busca
  const championNameToId = useMemo(() => {
    const map: Record<string, string> = {};
    allChampions.forEach(champ => {
      map[champ.name] = champ.id;
    });
    return map;
  }, [allChampions]);

  // Função auxiliar para buscar campeão no CHAMPION_MEMORY (normaliza nome)
  const getChampionMemoryData = (championName: string) => {
    // Tenta com o nome original primeiro
    if (CHAMPION_MEMORY[championName]) {
      return CHAMPION_MEMORY[championName];
    }
    
    // Normaliza o nome (remove apóstrofos, espaços, etc.)
    const normalized = championName.replace(/\s/g, '').replace(/'/g, '').replace(/\./g, '').replace(/&/g, '');
    if (CHAMPION_MEMORY[normalized]) {
      return CHAMPION_MEMORY[normalized];
    }
    
    // Casos especiais conhecidos
    const specialCases: Record<string, string> = {
      "Kai'Sa": "Kaisa",
      "KaiSa": "Kaisa",
      "LeBlanc": "Leblanc",
      "Bel'Veth": "Belveth",
      "Cho'Gath": "Chogath",
      "Kha'Zix": "Khazix",
      "Vel'Koz": "Velkoz",
      "K'Sante": "KSante",
      "Rek'Sai": "RekSai",
      "Kog'Maw": "KogMaw",
      "Miss Fortune": "MissFortune",
      "Dr. Mundo": "DrMundo",
      "Aurelion Sol": "AurelionSol",
      "Jarvan IV": "JarvanIV",
      "Lee Sin": "LeeSin",
      "Master Yi": "MasterYi",
      "Tahm Kench": "TahmKench",
      "Twisted Fate": "TwistedFate",
      "Xin Zhao": "XinZhao",
      "Nunu & Willump": "Nunu",
      "Renata Glasc": "Renata",
    };
    
    if (specialCases[championName] && CHAMPION_MEMORY[specialCases[championName]]) {
      return CHAMPION_MEMORY[specialCases[championName]];
    }
    
    return undefined;
  };

  // Filtra campeões por lane
  const filteredChampions = useMemo(() => {
    if (!selectedLane) return allChampions;
    
    return allChampions.filter(champ => {
      const champData = getChampionMemoryData(champ.name);
      return champData?.roles.includes(selectedLane);
    });
  }, [allChampions, selectedLane]);

  // Função para mover campeão entre tiers
  const moveChampion = (championName: string, targetTier: Tier) => {
    // Marca interação do usuário
    isUserInteractingRef.current = true;
    lastInteractionTimeRef.current = Date.now();
    
    // Marca que temos mudanças locais antes de atualizar
    hasLocalChanges.current = true;
    
    setPoolData(prev => {
      const newData = JSON.parse(JSON.stringify(prev)); // Deep copy
      if (!newData[activeRole]) {
        newData[activeRole] = { splus: [], s: [], a: [], b: [], c: [] };
      }
      
      // Garante que a tier alvo existe
      if (!newData[activeRole][targetTier]) {
        newData[activeRole][targetTier] = [];
      }
      
      // Remove de todas as tiers
      Object.keys(newData[activeRole]).forEach(tier => {
        const tierArray = newData[activeRole][tier as Tier];
        if (Array.isArray(tierArray)) {
          newData[activeRole][tier as Tier] = tierArray.filter(
          name => name !== championName
        );
        } else {
          newData[activeRole][tier as Tier] = [];
        }
      });
      
      // Adiciona na tier alvo
      const targetTierArray = newData[activeRole][targetTier];
      if (Array.isArray(targetTierArray) && !targetTierArray.includes(championName)) {
        targetTierArray.push(championName);
      }
      
      return newData;
    });
  };

  // Função para remover campeão de todas as tiers
  const removeChampion = (championName: string) => {
    // Marca interação do usuário
    isUserInteractingRef.current = true;
    lastInteractionTimeRef.current = Date.now();
    
    // Marca que temos mudanças locais antes de atualizar
    hasLocalChanges.current = true;
    
    setPoolData(prev => {
      const newData = JSON.parse(JSON.stringify(prev)); // Deep copy
      if (newData[activeRole]) {
        Object.keys(newData[activeRole]).forEach(tier => {
          const tierArray = newData[activeRole][tier as Tier];
          if (Array.isArray(tierArray)) {
            newData[activeRole][tier as Tier] = tierArray.filter(
            name => name !== championName
          );
          } else {
            newData[activeRole][tier as Tier] = [];
          }
        });
      }
      return newData;
    });
  };

  // Handlers de drag and drop
  const handleDragStart = (championName: string, fromTier?: Tier) => {
    setDraggedChampion({ name: championName, fromTier });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (targetTier: Tier) => {
    if (draggedChampion) {
      moveChampion(draggedChampion.name, targetTier);
      setDraggedChampion(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedChampion(null);
  };

  // Normaliza currentPool para garantir que todas as tiers existam
  const currentPool = useMemo(() => {
    const roleData = poolData[activeRole];
    if (!roleData) {
      return { splus: [], s: [], a: [], b: [], c: [] };
    }
    
    // Garante que todas as tiers existam e sejam arrays
    return {
      splus: Array.isArray(roleData.splus) ? roleData.splus : [],
      s: Array.isArray(roleData.s) ? roleData.s : [],
      a: Array.isArray(roleData.a) ? roleData.a : [],
      b: Array.isArray(roleData.b) ? roleData.b : [],
      c: Array.isArray(roleData.c) ? roleData.c : [],
    };
  }, [poolData, activeRole]);
  
  // Memoiza o Set de campeões na pool para evitar recálculos
  const allChampionsInPool = useMemo(() => {
    return new Set(Object.values(currentPool).flat());
  }, [currentPool]);

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
          <p className="text-white">Carregando champion pool...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto min-h-screen flex flex-col">
      {/* Header */}
      <div className="mb-3 flex-shrink-0 flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tighter text-white">
          Champion Pool
        </h1>
        
        {/* Indicador de sincronização */}
        <div className="flex items-center gap-2">
          {syncError && (
            <span className="text-xs text-red-400">{syncError}</span>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-400">
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Salvando...</span>
              </>
            ) : isSynced ? (
              <>
                <Wifi className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Sincronizado</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400">Sincronizando...</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Role Tabs */}
      <div className="flex items-center gap-2 mb-3 flex-wrap flex-shrink-0">
        {Object.entries(ROLE_ICONS).map(([role, Icon]) => {
          const isActive = activeRole === role;
          return (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${isActive 
                  ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}
              `}
            >
              <Icon className="w-4 h-4" />
              {ROLE_LABELS[role as keyof typeof ROLE_LABELS]}
            </button>
          );
        })}
      </div>

      {/* Tier Lists */}
      <div className="space-y-2 flex-1 overflow-y-auto mb-4">
        {Object.entries(TIER_CONFIG).map(([tierKey, tierConfig]) => {
          const tier = tierKey as Tier;
          const champions = currentPool[tier] || [];
          
          return (
            <div
              key={tier}
              className="bg-white/5 rounded-xl p-3 border border-white/10"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(tier)}
            >
              <div className={`inline-block px-3 py-1 rounded-lg mb-2 ${tierConfig.bgColor} ${tierConfig.textColor}`}>
                <span className="font-bold text-xs">{tierConfig.label}</span>
              </div>
              
              {champions.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] gap-1.5">
                  {champions.map((champion) => {
                    // Busca o campeão na lista completa para pegar o ID correto
                    const championData = allChampions.find(c => c.name === champion);
                    const championId = championData?.id || championNameToId[champion] || normalizeChampionName(champion);
                    // Chave estável baseada em role + tier + champion para evitar re-renderizações desnecessárias
                    const stableKey = `${activeRole}-${tier}-${champion}`;
                    return (
                      <div
                        key={stableKey}
                        draggable
                        onDragStart={() => handleDragStart(champion, tier)}
                        onDragEnd={handleDragEnd}
                        className="group relative aspect-square rounded overflow-hidden border border-white/10 hover:border-pedreiro-purple/50 transition-all duration-300 hover:scale-110 cursor-move"
                      >
                        <Image
                          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championId}.png`}
                          alt={champion}
                          fill
                          className="object-cover"
                          unoptimized
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeChampion(champion);
                          }}
                          className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 z-10"
                          title="Remover"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-[10px] font-bold text-white text-center truncate">{champion}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 min-h-[50px] flex items-center justify-center border-2 border-dashed border-white/10 rounded">
                  <p className="text-xs">Arraste campeões aqui</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* All Champions Section */}
      <div className="flex-shrink-0 border-t border-white/10 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Todos os Campeões</h2>
          
          {/* Lane Filters */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedLane(null)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedLane === null
                  ? 'bg-white text-black font-bold'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Todos
            </button>
            {Object.entries(ROLE_ICONS).map(([lane, Icon]) => {
              const isActive = selectedLane === lane;
              return (
                <button
                  key={lane}
                  onClick={() => setSelectedLane(lane)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {ROLE_LABELS[lane as keyof typeof ROLE_LABELS]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-64 overflow-y-auto overflow-x-hidden">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-2">
          {filteredChampions.map((champion) => {
            const isInPool = allChampionsInPool.has(champion.name);
            
            return (
              <div
                key={champion.id}
                draggable
                  onDragStart={() => {
                    isUserInteractingRef.current = true;
                    lastInteractionTimeRef.current = Date.now();
                    handleDragStart(champion.name);
                  }}
                  onDragEnd={() => {
                    handleDragEnd();
                    setTimeout(() => {
                      isUserInteractingRef.current = false;
                    }, 2000);
                  }}
                className={`group relative aspect-square rounded overflow-hidden border-2 transition-all duration-300 hover:scale-110 cursor-move ${
                  isInPool 
                    ? 'border-green-500/50 bg-green-500/10' 
                    : 'border-white/10 hover:border-pedreiro-purple/50'
                }`}
                title={champion.name}
              >
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`}
                  alt={champion.name}
                  fill
                  className="object-cover"
                    unoptimized
                    priority={false}
                />
                {isInPool && (
                  <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">✓</span>
                  </div>
                )}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
