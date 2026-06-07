import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // TODO: Check auth token and redirect based on role
  // const token = request.cookies.get('auth_token');
  // if (token) {
  //   const role = decodeToken(token.value).role;
  //   if (request.nextUrl.pathname === '/register') {
  //     return NextResponse.redirect(new URL('/dashboard', request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*'],
};
