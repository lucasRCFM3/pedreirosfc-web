"use client";

import { CompositionChampion } from "@/config/compositions";
import { normalizeChampionName } from "@/lib/champions";
import Image from "next/image";
import { useState } from "react";

interface ChampionAlternativesProps {
  champion: CompositionChampion;
  version: string;
  roleColor: string;
  roleLabel: string;
}

export function ChampionAlternatives({ champion, version, roleColor, roleLabel }: ChampionAlternativesProps) {
  const [showAlternatives, setShowAlternatives] = useState(false);
  const championUrl = (name: string) => normalizeChampionName(name);

  return (
    <div
      className={`bg-white/5 rounded-xl md:rounded-2xl p-2 md:p-4 border-2 ${roleColor} hover:bg-white/10 transition-all relative group`}
      onMouseEnter={() => setShowAlternatives(true)}
      onMouseLeave={() => setShowAlternatives(false)}
    >
      <div className="flex flex-col items-center text-center mb-2 md:mb-3">
        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/20 mb-2 md:mb-3">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championUrl(champion.name)}.png`}
            alt={champion.name}
            fill
            className="object-cover"
          />
        </div>
        <p className="font-bold text-white text-sm md:text-base lg:text-lg">{champion.name}</p>
        <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider mb-1">{roleLabel}</p>
        <p className="text-[10px] md:text-xs text-astryx-blue font-semibold">{champion.type}</p>
      </div>
      <div className="border-t border-white/10 pt-2 md:pt-3">
        <p className="text-[10px] md:text-xs text-gray-300 leading-relaxed">{champion.function}</p>
      </div>

      {/* Alternatives Tooltip */}
      {champion.alternatives && champion.alternatives.length > 0 && showAlternatives && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 md:w-64 bg-gray-900 text-white text-xs rounded-lg p-3 md:p-4 shadow-xl border border-white/10 backdrop-blur-sm z-50 pointer-events-none">
          <p className="font-bold text-white text-sm mb-3">Alternativas:</p>
          <div className="space-y-2">
            {champion.alternatives.map((alt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championUrl(alt)}.png`}
                    alt={alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-gray-300">{alt}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
}

