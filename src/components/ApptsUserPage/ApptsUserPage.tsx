'use client';

import { useEffect, useState } from 'react';
import { Appointment } from '@/types/Appointment';
import { getAppointmentsByUser, cancelAppointment } from '@/services/appointmentService';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-hot-toast';

export default function UserAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log("userId desde localStorage:", userId); // 
    if (!user?.id) return;

    getAppointmentsByUser(user.id)
      .then(setAppointments)
      .catch((err) => {
        console.error('Error al obtener turnos:', err);
        toast.error('No se pudieron cargar los turnos');
      });
  }, [user?.id]);

  const handleCancel = async (id: string) => {
  try {
    await cancelAppointment(id); 
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status: 'cancelled' } : appt))
    );
    toast.success('Turno cancelado');
  } catch (error) {
    console.error('Error al cancelar turno:', error);
    toast.error('No se pudo cancelar el turno');
  }
};


  return (
    <div>
      <h1 className="title1 mb-6">Mis turnos</h1>
      {appointments.length === 0 ? (
        <p className="text-gray-600">No tienes turnos agendados.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li
              key={appt.id}
              className="border p-4 rounded-xl shadow-sm bg-white"
            >
              <p><strong>Con:</strong> {appt.professional?.user?.name ?? 'Profesional no disponible'}</p>

              <p>
                <strong>Fecha:</strong>{' '}
                {format(new Date(appt.date), 'EEEE dd/MM/yyyy', { locale: es })}
              </p>
              <p><strong>Hora:</strong> {appt.time}</p>
              <p>
                <strong>Estado:</strong>{' '}
                <span className={
                  appt.status === 'pending' ? 'text-yellow-500' :
                  appt.status === 'confirmed' ? 'text-green-600' :
                  appt.status === 'cancelled' ? 'text-red-500' : ''
                }>
                  {appt.status === 'pending' ? 'Pendiente' :
                   appt.status === 'confirmed' ? 'Confirmado' :
                   appt.status === 'cancelled' ? 'Cancelado' :
                   appt.status}
                </span>
              </p>
              {appt.status !== 'cancelled' && (
                <button
                  onClick={() => handleCancel(appt.id)}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm"
                >
                  Cancelar turno
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

