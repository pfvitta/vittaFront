// services/appointmentService.ts

import { Appointment } from "@/types/Appointment";

export type AvailableHour = { hourHand: string };
//const API_URL = process.env.NEXT_PUBLIC_API_URL;


export interface ValidateAppointmentPayload {
  professionalId: string;
  date: string; // formato 'YYYY-MM-DD'
}

export interface CreateAppointmentPayload {
  userId: string;
  professionalId: string;
  date: Date; // formato 'YYYY-MM-DD'
  time: string; // '08:00', '09:00', etc.
  status: string; // por ejemplo 'Pendiente' o 'Confirmado'
}

// Obtener horarios disponibles para un profesional en una fecha
export const getAvailableHours = async ({
  professionalId,
  date,
}: {
  professionalId: string;
  date: string;
}): Promise<AvailableHour[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ professionalId, date }),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Error al consultar disponibilidad');
  }

  const data: AvailableHour[] = await response.json();
  return data;
};


// Crear un nuevo turno // ajustá la ruta según corresponda

export async function createAppointment(data: CreateAppointmentPayload) {
  console.log('Payload a enviar a /appointments/create:', data);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data), // ✅ Date se serializa automáticamente como ISO 8601
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Respuesta de error del backend:', errorData);
    throw new Error(errorData?.message || 'Error al crear turno');
  }

  return await response.json();
}




export const getAppointmentsByUser = async (userId: string): Promise<Appointment[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/appointments/user/${userId}`;
  console.log('URL completa que se va a fetch:', url);

  const res = await fetch(url);

  if (res.status === 404) {
    // Si el backend devuelve 404 cuando no hay turnos, simplemente devolvemos []
    return [];
  }

  if (!res.ok) throw new Error('Error al obtener turnos del usuario');

  return res.json();
};

export const getAppointmentsByProvider = async (providerId: string): Promise<Appointment[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/appointments/provider/${providerId}`;
  try {
    const res = await fetch(url);
    if (res.status === 404) return []; // 👉 si no hay turnos o el provider no existe
    if (!res.ok) throw new Error('Error al obtener turnos del profesional');
    return res.json();
  } catch (error) {
    console.error('Error en getAppointmentsByProvider:', error);
    return []; // 👉 devuelve array vacío si hay cualquier otro error controlado
  }
};




export const cancelAppointment = async (appointmentId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/cancel/${appointmentId}`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error('Error al cancelar turno');
  return res.json();
};

export const confirmAppointment = async (appointmentId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/provider/confirm/${appointmentId}`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error('Error al confirmar turno');
  return await res.json();
};


