if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let l={};const o=e=>i(e,t),d={module:{uri:t},exports:l,require:o};s[t]=Promise.all(n.map((e=>d[e]||o(e)))).then((e=>(r(...e),l)))}}define(["./workbox-4723e66c"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-Bz9w6lxo.js",revision:null},{url:"assets/index-E1W45I6l.css",revision:null},{url:"assets/svelte-BQhP905-.js",revision:null},{url:"index.html",revision:"2d4a8453fdf969d6957dac0fe462f87e"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"icon.png",revision:"47d624585b4d34eb61236b0ae7296742"},{url:"manifest.webmanifest",revision:"a6b31821e63956bb211731319596c98f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
