// app/api/event/[eventCode]/checks/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!; // JWT 비밀키

// GET 요청: 특정 Event에 대한 체크 목록 가져오기
export async function GET(req: Request, { params }: { params: { eventCode: string } }) {
  const { eventCode } = params;
  
  const token = req.headers.get('Authorization')?.split(' ')[1];
  
  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const loggedInUserUuid = decoded.userId;
    
    const event = await prisma.event.findUnique({
      where: { code: Number(eventCode) },
    });
    
    if (!event || event.userUuid !== loggedInUserUuid) {
      return NextResponse.json({ error: 'Access denied: you do not own this event' }, { status: 403 });
    }
    
    const checks = await prisma.check.findMany({
      where: { eventId: event.code },
      select: {
        id: true,
        name: true,
        code: true, // code를 포함
      },
    });
    
    return NextResponse.json(checks, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch checks:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch checks' }, { status: 500 });
  }
}

// POST 요청: 특정 Event에 체크 추가
export async function POST(req: Request, { params }: { params: { eventCode: string } }) {
  const { eventCode } = params;
  const { name } = await req.json();
  
  const token = req.headers.get('Authorization')?.split(' ')[1];
  
  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const loggedInUserUuid = decoded.userId;
    
    const event = await prisma.event.findUnique({
      where: { code: Number(eventCode) },
    });
    
    if (!event || event.userUuid !== loggedInUserUuid) {
      return NextResponse.json({ error: 'Access denied: you do not own this event' }, { status: 403 });
    }
    
    // 8자리 랜덤 코드 생성
    const randomCode = Math.floor(10000000 + Math.random() * 90000000);
    
    const newCheck = await prisma.check.create({
      data: {
        name: name,
        eventId: event.code, // eventId를 통해 체크 생성
        code: Number(randomCode), // 생성한 랜덤 코드 추가
      },
    });
    
    return NextResponse.json(newCheck, { status: 201 });
  } catch (error) {
    console.error('Failed to create check:', error);
    return NextResponse.json({ error: 'Failed to create check' }, { status: 500 });
  }
}

// DELETE 요청: 특정 체크 삭제
export async function DELETE(req: Request, { params }: { params: { eventCode: string } }) {
  const { eventCode } = params;
  const { id } = await req.json();
  
  const token = req.headers.get('Authorization')?.split(' ')[1];
  
  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const loggedInUserUuid = decoded.userId;
    
    const event = await prisma.event.findUnique({
      where: { code: Number(eventCode) },
    });
    
    if (!event || event.userUuid !== loggedInUserUuid) {
      return NextResponse.json({ error: 'Access denied: you do not own this event' }, { status: 403 });
    }
    
    const check = await prisma.check.findUnique({ where: { id } });
    
    if (!check) {
      return NextResponse.json({ error: 'Check not found' }, { status: 404 });
    }
    
    await prisma.check.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Check deleted' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete check:', error);
    return NextResponse.json({ error: 'Failed to delete check' }, { status: 500 });
  }
}
