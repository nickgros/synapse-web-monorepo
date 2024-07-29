import{j as o}from"./jsx-runtime-Du8NFWEI.js";import{r as C}from"./index-Dl6G-zuu.js";import{c as _,d as U,e as V}from"./useThread-BH6iP3_B.js";import{j as c,p as d,o as B,n as p}from"./SynapseClient-Dbc8tFdW.js";import{u as g}from"./useMutation-CmUrLdpa.js";import{u as N}from"./useInfiniteQuery-B9dT23yY.js";import"./OrientationBanner-x6ohh6pv.js";import"./EntityTypeUtils-BpOAC-k-.js";import"./getEndpoint-CjoHA800.js";import{g as b}from"./InfiniteQueryUtils-CKlRW-xB.js";import{M as A}from"./MarkdownEditor-CF1uSDK7.js";import{C as G,y as z}from"./HelpPopover-gM5cLes1.js";import{B as H}from"./Box-BlHPf8tq.js";import{F as W}from"./Form-B-tXQhez.js";function ce(e,s,r,a,t,n){const{accessToken:i,keyFactory:m}=c();return N({...n,queryKey:m.getRepliesQueryKey(e,s,r,a,t),queryFn:async l=>d.getReplies(i,e,r,l.pageParam,a,s,t),initialPageParam:void 0,getNextPageParam:b})}function de(e,s){const{accessToken:r,keyFactory:a}=c(),t=async()=>{const n=await d.getReplyMessageUrl(e.messageKey,r);return(await fetch(n.messageUrl,{method:"GET",headers:{Accept:"*/*","Access-Control-Request-Headers":"authorization","Content-Type":"text/plain; charset=utf-8"}})).text()};return B({...s,queryKey:a.getReplyQueryKey(e.threadId,e.id,e.messageKey),queryFn:t})}function J(e){const s=p(),{accessToken:r,keyFactory:a}=c();return g({...e,mutationFn:t=>d.postReply(t,r),onSuccess:async(t,n,i)=>{await s.invalidateQueries({queryKey:a.getAllRepliesQueryKey(t.threadId)}),e!=null&&e.onSuccess&&await e.onSuccess(t,n,i)}})}function L(e){const s=p(),{accessToken:r,keyFactory:a}=c();return g({...e,mutationFn:t=>d.putReply(t,r),onSuccess:async(t,n,i)=>{await s.invalidateQueries({queryKey:a.getAllRepliesQueryKey(t.threadId)}),e!=null&&e.onSuccess&&await e.onSuccess(t,n,i)}})}function me(e){const s=p(),{accessToken:r,keyFactory:a}=c();return g({...e,mutationFn:t=>d.deleteReply(r,t.replyId),onSuccess:async(t,n,i)=>{await s.invalidateQueries({queryKey:a.getAllRepliesQueryKey(n.threadId)}),e!=null&&e.onSuccess&&await e.onSuccess(t,n,i)}})}const P=e=>{const{initialText:s,initialTitle:r,id:a,onClose:t,isReply:n,isDialog:i,openDialog:m}=e,[l,S]=C.useState(r??""),[y,q]=C.useState(s??""),{mutate:F,isPending:I}=_({onSuccess:()=>t()}),{mutate:k,isPending:j}=U({onSuccess:()=>t()}),{mutate:w,isPending:K}=V({onSuccess:()=>t()}),{mutate:Q,isPending:v}=J({onSuccess:()=>t()}),{mutate:E,isPending:M}=L({onSuccess:()=>t()}),D=j||v||K||I||M,f=!n&&r,h=(u,R)=>{n?s?E({replyId:a,messageMarkdown:u}):Q({threadId:a,messageMarkdown:u}):f?(F({title:R,threadId:a}),k({messageMarkdown:u,threadId:a})):w({forumId:a,title:R,messageMarkdown:u})},T=o.jsxs("div",{className:"bootstrap-4-backport",children:[!n&&o.jsx(W,{type:"text",placeholder:"Title",value:l,onChange:u=>S(u.target.value)}),o.jsx(A,{text:y,setText:q})]}),x=D?"Saving":"Save";return o.jsx(o.Fragment,{children:i?o.jsx(G,{maxWidth:"md",open:m,onCancel:t,title:n?"Edit Reply":f?"Edit Thread":"New Thread",content:T,onConfirm:()=>h(y,l),confirmButtonProps:{children:x}}):o.jsxs(o.Fragment,{children:[T,o.jsx(H,{display:"flex",justifyContent:"flex-end",children:o.jsx(z,{onCancel:t,onConfirm:()=>h(y,l),confirmButtonProps:{children:x}})})]})})};try{P.displayName="ForumThreadEditor",P.__docgenInfo={description:"",displayName:"ForumThreadEditor",props:{initialTitle:{defaultValue:null,description:"",name:"initialTitle",required:!1,type:{name:"string"}},initialText:{defaultValue:null,description:"",name:"initialText",required:!1,type:{name:"string"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},isReply:{defaultValue:null,description:"",name:"isReply",required:!0,type:{name:"boolean"}},isDialog:{defaultValue:null,description:"",name:"isDialog",required:!0,type:{name:"boolean"}},openDialog:{defaultValue:null,description:"",name:"openDialog",required:!1,type:{name:"boolean"}}}}}catch{}export{P as F,me as a,ce as b,de as u};
