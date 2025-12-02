// Cliente simples para Upstash Redis REST API

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL?.trim();
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

// Salva no Redis usando Upstash REST API
export async function redisSet(key: string, value: any): Promise<boolean> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    console.log("[Upstash] Redis não configurado (variáveis de ambiente ausentes)");
    return false;
  }

  try {
    // Upstash REST API usa POST com comando Redis no body
    const valueStr = JSON.stringify(value);
    const response = await fetch(REDIS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["SET", key, valueStr]),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Upstash] Erro ao salvar:", response.status, errorText);
      return false;
    }

    const result = await response.json();
    return result.result === "OK";
  } catch (error) {
    console.error("[Upstash] Erro ao salvar:", error);
    return false;
  }
}

// Carrega do Redis usando Upstash REST API
export async function redisGet<T>(key: string): Promise<T | null> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return null;
  }

  try {
    // Upstash REST API usa POST com comando Redis no body
    const response = await fetch(REDIS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["GET", key]),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data.result === null || data.result === undefined) {
      return null;
    }

    // Parse JSON se for string
    if (typeof data.result === 'string') {
      try {
        return JSON.parse(data.result);
      } catch {
        return data.result as T;
      }
    }

    return data.result as T;
  } catch (error) {
    console.error("[Upstash] Erro ao carregar:", error);
    return null;
  }
}

