import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 text-center">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-astryx-purple/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <h1 className="text-4xl sm:text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-astryx-purple via-white to-astryx-blue mb-6 md:mb-8 tracking-tighter">
        ASTRYX
          </h1>
      <p className="text-base md:text-xl text-gray-400 max-w-2xl mb-8 md:mb-12 leading-relaxed px-4">
        Acompanhe o desempenho, estatísticas e evolução do nosso time rumo ao topo.
        <span className="hidden md:inline"> Selecione uma rota no menu lateral para ver os detalhes.</span>
        <span className="md:hidden"> Use o menu abaixo para navegar.</span>
      </p>
      
      <div className="flex gap-4">
        <Link 
            href="/role/top"
            className="px-6 md:px-8 py-3 md:py-4 bg-white text-black hover:bg-gray-200 rounded-full font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] text-sm md:text-base"
        >
            Ver Estatísticas <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
        </div>
    </div>
  );
}
