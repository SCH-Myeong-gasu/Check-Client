import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!; // JWT 비밀키

// 랜덤한 8자리 숫자 생성 함수
function generateRandomCode() {
  return Math.floor(10000000 + Math.random() * 90000000).toString(); // 10000000 이상 99999999 이하의 숫자
}

// GET 요청: 로그인한 사용자의 모든 Event 목록 가져오기
export async function GET(req: Request) {
  const token = req.headers.get('Authorization')?.split(' ')[1];
  
  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const loggedInUserUuid = decoded.userId;
    
    const events = await prisma.event.findMany({
      where: { userUuid: loggedInUserUuid },
      select: {
        id: true,
        code: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch events:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST 요청: 로그인한 사용자에 대한 새로운 Event 생성
export async function POST(req: Request) {
  const { name } = await req.json();
  
  const token = req.headers.get('Authorization')?.split(' ')[1];
  
  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const loggedInUserUuid = decoded.userId;
    
    // 랜덤 코드 생성
    const code = generateRandomCode();
    
    const newEvent = await prisma.event.create({
      data: {
        code: Number(code), // 생성한 랜덤 코드 사용
        name: name,
        userUuid: loggedInUserUuid, // 로그인한 사용자의 UUID 사용
      },
    });
    
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Failed to create event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

// DELETE 요청: 로그인한 사용자에 대한 특정 Event 삭제
export async function DELETE(req: Request) {
  const { id } = await req.json();
  
  const token = req.headers.get('Authorization')?.split(' ')[1];
  
  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const loggedInUserUuid = decoded.userId;
    
    const event = await prisma.event.findUnique({ where: { id } });
    
    if (!event || event.userUuid !== loggedInUserUuid) {
      return NextResponse.json({ error: 'Access denied: you do not own this event' }, { status: 403 });
    }
    
    await prisma.event.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Event deleted' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete event:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
