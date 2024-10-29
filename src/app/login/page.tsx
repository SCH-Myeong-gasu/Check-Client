import Navbar from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text
} from "@chakra-ui/react";
import Link from "next/link";

const Index = () => {
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
        <Box p={{base: 6, sm: 8}} w={{base: "100%", sm: "600px"}} color={"rgb(178, 184, 192)"} mx={8} borderRadius="2xl" bgColor={"white"} boxShadow={"xl"}>
          <Center>
            <Heading as={"h1"} fontSize={{base: "2xl", sm: "3xl"}} color={"black"}>
              {"'Adance' 에 로그인"}
              <Center>
                <Text color={"rgb(173, 177, 182)"} fontSize={{base: "xl", sm:"2xl"}} mt={{base: "0", sm: "1"}}>
                  로그인 방식 선택
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
            <Center>
              <Text fontSize={"sm"} color={"gray.700"} textAlign={"center"} px={4} mb={2}>참여 QR코드를 카메라로 인식하면 행사 코드를 입력할 필요가 없어요!</Text>
            </Center>
            <Link href={"/login/participant"}>
              <Button w={"100%"} h={{base: "50px", sm: "54px"}} px={{base: "2", sm: "8"}} colorScheme="teal" bg={"rgb(50, 136, 255)"} color={"whiteAlpha.900"} _hover={{ bg: "rgb(29,122,255)", color: "white"}}>
                참여자로 로그인
              </Button>
            </Link>
            <Link href={"/login/auth"}>
              <Button w={"100%"} h={{base: "50px", sm: "54px"}} mt={{base: "3", sm: "4"}} px={{base: "2", sm: "8"}} colorScheme="teal" bg={"gray.100"} color={"slategray"} _hover={{ bg: "rgb(29,122,255)", color: "white"}}>
                관리자로 로그인
              </Button>
            </Link>
          </Box>
        </Box>
      </Flex>
      <Footer/>
    </>
  );
}

export default Index;