import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/unauthorized', req.url)); // ou /dashboard etc.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/diary/:path*'], // protege múltiplas rotas
};
