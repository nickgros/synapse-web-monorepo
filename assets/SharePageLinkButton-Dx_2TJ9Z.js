import{j as n}from"./jsx-runtime-Du8NFWEI.js";import{r as c}from"./index-Dl6G-zuu.js";import{u as l}from"./useMutation-DjwfMZ6R.js";import{d as u}from"./ToastMessage-D2kHMoYi.js";import{I as d}from"./IconSvg-KrLXYQAC.js";import{B as m}from"./Button-DtfaTZY_.js";function r({shortIoPublicApiKey:t,domain:a="sageb.io",buttonProps:i}){const e=c.useCallback(o=>{navigator.clipboard.writeText(o).then(()=>{u("Page URL copied to the clipboard","success")})},[]),{mutate:s}=l({mutationFn:async()=>{if(t){const o=await fetch("https://api.short.io/links/public",{method:"POST",headers:{Authorization:t,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({originalURL:window.location.href,domain:a})});if(!o.ok){const p=await o.text();throw new Error(p)}return(await o.json()).shortURL}else return window.location.href},onSuccess:o=>{e(o)},onError:o=>{console.error(o),e(window.location.href)}});return n.jsx(m,{variant:"contained",onClick:()=>{s()},...i,startIcon:n.jsx(d,{icon:"contentCopy",wrap:!1}),children:"Share Page Link"})}try{r.displayName="SharePageLinkButton",r.__docgenInfo={description:"",displayName:"SharePageLinkButton",props:{shortIoPublicApiKey:{defaultValue:null,description:"",name:"shortIoPublicApiKey",required:!1,type:{name:"string"}},domain:{defaultValue:{value:"sageb.io"},description:"",name:"domain",required:!1,type:{name:"string"}},buttonProps:{defaultValue:null,description:"",name:"buttonProps",required:!1,type:{name:"ButtonProps"}}}}}catch{}export{r as S};
