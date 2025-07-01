"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { registerUser } from "@/services/userService";
import { RegisterUserValues } from "@/types/forms/RegisterUser";
import { useRouter } from "next/navigation";

type FormInputs = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string; 
  phone: string;
  dni: string;
  city: string;
  dob: string;
};

export default function RegisterUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      dni: "",
      city: "",
      dob: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FormInputs) => {
    const payload: RegisterUserValues = {
      user: {
        name: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: "",
        phone: data.phone,
        dni: data.dni,
        city: data.city,
        dob: data.dob,
        role: "user",
      },
    };

    try {
      const response = await registerUser(payload);
      localStorage.setItem("user", JSON.stringify(response.user));
      alert("Registro exitoso");
      reset();
      router.push("/login"); 
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        alert("Error: " + err.message);
      }
    }
  };

  return (

    
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-xl rounded-lg overflow-hidden">
        <div className="bg-white p-8 md:rounded-l-lg rounded-t-lg md:rounded-tr-none shadow-sm w-full md:w-auto">
        <div className="mt-2 mb-2 text-right">
            <p className="text-sm text-secondary">
              ¿Ya tienes una cuenta?{" "}
              <a href="/login" className="text-primary hover:text-secondary font-medium transition">
                Inicia sesión
              </a>
            </p>
          </div>
          <h2 className="text-2xl font-semibold text-center text-secondary mb-4">Crear una cuenta</h2>
          <p className="text-center text-secondary text-sm mb-8">
            Completa el formulario para registrarte como usuario
          </p>


          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre completo */}
            <div>
              <label className="block text-sm font-medium mb-2">Nombre completo</label>
              <input
                type="text"
                {...register("fullName", {
                  required: "El nombre es obligatorio",
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                    message: "Solo letras",
                  },
                })}
                className="input-form"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Correo electrónico</label>
              <input
                type="email"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Correo inválido",
                  },
                })}
                className="input-form"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña</label>
              <input
                type="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
                    message: "Debe tener mayúscula, número y símbolo",
                  },
                })}
                className="input-form"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Validación de contraseña */}
<div>
  <label className="block text-sm font-medium mb-2">Confirmar contraseña</label>
  <input
    type="password"
    {...register("confirmPassword", {
      required: "La confirmación es obligatoria",
      validate: (value, formValues) =>
        value === formValues.password || "Las contraseñas no coinciden",
      minLength: { value: 6, message: "Mínimo 6 caracteres" },
      pattern: {
        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
        message: "Debe tener mayúscula, número y símbolo",
      },
    })}
    className="input-form"
  />
  {errors.confirmPassword && (
    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
  )}
</div>


            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium mb-2">Teléfono</label>
              <input
                type="text"
                {...register("phone", {
                  required: "El teléfono es obligatorio",
                  minLength: {
                    value: 7,
                    message: "Debe tener al menos 7 caracteres",
                  },
                })}
                className="input-form"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* DNI */}
            <div>
              <label className="block text-sm font-medium mb-2">DNI</label>
              <input
                type="text"
                {...register("dni", {
                  required: "El documento es obligatorio",
                  pattern: {
                    value: /^\d{5,10}$/,
                    message: "Debe tener entre 5 y 10 dígitos",
                  },
                })}
                className="input-form"
              />
              {errors.dni && (
                <p className="text-red-500 text-sm mt-1">{errors.dni.message}</p>
              )}
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-sm font-medium mb-2">Ciudad</label>
              <input
                type="text"
                {...register("city", {
                  required: "La ciudad es obligatoria",
                  minLength: {
                    value: 2,
                    message: "Debe tener al menos 2 letras",
                  },
                })}
                className="input-form"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            {/* Fecha de nacimiento */}
            <div>
              <label className="block text-sm font-medium mb-2">Fecha de nacimiento</label>
              <input
                type="date"
                {...register("dob", {
                  required: "La fecha es obligatoria",
                })}
                className="input-form"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full px-4 py-2 rounded-full text-sm border transition ${
                isValid
                  ? "bg-primary text-white border-primary hover:bg-secondary"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Registrarse
            </button>
          </form>

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




