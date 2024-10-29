// app/event/[eventCode]/participants/[participantId]/remaining-checks/page.tsx

'use client'
import { useEffect, useState } from 'react';
import { Box, Text, VStack, Button } from '@chakra-ui/react';

interface Check {
  id: number;
  name: string;
  code: number;
}

interface RemainingChecksProps {
  params: {
    eventCode: string;
    participantId: string;
  };
}

const RemainingChecksPage = ({ params }: RemainingChecksProps) => {
  const [remainingChecks, setRemainingChecks] = useState<Check[]>([]);
  const { eventCode, participantId } = params;
  
  // 남은 체크 목록 불러오기
  useEffect(() => {
    const fetchRemainingChecks = async () => {
      try {
        const response = await fetch(`/api/event/${eventCode}/participants/${participantId}/remaining-checks`);
        const data = await response.json();
        setRemainingChecks(data);
      } catch (error) {
        console.error('Failed to fetch remaining checks:', error);
      }
    };
    fetchRemainingChecks();
  }, [eventCode, participantId]);
  
  const handleCheckParticipation = async (checkCode: number) => {
    try {
      const response = await fetch(`/api/event/${eventCode}/checks/${checkCode}/participate`, {
        method: 'POST',
        body: JSON.stringify({ participantId: parseInt(participantId) }),
      });
      
      if (response.ok) {
        // 성공적으로 참여하면 해당 체크를 목록에서 제거
        setRemainingChecks(prevChecks => prevChecks.filter(check => check.code !== checkCode));
      } else {
        console.error('Failed to participate in check:', await response.json());
      }
    } catch (error) {
      console.error('Error during check participation:', error);
    }
  };
  
  return (
    <Box p={5} textAlign="center">
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Remaining Checks for Event {eventCode}
        </Text>
        {remainingChecks.length === 0 ? (
          <Text>No remaining checks. You have completed all checks for this event!</Text>
        ) : (
          remainingChecks.map((check) => (
            <Box key={check.id} borderWidth={1} p={4} borderRadius="md">
              <Text fontSize="lg">{check.name}</Text>
              <Button
                mt={2}
                colorScheme="blue"
                onClick={() => handleCheckParticipation(check.code)}
              >
                Participate in Check
              </Button>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default RemainingChecksPage;
