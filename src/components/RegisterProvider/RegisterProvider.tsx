"use client";

import { useForm } from "react-hook-form";
import { registerProvider } from "@/services/providerService";
import { RegisterProviderValues } from "@/types/RegisterProviders";
import Image from "next/image";
import { useState } from "react";

const defaultValues: RegisterProviderValues = {
  user: {
    name: "",
    email: "",
    password: "",
    phone: "",
    dni: "",
    city: "",
    dob: "",
    role: "provider",
  },
  professionalProfile: {
    biography: "",
    experience: "",
    licenseNumber: "",
    specialty: [],
  },
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
    try {
      const response = await registerProvider(data);
      alert("Registro exitoso");
      setSubmittedData(response);
      reset();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
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
                {...register("user.name", {
                  required: "El nombre es obligatorio",
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                    message: "Solo se permiten letras",
                  },
                })}
                className="input-form"                
              />
              {errors.user?.name && <p className="text-red-500 text-sm">{errors.user.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Correo electrónico</label>
              <input
                type="email"
                {...register("user.email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Correo inválido",
                  },
                })}
                className="input-form"
              />
              {errors.user?.email && <p className="text-red-500 text-sm">{errors.user.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <input
                type="password"
                {...register("user.password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
                    message: "Debe incluir una mayúscula, un número y un símbolo",
                  },
                })}
                className="input-form"
              />
              {errors.user?.password && <p className="text-red-500 text-sm">{errors.user.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input
                {...register("user.phone", {
                  required: "El teléfono es obligatorio",
                  minLength: {
                    value: 7,
                    message: "Debe tener al menos 7 dígitos",
                  },
                })} 
                className="input-form"
              />
              {errors.user?.phone && <p className="text-red-500 text-sm">{errors.user.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">DNI</label>
              <input
                {...register("user.dni", {
                  required: "El documento es obligatorio",
                  pattern: {
                    value: /^\d{5,10}$/,
                    message: "Debe tener entre 5 y 10 dígitos",
                  },
                })}
                className="input-form"
              />
              {errors.user?.dni && <p className="text-red-500 text-sm">{errors.user.dni.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ciudad</label>
              <input
                {...register("user.city", {
                  required: "La ciudad es obligatoria",
                  minLength: { value: 2, message: "Debe tener al menos 2 letras" },
                })}
                className="input-form"
              />
              {errors.user?.city && <p className="text-red-500 text-sm">{errors.user.city.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fecha de nacimiento</label>
              <input
                type="date"
                {...register("user.dob", {
                  required: "La fecha es obligatoria",
                })}
                className="input-form"
              />
              {errors.user?.dob && <p className="text-red-500 text-sm">{errors.user.dob.message}</p>}
            </div>

            {/* --- PROFILE --- */}
            <div>
              <label className="block text-sm font-medium mb-1">Biografía</label>
              <textarea
                {...register("professionalProfile.biography", {
                  required: "La biografía es obligatoria",
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                })}
                className="input-form"
              />
              {errors.professionalProfile?.biography && (
                <p className="text-red-500 text-sm">{errors.professionalProfile.biography.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Experiencia</label>
              <textarea
                {...register("professionalProfile.experience", {
                  required: "La experiencia es obligatoria",
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                })}
                className="input-form"
              />
              {errors.professionalProfile?.experience && (
                <p className="text-red-500 text-sm">{errors.professionalProfile.experience.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Matrícula profesional</label>
              <input
                {...register("professionalProfile.licenseNumber", {
                  required: "Campo obligatorio",
                  minLength: { value: 6, message: "Debe tener mínimo 6 caracteres" },
                })}
                className="input-form"
              />
              {errors.professionalProfile?.licenseNumber && (
                <p className="text-red-500 text-sm">{errors.professionalProfile.licenseNumber.message}</p>
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
          {...register("professionalProfile.specialty", {
            required: "Selecciona al menos una especialidad",
          })}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <span>{spec}</span>
      </label>
    ))}
  </div>
  {errors.professionalProfile?.specialty && (
    <p className="text-red-500 text-sm mt-1">
      {errors.professionalProfile.specialty.message}
    </p>
  )}
</div>

            {/* --- SUBMIT --- */}

            <button
              type="submit"
              disabled={!isValid}
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

