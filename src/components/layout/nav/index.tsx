'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Spacer,
  Link,
  Center,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Button
} from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [userName, setUserName] = useState('');
  const observerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const observerTarget = observerRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { rootMargin: '80px 0px 0px 0px', threshold: 0 }
    );
    
    if (observerTarget) observer.observe(observerTarget);
    
    return () => {
      if (observerTarget) observer.unobserve(observerTarget);
    };
  }, []);
  
  // GET 요청으로 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/login');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.name) {
          setUserName(data.name); // 사용자 이름을 상태에 설정
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };
    
    fetchUserInfo();
  }, []);
  
  return (
    <>
      <Box ref={observerRef} height="1px"/>
      
      <Box
        position="fixed"
        width="100%"
        top="0"
        zIndex="1000"
        transition="all 0.3s ease-in-out"
        bg={isScrolled ? 'rgba(234,234,234,0.6)' : 'transparent'}
        backdropFilter={isScrolled ? 'blur(10px)' : 'none'}
        color="white"
        px={4}
        py={3}
        shadow={isScrolled ? 'md' : 'none'}
      >
        <Flex align="center" maxW="1200px" mx="auto">
          <Link href="/">
            <Image
              src="/apple-touch-icon.png"
              alt="로고"
              boxSize={{ base: "46px", sm: "50px" }}
              objectFit="contain"
            />
          </Link>
          <Link href="/">
            <Center>
              <Text
                fontSize={{ base: "2xl", sm: "2xl" }}
                fontWeight="bold"
                ml={{ base: "6px", sm: 2 }}
                color="slategray"
                letterSpacing={{ base: "normal", sm: "wider" }}
              >
                Adance
              </Text>
            </Center>
          </Link>
          <Spacer/>
          {userName ? (
            <Flex alignItems="center">
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FaUserCircle />}
                  variant="ghost"
                  aria-label="Account options"
                  color={"rgb(178, 184, 192)"}
                  fontSize="2xl"
                  mx={2}
                />
                <MenuList color={"rgb(178, 184, 192)"}>
                  <MenuGroup title={`안녕하세요, ${userName}님!`}>
                    {/*<MenuItem>{userName || 'My Account'}</MenuItem> /!* 사용자 이름이 없으면 기본값으로 'My Account' 표시 *!/*/}
                  </MenuGroup>
                  {/*<MenuItem onClick={() => alert('프로필 보기')}>프로필 보기</MenuItem>*/}
                  {/*<MenuItem onClick={() => alert('설정')}>설정</MenuItem>*/}
                  <MenuItem onClick={() => router.push('/logout')}>로그아웃</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Link href={"/login"}>
              <Flex alignItems="center">
                  <Button
                    as={IconButton}
                    icon={<FaUserCircle />}
                    variant="ghost"
                    aria-label="Account options"
                    color={"rgb(178, 184, 192)"}
                    fontSize="2xl"
                    mx={2}
                  />
              </Flex>
            </Link>
          )}

        </Flex>
      </Box>
    </>
  );
}
