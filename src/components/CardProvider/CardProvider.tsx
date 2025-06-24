// CardProvider.tsx
'use client'; // Añade esto porque usamos hooks del cliente

import Image from 'next/image';
import Link from 'next/link';
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

  const handleProfileClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      alert("Debes iniciar sesion para poder ver el perfil de los profesionales")
      router.push('/login'); // Redirige a la página de login
      
    }
  };

  return (
    <div className="flex bg-gray-100 rounded-xl shadow-md p-4 max-w-3xl w-full">
      {/* Imagen */}
      <div className="w-24 h-24 relative rounded-lg overflow-hidden mr-4">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-secondary">{name}</h3>
          <div className="text-secondary text-xl">★★★★★</div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {specialty.map((specialty, idx) => (
            <span
              key={idx}
              className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* Descripción */}
        <p className="text-sm text-secondary mb-3">{biography}</p>

        {/* Botón ver perfil */}
        <div className='flex justify-end'>
          <Link 
            href={isAuthenticated ? `/providers/${id}` : '/auth/login'}
            passHref
          >
            <button 
              onClick={handleProfileClick}
              className="text-sm px-4 py-2 rounded-full bg-primary text-white hover:bg-secondary transition"
            >
              Ver perfil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardProvider;
