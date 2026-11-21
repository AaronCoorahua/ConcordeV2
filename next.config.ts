import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ponytail: las páginas que leen su código con readFileSync(process.cwd()) hacen que el trazado
  // meta todo public/ (≈300 MB con /producto) en cada función y Vercel la rechaza. public/ lo sirve
  // la CDN; ninguna ruta lo lee en runtime.
  outputFileTracingExcludes: { "/*": ["public/**/*"] },
};

export default nextConfig;
