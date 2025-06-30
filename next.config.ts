import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['s.gravatar.com', 'cdn.auth0.com', 'res.cloudinary.com'], // agrega los dominios que usas para imágenes
  },/* config options here */
};


export default nextConfig;
