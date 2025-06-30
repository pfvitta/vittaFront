'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { User } from '@/types/User';
import { Provider } from '@/types/Provider';
import { fetchUserProfile } from '@/services/userService';
import { useRouter, useSearchParams } from 'next/navigation';

type AuthUser = User | Provider;

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  role: 'user' | 'provider' | null;
  login: (user: AuthUser, role: 'user' | 'provider') => void;
  logout: () => void;
  setUser: (user: AuthUser) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<'user' | 'provider' | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchUserProfile();
        if (!user) {
          setUser(null);
          setIsAuthenticated(false);
          setRole(null);
          return;
        }
        const detectedRole = user?.role?.toLowerCase() ?? 'user';
        login(user, detectedRole);
  
        // ... resto igual
      } catch {
        setUser(null);
        setIsAuthenticated(false);
        setRole(null);
      }
    };
    loadUser();
  }, [searchParams, router]);

  const login = (user: AuthUser, role: 'user' | 'provider') => {
    setUser(user);
    setIsAuthenticated(true);
    setRole(role);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('returnTo');
    window.location.href = 'http://localhost:4000/auth/logout';
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, role, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthProvider;



  