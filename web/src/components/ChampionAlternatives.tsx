"use client";

import { CompositionChampion } from "@/config/compositions";
import { normalizeChampionName } from "@/lib/champions";
import Image from "next/image";

interface ChampionAlternativesProps {
  champion: CompositionChampion;
  version: string;
  roleColor: string;
  roleLabel: string;
}

export function ChampionAlternatives({ champion, version, roleColor, roleLabel }: ChampionAlternativesProps) {
  const championUrl = (name: string) => normalizeChampionName(name);
  const hasAlternatives = champion.alternatives && champion.alternatives.length > 0;

  return (
    <div
      className={`bg-white/5 rounded-2xl p-4 border-2 ${roleColor} hover:bg-white/10 transition-all relative group`}
    >
      <div className="flex flex-col items-center text-center mb-3">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 mb-3">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championUrl(champion.name)}.png`}
            alt={champion.name}
            fill
            className="object-cover"
          />
        </div>
        <p className="font-bold text-white text-lg">{champion.name}</p>
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{roleLabel}</p>
        <p className="text-xs text-pedreiro-blue font-semibold">{champion.type}</p>
      </div>
      <div className="border-t border-white/10 pt-3 mb-3">
        <p className="text-xs text-gray-300 leading-relaxed">{champion.function}</p>
      </div>

      {/* Alternatives - Sempre visível */}
      {hasAlternatives && (
        <div className="border-t border-white/10 pt-3">
          <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Alternativas:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {champion.alternatives.map((alt, idx) => (
              <div key={idx} className="relative group/alt" title={alt}>
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 hover:border-pedreiro-blue transition-colors">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championUrl(alt)}.png`}
                    alt={alt}
                    fill
                    className="object-cover opacity-80 group-hover/alt:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

