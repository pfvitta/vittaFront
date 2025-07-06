'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import SidebarProvider from '@/components/SidebarProvider/SidebarProvider';

const SchedulePage = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [hoursPerDay, setHoursPerDay] = useState<Record<string, { from: string; to: string }>>({});

  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);
  const days = eachDayOfInterval({ start, end });

  const toggleDate = (date: string) => {
    if (selectedDates.includes(date)) {
      setSelectedDates((prev) => prev.filter((d) => d !== date));
      const updated = { ...hoursPerDay };
      delete updated[date];
      setHoursPerDay(updated);
    } else {
      setSelectedDates((prev) => [...prev, date]);
    }
  };

  const handleHourChange = (date: string, field: 'from' | 'to', value: string) => {
    setHoursPerDay((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const payload = selectedDates.map((date) => ({
      date,
      from: hoursPerDay[date]?.from,
      to: hoursPerDay[date]?.to,
    }));

    const providerId = localStorage.getItem("userId");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/availabilities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          payload.map((entry) => ({
            ...entry,
            providerId,
          }))
        ),
      });

      if (!response.ok) throw new Error("Error al guardar disponibilidad");
      alert("Disponibilidad guardada correctamente");
    } catch (error) {
      console.error("Error enviando disponibilidad:", error);
      alert("Hubo un error al guardar tu disponibilidad");
    }
  };

  return (
    <SidebarProvider>
      <div className="w-full">
        <h1 className="title1 mb-6 text-center">Mis horarios</h1>

        <h2 className="text-lg font-semibold mb-2">Configurar disponibilidad</h2>
        <p className="mb-6 text-gray-600">
          Selecciona los días y horarios en los que estarás disponible este mes.
        </p>

        <div className="grid grid-cols-7 gap-2 mb-6">
          {days.map((day) => {
            const formatted = format(day, 'yyyy-MM-dd');
            const isSelected = selectedDates.includes(formatted);
            const dayLabel = format(day, 'dd/MM');
            const weekDay = format(day, 'EEE', { locale: es });

            return (
              <button
                key={formatted}
                onClick={() => toggleDate(formatted)}
                className={`rounded-md border px-2 py-1 text-sm flex flex-col items-center ${
                  isSelected ? 'bg-secondary text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span className="text-xs font-medium">{weekDay}</span>
                <span>{dayLabel}</span>
              </button>
            );
          })}
        </div>

        {selectedDates.map((date) => (
          <div key={date} className="mb-4">
            <h3 className="font-semibold text-gray-700">
              {format(new Date(date), 'EEEE dd/MM/yyyy', { locale: es })}
            </h3>
            <div className="flex gap-2 mt-2">
              <input
                type="time"
                value={hoursPerDay[date]?.from || ''}
                onChange={(e) => handleHourChange(date, 'from', e.target.value)}
                className="border rounded px-2 py-1"
              />
              <span>a</span>
              <input
                type="time"
                value={hoursPerDay[date]?.to || ''}
                onChange={(e) => handleHourChange(date, 'to', e.target.value)}
                className="border rounded px-2 py-1"
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-secondary text-white py-2 rounded-md font-semibold hover:bg-primary"
        >
          Guardar disponibilidad
        </button>
      </div>
    </SidebarProvider>
  );
};

export default SchedulePage;



