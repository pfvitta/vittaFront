'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; 

interface Specialty {
  id: string;
  name: string;
}
interface CardProviderProps {
  id: string;
  name: string;
  imageUrl: string;
  specialty: Specialty[];
  biography: string;
}

const CardProvider = ({ id, name, imageUrl, specialty, biography }: CardProviderProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Optimización para imágenes de Cloudinary
  const optimizedImageUrl = imageUrl.includes('res.cloudinary.com') 
    ? `${imageUrl.split('upload/')[0]}upload/w_300,h_300,c_fill/${imageUrl.split('upload/')[1]}`
    : imageUrl;

const handleProtectedClick = () => {
  console.log('[handleProtectedClick]', { isAuthenticated, id });

  if (!id) {
    alert("El ID del profesional no está disponible.");
    return;
  }

  if (!isAuthenticated) {
    alert("Debes iniciar sesión para ver el perfil del profesional.");
    window.location.href = '/login'; // evita error CORS
    return;
  }

  router.push(`/providers/${id}`);
};



  return (
    <div className="flex bg-gray-100 rounded-xl shadow-md p-4 max-w-3xl w-full">
      {/* Imagen con optimización */}
      <div className="w-36 h-36 relative rounded-lg border border-primary overflow-hidden mr-4">
        <Image 
          src={optimizedImageUrl} 
          alt={name} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/Avatar.jpg';
          }}
        />
      </div>
    
      {/* Resto del código permanece igual */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-2xl font-bold text-secondary mb-1">{name}</h3>
          <div className="text-primary text-2xl">★★★★★</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {specialty.map((item) => (
            <span
              key={item.id}
              className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold"
            >
              {item.name}
            </span>
          ))}
        </div>

        <p className="text-sm text-secondary mb-3">{biography}</p>

        <div className='flex justify-end'>
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