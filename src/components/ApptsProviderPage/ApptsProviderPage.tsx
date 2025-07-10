'use client';
import { useEffect, useState } from 'react';
import { Appointment } from '@/types/Appointment';
import { getAppointmentsByUser, cancelAppointment } from '@/services/appointmentService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function UserAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    getAppointmentsByUser(userId)
      .then(setAppointments)
      .catch(console.error);
  }, []);

  const handleCancel = async (id: string) => {
    try {
      await cancelAppointment(id);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
      );
    } catch (error) {
      console.error('Error al cancelar turno:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-secondary mb-6 text-center">Mis turnos</h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No tienes turnos agendados.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li
              key={appt.id}
              className="border border-gray-200 bg-white rounded-xl shadow-sm p-5 flex flex-col gap-2"
            >
              <p className="text-gray-700">
                <strong className="text-secondary">Profesional:</strong> {appt.professional.user.name}
              </p>
              <p className="text-gray-700">
                <strong className="text-secondary">Fecha:</strong>{' '}
                {format(new Date(appt.date), "EEEE dd 'de' MMMM yyyy", { locale: es })}
              </p>
              <p className="text-gray-700">
                <strong className="text-secondary">Hora:</strong> {appt.time}
              </p>
              <p className="text-gray-700">
                <strong className="text-secondary">Estado:</strong>{' '}
                <span
                  className={`font-semibold ${
                    appt.status === 'cancelled'
                      ? 'text-red-500'
                      : appt.status === 'confirmed'
                      ? 'text-green-600'
                      : 'text-yellow-500'
                  }`}
                >
                  {appt.status === 'pending'
                    ? 'Pendiente'
                    : appt.status === 'confirmed'
                    ? 'Confirmado'
                    : appt.status === 'completed'
                    ? 'Completado'
                    : 'Cancelado'}
                </span>
              </p>

              {appt.status !== 'cancelled' && (
                <button
                  onClick={() => handleCancel(appt.id)}
                  className="self-start mt-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-full transition"
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

