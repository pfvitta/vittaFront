'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWeekend,
} from 'date-fns';
import { es } from 'date-fns/locale';
import {
  getAvailableHours,
  createAppointment,
} from '@/services/appointmentService';

export default function AppointmentPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [loadingHours, setLoadingHours] = useState(false);
  const searchParams = useSearchParams();

  const providerId = searchParams.get('providerId');
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  const today = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  }).filter((day) => !isWeekend(day));

  useEffect(() => {
    if (!selectedDate || !providerId) return;

    const fetchAvailable = async () => {
      setLoadingHours(true);
      try {
        const isoDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
        const hours = await getAvailableHours({
          professionalId: providerId,
          date: isoDate,
        });
        setAvailableHours(hours);
      } catch (error) {
        console.error('Error al obtener horarios disponibles', error);
        setAvailableHours([]);
      } finally {
        setLoadingHours(false);
      }
    };

    fetchAvailable();
  }, [selectedDate, providerId]);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedHour || !userId || !providerId) {
      alert('Faltan datos para agendar el turno.');
      return;
    }

    try {
      const isoDate = selectedDate.toISOString().split('T')[0];
      await createAppointment({
        userId,
        professionalId: providerId,
        date: isoDate,
        time: selectedHour,
        status: 'pendiente',
      });

      alert('Turno creado con éxito');
      // Aquí podrías redirigir al dashboard o mostrar una confirmación
    } catch (error) {
      console.error('Error al crear el turno:', error);
      alert('Error al agendar el turno');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-secondary text-center">
          Agendá tu cita con un nutricionista
        </h1>

        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Seleccioná un día (mes actual)
          </h2>
          <div className="flex gap-2 overflow-x-auto">
            {days.map((day) => {
              const formatted = format(day, 'dd/MM', { locale: es });
              const isSelected =
                selectedDate?.toDateString() === day.toDateString();

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => {
                    setSelectedDate(day);
                    setSelectedHour(null);
                  }}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    isSelected
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {formatted}
                </button>
              );
            })}
          </div>
        </div>

        {loadingHours ? (
          <p className="text-center text-gray-500">Cargando horarios...</p>
        ) : (
          selectedDate && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Horarios disponibles
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {availableHours.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => setSelectedHour(hour)}
                    className={`px-3 py-2 rounded-md text-sm border ${
                      selectedHour === hour
                        ? 'bg-secondary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>
          )
        )}

        <button
          onClick={handleSubmit}
          disabled={!selectedHour}
          className="w-full mt-4 bg-secondary text-white py-3 rounded-full font-medium hover:bg-primary transition disabled:opacity-50"
        >
          Confirmar cita
        </button>
      </div>
    </div>
  );
}
