"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SuccessPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const previousPath =
    typeof window !== "undefined"
      ? localStorage.getItem("previousPath") || "/"
      : "/";

  const [membershipConfirmed, setMembershipConfirmed] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const fetchUntilUpdated = async (retries = 6, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const sessionRes = await fetch("/api/session");
          const session = await sessionRes.json();

          console.log("Validacion de session", session);

          const userEmail = session?.user?.email;
          if (!userEmail) break;

          const userRes = await fetch(
            `http://localhost:4000/users/by-email/${userEmail}`
          );
          const fullUser = await userRes.json();
          console.log(
            "[SuccessPage] Usuario actualizado después del pago:",
            fullUser
          );

          setUser(fullUser);

          if (fullUser.membership?.status === "Active") {
            setMembershipConfirmed(true);
            router.push(previousPath);
            return;
          }
        } catch (error) {
          console.error("❌ Error al verificar membresía activa:", error);
        }
        await new Promise((res) => setTimeout(res, delay));
      }

      setMembershipConfirmed(false);
      router.push(previousPath);
    };

    fetchUntilUpdated();
  }, [router, setUser, previousPath]);

  return (
    <div className="text-center py-20">
      <h1 className="text-green-600 text-2xl font-bold mb-2">
        ¡Pago exitoso! 🎉
      </h1>
      {membershipConfirmed === false ? (
        <p className="text-red-500">
          No pudimos confirmar tu membresía, pero te redirigimos igual. Si el
          problema persiste, por favor contacta soporte.
        </p>
      ) : (
        <p className="text-gray-500">
          Verificando tu membresía y redirigiendo...
        </p>
      )}
    </div>
  );
}
