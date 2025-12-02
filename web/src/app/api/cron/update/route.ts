import { NextRequest, NextResponse } from "next/server";
import { getPlayerStats } from "@/lib/riot";
import { TEAM_MEMBERS, Role } from "@/config/team";

// Rota para atualização automática periódica (pode ser chamada por cron job externo)
// O Next.js também atualiza automaticamente com revalidate: 300, mas esta rota garante atualização mesmo sem tráfego
export async function GET(request: NextRequest) {
  try {
    // Verifica se tem uma chave secreta para proteger a rota (opcional)
    const authHeader = request.headers.get("authorization");
    const secret = process.env.CRON_SECRET;
    
    if (secret && authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results: Record<string, { success: boolean; error?: string }> = {};

    // Atualiza dados de todos os jogadores
    for (const [role, member] of Object.entries(TEAM_MEMBERS)) {
      try {
        // Atualiza para cada tipo de fila (all, solo, flex)
        await Promise.all([
          getPlayerStats(member.gameName, member.tagLine, undefined, false, role), // All
          getPlayerStats(member.gameName, member.tagLine, 420, false, role), // Solo
          getPlayerStats(member.gameName, member.tagLine, 440, false, role), // Flex
        ]);
        
        results[role] = { success: true };
      } catch (error) {
        console.error(`[CRON] Error updating ${role}:`, error);
        results[role] = { 
          success: false, 
          error: error instanceof Error ? error.message : "Unknown error" 
        };
      }
    }

    return NextResponse.json({ 
      success: true, 
      updated: new Date().toISOString(),
      results 
    });
  } catch (error) {
    console.error("[CRON] Update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

