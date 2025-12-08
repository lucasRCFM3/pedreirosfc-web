"use client";

import { useState, useEffect, useRef } from "react";
import { Composition, CompositionChampion, WinCondition, WeakPoint } from "@/config/compositions";
import { ChampionData, normalizeChampionName } from "@/lib/champions";
import { 
  ChevronDown, ChevronUp, Plus, X, Save, Info, HelpCircle, 
  Users, Target, Trophy, Ban, Package, AlertCircle
} from "lucide-react";
import Image from "next/image";

const ROLE_COLORS = {
  top: 'border-astryx-purple',
  jungle: 'border-green-400',
  mid: 'border-astryx-blue',
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

interface CompositionEditorProps {
  composition: Composition;
  version: string;
  allChampions: ChampionData[];
  onSave: (composition: Composition) => void;
  onCancel: () => void;
}

export function CompositionEditor({ composition, version, allChampions, onSave, onCancel }: CompositionEditorProps) {
  const initialComp = JSON.parse(JSON.stringify(composition));
  // Garante que weakPoints existe para compatibilidade com dados antigos
  if (!initialComp.weakPoints) {
    initialComp.weakPoints = [];
  }
  const [editedComp, setEditedComp] = useState<Composition>(initialComp);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    champions: true,
    winConditions: false,
    weakPoints: false,
    draft: false,
    synergies: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateField = (path: string[], value: any) => {
    setEditedComp(prev => {
      const newComp = JSON.parse(JSON.stringify(prev));
      let current: any = newComp;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      return newComp;
    });
  };

  const updateChampion = (role: string, updates: Partial<CompositionChampion>) => {
    setEditedComp(prev => ({
      ...prev,
      champions: prev.champions.map(champ => 
        champ.role === role ? { ...champ, ...updates } : champ
      )
    }));
  };

  const addWinCondition = () => {
    const newId = editedComp.winConditions.length > 0
      ? Math.max(...editedComp.winConditions.map(wc => wc.id)) + 1
      : 1;
    
    setEditedComp(prev => ({
      ...prev,
      winConditions: [...prev.winConditions, { id: newId, title: "", details: "" }]
    }));
  };

  const removeWinCondition = (id: number) => {
    setEditedComp(prev => ({
      ...prev,
      winConditions: prev.winConditions.filter(wc => wc.id !== id)
    }));
  };

  const updateWinCondition = (id: number, field: 'title' | 'details', value: string) => {
    setEditedComp(prev => ({
      ...prev,
      winConditions: prev.winConditions.map(wc => 
        wc.id === id ? { ...wc, [field]: value } : wc
      )
    }));
  };

  const addWeakPoint = () => {
    const newId = editedComp.weakPoints.length > 0
      ? Math.max(...editedComp.weakPoints.map(wp => wp.id)) + 1
      : 1;
    
    setEditedComp(prev => ({
      ...prev,
      weakPoints: [...(prev.weakPoints || []), { id: newId, title: "", details: "" }]
    }));
  };

  const removeWeakPoint = (id: number) => {
    setEditedComp(prev => ({
      ...prev,
      weakPoints: (prev.weakPoints || []).filter(wp => wp.id !== id)
    }));
  };

  const updateWeakPoint = (id: number, field: 'title' | 'details', value: string) => {
    setEditedComp(prev => ({
      ...prev,
      weakPoints: (prev.weakPoints || []).map(wp => 
        wp.id === id ? { ...wp, [field]: value } : wp
      )
    }));
  };

  const addDraftItem = (type: 'bans' | 'picks', value: string = "") => {
    setEditedComp(prev => ({
      ...prev,
      draft: {
        ...prev.draft,
        [type]: [...prev.draft[type], value]
      }
    }));
  };

  const removeDraftItem = (type: 'bans' | 'picks', index: number) => {
    setEditedComp(prev => ({
      ...prev,
      draft: {
        ...prev.draft,
        [type]: prev.draft[type].filter((_, i) => i !== index)
      }
    }));
  };

  const updateDraftItem = (type: 'bans' | 'picks', index: number, value: string) => {
    setEditedComp(prev => ({
      ...prev,
      draft: {
        ...prev.draft,
        [type]: prev.draft[type].map((item, i) => i === index ? value : item)
      }
    }));
  };

  const addInGameItem = (type: 'macro' | 'rotations' | 'vision', value: string = "") => {
    setEditedComp(prev => ({
      ...prev,
      inGame: {
        ...(prev.inGame || {}),
        [type]: [...((prev.inGame?.[type] as string[]) || []), value]
      }
    }));
  };

  const removeInGameItem = (type: 'macro' | 'rotations' | 'vision', index: number) => {
    setEditedComp(prev => ({
      ...prev,
      inGame: {
        ...(prev.inGame || {}),
        [type]: (prev.inGame?.[type] as string[])?.filter((_, i) => i !== index) || []
      }
    }));
  };

  const updateInGameItem = (type: 'macro' | 'rotations' | 'vision', index: number, value: string) => {
    setEditedComp(prev => ({
      ...prev,
      inGame: {
        ...(prev.inGame || {}),
        [type]: (prev.inGame?.[type] as string[])?.map((item, i) => i === index ? value : item) || []
      }
    }));
  };

  const updateEarlyGame = (role: string, field: 'focus' | 'dontDo', value: string) => {
    setEditedComp(prev => ({
      ...prev,
      earlyGame: {
        ...prev.earlyGame,
        [role]: {
          ...prev.earlyGame[role],
          [field]: value
        }
      }
    }));
  };

  const addSynergy = () => {
    setEditedComp(prev => ({
      ...prev,
      synergies: {
        ...(prev.synergies || {}),
        [`Nova Sinergia ${Object.keys(prev.synergies || {}).length + 1}`]: ""
      }
    }));
  };

  const removeSynergy = (key: string) => {
    setEditedComp(prev => {
      const newSynergies = { ...prev.synergies };
      delete newSynergies![key];
      return {
        ...prev,
        synergies: newSynergies
      };
    });
  };

  const updateSynergy = (key: string, value: string) => {
    setEditedComp(prev => ({
      ...prev,
      synergies: {
        ...(prev.synergies || {}),
        [key]: value
      }
    }));
  };

  const updateSynergyKey = (oldKey: string, newKey: string) => {
    setEditedComp(prev => {
      const newSynergies = { ...prev.synergies };
      const value = newSynergies![oldKey];
      delete newSynergies![oldKey];
      newSynergies![newKey] = value;
      return {
        ...prev,
        synergies: newSynergies
      };
    });
  };

  const handleSave = () => {
    onSave(editedComp);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto bg-astryx-card rounded-2xl border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-astryx-card/95 backdrop-blur-sm border-b border-white/10 p-6 rounded-t-2xl z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-black text-white">Editar Composição</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-astryx-purple hover:bg-astryx-purple/80 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Salvar
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Clique nas seções abaixo para expandir/contrair. Todos os campos são editáveis.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Informações Básicas */}
            <Section
              title="Informações Básicas"
              icon={<Info className="w-5 h-5" />}
              expanded={expandedSections.basic}
              onToggle={() => toggleSection('basic')}
              help="Título e objetivo principal da composição"
            >
              <div className="space-y-4">
                <EditableField
                  label="Título da Composição"
                  value={editedComp.title}
                  onChange={(v) => updateField(['title'], v)}
                  placeholder="Ex: Escudo de Fúria"
                  help="Nome que identifica esta composição"
                />
                <EditableField
                  label="Objetivo"
                  value={editedComp.objective}
                  onChange={(v) => updateField(['objective'], v)}
                  placeholder="Descreva o objetivo principal desta composição"
                  help="Objetivo estratégico principal da composição"
                  textarea
                  rows={3}
                />
              </div>
            </Section>

            {/* Campeões */}
            <Section
              title="Campeões da Composição"
              icon={<Users className="w-5 h-5" />}
              expanded={expandedSections.champions}
              onToggle={() => toggleSection('champions')}
              help="Configure os 5 campeões, suas informações e builds"
            >
              <div className="space-y-4">
                {editedComp.champions.map((champ) => (
                  <ChampionSectionEditor
                    key={champ.role}
                    champion={champ}
                    allChampions={allChampions}
                    version={version}
                    onUpdate={(updates) => updateChampion(champ.role, updates)}
                  />
                ))}
              </div>
            </Section>

            {/* Win Conditions */}
            <Section
              title="Condições de Vitória"
              icon={<Trophy className="w-5 h-5" />}
              expanded={expandedSections.winConditions}
              onToggle={() => toggleSection('winConditions')}
              help="Defina as condições que garantem a vitória com esta composição"
            >
              <div className="space-y-3">
                {editedComp.winConditions.map((wc) => (
                  <div key={wc.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm font-bold text-astryx-purple">#{wc.id}</span>
                      <button
                        onClick={() => removeWinCondition(wc.id)}
                        className="p-1 hover:bg-red-500/20 rounded text-red-400 transition-colors"
                        title="Remover"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <EditableField
                      label="Título"
                      value={wc.title}
                      onChange={(v) => updateWinCondition(wc.id, 'title', v)}
                      placeholder="Ex: Chegar ao Late Game"
                    />
                    <EditableField
                      label="Detalhes"
                      value={wc.details}
                      onChange={(v) => updateWinCondition(wc.id, 'details', v)}
                      placeholder="Descreva os detalhes desta condição"
                      textarea
                      rows={2}
                    />
                  </div>
                ))}
                <button
                  onClick={addWinCondition}
                  className="w-full py-2 border-2 border-dashed border-white/20 rounded-lg text-white hover:border-astryx-purple hover:bg-astryx-purple/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Condição de Vitória
                </button>
              </div>
            </Section>

            {/* Weak Points */}
            <Section
              title="Pontos Fracos"
              icon={<AlertCircle className="w-5 h-5" />}
              expanded={expandedSections.weakPoints}
              onToggle={() => toggleSection('weakPoints')}
              help="Defina os pontos fracos e vulnerabilidades desta composição"
            >
              <div className="space-y-3">
                {(editedComp.weakPoints || []).map((wp) => (
                  <div key={wp.id} className="bg-white/5 rounded-lg p-4 border border-red-500/20">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm font-bold text-red-500">#{wp.id}</span>
                      <button
                        onClick={() => removeWeakPoint(wp.id)}
                        className="p-1 hover:bg-red-500/20 rounded text-red-400 transition-colors"
                        title="Remover"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <EditableField
                      label="Título"
                      value={wp.title}
                      onChange={(v) => updateWeakPoint(wp.id, 'title', v)}
                      placeholder="Ex: Vulnerável a Assassinos"
                    />
                    <EditableField
                      label="Detalhes"
                      value={wp.details}
                      onChange={(v) => updateWeakPoint(wp.id, 'details', v)}
                      placeholder="Descreva os detalhes deste ponto fraco"
                      textarea
                      rows={2}
                    />
                  </div>
                ))}
                <button
                  onClick={addWeakPoint}
                  className="w-full py-2 border-2 border-dashed border-white/20 rounded-lg text-white hover:border-red-500 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Ponto Fraco
                </button>
              </div>
            </Section>

            {/* Draft */}
            <Section
              title="Fase de Draft"
              icon={<Target className="w-5 h-5" />}
              expanded={expandedSections.draft}
              onToggle={() => toggleSection('draft')}
              help="Configure bans para a fase de draft"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Ban className="w-4 h-4 text-red-400" />
                    Bans Recomendados
                  </label>
                  <ListEditor
                    items={editedComp.draft.bans}
                    onAdd={() => addDraftItem('bans')}
                    onRemove={(i) => removeDraftItem('bans', i)}
                    onUpdate={(i, v) => updateDraftItem('bans', i, v)}
                    placeholder="Ex: Pantheon (Jungle/Flex): Prioridade Máxima"
                    help="Lista de campeões ou estratégias de ban recomendadas"
                    showChampionIcons={true}
                    version={version}
                    allChampions={allChampions}
                  />
                </div>
              </div>
            </Section>

            {/* Synergies */}
            <Section
              title="Sinergias da Composição"
              icon={<Users className="w-5 h-5" />}
              expanded={expandedSections.synergies}
              onToggle={() => toggleSection('synergies')}
              help="Sinergias entre campeões e combos importantes"
            >
              <div className="space-y-3">
                {Object.entries(editedComp.synergies || {}).map(([key, value]) => (
                  <div key={key} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="text"
                        value={key}
                        onChange={(e) => updateSynergyKey(key, e.target.value)}
                        className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm font-bold focus:outline-none focus:border-astryx-purple"
                        placeholder="Ex: Jinx + Lulu"
                      />
                      <button
                        onClick={() => removeSynergy(key)}
                        className="p-2 hover:bg-red-500/20 rounded text-red-400 transition-colors"
                        title="Remover"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <EditableField
                      label=""
                      value={value}
                      onChange={(v) => updateSynergy(key, v)}
                      placeholder="Descreva esta sinergia"
                      textarea
                      rows={2}
                    />
                  </div>
                ))}
                <button
                  onClick={addSynergy}
                  className="w-full py-2 border-2 border-dashed border-white/20 rounded-lg text-white hover:border-astryx-purple hover:bg-astryx-purple/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Sinergia
                </button>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares
interface SectionProps {
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  help: string;
  children: React.ReactNode;
}

function Section({ title, icon, expanded, onToggle, help, children }: SectionProps) {
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-bold text-white">{title}</h3>
          {help && (
            <span className="group relative inline-flex items-center">
              <HelpCircle className="w-4 h-4 text-gray-400" />
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 p-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-normal">
                {help}
              </span>
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {expanded && (
        <div className="p-4 border-t border-white/10">
          {children}
        </div>
      )}
    </div>
  );
}

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  help?: string;
  textarea?: boolean;
  rows?: number;
}

function EditableField({ label, value, onChange, placeholder, help, textarea, rows = 1 }: EditableFieldProps) {
  const Component = textarea ? 'textarea' : 'input';
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          {label}
          {help && (
            <span className="ml-2 text-xs text-gray-500 font-normal">({help})</span>
          )}
        </label>
      )}
      <Component
        type={textarea ? undefined : 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={textarea ? rows : undefined}
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-astryx-purple transition-colors"
      />
    </div>
  );
}

interface ListEditorProps {
  items: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, value: string) => void;
  placeholder?: string;
  help?: string;
  showChampionIcons?: boolean;
  version?: string;
  allChampions?: ChampionData[];
}

