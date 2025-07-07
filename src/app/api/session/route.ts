// app/api/session/route.ts
import { auth0 } from '@/lib/auth0';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth0.getSession();

  if (!session?.user) {
    return NextResponse.json({ user: null, role: null, membership: null }, { status: 200 });
  }

  return NextResponse.json({
    user: session.user,
    role: session.user['https://vitta.com/roles'] ?? 'user',
    membership: session.user['https://vitta.com/membership'] ?? null,
  });
}
