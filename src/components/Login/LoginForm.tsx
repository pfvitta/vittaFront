'use client';

import { useForm } from 'react-hook-form';
import { loginUser } from '@/services/authService';
import { getUserById } from '@/services/userService';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../context/AuthContext';

type LoginFormValues = {
  email: string;
  password: string;
};

type TokenPayload = {
  sub: string;
  role?: string;
};

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({ mode: 'onChange' });
  const [serverError, setServerError] = useState<string | null>(null);
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    try {
      const response = await loginUser(data);
      const { token } = response;
      if (!token) throw new Error("Falta token en la respuesta del login");

      localStorage.setItem('token', token);

      const decoded = jwtDecode<TokenPayload>(token);
      const userId = decoded.sub;
      const role = (decoded.role || 'user').toLowerCase() as 'user' | 'provider';
      if (!userId) throw new Error("El token no contiene userId");

      const user = await getUserById(userId);
      login(user, role);

      router.push(role === 'provider' ? '/dashboard/provider' : '/dashboard/user');
    } catch (error) {
      const err = error as Error;
      console.error("Login error:", err.message);
      setServerError(err.message || "Error al iniciar sesión");
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
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
                Procesando...
              </span>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
        <button
  onClick={() => {
    const currentPath = window.location.pathname + window.location.search;
    localStorage.setItem('returnTo', currentPath);
    const googleLoginUrl = `http://localhost:4000/auth/login?callbackUrl=${encodeURIComponent(currentPath)}`;
    window.location.href = googleLoginUrl;
  }}
  className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
>
  <Image src="/google-logo.svg" alt="Google logo" width={20} height={20} />
  <span className="text-sm text-gray-700 font-medium">Continuar con Google</span>
</button>
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








