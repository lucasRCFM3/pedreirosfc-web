"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sword, TreeDeciduous, Zap, Crosshair, Heart, Home, Layers, Users, Sparkles } from "lucide-react";
import { clsx } from "clsx";

const roles = [
  { name: "TOP", href: "/role/top", icon: Sword, color: "hover:text-pedreiro-purple" },
  { name: "JG", href: "/role/jungle", icon: TreeDeciduous, color: "hover:text-green-400" },
  { name: "MID", href: "/role/mid", icon: Zap, color: "hover:text-pedreiro-blue" },
  { name: "ADC", href: "/role/adc", icon: Crosshair, color: "hover:text-red-400" },
  { name: "SUP", href: "/role/support", icon: Heart, color: "hover:text-pink-400" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center bg-pedreiro-card border-r border-white/10 py-8 z-50">
      <div className="mb-12">
        <Link href="/" prefetch={true} className="p-2 bg-gradient-to-br from-pedreiro-purple to-pedreiro-blue rounded-lg block">
            <Home className="w-6 h-6 text-white" />
        </Link>
      </div>

      <nav className="flex-1 flex flex-col gap-8">
        {roles.map((role) => {
          const isActive = pathname === role.href;
          const Icon = role.icon;
          
          return (
            <Link
              key={role.name}
              href={role.href}
              prefetch={true}
              className={clsx(
                "group relative flex flex-col items-center justify-center gap-1 p-2 transition-all duration-300",
                isActive ? "text-white" : "text-gray-500 hover:text-white"
              )}
            >
              <div
                className={clsx(
                  "absolute left-0 w-1 h-8 rounded-r-full transition-all duration-300 bg-pedreiro-purple",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                )}
              />
              
              <div className={clsx(
                "p-2 rounded-xl transition-all duration-300 bg-white/5 group-hover:bg-white/10",
                isActive && "bg-pedreiro-purple/20 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
              )}>
                <Icon className={clsx("w-6 h-6", isActive && "text-pedreiro-purple")} />
              </div>
              
              <span className="text-[10px] font-bold tracking-wider">{role.name}</span>
            </Link>
          );
        })}
        
        {/* Champs */}
        <Link
          href="/champs"
          prefetch={true}
          className={clsx(
            "group relative flex flex-col items-center justify-center gap-1 p-2 transition-all duration-300",
            pathname === "/champs" ? "text-white" : "text-gray-500 hover:text-white"
          )}
        >
          <div
            className={clsx(
              "absolute left-0 w-1 h-8 rounded-r-full transition-all duration-300 bg-pedreiro-purple",
              pathname === "/champs" ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            )}
          />
          
          <div className={clsx(
            "p-2 rounded-xl transition-all duration-300 bg-white/5 group-hover:bg-white/10",
            pathname === "/champs" && "bg-pedreiro-purple/20 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
          )}>
            <Sparkles className={clsx("w-6 h-6", pathname === "/champs" && "text-pedreiro-purple")} />
          </div>
          
          <span className="text-[10px] font-bold tracking-wider">CHAMPS</span>
        </Link>

        {/* Champion Pool */}
        <Link
          href="/champion-pool"
          prefetch={true}
          className={clsx(
            "group relative flex flex-col items-center justify-center gap-1 p-2 transition-all duration-300",
            pathname === "/champion-pool" ? "text-white" : "text-gray-500 hover:text-white"
          )}
        >
          <div
            className={clsx(
              "absolute left-0 w-1 h-8 rounded-r-full transition-all duration-300 bg-pedreiro-purple",
              pathname === "/champion-pool" ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            )}
          />
          
          <div className={clsx(
            "p-2 rounded-xl transition-all duration-300 bg-white/5 group-hover:bg-white/10",
            pathname === "/champion-pool" && "bg-pedreiro-purple/20 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
          )}>
            <Layers className={clsx("w-6 h-6", pathname === "/champion-pool" && "text-pedreiro-purple")} />
          </div>
          
          <span className="text-[10px] font-bold tracking-wider">POOL</span>
        </Link>

        {/* Composições */}
        <Link
          href="/composicoes"
          prefetch={true}
          className={clsx(
            "group relative flex flex-col items-center justify-center gap-1 p-2 transition-all duration-300",
            pathname === "/composicoes" ? "text-white" : "text-gray-500 hover:text-white"
          )}
        >
          <div
            className={clsx(
              "absolute left-0 w-1 h-8 rounded-r-full transition-all duration-300 bg-pedreiro-purple",
              pathname === "/composicoes" ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            )}
          />
          
          <div className={clsx(
            "p-2 rounded-xl transition-all duration-300 bg-white/5 group-hover:bg-white/10",
            pathname === "/composicoes" && "bg-pedreiro-purple/20 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
          )}>
            <Users className={clsx("w-6 h-6", pathname === "/composicoes" && "text-pedreiro-purple")} />
          </div>
          
          <span className="text-[10px] font-bold tracking-wider">COMP</span>
        </Link>
      </nav>
    </aside>
  );
}

