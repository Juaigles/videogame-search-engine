import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 
    reactStrictMode: true,
  images: {
    domains: ["media.rawg.io"], // Agrega aquí los dominios de donde cargarás imágenes
    deviceSizes: [320, 420, 768, 1024, 1200], // Anchos de dispositivo que Next.js optimizará
    imageSizes: [16, 32, 48, 64, 96], // Tamaños de imágenes optimizados
    formats: ["image/avif", "image/webp"], // Formatos de imagen soportados
  },
  env: {
    RAWG_API_KEY: process.env.RAWG_API_KEY,
    BASE_RAWG_URL: process.env.BASE_RAWG_URL,
  },

};

export default nextConfig;
