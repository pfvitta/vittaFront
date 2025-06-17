import { RegisterUserValues } from "@/types/RegisterUser";
  
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
  