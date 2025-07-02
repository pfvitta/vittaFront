// services/stripeService.ts
import { loadStripe } from '@stripe/stripe-js';

export const initializeStripe = async () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey) throw new Error('Stripe publishable key not configured');

  const stripe = await loadStripe(publishableKey);
  if (!stripe) throw new Error('Failed to initialize Stripe');

  return stripe;
};

export const createStripePayment = async (email: string): Promise<{ clientSecret: string }> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error('API URL no configurada');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error al crear orden de pago');
  }

  const data = await response.json();
  if (!data.clientSecret) {
    throw new Error('Falta clientSecret en la respuesta');
  }

  return data;
};