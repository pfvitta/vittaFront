'use client';

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';

type UserData = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  city?: string;
  phone?: string;
  dni?: string;
  dob?: string;
  avatarUrl?: string;
  role: string;
  membership?: 'active' | 'inactive';
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
  role: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  login: (user: UserData, token: string, role: string) => void;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar tanto la sesión de Auth0 como el localStorage
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Primero verificar la sesión de Auth0
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

        // 2. Si no hay sesión de Auth0, verificar localStorage (autenticación local)
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        
        console.log(isAuthenticated, "se esta autenticando");
        console.log(storedUser, token, storedRole, "storedUser, token, storedRole");
        
        if (storedUser && token && storedRole) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          setRole(storedRole);
          console.log(isAuthenticated, "se esta autenticando bien");
        }
      } catch (err) {
        console.error('[AUTH] Error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated]);

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
    // Limpiar tanto Auth0 como localStorage
    localStorage.clear();
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    
    // Redirigir al logout de Auth0
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  return context;
};

  