import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{r as t}from"./index-Dl6G-zuu.js";import{L as R}from"./react-router-dom-B2W9cIJ-.js";import{k as N,C as E,I as L}from"./SynapseClient-Dzk5gF_R.js";import"./OrientationBanner-D9RUUnWX.js";import"./RegularExpressions-D6yUxzx6.js";import"./getEndpoint-CjoHA800.js";import{d as f}from"./ToastMessage-C57fs1PG.js";import{u as q}from"./useChangePasswordFormState-DZL6nNeL.js";import{A as g}from"./Alert-Aa0bm5Nm.js";import{T as n}from"./TextField-CM8oUPj4.js";import{B as W}from"./Button-CLkrjdQe.js";import{L as k}from"./Link-Cl5bQMMR.js";const h="Your password was successfully changed.";function w(u){const{redirectToRoute:l,hideReset2FA:x=!1}=u,[i,P]=t.useState(""),[o,C]=t.useState(""),[d,y]=t.useState(""),[a,m]=t.useState(""),{accessToken:j}=N(),c=!!j,{data:r,isLoading:S}=E({enabled:c});t.useEffect(()=>{r&&a==""&&m(r.userName)},[a,r,r==null?void 0:r.userName]);const{promptForTwoFactorAuth:v,TwoFactorAuthPrompt:A,successfullyChangedPassword:T,isPending:_,handleChangePasswordWithCurrentPassword:b,error:p}=q({hideReset2FA:x}),F=s=>{s.preventDefault(),o!==d?f("Passwords do not match.","danger"):b(a,i,o)};return T?l?(f(h,"success"),e.jsx(L,{to:l})):e.jsx(g,{severity:"success",children:h}):e.jsxs("div",{children:[v?e.jsx(A,{}):e.jsxs("form",{onSubmit:s=>{F(s)},children:[!c&&e.jsx(n,{required:!0,fullWidth:!0,autoFocus:!0,autoComplete:"username",label:"Username or Email Address",id:"username",type:"text",value:a,onChange:s=>m(s.target.value)}),e.jsx(n,{fullWidth:!0,required:!0,margin:"normal",type:"password",id:"currentPassword",label:"Current password",onChange:s=>P(s.target.value),value:i}),e.jsx(n,{fullWidth:!0,required:!0,margin:"normal",type:"password",id:"newPassword",label:"New password",onChange:s=>C(s.target.value),value:o}),e.jsx(n,{fullWidth:!0,required:!0,margin:"normal",type:"password",id:"confirmPassword",label:"Confirm password",onChange:s=>y(s.target.value),value:d}),e.jsxs("div",{style:{marginTop:"30px"},children:[e.jsx(W,{sx:{marginRight:"26px"},disabled:!i||!o||!d||!a||S||_,variant:"contained",type:"submit",children:"Change Password"}),e.jsx(k,{component:R,to:"/resetPassword",sx:{display:"block",marginTop:"1em",marginLeft:"5px"},children:"Forgot password?"})]})]}),p&&e.jsx(g,{severity:"error",sx:{my:2},children:p.reason})]})}try{w.displayName="ChangePassword",w.__docgenInfo={description:"",displayName:"ChangePassword",props:{redirectToRoute:{defaultValue:null,description:"",name:"redirectToRoute",required:!1,type:{name:"string"}},hideReset2FA:{defaultValue:null,description:"",name:"hideReset2FA",required:!1,type:{name:"boolean"}}}}}catch{}export{w as C};
