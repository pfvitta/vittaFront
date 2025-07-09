'use client';

import Link from 'next/link';
import { LogOut, User, FileText } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface SidebarProviderProps {
  children: ReactNode;
}

export default function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.clear();
      window.location.href = '/login';
    }, 1000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Overlay de loading para cerrar sesión */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">Cerrando sesión...</p>
          </div>
        </div>
      )}

      <aside className="bg-gray-100 m-1 rounded-xl border-gray-200 min-h-screen w-64">
        <div className="p-4">
          <nav className="space-y-2">
            <Link href="/dashboard/provider">
              <button className="btn-dashboard">
                <User className="mr-3 h-4 w-4" />
                Mi perfil
              </button>
            </Link>
            <Link href="/dashboard/provider/appointments">
              <button className="btn-dashboard">
                <FileText className="mr-3 h-4 w-4" />
                Mis turnos
              </button>
            </Link>
            <div className="border-t border-gray-200 my-4"></div>
            <button 
              className="btn-dashboard" 
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="mr-3 h-4 w-4" />
              {isLoggingOut ? 'Cerrando...' : 'Cerrar sesión'}
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}