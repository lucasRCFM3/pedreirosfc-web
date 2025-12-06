import { TEAM_MEMBERS, Role } from "@/config/team";
import { getPlayerStats } from "@/lib/riot";
import { notFound } from "next/navigation";
import { Sword, TreeDeciduous, Zap, Crosshair, Heart, Clock, Trophy, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RefreshButton } from "@/components/RefreshButton";
import { Tooltip, FarmTooltip, VisionTooltip, KillParticipationTooltip } from "@/components/Tooltip";

const ROLE_MAP: Record<string, Role> = {
  "top": "top",
  "jungle": "jungle",
  "mid": "mid",
  "adc": "adc",
  "support": "support"
};

const ICONS = {
  top: Sword,
  jungle: TreeDeciduous,
  mid: Zap,
  adc: Crosshair,
  support: Heart
};

function formatTimeAgo(timestamp: number) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m atrás`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atrás`;
    return `${Math.floor(seconds / 86400)}d atrás`;
}

function getCsColor(csPerMin: number, role: Role): string {
    if (role === 'jungle') {
        if (csPerMin > 7.0) return 'text-blue-400';
        if (csPerMin >= 5.5) return 'text-yellow-400';
        return 'text-red-400';
    }
    if (role === 'support') {
        return 'text-gray-400';
    }
    if (csPerMin > 8.5) return 'text-blue-400';
    if (csPerMin >= 6.5) return 'text-yellow-400';
    return 'text-red-400';
}

function getVisionColor(visionPerMin: number, role: Role): string {
    if (role === 'support') {
        if (visionPerMin > 2.0) return 'text-blue-400';
        if (visionPerMin >= 1.5) return 'text-yellow-400';
        return 'text-red-400';
    }
    if (role === 'jungle') {
        if (visionPerMin > 1.2) return 'text-blue-400';
        if (visionPerMin >= 0.8) return 'text-yellow-400';
        return 'text-red-400';
    }
    if (visionPerMin > 0.8) return 'text-blue-400';
    if (visionPerMin >= 0.5) return 'text-yellow-400';
    return 'text-red-400';
}

function getWinRateColor(winRate: number): string {
    if (winRate < 50) return 'text-red-400';
    if (winRate <= 54) return 'text-yellow-400';
    return 'text-pedreiro-blue';
}

function getKillParticipationColor(kp: number, role: Role): string {
    const isJungle = role === 'jungle';
    const isSupport = role === 'support';
    const isTop = role === 'top';
    const isMid = role === 'mid';
    const isAdc = role === 'adc';

    if (isJungle || isSupport) {
        if (kp > 65) return 'text-blue-400';
        if (kp >= 50) return 'text-yellow-400';
        return 'text-red-400';
    }
    if (isMid || isAdc) {
        if (kp > 55) return 'text-blue-400';
        if (kp >= 40) return 'text-yellow-400';
        return 'text-red-400';
    }
    // Top
    if (kp > 50) return 'text-blue-400';
    if (kp >= 30) return 'text-yellow-400';
    return 'text-red-400';
}

function getChampionTier(winRate: number, kda: number, games: number): { tier: string; color: string } {
    // S+: Excelente - Win rate > 60% e KDA > 2.5 e pelo menos 3 jogos
    if (winRate > 60 && kda > 2.5 && games >= 3) {
        return { tier: 'S+', color: 'text-purple-400' };
    }
    // S: Bom - Win rate > 50% e KDA > 2.0 (com pelo menos 2 jogos, ou 1 jogo com stats excelentes)
    if (winRate > 50 && kda > 2.0) {
        if (games >= 2 || (games === 1 && winRate === 100 && kda > 3.0)) {
            return { tier: 'S', color: 'text-blue-400' };
        }
    }
    // A: Médio - Win rate 40-50% E KDA 1.5-2.0 (ambos devem ser verdadeiros)
    // Ou win rate > 50% mas KDA entre 1.5-2.0
    if ((winRate >= 40 && winRate <= 50 && kda >= 1.5 && kda <= 2.0) || 
        (winRate > 50 && kda >= 1.5 && kda <= 2.0)) {
        return { tier: 'A', color: 'text-yellow-400' };
    }
    // B: Horroroso - Win rate < 40% ou KDA < 1.5
    return { tier: 'B', color: 'text-red-400' };
}

type FilterType = 'all' | 'solo' | 'flex';

