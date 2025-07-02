'use client';

import { useState } from 'react';

export default function AppointmentPage() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const days = ['Lun 14', 'Mar 15', 'Mié 16', 'Jue 17', 'Vie 18'];
  const hours = ['08:00 hrs.', '09:00 hrs.', '10:00 hrs.', '11:00 hrs.', '13:00 hrs.', '14:00 hrs.', '15:00 hrs.', '16:00 hrs.', '17:00 hrs.'];

  const handleSubmit = () => {
    if (!selectedDay || !selectedHour) return alert('Seleccioná día y hora.');
    // Acá iría la lógica para enviar al backend
    alert(`Turno agendado: ${selectedDay} a las ${selectedHour}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-secondary text-center">
          Agendá tu cita con un nutricionista
        </h1>

        <p className="text-gray-600 text-center">
          Seleccioná un día y horario disponible. Las citas son por videollamada.
        </p>

        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Día disponible - Mes de Julio</h2>
          <div className="flex gap-2 overflow-x-auto">
            {days.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-full border ${
                  selectedDay === day
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Horario</h2>
          <div className="grid grid-cols-3 gap-2">
            {hours.map((hour, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedHour(hour)}
                className={`px-3 py-2 rounded-md text-sm border ${
                  selectedHour === hour
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p>📹 Las citas son por videollamada.</p>
          <p>⏰ La tolerancia es de 10 minutos.</p>
          <p>🎤 Asegurate de tener micrófono y cámara.</p>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-secondary text-white py-3 rounded-full font-medium hover:bg-primary transition"
        >
          Confirmar cita
        </button>
      </div>
    </div>
  );
}