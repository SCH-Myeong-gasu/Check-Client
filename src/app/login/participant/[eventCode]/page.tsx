'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Input, VStack, Text, Select } from '@chakra-ui/react';
import Navbar from "@/components/layout/nav";

interface ParamsProps {
  params: {
    eventCode: string;
  };
}

export default function LoginPage({ params }: ParamsProps) {
  const { eventCode } = params;
  
  const router = useRouter();
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [eventValid, setEventValid] = useState(true);  // 이벤트 코드 유효성 상태
  const [loading, setLoading] = useState(true);        // 로딩 상태
  
  // 이벤트 코드 유효성 검사
  useEffect(() => {
    const checkEventCode = async () => {
      try {
        const res = await fetch(`/api/event/${eventCode}`, {
          method: 'GET',
        });
        
        if (res.ok) {
          setEventValid(true);  // 유효한 이벤트 코드
        } else {
          setEventValid(false); // 유효하지 않은 이벤트 코드
        }
      } catch (error) {
        console.error('Failed to fetch event:', error);
        setEventValid(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkEventCode();
  }, [eventCode]);
  
  // SW 융합대학 학과 목록
  const departments = [
    '소프트웨어공학과',
    '정보보호학과',
    '컴퓨터공학과',
    '미디어콘텐츠학과',
    '데이터사이언스학과',
    '인공지능학과'
  ];
  
  const handleLogin = async () => {
    if (!studentId || !name || !department) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId, name, department, eventCode }),
    });
    
    if (res.ok) {
      // router.push(`/check/${eventCode}`); // 로그인 후 메인 페이지로 이동
      router.back();
    } else {
      alert('로그인 실패');
    }
  };
  
  return (
    <>
      <Navbar />
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        {loading ? (
          <Text>로딩 중...</Text>
        ) : eventValid ? (
          <VStack spacing={4}>
            <Text>로그인 정보를 입력하세요</Text>
            <Input placeholder="학번" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
            <Input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
            
            {/* 학과 선택 드롭다운 */}
            <Select placeholder="학과 선택" value={department} onChange={(e) => setDepartment(e.target.value)}>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </Select>
            
            <Button colorScheme="blue" onClick={handleLogin}>로그인</Button>
          </VStack>
        ) : (
          <Text fontSize="lg" color="red.500">
            유효하지 않은 이벤트 코드입니다.
          </Text>
        )}
      </Box>
    </>
  );
}
