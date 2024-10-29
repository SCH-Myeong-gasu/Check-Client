// login/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = '1h';  // 액세스 토큰 만료 시간 설정
const MAX_LOGIN_ATTEMPTS = 30; // 로그인 시도 횟수 제한
const LOGIN_TIMEOUT_MS = 15 * 60 * 1000; // 로그인 시도 후 15분 잠금

const loginAttempts: { [key: string]: { count: number; lastAttempt: number } } = {}; // 로그인 시도 기록

export async function POST(req: Request) {
  const { email, password } = await req.json();
  
  // 입력값 검증
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }
  
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    // 사용자 확인
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // 로그인 시도 제한 확인
    const currentTime = Date.now();
    if (
      loginAttempts[email] &&
      loginAttempts[email].count >= MAX_LOGIN_ATTEMPTS &&
      currentTime - loginAttempts[email].lastAttempt < LOGIN_TIMEOUT_MS
    ) {
      return NextResponse.json({ error: 'Too many login attempts, try again later' }, { status: 429 });
    }
    
    // 비밀번호 검증
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      if (!loginAttempts[email]) {
        loginAttempts[email] = { count: 1, lastAttempt: currentTime };
      } else {
        loginAttempts[email].count++;
        loginAttempts[email].lastAttempt = currentTime;
      }
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // 비밀번호가 맞으면 로그인 시도 기록 초기화
    delete loginAttempts[email];
    
    // JWT 토큰 생성
    const token = jwt.sign({ userId: user.uuid, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    
    // 로그인 시도 기록 로깅
    console.log(`User ${email} logged in successfully.`);
    
    return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
