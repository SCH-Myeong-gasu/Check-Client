// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/layout/nav";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image, Input,
  Text,
  InputGroup,
  InputRightElement, IconButton
} from "@chakra-ui/react";
import Footer from "@/components/layout/footer";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);
  
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      // 토큰 저장
      localStorage.setItem('token', data.token);
      // router.push('/dashboard'); // 로그인 성공 후 대시보드로 이동
      // router.back();
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
  //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
  //     <button type="submit">Login</button>
  //     {error && <p style={{ color: 'red' }}>{error}</p>}
  //   </form>
  // );
  
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
                  관리자로 로그인
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
              <FormControl id="email" isRequired={false}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  variant="filled"
                  color={"black"}
                  h={{base: 12}}/>
                {/*<FormHelperText>{"We'll never share your email."}</FormHelperText>*/}
              </FormControl>
              <FormControl id="password" mt={{ base: 2, sm: 4 }} isRequired={false}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    variant="filled"
                    color="black"
                    h={{base: 12}}
                  />
                  <InputRightElement width="3rem">
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      onClick={handlePasswordVisibility}
                      color="gray.500"
                      bg="transparent"
                      _hover={{ color: 'gray.700' }}
                      size="md"
                      position={"relative"}
                      mt={"8px"}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button type="submit" boxSizing={"border-box"} mt={{base: 8, sm: 8}} mb={{base: 4, sm: 0}} w={"100%"} h={{base: "60px", sm: "60px"}} px={{base: "2", sm: "8"}} colorScheme="teal" bg={"rgb(50, 136, 255)"} color={"whiteAlpha.900"} _hover={{ bg: "rgb(29,122,255)", color: "white"}}>
                로그인
              </Button>
              {error && <p style={{ color: 'red', position: "absolute", textAlign: "center"}}>{error}</p>}
            </form>
          </Box>
        </Box>
      </Flex>
      <Footer/>
    </>
  );
}
