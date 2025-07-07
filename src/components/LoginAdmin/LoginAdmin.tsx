'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        <h2 className="text-xl font-bold mb-4 text-center">Login Admin</h2>
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Verificando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}