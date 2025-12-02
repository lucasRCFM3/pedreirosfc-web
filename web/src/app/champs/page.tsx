"use client";

import { CHAMPION_MEMORY } from "@/lib/champion-memory";
import { normalizeChampionName } from "@/lib/champions";
import { Sword, TreeDeciduous, Zap, Crosshair, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

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

export default function ChampsPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [version, setVersion] = useState<string>("14.23.1");

  // Busca a versão do Data Dragon
  useEffect(() => {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((res) => res.json())
      .then((versions) => {
        if (versions && versions[0]) {
          setVersion(versions[0]);
        }
      })
      .catch(() => {
        // Fallback para versão padrão
        setVersion("14.23.1");
      });
  }, []);

  // Ordena alfabeticamente e filtra por lane
  const filteredChampions = useMemo(() => {
    let champions = Object.entries(CHAMPION_MEMORY);
    
    // Filtra por lane se selecionada
    if (selectedRole) {
      champions = champions.filter(([_, data]) => 
        data.roles.includes(selectedRole)
      );
    }
    
    // Ordena alfabeticamente
    champions.sort(([a], [b]) => a.localeCompare(b));
    
    return champions.map(([name]) => name);
  }, [selectedRole]);

  const championUrl = (name: string) => normalizeChampionName(name);

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-black tracking-tighter text-white mb-2">
          Campeões
        </h1>
        <p className="text-gray-300 text-lg">
          Clique em um campeão para ver sua build e lanes
        </p>
      </div>

      {/* Role Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedRole(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            selectedRole === null
              ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          Todos
        </button>
        {Object.entries(ROLE_ICONS).map(([role, Icon]) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedRole === role
                ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            {ROLE_LABELS[role as keyof typeof ROLE_LABELS]}
          </button>
        ))}
      </div>

      {/* Champions Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 gap-3">
        {filteredChampions.map((name) => (
          <Link
            key={name}
            href={`/champs/${championUrl(name).toLowerCase()}`}
            className="group relative aspect-square rounded-lg overflow-hidden border-2 border-white/10 hover:border-pedreiro-purple/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
          >
             <Image
               src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championUrl(name)}.png`}
               alt={name}
               fill
               className="object-cover group-hover:scale-110 transition-transform duration-300"
               sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, (max-width: 1280px) 16vw, 14vw"
               quality={100}
               priority={false}
             />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm font-bold text-white text-center">{name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
