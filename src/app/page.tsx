'use client';

import Navbar from "../components/layout/nav";
import {Box, Flex, Heading, IconButton, Text} from "@chakra-ui/react";
// import Footer from "@/components/layout/footer";
import Link from "next/link";
import {AiFillHome, AiFillPlusCircle, AiOutlineSearch, AiOutlineSetting} from "react-icons/ai";
import PageTransition from "@/components/PageTransition";
import {useEffect, useState} from "react";

export default function Home() {
  
  const [userData, setUserData] = useState('');
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/login');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data) {
          setUserData(data); // 사용자 이름을 상태에 설정
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };
    
    fetchUserInfo();
  }, []);
  
  return (
    <>
      <Navbar/>
      <PageTransition>
        {userData ? (
        <>
          <Box p={4} pt={20}>
            <Heading>
              참가중인 이벤트가 있어요!
            </Heading>
            <Box rounded={"2xl"} bg={"white"}>
              {/*<Text>{eventName}</Text>*/}
            </Box>
          </Box>
        </>
        ) : (
          <Box p={4} pt={20}>
            <Heading as="h1">안녕하세요, Pretendard!</Heading>
            <Text>여기에서 Pretendard 폰트가 사용됩니다.</Text>
          </Box>
        )}
      </PageTransition>
      <nav>
        <Box
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          // bg={colorMode === 'dark' ? 'gray.800' : 'white'}
          boxShadow="md"
          borderTop="1px"
          borderLeft={{base: "1px", md: 0}}
          borderRight={{base: "1px", md: 0}}
          borderTopRightRadius={{base: "2xl", lg: "0"}}
          borderTopLeftRadius={{base: "2xl", lg: "0"}}
          borderColor="#f3f4f4"
        >
          <Flex justify="space-around" pt={{base: "1px"}} pb={{base: "4"}} px={{base: "2"}}>
            <Link href="/" passHref>
              <Flex direction="column" align="center">
                <IconButton
                  aria-label="Home"
                  icon={<AiFillHome/>}
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
                  icon={<AiOutlineSearch/>}
                  variant="ghost"
                  fontSize="2xl"
                />
                <Text fontSize="sm">이벤트</Text> {/* 텍스트 추가 */}
              </Flex>
            </Link>
            <Link href="/add" passHref>
              <Flex direction="column" align="center">
                <IconButton
                  aria-label="Add"
                  icon={<AiFillPlusCircle/>}
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
                  icon={<AiOutlineSetting/>}
                  variant="ghost"
                  fontSize="2xl"
                />
                <Text fontSize="sm">설정</Text> {/* 텍스트 추가 */}
              </Flex>
            </Link>
          </Flex>
        </Box>
      </nav>
    </>
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="https://nextjs.org/icons/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
    //       <li className="mb-2">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
    //           src/app/page.tsx
    //         </code>
    //         .
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>
    //
    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="https://nextjs.org/icons/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
  );
}