// Revalida a página a cada 5 minutos automaticamente
export const revalidate = 300;

export default async function RolePage(props: { params: Promise<{ roleName: string }>; searchParams: Promise<{ filter?: string }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const roleKey = ROLE_MAP[params.roleName.toLowerCase()];
  const filter = (searchParams.filter as FilterType) || 'all';
  
  if (!roleKey) {
    return notFound();
  }

  const member = TEAM_MEMBERS[roleKey];
  const Icon = ICONS[roleKey];

  let queueId: number | undefined;
  if (filter === 'solo') queueId = 420;
  if (filter === 'flex') queueId = 440;

  const data = await getPlayerStats(member.gameName, member.tagLine, queueId, false, roleKey);

  const isSupport = roleKey === 'support';
  const avgGameDurationMin = data && data.avgDuration && data.avgDuration > 0 ? data.avgDuration / 60 : 30;
  
  const avgCsPerMin = data && data.avgCs && avgGameDurationMin > 0 ? Number(data.avgCs) / avgGameDurationMin : 0;
  const avgVisionPerMin = data && data.avgVision && avgGameDurationMin > 0 ? Number(data.avgVision) / avgGameDurationMin : 0;
  const winRate = data && data.matches && data.matches.length > 0 ? (data.matches.filter(m => m.win).length / data.matches.length) * 100 : 0;
  const avgKillParticipation = data && data.avgKillParticipation ? data.avgKillParticipation : 0;

  const headerMetricColor = isSupport 
      ? getVisionColor(avgVisionPerMin, roleKey)
      : getCsColor(avgCsPerMin, roleKey);

  return (
    <div className="p-4 md:p-6 lg:p-12 max-w-6xl mx-auto min-h-screen flex flex-col lg:flex-row gap-6 md:gap-12">
      
      {/* Main Content */}
      <div className="flex-1 order-2 lg:order-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-white/5 pb-8">
            <div className="flex items-center gap-6">
                <div className="relative group">
                    <div className="absolute inset-0 bg-pedreiro-purple/20 blur-xl rounded-full group-hover:bg-pedreiro-purple/30 transition-all duration-500" />
                    <div className="relative p-4 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-sm">
                        <Icon className="w-10 h-10 text-pedreiro-purple" />
                    </div>
                </div>
                <div>
                    <h1 className="text-5xl font-black tracking-tighter text-white mb-1">
                        {member.gameName}
                    </h1>
                    <div className="flex items-center gap-3 text-gray-500 font-mono text-sm">
                        <span className="bg-white/5 px-2 py-0.5 rounded text-gray-300">#{member.tagLine}</span>
                        <span>•</span>
                        <span>{roleKey.toUpperCase()}</span>
                    </div>
                </div>
            </div>
            
            {/* Refresh Button */}
            <div className="flex items-end">
                <RefreshButton role={roleKey} filter={filter} />
            </div>
        </div>

        {/* Stats Overview */}
        {data && (
            <div className={`grid grid-cols-2 ${isSupport ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4 mb-12 overflow-visible`}>
                <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold mb-3">Win Rate</p>
                        <p className={`text-4xl font-black tabular-nums mb-2 ${getWinRateColor(winRate)}`}>
                            {winRate.toFixed(0)}%
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="font-medium">{data.matches.filter(m => m.win).length}W</span>
                            <span className="text-gray-600">•</span>
                            <span className="font-medium">{data.matches.filter(m => !m.win).length}L</span>
                        </div>
                    </div>
                </div>

                <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 overflow-visible">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold mb-3">Avg KP%</p>
                        <Tooltip
                            position="top"
                            content={<KillParticipationTooltip kp={avgKillParticipation} role={roleKey} />}
                        >
                            <p className={`text-4xl font-black tabular-nums mb-2 cursor-help ${getKillParticipationColor(avgKillParticipation, roleKey)}`}>
                                {avgKillParticipation.toFixed(1)}%
                            </p>
                        </Tooltip>
                        <p className="text-xs text-gray-500 font-medium">Last 20 games</p>
                    </div>
                </div>

                {!isSupport && (
                    <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 overflow-visible">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative">
                            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold mb-3">Avg Farm</p>
                            <Tooltip
                                position="top"
                                content={<FarmTooltip csPerMin={avgCsPerMin} role={roleKey} />}
                            >
                                <div className="cursor-help">
                                    <p className={`text-4xl font-black tabular-nums mb-1 ${getCsColor(avgCsPerMin, roleKey)}`}>
                                        {data.avgCs}
                                    </p>
                                    <p className={`text-sm font-semibold ${getCsColor(avgCsPerMin, roleKey)} opacity-80`}>
                                        {avgCsPerMin.toFixed(1)} cs/min
                                    </p>
                                </div>
                            </Tooltip>
                            <p className="text-xs text-gray-500 font-medium mt-2">Last 20 games</p>
                        </div>
                    </div>
                )}

                <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 overflow-visible">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold mb-3">Avg Vision</p>
                        <Tooltip
                            position="top"
                            content={<VisionTooltip visionPerMin={avgVisionPerMin} role={roleKey} />}
                        >
                            <div className="cursor-help">
                                <p className={`text-4xl font-black tabular-nums mb-1 ${getVisionColor(avgVisionPerMin, roleKey)}`}>
                                    {data.avgVision}
                                </p>
                                <p className={`text-sm font-semibold ${getVisionColor(avgVisionPerMin, roleKey)} opacity-80`}>
                                    {avgVisionPerMin.toFixed(1)} vis/min
                                </p>
                            </div>
                        </Tooltip>
                        <p className="text-xs text-gray-500 font-medium mt-2">Last 20 games</p>
                    </div>
                </div>
            </div>
        )}

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 md:mb-8 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            {[
                { id: 'all', label: 'Todas' },
                { id: 'solo', label: 'Solo' },
                { id: 'flex', label: 'Flex' }
            ].map((tab) => {
                const isActive = filter === tab.id;
                return (
                    <Link
                        key={tab.id}
                        href={`/role/${params.roleName}?filter=${tab.id}`}
                        className={`
                            px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0
                            ${isActive 
                                ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}
                        `}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </div>

        {/* Match List */}
        {!data ? (
            <div className="p-12 border border-white/5 bg-white/5 rounded-3xl text-center backdrop-blur-sm">
                <p className="text-gray-400">Carregando dados ou jogador não encontrado...</p>
            </div>
        ) : (
            <div className="flex flex-col gap-3">
                {data.matches.map((match) => {
                    const isWin = match.win;
                    const kills = match.kills || 0;
                    const deaths = match.deaths || 0;
                    const assists = match.assists || 0;
                    const kdaRatio = deaths === 0 ? (kills + assists).toFixed(2) : ((kills + assists) / deaths).toFixed(2);
                    
                    const gameDuration = match.gameDuration || 0;
                    const gameMin = gameDuration > 0 ? gameDuration / 60 : 1; // Evita divisão por zero
                    const cs = match.cs || 0;
                    const csPerMin = gameMin > 0 ? Number((cs / gameMin).toFixed(1)) : 0;
                    const csColor = getCsColor(csPerMin, roleKey);

                    const visionScore = match.visionScore || 0;
                    const visionPerMin = gameMin > 0 ? Number((visionScore / gameMin).toFixed(1)) : 0;
                    const visionColor = getVisionColor(visionPerMin, roleKey);
                    
                    const isSupport = roleKey === 'support';

                    return (
                    <div 
                        key={match.matchId}
                        className="group flex items-center gap-2 md:gap-4 p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 hover:bg-[#0f0f0f] transition-all duration-300"
                    >
                        {/* Status Strip */}
                        <div className={`w-1 h-12 rounded-full ${isWin ? 'bg-pedreiro-blue' : 'bg-red-500/50'}`} />

                        {/* Champion */}
                        <div className="flex items-center gap-2 md:gap-4 w-32 md:w-48 flex-shrink-0">
                            <div className="relative">
                                <Image 
                                    src={match.championImageUrl} 
                                    alt={match.champion}
                                    width={40}
                                    height={40}
                                    className={`rounded-lg ${!isWin && 'grayscale-[0.5]'} md:w-12 md:h-12`}
                                />
                            </div>
                            <div className="flex flex-col hidden sm:flex">
                                <span className={`font-bold text-xs md:text-sm ${isWin ? 'text-white' : 'text-gray-400'}`}>
                                    {match.champion}
                                </span>
                            </div>
                        </div>

                        {/* KDA & KP% */}
                        <div className="flex-1 flex flex-col items-center justify-center border-l border-white/5 border-r px-2 md:px-4 lg:px-8 gap-1 min-w-0">
                            <div className="flex items-baseline gap-1 text-lg font-medium text-gray-200 tabular-nums">
                                <span>{kills}</span>
                                <span className="text-gray-600 text-sm">/</span>
                                <span className="text-red-400">{deaths}</span>
                                <span className="text-gray-600 text-sm">/</span>
                                <span>{assists}</span>
                            </div>
                            <div className="text-xs text-gray-500 font-mono">
                                {kdaRatio} KDA
                            </div>
                            <div className={`text-xs font-mono ${getKillParticipationColor(match.killParticipation || 0, roleKey)}`}>
                                {(match.killParticipation || 0).toFixed(0)}% KP
                            </div>
                        </div>

                        {/* Metrics (CS & Vision) */}
                        <div className="w-24 md:w-40 text-right hidden sm:flex flex-col justify-center gap-1">
                            {isSupport ? (
                                <div className={`text-sm font-mono font-bold flex items-center justify-end gap-2 ${visionColor}`}>
                                    <Eye className="w-3 h-3" /> {visionScore} ({visionPerMin}/m)
                                </div>
                            ) : (
                                <>
                                    <div className={`text-sm font-mono font-bold ${csColor}`}>
                                        {cs} CS ({csPerMin}/m)
                                    </div>
                                    <div className={`text-xs font-mono flex items-center justify-end gap-1 ${visionColor}`}>
                                        <Eye className="w-3 h-3" /> {visionScore} ({visionPerMin}/m)
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Time */}
                        <div className="w-16 md:w-24 text-right flex flex-col items-end gap-1 pl-2 md:pl-4 border-l border-white/5 ml-1 md:ml-2">
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <Clock className="w-3 h-3" />
                                {Math.floor(gameMin)}m
                            </div>
                            <div className="text-[10px] text-gray-600">
                                {formatTimeAgo(match.gameCreation)}
                            </div>
                        </div>
                    </div>
                    );
                })}
            </div>
        )}
      </div>

      {/* Sidebar Right */}
      <div className="w-full lg:w-80 order-1 lg:order-2">
          {data && (
              <div className="sticky top-8">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      Top Campeões
                      <span className="text-xs font-normal text-gray-500 bg-white/5 px-2 py-1 rounded ml-auto">20 games</span>
                  </h3>

                  <div className="space-y-4">
                      {data.topChampions.map((champ) => {
                          const winRateNum = champ.winRate ? Number(champ.winRate) : 0;
                          const kdaNum = champ.kda ? Number(champ.kda) : 0;
                          const games = champ.total || 0;
                          const tier = getChampionTier(isNaN(winRateNum) ? 0 : winRateNum, isNaN(kdaNum) ? 0 : kdaNum, games);
                          
                          return (
                              <div key={champ.name} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                  <div className="relative">
                                      <Image 
                                          src={champ.imageUrl} 
                                          alt={champ.name} 
                                          width={40} 
                                          height={40} 
                                          className="rounded-full border border-white/10"
                                      />
                                      <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black/80 border-2 ${tier.color.replace('text-', 'border-')} flex items-center justify-center`}>
                                          <span className={`text-[10px] font-black ${tier.color}`}>{tier.tier}</span>
                                      </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-center mb-1">
                                          <p className="font-bold text-sm text-white truncate">{champ.name || 'Desconhecido'}</p>
                                          <p className={`text-xs font-bold ${winRateNum >= 50 ? 'text-pedreiro-blue' : 'text-red-400'}`}>
                                              {isNaN(winRateNum) ? '0' : winRateNum}% WR
                                          </p>
                                      </div>
                                      <div className="flex justify-between text-xs text-gray-400">
                                          <span>{isNaN(kdaNum) ? '0.00' : kdaNum} KDA</span>
                                          <span>{games} jogos</span>
                                      </div>
                                      
                                      <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                                          <div 
                                              className={`h-full rounded-full ${winRateNum >= 50 ? 'bg-pedreiro-blue' : 'bg-red-500'}`} 
                                              style={{ width: `${Math.min(100, Math.max(0, winRateNum))}%` }}
                                          />
                                      </div>
                                  </div>
                              </div>
                          );
                      })}

                      {data.topChampions.length === 0 && (
                          <p className="text-sm text-gray-500 italic">Nenhum dado suficiente para top campeões.</p>
                      )}
                  </div>
              </div>
          )}
      </div>

    </div>
  );
}
