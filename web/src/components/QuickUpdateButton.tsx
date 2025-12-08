"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuickUpdateButtonProps {
  role: string;
  filter: string;
}

const COOLDOWN_KEY_PREFIX = "quick_update_cooldown_";
const AUTO_UPDATE_INTERVAL = 15 * 60; // 15 minutos em segundos
const BLOCK_BEFORE_AUTO_UPDATE = 2 * 60; // Bloqueia 2 minutos antes do update automático

export function QuickUpdateButton({ role, filter }: QuickUpdateButtonProps) {
  const [cooldown, setCooldown] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [timeUntilAutoUpdate, setTimeUntilAutoUpdate] = useState<number | null>(null);
  const router = useRouter();

  // Calcula tempo até o próximo update automático (baseado no timestamp da última atualização)
  useEffect(() => {
    const calculateTimeUntilAutoUpdate = () => {
      if (typeof window === "undefined") return;

      // Pega o timestamp da última atualização da página (armazenado quando a página carrega)
      const lastPageLoad = sessionStorage.getItem(`page_load_${role}`);
      if (!lastPageLoad) {
        // Se não tem timestamp, assume que acabou de carregar
        sessionStorage.setItem(`page_load_${role}`, Date.now().toString());
        setTimeUntilAutoUpdate(AUTO_UPDATE_INTERVAL);
        return;
      }

      const lastLoadTime = parseInt(lastPageLoad, 10);
      const now = Date.now();
      const elapsed = Math.floor((now - lastLoadTime) / 1000);
      const remaining = AUTO_UPDATE_INTERVAL - elapsed;

      if (remaining <= 0) {
        // Já passou o tempo, próximo update será em 15 minutos
        setTimeUntilAutoUpdate(AUTO_UPDATE_INTERVAL);
        sessionStorage.setItem(`page_load_${role}`, Date.now().toString());
      } else {
        setTimeUntilAutoUpdate(remaining);
      }

      // Bloqueia se está perto do update automático
      setIsBlocked(remaining <= BLOCK_BEFORE_AUTO_UPDATE);
    };

    calculateTimeUntilAutoUpdate();
    const interval = setInterval(calculateTimeUntilAutoUpdate, 1000);

    return () => clearInterval(interval);
  }, [role]);

  // Carrega cooldown do localStorage ao montar
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const key = `${COOLDOWN_KEY_PREFIX}${role}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
      const storedTime = parseInt(stored, 10);
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((storedTime - now) / 1000));
      
      if (remaining > 0) {
        setCooldown(remaining);
      }
    }
  }, [role]);

  // Atualiza cooldown e salva no localStorage
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      
      if (typeof window !== "undefined") {
        const key = `${COOLDOWN_KEY_PREFIX}${role}`;
        const expiryTime = Date.now() + (cooldown * 1000);
        localStorage.setItem(key, expiryTime.toString());
      }
      
      return () => clearTimeout(timer);
    } else {
      if (typeof window !== "undefined") {
        const key = `${COOLDOWN_KEY_PREFIX}${role}`;
        localStorage.removeItem(key);
      }
    }
  }, [cooldown, role]);

  const handleQuickUpdate = async () => {
    if (cooldown > 0 || isUpdating || isBlocked) return;

    setIsUpdating(true);
    try {
      let queueId: number | undefined;
      if (filter === 'solo') queueId = 420;
      if (filter === 'flex') queueId = 440;

      const res = await fetch("/api/quick-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, queueId }),
      });

      const data = await res.json();

      if (res.status === 429) {
        const remaining = data.cooldown || 90;
        setCooldown(remaining);
        alert(data.error || "Aguarde antes de atualizar novamente.");
      } else if (res.ok && data.success) {
        setCooldown(90);
        
        if (data.hasNewMatch) {
          // Tem nova partida, atualiza a página
          setTimeout(() => {
            router.refresh();
          }, 500);
        } else {
          alert("Nenhuma partida nova encontrada.");
        }
      } else {
        const errorMsg = data.error || "Erro ao atualizar dados.";
        alert(errorMsg);
        console.error("Quick update error:", data);
      }
    } catch (error) {
      console.error("Quick update error:", error);
      alert("Erro ao atualizar dados.");
    } finally {
      setIsUpdating(false);
    }
  };

  const isDisabled = cooldown > 0 || isUpdating || isBlocked;

  return (
    <button
      onClick={handleQuickUpdate}
      disabled={isDisabled}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${isDisabled
          ? 'bg-white/5 text-gray-500 cursor-not-allowed'
          : 'bg-astryx-purple/20 text-white hover:bg-astryx-purple/30 border border-astryx-purple/50 hover:border-astryx-purple/70'}
      `}
      title={
        isBlocked && timeUntilAutoUpdate !== null
          ? `Atualização automática em ${Math.floor(timeUntilAutoUpdate / 60)}min ${timeUntilAutoUpdate % 60}s`
          : cooldown > 0
          ? `Aguarde ${cooldown}s`
          : "Verificar última partida"
      }
    >
      <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
      {isUpdating 
        ? "Verificando..." 
        : isBlocked && timeUntilAutoUpdate !== null
        ? `Auto em ${Math.floor(timeUntilAutoUpdate / 60)}min`
        : cooldown > 0 
        ? `${cooldown}s` 
        : "Atualizar"}
    </button>
  );
}

