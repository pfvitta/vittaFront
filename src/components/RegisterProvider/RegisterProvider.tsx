import Image from "next/image";

function RegisterProvider() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden">

        <div className="bg-white p-8 w-full md:w-auto md:min-w-[400px]">
          <h2 className="text-2xl font-semibold text-secondary text-center mb-1">Crear una cuenta</h2>
          <p className="text-center text-secondary text-sm mb-6">Completa el formulario para registrarte como profesional</p>
          
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
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
              <label className="block text-sm font-medium text-secondary mb-1">
                Apellido
              </label>
              <input
                type="text"
                name="lastName"
                className="input-form" 
                placeholder="Tu apellido"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Tipo Doc
                </label>
                <input
                  type="text"
                  name="tipoDocumento"
                  className="input-form" 
                  placeholder="Tipo de documento"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Documento
                </label>
                <input
                  type="number"
                  name="documento"
                  className="input-form" 
                  placeholder="Tu numero de documento"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Ciudad
              </label>
              <input
                type="text"
                name="ciudad"
                className="input-form" 
                placeholder="Tu ciudad"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="fechaNacimiento"
                className="input-form" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
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
              <label className="block text-sm font-medium text-secondary mb-1">
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
              className=" bg-primary border border-primary text-white px-4 py-2 rounded-full text-sm hover:bg-secondary hover:text-white transition"
            >
              Registrarse
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-secondary">
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="text-primary hover:text-secondary font-medium">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>

        <div className="relative w-full h-[500px] md:h-auto md:flex-1">
          <Image
            src="/foto-register1.jfif"
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

export default RegisterProvider;