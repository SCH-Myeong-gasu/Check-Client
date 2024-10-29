// // /app/logout/page.tsx
// 'use client';
//
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
//
// export default function LogoutPage() {
//   const router = useRouter();
//
//   useEffect(() => {
//     // 로그아웃 API 호출하여 JWT 쿠키 제거
//     const logout = async () => {
//       await fetch('/api/logout', { method: 'GET', credentials: 'include' });
//       // 메인 페이지로 리디렉션
//       router.push('/');
//     };
//
//     logout();
//   }, [router]);
//
//   return null; // 별도의 UI 없이 바로 처리
// }

// // app/logout/page.tsx
// 'use client';
//
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
//
// export default function LogoutPage() {
//   const router = useRouter();
//
//   useEffect(() => {
//     // 로그아웃 시 localStorage에서 JWT token 삭제
//     const logout = () => {
//       localStorage.removeItem('token');  // localStorage에서 토큰 제거
//       router.push('/login');  // 로그아웃 후 로그인 페이지로 리다이렉트
//     };
//
//     logout();
//   }, [router]);
//
//   return null;  // UI가 필요 없는 경우 null 반환
// }

// app/logout/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  
  useEffect(() => {
    const logout = async () => {
      localStorage.removeItem('token'); // localStorage에서 토큰 제거
      
      // 로그아웃 API 호출
      await fetch('/api/logout');
      
      // 로그아웃 후 로그인 페이지로 강제 리로드하여 리다이렉트
      setTimeout(() => {
        router.replace('/');
      }, 100); // localStorage가 갱신되도록 약간의 지연시간 추가
    };
    
    logout(); // 로그아웃 함수 호출
  }, [router]);
  
  return null; // 컴포넌트는 아무것도 렌더링하지 않음
}


