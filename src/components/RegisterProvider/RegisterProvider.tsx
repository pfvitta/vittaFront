'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { validateProviderRegister } from '../../helpers/registerProviderValidations'; 
import { RegisterProviderValues, RegisterProviderErrors } from '../../types/RegisterProviders'; 

function RegisterProvider() {
  const [formValues, setFormValues] = useState<RegisterProviderValues>({
    firstName: '',
    lastName: '',
    tipoDocumento: '',
    documento: '',
    ciudad: '',
    fechaNacimiento: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<RegisterProviderErrors>({
    firstName: '',
    lastName: '',
    tipoDocumento: '',
    documento: '',
    ciudad: '',
    fechaNacimiento: '',
    email: '',
    password: '',
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { errors, isValid } = validateProviderRegister(formValues);
    setFormErrors(errors);
    setIsValid(isValid);
  }, [formValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/providers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) throw new Error('Error al registrar');
      alert('Registro exitoso');
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-white p-8 w-full md:w-auto md:min-w-[400px]">
          <h2 className="text-2xl font-semibold text-secondary text-center mb-1">Crear una cuenta</h2>
          <p className="text-center text-secondary text-sm mb-6">Completa el formulario para registrarte como profesional</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: 'firstName', label: 'Nombre', type: 'text' },
              { name: 'lastName', label: 'Apellido', type: 'text' },
              { name: 'tipoDocumento', label: 'Tipo Doc', type: 'text' },
              { name: 'documento', label: 'Documento', type: 'text' },
              { name: 'ciudad', label: 'Ciudad', type: 'text' },
              { name: 'fechaNacimiento', label: 'Fecha de Nacimiento', type: 'date' },
              { name: 'email', label: 'Correo electrónico', type: 'email' },
              { name: 'password', label: 'Contraseña', type: 'password' },
            ].map(({ name, label, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-secondary mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  className="input-form"
                  placeholder={type === 'date' ? undefined : `Tu ${label.toLowerCase()}`}
                  value={formValues[name as keyof RegisterProviderValues]}
                  onChange={handleChange}
                />
                {formErrors[name as keyof RegisterProviderErrors] && (
                  <p className="text-red-500 text-sm mt-1">{formErrors[name as keyof RegisterProviderErrors]}</p>
                )}
              </div>
            ))}

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
              <a href="/login" className="text-primary hover:text-secondary font-medium">
                Inicia sesión
              </a>
            </p>
          </div>
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

export default RegisterProvider;
