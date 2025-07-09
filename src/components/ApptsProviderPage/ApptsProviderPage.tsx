'use client';
import { useEffect, useState } from 'react';
import { Appointment } from '@/types/Appointment';
import { getAppointmentsByProvider, cancelAppointment } from '@/services/appointmentService';

export default function ProviderAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const providerId = localStorage.getItem('userId');
    if (!providerId) return;

    getAppointmentsByProvider(providerId).then(setAppointments).catch(console.error);
  }, []);

  const handleCancel = async (id: string) => {
    await cancelAppointment(id);
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status: 'cancelled' } : a));
  };

  return (
    <div>
      <h1 className="title1 mb-6">Turnos agendados</h1>
      {appointments.length === 0 ? (
        <p>No tienes turnos agendados.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt.id} className="border p-4 rounded-xl shadow-sm">
              <p><strong>Paciente:</strong> {appt.user.name}</p>
              <p><strong>Fecha:</strong> {appt.date}</p>
              <p><strong>Hora:</strong> {appt.time}</p>
              <p><strong>Estado:</strong> {appt.status}</p>
              {appt.status !== 'cancelled' && (
                <button onClick={() => handleCancel(appt.id)} className="mt-2 bg-red-500 text-white px-4 py-1 rounded">
                  Cancelar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
