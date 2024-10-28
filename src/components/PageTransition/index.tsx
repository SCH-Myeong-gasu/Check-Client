// src/components/PageTransition.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait"> {/* mode='wait'로 수정 */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0.9, x: '0.8%' }}  // 왼쪽에서 시작
        animate={{ opacity: 1, x: 0 }}         // 현재 위치로 이동
        exit={{ opacity: 0, x: '100%' }}       // 오른쪽으로 이동
        transition={{ duration: 0.25 }}          // 전환 시간
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
