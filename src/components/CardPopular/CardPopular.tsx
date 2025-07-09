'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; 
import Image from 'next/image';
import Link from 'next/link';
import {toast} from 'react-hot-toast';

interface CardPopularProps {
  id: string;
  imageUrl: string;
  name: string;
}

const CardPopular = ({ id, imageUrl, name  }: CardPopularProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleProtectedClick = () => {
    if (!id) {
      toast.error("El ID del profesional no está disponible.");
      return;
    }

    if (!isAuthenticated) {
      toast('Debes iniciar sesión para ver el perfil del profesional.', {
        icon: '❗',
      });
      router.push('/login');
      return;
    }

    router.push(`/providers/${id}`);
  }

  return (
    <div className='w-full'>
      <div className="w-44 h-44 relative rounded-full border border-secondary overflow-clip mb-2 mr-4">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-1">{name}</h3>
      <Link href={`/providers/${id}`} onClick={handleProtectedClick} className="text-center text-secondary hover:text-primary transition">Ver mas...</Link>
    </div>
  )
}

export default CardPopular;
