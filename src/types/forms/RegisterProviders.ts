export type RegisterProviderValues = {
  name: string;
  email: string;
  password: string;
  phone: string;
  dni: string;
  city: string;
  dob: string;
  role: "provider";

  // Datos profesionales
  biography: string;
  experience: string;
  licenseNumber: string;
  specialty: string[]; // solo los IDs
};


