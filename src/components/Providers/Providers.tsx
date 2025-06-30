'use client';

import { useProviders } from '@/context/ProvidersContext';
import CardProvider from '@/components/CardProvider/CardProvider';
import { useEffect, useState } from 'react';

function Providers() {
  const { providers, loading, error, refreshProviders } = useProviders();
  const [hasHydrated, setHasHydrated] = useState(false);

  // Solo para restaurar datos desde localStorage si hay error
  useEffect(() => {
    if (providers.length === 0 && !loading) {
      const savedProviders = localStorage.getItem('providersData');
      if (savedProviders) {
        try {
          JSON.parse(savedProviders);
        } catch (e) {
          console.error('Error parsing localStorage data', e);
          localStorage.removeItem('providersData');
        }
      }
      setHasHydrated(true);
    }
  }, [providers.length, loading]);

  if (loading && !hasHydrated) {
    return (
      <div className="flex flex-col items-center gap-6 px-4 py-10">
        <p>Cargando profesionales...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-6 px-4 py-10">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={refreshProviders}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 px-4 py-10">
        <p>No hay profesionales disponibles</p>
        <button
          onClick={refreshProviders}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Recargar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-10">
      <h1 className="title1">Nuestros profesionales</h1>
      {providers.map((provider) => (
        <CardProvider
          key={provider.id}
          id={provider.id}
          name={provider.name}
          avatarUrl={provider.avatarUrl || '/Avatar.jpg'}
          professionalProfile={provider.professionalProfile}
        />
      ))}
    </div>
  );
}

export default Providers;


