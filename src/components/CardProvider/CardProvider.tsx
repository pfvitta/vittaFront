'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface CardProviderProps {
  id: string;
  name: string;
  imageUrl: string;
  specialty: string[];
  biography: string;
}

const CardProvider = ({ id, name, imageUrl, specialty, biography }: CardProviderProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleProtectedClick = () => {
    if (!id) {
      alert("El ID del profesional no está disponible.");
      return;
    }

    if (!isAuthenticated) {
      alert("Debes iniciar sesión para ver el perfil del profesional.");
      router.push('/login');
      return;
    }

    router.push(`/providers/${id}`);
  };

  return (
    <div className="flex bg-[#F8FBFE] rounded-xl shadow-md p-4 max-w-3xl w-full">
      <div className="w-24 h-24 relative rounded-lg overflow-hidden mr-4">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-secondary">{name}</h3>
          <div className="text-secondary text-xl">★★★★★</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {specialty.map((item, idx) => (
            <span key={idx} className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">
              {item}
            </span>
          ))}
        </div>

        <p className="text-sm text-secondary mb-3">{biography}</p>

        <div className="flex justify-end">
          <button
            onClick={handleProtectedClick}
            className="text-sm px-4 py-2 rounded-full bg-primary text-white hover:bg-secondary transition"
          >
            Ver perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProvider;