// Função para extrair nomes de campeões de um texto de ban
function extractChampionNames(banText: string, allChampions?: ChampionData[]): string[] {
  const championNames: string[] = [];
  
  // Lista de palavras comuns e roles para filtrar
  const commonWords = new Set([
    'Prioridade', 'Máxima', 'Um', 'Ex', 'Picks', 'Campeões', 'Assassino', 'Engage', 'Forte', 
    'Tank', 'que', 'punem', 'Não', 'podemos', 'dar', 'Eles', 'podem', 'interromper', 
    'nossos', 'engages', 'coordenados', 'eliminar', 'antes', 'dela', 'evoluir', 'Range', 
    'Superior', 'early', 'game', 'evoluções', 'El', 'força', 'pressão', 'todas', 'rotas', 
    'pune', 'scaling', 'Deve', 'ser', 'banido', 'ignoram', 'Frontline', 'vão', 'direto',
    'Jungle', 'Flex', 'ADC', 'Top', 'Mid', 'Support', 'Sup', 'Com', 'Disengage', 'Assassinos'
  ]);
  
  // Função auxiliar para verificar se uma palavra é um campeão válido
  const isValidChampion = (name: string): boolean => {
    if (!name || name.length < 3 || name.length > 20) return false;
    if (commonWords.has(name)) return false;
    
    // Se temos a lista de campeões, verifica se existe
    if (allChampions) {
      return allChampions.some(champ => {
        const champName = champ.name;
        const normalizedChamp = normalizeChampionName(champName);
        const normalizedInput = name.replace(/\s/g, '').replace(/'/g, '');
        
        return champName === name || 
               normalizedChamp === normalizedInput ||
               champName.toLowerCase() === name.toLowerCase() ||
               normalizedChamp.toLowerCase() === normalizedInput.toLowerCase();
      });
    }
    
    // Se não temos a lista, usa heurística: começa com maiúscula e tem tamanho razoável
    return /^[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?$/.test(name);
  };
  
  // Padrão 0: Texto inteiro é apenas um nome de campeão "Pantheon"
  const trimmedText = banText.trim();
  if (isValidChampion(trimmedText) && !trimmedText.includes('(') && !trimmedText.includes(':') && !trimmedText.includes(',')) {
    championNames.push(trimmedText);
  }
  
  // Padrão 1: Nomes antes de parênteses "Pantheon (Jungle/Flex)"
  const beforeParen = banText.match(/([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)\s*\(/g);
  if (beforeParen) {
    beforeParen.forEach(match => {
      const name = match.replace(/\s*\(.*$/, '').trim();
      if (isValidChampion(name) && !championNames.includes(name)) {
        championNames.push(name);
      }
    });
  }
  
  // Padrão 2: Nomes após ":" - ": Zed, LeBlanc, Katarina" ou ": Janna, Poppy"
  const afterColon = banText.match(/:\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)/g);
  if (afterColon) {
    afterColon.forEach(match => {
      const name = match.replace(/^:\s+/, '').trim();
      const firstWord = name.split(/\s|,/)[0];
      if (isValidChampion(firstWord) && !championNames.includes(firstWord)) {
        championNames.push(firstWord);
      }
    });
  }
  
  // Padrão 3: Nomes após "ou" - "Zed ou LeBlanc"
  const afterOr = banText.match(/ou\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)/g);
  if (afterOr) {
    afterOr.forEach(match => {
      const name = match.replace(/^ou\s+/, '').trim();
      if (isValidChampion(name) && !championNames.includes(name)) {
        championNames.push(name);
      }
    });
  }
  
  // Padrão 4: Nomes separados por vírgulas "Janna, Poppy, Gragas"
  const commaSeparated = banText.match(/([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)\s*,/g);
  if (commaSeparated) {
    commaSeparated.forEach(match => {
      const name = match.replace(/\s*,.*$/, '').trim();
      if (isValidChampion(name) && !championNames.includes(name)) {
        championNames.push(name);
      }
    });
  }
  
  // Padrão 5: Último nome em lista separada por vírgulas "Gragas." ou "Katarina."
  const lastInList = banText.match(/,\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)[.\s]/g);
  if (lastInList) {
    lastInList.forEach(match => {
      const name = match.replace(/^,\s+/, '').replace(/[.\s].*$/, '').trim();
      if (isValidChampion(name) && !championNames.includes(name)) {
        championNames.push(name);
      }
    });
  }
  
  // Padrão 6: Primeira palavra do texto se for um campeão válido (para casos como "Pantheon é forte")
  const firstWord = trimmedText.split(/\s+/)[0];
  if (firstWord && isValidChampion(firstWord) && !championNames.includes(firstWord) && 
      !trimmedText.includes('(') && !trimmedText.includes(':')) {
    // Só adiciona se não foi adicionado pelo padrão 0
    if (!championNames.includes(trimmedText)) {
      championNames.push(firstWord);
    }
  }
  
  return championNames;
}

function ListEditor({ items, onAdd, onRemove, onUpdate, placeholder, help, showChampionIcons, version, allChampions }: ListEditorProps) {
  // Extrai todos os nomes de campeões de todos os items
  const allChampionNames = showChampionIcons && version && allChampions
    ? Array.from(new Set(items.flatMap(item => extractChampionNames(item, allChampions))))
    : [];

  return (
    <div className="space-y-2">
      {/* Mostra ícones de campeões se habilitado */}
      {showChampionIcons && allChampionNames.length > 0 && version && (
        <div className="flex flex-wrap gap-2 mb-3 p-3 bg-white/5 rounded-lg border border-white/10">
          {allChampionNames.map((name) => {
            // Busca o campeão na lista completa para pegar o ID correto
            const championData = allChampions?.find(c => 
              c.name === name || 
              c.name.toLowerCase() === name.toLowerCase()
            );
            
            // Usa normalizeChampionName que já tem todos os casos especiais (incluindo Wukong -> MonkeyKing)
            const normalizedName = championData 
              ? normalizeChampionName(championData.name, championData.id)
              : normalizeChampionName(name);
            
            if (!championData) return null;
            
            return (
              <div key={name} className="relative group" title={name}>
                <div className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-red-500/50 bg-red-500/10">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${normalizedName}.png`}
                    alt={name}
                    width={40}
                    height={40}
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      // Se a imagem não carregar, esconde o elemento
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border border-white/20">
                  <Ban className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => onUpdate(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-astryx-purple"
          />
          <button
            onClick={() => onRemove(index)}
            className="p-2 hover:bg-red-500/20 rounded text-red-400 transition-colors"
            title="Remover"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="w-full py-2 border border-dashed border-white/20 rounded text-white text-sm hover:border-astryx-purple hover:bg-astryx-purple/10 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-3 h-3" />
        Adicionar
      </button>
      {help && (
        <p className="text-xs text-gray-500 mt-2">{help}</p>
      )}
    </div>
  );
}

// Componente para editar campeão completo
interface ChampionSectionEditorProps {
  champion: CompositionChampion;
  allChampions: ChampionData[];
  version: string;
  onUpdate: (updates: Partial<CompositionChampion>) => void;
}

function ChampionSectionEditor({ champion, allChampions, version, onUpdate }: ChampionSectionEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredChampions = allChampions.filter(champ => 
    champ.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div className={`bg-white/5 rounded-lg p-4 border-2 ${ROLE_COLORS[champion.role]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${normalizeChampionName(champion.name)}.png`}
                alt={champion.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <p className="font-bold text-white">{champion.name}</p>
              <p className="text-xs text-gray-400">{ROLE_LABELS[champion.role]}</p>
            </div>
          </button>
          
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900 border border-white/10 rounded-lg p-4 shadow-xl z-50 max-h-96 overflow-y-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar campeão..."
                className="w-full mb-3 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-astryx-purple"
                autoFocus
              />
              <div className="grid grid-cols-4 gap-2">
                {filteredChampions.map((champ) => (
                  <button
                    key={champ.id}
                    onClick={() => {
                      onUpdate({ name: champ.name });
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-white/20 hover:border-astryx-purple transition-colors"
                    title={champ.name}
                  >
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`}
                      alt={champ.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <EditableField
          label="Tipo"
          value={champion.type}
          onChange={(v) => onUpdate({ type: v })}
          placeholder="Ex: Tank/Vanguarda, Hyper Carry"
          help="Categoria do campeão"
        />
        <EditableField
          label="Função"
          value={champion.function}
          onChange={(v) => onUpdate({ function: v })}
          placeholder="Ex: Principal Frontline, Engage Global"
          help="Papel do campeão na composição"
          textarea
          rows={2}
        />
        
        {/* Alternativas */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Alternativas
          </label>
          <ListEditor
            items={champion.alternatives || []}
            onAdd={() => onUpdate({ alternatives: [...(champion.alternatives || []), ""] })}
            onRemove={(i) => onUpdate({ alternatives: champion.alternatives?.filter((_, idx) => idx !== i) })}
            onUpdate={(i, v) => onUpdate({ alternatives: champion.alternatives?.map((alt, idx) => idx === i ? v : alt) })}
            placeholder="Ex: Malphite, Sion"
            help="Campeões alternativos para esta role"
          />
        </div>
      </div>
    </div>
  );
}

