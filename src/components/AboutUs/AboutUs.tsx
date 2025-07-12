'use client';


import Image from 'next/image';
import BackButton from '../BackButton/BackButton';

export default function AboutUs() {
  
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 font-sans">
        <div className="absolute top-24 left-4 z-10"> {/* Cambié top-4 a top-24 */}
          <BackButton />
        </div>
      <h1 className="text-4xl font-bold text-primary mb-6 text-center">Acerca de nosotros</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Imagen */}
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Image
            src="/AboutUs.jpg" // ✅ reemplaza con tu imagen real
            alt="Equipo Vitta"
            fill
            className="object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Texto */}
        <div>
          <p className="text-lg text-gray-700 mb-4">
            En <strong>Vitta</strong>, creemos en el poder de la alimentación y el acompañamiento profesional para transformar vidas.
            Nuestra plataforma conecta a personas con nutricionistas, terapeutas y coaches certificados, comprometidos con brindar atención integral y basada en evidencia.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Nacimos con la misión de facilitar el acceso a profesionales de confianza, promoviendo el bienestar físico, mental y emocional a través de herramientas tecnológicas accesibles y humanas.
          </p>
          <p className="text-lg text-gray-700">
            Estamos en constante evolución, pero nuestro compromiso sigue siendo el mismo: acompañarte en tu camino hacia una vida más saludable, con propósito y consciente.
          </p>
        </div>
      </div>
    </main>
    
  );
}
