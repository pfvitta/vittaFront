'use client';

import Link from 'next/link';
import { LogOut, User, FileText, Calendar } from 'lucide-react';
import { ReactNode } from 'react';

interface SidebarProviderProps {
  children: ReactNode;
}

export default function SidebarProvider({ children }: SidebarProviderProps) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="flex min-h-screen">
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
            <Link href="/dashboard/provider/schedule">
              <button className="btn-dashboard">
                <Calendar className="mr-3 h-4 w-4" />
                Disponibilidad
              </button>
            </Link>
            <div className="border-t border-gray-200 my-4"></div>
            <button className="btn-dashboard" onClick={handleLogout}>
              <LogOut className="mr-3 h-4 w-4" />
              Cerrar sesión
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

