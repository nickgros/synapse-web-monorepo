import{j as i}from"./jsx-runtime-Du8NFWEI.js";import{L as s}from"./react-router-dom-B2W9cIJ-.js";import{S as c}from"./SynapseConstants-DXE2bEuh.js";import{k as m}from"./SynapseClient-Dzk5gF_R.js";import"./index-Dl6G-zuu.js";import"./RegularExpressions-D6yUxzx6.js";import"./getEndpoint-CjoHA800.js";import"./OrientationBanner-D9RUUnWX.js";import{B as p}from"./Button-CLkrjdQe.js";const a=t=>{const{accessToken:l}=m(),r=!!l,e={...t},n={to:t.to,replace:t.replace};delete e.to,delete e.replace,r||(delete e.href,e.className=c);let o=i.jsx(p,{...e,children:e.children});return r&&n.to&&!e.href&&(o=i.jsx(s,{to:n.to,replace:n.replace,children:o})),o};try{a.displayName="LoginAwareButton",a.__docgenInfo={description:"",displayName:"LoginAwareButton",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}}}}}catch{}export{a as L};
