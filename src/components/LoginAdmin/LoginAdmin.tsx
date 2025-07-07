'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
        // Usa el mensaje de error del backend si está disponible
        throw new Error(data.message || 'Credenciales incorrectas');
      }

      // Verificación simplificada - solo comprobamos que la respuesta sea exitosa
      // Guardamos el email en localStorage (opcional)
      localStorage.setItem('adminEmail', email);
      
      // Redirigimos al dashboard
      router.push('/pepita-flores/dashboard-admin');

    } catch (err: any) {
      console.error('Error en el login:', err);
      setError(err.message || 'Credenciales incorrectas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
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
          disabled={isLoading}
          className={`w-full bg-emerald-600 text-white p-2 rounded hover:bg-emerald-800 transition ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Verificando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}