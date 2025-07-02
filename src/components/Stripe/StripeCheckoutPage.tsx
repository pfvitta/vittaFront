// app/stripe-checkout/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from '@/components//Stripe/StripeCheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function StripeCheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }), // reemplaza por user.email
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, []);

  const appearance = {
    theme: 'stripe' as const,
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) return <p className="text-center mt-10">Cargando formulario de pago...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Elements stripe={stripePromise} options={options}>
        <StripeCheckoutForm />
      </Elements>
    </div>
  );
}
