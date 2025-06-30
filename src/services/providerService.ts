import { RegisterProviderValues } from "@/types/forms/RegisterProviders";
import { Provider} from "@/types/Provider"; // Asegúrate que los tipos están bien importados

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;


export const registerProvider = async (data: RegisterProviderValues) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al registrar proveedor");
  }

  return await res.json();
};

export const getProviders = async (): Promise<Provider[]> => {
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al obtener proveedores");
    }

    const data: Provider[] = await res.json();

    return data.map((provider): Provider => ({
      ...provider,
      professionalProfile: {
        ...provider.professionalProfile,
        specialty: provider.professionalProfile?.specialty || [],
      },
      avatarUrl: provider.avatarUrl || provider?.avatarUrl || "",
    }));
  } catch (err) {
    console.error("Error fetching providers:", err);
    throw err;
  }
};

export const getProviderById = async (id: string): Promise<Provider> => {
  try {
    const res = await fetch(`${BASE_URL}/providers/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Error al obtener proveedor');
    }

    const data = await res.json();

    const provider: Provider = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      phone: data.user.phone,
      dni: data.user.dni,
      city: data.user.city,
      dob: data.user.dob,
      status: data.user.status,
      createdAt: data.user.createdAt,
      role: data.user.role,
      membership: data.user.membership ?? null,
      avatarUrl: data.user.avatarUrl ?? '',
      professionalProfile: {
        biography: data.biography,
        experience: data.experience,
        licenseNumber: data.licenseNumber,
        verified: data.verified,
        verifiedBy: data.verifiedBy,
        specialty: data.specialty || [],
        id: data.id,
      },
    };

    return provider;
  } catch (err) {
    console.error('Error fetching provider by ID:', err);
    throw err;
  }
};