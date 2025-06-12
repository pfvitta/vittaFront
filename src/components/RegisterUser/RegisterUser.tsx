import Image from "next/image";

function RegisterUser() {
  return (
    <>
      <div className="min-h-screen bg-[#F7FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-md w-full mx-auto">
          <Image
                    src="/FotoHero1.jpg"
                    alt="Consulta virtual"
                    width={600}
                    height={600}
                    className="rounded-xl object-cover"
                    priority
                  />
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E2E8F0]">
            <h2 className="text-2xl font-semibold text-center text- mb-1">Crear una cuenta</h2>
            <p className="text-center text-[#718096] text-sm mb-6">Completa el formulario para registrarte</p>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#4A5568] mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 rounded-lg border" 
                    placeholder="Tu nombre"
                  />
                  </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#4A5568] mb-1">
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 rounded-lg border"
                    placeholder="Tu apellido"
                  />
                  </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#4A5568] mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  
                  className="w-full px-4 py-3 rounded-lg border"
                  placeholder="tucorreo@ejemplo.com"
                />
                
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#4A5568] mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 rounded-lg border"
                  placeholder="••••••••"
                />
                </div>
              <button type="submit" className="bg-primary border border-primary text-white px-4 py-2 rounded-full text-sm hover:bg-secondary hover:text-white transition">registrarse</button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-[#718096]">
                ¿Ya tienes una cuenta?{' '}
                <a href="/login" className="text-[#3182CE] hover:text-[#2C5282] font-medium">
                  Inicia sesión
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default RegisterUser