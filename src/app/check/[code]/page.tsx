// app/check/[code]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {Box, Text, Button, Alert, AlertIcon, Spinner, VStack, Flex, Center} from '@chakra-ui/react';
import Navbar from "../../../components/layout/nav/Index";

interface ParticipationResponse {
  isValid: boolean;
  alreadyParticipated: boolean;
}

export default function CheckCodePage({ params }: { params: { code: string } }) {
  const { code } = params;
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ParticipationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const checkParticipation = async () => {
      try {
        const res = await fetch('/api/checkParticipation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch participation data.');
        }
        
        const data: ParticipationResponse = await res.json();
        setResult(data);
      } catch (error) {
        // 'unknown'으로 변경하여 타입을 명시적으로 지정
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkParticipation();
  }, [code]);
  
  if (loading) {
    return (
      <>
        <Navbar/>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Box>
            <Center>
              <Spinner size="xl" />
            </Center>
            <Text marginTop="10px" fontSize="bold">조금만 기다려 볼까요?!</Text>
          </Box>
        </Box>
      </>
    );
  }
  
  if (error) {
    router.push('/login');
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Text>Failed to load participation data: {error}</Text>
        </Alert>
        <Flex>
          <Button colorScheme="blue" marginRight="10px" onClick={() => router.push('/')}>
            내 행사 기록
          </Button>
          <Button colorScheme="white" border="2px" borderRadius="md" borderColor="blue.300" color="black" onClick={() => router.push('/')}>
            행사 일정
          </Button>
        </Flex>
      </Box>
    );
  }
  
  if (!result?.isValid) {
    return (
      <>
        <Navbar/>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <VStack spacing={4}>
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Text>Invalid Code</Text>
            </Alert>
            <Flex>
              <Button colorScheme="blue" marginRight="10px" onClick={() => router.push('/')}>
                내 행사 기록
              </Button>
              <Button colorScheme="white" border="2px" borderRadius="md" borderColor="blue.300" color="black" onClick={() => router.push('/')}>
                행사 일정
              </Button>
            </Flex>
          </VStack>
        </Box>
      </>
    );
  }
  
  return (
    <>
      <Navbar/>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <VStack spacing={4}>
          <Text as='b' fontSize="2xl">토크콘서트</Text>
          {result.alreadyParticipated ? (
            <Alert status="warning" borderRadius="3xl">
              <AlertIcon />
              {/*<Text>You have already participated in this event.</Text>*/}
              <Text>이미 해당 이밴트에 참여했어요!</Text>
            </Alert>
          ) : (
            <Alert status="success" borderRadius="3xl">
              <AlertIcon />
              {/*<Text>Participation Successful! Your entry has been recorded.</Text>*/}
              <Text>참여 등록이 완료되었습니다! <br/>이밴트를 재미있게 즐겨보세요!</Text>
            </Alert>
          )}
          <Flex>
            <Button colorScheme="blue" marginRight="10px" onClick={() => router.push('/test')}>
              내 행사 기록
            </Button>
            <Button colorScheme="white" border="2px" borderRadius="md" borderColor="blue.300" color="black" onClick={() => router.push('/test')}>
              행사 일정
            </Button>
          </Flex>

        </VStack>
      </Box>
    </>

  );
}
