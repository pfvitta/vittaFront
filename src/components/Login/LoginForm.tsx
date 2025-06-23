'use client';

import { useForm } from 'react-hook-form';
import { loginUser } from '@/services/authService';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserById } from '@/services/userService';
import { jwtDecode } from "jwt-decode";


type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ mode: 'onChange' });

  const [serverError, setServerError] = useState<string | null>(null);
 

  type TokenPayload = {
    sub: string; // suele ser el userId
    role?: string;
  };
  
  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
  
    try {
      const response = await loginUser(data); // espera { token }
  
      const { token } = response;
  
      if (!token) {
        throw new Error("Falta token en la respuesta del login");
      }
  
      // 🔓 Decodificar el token
      const decoded: TokenPayload = jwtDecode(token);
  
      const userId = decoded.sub;
      const role = decoded.role;
  
      if (!userId) {
        throw new Error("El token no contiene userId");
      }
  
      // 🧠 Guardar el token y tipo de usuario
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role || "user");
  
      // 🔄 Obtener datos del usuario
      const user = await getUserById(userId, token);
      localStorage.setItem("user", JSON.stringify(user));
  
      // ✅ Redirigir al dashboard
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login error:", error.message);
        setServerError(error.message || "Error al iniciar sesión");
      } else {
        console.error("Unexpected error:", error);
        setServerError("Error inesperado al iniciar sesión");
      }
    }
  };
  
  
  
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-tertiary bg-opacity-80 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <Image src="/logo-png-vitta.png" alt="Logo Vitta" width={80} height={80} priority />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Iniciar sesión</h2>

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
              {...register('email', {
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Correo no válido',
                },
              })}
              className="input-form"
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              {...register('password', {
                required: 'La contraseña es obligatoria',
              })}
              className="input-form"
              disabled={isSubmitting}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
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
                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
                Procesando...
              </span>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        <div>
          <p className="mt-4 text-sm text-gray-600 text-center">
            ¿No tienes una cuenta?{' '}
            <a href="register/user" className="text-teal-700 hover:underline">
              Regístrate aquí
            </a>
          </p>
        </div>

        <div className="mt-4 text-center">
          <a href="#" className="text-pink-800 hover:underline">
            Reestablecer contraseña
          </a>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          ¿Necesitas ayuda?{' '}
          <a href="mailto:support@vitta.org" className="text-teal-700 underline">
            support@vitta.org
          </a>
        </p>
        <p className="mt-2 text-center text-xs text-gray-400">Copyright © Vitta Inc. 2025</p>
      </div>
    </div>
  );
}


// Removed unused setError function as it is not implemented or used.

