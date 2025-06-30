'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Provider } from '@/types/Provider';

type CardProviderProps = Pick<
  Provider,
  'id' | 'name' | 'avatarUrl' | 'professionalProfile'
>;

const CardProvider = ({ id, name, avatarUrl, professionalProfile }: CardProviderProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleProtectedClick = () => {
    if (!id) {
      alert('El ID del profesional no está disponible.');
      return;
    }

    if (!isAuthenticated) {
      alert('Debes iniciar sesión para ver el perfil del profesional.');
      // Redirección directa vía Auth0
      window.location.href = `http://localhost:4000/auth/login?callbackUrl=/providers/${id}`;
      return;
    }

    router.push(`/providers/${id}`);
  };

  return (
    <div className="flex bg-gray-100 rounded-xl shadow-md p-4 max-w-3xl w-full">
      <div className="w-36 h-36 relative rounded-lg border border-primary overflow-hidden mr-4">
        <Image
          src={avatarUrl || '/default-profile.png'}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-2xl font-bold text-secondary mb-1">{name}</h3>
          <div className="text-primary text-2xl">★★★★★</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {professionalProfile.specialty.map((item) => (
            <span
              key={item.id}
              className="border border-tertiary text-tertiary text-xs px-2 py-1 rounded-full"
            >
              {item.name}
            </span>
          ))}
        </div>

        <p className="text-sm text-secondary mb-3">
          {professionalProfile.biography || 'Sin biografía'}
        </p>

        <div className="flex justify-end">
          <button
            onClick={handleProtectedClick}
            className="text-sm px-4 py-2 rounded-full bg-secondary text-white hover:bg-primary transition"
          >
            Ver perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProvider;

