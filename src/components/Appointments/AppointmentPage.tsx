'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWeekend,
  isSameDay,
} from 'date-fns';
import { es } from 'date-fns/locale';
import {
  getAvailableHours,
  createAppointment,
} from '@/services/appointmentService';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

export default function AppointmentPage() {
  const params = useParams();
  const providerId = typeof params.id === 'string' ? params.id : '';
  const { user } = useAuth();
  const userId = user?.id || '';

  const today = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  }).filter((day) => !isWeekend(day) && day >= new Date(today.setHours(0, 0, 0, 0)));

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [hoursPerDate, setHoursPerDate] = useState<Record<string, string[]>>({});
  const [selectedHours, setSelectedHours] = useState<Record<string, string>>({});
  const [loadingDate, setLoadingDate] = useState<string | null>(null);

  const toggleDate = async (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const isAlreadySelected = selectedDates.some((d) => isSameDay(d, date));

    if (isAlreadySelected) {
      setSelectedDates((prev) => prev.filter((d) => !isSameDay(d, date)));
      setSelectedHours((prev) => {
        const updated = { ...prev };
        delete updated[dateStr];
        return updated;
      });
      return;
    }

    if (selectedDates.length >= 2) {
      toast('Solo puedes agendar 2 citas por mes.', {
        icon: '❗',
      });
      return;
    }

    setLoadingDate(dateStr);
    try {
      const available = await getAvailableHours({
        professionalId: providerId,
        date: dateStr,
      });
      setHoursPerDate((prev) => ({
        ...prev,
        [dateStr]: available.map((h) => h.hourHand.slice(0, 5)), // ← sin segundos desde la fuente
      }));
      setSelectedDates((prev) => [...prev, date]);
    } catch {
      toast.error('Error al obtener disponibilidad para esta fecha.');
    } finally {
      setLoadingDate(null);
    }
  };

  const handleHourSelect = (date: string, hour: string) => {
    setSelectedHours((prev) => ({ ...prev, [date]: hour }));
  };

const handleSubmit = async () => {
  if (!selectedDates || !selectedHours || !userId || !providerId) {
    toast('Faltan datos para agendar el turno.', {
        icon: '❗',
      });
    return;
  }

  try {
    const selectedDate = selectedDates[0];
    const isoDate = selectedDate.toISOString().split('T')[0]; // ← 'YYYY-MM-DD'
    const time = selectedHours[isoDate]; // ← 'HH:mm'

    if (!time) {
      toast('Falta seleccionar un horario.', {
        icon: '❗',
      });
      return;
    }

    await createAppointment({
      userId,
      professionalId: providerId,
      date: isoDate,   // ✅ string, no Date
      time: time,      // ✅ string sin segundos
      status: 'pending',
    });

    toast.success('Turno creado con éxito');
    window.location.href = '/dashboard/user/appointments';
  } catch (error) {
    console.error('Error al crear el turno:', error);
    toast.error('Error al agendar los turnos');
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-secondary text-center">Agenda tus 2 citas del mes</h1>

        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Selecciona hasta 2 fechas</h2>
          <div className="flex gap-2 overflow-x-auto">
            {days.map((day) => {
              const formatted = format(day, 'dd/MM', { locale: es });
              const isSelected = selectedDates.some((d) => isSameDay(d, day));
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => toggleDate(day)}
                  disabled={loadingDate !== null}
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

        {selectedDates.map((date) => {
          const dateStr = date.toISOString().split('T')[0];
          const hours = hoursPerDate[dateStr] || [];

          return (
            <div key={dateStr}>
              <h2 className="text-sm font-semibold text-gray-700 mb-2 mt-4">
                Horarios para {format(date, 'EEEE dd/MM/yyyy', { locale: es })}
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {hours.length === 0 && <p className="text-gray-500 text-sm">Sin horarios disponibles</p>}
                {hours.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => handleHourSelect(dateStr, hour)}
                    className={`px-3 py-2 rounded-md text-sm border ${
                      selectedHours[dateStr] === hour
                        ? 'bg-secondary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-secondary text-white py-3 rounded-full font-medium hover:bg-primary transition"
        >
          Confirmar citas
        </button>
      </div>
    </div>
  );
}


