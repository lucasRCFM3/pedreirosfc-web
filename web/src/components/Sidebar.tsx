"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sword, TreeDeciduous, Zap, Crosshair, Heart, Home, Layers, Users, Sparkles, Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { useState, useEffect } from "react";

const roles = [
  { name: "TOP", href: "/role/top", icon: Sword, color: "hover:text-astryx-purple" },
  { name: "JG", href: "/role/jungle", icon: TreeDeciduous, color: "hover:text-green-400" },
  { name: "MID", href: "/role/mid", icon: Zap, color: "hover:text-astryx-blue" },
  { name: "ADC", href: "/role/adc", icon: Crosshair, color: "hover:text-red-400" },
  { name: "SUP", href: "/role/support", icon: Heart, color: "hover:text-pink-400" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const NavContent = () => (
    <>
      <div className="mb-6 md:mb-12">
        <Link 
          href="/" 
          prefetch={true} 
          className="p-2 bg-gradient-to-br from-astryx-purple to-astryx-blue rounded-lg block"
          onClick={closeMobileMenu}
        >
          <Home className="w-6 h-6 text-white" />
        </Link>
      </div>

      <nav className="flex-1 flex flex-col gap-4 md:gap-8">
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
              onClick={closeMobileMenu}
            >
              <div
                className={clsx(
                  "absolute left-0 w-1 h-8 rounded-r-full transition-all duration-300 bg-astryx-purple hidden md:block",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                )}
              />
              
              <div className={clsx(
                "p-2 rounded-xl transition-all duration-300 bg-white/5 group-hover:bg-white/10",
                isActive && "bg-astryx-purple/20 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
              )}>
                <Icon className={clsx("w-6 h-6", isActive && "text-astryx-purple")} />
              </div>
              
              <span className="text-[10px] font-bold tracking-wider hidden md:block">{role.name}</span>
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
          onClick={closeMobileMenu}
        >
          <div
            className={clsx(
              "absolute left-0 w-1 h-8 rounded-r-full transition-all duration-300 bg-astryx-purple hidden md:block",
              pathname === "/champs" ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            )}
          />
          
          <div className={clsx(
            "p-2 rounded-xl transition-all duration-300 bg-white/5 group-hover:bg-white/10",
            pathname === "/champs" && "bg-astryx-purple/20 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
          )}>
            <Sparkles className={clsx("w-6 h-6", pathname === "/champs" && "text-astryx-purple")} />
          </div>
          
          <span className="text-[10px] font-bold tracking-wider hidden md:block">CHAMPS</span>
        </Link>

        {/* Champion Pool */}
        <Link
          href="/champion-pool"
          prefetch={true}
          className={clsx(
            "group relative flex flex-col items-center justify-center gap-1 p-2 transition-all duration-300",
            pathname === "/champion-pool" ? "text-white" : "text-gray-500 hover:text-white"
          )}
          onClick={closeMobileMenu}
        >
          <div
            className={clsx(
              "absolute left-0 w-1 h-8 rounded-r-full transition-all duration-300 bg-astryx-purple hidden md:block",
              pathname === "/champion-pool" ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            )}
          />
          
          <div className={clsx(
            "p-2 rounded-xl transition-all duration-300 bg-white/5 group-hover:bg-white/10",
            pathname === "/champion-pool" && "bg-astryx-purple/20 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
          )}>
            <Layers className={clsx("w-6 h-6", pathname === "/champion-pool" && "text-astryx-purple")} />
          </div>
          
          <span className="text-[10px] font-bold tracking-wider hidden md:block">POOL</span>
        </Link>

        {/* Composições */}
        <Link
          href="/composicoes"
          prefetch={true}
          className={clsx(
            "group relative flex flex-col items-center justify-center gap-1 p-2 transition-all duration-300",
            pathname === "/composicoes" ? "text-white" : "text-gray-500 hover:text-white"
          )}
          onClick={closeMobileMenu}
        >
          <div
            className={clsx(
              "absolute left-0 w-1 h-8 rounded-r-full transition-all duration-300 bg-astryx-purple hidden md:block",
              pathname === "/composicoes" ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            )}
          />
          
          <div className={clsx(
            "p-2 rounded-xl transition-all duration-300 bg-white/5 group-hover:bg-white/10",
            pathname === "/composicoes" && "bg-astryx-purple/20 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
          )}>
            <Users className={clsx("w-6 h-6", pathname === "/composicoes" && "text-astryx-purple")} />
          </div>
          
          <span className="text-[10px] font-bold tracking-wider hidden md:block">COMP</span>
        </Link>
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 flex-col items-center bg-astryx-card border-r border-white/10 py-8 z-50">
        <NavContent />
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-astryx-card/95 backdrop-blur-lg border-t border-white/10 z-50 safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          <Link
            href="/"
            prefetch={true}
            className={clsx(
              "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all min-w-[60px]",
              pathname === "/" ? "text-astryx-purple" : "text-gray-500"
            )}
            onClick={closeMobileMenu}
          >
            <Home className="w-5 h-5" />
            <span className="text-[9px] font-bold">HOME</span>
          </Link>

          {roles.slice(0, 3).map((role) => {
            const isActive = pathname === role.href;
            const Icon = role.icon;
            return (
              <Link
                key={role.name}
                href={role.href}
                prefetch={true}
                className={clsx(
                  "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all min-w-[60px]",
                  isActive ? "text-white bg-astryx-purple/20" : "text-gray-500"
                )}
                onClick={closeMobileMenu}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-bold">{role.name}</span>
              </Link>
            );
          })}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={clsx(
              "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all min-w-[60px]",
              isMobileMenuOpen ? "text-astryx-purple bg-astryx-purple/20" : "text-gray-500"
            )}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[9px] font-bold">MAIS</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Content */}
          <div className="fixed bottom-0 left-0 right-0 bg-astryx-card border-t border-white/10 rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto safe-area-inset-bottom md:hidden animate-slide-up">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white">Menu</h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="space-y-2">
                {/* Resto dos roles */}
                {roles.slice(3).map((role) => {
                  const isActive = pathname === role.href;
                  const Icon = role.icon;
                  return (
                    <Link
                      key={role.name}
                      href={role.href}
                      prefetch={true}
                      className={clsx(
                        "flex items-center gap-4 p-4 rounded-xl transition-all",
                        isActive ? "bg-astryx-purple/20 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                      )}
                      onClick={closeMobileMenu}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="font-bold text-base">{role.name}</span>
                    </Link>
                  );
                })}

                {/* Champs */}
                <Link
                  href="/champs"
                  prefetch={true}
                  className={clsx(
                    "flex items-center gap-4 p-4 rounded-xl transition-all",
                    pathname === "/champs" ? "bg-astryx-purple/20 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  )}
                  onClick={closeMobileMenu}
                >
                  <Sparkles className="w-6 h-6" />
                  <span className="font-bold text-base">Campeões</span>
                </Link>

                {/* Champion Pool */}
                <Link
                  href="/champion-pool"
                  prefetch={true}
                  className={clsx(
                    "flex items-center gap-4 p-4 rounded-xl transition-all",
                    pathname === "/champion-pool" ? "bg-astryx-purple/20 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  )}
                  onClick={closeMobileMenu}
                >
                  <Layers className="w-6 h-6" />
                  <span className="font-bold text-base">Champion Pool</span>
                </Link>

                {/* Composições */}
                <Link
                  href="/composicoes"
                  prefetch={true}
                  className={clsx(
                    "flex items-center gap-4 p-4 rounded-xl transition-all",
                    pathname === "/composicoes" ? "bg-astryx-purple/20 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  )}
                  onClick={closeMobileMenu}
                >
                  <Users className="w-6 h-6" />
                  <span className="font-bold text-base">Composições</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
