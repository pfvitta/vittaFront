// services/appointmentService.ts

export type AvailableHour = { hourHand: string };

export interface ValidateAppointmentPayload {
  professionalId: string;
  date: string; // formato 'YYYY-MM-DD'
}

export interface CreateAppointmentPayload {
  userId: string;
  professionalId: string;
  date: string; // formato 'YYYY-MM-DD'
  time: string; // '08:00', '09:00', etc.
  status: string; // por ejemplo 'Pendiente' o 'Confirmado'
}

// Obtener horarios disponibles para un profesional en una fecha
export const getAvailableHours = async (
  payload: ValidateAppointmentPayload
): Promise<string[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Error al consultar disponibilidad');
  }

  const data: AvailableHour[] = await response.json();
  return data.map((h) => h.hourHand);
};

// Crear un nuevo turno
export const createAppointment = async (
  payload: CreateAppointmentPayload
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Error al crear turno');
  }

  return await response.json();
};
