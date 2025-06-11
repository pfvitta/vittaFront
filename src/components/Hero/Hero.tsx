'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative flex items-center justify-between max-w-screen-xl mx-auto px-6 py-16 mt-[-2rem]">
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
          Encuentra psicólogos, terapeutas y coaches verificados para acompañarte en tu camino.
        </p>
        <Link href="/providers">
          <button className="bg-primary text-white px-6 py-3 rounded-full mt-6 hover:bg-secondary transition">
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
          src="/FotoHero1.jpg"
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





