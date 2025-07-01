import { RegisterUserValues } from "@/types/forms/RegisterUser";
  
/** 
  export const registerUser = async (userData: RegisterUserValues) => {
    const res = await fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData.user),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Error al registrar usuario");
    }
  
    return await res.json();
  };
*/
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

    const text = await res.text();

    // 🧠 Validar que no sea vacío
    if (!text) return {};

    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("Respuesta no es JSON válido:", text, err);
      throw new Error("Error al parsear respuesta del backend");
    }
  };


  export const getUserById = async (id: string, token: string) => {
    const res = await fetch(`http://localhost:4000/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("No se pudo obtener el usuario");
    }
  
    return await res.json();
  };
  



  