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
      className={`bg-white/5 rounded-2xl p-4 border-2 ${roleColor} hover:bg-white/10 transition-all relative group`}
      onMouseEnter={() => setShowAlternatives(true)}
      onMouseLeave={() => setShowAlternatives(false)}
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
      <div className="border-t border-white/10 pt-3">
        <p className="text-xs text-gray-300 leading-relaxed">{champion.function}</p>
      </div>

      {/* Alternatives Tooltip */}
      {champion.alternatives && champion.alternatives.length > 0 && showAlternatives && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-4 shadow-xl border border-white/10 backdrop-blur-sm z-50 pointer-events-none">
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900" />
        </div>
      )}
    </div>
  );
}

