export const loginUser = async (credentials: { email: string; password: string }) => {
  const res = await fetch("http://localhost:4000/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  if (res.status === 204) {
    return null;
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }

  // ✅ Guardar datos del usuario en localStorage
  localStorage.setItem("user", JSON.stringify(data));

  return data;
};
