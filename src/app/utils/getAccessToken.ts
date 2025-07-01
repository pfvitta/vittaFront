// src/app/utils/getAccessToken.ts
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const res = await fetch('/api/token');
    if (!res.ok) throw new Error('No autorizado');
    const data = await res.json();
    return data.accessToken;
  } catch (err) {
    console.error('No se pudo obtener el token', err);
    return null;
  }
};