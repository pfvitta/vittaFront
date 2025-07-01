// /app/api/token/route.ts
import { auth0 } from '@/lib/auth0';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth0.getSession();

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  return NextResponse.json({ accessToken: session.accessToken });
}