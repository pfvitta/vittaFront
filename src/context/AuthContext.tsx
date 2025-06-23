// src/context/AuthContext.tsx
'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';

type UserData = {
  name: string;
  email: string;
  city: string;
  phone: string;
  dni: string;
  dob: string;
  avatarUrl?: string;
};

type AuthContextType = {
    user: UserData | null;
    isAuthenticated: boolean;
    role: string;
    login: (user: UserData, token: string, role: string) => void;
    logout: () => void;
  };
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('user'); // 👈 nuevo estado
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      const storedRole = localStorage.getItem('role');
  
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        if (storedRole) setRole(storedRole); // 👈 restauramos el role
      }
    }, []);
  
    const login = (user: UserData, token: string, role: string) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('role', role); // 👈 guardamos el role
  
      setUser(user);
      setIsAuthenticated(true);
      setRole(role);
    };
  
    const logout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role'); // 👈 limpiamos el role
      setUser(null);
      setIsAuthenticated(false);
      setRole('user');
    };
  
    return (
      <AuthContext.Provider value={{ user, isAuthenticated, role, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

  import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
  