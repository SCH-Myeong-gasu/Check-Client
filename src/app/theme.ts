// // theme.ts
// import { extendTheme } from "@chakra-ui/react";
//
// const theme = extendTheme({
//   fonts: {
//     heading: "'Roboto', sans-serif",  // 제목에 사용할 폰트
//     body: "'Open Sans', sans-serif",   // 본문에 사용할 폰트
//   },
//   styles: {
//     global: {
//       html: {
//         fontSize: "16px", // 기본 폰트 크기
//       },
//       body: {
//         fontFamily: "body", // body 폰트 설정
//       },
//     },
//   },
// });
//
// export default theme;

import {extendTheme, theme as base} from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemCoorMode: false,
  },
  fonts: {
    heading: `var(--font-pretendard), ${base.fonts?.heading}, sans-serif`,  // 제목에 사용할 폰트
    body: `var(--font-pretendard), ${base.fonts.body}, sans-serif`,     // 본문에 사용할 폰트
  },
  styles: {
    global: {
      // "*": {
      //   fontFamily: `var(--font-pretendard),sans-serif`
      // },
    },
  },
  colors: {
    brand: {
      100: "#e9f2fd",
      // ...
      900: "#305fb5",
    },
  },
})

export default theme;
