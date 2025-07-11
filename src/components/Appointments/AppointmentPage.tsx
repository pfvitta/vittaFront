'use client';

import { useState, useEffect } from 'react';
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
import { getProviderById } from '@/services/providerService';
import { Provider } from '@/types/Provider';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


export default function AppointmentPage() {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loadingProvider, setLoadingProvider] = useState(false);
  const params = useParams();
  const providerId = typeof params.id === 'string' ? params.id : '';
  const { user } = useAuth();
  const userId = user?.id || '';

  useEffect(() => {
    const fetchProvider = async () => {
      if (!providerId) return;
      setLoadingProvider(true);
      try {
        const data = await getProviderById(providerId);
        setProvider(data);
      } catch (error) {
        console.error('Error al obtener proveedor:', error);
        toast.error('No se pudo cargar el proveedor');
      } finally {
        setLoadingProvider(false);
      }
    };

    fetchProvider();
  }, [providerId]);

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
        [dateStr]: available.map((h) => h.hourHand.slice(0, 5)),
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
    if (!selectedDates || !selectedHours || !userId || !providerId || !provider) {
      toast('Faltan datos para agendar el turno.', { icon: '❗' });
      return;
    }

    const profProfileId = provider.professionalProfile?.id;
    if (!profProfileId) {
      toast.error('El proveedor no tiene perfil profesional configurado');
      return;
    }

    const selectedDate = selectedDates[0];
    const dateOnly = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    const dateStr = dateOnly.toISOString().split('T')[0];
    const time = selectedHours[dateStr];

    if (!time) {
      toast('Falta seleccionar un horario.', { icon: '❗' });
      return;
    }

    try {
      await createAppointment({
        userId,
        professionalId: profProfileId,
        date: dateOnly,
        time,
        status: 'pending',
      });

      toast.success('Turno creado con éxito');
      window.location.href = '/dashboard/user/appointments';
    } catch (error) {
      console.error('Error al crear el turno:', error);
      toast.error('Error al agendar los turnos');
    }
  };


// Dentro de tu componente:
const router = useRouter();

return (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="max-w-4xl mx-auto p-6 font-sans space-y-8"
  >
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold text-gray-800">Agenda tu cita</h1>
      <p className="text-gray-600 text-sm">
        Selecciona la fecha y horario que mejor se adapte a ti
      </p>
    </div>

    {/* Profesional */}
    {provider && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
          <div>
            <p className="font-semibold">{provider.name}</p>
            <div className="flex gap-2 mt-1 flex-wrap">
              {provider.professionalProfile?.specialty?.map((tag) => (
  <span
    key={tag.id}
    className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full text-xs"
  >
    {tag.name.toUpperCase()}
  </span>
))}


            </div>
          </div>
        </div>
        <button
          onClick={() => router.push('/providers')}
          className="text-sm text-primary underline"
        >
          Cambiar profesional
        </button>
      </motion.div>
    )}

    {/* Fechas */}
    <div>
      <h2 className="text-sm font-semibold text-gray-700 mb-2">Selecciona fecha</h2>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {days.map((day) => {
          const formatted = format(day, 'EEE dd/MM', { locale: es });
          const isSelected = selectedDates.some((d) => isSameDay(d, day));
          return (
            <button
              key={day.toISOString()}
              onClick={() => toggleDate(day)}
              className={`min-w-[80px] text-sm px-3 py-2 rounded-lg border ${
                isSelected
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
              }`}
            >
              {formatted}
            </button>
          );
        })}
      </div>
    </div>

    {/* Horarios */}
    {selectedDates.map((date) => {
      const dateStr = date.toISOString().split('T')[0];
      const hours = hoursPerDate[dateStr] || [];

      return (
        <motion.div
          key={dateStr}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-sm font-semibold text-gray-700 mb-2 mt-4">
            Horarios para {format(date, 'EEEE dd/MM/yyyy', { locale: es })}
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {hours.length === 0 && (
              <p className="text-gray-500 text-sm">Sin horarios disponibles</p>
            )}
            {hours.map((hour) => (
              <button
                key={hour}
                onClick={() => handleHourSelect(dateStr, hour)}
                className={`px-4 py-2 rounded-lg text-sm border ${
                  selectedHours[dateStr] === hour
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {hour}
              </button>
            ))}
          </div>
        </motion.div>
      );
    })}

    {/* Resumen */}
    {selectedDates.length > 0 && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2 text-sm"
      >
        <h3 className="font-semibold text-blue-900">Resumen de tu cita</h3>
        <p>
          <strong>Profesional:</strong> {provider?.name}
        </p>
        <p>
          <strong>Fecha:</strong>{' '}
          {format(selectedDates[0], 'EEEE dd/MM/yyyy', { locale: es })}
        </p>
        <p>
          <strong>Hora:</strong>{' '}
          {selectedHours[selectedDates[0].toISOString().split('T')[0]]}
        </p>
        <p>
          <strong>Duración:</strong> 60 minutos
        </p>
      </motion.div>
    )}

    {/* Confirmar */}
    <button
      onClick={handleSubmit}
      className="w-full mt-4 bg-primary text-white py-3 rounded-full font-semibold hover:bg-secondary transition"
    >
      Confirmar citas
    </button>
  </motion.div>
);
}



