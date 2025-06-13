export interface RegisterFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  export interface RegisterFormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }
  
  export interface RegisterValidationResult {
    errors: RegisterFormErrors;
    isValid: boolean;
  }
  