
import { CreditCard } from "lucide-react"
import React from 'react'

const Memberships = () => {
  return (
    <div className="p-5">

    <div className="md:col-span-1 bg-gray-100 max-w-xl border border-secondary rounded-lg shadow-sm">
        <div className="p-6 text-center justify-center">
            <div className="text-center mb-4">
            <div className="flex justify-center mb-3">
                <CreditCard className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="title1">Membresía</h1>
            <p className="text-secondary font-semibold text-lg">¡Accede a un plan!</p>
            </div>

            <div className="space-y-3 text-center mb-6">
                <p className="text-sm text-secondary">- Accede a dos sesiones al mes</p>
                <p className="text-sm text-secondary">- Un plan nutricional personalizado</p>
                <p className="text-sm text-secondary">- Información para un seguimiento seguro en tu salud</p>
            </div>

            <div className="text-center mb-6">
            <p className="text-2xl font-bold text-primary">$10.000</p>
            <p className="text-sm text-primary">c/mes</p>
            </div>

            <button className=" bg-secondary border text-white px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition">
            Acceder ahora
            </button>
        </div>
        </div>

    </div>
    
  );
};
export default Memberships