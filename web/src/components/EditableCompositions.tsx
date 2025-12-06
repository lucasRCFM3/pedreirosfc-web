"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Composition } from "@/config/compositions";
import { ChampionData, normalizeChampionName } from "@/lib/champions";
import { Layers, Plus, Edit2, Trash2, RefreshCw, Wifi, WifiOff, Info, BookOpen, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CompositionEditor } from "./CompositionEditor";

const ROLE_COLORS = {
  top: 'border-pedreiro-purple',
  jungle: 'border-green-400',
  mid: 'border-pedreiro-blue',
  adc: 'border-red-400',
  support: 'border-pink-400'
};

const ROLE_LABELS = {
  top: 'TOP',
  jungle: 'JG',
  mid: 'MID',
  adc: 'ADC',
  support: 'SUP'
};

interface EditableCompositionsProps {
  version: string;
  allChampions: ChampionData[];
}

export function EditableCompositions({ version, allChampions }: EditableCompositionsProps) {
  const [compositions, setCompositions] = useState<Composition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSynced, setIsSynced] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [editingComposition, setEditingComposition] = useState<Composition | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  
  const lastKnownModified = useRef<string | null>(null);
  const hasLocalChanges = useRef(false);
  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Carrega composições da API
  const loadFromServer = useCallback(async () => {
    try {
      const response = await fetch("/api/compositions");
      if (!response.ok) throw new Error("Falha ao carregar dados");
      
      const result = await response.json();
      if (result.compositions) {
        setCompositions(result.compositions);
        lastKnownModified.current = result.lastModified || null;
        setIsSynced(true);
        setSyncError(null);
      }
    } catch (error) {
      console.error("Erro ao carregar composições:", error);
      setSyncError("Erro ao sincronizar");
      setIsSynced(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Salva composições na API
  const saveToServer = useCallback(async (data: Composition[]) => {
    setIsSaving(true);
    setSyncError(null);
    
    try {
      const response = await fetch("/api/compositions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ compositions: data }),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar dados");
      }

      const result = await response.json();
      lastKnownModified.current = result.lastModified || new Date().toISOString();
      hasLocalChanges.current = false;
      setIsSynced(true);
    } catch (error) {
      console.error("Erro ao salvar composições:", error);
      setSyncError("Erro ao salvar");
      setIsSynced(false);
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Verifica atualizações do servidor
  const checkForUpdates = useCallback(async () => {
    try {
      const response = await fetch("/api/compositions");
      if (!response.ok) return;

      const result = await response.json();
      const serverModified = result.lastModified || null;

      if (serverModified && serverModified !== lastKnownModified.current && !hasLocalChanges.current) {
        setCompositions(result.compositions);
        lastKnownModified.current = serverModified;
        setIsSynced(true);
      }
    } catch (error) {
      console.error("Erro ao verificar atualizações:", error);
    }
  }, []);

  // Carrega dados iniciais
  useEffect(() => {
    loadFromServer();
  }, [loadFromServer]);

  // Sincronização periódica (a cada 2 segundos)
  useEffect(() => {
    syncIntervalRef.current = setInterval(() => {
      checkForUpdates();
    }, 2000);

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [checkForUpdates]);

  // Salva no servidor quando há mudanças (com debounce)
  useEffect(() => {
    if (isLoading || editingComposition) return;

    hasLocalChanges.current = true;
    setIsSynced(false);

    const saveTimeout = setTimeout(() => {
      saveToServer(compositions);
    }, 1000);

    return () => {
      clearTimeout(saveTimeout);
    };
  }, [compositions, isLoading, saveToServer, editingComposition]);

  // Cria nova composição vazia
  const createNewComposition = () => {
    const newComp: Composition = {
      id: `composition-${Date.now()}`,
      title: "Nova Composição",
      objective: "Descreva o objetivo desta composição",
      champions: [
        { name: "Aatrox", role: "top", type: "", function: "", description: "" },
        { name: "Lee Sin", role: "jungle", type: "", function: "", description: "" },
        { name: "Zed", role: "mid", type: "", function: "", description: "" },
        { name: "Jinx", role: "adc", type: "", function: "", description: "" },
        { name: "Thresh", role: "support", type: "", function: "", description: "" },
      ],
      winConditions: [],
      weakPoints: [],
      draft: {
        bans: [],
        picks: [],
        notes: ""
      },
      earlyGame: {},
      midGame: {
        objectives: "",
        priority: "",
        teamfight: ""
      },
      lateGame: {
        focus: "",
        jinxRole: "",
        execution: "",
        ifJinxDies: ""
      }
    };
    
    setEditingComposition(newComp);
  };

  // Deleta composição
  const deleteComposition = (id: string) => {
    if (confirm("Tem certeza que deseja deletar esta composição?")) {
      setCompositions(compositions.filter(c => c.id !== id));
      if (editingComposition?.id === id) {
        setEditingComposition(null);
      }
    }
  };

  // Salva composição editada
  const handleSaveComposition = (savedComp: Composition) => {
    const existingIndex = compositions.findIndex(c => c.id === savedComp.id);
    
    if (existingIndex >= 0) {
      // Atualiza composição existente
      setCompositions(compositions.map(c => c.id === savedComp.id ? savedComp : c));
    } else {
      // Adiciona nova composição
      setCompositions([...compositions, savedComp]);
    }
    
    setEditingComposition(null);
  };

  const championUrl = (name: string) => normalizeChampionName(name);

  if (isLoading) {
    return (
      <div className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
          <p className="text-white">Carregando composições...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-white mb-2">
              Composições
            </h1>
            <p className="text-gray-400">Guia completo de estratégias para o pré-jogo</p>
          </div>
          
          {/* Indicador de sincronização e botão de criar */}
          <div className="flex items-center gap-4">
            {syncError && (
              <span className="text-xs text-red-400">{syncError}</span>
            )}
            <div className="flex items-center gap-1 text-xs text-gray-400">
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : isSynced ? (
                <>
                  <Wifi className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Sincronizado</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400">Sincronizando...</span>
                </>
              )}
            </div>
            <button
              onClick={createNewComposition}
              className="flex items-center gap-2 px-4 py-2 bg-pedreiro-purple hover:bg-pedreiro-purple/80 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nova Composição
            </button>
          </div>
        </div>

        {/* Instruções */}
        {showInstructions && (
          <div className="bg-pedreiro-purple/20 border border-pedreiro-purple/50 rounded-xl p-4 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <BookOpen className="w-5 h-5 text-pedreiro-purple mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-2">Como Editar Composições</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong>Clique em "Nova Composição"</strong> para criar uma composição do zero</li>
                    <li>• <strong>Clique no botão de editar (✏️)</strong> para editar uma composição existente</li>
                    <li>• <strong>No editor completo:</strong> Clique nas seções para expandir/contrair e editar tudo</li>
                    <li>• <strong>Todas as mudanças são salvas automaticamente</strong> e sincronizadas em tempo real</li>
                    <li>• <strong>Use os ícones de ajuda (?)</strong> para entender cada campo</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-gray-400 hover:text-white transition-colors"
                title="Fechar instruções"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Composition List */}
      {compositions.length === 0 ? (
        <div className="bg-white/5 rounded-3xl p-12 border border-white/10 text-center">
          <Info className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg mb-2">Nenhuma composição cadastrada ainda.</p>
          <p className="text-gray-500 text-sm mb-4">Clique em "Nova Composição" para começar.</p>
          <button
            onClick={() => setShowInstructions(true)}
            className="text-pedreiro-purple hover:text-pedreiro-purple/80 text-sm underline"
          >
            Ver instruções de como editar
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {compositions.map((composition) => (
            <div
              key={composition.id}
              className="bg-white/5 rounded-3xl p-6 border border-white/10 hover:border-pedreiro-purple/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-white mb-2">
                    {composition.title}
                  </h2>
                  <p className="text-sm text-gray-400">{composition.objective}</p>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Link
                    href={`/composicoes/${composition.id}`}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    title="Ver detalhes completos"
                  >
                    <Layers className="w-5 h-5 text-white" />
                  </Link>
                  <button
                    onClick={() => setEditingComposition(composition)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    title="Editar composição completa"
                  >
                    <Edit2 className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => deleteComposition(composition.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                    title="Deletar composição"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>

              {/* Champions Grid */}
              <div className="grid grid-cols-5 gap-3">
                {composition.champions.map((champ) => (
                  <div
                    key={champ.role}
                    className={`bg-white/5 rounded-xl p-3 border-2 ${ROLE_COLORS[champ.role]} flex flex-col items-center text-center`}
                  >
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mb-2">
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championUrl(champ.name)}.png`}
                        alt={champ.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="font-bold text-white text-sm">{champ.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{ROLE_LABELS[champ.role]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {editingComposition && (
        <CompositionEditor
          composition={editingComposition}
          version={version}
          allChampions={allChampions}
          onSave={handleSaveComposition}
          onCancel={() => {
            // Se estava criando nova, remove da lista
            if (!compositions.find(c => c.id === editingComposition.id)) {
              // É nova, apenas fecha
            }
            setEditingComposition(null);
          }}
        />
      )}
    </div>
  );
}
