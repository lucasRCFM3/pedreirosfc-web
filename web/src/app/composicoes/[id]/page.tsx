import { getLatestDDVersion } from "@/lib/riot";
import { getItemIconUrlByName } from "@/lib/items";
import { getCompositionById } from "@/lib/compositions";
import { Target, Clock, Trophy, Ban, CheckCircle, AlertCircle, Map, Users, Package, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChampionAlternatives } from "@/components/ChampionAlternatives";

export default async function CompositionDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const version = await getLatestDDVersion();
  const composition = await getCompositionById(params.id);

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

  const championUrl = (name: string) => name.replace(/\s/g, '').replace(/'/g, '');

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

        {/* In-Game Strategies */}
        {composition.inGame && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Map className="w-5 h-5 text-green-400" />
              <h3 className="text-xl font-bold text-white">Estratégias In-Game</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {composition.inGame.macro && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="font-bold text-green-400 text-sm mb-3 uppercase">Macro</p>
                  <ul className="space-y-2">
                    {composition.inGame.macro.map((strategy, idx) => (
                      <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {composition.inGame.rotations && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="font-bold text-blue-400 text-sm mb-3 uppercase">Rotações</p>
                  <ul className="space-y-2">
                    {composition.inGame.rotations.map((rotation, idx) => (
                      <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{rotation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {composition.inGame.vision && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="font-bold text-purple-400 text-sm mb-3 uppercase">Visão</p>
                  <ul className="space-y-2">
                    {composition.inGame.vision.map((vision, idx) => (
                      <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{vision}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
              
              composition.draft.bans.filter(ban => ban && ban.trim()).forEach(ban => {
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
                  {/* Champion Icons */}
                  {championNames.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-4">
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
                  
                  {/* Ban Descriptions */}
                  <ul className="space-y-2">
                    {composition.draft.bans.map((ban, idx) => (
                      <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{ban}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </div>
          )}
          {composition.draft.picks && composition.draft.picks.length > 0 && (
          <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <p className="font-bold text-green-400 text-sm uppercase">Picks</p>
            </div>
            <ul className="space-y-2">
              {composition.draft.picks.filter(pick => pick && pick.trim()).map((pick, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>{pick}</span>
                </li>
              ))}
            </ul>
          </div>
          )}
          {composition.draft.notes && composition.draft.notes.trim() && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-xs font-semibold text-gray-400 mb-1">Notas:</p>
            <p className="text-sm text-gray-300">{composition.draft.notes}</p>
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

        {/* Game Phases */}
        {(composition.earlyGame && Object.keys(composition.earlyGame).length > 0) || 
         (composition.midGame && (composition.midGame.objectives || composition.midGame.priority || composition.midGame.teamfight)) ||
         (composition.lateGame && (composition.lateGame.focus || composition.lateGame.jinxRole || composition.lateGame.execution || composition.lateGame.ifJinxDies)) ? (
        <div className="space-y-6">
          {/* Early Game */}
          {composition.earlyGame && Object.keys(composition.earlyGame).length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Early Game (0:00 - 15:00)</h3>
              <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Sobreviver e Farmar</span>
            </div>
            <div className="space-y-3">
              {Object.entries(composition.earlyGame).filter(([_, data]) => data && (data.focus || data.dontDo)).map(([role, data]) => (
                <div key={role} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="font-bold text-white mb-2 text-sm">{role}</p>
                  <div className="space-y-2">
                    {data.focus && data.focus.trim() && (
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-green-400 mb-1">Foco:</p>
                        <p className="text-xs text-gray-300 leading-relaxed">{data.focus}</p>
                      </div>
                    </div>
                    )}
                    {data.dontDo && data.dontDo.trim() && (
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-red-400 mb-1">Não Fazer:</p>
                        <p className="text-xs text-gray-300 leading-relaxed">{data.dontDo}</p>
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Mid Game */}
          {composition.midGame && (composition.midGame.objectives || composition.midGame.priority || composition.midGame.teamfight) && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Mid Game (15:00 - 25:00)</h3>
              <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Controle de Objetivos</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
              {composition.midGame.objectives && composition.midGame.objectives.trim() && (
              <div>
                <p className="text-xs font-semibold text-yellow-400 mb-1">Objetivos:</p>
                <p className="text-sm text-gray-300">{composition.midGame.objectives}</p>
              </div>
              )}
              {composition.midGame.priority && composition.midGame.priority.trim() && (
              <div>
                <p className="text-xs font-semibold text-yellow-400 mb-1">Prioridade:</p>
                <p className="text-sm text-gray-300">{composition.midGame.priority}</p>
              </div>
              )}
              {composition.midGame.teamfight && composition.midGame.teamfight.trim() && (
              <div>
                <p className="text-xs font-semibold text-yellow-400 mb-1">Primeira Teamfight:</p>
                <p className="text-sm text-gray-300">{composition.midGame.teamfight}</p>
              </div>
              )}
            </div>
          </div>
          )}

          {/* Late Game */}
          {composition.lateGame && (composition.lateGame.focus || composition.lateGame.jinxRole || composition.lateGame.execution || composition.lateGame.ifJinxDies) && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Late Game (25:00+)</h3>
              <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Execução da Vitória</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-4">
              {composition.lateGame.focus && composition.lateGame.focus.trim() && (
              <div>
                <p className="text-xs font-semibold text-purple-400 mb-1">Foco Total:</p>
                <p className="text-sm text-gray-300">{composition.lateGame.focus}</p>
              </div>
              )}
              {composition.lateGame.jinxRole && composition.lateGame.jinxRole.trim() && (
              <div>
                <p className="text-xs font-semibold text-purple-400 mb-1">O Papel do Carry Principal:</p>
                <p className="text-sm text-gray-300 leading-relaxed">{composition.lateGame.jinxRole}</p>
              </div>
              )}
              {composition.lateGame.execution && composition.lateGame.execution.trim() && (
              <div>
                <p className="text-xs font-semibold text-purple-400 mb-1">A Execução da Luta:</p>
                <p className="text-sm text-gray-300 leading-relaxed">{composition.lateGame.execution}</p>
              </div>
              )}
              {composition.lateGame.ifJinxDies && composition.lateGame.ifJinxDies.trim() && (
              <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                <p className="text-xs font-semibold text-red-400 mb-1">Se o Carry Principal Cair:</p>
                <p className="text-sm text-gray-300 leading-relaxed">{composition.lateGame.ifJinxDies}</p>
              </div>
              )}
            </div>
          </div>
          )}
        </div>
        ) : null}

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

