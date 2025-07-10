// types/Appointment.ts
export interface Appointment {
  id: string;
  user: {
    name: string;
    email: string;
  };
  professional: {
    name: string;
    email: string;
  };
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export type CreateAppointmentPayload = {
  userId: string;
  professionalId: string;
  date: Date; // en formato 'YYYY-MM-DD'
  time: string; // en formato 'HH:mm'
  status: 'pending' | 'confirmed' | 'cancelled'; // si definiste estos posibles estados
};