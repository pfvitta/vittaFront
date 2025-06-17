// services/authService.ts
export async function loginUser(credentials: { email: string; password: string }) {
    const response = await fetch("http://localhost:4000/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }
  
    return response.json();
  }
  