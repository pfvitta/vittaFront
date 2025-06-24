"use client"

import { useState, useEffect } from "react"
import { LogOut, User, Mail, MapPin, Phone, Calendar, CreditCard, Award, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProfessionalProfile {
  id: string;
  biography: string;
  verified: boolean;
  verifiedBy: string | null;
  experience: string;
  licenseNumber: string;
}

interface ProviderData {
  id: string;
  name: string;
  email: string;
  phone: string;
  dni: string;
  city: string;
  dob: string;
  status: string;
  createAt: string;
  role: string;
  membership: null;
  professionalProfile: ProfessionalProfile;
  avatarUrl?: string;
  specialty?: string[];
}

export default function DashboardProvider() {
  const [provider, setProvider] = useState<ProviderData | null>(null)

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  useEffect(() => {
    try {
      const storedProvider = localStorage.getItem("user");
      if (storedProvider && storedProvider !== "undefined") {
        const parsed = JSON.parse(storedProvider);
        console.log("Profesional desde localStorage:", parsed);
        setProvider(parsed);
      }
    } catch (error) {
      console.error("Error al obtener el profesional de localStorage:", error);
      setProvider(null);
    }
  }, []);

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
              <FileText className="mr-3 h-4 w-4" />
              Mis turnos
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
        <div className="max-w-5xl bg-gray-100 border border-primary rounded-xl p-9 mx-auto">
          <div className="mb-8">
            <h1 className="title1-green">Bienvenida/o {provider?.name || "Profesional"}!</h1>
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
                    src={provider?.avatarUrl || "/Avatar.jpg"}
                    alt="Foto de perfil"
                    width={150}
                    height={150}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
                <h2 className="title2-green">{provider?.name || "Sin nombre"}</h2>
                <p className="text-gray-500 text-sm mb-4">
                  {provider?.professionalProfile?.verified 
                    ? "Profesional verificado" 
                    : "Profesional no verificado"}
                </p>
                <button className="w-full bg-primary border text-white px-4 py-2 rounded-full text-sm hover:bg-secondary hover:text-white transition">
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
                          setProvider((prev) => {
                            if (!prev) return prev;
                            const updated = { ...prev, avatarUrl: base64 };
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
                  <h2 className="title2-green">Perfil Profesional</h2>
                  <p className="text-gray-500 text-sm">
                    Detalles de tu cuenta y datos profesionales
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <InfoItem icon={<User className="h-5 w-5 text-primary" />} label="Nombre completo" value={provider?.name} />
                    <InfoItem icon={<Mail className="h-5 w-5 text-primary" />} label="Correo electrónico" value={provider?.email} />
                    <InfoItem icon={<MapPin className="h-5 w-5 text-primary" />} label="Ciudad" value={provider?.city} />
                    <InfoItem icon={<Phone className="h-5 w-5 text-primary" />} label="Teléfono" value={provider?.phone} />
                    <InfoItem icon={<Calendar className="h-5 w-5 text-primary" />} label="Fecha de nacimiento" value={provider?.dob} />
                    <InfoItem icon={<CreditCard className="h-5 w-5 text-primary" />} label="DNI" value={provider?.dni} />
                    <InfoItem icon={<Award className="h-5 w-5 text-primary" />} label="Experiencia" value={provider?.professionalProfile?.experience} />
                    <InfoItem icon={<FileText className="h-5 w-5 text-primary" />} label="Matrícula" value={provider?.professionalProfile?.licenseNumber} />
                  </div>
                </div>
              </div>
            </div>

            {/* Biografía */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="font-medium text-primary text-center mb-3">Biografía</h2>
                <p className="text-gray-500 text-sm mt-2">
                  {provider?.professionalProfile?.biography || "No hay biografía disponible"}
                </p>
                
                {/* Especialidades */}
                <div className="mt-6">
                  <h3 className="font-medium text-primary text-center mb-3">Especialidades</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {provider?.specialty?.length ? (
                      provider.specialty.map((especialidad, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={true}
                            readOnly
                            className="h-4 w-4 text-secondary rounded border-gray-300 focus:ring-secondary"
                          />
                          <label className="ml-2 text-gray-700">{especialidad}</label>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No se han seleccionado especialidades</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Turnos (comentada) */}
          {/* <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="title2 text-center mb-4">Mis Turnos</h2>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="text-gray-600 font-normal">Nombre</TableHead>
                    <TableHead className="text-gray-600 font-normal">Próximo Turno</TableHead>
                    <TableHead className="text-gray-600 font-normal">Horario</TableHead>
                    <TableHead className="text-gray-600 font-normal">Contacto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-200">
                    <TableCell className="text-gray-800">Pepita flores</TableCell>
                    <TableCell className="text-gray-800">26/06/2025</TableCell>
                    <TableCell className="text-gray-800">11:00hs</TableCell>
                    <TableCell className="text-gray-800">3404536131</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  )
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
  )
}