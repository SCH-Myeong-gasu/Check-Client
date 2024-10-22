// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { studentId, name, department } = await request.json();
  
  // 입력된 정보가 유효한지 검증
  if (!studentId || !name || !department) {
    return NextResponse.json({ error: '모든 정보를 입력해야 합니다.' }, { status: 400 });
  }
  
  // 사용자 정보를 쿠키에 저장 (쿠키 이름: 'user')
  const user = { studentId, name, department };
  cookies().set('user', JSON.stringify(user), { path: '/', httpOnly: true });
  
  return NextResponse.json({ success: true });
}
