'use client';

import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Cargar Stripe con la clave pública desde las variables de entorno
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Memberships = () => {
  const [loading, setLoading] = useState<'paypal' | 'stripe' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePaypalPayment = async () => {
    setLoading('paypal');
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paypal/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear orden de PayPal');
      }

      const { url } = await response.json();
      
      if (!url) {
        throw new Error('No se recibió URL de redirección de PayPal');
      }

      window.location.href = url;
    } catch (err) {
      console.error('Error en pago PayPal:', err);
      setError(err instanceof Error ? err.message : 'Error al procesar pago con PayPal');
      setLoading(null);
    }
  };

  const handleStripePayment = async () => {
    setLoading('stripe');
    setError(null);

    try {
      // 1. Inicializar Stripe
      const stripe = await stripePromise;
      if (!stripe) throw new Error('No se pudo cargar Stripe');

      // 2. Crear la sesión de pago en el backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear orden de pago');
      }

      const { clientSecret } = await response.json();
      
      if (!clientSecret) {
        throw new Error('No se recibió clientSecret de Stripe');
      }

      // 3. Confirmar el pago y redirigir
      const { error: stripeError } = await stripe.confirmPayment({
        clientSecret,
        
        confirmParams: {
          return_url: `${window.location.origin}/success`, // Añadido dentro de confirmParams
        }
      });

      if (stripeError) throw stripeError;

    } catch (err) {
      console.error('Error en pago Stripe:', err);
      setError(err instanceof Error ? err.message : 'Error al procesar pago con Stripe');
      setLoading(null);
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
            <h1 className="title1">Membresía Premium</h1>
            <p className="text-secondary font-semibold text-lg">¡Accede a todos nuestros beneficios!</p>
          </div>

          <div className="space-y-3 mb-6">
            <p className="text-sm text-secondary">- Acceso ilimitado a contenido</p>
            <p className="text-sm text-secondary">- Soporte prioritario</p>
            <p className="text-sm text-secondary">- Actualizaciones exclusivas</p>
          </div>

          <div className="mb-6">
            <p className="text-2xl font-bold text-primary">$50.000</p>
            <p className="text-sm text-primary">por mes</p>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={handlePaypalPayment}
              disabled={loading === 'paypal'}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ${
                loading === 'paypal' ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading === 'paypal' ? 'Procesando...' : 'Pagar con PayPal'}
            </button>
            
            <button
              onClick={handleStripePayment}
              disabled={loading === 'stripe'}
              className={`bg-[#635bff] text-white px-4 py-2 rounded-lg hover:bg-[#4a42d6] transition ${
                loading === 'stripe' ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading === 'stripe' ? 'Procesando...' : 'Pagar con Stripe'}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="text-blue-500 text-xs mt-1 hover:underline"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Memberships;