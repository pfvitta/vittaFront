'use client';

import { useForm } from "react-hook-form";
import { loginUser } from "@/services/authService";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // Usamos isSubmitting de react-hook-form
    setError,
  } = useForm<LoginFormValues>({ mode: "onChange" });

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null); // Resetear errores previos
    
    try {
      const response = await loginUser(data);
      
      // Verificar si la respuesta es válida
      if (!response) {
        throw new Error("No se recibió respuesta del servidor");
      }

      console.log("Usuario autenticado:", response);
      router.push('/dashboard');
      
      // Aquí redirigir al usuario o manejar el estado de autenticación
      // router.push('/dashboard');
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error de autenticación:", error.message);
        setServerError(error.message || "Error al iniciar sesión");
        
        // Puedes establecer errores específicos en los campos
        if (error.message.includes("email")) {
          setError("email", { type: "server", message: error.message });
        } else if (error.message.includes("contraseña")) {
          setError("password", { type: "server", message: error.message });
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tertiary bg-opacity-80 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <Image 
            src="/logo-png-vitta.png" 
            alt="Logo Vitta" 
            width={80} 
            height={80} 
            priority
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Iniciar sesión</h2>

        {/* Mostrar error general del servidor */}
        {serverError && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Correo no válido",
                },
              })}
              className="input-form"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              className="input-form"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                  {/* Icono de spinner */}
                </svg>
                Procesando...
              </span>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="#" className="text-teal-700 hover:underline">
            Reestablecer contraseña
          </a>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          ¿Necesitas ayuda?{' '}
          <a href="mailto:support@vitta.org" className="text-teal-700 underline">
            support@vitta.org
          </a>
        </p>
        <p className="mt-2 text-center text-xs text-gray-400">
          Copyright © Vitta Inc. 2025
        </p>
      </div>
    </div>
  );
}