// app/event/[eventCode]/admin/participants/page.tsx

'use client'
import { useEffect, useState } from 'react';
import { Box, Text, VStack, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

interface Participant {
  id: number;
  name: string;
  studentId: string;
  department: string;
  remainingChecks: string[];
}

interface AdminParticipantsPageProps {
  params: {
    eventCode: string;
  };
}

const AdminParticipantsPage = ({ params }: AdminParticipantsPageProps) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const { eventCode } = params;
  
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(`/api/event/${eventCode}/participants`);
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error('Failed to fetch participants:', error);
      }
    };
    
    fetchParticipants();
  }, [eventCode]);
  
  return (
    <Box p={5} textAlign="center">
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Participants for Event {eventCode}
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Student ID</Th>
              <Th>Department</Th>
              <Th>Remaining Checks</Th>
            </Tr>
          </Thead>
          <Tbody>
            {participants.map((participant) => (
              <Tr key={participant.id}>
                <Td>{participant.name}</Td>
                <Td>{participant.studentId}</Td>
                <Td>{participant.department}</Td>
                <Td>{participant.remainingChecks.join(', ') || 'None'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default AdminParticipantsPage;
