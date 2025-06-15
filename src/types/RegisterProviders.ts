export type RegisterProviderValues = {
  user: {
    name: string;
    email: string;
    password: string;
    phone: string;
    dni: string;
    city: string;
    dob: string; // formato 'YYYY-MM-DD'
    role: 'profesional'; // obligatorio
  };
  professionalProfile: {
    biography: string;
    experience: string;
    licenseNumber: string;
    specialty: string[]; // lista de especialidades
  };
};