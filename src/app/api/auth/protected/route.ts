import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  const token = req.headers.get('Authorization')?.split(' ')[1]; // "Bearer <token>"에서 토큰 추출
  
  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  
  try {
    // JWT 검증
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 토큰이 유효할 경우, 사용자 정보 반환
    return NextResponse.json({ message: 'Access granted', user: decoded });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ error: 'Token expired' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
