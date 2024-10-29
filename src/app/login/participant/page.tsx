'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/layout/nav";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl, FormHelperText,
  FormLabel,
  Heading,
  Image, Input,
  Text,
} from "@chakra-ui/react";
import Footer from "@/components/layout/footer";

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 정규식 검사: 숫자 8자리
    const codeRegex = /^\d{8}$/;
    if (!codeRegex.test(code)) {
      setError('이벤트 코드는 8자리 숫자여야 합니다.');
      return;
    }
    
    // 유효한 코드일 경우, 오류 메시지를 지우고 라우팅
    setError('');
    router.push(`/login/participant/${code}`);
  };
  
  return (
    <>
      <Navbar/>
      <Flex
        position={"fixed"}
        align="center"
        justify="center"
        w={"full"}
        h={"full"}
        bgColor={{base: "white", sm: "transparent"}}
      >
        <Box p={{base: 4, sm: 8}} w={{base: "full", sm: "600px"}} color={"rgb(178, 184, 192)"} mx={{base: 0, sm: 8}} borderRadius="2xl" bgColor={"white"} boxShadow={{base: " ", sm: "xl"}}>
          <Center>
            <Heading as={"h1"} fontSize={{base: "2xl", sm: "3xl"}} color={"black"}>
              {"'Adance' 에 로그인"}
              <Center>
                <Text color={"rgb(173, 177, 182)"} fontSize={{base: "xl", sm:"2xl"}} mt={{base: "0", sm: "1"}}>
                  이벤트에 참여
                </Text>
              </Center>
            </Heading>
          </Center>
          <Center>
            <Image
              src="/apple-touch-icon.png"
              alt="로고"
              boxSize={{base: "130px", sm:"146px"}}
              objectFit="contain"
            />
          </Center>
          <Box mt={{base: 2, sm: 4}}>
            <form onSubmit={handleSubmit}>
              <FormControl id="eventCode" isRequired={true}>
                <FormLabel>이밴트 코드</FormLabel>
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="8자리의 숫자조합"
                  variant="filled"
                  color={"black"}
                  h={{base: 12}}
                  maxLength={8}
                />
                <FormHelperText>{"QR코드를 스캔하면 로그인이 필요 없어요!"}</FormHelperText>
              </FormControl>
              
              <Button
                type="submit"
                boxSizing={"border-box"}
                mt={{base: 8, sm: 8}}
                mb={{base: 4, sm: 0}}
                w={"100%"}
                h={{base: "60px", sm: "60px"}}
                px={{base: "2", sm: "8"}}
                colorScheme="teal"
                bg={"rgb(50, 136, 255)"}
                color={"whiteAlpha.900"}
                _hover={{ bg: "rgb(29,122,255)", color: "white" }}
              >
                이밴트 참여하기
              </Button>
              {error && <Text color="red" textAlign="center" mt={2}>{error}</Text>}
            </form>
          </Box>
        </Box>
      </Flex>
      <Footer/>
    </>
  );
}
