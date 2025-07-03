'use client'

import { useProviders } from '@/context/ProvidersContext';
import CardProvider from "../CardProvider/CardProvider";
import { useEffect, useState } from 'react';

function Providers() {
  const { providers, loading, error, refreshProviders } = useProviders();
  const [hasHydrated, setHasHydrated] = useState(false);
  
  // Filtramos solo los providers con rol 'provider'
  const filteredProviders = providers.filter(provider => provider.role === 'provider');

  useEffect(() => {
    if (filteredProviders.length === 0 && !loading) {  // Cambiamos providers por filteredProviders
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
  }, [filteredProviders.length, loading]);  // Cambiamos providers por filteredProviders

  useEffect(() => {
    if (filteredProviders.length > 0 && hasHydrated) {  // Cambiamos providers por filteredProviders
      localStorage.setItem('providersData', JSON.stringify(filteredProviders));  // Guardamos los filtrados
    }
  }, [filteredProviders, hasHydrated]);  // Cambiamos providers por filteredProviders

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

  if (filteredProviders.length === 0) {  // Cambiamos providers por filteredProviders
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
      <h1 className='title1'>Nuestros profesionales</h1>
      {filteredProviders.map((provider) => (  // Cambiamos providers por filteredProviders
        <CardProvider
          key={provider.id}
          id={provider.id}
          name={provider.name}
          imageUrl={provider.imageUrl || '/Avatar.jpg'}
          specialty={provider.professionalProfile?.specialty || []}
          biography={provider.professionalProfile?.biography || ''}
        />
      ))}
    </div>
  );
}

export default Providers;