import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{C as u}from"./ConditionalWrapper-Be926PbJ.js";import{s as l}from"./styled-OgyJf9MH.js";import{A as h}from"./Avatar-CSnnTcUv.js";import{u as x}from"./utils-C1pLSGi5.js";import{S as g}from"./Skeleton-C2B0Utez.js";import{c as p}from"./createSvgIcon-BYNyJbGL.js";import{B as s}from"./Box-DRdN2jdb.js";import{B as C}from"./Button-mb55Lwfk.js";const f=p(e.jsx("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2m3.3 14.71L11 12.41V7h2v4.59l3.71 3.71z"}),"AccessTimeFilled"),k=p(e.jsx("path",{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"}),"CheckTwoTone"),v=p([e.jsx("path",{d:"M6 20h12V10H6zm6-7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2",opacity:".3"},"0"),e.jsx("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2M9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9zm9 14H6V10h12zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2"},"1")],"LockTwoTone");var y=(t=>(t.COMPLETE="COMPLETE",t.PENDING="PENDING",t.LOCKED="LOCKED",t.LOADING="LOADING",t))(y||{});const i={width:"20px"},L=l(h,{label:"AccessApprovalCheckMarkContainer"})({color:"white",height:"30px",width:"30px"});function c({status:t,sx:r}){const o=x();let n,a=e.jsx(e.Fragment,{});switch(t){case"COMPLETE":n=o.palette.success.main,a=e.jsx(k,{sx:i});break;case"PENDING":n="#395979",a=e.jsx(f,{sx:i});break;case"LOCKED":n="#FF9B00",a=e.jsx(v,{sx:i});break}return e.jsx(L,{"data-testid":`AccessApprovalCheckMark-${t}`,sx:{backgroundColor:n,...r},children:e.jsx(u,{condition:t==="LOADING",wrapper:g,wrapperProps:{variant:"circular",sx:{minHeight:"30px",minWidth:"30px"}},children:a})})}try{c.displayName="AccessApprovalCheckMark",c.__docgenInfo={description:"Renders an icon for a RequirementItem based on the status prop.",displayName:"AccessApprovalCheckMark",props:{status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:"enum",value:[{value:'"COMPLETE"'},{value:'"PENDING"'},{value:'"LOCKED"'},{value:'"LOADING"'}]}},sx:{defaultValue:null,description:"",name:"sx",required:!1,type:{name:"SxProps"}}}}}catch{}const A=l(s,{label:"RequirementContainer"})({display:"grid",gridTemplateRows:"50px auto auto",gridTemplateColumns:"30px auto",columnGap:"20px",alignItems:"center",margin:"1rem 0 2rem"}),E=l(s,{label:"InlineButtonContainer"})(({theme:t})=>({display:"flex",gap:t.spacing(2),margin:`${t.spacing(1)} 0`}));function d(t){const{actions:r,status:o,children:n}=t;return e.jsxs(A,{"data-testid":"RequirementItem",children:[e.jsx(c,{status:o,sx:{gridRow:"1 / span 1",gridColumn:"1 / span 1",margin:"auto"}}),e.jsx(s,{sx:{gridColumn:"2 / span 1",gridRow:"1 / span 2",alignSelf:"start",mt:"12px"},children:n}),r&&!!r.length&&e.jsxs(e.Fragment,{children:[e.jsx(s,{sx:{gridColumnStart:1,gridRow:"2 / span 1",width:"1px",height:"100%",backgroundColor:"grey.400",margin:"auto"}}),e.jsx(s,{sx:a=>({gridColumnStart:1,gridRow:"3 / span 1",width:"50%",height:"60%",borderLeft:`1px solid ${a.palette.grey[400]}`,borderBottom:`1px solid ${a.palette.grey[400]}`,marginLeft:"auto",marginBottom:"auto",marginRight:"0"})})]}),r&&!!r.length&&e.jsx(E,{sx:{gridColumnStart:2,gridRow:"3 / span 1",mt:2},children:r.map((a,m)=>e.jsx(C,{disabled:o==="LOADING",...a},m))})]})}try{d.displayName="RequirementItem",d.__docgenInfo={description:`Renders a single requirement item, which includes a checkmark, the requirement text, and any required actions. This
component represents one condition (of potentially many) that a user must meet to gain access to data.

This component does not make requests to external stores and is side-effect free. Variations in the displayed
component are controlled entirely by props`,displayName:"RequirementItem",props:{status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:"enum",value:[{value:'"COMPLETE"'},{value:'"PENDING"'},{value:'"LOCKED"'},{value:'"LOADING"'}]}},actions:{defaultValue:null,description:"",name:"actions",required:!1,type:{name:"ButtonProps[]"}}}}}catch{}export{k as C,v as L,d as R,y as a};
