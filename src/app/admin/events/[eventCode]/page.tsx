// app/admin/event/[eventCode]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Spinner,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';

const CheckPage = () => {
  const { eventCode } = useParams(); // URL에서 eventCode 추출
  const [checks, setChecks] = useState([]);
  const [checkName, setCheckName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // 체크 목록을 가져오는 함수
  const fetchChecks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/user/event/${eventCode}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setChecks(data);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Failed to fetch checks:', error);
      setError('Failed to fetch checks');
    } finally {
      setLoading(false);
    }
  };
  
  // 새로운 체크를 생성하는 함수
  const createCheck = async () => {
    if (!checkName) {
      setError('Please provide check name');
      return;
    }
    
    setError('');
    try {
      const res = await fetch(`/api/user/event/${eventCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name: checkName }),
      });
      const data = await res.json();
      if (res.ok) {
        setCheckName('');
        fetchChecks(); // 체크 목록 새로 고침
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Failed to create check:', error);
      setError('Failed to create check');
    }
  };
  
  // 특정 체크를 삭제하는 함수
  const deleteCheck = async (id: number) => {
    setError('');
    try {
      const res = await fetch(`/api/user/event/${eventCode}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchChecks(); // 체크 목록 새로 고침
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Failed to delete check:', error);
      setError('Failed to delete check');
    }
  };
  
  // 컴포넌트가 마운트될 때 체크 목록을 가져옴
  useEffect(() => {
    fetchChecks();
  }, []);
  
  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Text fontSize="2xl">Check Management</Text>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {loading ? (
          <Spinner size="lg" />
        ) : (
          <List spacing={3}>
            {checks.map((check: any) => (
              <ListItem key={check.id} display="flex" justifyContent="space-between">
                <Text>{check.name} (Code: {check.code})</Text>
                <Button colorScheme="red" onClick={() => deleteCheck(check.id)}>Delete</Button>
              </ListItem>
            ))}
          </List>
        )}
        <Input
          value={checkName}
          onChange={(e) => setCheckName(e.target.value)}
          placeholder="Enter check name"
        />
        <Button onClick={createCheck} colorScheme="blue">Add Check</Button>
      </VStack>
    </Box>
  );
};

export default CheckPage;
