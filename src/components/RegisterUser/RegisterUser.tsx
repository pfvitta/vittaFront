'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { validateRegister } from '../../helpers/registerUserValidations';
import { RegisterFormValues, RegisterFormErrors } from '../../types/RegisterUser';

function RegisterUser() {
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { errors, isValid } = validateRegister(formValues);
    setFormErrors(errors);
    setIsValid(isValid);
  }, [formValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const res = await fetch('localhost:3001/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) throw new Error('Error al registrar');
      await res.json();
      alert('Registro exitoso');
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-xl rounded-lg overflow-hidden">
        <div className="bg-white p-8 md:rounded-l-lg rounded-t-lg md:rounded-tr-none shadow-sm w-full md:w-auto">
          <h2 className="text-2xl font-semibold text-center text-secondary mb-4">Crear una cuenta</h2>
          <p className="text-center text-secondary text-sm mb-8">Completa el formulario para registrarte como usuario</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Nombre</label>
              <input
                type="text"
                name="firstName"
                className="input-form"
                placeholder="Tu nombre"
                value={formValues.firstName}
                onChange={handleChange}
              />
              {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Apellido</label>
              <input
                type="text"
                name="lastName"
                className="input-form"
                placeholder="Tu apellido"
                value={formValues.lastName}
                onChange={handleChange}
              />
              {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Correo electrónico</label>
              <input
                type="email"
                name="email"
                className="input-form"
                placeholder="tucorreo@ejemplo.com"
                value={formValues.email}
                onChange={handleChange}
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Contraseña</label>
              <input
                type="password"
                name="password"
                className="input-form"
                placeholder="••••••••"
                value={formValues.password}
                onChange={handleChange}
              />
              {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full px-4 py-2 rounded-full text-sm border transition ${
                isValid
                  ? 'bg-primary text-white border-primary hover:bg-secondary'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Registrarse
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-secondary">
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="text-primary hover:text-secondary font-medium transition">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>

        <div className="relative w-full h-[500px] md:h-auto md:flex-1">
          <Image
            src="/foto-register2.jfif"
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

export default RegisterUser;


