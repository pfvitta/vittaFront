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
    role: "profesional",
  },
  professionalProfile: {
    biography: "",
    experience: "",
    licenseNumber: "",
    specialty: [],
  },
};

export default function RegisterProviderForm() {
  const [, setSubmittedData] =
    useState<RegisterProviderValues | null>(null);

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
            {/* USER DATA */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Nombre completo
              </label>
              <input
                {...register("user.name", {
                  required: "Este campo es obligatorio",
                })}
                className="input-form"
              />
              {errors.user?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.user.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                {...register("user.email", {
                  required: "Este campo es obligatorio",
                })}
                className="input-form"
              />
              {errors.user?.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.user.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Contraseña
              </label>
              <input
                type="password"
                {...register("user.password", {
                  required: "Campo obligatorio",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                className="input-form"
              />
              {errors.user?.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.user.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input
                {...register("user.phone", { required: "Campo obligatorio" })}
                className="input-form"
              />
              {errors.user?.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.user.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Documento
              </label>
              <input
                {...register("user.dni", { required: "Campo obligatorio" })}
                className="input-form"
              />
              {errors.user?.dni && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.user.dni.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ciudad</label>
              <input
                {...register("user.city", { required: "Campo obligatorio" })}
                className="input-form"
              />
              {errors.user?.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.user.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                {...register("user.dob", { required: "Campo obligatorio" })}
                className="input-form"
              />
              {errors.user?.dob && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.user.dob.message}
                </p>
              )}
            </div>

            {/* PROFESSIONAL PROFILE */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Biografía
              </label>
              <textarea
                {...register("professionalProfile.biography", {
                  required: "Campo obligatorio",
                })}
                className="input-form"
              />
              {errors.professionalProfile?.biography && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.professionalProfile.biography.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Experiencia
              </label>
              <textarea
                {...register("professionalProfile.experience", {
                  required: "Campo obligatorio",
                })}
                className="input-form"
              />
              {errors.professionalProfile?.experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.professionalProfile.experience.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Matrícula profesional
              </label>
              <input
                {...register("professionalProfile.licenseNumber", {
                  required: "Campo obligatorio",
                })}
                className="input-form"
              />
              {errors.professionalProfile?.licenseNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.professionalProfile.licenseNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Especialidades (separadas por coma)
              </label>
              <input
                {...register("professionalProfile.specialty", {
                  required: "Campo obligatorio",
                  setValueAs: (value: string) =>
                    value.split(",").map((s) => s.trim()),
                })}
                className="input-form"
              />
              {errors.professionalProfile?.specialty && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.professionalProfile.specialty.message}
                </p>
              )}
            </div>

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
