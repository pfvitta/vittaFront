'use client';
import { useEffect, useState } from 'react';
import { Provider } from '@/types/Provider';

export default function AdminDashboard() {
  const [professionals, setProfessionals] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Error al cargar profesionales');
      }

      const data = await res.json();
      setProfessionals(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar los profesionales');
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      setError('');
      setSuccess('');
      const token = localStorage.getItem('token');
      const newStatus = !currentStatus;
      
      // Primero obtenemos el profesional completo
      const getRes = await fetch(`http://localhost:4000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!getRes.ok) {
        throw new Error('Error al obtener datos del profesional');
      }

      const professional = await getRes.json();
      
      // Actualizamos el profesional con el nuevo estado
      const updateRes = await fetch(`http://localhost:4000/users/${id}`, {
        method: 'PUT', // Usamos PUT en lugar de PATCH
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...professional,
          status: newStatus
        }),
      });

      if (!updateRes.ok) {
        throw new Error('Error al actualizar el estado');
      }

      // Actualización optimista del estado
      setProfessionals(prev => prev.map(pro => 
        pro.id === id ? { ...pro, status: newStatus } : pro
      ));
      
      setSuccess(`Profesional ${newStatus ? 'activado' : 'desactivado'} correctamente`);
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Error al cambiar el estado');
      fetchData(); // Recargamos los datos para mantener consistencia
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Profesionales</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {professionals.length === 0 ? (
        <p className="text-gray-500">No hay profesionales registrados</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Matrícula</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {professionals.map((pro) => (
                <tr key={pro.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{pro.name}</td>
                  <td className="px-4 py-2">{pro.professionalProfile?.licenseNumber || 'N/A'}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      pro.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {pro.status ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => toggleStatus(pro.id, pro.status)}
                      className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                        pro.status ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {pro.status ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}