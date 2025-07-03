export const createPayPalOrder = async (): Promise<string> => {
    const res = await fetch('http://localhost:4000/paypal/create-order', {
      method: 'POST',
    });
  
    if (!res.ok) {
      throw new Error('Error al crear la orden de PayPal');
    }
  
    const data = await res.json();
    return data.url; // URL de aprobación que devuelve el backend
  };
  