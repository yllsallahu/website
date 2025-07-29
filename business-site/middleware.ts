import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if ((pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) || pathname.startsWith('/admin')) {
    if (!token || token.role !== 'admin') {
      const signInUrl = new URL('/api/auth/signin', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*']
};
