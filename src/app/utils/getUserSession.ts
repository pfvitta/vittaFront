// /src/utils/getUserSession.ts

export interface UserSession {
  user: {
    name: string;
    email: string;
    picture?: string;
    [key: string]: string | undefined;
  } | null;
  role: string | null;
}

export const getUserSession = async (): Promise<UserSession> => {
  try {
    const res = await fetch('/api/session');
    if (!res.ok) throw new Error('No autorizado');

    const data = await res.json();
    return {
      user: data.user,
      role: data.role,
    };
  } catch (err) {
    console.error('No se pudo obtener la sesión del usuario:', err);
    return {
      user: null,
      role: null,
    };
  }
};
