'use client';

import { useState } from 'react';
import Image from 'next/image';
import { validateLogin } from '../../helpers/loginValidations'; // ajusta la ruta si es necesario

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  type Errors = {
    email?: string;
    password?: string;
  };

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    setErrors(validateLogin(updatedData)); // Validación en tiempo real
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // ✅ Aquí iría la lógica para hacer login (API call, etc.)
      console.log('Login exitoso:', formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tertiary bg-opacity-80 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <Image src="/logo-png-vitta.png" alt="Logo Vitta" width={80} height={80} />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Log in</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="input-form"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-form"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button type="submit" className="w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800">
            Log In
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="#" className="text-teal-700 hover:underline">Reset password</a>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          If you need help, contact <a href="mailto:support@vitta.org" className="text-teal-700 underline">support@vitta.org</a>
        </p>
        <p className="mt-2 text-center text-xs text-gray-400">Copyright © Vitta Inc. 2025</p>
      </div>
    </div>
  );
}

  