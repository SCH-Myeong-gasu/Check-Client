// middleware.ts
import { NextResponse } from 'next/server';

const allowedOrigins = ['https://yourdomain.com', 'https://another-trusted-domain.com', 'http://localhost/'];

export function middleware(req) {
  const origin = req.headers.get('origin');
  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: 'CORS policy does not allow this origin' }, { status: 403 });
  }
  
  const csrfToken = req.headers.get('x-csrf-token');
  if (req.method === 'POST' && csrfToken !== process.env.CSRF_SECRET) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/auth/:path*'], // 인증 관련 API에만 적용
};
