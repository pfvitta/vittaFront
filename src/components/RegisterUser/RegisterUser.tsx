import Image from "next/image";

function RegisterUser() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-xl rounded-lg overflow-hidden">
      
        <div className="bg-white p-8 md:rounded-l-lg rounded-t-lg md:rounded-tr-none shadow-sm w-full md:w-auto">
          <h2 className="text-2xl font-semibold text-center text-secondary mb-4">Crear una cuenta</h2>
          <p className="text-center text-seconary text-sm mb-8">Completa el formulario para registrarte como usuario</p>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Nombre
              </label>
              <input
                type="text"
                name="firstName"
                className="input-form"
                placeholder="Tu nombre"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Apellido
              </label>
              <input
                type="text"
                name="lastName"
                className="input-form"
                placeholder="Tu apellido"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                className="input-form"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                className="input-form"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit" 
              className="bg-primary border border-primary text-white px-4 py-2 rounded-full text-sm hover:bg-secondary hover:text-white transition"
            >
              Registrarse
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-secondary">
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="text-primary hover:text-secondary font-medium transition">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>

        <div className="relative w-full h-[500px] md:h-auto md:flex-1">
          <Image
            src="/foto-register2.jfif"
            alt="Consulta virtual"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;