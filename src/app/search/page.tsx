'use client';

import Navbar from "@/components/layout/nav";
import { Box, Flex, Heading, IconButton, Text, Spinner, Center } from "@chakra-ui/react";
import { AiFillHome, AiFillPlusCircle, AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CheckData {
  id: number;
  code: number;
  name: string;
  eventId: number;
  createdAt: string;
  updatedAt: string;
}

interface ParticipantData {
  checkCode: number; // 참가자가 체크한 코드
}

export default function Home() {
  const [checkData, setCheckData] = useState<CheckData[]>([]);
  const [participantCheckCodes, setParticipantCheckCodes] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const eventId = 39804101; // 특정 이벤트 ID를 하드코딩 (유동적으로 사용할 경우 props나 context 등으로 전달 가능)
  
  const [userData, setUserData] = useState('');
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/login');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data) {
          setUserData(data); // 사용자 이름을 상태에 설정
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };
    
    fetchUserInfo();
  }, []);
  
  useEffect(() => {
    const fetchCheckData = async () => {
      try {
        const response = await fetch(`/api/event/${eventId}/checks`);
        if (!response.ok) throw new Error('Failed to fetch check data');
        
        const data = await response.json();
        setCheckData(data);
      } catch (error) {
        console.error('Failed to fetch check data:', error);
      }
    };
    
    const fetchParticipantCheckCodes = async () => {
      try {
        // 참가자 정보를 가져오기 위해 API 호출
        const response = await fetch(`/api/participants?eventId=${eventId}&name=${userData.name}&studentId=${userData.studentId}&department=${userData.department}`); // 필요에 따라 적절한 파라미터로 변경
        if (!response.ok) throw new Error('Failed to fetch participant check codes');
        
        const data: ParticipantData[] = await response.json();
        setParticipantCheckCodes(data.checkCodes);
      } catch (error) {
        console.error('Failed to fetch participant check codes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCheckData();
    fetchParticipantCheckCodes();
  }, [eventId]);
  
  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }
  
  return (
    <>
      <Navbar />
      <PageTransition>
        {checkData.length > 0 ? (
          <Box p={4} pt={20}>
            <Heading>참가 중인 이벤트 확인 리스트</Heading>
            <Box mt={4}>
              {checkData.map((check) => (
                participantCheckCodes.includes(check.code) ? ( // 체크한 코드가 포함된 경우
                  <Box key={check.id} p={4} bg="white" mb={4} rounded="2xl" shadow="md">
                    <Text fontWeight="bold" fontSize="lg">{check.name} (참여함)</Text> {/* 체크한 경우 표시 */}
                    <Text fontSize="sm" color="gray.600">Code: {check.code}</Text>
                    <Text fontSize="sm" color="gray.500">Created At: {new Date(check.createdAt).toLocaleString()}</Text>
                  </Box>
                ) : (
                  <Box key={check.id} p={4} bg="white" mb={4} rounded="2xl" shadow="md">
                    <Text fontWeight="bold" fontSize="lg">{check.name}</Text>
                    <Text fontSize="sm" color="gray.600">Code: {check.code}</Text>
                    <Text fontSize="sm" color="gray.500">Created At: {new Date(check.createdAt).toLocaleString()}</Text>
                  </Box>
                )
              ))}
            </Box>
          </Box>
        ) : (
          <Box p={4} pt={20}>
            <Heading as="h1">참가 중인 이벤트가 없습니다.</Heading>
          </Box>
        )}
      </PageTransition>
      
      {/* 하단 네비게이션 바 */}
      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        boxShadow="md"
        borderTop="1px"
        borderColor="#f3f4f4"
        bg="white"
      >
        <Flex justify="space-around" pt={1} pb={4} px={2}>
          <Link href="/" passHref>
            <Flex direction="column" align="center">
              <IconButton aria-label="Home" icon={<AiFillHome />} variant="ghost" fontSize="2xl" />
              <Text fontSize="sm">홈</Text>
            </Flex>
          </Link>
          <Link href="/search" passHref>
            <Flex direction="column" align="center">
              <IconButton aria-label="Search" icon={<AiOutlineSearch />} variant="ghost" fontSize="2xl" />
              <Text fontSize="sm">이벤트</Text>
            </Flex>
          </Link>
          <Link href="/add" passHref>
            <Flex direction="column" align="center">
              <IconButton aria-label="Add" icon={<AiFillPlusCircle />} variant="ghost" fontSize="2xl" />
              <Text fontSize="sm">추가</Text>
            </Flex>
          </Link>
          <Link href="/settings" passHref>
            <Flex direction="column" align="center">
              <IconButton aria-label="Settings" icon={<AiOutlineSetting />} variant="ghost" fontSize="2xl" />
              <Text fontSize="sm">설정</Text>
            </Flex>
          </Link>
        </Flex>
      </Box>
    </>
  );
}
