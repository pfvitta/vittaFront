"use client";

import { useEffect, useState } from "react";
import { Appointment } from "@/types/Appointment";
import {
  getAppointmentsByUser,
  cancelAppointment,
} from "@/services/appointmentService";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "react-hot-toast";
import SidebarUser from "@/components/SidebardUser/SidebarUser";

export default function UserAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("userId desde localStorage:", userId);
    if (!user?.id) return;

    getAppointmentsByUser(user.id)
      .then(setAppointments)
      .catch((err) => {
        console.error("Error al obtener turnos:", err);
        // Ya no mostramos alerta si no hay turnos
      });
  }, [user?.id]);

  const handleCancel = async (id: string) => {
    try {
      await cancelAppointment(id);
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === id ? { ...appt, status: "cancelled" } : appt
        )
      );
      toast.success("Turno cancelado");
    } catch (error) {
      console.error("Error al cancelar turno:", error);
      toast.error("No se pudo cancelar el turno");
    }
  };

  return (
    <SidebarUser>
      <div className="max-w-4xl mx-auto">
        <h1 className="title1 mb-6">Mis turnos</h1>

        {appointments.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10m-11 8h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800">No tienes turnos agendados</h2>
            <p className="text-gray-600 text-sm">
              Comienza tu camino hacia una vida más saludable. Agenda tu primera
              consulta con nuestros profesionales verificados.
            </p>
            <button
              onClick={() => window.location.href = "/providers"}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full"
            >
              + Agendar turno
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="flex justify-center mb-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-700">Profesionales verificados</p>
                <p className="text-xs text-gray-500">Nutricionistas certificados</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="flex justify-center mb-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-11 8h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-700">Horarios flexibles</p>
                <p className="text-xs text-gray-500">Encuentra el horario ideal</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="flex justify-center mb-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-11 8h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-700">Fácil gestión</p>
                <p className="text-xs text-gray-500">Reprograma cuando necesites</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appt) => {
              const estadoColor =
                appt.status === "pending"
                  ? "text-yellow-500"
                  : appt.status === "confirmed"
                  ? "text-green-600"
                  : appt.status === "cancelled"
                  ? "text-red-500"
                  : "text-gray-500";

              const estadoTexto =
                appt.status === "pending"
                  ? "Pendiente"
                  : appt.status === "confirmed"
                  ? "Confirmado"
                  : appt.status === "cancelled"
                  ? "Cancelado"
                  : appt.status;

              return (
                <div
                  key={appt.id}
                  className="bg-white p-6 rounded-xl shadow flex flex-col gap-4"
                >
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      Con:{" "}
                      <span className="font-medium text-gray-800">
                        {appt.professional?.user?.name ?? "Profesional no disponible"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Fecha:{" "}
                      <span className="font-medium text-gray-800">
                        {format(new Date(appt.date), "EEEE dd/MM/yyyy", { locale: es })}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Hora:{" "}
                      <span className="font-medium text-gray-800">{appt.time}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Estado: <span className={`font-medium ${estadoColor}`}>{estadoTexto}</span>
                    </p>
                  </div>

                  {appt.status !== "cancelled" && (
                    <div>
                      <button
                        onClick={() => handleCancel(appt.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full text-sm"
                      >
                        Cancelar turno
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SidebarUser>
  );
}