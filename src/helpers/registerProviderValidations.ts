import { RegisterProviderValues, RegisterProviderErrors } from "../types/RegisterProviders";

export const validateProviderRegister = (
  values: RegisterProviderValues
): { errors: RegisterProviderErrors; isValid: boolean } => {
  const errors: RegisterProviderErrors = {
      id: ""
  };

  if (!values.firstName.trim()) {
    errors.firstName = 'El nombre es requerido';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.firstName)) {
    errors.firstName = 'Solo letras';
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'El apellido es requerido';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.lastName)) {
    errors.lastName = 'Solo letras';
  }

  if (!values.tipoDocumento.trim()) {
    errors.tipoDocumento = 'El tipo de documento es requerido';
  }

  if (!values.documento.trim()) {
    errors.documento = 'El número de documento es requerido';
  }

  if (!values.ciudad.trim()) {
    errors.ciudad = 'La ciudad es requerida';
  }

  if (!values.fechaNacimiento) {
    errors.fechaNacimiento = 'La fecha es requerida';
  }

  if (!values.email) {
    errors.email = 'El correo es requerido';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Formato inválido';
  }

  if (!values.password) {
    errors.password = 'La contraseña es requerida';
  } else if (values.password.length < 6) {
    errors.password = 'Mínimo 6 caracteres';
  }

  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
};
