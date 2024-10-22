import {Box, Flex, Text, Button, Spacer, Link, Image, Center} from '@chakra-ui/react';
import {motion} from "framer-motion";

export default function Navbar() {
  return (
    <Box position="fixed" width="100%" >
      <motion.div
        initial={{
          y: -20,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          ease: "easeInOut",
          duration: 0.75,
          delay: 0.2
        }}
      >
        <Box width="100%" as="nav" bg="blue.400" color="white" px={4} py={3} shadow="md">
          <Flex align="center" maxW="1200px" mx="auto">
            {/* 로고 */}
            <Link href="/">
              <Image
                src="/sch_logo.png" // public 폴더에 로고 파일을 넣고 경로를 지정
                alt="순천향대 로고"
                boxSize="50px"
                objectFit="contain"
              />
            </Link>
            <Center>
              <Text fontSize="lg" fontWeight="bold" ml={4}>
                학술대회 축제 출석 체크
              </Text>
            </Center>
            
            <Spacer/>
            
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
      </motion.div>
    </Box>
);
}
