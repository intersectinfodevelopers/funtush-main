import { NextRequest, NextResponse } from 'next/server';

// A stable anonymous id, set once per browser, forwarded to the backend as
// `x-visitor-id` on every marketplace read. This is what lets recommendations
// work for a visitor who hasn't logged in yet — the same role a first-party
// cookie plays for Meta/Google's own retargeting pixels, kept in-house here.
export const VISITOR_COOKIE = 'funtush_visitor_id';

export function middleware(request: NextRequest) {
  // TODO: Check auth token and redirect based on role
  // const token = request.cookies.get('auth_token');
  // if (token) {
  //   const role = decodeToken(token.value).role;
  //   if (request.nextUrl.pathname === '/register') {
  //     return NextResponse.redirect(new URL('/dashboard', request.url));
  //   }
  // }

  const response = NextResponse.next();
  if (!request.cookies.get(VISITOR_COOKIE)) {
    response.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      path: '/',
    });
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
