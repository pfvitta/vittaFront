// context/ProvidersContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { getProviders } from '../services/providerService';

// Define las interfaces
export interface ProfessionalProfile {
  id: string;
  biography: string;
  verified: boolean;
  verifiedBy: string | null;
  experience: string;
  licenseNumber: string;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  dni: string;
  city: string;
  dob: string;
  status: string;
  createdAt: string;
  role: string;
  membership: null | any;
  professionalProfile: ProfessionalProfile;
  avatarUrl?: string;
  specialty?: string[]; // Añade specialty aquí
  biography?: string; // Añade biography aquí para acceso directo
}

interface ProvidersContextType {
  providers: Provider[];
  loading: boolean;
  error: string | null;
  refreshProviders: () => void;
}

const ProvidersContext = createContext<ProvidersContextType>({
  providers: [],
  loading: false,
  error: null,
  refreshProviders: () => {},
});

export const ProvidersProvider = ({ children }: { children: React.ReactNode }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProviders();
      
      const normalizedProviders = data.map(provider => ({
        ...provider,
        specialty: provider.specialty || [], // Asegura que specialty sea un array
        biography: provider.biography || provider.professionalProfile?.biography || "Descripción no disponible",
        avatarUrl: provider.avatarUrl || "/default-profile.png"
      }));

      setProviders(normalizedProviders);
      localStorage.setItem('providersData', JSON.stringify(normalizedProviders));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error fetching providers:', err);
      
      const savedProviders = localStorage.getItem('providersData');
      if (savedProviders) {
        try {
          const parsed = JSON.parse(savedProviders);
          setProviders(parsed);
        } catch (parseError) {
          console.error('Error parsing localStorage data:', parseError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <ProvidersContext.Provider 
      value={{ 
        providers, 
        loading, 
        error,
        refreshProviders: fetchProviders 
      }}
    >
      {children}
    </ProvidersContext.Provider>
  );
};

export const useProviders = () => useContext(ProvidersContext);