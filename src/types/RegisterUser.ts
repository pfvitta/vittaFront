export type RegisterUserValues = {
  user: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string; 
    phone: string;
    dni: string;
    city: string;
    dob: string; 
    role: 'user'; // obligatorio
  };
};
  