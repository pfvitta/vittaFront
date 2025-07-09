'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000); // Loading por 2 segundos
  };

  return (
    <section className="relative flex items-center justify-between max-w-screen-xl mx-auto px-6 py-16 mt-[-2rem]">
      {/* Overlay de loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">Cargando profesionales...</p>
          </div>
        </div>
      )}

      {/* Texto */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <h1 className="text-5xl font-bold text-secondary leading-tight">
          Vive con propósito <br /> aliméntate con ciencia
        </h1>
        <p className="text-secondary mt-4">
          Encuentra nutricionistas verificados para acompañarte en tu camino de vida saludable.
        </p>
        <Link href="/providers">
          <button 
            onClick={handleButtonClick}
            className="bg-primary text-white px-6 py-3 rounded-full mt-6 hover:bg-secondary transition"
          >
            Explorar profesionales
          </button>
        </Link>
      </motion.div>

      {/* Imagen con animación */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:block"
      >
        <Image
          src="/FotoHero3.jpg"
          alt="Consulta virtual"
          width={600}
          height={600}
          className="rounded-xl object-cover"
          priority
        />
      </motion.div>
    </section>
  );
};

export default Hero;