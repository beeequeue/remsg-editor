import{Y as C,p as V,u as re,v as D,r as F,w as n,e as g,f as Y,K as I,F as u,q as Z,t as M,L as j,z as ae,Q as G,g as h,j as v,Z as se,_ as ne,a0 as z,n as A,x,a1 as q,a2 as K,a3 as ie}from"./svelte-BbASWu8j.js";import{a as k}from"./vendor-CEDgS92X.js";import"./buffer-FAyrCndp.js";import{F as Q,T as oe}from"./remsg-3-7CvhFK.js";import{M as le}from"./svelte-multiselect-BmTrng7W.js";import"./base64-js-B3UBCJxE.js";import"./ieee754-DOT7_fXj.js";(function(){const m=document.createElement("link").relList;if(m&&m.supports&&m.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function c(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=c(r);fetch(r.href,s)}})();const i=C({file:null});var ce=h('<div> </div> <textarea class="h-100px bg-#33221166 shadow-#00000099 b-color-amber rounded-lg p-3 shadow-md"></textarea>',1),fe=h('<div class="px-6 py-2"><h2 class="m-0"> </h2> <div class="w-450px flex flex-col"></div></div>');function de(L,m){V(m,!0);const c=I(()=>i.file?.entries[m.entryName]);var o=re(),r=D(o);F(r,()=>n(c)!=null,s=>{var p=fe(),b=v(p),N=v(b),P=u(b,2);Z(P,21,()=>m.languages,G,(R,y)=>{var w=ce(),O=D(w),_=v(O),E=u(O,2);M(()=>j(_,n(y))),ae(E,()=>n(c).strings[n(y)],B=>n(c).strings[n(y)]=B),g(R,w)}),M(()=>j(N,n(c).name)),g(s,p)}),g(L,o),Y()}var ue=h('<div class="bg-amber-9 bg-op-25 z-100 fixed flex h-full w-full items-center justify-center"><div class="w-350px max-w-80% h-250px text-30px bg-#111 text-shadow-lg b-3px b-amber-4 rounded-30px b-dashed flex items-center justify-center font-bold shadow-lg">Drop file</div></div>'),me=h('<div class="b-3 b-1px b-solid b-red-5 fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-lg bg-red-950 px-5 py-3">Invalid file</div>'),ve=h('<label for="file" class="h-75 w-75 b-1 b-amber b-solid flex cursor-pointer flex-col items-center justify-center rounded-2xl p-8"><span class="i-lucide:file-scan h-25 w-25"></span> <span class="text-center font-bold">Select/Drop <br> *.msg.* file</span></label>'),pe=h('<h1 class="m-0"> </h1> <div class="flex items-center gap-10"><div> </div> <div> </div> <button class="cursor-pointer rounded-lg">Export</button></div> <div class="mb-4 mt-2"><!></div> <div class="flex h-full w-full flex-col items-center overflow-auto"></div>',1),ge=h('<input id="file" type="file" hidden> <div class="flex h-full w-full flex-col items-center justify-center"><!> <!> <!></div>',1);function be(L,m){V(m,!0);const c=I(()=>Object.values(i.file?.entries??{}));let o=z(!1);ne(()=>{n(o)&&setTimeout(()=>{x(o,!1)},7500)});const r=I(()=>{const a=Object.keys(n(c)[0].strings),e=Object.fromEntries(a.map(t=>[t,!1]));for(const t of a)for(const l of n(c))l.strings[t]==null||l.strings[t].length===0||(e[t]=!0);return Object.entries(e).filter(([,t])=>t).map(([t])=>t)});let s=z(C(["en"]));const p=async a=>{const e=a.target.files;if(e==null||e.length===0)return;const t=e.item(0),l=Q(k.Buffer.from(await t.arrayBuffer())),f=Object.fromEntries(l.entries.map(d=>[d.name,d]));i.file={name:t.name,meta:l.meta,entries:f}};let b=z(!1);const N=a=>{x(b,!0),a.preventDefault()},P=()=>{x(b,!1)},R=async a=>{a.preventDefault(),x(o,!1);try{const e=a.dataTransfer.items[0].getAsFile(),t=Q(k.Buffer.from(await e.arrayBuffer())),l=Object.fromEntries(t.entries.map(f=>[f.name,f]));i.file={name:e.name,meta:t.meta,entries:l}}catch{x(o,!0)}x(b,!1)},y=()=>{if(i.file==null)return;const a=Object.values(i.file.entries),e={meta:i.file.meta,entries:a},t=oe(e),l=new Blob([t],{type:"application/octet-stream"}),f=URL.createObjectURL(l),d=document.createElement("a");d.href=f,d.download=i.file.name,d.click(),URL.revokeObjectURL(f),d.remove()};var w=ge(),O=D(w);O.__change=p;var _=u(O,2),E=v(_);F(E,()=>n(b),a=>{var e=ue();q(3,e,()=>K,()=>({duration:100})),g(a,e)});var B=u(E,2);F(B,()=>n(o),a=>{var e=me();q(3,e,()=>K,()=>({duration:250})),g(a,e)});var H=u(B,2);F(H,()=>i?.file==null,a=>{var e=ve();g(a,e)},a=>{var e=pe(),t=D(e),l=v(t),f=u(t,2),d=v(f),J=v(d),S=u(d,2),W=v(S),X=u(S,2);X.__click=y;var T=u(f,2),$=v(T);le($,{placeholder:"Languages",get options(){return n(r)},get selected(){return n(s)},set selected(U){x(s,C(U))},outerDivClass:"w-300px min-h-32px b-color-amber",liOptionClass:"color-#eee bg-#333"});var ee=u(T,2);Z(ee,21,()=>n(c),G,(U,te)=>{de(U,{get entryName(){return n(te).name},get languages(){return n(s)}})}),M(()=>{j(l,i.file.name),j(J,`Version ${i.file.meta.version??""}`),j(W,`${i.file.meta.attributes.length??""} attributes`)}),g(a,e)}),A("drop",_,R),A("dragover",_,N),A("dragleave",_,P),g(L,w),Y()}se(["change","click"]);ie(be,{target:document.getElementById("root")});
