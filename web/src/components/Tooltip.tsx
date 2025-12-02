"use client";

import { ReactNode } from "react";
import { Role } from "@/config/team";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ children, content, position = "top" }: TooltipProps) {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`
          absolute ${positionClasses[position]}
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-all duration-200 z-[100] pointer-events-none
          w-max min-w-[220px] max-w-sm
        `}
      >
        <div className="bg-gray-900 text-white text-xs rounded-lg px-4 py-3 shadow-xl border border-white/10 backdrop-blur-sm whitespace-normal">
          {content}
          <div
            className={`
              absolute w-2 h-2 bg-gray-900 border-r border-b border-white/10
              ${position === "top" ? "top-full left-1/2 -translate-x-1/2 rotate-45 -mt-1" : ""}
              ${position === "bottom" ? "bottom-full left-1/2 -translate-x-1/2 rotate-45 -mb-1" : ""}
              ${position === "left" ? "left-full top-1/2 -translate-y-1/2 rotate-45 -ml-1" : ""}
              ${position === "right" ? "right-full top-1/2 -translate-y-1/2 rotate-45 -mr-1" : ""}
            `}
          />
        </div>
      </div>
    </div>
  );
}

interface FarmTooltipProps {
  csPerMin: number;
  role: Role;
}

export function FarmTooltip({ csPerMin, role }: FarmTooltipProps) {
  const isJungle = role === "jungle";
  
  const thresholds = isJungle
    ? { excellent: 7.0, medium: 5.5 }
    : { excellent: 8.5, medium: 6.5 };

  const getColor = () => {
    if (csPerMin > thresholds.excellent) return "text-blue-400";
    if (csPerMin >= thresholds.medium) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatus = () => {
    if (csPerMin > thresholds.excellent) return "Excelente";
    if (csPerMin >= thresholds.medium) return "Médio";
    return "Baixo";
  };

  return (
    <div className="space-y-2.5 min-w-[200px]">
      <div className="font-bold text-white text-sm mb-2">Farm por Minuto (CS/min)</div>
      <div className="space-y-1.5 text-gray-300 text-xs">
        <div key="excellent" className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
          <span>Azul: {isJungle ? "> 7.0" : "> 8.5"} (Excelente)</span>
        </div>
        <div key="medium" className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0" />
          <span>Amarelo: {isJungle ? "5.5 a 7.0" : "6.5 a 8.5"} (Médio)</span>
        </div>
        <div key="low" className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
          <span>Vermelho: {isJungle ? "< 5.5" : "< 6.5"} (Baixo)</span>
        </div>
      </div>
      <div className="pt-2 border-t border-white/10 mt-2">
        <div className="text-xs text-gray-300 mb-1">
          Seu valor: <span className={`font-semibold ${getColor()}`}>{csPerMin.toFixed(1)}/min</span> ({getStatus()})
        </div>
        <div className="text-[10px] text-gray-400 mt-1">Nota: O cálculo considera o tempo de partida.</div>
      </div>
    </div>
  );
}

interface VisionTooltipProps {
  visionPerMin: number;
  role: Role;
}

export function VisionTooltip({ visionPerMin, role }: VisionTooltipProps) {
  const isSupport = role === "support";
  const isJungle = role === "jungle";

  const thresholds = isSupport
    ? { excellent: 2.0, medium: 1.5 }
    : isJungle
    ? { excellent: 1.2, medium: 0.8 }
    : { excellent: 0.8, medium: 0.5 };

  const getColor = () => {
    if (visionPerMin > thresholds.excellent) return "text-blue-400";
    if (visionPerMin >= thresholds.medium) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatus = () => {
    if (visionPerMin > thresholds.excellent) return "Excelente";
    if (visionPerMin >= thresholds.medium) return "Média";
    return "Baixa";
  };

  const roleName = isSupport ? "Suporte" : isJungle ? "Jungle" : "Laner";

  return (
    <div className="space-y-2.5 min-w-[200px]">
      <div className="font-bold text-white text-sm mb-2">Visão por Minuto</div>
      <div className="space-y-1.5 text-gray-300 text-xs">
        <div key="excellent" className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
          <span>Azul: &gt; {thresholds.excellent.toFixed(1)} (Excelente)</span>
        </div>
        <div key="medium" className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0" />
          <span>Amarelo: {thresholds.medium.toFixed(1)} a {thresholds.excellent.toFixed(1)} (Média)</span>
        </div>
        <div key="low" className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
          <span>Vermelho: &lt; {thresholds.medium.toFixed(1)} (Baixa)</span>
        </div>
      </div>
      <div className="pt-2 border-t border-white/10 mt-2">
        <div className="text-xs text-gray-300 mb-1">
          Seu valor: <span className={`font-semibold ${getColor()}`}>{visionPerMin.toFixed(1)}/min</span> ({getStatus()})
        </div>
        <div className="text-[10px] text-gray-400 mt-1">Meta para {roleName}</div>
      </div>
    </div>
  );
}

interface KillParticipationTooltipProps {
  kp: number;
  role: Role;
}

export function KillParticipationTooltip({ kp, role }: KillParticipationTooltipProps) {
  const isJungle = role === "jungle";
  const isSupport = role === "support";
  const isTop = role === "top";
  const isMid = role === "mid";
  const isAdc = role === "adc";

  // Thresholds por role
  let thresholds: { excellent: number; medium: number };
  let roleName: string;
  
  if (isJungle || isSupport) {
    thresholds = { excellent: 65, medium: 50 };
    roleName = isJungle ? "Jungle" : "Suporte";
  } else if (isMid || isAdc) {
    thresholds = { excellent: 55, medium: 40 };
    roleName = isMid ? "Mid" : "ADC";
  } else {
    // Top
    thresholds = { excellent: 50, medium: 30 };
    roleName = "Top";
  }

  const getColor = () => {
    if (kp > thresholds.excellent) return "text-blue-400";
    if (kp >= thresholds.medium) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatus = () => {
    if (kp > thresholds.excellent) return isTop ? "Teleporte Bom" : isJungle || isSupport ? "Onipresente" : "Hyper Carry";
    if (kp >= thresholds.medium) return isTop ? "Split Padrão" : isMid || isAdc ? "Na média" : "Padrão";
    return isTop ? "AFK Top" : isMid || isAdc ? "Farm Simulator" : "Ausente";
  };

  return (
    <div className="space-y-2.5 min-w-[200px]">
      <div className="font-bold text-white text-sm mb-2">Participação em Abates (KP%)</div>
      <div className="text-xs text-gray-400 mb-2">
        Fórmula: (Kills + Assists) / Total de Kills do Time
      </div>
      <div className="space-y-1.5 text-gray-300 text-xs">
        <div key="excellent" className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
          <span>Azul: &gt; {thresholds.excellent}% ({isTop ? "Teleporte Bom" : isJungle || isSupport ? "Onipresente" : "Hyper Carry"})</span>
        </div>
        <div key="medium" className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0" />
          <span>Amarelo: {thresholds.medium}% - {thresholds.excellent}% ({isTop ? "Split Padrão" : isMid || isAdc ? "Na média" : "Padrão"})</span>
        </div>
        <div key="low" className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
          <span>Vermelho: &lt; {thresholds.medium}% ({isTop ? "AFK Top" : isMid || isAdc ? "Farm Simulator" : "Ausente"})</span>
        </div>
      </div>
      <div className="pt-2 border-t border-white/10 mt-2">
        <div className="text-xs text-gray-300 mb-1">
          Seu valor: <span className={`font-semibold ${getColor()}`}>{kp.toFixed(1)}%</span> ({getStatus()})
        </div>
        {isTop && (
          <div className="text-[10px] text-gray-400 mt-1 italic">
            Nota: Top Laners focados em Split Push naturalmente terão KP menor. Isso não indica má performance se as torres estiverem caindo.
          </div>
        )}
        <div className="text-[10px] text-gray-400 mt-1">Meta para {roleName}</div>
      </div>
    </div>
  );
}

