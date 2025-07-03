import { auth0 } from "./auth0";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

/**
 * ✅ Verifica la sesión del usuario en una página protegida.
 * Redirige al login si no está autenticado.
 */
export async function requirePageSession(redirectTo = "/") {
  const session = await auth0.getSession();
  if (!session) {
    return redirect(`/auth/login?returnTo=${redirectTo}`);
  }
  return session;
}

/**
 * ✅ Verifica la sesión del usuario en una API protegida.
 * Retorna sesión o un error 401 si no está autenticado.
 */
export async function requireApiSession(): Promise<
  | { session: NonNullable<Awaited<ReturnType<typeof auth0.getSession>>> }
  | { error: Response }
> {
  const session = await auth0.getSession();
  if (!session) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { session };
}