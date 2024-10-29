// app/api/event/[eventId]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET 요청 처리: 특정 Event ID에 대한 이벤트 정보 가져오기
export async function GET(req: Request, { params }: { params: { eventCode: string } }) {
  const { eventCode } = params;
  
  try {
    // 이벤트 정보 가져오기
    const event = await prisma.event.findUnique({
      where: { code: Number(eventCode) }, // eventId를 숫자로 변환하여 조회
      select: {
        id: false,
        code: true, // code 필드 포함
        name: true,
        data: true,
        createdAt: true,
        updatedAt: true,
        userUuid: true, // 이벤트를 생성한 사용자의 UUID
      },
    });
    
    // 이벤트가 존재하지 않는 경우
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch event:', error);
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}
