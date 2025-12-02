import { NextRequest, NextResponse } from "next/server";
import { CHAMPION_POOL } from "@/config/championPool";
import { Tier } from "@/config/championPool";
import { saveData, loadData } from "@/lib/storage";

const STORAGE_KEY = "champion-pool";

// Carrega dados do storage ou retorna padrão
async function loadPoolData(): Promise<Record<string, Record<Tier, string[]>>> {
  const saved = await loadData<Record<string, Record<Tier, string[]>>>(STORAGE_KEY);
  
  if (saved) {
    return saved;
  }
  
  // Retorna dados padrão do CHAMPION_POOL
  const initial: Record<string, Record<Tier, string[]>> = {};
  Object.keys(CHAMPION_POOL).forEach(role => {
    initial[role] = {
      splus: CHAMPION_POOL[role]?.splus || [],
      s: CHAMPION_POOL[role]?.s || [],
      a: CHAMPION_POOL[role]?.a || [],
      b: CHAMPION_POOL[role]?.b || [],
      c: CHAMPION_POOL[role]?.c || [],
    };
  });
  
  return initial;
}

// Salva dados no storage
async function savePoolData(data: Record<string, Record<Tier, string[]>>): Promise<boolean> {
  return await saveData(STORAGE_KEY, data);
}

// GET - Retorna os dados da champion pool
export async function GET(request: NextRequest) {
  try {
    const data = await loadPoolData();
    
    return NextResponse.json({
      data,
      lastModified: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Champion Pool API] Erro ao carregar:", error);
    return NextResponse.json(
      { error: "Erro ao carregar dados" },
      { status: 500 }
    );
  }
}

// POST - Salva os dados da champion pool
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = body;
    
    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }
    
    // Valida estrutura básica
    for (const [role, tiers] of Object.entries(data)) {
      if (!tiers || typeof tiers !== "object") continue;
      
      for (const [tier, champions] of Object.entries(tiers)) {
        if (!Array.isArray(champions)) {
          return NextResponse.json(
            { error: `Tier ${tier} da role ${role} deve ser um array` },
            { status: 400 }
          );
        }
      }
    }
    
    const saved = await savePoolData(data);
    
    if (!saved) {
      return NextResponse.json(
        { error: "Erro ao salvar dados. Verifique se o banco de dados está configurado." },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      lastModified: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Champion Pool API] Erro ao salvar:", error);
    return NextResponse.json(
      { error: "Erro ao salvar dados" },
      { status: 500 }
    );
  }
}

