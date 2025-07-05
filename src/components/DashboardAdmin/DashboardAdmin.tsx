'use client';
import { useEffect, useState } from 'react';
import { Provider } from '@/types/Provider';

export default function AdminDashboard() {
  const [professionals, setProfessionals] = useState<Provider[]>([]);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:4000/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return;

    const data = await res.json();
    setProfessionals(data);
  };

  const toggleEnable = async (id: string) => {
    const token = localStorage.getItem('token');

    await fetch(`http://localhost:4000/users/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchData(); // refrescar tabla
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Profesionales registrados</h1>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Matrícula</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {professionals.map((pro) => (
            <tr key={pro.id} className="text-center border-t">
              <td className="px-4 py-2">{pro.name}</td>
              <td className="px-4 py-2">{pro.professionalProfile?.licenseNumber}</td>
              <td className="px-4 py-2">{pro.status ? 'Active' : 'Inactive'}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => toggleEnable(pro.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  {pro.status ? 'Desactivar' : 'Activar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
