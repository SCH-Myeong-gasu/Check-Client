if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>n(e,i),b={module:{uri:i},exports:c,require:r};s[i]=Promise.all(a.map((e=>b[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"3cc234f6168a33d720e03bfb9865e8b5"},{url:"/_next/static/chunks/117-8de0ff4798cda0a9.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/168-1c2d8dcd3c9a0e86.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/180-f7ba863b7f74d0a5.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/218-8f297ce8f585759c.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/22-3c982ea9cbcb7f13.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/238-33aa94b928b15e94.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/268-7d89e39da7a5cb5a.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/364-b7cad21dc754aa02.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/479ba886-64f675f75dd52427.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/614-b708a0f89a4087bc.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/8e1d74a4-bf17c2eb3bd22a2f.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/965-234c1f2054cd7433.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/996-9ce28e12582e527a.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/_not-found/page-887a6b78f334643d.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/admin/events/%5BeventCode%5D/page-f9e7921e2274109e.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/admin/events/%5BeventCode%5D/participants/page-4db37191b0a3ad6d.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/admin/events/page-b3293dbb8ec4b751.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/check/%5BeventId%5D/%5BcheckCode%5D/page-3978f200de2b7eb9.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/check/-%5Bcode%5D/page-70cd7945eff4e1b7.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/layout-5268f1425506f0f9.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/login/auth/page-8a0662ff8cf09700.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/login/auth/register/page-f52c667e559d1b94.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/login/page-84cb465185728019.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/login/participant/%5BeventCode%5D/page-483ecd8fe129f082.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/login/participant/page-2e77ea2b3240e633.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/logout/page-2cbdff2df3ca0108.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/not-found-19f0a7ee415d30f9.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/page-65857ba6482fb740.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/qr/%5BeventCode%5D/%5BcheckCode%5D/page-1725b72133ff1b5f.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/app/search/page-0ea31700269b64f4.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/fd9d1056-7eae19b39069738a.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/framework-00a8ba1a63cfdc9e.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/main-app-2c9756ed137b511a.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/main-c2add58e7325b96f.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/pages/_app-15e2daefa259f0b5.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/pages/_error-28b803cb2479b966.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-d97142d60cea9792.js",revision:"rSSObuJESmg1bdAe2b6Cd"},{url:"/_next/static/css/28f2880d7ab852f3.css",revision:"28f2880d7ab852f3"},{url:"/_next/static/media/ff840cfebfb63b0c-s.p.woff2",revision:"302ec55f5b4320354ec6b35a53dead87"},{url:"/_next/static/rSSObuJESmg1bdAe2b6Cd/_buildManifest.js",revision:"172e769da91baa11de9b258fb2d92f86"},{url:"/_next/static/rSSObuJESmg1bdAe2b6Cd/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/android-chrome-192x192.png",revision:"a7e441515826bf188c365495f4b408ab"},{url:"/android-chrome-512x512.png",revision:"3ca97be75970d1927b0803eb3ae13fb3"},{url:"/apple-touch-icon.png",revision:"73a6a705f27df65ae7b164b314276692"},{url:"/favicon-16x16.png",revision:"fc297336b066b5ebb9c8db59005b4297"},{url:"/favicon-32x32.png",revision:"fa8c8616715a4d3c1350ff80eff4a934"},{url:"/favicon.ico",revision:"2d3451da5b4f7084be44df3e1dd99d82"},{url:"/fonts/PretendardVariable.woff2",revision:"302ec55f5b4320354ec6b35a53dead87"},{url:"/manifest.json",revision:"d6479be12cde0cc7ce63285c0045a82f"},{url:"/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
