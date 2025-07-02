// components/StripeCheckoutForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useSearchParams } from 'next/navigation';

const StripeCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get('payment_intent_client_secret');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'Error al confirmar el pago');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-5 border rounded">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded"
      >
        {loading ? 'Procesando...' : 'Pagar'}
      </button>
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
    </form>
  );
};

export default StripeCheckoutForm;
