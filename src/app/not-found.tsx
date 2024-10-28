import {NextPage} from "next";
import {Box, Button, Heading, Link, Text} from "@chakra-ui/react";

const Index: NextPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.100"
      textAlign="center"
      padding="20px"
    >
      <Heading as="h1" size="4xl" color="red.500">
        404
      </Heading>
      <Text fontSize="2xl" marginY="20px">
        페이지를 찾을 수 없습니다.
      </Text>
      <Link href="/">
        <Button colorScheme="teal" size="lg">
          홈으로 돌아가기
        </Button>
      </Link>
    </Box>
  );
}

export default Index;