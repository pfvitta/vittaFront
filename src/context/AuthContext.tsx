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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/session');
        console.log('[SESSION] Status:', res.status);

        if (res.ok) {
          const data = await res.json();
          console.log('[SESSION] Data:', data);

          if (data?.user?.email) {
            // Paso 1: verificar si existe el usuario en backend
            const existsRes = await fetch(
              `${process.env.API_URL_BACK}/users/exists/${data.user.email}`
            );

            if (existsRes.status === 404) {
              console.log('[SYNC] Usuario no existe. Creando...');
              await fetch(`${process.env.API_URL_BACK}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name: data.user.name || 'Usuario',
                  email: data.user.email,
                  password: 'auth0',
                  phone: '0000000000',
                  dni: '00000000',
                  city: 'Sin definir',
                  dob: '2000-01-01',
                  role: data.role || 'user',
                }),
              });
              console.log('[SYNC] Usuario creado');
            }

            // Paso 2: obtener usuario completo (con membresía)
            const userRes = await fetch(
              `${process.env.API_URL_BACK}/users/by-email/${data.user.email}`
            );

            if (!userRes.ok) {
              throw new Error('No se pudo obtener el usuario completo');
            }

            const fullUser = await userRes.json();
            console.log('[AUTH] Usuario:', fullUser);
            console.log('[AUTH] Membership:', fullUser.membership);

            setUser(fullUser);
            setRole(data.role);
            setIsAuthenticated(true);
            return;
          }
        }

        // fallback al localStorage
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


  