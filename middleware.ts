// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    const requestedPath = req.nextUrl.pathname + req.nextUrl.search;
    const encodedCallback = encodeURIComponent(requestedPath);
    const loginUrl = new URL(`/auth/login?callbackUrl=${encodedCallback}`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/user/:path*',
    '/dashboard/provider/:path*',
    '/memberships/:path*',
    '/providers/:id',
  ],
};





