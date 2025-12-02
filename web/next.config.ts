import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.mobalytics.gg',
        pathname: '/**',
      },
    ],
    // Desabilita otimização para evitar problemas com Netlify e Cloudflare Tunnel
    // As imagens do Data Dragon já são otimizadas pelo CDN da Riot
    // Isso evita requisições de otimização que causam problemas no deploy
    unoptimized: true,
  },
  // Configurações para melhor compatibilidade com Cloudflare Tunnel
  // Aumenta timeouts para evitar "context canceled" errors
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
