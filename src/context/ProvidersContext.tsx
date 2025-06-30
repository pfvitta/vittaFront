// context/ProvidersContext.tsx
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { getProviders } from '@/services/providerService';
import { Provider } from '@/types/Provider';

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

export const ProvidersProvider = ({ children }: { children: ReactNode }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProviders();

      const normalizedProviders: Provider[] = data.map((provider: Provider) => ({
        ...provider,
        avatarUrl: provider.avatarUrl || "/default-profile.png",
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
        refreshProviders: fetchProviders,
      }}
    >
      {children}
    </ProvidersContext.Provider>
  );
};

export const useProviders = () => useContext(ProvidersContext);
