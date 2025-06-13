import { RegisterFormValues, RegisterFormErrors } from "../types/RegisterUser";

export const validateRegister = (
  values: RegisterFormValues
): { errors: RegisterFormErrors; isValid: boolean } => {
  const errors: RegisterFormErrors = {};

  if (!values.firstName) {
    errors.firstName = "El nombre es requerido";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.firstName)) {
    errors.firstName = "El nombre solo puede contener letras";
  }

  if (!values.lastName) {
    errors.lastName = "El apellido es requerido";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(values.lastName)) {
    errors.lastName = "El apellido solo puede contener letras";
  }

  if (!values.email) {
    errors.email = "El correo es requerido";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "El formato del correo no es válido";
  }

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  } else if (values.password.length < 6) {
    errors.password = "Debe tener al menos 6 caracteres";
  }

  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
};



