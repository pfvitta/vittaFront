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
    membership?: {
  status: 'Active' | 'Inactive';
  startDate?: string;
  endDate?: string;
  price?: number;
  type?: string;
};
   file?: {
    id?: string;
    imgUrl?: string;
    filename?: string;
    mimetype?: string;
  };
  };