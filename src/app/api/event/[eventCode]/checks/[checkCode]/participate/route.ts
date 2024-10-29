// POST /api/event/[eventCode]/checks/[checkCode]/participate
import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { eventCode: string; checkCode: string } }) {
  const { participantId } = await req.json();
  const { eventCode, checkCode } = params;
  
  const event = await prisma.event.findUnique({ where: { code: eventCode } });
  const check = await prisma.check.findUnique({ where: { code: parseInt(checkCode) } });
  
  if (!event || !check || check.eventId !== event.id) {
    return NextResponse.json({ error: 'Event or Check not found' }, { status: 404 });
  }
  
  const participantCheck = await prisma.participantCheck.create({
    data: {
      participantId,
      checkId: check.id,
    },
  });
  
  return NextResponse.json(participantCheck, { status: 201 });
}
