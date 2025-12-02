import { Composition, COMPOSITIONS } from "@/config/compositions";
import { loadData } from "./storage";

// Busca composições salvas (da API/storage) ou retorna as padrão
export async function getAllCompositions(): Promise<Composition[]> {
  try {
    // Tenta carregar do storage (Redis ou arquivo local)
    const saved = await loadData<Composition[]>("compositions");
    
    if (saved && Array.isArray(saved)) {
      // Combina composições salvas com as padrão (se houver IDs novos)
      const savedIds = new Set(saved.map((c: Composition) => c.id));
      const defaultCompositions = COMPOSITIONS.filter(c => !savedIds.has(c.id));
      return [...saved, ...defaultCompositions];
    }
  } catch (error) {
    console.error("[Compositions] Erro ao carregar:", error);
  }
  
  return COMPOSITIONS;
}

// Busca uma composição específica por ID
export async function getCompositionById(id: string): Promise<Composition | null> {
  const allCompositions = await getAllCompositions();
  return allCompositions.find(c => c.id === id) || null;
}

