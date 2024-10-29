import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { studentId, name, department, eventCode } = await request.json();
  
  // 입력된 정보가 유효한지 검증
  if (!studentId || !name || !department) {
    return NextResponse.json({ error: '모든 정보를 입력해야 합니다.' }, { status: 400 });
  }
  
  // 사용자 정보를 쿠키에 저장 (쿠키 이름: 'userInfo')
  const user = { studentId, name, department, eventCode };
  cookies().set('userInfo', JSON.stringify(user), { path: '/', httpOnly: true });
  
  return NextResponse.json({ success: true });
}

// GET 요청 핸들러 추가
export async function GET() {
  const cookieStore = cookies();
  const userInfoCookie = cookieStore.get('userInfo');
  
  if (!userInfoCookie) {
    return NextResponse.json({ error: '로그인 정보가 없습니다.' }, { status: 404 });
  }
  
  // 쿠키의 값을 JSON으로 변환하여 반환
  const userInfo = JSON.parse(userInfoCookie.value);
  return NextResponse.json(userInfo);
}
