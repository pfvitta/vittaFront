'use client';

import { useState } from 'react';
import { CreditCard } from 'lucide-react';

const Memberships = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Error al crear la orden de PayPal');
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No se encontró URL de aprobación');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-gray-100 max-w-xl w-full border border-secondary rounded-lg shadow-sm">
        <div className="p-6 text-center">
          <div className="mb-4">
            <div className="flex justify-center mb-3">
              <CreditCard className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="title1">Membresía</h1>
            <p className="text-secondary font-semibold text-lg">¡Accede a un plan!</p>
          </div>

          <div className="space-y-3 mb-6">
            <p className="text-sm text-secondary">- Accede a dos sesiones al mes</p>
            <p className="text-sm text-secondary">- Un plan nutricional personalizado</p>
            <p className="text-sm text-secondary">- Información para un seguimiento seguro en tu salud</p>
          </div>

          <div className="mb-6">
            <p className="text-2xl font-bold text-primary">$50.000</p>
            <p className="text-sm text-primary">c/mes</p>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className={`bg-secondary border text-white px-4 py-2 rounded-full text-sm hover:bg-primary transition ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Redirigiendo...' : 'Acceder ahora'}
          </button>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Memberships;

