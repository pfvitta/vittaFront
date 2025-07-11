'use client';

import { User as UserIcon, Mail } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ReactNode } from 'react';
import SidebarUser from '@/components/SidebardUser/SidebarUser';

export default function DashboardUser() {
  const { user, hasMembership } = useAuth();
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Upload logic si quieres
  };

  if (!user) return null;

  return (
    <SidebarUser>
      <div className="max-w-5xl bg-gray-200 rounded-xl p-9 ml-4">
        <div className="mb-8">
          <h1 className="title1">Bienvenido/a {user.name?.split(' ')[0] || 'Usuario'}!</h1>
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
                  src={user.file?.imgUrl || '/Avatar.jpg'}
                  alt="Foto de perfil"
                  width={150}
                  height={150}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <h2 className="title2">{user.name || 'Sin nombre'}</h2>
              <p className="text-gray-500 text-sm mb-4">Paciente activo</p>
              <button className="w-full bg-secondary text-white px-4 py-2 rounded-full text-sm hover:bg-primary transition">
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
              <div className="grid gap-4 md:grid-cols-2">
                <InfoItem
                  icon={<UserIcon className="h-5 w-5 text-secondary" />}
                  label="Nombre completo"
                  value={user.name}
                />
                <InfoItem
                  icon={<Mail className="h-5 w-5 text-secondary" />}
                  label="Correo electrónico"
                  value={user.email}
                />
              </div>
            </div>
          </div>

          {/* Membresía */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 text-center">
              {!hasMembership ? (
                <>
                  <h2 className="title2">Membresía</h2>
                  <h3 className="text-secondary font-semibold">Plan Premium</h3>
                  <p className="text-gray-500 text-sm mt-2 mb-4">Dos sesiones al mes</p>
                  <p className="text-gray-500 text-sm mb-4">Plan nutricional personalizado</p>
                  <p className="text-gray-500 text-sm mb-4">Seguimiento seguro de tu salud</p>
                  <button
                    className="w-full bg-secondary border text-white px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition"
                    onClick={() => router.push('/memberships')}
                  >
                    Acceder ahora
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-primary font-semibold">Membresía Activa</h2>
                  <p className="text-gray-500 text-sm mt-2 mb-1">Plan Premium</p>
                  <p className="text-gray-500 text-sm">Incluye 2 sesiones al mes</p>
                  <button
                    className="w-full bg-secondary border text-white px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition mt-4"
                    onClick={() => router.push('/providers')}
                  >
                    Conoce a nuestros profesionales
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarUser>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-base text-secondary">{value || 'No disponible'}</p>
        </div>
      </div>
    </div>
  );
}
