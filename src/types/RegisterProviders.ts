export interface RegisterProviderValues {
    id: string;
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
    id: string;
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