import{j as o}from"./jsx-runtime-Du8NFWEI.js";import{r as C}from"./index-Dl6G-zuu.js";import{c as _,d as B,e as U}from"./useThread-DGXR9WLK.js";import{k as c,q as d,p as V,o as p}from"./SynapseClient-Dzk5gF_R.js";import{u as g}from"./useMutation-UE6IyaEb.js";import{u as N}from"./useInfiniteQuery-DaW3aEf4.js";import"./OrientationBanner-D9RUUnWX.js";import"./RegularExpressions-D6yUxzx6.js";import"./getEndpoint-CjoHA800.js";import{g as b}from"./InfiniteQueryUtils-CKlRW-xB.js";import{M as A}from"./MarkdownEditor-Ij5xd66L.js";import{C as G,B as z}from"./HelpPopover-BieiPtoG.js";import{B as H}from"./Box-DRYT9rh3.js";import{F as W}from"./Form-DUuQEw8v.js";function ce(e,n,r,a,t,s){const{accessToken:i,keyFactory:m}=c();return N({...s,queryKey:m.getRepliesQueryKey(e,n,r,a,t),queryFn:async l=>d.getReplies(i,e,r,l.pageParam,a,n,t),initialPageParam:void 0,getNextPageParam:b})}function de(e,n){const{accessToken:r,keyFactory:a}=c(),t=async()=>{const s=await d.getReplyMessageUrl(e.messageKey,r);return(await fetch(s.messageUrl,{method:"GET",headers:{Accept:"*/*","Access-Control-Request-Headers":"authorization","Content-Type":"text/plain; charset=utf-8"}})).text()};return V({...n,queryKey:a.getReplyQueryKey(e.threadId,e.id,e.messageKey),queryFn:t})}function J(e){const n=p(),{accessToken:r,keyFactory:a}=c();return g({...e,mutationFn:t=>d.postReply(t,r),onSuccess:async(t,s,i)=>{await n.invalidateQueries({queryKey:a.getAllRepliesQueryKey(t.threadId)}),e!=null&&e.onSuccess&&await e.onSuccess(t,s,i)}})}function L(e){const n=p(),{accessToken:r,keyFactory:a}=c();return g({...e,mutationFn:t=>d.putReply(t,r),onSuccess:async(t,s,i)=>{await n.invalidateQueries({queryKey:a.getAllRepliesQueryKey(t.threadId)}),e!=null&&e.onSuccess&&await e.onSuccess(t,s,i)}})}function me(e){const n=p(),{accessToken:r,keyFactory:a}=c();return g({...e,mutationFn:t=>d.deleteReply(r,t.replyId),onSuccess:async(t,s,i)=>{await n.invalidateQueries({queryKey:a.getAllRepliesQueryKey(s.threadId)}),e!=null&&e.onSuccess&&await e.onSuccess(t,s,i)}})}const P=e=>{const{initialText:n,initialTitle:r,id:a,onClose:t,isReply:s,isDialog:i,openDialog:m}=e,[l,q]=C.useState(r??""),[y,S]=C.useState(n??""),{mutate:F,isPending:I}=_({onSuccess:()=>t()}),{mutate:k,isPending:w}=B({onSuccess:()=>t()}),{mutate:K,isPending:j}=U({onSuccess:()=>t()}),{mutate:Q,isPending:v}=J({onSuccess:()=>t()}),{mutate:E,isPending:M}=L({onSuccess:()=>t()}),D=w||v||j||I||M,f=!s&&r,h=(u,R)=>{s?n?E({replyId:a,messageMarkdown:u}):Q({threadId:a,messageMarkdown:u}):f?(F({title:R,threadId:a}),k({messageMarkdown:u,threadId:a})):K({forumId:a,title:R,messageMarkdown:u})},T=o.jsxs("div",{className:"bootstrap-4-backport",children:[!s&&o.jsx(W,{type:"text",placeholder:"Title",value:l,onChange:u=>q(u.target.value)}),o.jsx(A,{text:y,setText:S})]}),x=D?"Saving":"Save";return o.jsx(o.Fragment,{children:i?o.jsx(G,{maxWidth:"md",open:m,onCancel:t,title:s?"Edit Reply":f?"Edit Thread":"New Thread",content:T,onConfirm:()=>h(y,l),confirmButtonProps:{children:x}}):o.jsxs(o.Fragment,{children:[T,o.jsx(H,{display:"flex",justifyContent:"flex-end",children:o.jsx(z,{onCancel:t,onConfirm:()=>h(y,l),confirmButtonProps:{children:x}})})]})})};try{P.displayName="ForumThreadEditor",P.__docgenInfo={description:"",displayName:"ForumThreadEditor",props:{initialTitle:{defaultValue:null,description:"",name:"initialTitle",required:!1,type:{name:"string"}},initialText:{defaultValue:null,description:"",name:"initialText",required:!1,type:{name:"string"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},isReply:{defaultValue:null,description:"",name:"isReply",required:!0,type:{name:"boolean"}},isDialog:{defaultValue:null,description:"",name:"isDialog",required:!0,type:{name:"boolean"}},openDialog:{defaultValue:null,description:"",name:"openDialog",required:!1,type:{name:"boolean"}}}}}catch{}export{P as F,me as a,ce as b,de as u};
