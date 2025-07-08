'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // Nuevo estado para controlar el login exitoso
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:4000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log('Respuesta del login:', data);

      if (!res.ok) {
        throw new Error(data.message || 'Credenciales incorrectas');
      }

      // Guardamos el email en localStorage
      localStorage.setItem('adminEmail', email);
      
      // Marcamos el login como exitoso
      setLoginSuccess(true);
      
      // Esperamos 1 segundo para mostrar el loading antes de redirigir
      setTimeout(() => {
        router.push('/pepita-flores/dashboard-admin');
      }, 1000);

    } catch (err: any) {
      console.error('Error en el login:', err);
      setError(err.message || 'Credenciales incorrectas');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Overlay de loading para login exitoso */}
      {loginSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">Iniciando sesion...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80 relative z-0">
        <div className="flex justify-center">
          <Image src="/logo-png-vitta.png" alt="Logo Vitta" width={80} height={80} priority />
        </div>
        <h2 className="title2 text-center">Login Admin</h2>
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="input-form mb-4 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="input-form mb-4 p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isLoading || loginSuccess} // Deshabilitar también durante el redirect
          className={`w-full bg-emerald-600 text-white p-2 rounded hover:bg-emerald-800 transition ${
            isLoading || loginSuccess ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Verificando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}