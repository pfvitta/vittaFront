import { NextResponse, NextRequest } from 'next/server';
import { auth0 } from './lib/auth0';

export async function middleware(request: NextRequest) {
  const origin = request.nextUrl.origin;

  // Ejecuta la lógica de Auth0
  const authResponse = await auth0.middleware(request);

  const session = await auth0.getSession(request);
  const user = session?.user;

  if (!user) {
    return authResponse;
  }

  // ✅ Obtener el rol desde el claim personalizado
  const roles = user["https://vitta.com/roles"] || ["user"];
  const path = request.nextUrl.pathname;

  // 🔐 Protección por roles
  if (path.startsWith('/admin') && !roles.includes('admin')) {
    return NextResponse.redirect(new URL('/acceso-denegado', origin));
  }

  // if (path.startsWith('/provider/id') && !roles.includes('provider')) {
  //   return NextResponse.redirect(new URL('/acceso-denegado', origin));
  // }

  if (path.startsWith('/user') && !roles.includes('user')) {
    return NextResponse.redirect(new URL('/acceso-denegado', origin));
  }

  return authResponse || NextResponse.next();
}

export  const  config  =  { 
  matcher : [ 
    /* 
     * Coincide con todas las rutas de solicitud excepto las que empiezan por: 
     * - _next/static (archivos estáticos) 
     * - _next/image (archivos de optimización de imágenes) 
     * - favicon.ico, sitemap.xml, robots.txt (archivos de metadatos) 
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)" 
  ] 
} ; 