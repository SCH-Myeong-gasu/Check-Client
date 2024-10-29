// POST /api/event/[eventCode]/participants
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { eventCode: string } }) {
  const { name, studentId, department } = await req.json();
  const { eventCode } = params;
  
  // 이벤트 찾기
  const event = await prisma.event.findUnique({ where: { code: eventCode } });
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  
  // 참가자 추가
  const participant = await prisma.participant.create({
    data: {
      name,
      studentId,
      department,
      eventId: event.id,
    },
  });
  
  return NextResponse.json(participant, { status: 201 });
}
