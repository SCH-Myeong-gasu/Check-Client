'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Box, Text, Spinner, Center, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

interface paramsProps {
  params: {
    eventId: string;
    checkCode: string;
  };
}

interface UserData {
  name: string;
  studentId: string;
  department: string;
}


const Index = ({ params }: paramsProps) => {
  const router = useRouter();
  const { eventId, checkCode } = params;
  
  const [userData, setUserData] = useState<UserData | null>(null); // 사용자 데이터 상태 초기화
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [message, setMessage] = useState<string>(''); // 메시지 상태
  
  // 사용자 정보를 불러오는 함수
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/api/login`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        router.push(`/login/participant/${eventId}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserInfo();
  }, [eventId, router]);
  
  // 참가자 등록을 시도하는 함수
  const handleSubmit = async () => {
    if (!userData || !userData.name || !userData.studentId || !userData.department) {
      setMessage("사용자 정보가 불완전합니다.");
      return;
    }
    
    try {
      const response = await fetch(`/api/participants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          studentId: userData.studentId,
          department: userData.department,
          eventId,
          checkCode,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setMessage("참가자 등록에 성공했습니다.");
      } else if (response.status === 409) {
        setMessage("이미 참가하였습니다.");
      } else {
        setMessage(result.error || "참가자 등록 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error('Failed to submit participant:', error);
      setMessage("참가자 등록 중 오류가 발생했습니다.");
    }
  };
  
  // 페이지 진입 시 자동으로 등록을 시도
  useEffect(() => {
    if (userData) {
      handleSubmit();
    }
  }, [userData]);
  
  return (
    <Center minH="100vh" bg="gray.50">
      <Box
        w="full"
        maxW="md"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        {loading ? (
          <Center>
            <Spinner size="xl" color="blue.500" />
          </Center>
        ) : (
          <VStack spacing={4} align="stretch">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              {userData ? `환영합니다, ${userData.name}님` : "사용자 정보 로드 실패"}
            </Text>
            <Text textAlign="center" fontSize="sm" color="gray.600">
              행사 등록 페이지에 오신 것을 환영합니다.
            </Text>
            {message && (
              <Alert
                status={message === "참가자 등록에 성공했습니다." ? "success" : "warning"}
                borderRadius="md"
                boxShadow="sm"
                textAlign="center"
              >
                <AlertIcon />
                <VStack align="start" spacing={0}>
                  <AlertTitle fontSize="md" mr={2}>
                    {message === "참가자 등록에 성공했습니다." ? "등록 성공" : "주의"}
                  </AlertTitle>
                  <AlertDescription fontSize="sm">
                    {message}
                  </AlertDescription>
                </VStack>
              </Alert>
            )}
          </VStack>
        )}
      </Box>
    </Center>
  );
}

export default Index;
