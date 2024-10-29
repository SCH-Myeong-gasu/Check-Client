// /app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  
  // Set JWT cookie with a past expiration date to delete it
  response.cookies.set('jwt', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0)
  });
  
  return response;
}
