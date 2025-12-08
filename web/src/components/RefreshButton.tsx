"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

interface RefreshButtonProps {
  role: string;
  filter: string;
}

const COOLDOWN_KEY_PREFIX = "refresh_cooldown_";

export function RefreshButton({ role, filter }: RefreshButtonProps) {
  const [cooldown, setCooldown] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

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
      
      // Salva no localStorage
      if (typeof window !== "undefined") {
        const key = `${COOLDOWN_KEY_PREFIX}${role}`;
        const expiryTime = Date.now() + (cooldown * 1000);
        localStorage.setItem(key, expiryTime.toString());
      }
      
      return () => clearTimeout(timer);
    } else {
      // Remove do localStorage quando cooldown acaba
      if (typeof window !== "undefined") {
        const key = `${COOLDOWN_KEY_PREFIX}${role}`;
        localStorage.removeItem(key);
      }
    }
  }, [cooldown, role]);

  const handleRefresh = async () => {
    if (cooldown > 0 || isRefreshing) return;

    setIsRefreshing(true);
    try {
      let queueId: number | undefined;
      if (filter === 'solo') queueId = 420;
      if (filter === 'flex') queueId = 440;

      const res = await fetch("/api/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, queueId }),
      });

      const data = await res.json();

      if (res.status === 429) {
        const remaining = data.cooldown || 120;
        setCooldown(remaining);
        alert(data.error || "Aguarde antes de atualizar novamente.");
      } else if (res.ok) {
        setCooldown(120);
        router.refresh();
      } else {
        alert(data.error || "Erro ao atualizar dados.");
      }
    } catch (error) {
      console.error("Refresh error:", error);
      alert("Erro ao atualizar dados.");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={cooldown > 0 || isRefreshing}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${cooldown > 0 || isRefreshing
          ? 'bg-white/5 text-gray-500 cursor-not-allowed'
          : 'bg-astryx-purple/20 text-white hover:bg-astryx-purple/30 border border-astryx-purple/50 hover:border-astryx-purple/70'}
      `}
    >
      <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? "Atualizando..." : cooldown > 0 ? `${cooldown}s` : "Atualizar"}
    </button>
  );
}
