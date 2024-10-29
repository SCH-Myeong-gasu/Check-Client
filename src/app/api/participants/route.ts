// app/api/participants/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, studentId, department, eventId, checkCode } = await request.json();
    
    // 입력된 정보가 유효한지 검증
    if (!name || !studentId || !department || !eventId || checkCode === undefined) {
      return NextResponse.json({ error: '모든 정보를 입력해야 합니다.' }, { status: 400 });
    }
    
    // eventId가 유효한지 확인
    const eventExists = await prisma.event.findUnique({
      where: { code: Number(eventId) },
    });
    
    if (!eventExists) {
      return NextResponse.json({ error: '유효하지 않은 이벤트 ID입니다.' }, { status: 400 });
    }
    
    // Participant 추가
    const participant = await prisma.participant.create({
      data: {
        name,
        studentId,
        department,
        eventId: Number(eventId),
        checkCode: Number(checkCode),
      },
    });
    
    return NextResponse.json({ success: true, participant }, { status: 201 });
  } catch (error) {
    // 중복된 참가자 정보에 대한 처리
    if (error.code === 'P2002') {
      return NextResponse.json({ error: '이 참가자는 이미 등록되어 있습니다.' }, { status: 409 });
    }
    
    // 기타 오류 처리
    console.error('Error adding participant:', error);
    return NextResponse.json({ error: '참가자 추가 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const studentId = searchParams.get('studentId');
  const department = searchParams.get('department');
  const eventId = searchParams.get('eventId');
  
  // 필수 매개변수가 모두 제공되는지 확인
  if (!name || !studentId || !department || !eventId) {
    return NextResponse.json({ error: '모든 필드를 제공해야 합니다.' }, { status: 400 });
  }
  
  try {
    // 주어진 조건으로 참가자 정보를 조회
    const participant = await prisma.participant.findMany({
      where: {
        name,
        studentId,
        department,
        eventId: parseInt(eventId), // eventId는 정수로 변환
      },
      select: {
        checkCode: true, // checkCode만 선택
      },
    });
    
    // 결과 반환
    return NextResponse.json({ checkCodes: participant.map(p => p.checkCode) }, { status: 200 });
  } catch (error) {
    console.error('Error fetching participant check codes:', error);
    return NextResponse.json({ error: '참가자 정보 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
