// services/userService.ts

type CreateUserPayload = {
    name: string;
    email: string;
    password: string;
    phone: string;
    dni: string;
    city: string;
    dob: string;
    role: string;
  };
  
  export const registerUser = async (userData: CreateUserPayload) => {
    const res = await fetch("http://localhost:3001/users/register", {
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
  