'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CancelPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const notifyCancel = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/cancel?email=${user.email}`, {
          method: 'GET',
        });

        if (!response.ok) {
          console.error("No se pudo notificar la cancelación.");
        }
      } catch (error) {
        console.error("Error al notificar cancelación:", error);
      }
    };

    notifyCancel();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Pago cancelado</h1>
      <p className="text-gray-600">Tu pago ha sido cancelado. Si fue un error, puedes intentarlo de nuevo desde tu dashboard.</p>
      <button
        onClick={() => router.push('/dashboard/user')}
        className="mt-6 px-4 py-2 bg-secondary text-white rounded hover:bg-primary"
      >
        Volver al Dashboard
      </button>
    </div>
  );
}
