// Sistema de armazenamento que funciona tanto localmente (arquivos) quanto em produção (Redis/Upstash)

import { promises as fs } from "fs";
import path from "path";

// Configuração Redis (Upstash) - opcional
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const DATA_DIR = path.join(process.cwd(), "data");

// Helper para salvar no Redis (Upstash)
async function saveToRedis(key: string, value: any): Promise<boolean> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return false;
  }

  try {
    // Upstash Redis REST API - formato: comando no body como array
    const response = await fetch(`${REDIS_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "SET",
        key,
        JSON.stringify(value)
      ]),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Storage] Erro ao salvar no Redis:", errorText);
      return false;
    }

    const result = await response.json();
    return result.result === "OK";
  } catch (error) {
    console.error("[Storage] Erro ao salvar no Redis:", error);
    return false;
  }
}

// Helper para carregar do Redis (Upstash)
async function loadFromRedis<T>(key: string): Promise<T | null> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return null;
  }

  try {
    // Upstash Redis REST API - formato: comando no body como array
    const response = await fetch(`${REDIS_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "GET",
        key
      ]),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    // Redis retorna {"result": "..."} ou {"result": null}
    if (data.result === null || data.result === undefined) {
      return null;
    }
    
    // Se for string JSON, parse
    if (typeof data.result === 'string') {
      try {
        return JSON.parse(data.result);
      } catch {
        // Se falhar, retorna como está
        return null;
      }
    }
    
    return data.result as T;
  } catch (error) {
    console.error("[Storage] Erro ao carregar do Redis:", error);
    return null;
  }
}

// Salva usando Redis se disponível, senão usa arquivo local
export async function saveData<T>(key: string, data: T): Promise<boolean> {
  // Tenta Redis primeiro (produção)
  if (REDIS_URL && REDIS_TOKEN) {
    const redisSuccess = await saveToRedis(key, data);
    if (redisSuccess) {
      console.log(`[Storage] Dados salvos no Redis: ${key}`);
      return true;
    }
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
  if (REDIS_URL && REDIS_TOKEN) {
    const redisData = await loadFromRedis<T>(key);
    if (redisData) {
      console.log(`[Storage] Dados carregados do Redis: ${key}`);
      return redisData;
    }
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
