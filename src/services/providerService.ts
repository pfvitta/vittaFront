// services/providerService.ts
import { RegisterProviderValues } from "../types/RegisterProviders";

export const registerProvider = async (data: RegisterProviderValues) => {
    const res = await fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) throw new Error("Error al registrar proveedor");
    return await res.json();
  };
  