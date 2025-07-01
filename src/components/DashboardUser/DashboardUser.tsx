'use client';

import {
  User, History, Utensils, LogOut, Mail, MapPin,
  Phone, Calendar, CreditCard,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { registerUser } from '@/services/userService';
import { RegisterUserValues } from '@/types/RegisterUser';
//import { getAccessToken } from '@/app/utils/getAccessToken';

export default function DashboardUser() {
  const { user, error, isLoading } = useUser();
  const [hasMounted, setHasMounted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  /**
type UserData = {
  name: string;
  email: string;
  city?: string;
  phone?: string;
  dni?: string;
  dob?: string;
  picture?: string;
  avatarUrl?: string;
}; */

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 👉 Registrar automáticamente al usuario si aún no está registrado
  useEffect(() => {
    const autoRegister = async () => {
      try {
        if (user && !isRegistered) {

          console.log('🧠 Usuario:', user);
        console.log('🔐 Roles:', user?.role);


           const roles = user?.role || [];
        const mainRole = roles[0] || 'user';

        // const accessToken = await getAccessToken(); // 👈 obtenemos el token

          const userData: RegisterUserValues = {
            user: {
              name: user.name || "",
              email: user.email || "",
              password: "",
              confirmPassword: "",
              phone: "",
              dni: "",
              city: "",
              dob: "",
              role: mainRole,
            },
          };

          await registerUser(userData);
          setIsRegistered(true);
        }
      } catch (err) {
        console.error('Error registrando usuario:', err);
      }
    };

    autoRegister();
  }, [user, isRegistered]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/auth/logout';
  };

  if (!hasMounted) return null;
  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  //const [localUser, setLocalUser] = useState<UserData | null>(null);


/**  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:4000/auth/me', {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('No autorizado');

        const data = await res.json();
        localStorage.setItem('localUser', JSON.stringify(data));
        setLocalUser(data);
      } catch (error) {
        console.error('Error cargando la sesión:', error);
      }
    };

    fetchUser();
  }, []); */

 
  //const userData = localUser || (user as UserData | null);
  //if (!userData) return <p>No estás autenticado</p>;

  return (
    <div className="flex p-5">
      {/* Sidebar */}
      <aside className="bg-gray-100 m-1 rounded-xl border-gray-200 min-h-screen">
        <div className="p-4">
          <nav className="space-y-2">
            <Link href="/dashboard">
              <button className="btn-dashboard">
                <User className="mr-3 h-4 w-4" />
                Mi perfil
              </button>
            </Link>
            <button className="btn-dashboard">
              <History className="mr-3 h-4 w-4" />
              Historial de turnos
            </button>
            <button className="btn-dashboard">
              <Utensils className="mr-3 h-4 w-4" />
              Plan nutricional
            </button>
            <div className="border-t border-gray-200 my-4"></div>
            <button className="btn-dashboard" onClick={handleLogout}>
              <LogOut className="mr-3 h-4 w-4" />
              Cerrar sesión
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-2 p-1">
        <div className="max-w-5xl bg-gray-100 rounded-xl p-9 mx-auto">
          <div className="mb-8">
            <h1 className="title1 ">Bienvenido/a {user?.name || "Usuario"}!</h1>
            <p className="text-gray-500 text-center">
              Gestiona tu información personal y configuración de cuenta
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-10 text-center">
                <div className="flex justify-center mb-4">
                <Image
                   src={user?.avatarUrl || "/Avatar.jpg"}
                   alt="Foto de perfil"
                   width={150}
                   height={150}
                   className="w-24 h-24 rounded-full object-cover"
                />
                </div>
                <h2 className="title2">{user?.name || "Sin nombre"}</h2>
                <p className="text-gray-500 text-sm mb-4">Paciente activo</p>
                <button className="w-full bg-secondary border text-white px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition">
                  Editar Perfil
                </button>
                <label className="mt-3 inline-block cursor-pointer text-sm text-primary hover:underline">
                  Cambiar foto
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const base64 = reader.result as string;
                          setUser((prev) => {
                            const updated = { ...prev!, avatarUrl: base64 };
                            localStorage.setItem("user", JSON.stringify(updated));
                            return updated;
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Información Personal */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="mb-4 text-center">
                  <h2 className="title2">Información Personal</h2>
                  <p className="text-gray-500 text-sm">
                    Detalles de tu cuenta y datos personales
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <InfoItem icon={<User className="h-5 w-5 text-secondary" />} label="Nombre completo" value={user?.name} />
                    <InfoItem icon={<Mail className="h-5 w-5 text-secondary" />} label="Correo electrónico" value={user?.email} />
                    <InfoItem icon={<MapPin className="h-5 w-5 text-secondary" />} label="Ciudad" value={user?.city} />
                    <InfoItem icon={<Phone className="h-5 w-5 text-secondary" />} label="Teléfono" value={user?.phone} />
                    <InfoItem icon={<Calendar className="h-5 w-5 text-secondary" />} label="Fecha de nacimiento" value={user?.dob} />
                    <InfoItem icon={<CreditCard className="h-5 w-5 text-secondary" />} label="DNI" value={user?.dni} />
                  </div>
                </div>
              </div>
            </div>

            {/* Membresía */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 text-center">
                <h2 className="title2">Membresía</h2>
                <h3 className="text-secondary font-semibold">Plan Premium</h3>
                <p className="text-gray-500 text-sm mt-2 mb-4">Dos sesiones al mes</p>
                <p className="text-gray-500 text-sm mb-4">Plan nutricional personalizado</p>
                <p className="text-gray-500 text-sm mb-4">Seguimiento seguro de tu salud</p>
                <Link href="/memberships">
                    <button className="w-full bg-secondary border text-white px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition">
                  Acceder ahora
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: ReactNode; label: string; value?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-base text-secondary">{value || "No disponible"}</p>
        </div>
      </div>
    </div>
  );
}


