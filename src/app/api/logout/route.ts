// app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // 'userInfo' 쿠키를 삭제
  cookies().set('userInfo', '', { path: '/', expires: new Date(0) });
  
  return NextResponse.json({ success: true, message: '로그아웃되었습니다.' });
}
