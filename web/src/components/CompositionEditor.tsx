"use client";

import { useState, useEffect, useRef } from "react";
import { Composition, CompositionChampion, WinCondition } from "@/config/compositions";
import { ChampionData, normalizeChampionName } from "@/lib/champions";
import { 
  ChevronDown, ChevronUp, Plus, X, Save, Info, HelpCircle, 
  Users, Target, Trophy, Ban, CheckCircle, AlertCircle, 
  Clock, Package, Map
} from "lucide-react";
import Image from "next/image";

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

interface CompositionEditorProps {
  composition: Composition;
  version: string;
  allChampions: ChampionData[];
  onSave: (composition: Composition) => void;
  onCancel: () => void;
}

export function CompositionEditor({ composition, version, allChampions, onSave, onCancel }: CompositionEditorProps) {
  const [editedComp, setEditedComp] = useState<Composition>(JSON.parse(JSON.stringify(composition)));
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    champions: true,
    winConditions: false,
    draft: false,
    inGame: false,
    earlyGame: false,
    midGame: false,
    lateGame: false,
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
        <div className="max-w-6xl mx-auto bg-pedreiro-card rounded-2xl border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-pedreiro-card/95 backdrop-blur-sm border-b border-white/10 p-6 rounded-t-2xl z-10">
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
                  className="px-4 py-2 bg-pedreiro-purple hover:bg-pedreiro-purple/80 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
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
                      <span className="text-sm font-bold text-pedreiro-purple">#{wc.id}</span>
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
                  className="w-full py-2 border-2 border-dashed border-white/20 rounded-lg text-white hover:border-pedreiro-purple hover:bg-pedreiro-purple/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Condição de Vitória
                </button>
              </div>
            </Section>

            {/* Draft */}
            <Section
              title="Fase de Draft"
              icon={<Target className="w-5 h-5" />}
              expanded={expandedSections.draft}
              onToggle={() => toggleSection('draft')}
              help="Configure bans, picks e notas para a fase de draft"
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Picks Recomendados
                  </label>
                  <ListEditor
                    items={editedComp.draft.picks}
                    onAdd={() => addDraftItem('picks')}
                    onRemove={(i) => removeDraftItem('picks', i)}
                    onUpdate={(i, v) => updateDraftItem('picks', i, v)}
                    placeholder="Ex: Orianna (Mid): Blind Pick seguro"
                    help="Ordem e estratégia de picks recomendadas"
                  />
                </div>
                <EditableField
                  label="Notas do Draft"
                  value={editedComp.draft.notes}
                  onChange={(v) => updateField(['draft', 'notes'], v)}
                  placeholder="Notas adicionais sobre a fase de draft"
                  textarea
                  rows={3}
                />
              </div>
            </Section>

            {/* In-Game */}
            <Section
              title="Estratégias In-Game"
              icon={<Map className="w-5 h-5" />}
              expanded={expandedSections.inGame}
              onToggle={() => toggleSection('inGame')}
              help="Macro, rotações e controle de visão durante o jogo"
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-green-400 mb-2">Macro</label>
                  <ListEditor
                    items={editedComp.inGame?.macro || []}
                    onAdd={() => addInGameItem('macro')}
                    onRemove={(i) => removeInGameItem('macro', i)}
                    onUpdate={(i, v) => updateInGameItem('macro', i, v)}
                    placeholder="Ex: Prioridade de Rotação: Dragão > Torres"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-blue-400 mb-2">Rotações</label>
                  <ListEditor
                    items={editedComp.inGame?.rotations || []}
                    onAdd={() => addInGameItem('rotations')}
                    onRemove={(i) => removeInGameItem('rotations', i)}
                    onUpdate={(i, v) => updateInGameItem('rotations', i, v)}
                    placeholder="Ex: Quando inverter Top/Bot: Após T1 bot cair"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-purple-400 mb-2">Visão</label>
                  <ListEditor
                    items={editedComp.inGame?.vision || []}
                    onAdd={() => addInGameItem('vision')}
                    onRemove={(i) => removeInGameItem('vision', i)}
                    onUpdate={(i, v) => updateInGameItem('vision', i, v)}
                    placeholder="Ex: Prioridade: Área de dragão/barão"
                  />
                </div>
              </div>
            </Section>

            {/* Early Game */}
            <Section
              title="Early Game (0:00 - 15:00)"
              icon={<Clock className="w-5 h-5" />}
              expanded={expandedSections.earlyGame}
              onToggle={() => toggleSection('earlyGame')}
              help="Estratégias e foco para cada role no início do jogo"
            >
              <div className="space-y-4">
                {editedComp.champions.map((champ) => {
                  const roleKey = `${champ.name} & ${editedComp.champions.find(c => c.role === 'support' && champ.role === 'adc')?.name || 'Support'}`;
                  const earlyGameKey = Object.keys(editedComp.earlyGame).find(key => 
                    key.includes(champ.name) || key.includes(ROLE_LABELS[champ.role])
                  ) || champ.role;
                  
                  const earlyData = editedComp.earlyGame[earlyGameKey] || { focus: "", dontDo: "" };
                  
                  return (
                    <div key={champ.role} className={`bg-white/5 rounded-lg p-4 border-2 ${ROLE_COLORS[champ.role]}`}>
                      <h4 className="font-bold text-white mb-3">{champ.name} ({ROLE_LABELS[champ.role]})</h4>
                      <div className="space-y-3">
                        <EditableField
                          label="Foco"
                          value={earlyData.focus}
                          onChange={(v) => updateEarlyGame(earlyGameKey, 'focus', v)}
                          placeholder="O que este campeão deve focar no early game"
                          textarea
                          rows={2}
                        />
                        <EditableField
                          label="Não Fazer"
                          value={earlyData.dontDo}
                          onChange={(v) => updateEarlyGame(earlyGameKey, 'dontDo', v)}
                          placeholder="O que este campeão NÃO deve fazer"
                          textarea
                          rows={2}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Mid Game */}
            <Section
              title="Mid Game (15:00 - 25:00)"
              icon={<Clock className="w-5 h-5" />}
              expanded={expandedSections.midGame}
              onToggle={() => toggleSection('midGame')}
              help="Objetivos, prioridades e estratégias de teamfight no meio do jogo"
            >
              <div className="space-y-4">
                <EditableField
                  label="Objetivos"
                  value={editedComp.midGame.objectives}
                  onChange={(v) => updateField(['midGame', 'objectives'], v)}
                  placeholder="Ex: Focar no Dragão da Alma e nas Torres Externas"
                  textarea
                  rows={2}
                />
                <EditableField
                  label="Prioridade"
                  value={editedComp.midGame.priority}
                  onChange={(v) => updateField(['midGame', 'priority'], v)}
                  placeholder="O que deve ser priorizado nesta fase"
                  textarea
                  rows={2}
                />
                <EditableField
                  label="Primeira Teamfight"
                  value={editedComp.midGame.teamfight}
                  onChange={(v) => updateField(['midGame', 'teamfight'], v)}
                  placeholder="Como executar a primeira teamfight"
                  textarea
                  rows={4}
                />
              </div>
            </Section>

            {/* Late Game */}
            <Section
              title="Late Game (25:00+)"
              icon={<Trophy className="w-5 h-5" />}
              expanded={expandedSections.lateGame}
              onToggle={() => toggleSection('lateGame')}
              help="Execução final e estratégias para vencer no late game"
            >
              <div className="space-y-4">
                <EditableField
                  label="Foco Total"
                  value={editedComp.lateGame.focus}
                  onChange={(v) => updateField(['lateGame', 'focus'], v)}
                  placeholder="Ex: Barão ou Dragão Ancião"
                  textarea
                  rows={2}
                />
                <EditableField
                  label="Papel do Carry Principal"
                  value={editedComp.lateGame.jinxRole}
                  onChange={(v) => updateField(['lateGame', 'jinxRole'], v)}
                  placeholder="Como o carry principal deve jogar no late game"
                  textarea
                  rows={4}
                />
                <EditableField
                  label="Execução da Luta"
                  value={editedComp.lateGame.execution}
                  onChange={(v) => updateField(['lateGame', 'execution'], v)}
                  placeholder="Como executar as teamfights decisivas"
                  textarea
                  rows={4}
                />
                <EditableField
                  label="Se o Carry Principal Cair"
                  value={editedComp.lateGame.ifJinxDies}
                  onChange={(v) => updateField(['lateGame', 'ifJinxDies'], v)}
                  placeholder="O que fazer se o carry principal morrer"
                  textarea
                  rows={3}
                />
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
                        className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm font-bold focus:outline-none focus:border-pedreiro-purple"
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
                  className="w-full py-2 border-2 border-dashed border-white/20 rounded-lg text-white hover:border-pedreiro-purple hover:bg-pedreiro-purple/10 transition-colors flex items-center justify-center gap-2"
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
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pedreiro-purple transition-colors"
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
}

function ListEditor({ items, onAdd, onRemove, onUpdate, placeholder, help }: ListEditorProps) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => onUpdate(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-pedreiro-purple"
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
        className="w-full py-2 border border-dashed border-white/20 rounded text-white text-sm hover:border-pedreiro-purple hover:bg-pedreiro-purple/10 transition-colors flex items-center justify-center gap-2"
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
                className="w-full mb-3 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-pedreiro-purple"
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
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-white/20 hover:border-pedreiro-purple transition-colors"
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

