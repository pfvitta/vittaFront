'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Appointment } from '@/types/Appointment';
import { getAppointmentsByProvider, cancelAppointment } from '@/services/appointmentService';
import SidebarProvider from '../SidebarProvider/SidebarProvider';
import { confirmAppointment } from '@/services/appointmentService'; // 🆕 Asegúrate de tener este servicio
import { toast } from 'react-hot-toast'; // 🆕 Para notificar si quieres

export default function ProviderAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const professionalId = typeof window !== 'undefined' ? localStorage.getItem('professionalId') : null;

  useEffect(() => {
    if (!professionalId) return;

    const fetchAppointments = async () => {
      try {
        const appts = await getAppointmentsByProvider(professionalId);
        setAppointments(appts);
      } catch (err) {
        console.error('❌ Error al traer turnos del profesional:', err);
        setError('No se pudieron cargar los turnos.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [professionalId]);

  const handleCancel = async (id: string) => {
    try {
      await cancelAppointment(id);
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: 'cancelled' } : appt))
      );
    } catch {
      alert('No se pudo cancelar el turno');
    }
  };

  // ✅ Nuevo handler para confirmar turno
  const handleConfirm = async (id: string) => {
    try {
      await confirmAppointment(id);
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: 'confirmed' } : appt))
      );
      toast.success('Turno confirmado');
    } catch {
      toast.error('No se pudo confirmar el turno');
    }
  };

  return (
    <SidebarProvider>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Mis turnos</h1>
        {loading ? (
          <p>Cargando turnos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-600">No tienes turnos agendados.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appt) => (
              <li
                key={appt.id}
                className="border border-gray-200 bg-white rounded-xl shadow-sm p-5 flex flex-col gap-2"
              >
                <p className="text-gray-700">
                  <strong className="text-secondary">Paciente:</strong>{' '}
                  {appt.user?.name ?? 'Usuario no disponible'}
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

                {/* ✅ Botón cancelar */}
                {appt.status !== 'cancelled' && (
                  <button
                    onClick={() => handleCancel(appt.id)}
                    className="self-start mt-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-full transition"
                  >
                    Cancelar turno
                  </button>
                )}

                {/* ✅ Botón confirmar (solo si está pendiente) */}
                {appt.status === 'pending' && (
                  <button
                    onClick={() => handleConfirm(appt.id)}
                    className="self-start mt-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-full transition"
                  >
                    Confirmar turno
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </SidebarProvider>
  );
}





