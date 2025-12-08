import { NextRequest, NextResponse } from "next/server";
import { checkLatestMatch } from "@/lib/riot";
import { TEAM_MEMBERS, Role } from "@/config/team";

// Cooldown de 90 segundos (1.5 minutos) para update rápido
const cooldowns = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    const { role, queueId } = await request.json();
    
    if (!role || !TEAM_MEMBERS[role as Role]) {
      return NextResponse.json({ error: "Role inválida" }, { status: 400 });
    }

    const member = TEAM_MEMBERS[role as Role];
    const now = Date.now();
    const lastUpdate = cooldowns.get(role) || 0;
    const timeSinceLastUpdate = (now - lastUpdate) / 1000;

    if (timeSinceLastUpdate < 90) {
      const remaining = Math.ceil(90 - timeSinceLastUpdate);
      return NextResponse.json(
        { error: `Aguarde ${remaining} segundos antes de atualizar novamente.`, cooldown: remaining },
        { status: 429 }
      );
    }

    // Atualiza cooldown
    cooldowns.set(role, now);

    // Verifica apenas a última partida
    try {
      const result = await checkLatestMatch(member.gameName, member.tagLine, queueId, role);

      if (!result) {
        return NextResponse.json({ error: "Erro ao verificar partidas" }, { status: 500 });
      }

      // Se não tem nova partida, retorna sucesso mas sem dados novos
      if ('hasNewMatch' in result && !result.hasNewMatch) {
        return NextResponse.json({ 
          success: true, 
          hasNewMatch: false,
          message: "Nenhuma partida nova encontrada"
        });
      }

      // Se tem nova partida, retorna os dados atualizados
      return NextResponse.json({ 
        success: true, 
        hasNewMatch: true,
        data: result 
      });
    } catch (error) {
      console.error(`[API] Erro ao verificar última partida para ${member.gameName}#${member.tagLine}:`, error);
      return NextResponse.json({ 
        error: error instanceof Error ? error.message : "Erro ao buscar dados" 
      }, { status: 500 });
    }
  } catch (error) {
    console.error("[API] Quick update error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

