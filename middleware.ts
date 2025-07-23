import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Lógica de proteção de rotas da aplicação (diary e admin)
  if (pathname.startsWith('/diary') || pathname.startsWith('/admin')) {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (pathname.startsWith('/admin') && token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }
  console.log(`Middleware executed for path: ${pathname}`);

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/diary/:path*', '/api/auth/:path*'],
};
