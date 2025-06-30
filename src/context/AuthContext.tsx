// src/context/AuthContext.tsx
'use client';

import { createContext, useEffect, useState, ReactNode, useContext } from 'react';

type UserData = {
    id: string;
    name: string;
    email: string;
    city: string;
    phone: string;
    dni: string;
    dob: string;
    avatarUrl?: string;
    role: string;
    professionalProfile?: {
      biography: string;
      experience: string;
      licenseNumber: string;
      specialty: string[];
      verified: boolean;
    };
    file?: {
    id?: string;
    filename?: string;
    mimetype?: string;
    imgUrl?: string;
  };
  };
  

type AuthContextType = {
  user: UserData | null;
  isAuthenticated: boolean;
  role: string;
  login: (user: UserData, token: string, role: string) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>; // ← Texto añadido
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('user');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedUser && token && storedRole) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      setRole(storedRole);
    }
  }, []);

  const login = (user: UserData, token: string, role: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    setUser(user);
    setIsAuthenticated(true);
    setRole(role);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    setRole('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, role, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

  