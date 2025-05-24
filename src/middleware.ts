// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public routes
  const publicRoutes = ['/'];

  // Get the token from cookies (example: `next-auth.session-token`)
  const token = request.cookies.get('__Secure-next-auth.session-token')?.value; // for secure cookies


  const isPublicRoute = publicRoutes.some(route => pathname === route );


  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)'
  ]
}
