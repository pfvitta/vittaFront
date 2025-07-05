'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // importa tu contexto

export default function SuccessPage() {
  const router = useRouter();
  const { setUser } = useAuth(); // ← importante para actualizar el estado global del usuario

  useEffect(() => {
    const fetchUpdatedUser = async () => {
      try {
        const res = await fetch('http://localhost:4000/auth/me', {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok && data?.user) {
          setUser(data.user); // esto actualiza el contexto y activa hasMembership
        }
      } catch (error) {
        console.error('❌ Error al actualizar el usuario después del pago:', error);
      }
    };

    const previousPath = localStorage.getItem('previousPath') || '/';

    fetchUpdatedUser(); // actualizar el usuario inmediatamente

    const timeout = setTimeout(() => {
      router.push(previousPath);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [router, setUser]);

  return (
    <div className="text-center py-20">
      <h1 className="text-green-600 text-2xl font-bold mb-2">¡Pago exitoso! 🎉</h1>
      <p className="text-gray-500">Redirigiendo a tu página anterior...</p>
    </div>
  );
}


