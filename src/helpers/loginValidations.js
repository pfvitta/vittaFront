export const validateLogin = (values) => {
      const errors = {};
  
    // Validación de email
    if (!values.email) {
      errors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'El formato del correo no es válido';
    }
  
    // Validación de contraseña
    if (!values.password) {
      errors.password = 'La contraseña es requerida';
    } else if (values.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
  
    return errors;
  };