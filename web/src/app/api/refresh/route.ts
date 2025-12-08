import { NextRequest, NextResponse } from "next/server";
import { getPlayerStats } from "@/lib/riot";
import { TEAM_MEMBERS, Role } from "@/config/team";

// Cooldown de 120 segundos por jogador (aumentado para evitar rate limit)
const cooldowns = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    const { role, queueId } = await request.json();
    
    if (!role || !TEAM_MEMBERS[role as Role]) {
      return NextResponse.json({ error: "Role inválida" }, { status: 400 });
    }

    const member = TEAM_MEMBERS[role as Role];
    const now = Date.now();
    const lastRefresh = cooldowns.get(role) || 0;
    const timeSinceLastRefresh = (now - lastRefresh) / 1000;

    if (timeSinceLastRefresh < 120) {
      const remaining = Math.ceil(120 - timeSinceLastRefresh);
      return NextResponse.json(
        { error: `Aguarde ${remaining} segundos antes de atualizar novamente.`, cooldown: remaining },
        { status: 429 }
      );
    }

    // Atualiza cooldown
    cooldowns.set(role, now);

    // Busca dados com forceRefresh
    try {
      const data = await getPlayerStats(member.gameName, member.tagLine, queueId, true, role);

      if (!data) {
        console.error(`[API] getPlayerStats retornou null para ${member.gameName}#${member.tagLine}`);
        return NextResponse.json({ error: "Erro ao buscar dados - jogador não encontrado ou sem partidas" }, { status: 500 });
      }

      // Verifica se há partidas (pode estar vazio se o filtro não encontrou nada)
      if (data.matches && data.matches.length === 0 && queueId) {
        console.warn(`[API] Nenhuma partida encontrada para ${member.gameName}#${member.tagLine} com queueId ${queueId}`);
        // Retorna sucesso mesmo sem partidas, mas com array vazio
      }

      return NextResponse.json({ success: true, data });
    } catch (error) {
      console.error(`[API] Erro ao buscar dados para ${member.gameName}#${member.tagLine}:`, error);
      return NextResponse.json({ 
        error: error instanceof Error ? error.message : "Erro ao buscar dados" 
      }, { status: 500 });
    }
  } catch (error) {
    console.error("[API] Refresh error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
