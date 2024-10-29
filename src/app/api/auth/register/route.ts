// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// 이메일 정규식
const EMAIL_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
// 사용자 이름 정규식: 한글, 영문 대소문자 및 숫자 허용 (20자 이내)
const USERNAME_REGEX = /^[가-힣a-zA-Z0-9]{1,20}$/;

const PASSWORD_MIN_LENGTH = 8;
const BCRYPT_SALT_ROUNDS = 12;

export async function POST(req: Request) {
  const { username, email, password } = await req.json();
  
  // 입력값 검증
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
  }
  if (!USERNAME_REGEX.test(username)) {
    return NextResponse.json({ error: 'Username must be 1-20 characters long and can include Korean, letters, and numbers' }, { status: 400 });
  }
  if (!password || password.length < PASSWORD_MIN_LENGTH) {
    return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
  }
  
  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    
    // 사용자 생성
    const user = await prisma.user.create({
      data: { username: username, email: email, password: hashedPassword },
    });
    
    // 사용자 생성 로깅
    console.log(`User ${email} created successfully.`);
    
    return NextResponse.json({ message: 'User created successfully', userId: user.id }, { status: 201 });
  } catch (error: any) {
    // 중복 이메일 처리 및 예외 메시지
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email is already registered' }, { status: 409 });
    }
    return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
  }
}
