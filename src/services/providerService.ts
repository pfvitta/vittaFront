// services/providerService.ts
import { RegisterProviderValues } from "../types/RegisterProviders";

export const registerProvider = async (data: RegisterProviderValues) => {
    const res = await fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al registrar proveedor");
    }
    console.log ("Provider registered successfully:", data);
    return await res.json();
  };
  
  // services/providerService.ts
// services/providerService.ts
import { Provider } from '@/context/ProvidersContext';

export const getProviders = async (): Promise<Provider[]> => {
  try {
    const res = await fetch("http://localhost:4000/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al obtener proveedores");
    }

    const data = await res.json();
    
    return data.map((provider: any) => ({
      id: provider.id,
      name: provider.name,
      email: provider.email,
      phone: provider.phone,
      dni: provider.dni,
      city: provider.city,
      dob: provider.dob,
      status: provider.status,
      createdAt: provider.createdAt,
      role: provider.role,
      membership: provider.membership,
      professionalProfile: provider.professionalProfile,
      avatarUrl: provider.avatarUrl,
      specialty: provider.specialty || [], // Usa el array de especialidades del perfil profesional
      biography: provider.biography || provider.professionalProfile?.biography // Usa la biografía del perfil profesional
    }));
  } catch (err) {
    console.error('Error fetching providers:', err);
    throw err;
  }
};