'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getProviderById } from '@/services/providerService';
import { Provider } from '@/types/Provider';
import { useAuth } from '@/context/AuthContext';
import { MapPin, User, IdCard } from 'lucide-react';
import { goToMembershipWithReturn } from '@/app/utils/navigation';

export default function ProviderProfile() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';

  const { hasMembership } = useAuth();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProvider = async () => {
      try {
        const data = await getProviderById(id);
        setProvider(data);
      } catch  {
        setError('Error al obtener el perfil del profesional');
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id]);

  const handleBookingClick = () => {
    if (!hasMembership) {
      router.push(`/memberships?redirectTo=/providers/${id}`);
    } else {
      router.push(`/appointments/create?providerId=${id}`);
    }
  };

  if (loading) return <p className="p-4">Cargando perfil...</p>;
  if (error || !provider) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Imagen */}
      <div className="col-span-1 flex justify-center md:justify-start">
        <div className="w-60 h-60 relative rounded-xl border border-primary overflow-hidden">
          <Image
            src={provider.imageUrl || '/Avatar.jpg'}
            alt={provider.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Perfil principal */}
      <div className="md:col-span-2">
        <h1 className="text-4xl font-bold text-secondary">{provider.name}</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {provider.professionalProfile?.specialty?.map((s) => (
            <span key={s.id} className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {s.name}
            </span>
          ))}
        </div>

        <p className="text-gray-600 mt-4 text-sm leading-relaxed">{provider.professionalProfile.biography}</p>

        {/* Reseñas simuladas */}
        <div className="flex items-center mt-3 text-green-600 font-semibold text-sm">
          ★★★★★ <span className="ml-2 text-gray-500 font-normal">80 customer reviews</span>
        </div>
      </div>

      {/* Datos personales */}
      <div className="md:col-span-1 bg-gray-50 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold text-secondary mb-4">Datos personales</h2>
        <div className="text-gray-700 space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <span>{provider.dob}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{provider.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <IdCard className="w-4 h-4 text-primary" />
            <span>Matrícula {provider.professionalProfile.licenseNumber}</span>
          </div>
        </div>
      </div>

      {/* Agenda */}
      <div className="md:col-span-1 bg-gray-50 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold text-secondary mb-1">Agenda tus consultas del mes</h2>
        <p className="text-green-600 font-semibold text-sm mb-2">Haz clic para ver la disponibilidad</p>
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
          <li>Los turnos son a través de videollamadas.</li>
          <li>La tolerancia de espera es de 10 min.</li>
          <li>Disponer de micrófono y cámara.</li>
        </ul>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleBookingClick}
            className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-full text-sm transition"
          >
            Agendar citas
          </button>
        </div>
      </div>

      {/* Membresía */}
      <div className="md:col-span-1 bg-gray-50 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold text-secondary mb-1">Membresía</h2>
        <p className="text-green-600 font-bold text-lg">$50.000 c/ mes</p>
        <p className="text-sm text-gray-700 mt-1">
          Incluye 4 sesiones al mes para consultas (1 semanal), controles o planes alimenticios.
        </p>

        <div className="mt-4">
          <button
  onClick={() => goToMembershipWithReturn(router)}
  className="bg-secondary hover:bg-primary text-white px-6 py-2 rounded-full text-sm transition w-full"
>
  Acceder ahora
</button>

        </div>
      </div>
    </div>
  );
}







