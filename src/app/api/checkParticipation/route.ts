// app/api/checkParticipation/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // 쿠키를 사용하기 위한 import

const userCodesDB: { [userId: string]: Set<string> } = {}; // 유저별로 Set에 사용한 코드를 저장
const validCodes = new Set(['123', '151', '2321']); // 테스트용 성공 코드

export async function POST(request: Request) {
  const { code } = await request.json();
  
  // 쿠키에서 로그인 여부 확인
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user'); // 'user'라는 이름의 쿠키에 사용자 정보가 저장되어 있다고 가정
  
  if (!userCookie) {
    // 로그인이 안 되어 있으면 로그인 페이지로 리다이렉트
    const loginUrl = `/login?redirect=/check/${code}`; // QR 인증 페이지로 다시 돌아오기 위한 리다이렉트 URL 저장
    return NextResponse.redirect(loginUrl);
  }
  
  const user = JSON.parse(userCookie.value); // 쿠키에서 가져온 사용자 정보 파싱
  const userId = user.studentId; // 유저의 고유 식별자로 학번을 사용한다고 가정
  console.log('Logged in user:', user); // 사용자 정보 확인용 로그
  
  // 코드 유효성 검사
  if (!code || code.length < 3) {
    return NextResponse.json({ isValid: false, error: '유효하지 않은 코드입니다.' });
  }
  
  // 테스트용 코드가 유효한지 확인
  if (!validCodes.has(code)) {
    return NextResponse.json({ isValid: false, error: '유효하지 않은 코드입니다.' });
  }
  
  // 유저의 출석 정보를 확인하고, 처음 출석하는 경우를 기록
  if (!userCodesDB[userId]) {
    userCodesDB[userId] = new Set(); // 해당 유저의 기록이 없다면 새로운 Set 생성
  }
  
  // 유저가 해당 코드를 이미 사용했는지 확인
  if (userCodesDB[userId].has(code)) {
    return NextResponse.json({ isValid: true, alreadyParticipated: true });
  }
  
  // 유저가 해당 코드를 처음 사용하는 경우, 기록
  userCodesDB[userId].add(code);
  return NextResponse.json({ isValid: true, alreadyParticipated: false });
}
