import { NextRequest, NextResponse } from "next/server";
import { COMPOSITIONS, Composition } from "@/config/compositions";
import { saveData, loadData } from "@/lib/storage";

const STORAGE_KEY = "compositions";

// Carrega dados do storage ou retorna padrão
async function loadCompositions(): Promise<Composition[]> {
  const saved = await loadData<Composition[]>(STORAGE_KEY);
  
  if (saved && Array.isArray(saved)) {
    return saved;
  }
  
  // Retorna dados padrão do COMPOSITIONS
  return COMPOSITIONS;
}

// Salva dados no storage
async function saveCompositions(data: Composition[]): Promise<boolean> {
  return await saveData(STORAGE_KEY, data);
}

// GET - Retorna as composições
export async function GET(request: NextRequest) {
  try {
    const compositions = await loadCompositions();
    
    return NextResponse.json({
      compositions,
      lastModified: new Date().toISOString(),
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
    
    const saved = await saveCompositions(compositions);
    
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
    console.error("[Compositions API] Erro ao salvar:", error);
    return NextResponse.json(
      { error: "Erro ao salvar dados" },
      { status: 500 }
    );
  }
}

