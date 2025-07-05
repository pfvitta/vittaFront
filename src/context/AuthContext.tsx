'use client';

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';
import { UserData } from '../types/User';
import { Provider } from '../types/Provider';

type AuthContextType = {
  user: UserData | Provider | null;
  role: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  login: (user: UserData, token: string, role: string) => void;
  setUser: React.Dispatch<React.SetStateAction<UserData | Provider | null>>;
  hasMembership: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | Provider | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMembership, setHasMembership] = useState<boolean>(false);

  // Verifica sesión de Auth0 o localStorage
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/session');
        console.log('[SESSION] Status:', res.status);

        if (res.ok) {
          const data = await res.json();
          console.log('[SESSION] Data:', data);

          if (data?.user) {
            setUser(data.user);
            setRole(data.role);
            setIsAuthenticated(true);
            setLoading(false);
            return;
          }
        }

        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');

        if (storedUser && token && storedRole) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          setRole(storedRole);
        }
      } catch (err) {
        console.error('[AUTH] Error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Detecta membresía activa
  useEffect(() => {
    if (role === 'user' && (user as UserData)?.membership?.status === 'Active') {
      setHasMembership(true);
    } else {
      setHasMembership(false);
    }
  }, [user, role]);

  const login = (user: UserData, token: string, role: string) => {
    console.log('Guardando en localStorage:', { token });
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
    setRole(null);
    setIsAuthenticated(false);
    window.location.href = '/auth/logout';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        loading,
        logout,
        login,
        setUser,
        hasMembership,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  }
  return context;
};

  