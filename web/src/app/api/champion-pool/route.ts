import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { CHAMPION_POOL } from "@/config/championPool";
import { Tier } from "@/config/championPool";

const DATA_FILE = path.join(process.cwd(), "data", "champion-pool.json");

// Garante que o diretório existe
async function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Carrega dados do arquivo ou retorna padrão
async function loadPoolData(): Promise<Record<string, Record<Tier, string[]>>> {
  await ensureDataDir();
  
  try {
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(fileContent);
    
    // Valida estrutura
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  } catch (error) {
    // Arquivo não existe ou está corrompido, retorna padrão
    console.log("[Champion Pool] Arquivo não encontrado, usando dados padrão");
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

// Salva dados no arquivo
async function savePoolData(data: Record<string, Record<Tier, string[]>>): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// GET - Retorna os dados da champion pool
export async function GET(request: NextRequest) {
  try {
    const data = await loadPoolData();
    
    // Tenta pegar a data de modificação do arquivo
    let lastModified = new Date().toISOString();
    try {
      const stats = await fs.stat(DATA_FILE);
      lastModified = stats.mtime.toISOString();
    } catch {
      // Arquivo não existe ainda, usa data atual
    }
    
    return NextResponse.json({
      data,
      lastModified,
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
    
    await savePoolData(data);
    
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

