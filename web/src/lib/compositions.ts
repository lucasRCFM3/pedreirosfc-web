import { Composition, COMPOSITIONS } from "@/config/compositions";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "compositions.json");

// Busca composições salvas (da API/arquivo) ou retorna as padrão
export async function getAllCompositions(): Promise<Composition[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(fileContent);
    
    if (Array.isArray(parsed)) {
      // Combina composições salvas com as padrão (se houver IDs novos)
      const savedIds = new Set(parsed.map((c: Composition) => c.id));
      const defaultCompositions = COMPOSITIONS.filter(c => !savedIds.has(c.id));
      return [...parsed, ...defaultCompositions];
    }
  } catch (error) {
    // Arquivo não existe ou está corrompido, retorna apenas padrão
  }
  
  return COMPOSITIONS;
}

// Busca uma composição específica por ID
export async function getCompositionById(id: string): Promise<Composition | null> {
  const allCompositions = await getAllCompositions();
  return allCompositions.find(c => c.id === id) || null;
}

