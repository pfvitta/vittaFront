'use client';

import Link from 'next/link';

export default function RegisterSelection() {
  return (
    <div className="min-h-screen bg-[#ECFDF5] flex flex-col items-center justify-center px-4 py-12 text-secondary">
      <h1 className="text-3xl font-bold mb-2 text-center">Regístrate a Vitta</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Opción 1 - Usuario */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-semibold text-secondary mb-2">
            Soy paciente o familiar
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Si quieres encontrar ayuda nutricional.
          </p>
          <Link href="/register/user">
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition">
              Empieza aquí
            </button>
          </Link>
        </div>

        {/* Opción 2 - Profesional */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-semibold text-secondary mb-2">
            Soy profesional de la salud
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Eres nutricionista y quieres unirte a nuestra plataforma.
          </p>
          <Link href="/register/provider">
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition">
              Regístrate aquí
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

