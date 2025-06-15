'use client';

import { useForm } from "react-hook-form";
import { loginUser } from "@/services/authService";
import Image from "next/image";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ mode: "onChange" });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginUser(data);
      alert("Inicio de sesión exitoso");
      console.log("Usuario autenticado:", response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || "Error al iniciar sesión");
      } 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tertiary bg-opacity-80 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <Image src="/logo-png-vitta.png" alt="Logo Vitta" width={80} height={80} />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Iniciar sesión</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              className="input-form"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="#" className="text-teal-700 hover:underline">Reestablecer contraseña</a>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          ¿Necesitas ayuda? <a href="mailto:support@vitta.org" className="text-teal-700 underline">support@vitta.org</a>
        </p>
        <p className="mt-2 text-center text-xs text-gray-400">Copyright © Vitta Inc. 2025</p>
      </div>
    </div>
  );
}

  