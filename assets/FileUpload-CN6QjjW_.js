import{j as o}from"./jsx-runtime-Du8NFWEI.js";import{R as g}from"./index-Dl6G-zuu.js";import{h as b,I as C}from"./ApplicationSessionManager-CECkmrBg.js";import{B as U}from"./Button-mb55Lwfk.js";const i=n=>{const{id:c,buttonProps:p={variant:"contained"},label:d="Browse...",onUploadStart:r,onComplete:l}=n,{accessToken:u}=b(),a=g.useRef(null),f=()=>{var e;a!=null&&a.current&&((e=a.current)==null||e.click())},m=async e=>{if(e.target.files&&e.target.files.length>0){r&&r();const s=e.target.files[0],y=t=>{console.log(`Progress: ${t.value} / ${t.total}`)};try{const t=await C(u,s.name,s,void 0,void 0,y);l&&l({success:!0,resp:t})}catch(t){console.log("FileUpload: fail to upload file",t),l&&l({success:!1,error:t})}}};return o.jsxs(o.Fragment,{children:[o.jsx("input",{type:"file",ref:a,onChange:e=>{m(e)},style:{display:"none"}}),o.jsx(U,{id:c,onClick:f,...p,children:d})]})};try{i.displayName="FileUpload",i.__docgenInfo={description:"",displayName:"FileUpload",props:{id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},buttonProps:{defaultValue:null,description:"",name:"buttonProps",required:!1,type:{name:"ButtonProps"}},onUploadStart:{defaultValue:null,description:"",name:"onUploadStart",required:!1,type:{name:"(() => void)"}},onComplete:{defaultValue:null,description:"",name:"onComplete",required:!1,type:{name:"((response: UploadCallbackResp) => void)"}}}}}catch{}export{i as F};
