import { getLatestDDVersion } from "@/lib/riot";
import { getItemIconUrlByName } from "@/lib/items";
import { getCompositionById } from "@/lib/compositions";
import { normalizeChampionName, getAllChampions } from "@/lib/champions";
import { Target, Trophy, Ban, Users, Package, ArrowLeft, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChampionAlternatives } from "@/components/ChampionAlternatives";

export default async function CompositionDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const version = await getLatestDDVersion();
  const composition = await getCompositionById(params.id);
  const allChampions = await getAllChampions(version);

  if (!composition) {
    return notFound();
  }

  // Processa os itens de forma assíncrona antes do render
  const championsWithItemUrls = await Promise.all(
    (composition.champions || []).map(async (champ) => {
      if (!champ.build || !champ.build.items) {
        return { ...champ, itemUrls: [], situationalItemUrls: [] };
      }
      
      const itemUrls = await Promise.all(
        (champ.build.items || []).filter(item => item && item.trim()).map(async (item) => ({
          name: item,
          url: await getItemIconUrlByName(item, version)
        }))
      );
      
      const situationalItemUrls = champ.build.situationalItems && champ.build.situationalItems.length > 0
        ? await Promise.all(
            champ.build.situationalItems.filter(item => item && item.trim()).map(async (item) => ({
              name: item,
              url: await getItemIconUrlByName(item, version)
            }))
          )
        : [];
      
      return { ...champ, itemUrls, situationalItemUrls };
    })
  );

  const roleColors = {
    top: 'border-pedreiro-purple',
    jungle: 'border-green-400',
    mid: 'border-pedreiro-blue',
    adc: 'border-red-400',
    support: 'border-pink-400'
  };

  const roleLabels = {
    top: 'TOP',
    jungle: 'JG',
    mid: 'MID',
    adc: 'ADC',
    support: 'SUP'
  };

  const championUrl = (name: string) => normalizeChampionName(name);

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen">
      {/* Back Button */}
      <Link
        href="/composicoes"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Voltar para Composições</span>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-black tracking-tighter text-white mb-2">
          {composition.title || "Composição sem título"}
        </h1>
        {composition.objective && composition.objective.trim() && (
          <p className="text-gray-300 text-lg leading-relaxed">{composition.objective}</p>
        )}
      </div>

      {/* Composition Card */}
      <div className="bg-white/5 rounded-3xl p-8 border border-white/10 mb-8">
        {/* Champions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {(composition.champions || []).map((champ) => (
            <ChampionAlternatives
              key={champ.role}
              champion={champ}
              version={version}
              roleColor={roleColors[champ.role]}
              roleLabel={roleLabels[champ.role]}
            />
          ))}
        </div>

        {/* Win Conditions */}
        {composition.winConditions && composition.winConditions.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="text-xl font-bold text-white">Win Conditions</h3>
          </div>
          <div className="space-y-3">
            {composition.winConditions.map((condition) => (
              <div key={condition.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pedreiro-purple/20 flex items-center justify-center">
                    <span className="text-pedreiro-purple font-bold text-sm">{condition.id}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white mb-1">{condition.title}</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{condition.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Weak Points */}
        {composition.weakPoints && composition.weakPoints.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-bold text-white">Pontos Fracos</h3>
          </div>
          <div className="space-y-3">
            {composition.weakPoints.map((weakPoint) => (
              <div key={weakPoint.id} className="bg-white/5 rounded-xl p-4 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-500 font-bold text-sm">{weakPoint.id}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white mb-1">{weakPoint.title}</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{weakPoint.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Draft Phase */}
        {composition.draft && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-pedreiro-blue" />
            <h3 className="text-xl font-bold text-white">Fase de Draft</h3>
          </div>
          {composition.draft.bans && composition.draft.bans.length > 0 && (
          <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Ban className="w-4 h-4 text-red-400" />
              <p className="font-bold text-red-400 text-sm uppercase">Bans</p>
            </div>
            
            {/* Extract champion names from ban descriptions */}
            {(() => {
              const championNames: string[] = [];
              
              // Lista de palavras comuns e roles para filtrar
              const commonWords = new Set([
                'Prioridade', 'Máxima', 'Um', 'Ex', 'Picks', 'Campeões', 'Assassino', 'Engage', 'Forte', 
                'Tank', 'que', 'punem', 'Não', 'podemos', 'dar', 'Eles', 'podem', 'interromper', 
                'nossos', 'engages', 'coordenados', 'eliminar', 'antes', 'dela', 'evoluir', 'Range', 
                'Superior', 'early', 'game', 'evoluções', 'El', 'força', 'pressão', 'todas', 'rotas', 
                'pune', 'scaling', 'Deve', 'ser', 'banido', 'ignoram', 'Frontline', 'vão', 'direto',
                'Jungle', 'Flex', 'ADC', 'Top', 'Mid', 'Support', 'Sup', 'Com', 'Disengage', 'Assassinos'
              ]);
              
              // Função auxiliar para verificar se uma palavra é um campeão válido
              const isValidChampion = (name: string): boolean => {
                if (!name || name.length < 3 || name.length > 20) return false;
                if (commonWords.has(name)) return false;
                
                // Verifica se existe na lista de campeões
                if (allChampions) {
                  return allChampions.some(champ => {
                    const champName = champ.name;
                    const normalizedChamp = normalizeChampionName(champName);
                    const normalizedInput = name.replace(/\s/g, '').replace(/'/g, '');
                    
                    return champName === name || 
                           normalizedChamp === normalizedInput ||
                           champName.toLowerCase() === name.toLowerCase() ||
                           normalizedChamp.toLowerCase() === normalizedInput.toLowerCase();
                  });
                }
                
                // Se não temos a lista, usa heurística: começa com maiúscula e tem tamanho razoável
                return /^[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?$/.test(name);
              };
              
              composition.draft.bans.filter(ban => ban && ban.trim()).forEach(ban => {
                // Padrão 0: Texto inteiro é apenas um nome de campeão "Pantheon"
                const trimmedBan = ban.trim();
                if (isValidChampion(trimmedBan) && 
                    !trimmedBan.includes('(') && 
                    !trimmedBan.includes(':') && 
                    !trimmedBan.includes(',') &&
                    !trimmedBan.includes('ou') &&
                    !championNames.includes(trimmedBan)) {
                  championNames.push(trimmedBan);
                }
                
                // Padrão 1: Nomes antes de parênteses "Pantheon (Jungle/Flex)"
                const beforeParen = ban.match(/([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)\s*\(/g);
                if (beforeParen) {
                  beforeParen.forEach(match => {
                    const name = match.replace(/\s*\(.*$/, '').trim();
                    if (name && !commonWords.has(name) && name.length >= 3 && name.length <= 15 && !championNames.includes(name)) {
                      championNames.push(name);
                    }
                  });
                }
                
                // Padrão 2: Nomes após ":" - ": Zed, LeBlanc, Katarina" ou ": Janna, Poppy"
                const afterColon = ban.match(/:\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)/g);
                if (afterColon) {
                  afterColon.forEach(match => {
                    const name = match.replace(/^:\s+/, '').trim();
                    // Pega apenas o primeiro nome após ":"
                    const firstWord = name.split(/\s|,/)[0];
                    if (firstWord && !commonWords.has(firstWord) && firstWord.length >= 3 && firstWord.length <= 15 && !championNames.includes(firstWord)) {
                      championNames.push(firstWord);
                    }
                  });
                }
                
                // Padrão 3: Nomes após "ou" - "Zed ou LeBlanc"
                const afterOr = ban.match(/ou\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)/g);
                if (afterOr) {
                  afterOr.forEach(match => {
                    const name = match.replace(/^ou\s+/, '').trim();
                    if (name && !commonWords.has(name) && name.length >= 3 && name.length <= 15 && !championNames.includes(name)) {
                      championNames.push(name);
                    }
                  });
                }
                
                // Padrão 4: Nomes separados por vírgulas "Janna, Poppy, Gragas" ou "Zed, LeBlanc, Katarina"
                const commaSeparated = ban.match(/([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)\s*,/g);
                if (commaSeparated) {
                  commaSeparated.forEach(match => {
                    const name = match.replace(/\s*,.*$/, '').trim();
                    if (name && !commonWords.has(name) && name.length >= 3 && name.length <= 15 && !championNames.includes(name)) {
                      championNames.push(name);
                    }
                  });
                }
                
                // Padrão 5: Último nome em lista separada por vírgulas "Gragas." ou "Katarina."
                const lastInList = ban.match(/,\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)[.\s]/g);
                if (lastInList) {
                  lastInList.forEach(match => {
                    const name = match.replace(/^,\s+/, '').replace(/[.\s].*$/, '').trim();
                    if (name && !commonWords.has(name) && name.length >= 3 && name.length <= 15 && !championNames.includes(name)) {
                      championNames.push(name);
                    }
                  });
                }
              });
              
              return (
                <div>
                  {/* Champion Icons - Apenas ícones, sem descrições */}
                  {championNames.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {championNames.map((name) => {
                        // Normaliza o nome do campeão para o formato do Data Dragon
                        // Remove espaços, apóstrofes e ajusta casos especiais
                        let normalizedName = name.replace(/\s/g, '').replace(/'/g, '');
                        
                        // Casos especiais conhecidos
                        const specialCases: Record<string, string> = {
                          'LeBlanc': 'Leblanc',
                          'KogMaw': 'KogMaw',
                          'Kog\'Maw': 'KogMaw',
                        };
                        
                        if (specialCases[name]) {
                          normalizedName = specialCases[name];
                        }
                        
                        return (
                          <div key={name} className="relative group" title={name}>
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden border-2 border-red-500/50 bg-red-500/10">
                              <Image
                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${normalizedName}.png`}
                                alt={name}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                              />
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white/20">
                              <Ban className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
          )}
        </div>
        )}

        {/* Builds */}
        {championsWithItemUrls.some(champ => champ.build && (champ.itemUrls?.length > 0 || champ.situationalItemUrls?.length > 0)) && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-orange-400" />
            <h3 className="text-xl font-bold text-white">Builds Competitivos</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {championsWithItemUrls.map((champ) => {
              if (!champ.build || (!champ.itemUrls?.length && !champ.situationalItemUrls?.length)) return null;
              
              return (
                <div key={champ.role} className={`bg-white/5 rounded-xl p-4 border-2 ${roleColors[champ.role]}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championUrl(champ.name)}.png`}
                        alt={champ.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white">{champ.name}</p>
                      <p className="text-xs text-gray-400">{roleLabels[champ.role]}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-orange-400 mb-2">Itens:</p>
                      <div className="flex flex-wrap gap-2">
                        {champ.itemUrls.map((item, idx) => (
                          <div 
                            key={idx} 
                            className="relative group"
                            title={item.name}
                          >
                            {item.url ? (
                              <Image
                                src={item.url}
                                alt={item.name}
                                width={36}
                                height={36}
                                className="rounded-lg border border-white/10 hover:border-white/30 transition-all hover:scale-110"
                              />
                            ) : (
                              <div className="w-9 h-9 bg-gray-600 rounded-lg border border-white/10 flex items-center justify-center">
                                <span className="text-[7px] text-gray-400 text-center px-1">{item.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {champ.situationalItemUrls && champ.situationalItemUrls.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-blue-400 mb-2">Itens Situacionais:</p>
                        <div className="flex flex-wrap gap-2">
                          {champ.situationalItemUrls.map((item, idx) => (
                            <div 
                              key={idx} 
                              className="relative group"
                              title={item.name}
                            >
                              {item.url ? (
                                <Image
                                  src={item.url}
                                  alt={item.name}
                                  width={36}
                                  height={36}
                                  className="rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all hover:scale-110 opacity-80"
                                />
                              ) : (
                                <div className="w-9 h-9 bg-gray-600 rounded-lg border border-white/10 flex items-center justify-center">
                                  <span className="text-[7px] text-gray-400 text-center px-1">{item.name}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        )}


        {/* Synergies */}
        {composition.synergies && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-pink-400" />
              <h3 className="text-xl font-bold text-white">Sinergias da Composição</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(composition.synergies).map(([key, value]) => (
                <div key={key} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="font-bold text-pink-400 text-sm mb-2">{key}</p>
                  <p className="text-xs text-gray-300 leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

