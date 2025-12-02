import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { COMPOSITIONS, Composition } from "@/config/compositions";

const DATA_FILE = path.join(process.cwd(), "data", "compositions.json");

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
async function loadCompositions(): Promise<Composition[]> {
  await ensureDataDir();
  
  try {
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(fileContent);
    
    // Valida estrutura
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    // Arquivo não existe ou está corrompido, retorna padrão
    console.log("[Compositions API] Arquivo não encontrado, usando dados padrão");
  }
  
  // Retorna dados padrão do COMPOSITIONS
  return COMPOSITIONS;
}

// Salva dados no arquivo
async function saveCompositions(data: Composition[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// GET - Retorna as composições
export async function GET(request: NextRequest) {
  try {
    const compositions = await loadCompositions();
    
    // Tenta pegar a data de modificação do arquivo
    let lastModified = new Date().toISOString();
    try {
      const stats = await fs.stat(DATA_FILE);
      lastModified = stats.mtime.toISOString();
    } catch {
      // Arquivo não existe ainda, usa data atual
    }
    
    return NextResponse.json({
      compositions,
      lastModified,
    });
  } catch (error) {
    console.error("[Compositions API] Erro ao carregar:", error);
    return NextResponse.json(
      { error: "Erro ao carregar dados" },
      { status: 500 }
    );
  }
}

// POST - Salva as composições
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { compositions } = body;
    
    if (!compositions || !Array.isArray(compositions)) {
      return NextResponse.json(
        { error: "Dados inválidos - deve ser um array" },
        { status: 400 }
      );
    }
    
    // Valida estrutura básica
    for (const comp of compositions) {
      if (!comp.id || !comp.title || !comp.champions || !Array.isArray(comp.champions)) {
        return NextResponse.json(
          { error: `Composição inválida: deve ter id, title e champions array` },
          { status: 400 }
        );
      }
    }
    
    await saveCompositions(compositions);
    
    return NextResponse.json({
      success: true,
      lastModified: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Compositions API] Erro ao salvar:", error);
    return NextResponse.json(
      { error: "Erro ao salvar dados" },
      { status: 500 }
    );
  }
}

