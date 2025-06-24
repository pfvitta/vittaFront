export type RegisterProviderValues = {
  user: {
    
    name: string;
    email: string;
    password: string;
    phone: string;
    dni: string;
    city: string;
    dob: string;
    role: "provider"; // obligatorio
    biography: string;
    experience: string;
    licenseNumber: string;
    specialty: string[]; // lista de especialidades
  };
};
