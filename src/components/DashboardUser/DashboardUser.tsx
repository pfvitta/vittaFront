"use client";

import { User as UserIcon, History, Utensils, LogOut, Mail} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState, ReactNode } from 'react';
import Link from 'next/link';
import { handleImageUpload } from "../../services/uploadImageService";
import { useUser } from '@auth0/nextjs-auth0';
import { registerUser } from '@/services/userService';
import { RegisterUserValues } from '@/types/forms/RegisterUser';
import { UserData } from '@/types/User';

export default function DashboardUser() {
  const { user: auth0User, error, isLoading } = useUser();
  const [localUser, setLocalUser] = useState<UserData | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  console.log(localUser);

  useEffect(() => {
    setHasMounted(true);
  }, []);


  // Efecto unificado para montaje y registro
  
  useEffect(() => {
  const initializeUser = async () => {
    try {
          if (auth0User && !isRegistered) {
      // Verificar si el usuario ya está registrado en tu backend
      // Si no está registrado, proceder con el registro automático

        console.log('🧠 Usuario_prueba:', auth0User);
        console.log('🔐 Roles:', auth0User?.role);

        const roles = Array.isArray(auth0User?.role) ? auth0User?.role : [auth0User?.role];
        const mainRole = roles[0] || 'user';

        const userData: RegisterUserValues = {
            name: auth0User.name || "",
            email: auth0User.email || "",
            password: "",
            confirmPassword: "",
            phone: "",
            dni: "",
            city: "",
            dob: "",
            role: mainRole, 
          
        };

        const registeredUser = await registerUser(userData);
        setLocalUser(registeredUser);
        setIsRegistered(true);
      }
    } catch (err) {
      console.error('Error inicializando usuario:', err);
    }
  };

  initializeUser();
}, [auth0User, isRegistered]);


  

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/auth/logout';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !auth0User?.sub) return;

    try {
      const imageUrl = await handleImageUpload(file, auth0User.sub);
      console.log("Imagen subida con éxito:", imageUrl);
      setLocalUser(prev => prev ? {...prev, avatarUrl: imageUrl} : null);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

    if (!hasMounted) return null;
  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Usamos auth0User para datos básicos y localUser para datos extendidos
  const displayUser =  {
    name: auth0User?.name,
    email: auth0User?.email,
    avatarUrl: auth0User?.picture,
    // otros campos por defecto
  };

  console.log("vaalidacion de nombre auth0: ", displayUser.name)
  return (
    <div className="flex p-5">
      {/* Sidebar */}
      <aside className="bg-gray-100 m-1 rounded-xl border-gray-200 min-h-screen">
        <div className="p-4">
          <nav className="space-y-2">
            <Link href="/dashboard">
              <button className="btn-dashboard">
                <UserIcon className="mr-3 h-4 w-4" />
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
            <h1 className="title1 ">Bienvenido/a {displayUser?.name || "Usuario"}!</h1>
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
                    src={displayUser?.avatarUrl || "/Avatar.jpg"}
                    alt="Foto de perfil"
                    width={150}
                    height={150}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
                <h2 className="title2">{displayUser?.name || "Sin nombre"}</h2>
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
                    onChange={handleFileChange}
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
                    
                    <InfoItem icon={<UserIcon className="h-5 w-5 text-secondary" />} label="Nombre completo" value={displayUser?.name} />
                    <InfoItem icon={<Mail className="h-5 w-5 text-secondary" />} label="Correo electrónico" value={displayUser?.email} />
                    {/* 
                    <InfoItem icon={<MapPin className="h-5 w-5 text-secondary" />} label="Ciudad" value={displayUser?.city} />
                    <InfoItem icon={<Phone className="h-5 w-5 text-secondary" />} label="Teléfono" value={displayUser?.phone} />
                    <InfoItem icon={<Calendar className="h-5 w-5 text-secondary" />} label="Fecha de nacimiento" value={displayUser?.dob} />
                    <InfoItem icon={<CreditCard className="h-5 w-5 text-secondary" />} label="DNI" value={displayUser?.dni || "No disponible"} />
                    */}
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