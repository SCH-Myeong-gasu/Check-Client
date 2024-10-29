// /api/event/[eventCode]/checks/[checkCode]/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET 요청: 특정 eventCode와 checkCode에 해당하는 Check 정보 가져오기
export async function GET(
  req: Request,
  { params }: { params: { eventCode: string; checkCode: string } }
) {
  const { eventCode, checkCode } = params;
  
  try {
    // 주어진 eventCode로 Event를 검색
    const event = await prisma.event.findUnique({
      where: { code: Number(eventCode) },
    });
    
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    // Event의 id와 checkCode를 사용해 Check를 검색
    const check = await prisma.check.findUnique({
      where: { code: Number(checkCode), eventId: event.code },
      select: {
        id: true,
        name: true,
      },
    });
    
    if (!check) {
      return NextResponse.json({ error: 'Check not found' }, { status: 404 });
    }
    
    // Check 정보 반환
    return NextResponse.json(check, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch check:', error);
    return NextResponse.json({ error: 'Failed to fetch check' }, { status: 500 });
  }
}
