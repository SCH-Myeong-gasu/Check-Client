// app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/layout/nav";
import {
  Box, Button,
  Center,
  Flex,
  FormControl, FormHelperText,
  FormLabel,
  Heading, IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import Footer from "@/components/layout/footer";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);
  
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const csrfToken = 'your-csrf-token'; // 미리 생성된 CSRF 토큰
      
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Registration failed');
      }
      
      setSuccess('Registration successful');
      router.push('/login/auth');  // 회원가입 성공 후 로그인 페이지로 이동
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input
  //       type="email"
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //       placeholder="Email"
  //       required
  //     />
  //     <input
  //       type="password"
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //       placeholder="Password"
  //       required
  //     />
  //     <button type="submit">Register</button>
  //     {error && <p style={{ color: 'red' }}>{error}</p>}
  //     {success && <p style={{ color: 'green' }}>{success}</p>}
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
      >
        <Box p={10} w={{base: "100%", sm: "600px"}} color={"rgb(178, 184, 192)"} mx={8} borderRadius="2xl" bgColor={"white"} boxShadow={"xl"}>
          <Center>
            <Heading as={"h1"} fontSize={{base: "2xl", sm: "3xl"}} color={"black"}>
              {"'Adance' 에 관리자 가입"}
              <Center>
                <Text color={"rgb(173, 177, 182)"} fontSize={{base: "xl", sm:"2xl"}} mt={{base: "0", sm: "1"}}>
                  관리자 계정 가입
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
              <FormControl id="username"  isRequired={true}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@@대학교"
                  variant="filled"
                  color={"black"}/>
                <FormHelperText>{"주최의 이름을 추천"}</FormHelperText>
              </FormControl>
              <FormControl id="email" mt={{ base: 2, sm: 3 }} isRequired={true}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  variant="filled"
                  color={"black"}/>
                {/*<FormHelperText>{"We'll never share your email."}</FormHelperText>*/}
                <FormHelperText>{"이메일 로그인 외 다른용도로 사용되지 않습니다."}</FormHelperText>
              </FormControl>
              <FormControl id="password" mt={{ base: 2, sm: 3 }} isRequired={true}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    variant="filled"
                    color="black"
                  />
                  <InputRightElement width="3rem">
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      onClick={handlePasswordVisibility}
                      color="gray.500"
                      bg="transparent"
                      _hover={{ color: 'gray.700' }}
                      size="sm"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button type="submit" mt={{base: 4, sm: 8}} w={"100%"} h={{base: "42px", sm: "50px"}} px={{base: "2", sm: "8"}} colorScheme="teal" bg={"rgb(50, 136, 255)"} color={"whiteAlpha.900"} _hover={{ bg: "rgb(29,122,255)", color: "white"}}>
                회원가입
              </Button>
              {error && <p style={{ color: 'red', position: "absolute", textAlign: "center"}}>{error}</p>}
              {success && <p style={{ color: 'green', position: "absolute", textAlign: "center"}}>{success}</p>}
            </form>
          </Box>
        </Box>
      </Flex>
      <Footer/>
    </>
  );
}
