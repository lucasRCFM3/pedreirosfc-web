// Sistema de armazenamento que funciona tanto localmente (arquivos) quanto em produção (Redis/Upstash)

import { promises as fs } from "fs";
import path from "path";
import { redisSet, redisGet } from "./upstash";

const DATA_DIR = path.join(process.cwd(), "data");

// Salva usando Redis se disponível, senão usa arquivo local
export async function saveData<T>(key: string, data: T): Promise<boolean> {
  // Tenta Redis primeiro (produção)
  const redisSuccess = await redisSet(key, data);
  if (redisSuccess) {
    console.log(`[Storage] Dados salvos no Redis: ${key}`);
    return true;
  }

  // Fallback para arquivo local (desenvolvimento)
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const filePath = path.join(DATA_DIR, `${key}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`[Storage] Dados salvos em arquivo local: ${key}`);
    return true;
  } catch (error) {
    // No Netlify, arquivo local não funciona (read-only)
    console.error(`[Storage] Erro ao salvar arquivo ${key}:`, error);
    return false;
  }
}

// Carrega usando Redis se disponível, senão usa arquivo local
export async function loadData<T>(key: string): Promise<T | null> {
  // Tenta Redis primeiro (produção)
  const redisData = await redisGet<T>(key);
  if (redisData) {
    console.log(`[Storage] Dados carregados do Redis: ${key}`);
    return redisData;
  }

  // Fallback para arquivo local (desenvolvimento)
  try {
    const filePath = path.join(DATA_DIR, `${key}.json`);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    console.log(`[Storage] Dados carregados de arquivo local: ${key}`);
    return data;
  } catch (error) {
    // Arquivo não existe ou erro ao ler
    return null;
  }
}
