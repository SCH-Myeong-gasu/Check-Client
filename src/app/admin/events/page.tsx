// app/admin/events/page.tsx

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

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventCode, setEventCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // 이벤트 목록을 가져오는 함수
  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/user/event', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setEvents(data);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };
  
  // 새로운 이벤트를 생성하는 함수
  const createEvent = async () => {
    if (!eventName || !eventCode) {
      setError('Please provide event name and code');
      return;
    }
    
    setError('');
    try {
      const res = await fetch('/api/user/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name: eventName, code: Number(eventCode) }),
      });
      const data = await res.json();
      if (res.ok) {
        setEventName('');
        setEventCode('');
        fetchEvents(); // 이벤트 목록 새로 고침
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Failed to create event:', error);
      setError('Failed to create event');
    }
  };
  
  // 특정 이벤트를 삭제하는 함수
  const deleteEvent = async (id: number) => {
    setError('');
    try {
      const res = await fetch('/api/user/event', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchEvents(); // 이벤트 목록 새로 고침
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
      setError('Failed to delete event');
    }
  };
  
  // 컴포넌트가 마운트될 때 이벤트 목록을 가져옴
  useEffect(() => {
    fetchEvents();
  }, []);
  
  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Text fontSize="2xl">Event Management</Text>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {loading ? (
          <Spinner size="lg" />
        ) : (
          <>
            <Input
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <Input
              placeholder="Event Code"
              type="number"
              value={eventCode}
              onChange={(e) => setEventCode(e.target.value)}
            />
            <Button colorScheme="teal" onClick={createEvent}>
              Create Event
            </Button>
            <List spacing={3} width="100%">
              {events.map((event:any) => (
                <ListItem key={event.id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold">{event.name}</Text>
                  <Text>Code: {event.code}</Text>
                  <Button colorScheme="red" onClick={() => deleteEvent(event.id)}>
                    Delete
                  </Button>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default EventsPage;
