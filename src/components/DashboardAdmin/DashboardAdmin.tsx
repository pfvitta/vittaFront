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

      const data: Provider[] = await res.json();
      // Filtrar solo los usuarios con rol 'provider'
      const providers = data.filter(user => user.role === 'provider');
      setProfessionals(providers);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar los profesionales');
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    try {
      setError('');
      setSuccess('');
      const token = localStorage.getItem('token');
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      
      const res = await fetch(`http://localhost:4000/users/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al actualizar el estado');
      }

      // Actualización optimista del estado
      setProfessionals(prev => prev.map(pro => 
        pro.id === id ? { ...pro, status: newStatus } : pro
      ));
      
      setSuccess(`Profesional ${newStatus === 'Active' ? 'activado' : 'desactivado'} correctamente`);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: unknown) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Error al cambiar el estado');
      fetchData();
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
      <h1 className="title1">Gestión de Profesionales</h1>
      
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
        <div className="rounded-lg overflow-x-auto">
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
                      pro.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {pro.status === 'Active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => toggleStatus(pro.id, pro.status || 'Inactive')}
                      className={`px-4 py-2 rounded-full text-sm font-medium text-white ${
                        pro.status === 'Active' ? 'bg-red-600 hover:bg-red-900' : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {pro.status === 'Active' ? 'Desactivar' : 'Activar'}
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