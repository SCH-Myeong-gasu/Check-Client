'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text, Button, Image, Spacer, Link, Center } from '@chakra-ui/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  
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
  
  return (
    <>
      {/* 감시할 더미 요소 */}
      <Box ref={observerRef} height="1px" />
      
      {/* 네비게이션 바 */}
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
          {/* 로고 */}
          <Link href="/">
            <Image
              src="/apple-touch-icon.png"
              alt="로고"
              boxSize="50px"
              objectFit="contain"
            />
          </Link>
          <Link href="/">
            <Center>
              <Text fontSize="lg" fontWeight="bold" ml={4} color={"slategray"}>
                Adance
              </Text>
            </Center>
          </Link>
          <Spacer />
          
          {/* 메뉴 */}
          <Flex>
            <Link href="/about" mx={4}>
              <Button variant="ghost" colorScheme="whiteAlpha">
                About
              </Button>
            </Link>
            <Link href="/login" mx={4}>
              <Button variant="ghost" colorScheme="whiteAlpha">
                Login
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
