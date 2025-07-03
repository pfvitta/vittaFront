export type UserData = {
    id: string;
    name: string;
    email: string;
    phone: string;
    dni: string;
    city: string;
    dob: string;
    role: "user";
    avatarUrl?: string;
    membership: "active" | "inactive"; // Cambiado a 'active' o 'inactive'
  };