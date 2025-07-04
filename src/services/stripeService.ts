
import { loadStripe } from '@stripe/stripe-js';

export const initializeStripe = async () => {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('Stripe publishable key not configured');
  }

  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  if (!stripe) {
    throw new Error('Failed to initialize Stripe');
  }
  return stripe;
};

// services/stripeService.ts
export const createCheckoutSession = async (email: string): Promise<{ url: string }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'No se pudo crear la sesión de pago');
  }

  const data = await response.json();
  if (!data.url) throw new Error('No se recibió una URL válida de Stripe');
  return data;
};


export const createStripePayment = async (email: string): Promise<{ clientSecret: string }> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/stripe/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }), // 👈 Aquí se envía el email
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create payment');
    }

    const data = await response.json();

    if (!data.clientSecret) {
      throw new Error('Missing clientSecret in response');
    }

    return data;
  } catch (error) {
    console.error('Stripe payment error:', error);
    throw error;
  }
};