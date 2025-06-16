export type RegisterUserValues = {
  user: {
    name: string;
    email: string;
    password: string;
    phone: string;
    dni: string;
    city: string;
    dob: string; 
    role: 'user'; // obligatorio
  };
  professionalProfile: {
    biography: "";
    experience: "";
    licenseNumber: "";
    specialty: ""[]; 
  };
};
  