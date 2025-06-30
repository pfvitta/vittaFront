"use client";

import { useEffect } from "react";
import {
  LogOut,
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  CreditCard,
  Briefcase,
  Award,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { handleImageUpload } from "@/services/uploadImageService";
import { Provider } from "@/types/Provider";

export default function DashboardProvider() {
  const { user, role, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const provider = role === "provider" ? (user as Provider) : null;

  useEffect(() => {
    if (!isAuthenticated || role !== "provider") {
      router.push("/login");
    }
  }, [isAuthenticated, role, router]);

  if (!provider) {
    return <div className="text-center py-10 text-gray-500">Redirigiendo...</div>;
  }

  return (
    <div className="flex p-5">
      {/* Sidebar */}
      <aside className="bg-gray-100 m-1 rounded-xl border-gray-200 min-h-screen">
        <div className="p-4">
          <nav className="space-y-2">
            <Link href="/dashboard-provider">
              <button className="btn-dashboard">
                <User className="mr-3 h-4 w-4" /> Mi perfil
              </button>
            </Link>
            <button className="btn-dashboard">
              <FileText className="mr-3 h-4 w-4" /> Mis turnos
            </button>
            <button className="btn-dashboard">
              <Briefcase className="mr-3 h-4 w-4" /> Mis pacientes
            </button>
            <div className="border-t border-gray-200 my-4"></div>
            <button className="btn-dashboard" onClick={logout}>
              <LogOut className="mr-3 h-4 w-4" /> Cerrar sesión
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-2 p-1">
        <div className="max-w-5xl bg-gray-100 rounded-xl p-9 mx-auto">
          <div className="mb-8">
            <h1 className="title1">Bienvenida/o {provider.name}!</h1>
            <p className="text-gray-500 text-center">
              Gestiona tu información profesional y configuración de cuenta
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-10 text-center">
                <div className="flex justify-center mb-4">
                  <Image
                    src={provider.avatarUrl || "/Avatar.jpg"}
                    alt="Foto de perfil"
                    width={150}
                    height={150}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
                <h2 className="title2">{provider.name}</h2>
                <p className="text-gray-500 text-sm mb-4">
                  {provider.professionalProfile?.verified
                    ? "Profesional verificado"
                    : "Profesional no verificado"}
                </p>
                <button className="w-full bg-secondary border text-white px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition">
                  Editar Perfil
                </button>
                <label className="mt-3 inline-block cursor-pointer text-sm text-primary hover:underline">
                  Cambiar foto
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      try {
                        const imageUrl = await handleImageUpload(
                          file,
                          provider.id || ""
                        );

                        const updatedProvider = {
                          ...provider,
                          avatarUrl: imageUrl,
                        };
                        localStorage.setItem(
                          "user",
                          JSON.stringify({ provider: updatedProvider })
                        );
                        localStorage.setItem("role", "provider"); // opcional pero útil para seguridad

                        // Refrescar página o actualizar estado según lo necesites
                        window.location.reload();
                      } catch (error) {
                        console.error("Error al subir la imagen:", error);
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
                  <h2 className="title2">Información Profesional</h2>
                  <p className="text-gray-500 text-sm">
                    Detalles de tu cuenta y datos profesionales
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <InfoItem
                      icon={<User className="h-5 w-5 text-secondary" />}
                      label="Nombre completo"
                      value={provider.name}
                    />
                    <InfoItem
                      icon={<Mail className="h-5 w-5 text-secondary" />}
                      label="Correo electrónico"
                      value={provider.email}
                    />
                    <InfoItem
                      icon={<MapPin className="h-5 w-5 text-secondary" />}
                      label="Ciudad"
                      value={provider.city}
                    />
                    <InfoItem
                      icon={<Phone className="h-5 w-5 text-secondary" />}
                      label="Teléfono"
                      value={provider.phone}
                    />
                    <InfoItem
                      icon={<Calendar className="h-5 w-5 text-secondary" />}
                      label="Fecha de nacimiento"
                      value={provider.dob}
                    />
                    <InfoItem
                      icon={<CreditCard className="h-5 w-5 text-secondary" />}
                      label="DNI"
                      value={provider.dni}
                    />
                    <InfoItem
                      icon={<Award className="h-5 w-5 text-secondary" />}
                      label="Experiencia"
                      value={provider.professionalProfile?.experience}
                    />
                    <InfoItem
                      icon={<FileText className="h-5 w-5 text-secondary" />}
                      label="Matrícula"
                      value={provider.professionalProfile?.licenseNumber}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Biografía */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="title2 text-center">Biografía</h2>
                <p className="text-gray-500 text-sm mt-2">
                  {provider.professionalProfile?.biography ||
                    "No hay biografía disponible"}
                </p>
              </div>
            </div>
          </div>

          {/* Sección de Turnos */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="title2 text-center mb-4">Mis Turnos</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) {
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

