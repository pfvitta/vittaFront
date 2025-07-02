export const loginUser = async (credentials: { email: string; password: string }) => {
  const res = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }
  return data.token; // contiene el token
};



