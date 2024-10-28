// components/BottomNav.tsx
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { AiFillHome, AiOutlineSearch, AiFillPlusCircle, AiOutlineSetting } from 'react-icons/ai'; // react-icons에서 아이콘 가져오기
import Link from 'next/link';

const BottomNav = () => {
  // const { colorMode } = useColorMode();
  
  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      // bg={colorMode === 'dark' ? 'gray.800' : 'white'}
      boxShadow="md"
      borderTop="1px"
      borderLeft={{ base: "1px", md: 0 }}
      borderRight={{ base: "1px", md: 0 }}
      borderTopRightRadius={{ base: "2xl", lg: "0" }}
      borderTopLeftRadius={{ base: "2xl", lg: "0" }}
      borderColor="#f3f4f4"
    >
      <Flex justify="space-around" p={4}>
        <Link href="/" passHref>
          <Flex direction="column" align="center">
            <IconButton
              aria-label="Home"
              icon={<AiFillHome />}
              variant="ghost"
              fontSize="2xl"
            />
            <Text fontSize="sm">홈</Text> {/* 텍스트 추가 */}
          </Flex>
        </Link>
        <Link href="/search" passHref>
          <Flex direction="column" align="center">
            <IconButton
              aria-label="Search"
              icon={<AiOutlineSearch />}
              variant="ghost"
              fontSize="2xl"
            />
            <Text fontSize="sm">검색</Text> {/* 텍스트 추가 */}
          </Flex>
        </Link>
        <Link href="/add" passHref>
          <Flex direction="column" align="center">
            <IconButton
              aria-label="Add"
              icon={<AiFillPlusCircle />}
              variant="ghost"
              fontSize="2xl"
            />
            <Text fontSize="sm">추가</Text> {/* 텍스트 추가 */}
          </Flex>
        </Link>
        <Link href="/settings" passHref>
          <Flex direction="column" align="center">
            <IconButton
              aria-label="Settings"
              icon={<AiOutlineSetting />}
              variant="ghost"
              fontSize="2xl"
            />
            <Text fontSize="sm">설정</Text> {/* 텍스트 추가 */}
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
};

export default BottomNav;
