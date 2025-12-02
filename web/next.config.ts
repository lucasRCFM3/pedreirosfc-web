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
    // Desabilita otimização em desenvolvimento para evitar problemas com Cloudflare Tunnel
    // As imagens do Data Dragon já são otimizadas pelo CDN da Riot
    // Isso evita requisições de otimização que causam "context canceled" no tunnel
    unoptimized: process.env.NODE_ENV === 'development',
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
