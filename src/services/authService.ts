export const loginUser = async (credentials: { email: string; password: string }) => {
  const res = await fetch(`${process.env.API_URL_BACK}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  const data = await res.json();

  console.log("Respuesta completa del backend (loginUser):", data);

  if (!res.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }

  return data;
};

