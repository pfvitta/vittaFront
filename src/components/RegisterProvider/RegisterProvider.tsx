"use client";

import { useForm } from "react-hook-form";
import { registerProvider } from "@/services/providerService";
import { RegisterProviderValues } from "@/types/forms/RegisterProviders";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const defaultValues: RegisterProviderValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  dni: "",
  city: "",
  dob: "",
  role: "provider",
  biography: "",
  experience: "",
  licenseNumber: "",
  specialty: [],
};

const specialties = [
  "Veganismo",
  "Diabetes",
  "Obesidad",
  "Celiaquía",
  "Hipo/hipertiroidismo",
  "Trastornos alimenticios",
];

export default function RegisterProviderForm() {
  const [, setSubmittedData] = useState<RegisterProviderValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RegisterProviderValues>({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async (data: RegisterProviderValues) => {
    setIsLoading(true);
    try {
      const response = await registerProvider(data);
      alert("Registro exitoso");
      setSubmittedData(response);
      reset();
      router.push("/dashboard/provider");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
      {/* Overlay de loading (toda la pantalla) */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">Procesando tu registro...</p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-white p-8 w-full md:w-auto md:min-w-[400px]">
          <h2 className="text-2xl font-semibold text-secondary text-center mb-1">
            Crear una cuenta
          </h2>
          <p className="text-center text-secondary text-sm mb-6">
            Completa el formulario para registrarte como profesional
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* --- USER --- */}
            <div>
              <label className="block text-sm font-medium mb-1">Nombre completo</label>
              <input
                {...register("name", {
                  required: "El nombre es obligatorio",
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                    message: "Solo se permiten letras",
                  },
                })}
                className="input-form"                
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Correo electrónico</label>
              <input
                type="email"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Correo inválido",
                  },
                })}
                className="input-form"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <input
                type="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
                    message: "Debe incluir una mayúscula, un número y un símbolo",
                  },
                })}
                className="input-form"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input
                {...register("phone", {
                  required: "El teléfono es obligatorio",
                  minLength: {
                    value: 7,
                    message: "Debe tener al menos 7 dígitos",
                  },
                })} 
                className="input-form"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">DNI</label>
              <input
                {...register("dni", {
                  required: "El documento es obligatorio",
                  pattern: {
                    value: /^\d{5,10}$/,
                    message: "Debe tener entre 5 y 10 dígitos",
                  },
                })}
                className="input-form"
              />
              {errors.dni && <p className="text-red-500 text-sm">{errors.dni.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ciudad</label>
              <input
                {...register("city", {
                  required: "La ciudad es obligatoria",
                  minLength: { value: 2, message: "Debe tener al menos 2 letras" },
                })}
                className="input-form"
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fecha de nacimiento</label>
              <input
                type="date"
                {...register("dob", {
                  required: "La fecha es obligatoria",
                })}
                className="input-form"
              />
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
            </div>

            {/* --- PROFILE --- */}
            <div>
              <label className="block text-sm font-medium mb-1">Biografía</label>
              <textarea
                {...register("biography", {
                  required: "La biografía es obligatoria",
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                })}
                className="input-form"
              />
              {errors.biography && (
                <p className="text-red-500 text-sm">{errors.biography.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Experiencia</label>
              <textarea
                {...register("experience", {
                  required: "La experiencia es obligatoria",
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                })}
                className="input-form"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">{errors.experience.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Matrícula profesional</label>
              <input
                {...register("licenseNumber", {
                  required: "Campo obligatorio",
                  minLength: { value: 6, message: "Debe tener mínimo 6 caracteres" },
                })}
                className="input-form"
              />
              {errors.licenseNumber && (
                <p className="text-red-500 text-sm">{errors.licenseNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Especialidades (selecciona al menos una)
              </label>
              <div className="grid grid-cols-1 gap-2">
                {specialties.map((spec) => (
                  <label key={spec} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={spec}
                      {...register("specialty", {
                        required: "Selecciona al menos una especialidad",
                      })}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span>{spec}</span>
                  </label>
                ))}
              </div>
              {errors.specialty && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.specialty.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`w-full px-4 py-2 rounded-full text-sm border transition ${
                isValid
                  ? "bg-primary text-white border-primary hover:bg-secondary"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Registrarse
            </button>
          </form>
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