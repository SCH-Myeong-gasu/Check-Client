// app/layout.tsx
import { Providers } from './providers';
import localFont from 'next/font/local';

import './globals.css';
import {rgba} from "color2k";

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export default function RootLayout({children}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='ko'>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="theme-color" content="#f3f4f7"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <title>Adance</title>
    </head>
    <body className={`${pretendard.variable} font-pretendard`} style={{background: rgba(243, 244, 247, 1)}}>
    <Providers>{children}</Providers>
    </body>
    </html>
  )
}