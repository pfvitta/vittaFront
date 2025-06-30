import { RegisterUserValues } from "@/types/forms/RegisterUser";

export const registerUser = async (userData: RegisterUserValues) => {
  const res = await fetch("http://localhost:4000/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error al registrar usuario");
  }

  return await res.json();
};

// OBTENER USUARIO POR ID (ya logueado)
export const getUserById = async (id: string) => {
  const res = await fetch(`http://localhost:4000/users/${id}`, {
    method: "GET",
    credentials: "include", // 👈 NECESARIO PARA ENVIAR COOKIE
  });

  if (!res.ok) {
    throw new Error("No se pudo obtener el usuario");
  }

  return await res.json();
};


export const fetchUserProfile = async () => {
  const res = await fetch('http://localhost:4000/auth/me', {
    credentials: 'include',
  });
  if (res.status === 401) return null; // No autenticado, retorna null
  if (!res.ok) throw new Error('Error al obtener perfil');
  return res.json();
};



