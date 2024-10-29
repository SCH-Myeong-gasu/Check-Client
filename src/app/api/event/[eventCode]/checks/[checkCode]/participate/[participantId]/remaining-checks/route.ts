// GET /api/event/[eventCode]/participants/[participantId]/remaining-checks
import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { eventCode: string; participantId: string } }) {
  const { eventCode, participantId } = params;
  
  const event = await prisma.event.findUnique({ where: { code: Number(eventCode) } });
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  
  // 참가자가 참여하지 않은 Check 조회
  const allChecks = await prisma.check.findMany({ where: { eventId: event.id } });
  const completedCheckIds = await prisma.participantCheck.findMany({
    where: { participantId: parseInt(participantId) },
    select: { checkId: true },
  });
  
  const completedCheckIdSet = new Set(completedCheckIds.map(c => c.checkId));
  const remainingChecks = allChecks.filter(check => !completedCheckIdSet.has(check.id));
  
  return NextResponse.json(remainingChecks, { status: 200 });
}
