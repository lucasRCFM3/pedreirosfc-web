import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { saveData } from "@/lib/storage";

// Rota temporária para migrar dados locais para o Redis
export async function POST(request: NextRequest) {
  try {
    const { type } = await request.json();

    if (type === "champion-pool") {
      // Tenta carregar do arquivo local
      const localFile = path.join(process.cwd(), "data", "champion-pool.json");
      try {
        const fileContent = await fs.readFile(localFile, "utf-8");
        const data = JSON.parse(fileContent);
        
        // Salva no Redis
        const saved = await saveData("champion-pool", data);
        
        if (saved) {
          return NextResponse.json({ 
            success: true, 
            message: "Champion pool migrado com sucesso!" 
          });
        } else {
          return NextResponse.json(
            { error: "Erro ao salvar no Redis. Verifique as variáveis de ambiente." },
            { status: 500 }
          );
        }
      } catch (error) {
        return NextResponse.json(
          { error: "Arquivo local não encontrado ou inválido" },
          { status: 404 }
        );
      }
    }

    if (type === "compositions") {
      // Tenta carregar do arquivo local
      const localFile = path.join(process.cwd(), "data", "compositions.json");
      try {
        const fileContent = await fs.readFile(localFile, "utf-8");
        const data = JSON.parse(fileContent);
        
        // Salva no Redis
        const saved = await saveData("compositions", data);
        
        if (saved) {
          return NextResponse.json({ 
            success: true, 
            message: "Composições migradas com sucesso!" 
          });
        } else {
          return NextResponse.json(
            { error: "Erro ao salvar no Redis. Verifique as variáveis de ambiente." },
            { status: 500 }
          );
        }
      } catch (error) {
        return NextResponse.json(
          { error: "Arquivo local não encontrado ou inválido" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Tipo inválido. Use 'champion-pool' ou 'compositions'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[Migrate API] Erro:", error);
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}

