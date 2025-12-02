import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pedreiro-purple/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pedreiro-purple via-white to-pedreiro-blue mb-8 tracking-tighter">
        PEDREIROS<br/>FC
          </h1>
      <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
        Acompanhe o desempenho, estatísticas e evolução do nosso time rumo ao topo.
        Selecione uma rota no menu lateral para ver os detalhes.
          </p>
      
      <div className="flex gap-4">
        <Link 
            href="/role/top"
            className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-full font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
        >
            Ver Estatísticas <ArrowRight className="w-5 h-5" />
        </Link>
        </div>
    </div>
  );
}
