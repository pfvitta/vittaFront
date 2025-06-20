import { User, History, Utensils, LogOut, Mail, MapPin, Phone, Calendar, CreditCard } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

export default function Dashboard() {
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
            <button className="btn-dashboard">
              <LogOut className="mr-3 h-4 w-4" />
              Cerrar sesión
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-2 p-1 ">
        <div className="max-w-5xl bg-gray-100 rounded-xl p-9 mx-auto"> {/* Cambiado a max-w-6xl para más espacio */}
          
          <div className="mb-8">
            <h1 className="title1 ">Bienvenido/a Maria !</h1>
            <p className="text-gray-500 text-center">Gestiona tu información personal y configuración de cuenta</p>
          </div>

          <div className="grid gap-3 md:grid-cols-4"> {/* Cambiado a 4 columnas */}
            {/* Profile Card - Ocupa 1 columna */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-10 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex justify-center">
                    <Image
                      src="/FotoPerfilProvider.jpg"
                      alt="Foto de perfil"
                      className="w-24 h-24 rounded-full object-cover"
                      width={150}
                      height={150}
                    />
                  </div>
                </div>
                <h2 className="title2">María González</h2>
                <p className="text-gray-500 text-sm mb-4">Paciente activo</p>
                <button className="w-full bg-secondary border text-white px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition">
                  Editar Perfil
                </button>
              </div>
            </div>

            {/* Personal Information - Ocupa 2 columnas */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="mb-4 text-center">
                  <h2 className="title2">Información Personal</h2>
                  <p className="text-gray-500 text-sm">Detalles de tu cuenta y datos personales</p>
                </div>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-secondary" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Nombre completo</p>
                          <p className="text-base text-secondary">María Elena González</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-secondary" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Correo electrónico</p>
                          <p className="text-base text-secondary">maria.gonzalez@email.com</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-secondary" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Ciudad</p>
                          <p className="text-base text-secondary">Buenos Aires, Argentina</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-secondary" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Teléfono</p>
                          <p className="text-base text-secondary">+54 11 1234-5678</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-secondary" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Fecha de nacimiento</p>
                          <p className="text-base text-secondary">15 de marzo, 1990</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-secondary" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">DNI</p>
                          <p className="text-base text-secondary">35.123.456</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Membresía - Ocupa 1 columna */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 text-center">
                
                <h2 className="title2">Membresía</h2>
                <h3 className="text-secondary font-semibold">Plan Premium</h3>
                <p className="text-gray-500 text-sm mt-2 mb-4">Dos sesiones al mes</p>
                <p className="text-gray-500 text-sm mb-4">Plan nutricional personalizado</p>
                <p className="text-gray-500 text-sm mb-4">Seguimiento seguro de tu salud</p>
                
                <button className="w-full bg-secondary border text-white px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition">
                  Acceder ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}