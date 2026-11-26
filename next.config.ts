import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Campaña Negociantes (26/11): los ids «revendedores-*» se renombraron; los links que ya tiene el equipo siguen abriendo.
  async redirects() {
    return [
      { source: '/correos/revendedores-1-ya-compras-aqui', destination: '/correos/negociantes-1-buenas-noticias', permanent: true },
      { source: '/correos/revendedores-2-rotacion', destination: '/correos/negociantes-2-compradores', permanent: true },
      { source: '/correos/revendedores-3-como-funciona', destination: '/correos/negociantes-3-como-funciona', permanent: true },
      { source: '/correos/revendedores-4-costos', destination: '/correos/negociantes-4-costos', permanent: true },
      { source: '/correos/revendedores-5-tu-decides', destination: '/correos/negociantes-5-tu-decides', permanent: true },
      { source: '/correos/revendedores-6-cuantos', destination: '/correos/negociantes-6-publica-hoy', permanent: true },
    ];
  },
};

export default nextConfig;
