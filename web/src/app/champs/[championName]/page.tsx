import { CHAMPION_MEMORY } from "@/lib/champion-memory";
import { getLatestDDVersion } from "@/lib/riot";
import { getItemIconUrlByName } from "@/lib/items";
import { getSummonerSpellIconUrl } from "@/lib/summoner-spells";
import { getRuneIconUrl, getStatShardIconUrl } from "@/lib/runes";
import { normalizeChampionName } from "@/lib/champions";
import { Sword, TreeDeciduous, Zap, Crosshair, Heart, ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

const ROLE_COLORS = {
  top: 'text-pedreiro-purple',
  jungle: 'text-green-400',
  mid: 'text-pedreiro-blue',
  adc: 'text-red-400',
  support: 'text-pink-400',
};

export default async function ChampionDetailPage(props: { params: Promise<{ championName: string }> }) {
  const params = await props.params;
  const version = await getLatestDDVersion();
  
  // Normaliza o nome do campeão (capitaliza primeira letra de cada palavra)
  // Remove hífens e converte para formato da memória
  let championName = params.championName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  // Tenta encontrar na memória
  let championData = CHAMPION_MEMORY[championName];
  
  // Se não encontrou, tenta variantes (ex: KogMaw -> Kog'Maw)
  if (!championData) {
    // Lista de mapeamentos conhecidos para nomes com apóstrofes
    const nameVariants: Record<string, string> = {
      'Kogmaw': 'Kog\'Maw',
      'Kog Maw': 'Kog\'Maw',
    };
    
    if (nameVariants[championName]) {
      championName = nameVariants[championName];
      championData = CHAMPION_MEMORY[championName];
    }
  }

  if (!championData) {
    return notFound();
  }

  // Processa os itens de forma assíncrona antes do render
  const itemUrls = await Promise.all(
    championData.build.items.map(async (item) => ({
      name: item,
      url: await getItemIconUrlByName(item, version)
    }))
  );

  const situationalItemUrls = championData.build.situationalItems
    ? await Promise.all(
        championData.build.situationalItems.map(async (item) => ({
          name: item,
          url: await getItemIconUrlByName(item, version)
        }))
      )
    : [];

  const summonerSpellUrls = championData.build.summoners.map((spell) => ({
    name: spell,
    url: getSummonerSpellIconUrl(spell, version)
  }));

  const runeUrls = championData.build.runes
    ? championData.build.runes.map((rune) => ({
        name: rune,
        url: getRuneIconUrl(rune, version)
      }))
    : [];

  const statShardUrls = championData.build.statShards
    ? championData.build.statShards.map((stat) => ({
        name: stat,
        url: getStatShardIconUrl(stat, version)
      }))
    : [];

  const championUrl = (name: string) => normalizeChampionName(name);
  const roles = championData.roles;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto min-h-screen">
      {/* Back Button */}
      <Link
        href="/champs"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Voltar para Campeões</span>
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg group hover:border-pedreiro-purple/50 transition-all duration-300">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championUrl(championName)}.png`}
              alt={championName}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-black tracking-tighter text-white mb-2">
              {championName}
            </h1>
            <div className="flex flex-wrap gap-2 mb-2">
              {roles.map((role) => {
                const Icon = ROLE_ICONS[role as keyof typeof ROLE_ICONS];
                return (
                  <div
                    key={role}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 ${ROLE_COLORS[role as keyof typeof ROLE_COLORS]}`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span className="text-xs font-semibold">{ROLE_LABELS[role as keyof typeof ROLE_LABELS]}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Dados fornecidos por</span>
              <a
                href="https://mobalytics.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pedreiro-purple hover:text-pedreiro-blue transition-colors flex items-center gap-1 font-medium hover:underline"
              >
                Mobalytics
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Top Row: Spells and Runes */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Summoner Spells */}
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-2">Feitiços</h2>
            <div className="flex gap-2">
              {summonerSpellUrls.map((spell, idx) => (
                <div
                  key={idx}
                  className="relative w-14 h-14 rounded-lg overflow-hidden group hover:scale-105 transition-all"
                  title={spell.name}
                >
                  {spell.url ? (
                    <Image
                      src={spell.url}
                      alt={spell.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700/50 rounded-lg">
                      <span className="text-xs text-gray-400">{spell.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Runes */}
          {championData.build.runes && championData.build.runes.length > 0 && (
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-purple-400">Runas</h2>
                {championData.build.primaryTree && championData.build.secondaryTree && (
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold text-xs border border-purple-500/30">
                      {championData.build.primaryTree}
                    </span>
                    <span className="text-gray-500 text-xs">+</span>
                    <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-semibold text-xs border border-yellow-500/30">
                      {championData.build.secondaryTree}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Runas organizadas por árvore */}
              <div className="flex gap-3 mb-2">
                {/* Árvore Primária (Resolve) - 4 runas em coluna */}
                <div className="flex flex-col gap-1.5">
                  {runeUrls.slice(0, 4).map((rune, idx) => (
                    <div
                      key={idx}
                      className="relative group"
                      title={rune.name}
                    >
                      {rune.url ? (
                        <div className={`relative ${idx === 0 ? 'w-14 h-14' : 'w-12 h-12'} rounded-lg overflow-hidden group-hover:scale-105 transition-all`}>
                          <Image
                            src={rune.url}
                            alt={rune.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className={`${idx === 0 ? 'w-14 h-14' : 'w-12 h-12'} bg-gray-700/50 rounded-lg flex items-center justify-center`}>
                          <span className="text-[6px] text-gray-400 text-center px-1">{rune.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Árvore Secundária (Inspiration) - 2 runas em coluna */}
                {runeUrls.length > 4 && (
                  <div className="flex flex-col gap-1.5">
                    {runeUrls.slice(4, 6).map((rune, idx) => (
                      <div
                        key={idx + 4}
                        className="relative group"
                        title={rune.name}
                      >
                        {rune.url ? (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden group-hover:scale-105 transition-all">
                            <Image
                              src={rune.url}
                              alt={rune.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center">
                            <span className="text-[6px] text-gray-400 text-center px-1">{rune.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Stat Shards */}
              {statShardUrls.length > 0 && (
                <div className="pt-2 border-t border-white/10">
                  <div className="flex gap-1.5">
                    {statShardUrls.map((stat, idx) => (
                      <div
                        key={idx}
                        className="relative group"
                        title={stat.name}
                      >
                        {stat.url ? (
                          <div className="relative w-7 h-7 rounded-full overflow-hidden group-hover:scale-110 transition-all">
                            <Image
                              src={stat.url}
                              alt={stat.name}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                        ) : (
                          <div className="w-7 h-7 bg-gray-700/50 rounded-full flex items-center justify-center">
                            <span className="text-[5px] text-gray-400 text-center px-1">{stat.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Core Items */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
          <h2 className="text-lg font-bold text-orange-400 mb-2">Itens Principais</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {itemUrls.map((item, idx) => (
              <div
                key={idx}
                className="relative group"
                title={item.name}
              >
                {item.url ? (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden group-hover:scale-105 transition-all">
                    <Image
                      src={item.url}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-700/50 rounded-lg flex items-center justify-center">
                    <span className="text-[7px] text-gray-400 text-center px-1">{item.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Situational Items */}
        {situationalItemUrls.length > 0 && (
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <h2 className="text-lg font-bold text-blue-400 mb-2">Itens Situacionais</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {situationalItemUrls.map((item, idx) => (
                <div
                  key={idx}
                  className="relative group"
                  title={item.name}
                >
                  {item.url ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden group-hover:scale-105 transition-all">
                      <Image
                        src={item.url}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-700/50 rounded-lg border border-white/20 flex items-center justify-center">
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
}

