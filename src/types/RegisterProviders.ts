export interface RegisterProviderValues {
    firstName: string;
    lastName: string;
    tipoDocumento: string;
    documento: string;
    ciudad: string;
    fechaNacimiento: string;
    email: string;
    password: string;
  }
  
  export interface RegisterProviderErrors {
    firstName?: string;
    lastName?: string;
    tipoDocumento?: string;
    documento?: string;
    ciudad?: string;
    fechaNacimiento?: string;
    email?: string;
    password?: string;
  }
export interface RegisterProviderValidationResult {
    errors: RegisterProviderErrors;
    isValid: boolean;
  }  