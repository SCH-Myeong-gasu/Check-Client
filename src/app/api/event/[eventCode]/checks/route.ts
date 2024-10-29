// app/api/user/events/[eventId]/checks/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET 요청 처리: 특정 Event에 대한 모든 Check 목록을 가져옴
export async function GET(req: Request, { params }: { params: { eventCode: string } }) {
  const { eventCode } = params;
  try {
    // Check 목록 가져오기
    const checks = await prisma.check.findMany({
      where: { eventId: Number(eventCode) }, // eventId를 숫자로 변환
      select: {
        id: true,
        code: true,
        name: true,
        eventId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(checks, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch checks:', error);
    return NextResponse.json({ error: 'Failed to fetch checks' }, { status: 500 });
  }
}
