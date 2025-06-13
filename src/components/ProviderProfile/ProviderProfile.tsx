// app/providers/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaMapMarkerAlt, FaBirthdayCake, FaIdCard } from 'react-icons/fa';

export default function ProviderProfile() {
  const { id } = useParams();

  // Datos mockeados por ahora
  const mockProvider = {
    id,
    firstName: 'Maria',
    lastName: 'Jimenez',
    tipoDocumento: 'DNI',
    documento: '12345678',
    especialidades: ['Veganismo', 'Obesidad'],
    descripcion: `Subheading that sets up context, shares more info about the author, or generally gets people psyched to keep reading.`,
    edad: '35 años',
    ciudad: 'Buenos Aires, Argentina',
    matricula: '1234/43',
    imagen: '/FotoPerfilProvider.jpg',
    rating: 5,
    reviews: 80,
    precio: '$10.000 c/mes',
    beneficio: 'Incluye 2 sesiones al mes para consultas, controles o planes alimenticios.',
    horarios: 'Lunes a viernes de 8:00hs a 15:00hs',
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
      {/* Columna Izquierda */}
      <div className="space-y-6">
        {/* Imagen + Nombre + Especialidades */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/3 h-[300px] md:h-auto">
              <Image
                src={mockProvider.imagen}
                alt="Foto Profesional"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex-1">
              <h1 className="text-3xl font-bold text-secondary mb-2">
                {mockProvider.firstName} {mockProvider.lastName}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {mockProvider.especialidades.map((esp, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {esp}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 text-sm mb-4">{mockProvider.descripcion}</p>

              <div className="flex items-center text-green-500 gap-1 text-sm font-medium">
                {'★'.repeat(mockProvider.rating)}{' '}
                <span className="text-gray-600 ml-2">{mockProvider.reviews} customer reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Datos Personales */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-secondary">Datos personales</h2>
          <div className="flex items-center gap-3 text-gray-700">
            <FaBirthdayCake /> {mockProvider.edad}
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt /> {mockProvider.ciudad}
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaIdCard /> Matrícula {mockProvider.matricula}
          </div>
        </div>
      </div>

      {/* Columna Derecha */}
      <div className="space-y-6">
        {/* Agenda */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-secondary mb-2">Agendá tu turno</h2>
          <p className="text-green-600 font-semibold mb-2">{mockProvider.horarios}</p>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Los turnos son a través de videollamadas.</li>
            <li>La tolerancia de espera es de 10 min.</li>
            <li>Disponer de micrófono y cámara.</li>
          </ul>
          <button className="mt-4 bg-secondary text-white px-4 py-2 rounded-full text-sm hover:bg-primary transition">
            Agendar turno
          </button>
        </div>

        {/* Membresía */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-secondary mb-2">Membresía</h2>
          <p className="text-primary font-bold text-lg">{mockProvider.precio}</p>
          <p className="text-sm text-gray-600 mt-1">{mockProvider.beneficio}</p>
          <button className="mt-4 bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-secondary transition">
            Acceder ahora
          </button>
        </div>
      </div>
    </div>
  );
}


