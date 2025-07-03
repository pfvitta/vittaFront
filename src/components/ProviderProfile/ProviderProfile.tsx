'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaBirthdayCake, FaIdCard } from 'react-icons/fa';
import { Provider } from '@/types/Provider';



export default function ProviderProfile() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';

  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProvider = async () => {
      try {
        const res = await fetch(`http://localhost:4000/users/${id}`);
        if (!res.ok) throw new Error('Error al cargar el perfil');
        const data = await res.json();
        setProvider(data);
      } catch (error) {
        console.error('Error al obtener el perfil del profesional:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id]);

  if (loading) return <p className="text-center p-8">Cargando perfil...</p>;
  if (!provider) return <p className="text-center p-8 text-red-600">No se encontró el profesional.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/3 h-[300px] md:h-auto">
              <Image
                src={provider.imageUrl || '/Avatar.jpg'}
                alt="Foto Profesional"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex-1">
              <h1 className="text-3xl font-bold text-secondary mb-2">
                {provider.name}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {provider.professionalProfile.specialty.map((esp, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {String(esp)}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 text-sm mb-4">{provider.professionalProfile?.biography}</p>

              <div className="flex items-center text-green-500 gap-1 text-sm font-medium">
                ★★★★★
                <span className="text-gray-600 ml-2">80 opiniones</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-secondary">Datos personales</h2>
          <div className="flex items-center gap-3 text-gray-700">
            <FaBirthdayCake /> {provider.dob}
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt /> {provider.city}
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaIdCard /> Matrícula {provider.professionalProfile?.licenseNumber}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-secondary mb-2">Agendá tu turno</h2>
          <p className="text-green-600 font-semibold mb-2">Lunes a viernes de 8:00hs a 15:00hs</p>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Los turnos son a través de videollamadas.</li>
            <li>La tolerancia de espera es de 10 min.</li>
            <li>Disponer de micrófono y cámara.</li>
          </ul>
          <Link href="/appointments">
            <button className="mt-4 bg-secondary text-white px-4 py-2 rounded-full text-sm hover:bg-primary transition">
              Agendar turno
            </button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-secondary mb-2">Membresía</h2>
          <p className="text-primary font-bold text-lg">$50.000 c/mes</p>
          <p className="text-sm text-gray-600 mt-1">
            Incluye 2 sesiones al mes para consultas, controles o planes alimenticios.
          </p>
          <Link href="/memberships">
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-secondary transition">
              Acceder ahora
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}


