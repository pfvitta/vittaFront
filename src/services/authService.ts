export const loginUser = async (credentials: { email: string; password: string }) => {
  const res = await fetch("http://localhost:4000/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: 'include', // Si usas cookies
  });

  // Manejar respuesta vacía (204)
  if (res.status === 204) {
    return null;
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }

  return data;
};