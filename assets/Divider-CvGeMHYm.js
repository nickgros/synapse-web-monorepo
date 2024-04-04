import{d as D,_ as R,b as C}from"./createTheme-CwlmBDro.js";import{_ as e}from"./emotion-use-insertion-effect-with-fallbacks.browser.esm-Bpxk95mn.js";import{r as w}from"./index-Dl6G-zuu.js";import{s as f,u as L,c as W}from"./styled-OgyJf9MH.js";import{g as $}from"./dividerClasses-Cc_Ns5us.js";import{j as v}from"./jsx-runtime-Du8NFWEI.js";const I=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],_=t=>{const{absolute:i,children:r,classes:l,flexItem:s,light:n,orientation:o,textAlign:a,variant:c}=t;return W({root:["root",i&&"absolute",c,n&&"light",o==="vertical"&&"vertical",s&&"flexItem",r&&"withChildren",r&&o==="vertical"&&"withChildrenVertical",a==="right"&&o!=="vertical"&&"textAlignRight",a==="left"&&o!=="vertical"&&"textAlignLeft"],wrapper:["wrapper",o==="vertical"&&"wrapperVertical"]},$,l)},j=f("div",{name:"MuiDivider",slot:"Root",overridesResolver:(t,i)=>{const{ownerState:r}=t;return[i.root,r.absolute&&i.absolute,i[r.variant],r.light&&i.light,r.orientation==="vertical"&&i.vertical,r.flexItem&&i.flexItem,r.children&&i.withChildren,r.children&&r.orientation==="vertical"&&i.withChildrenVertical,r.textAlign==="right"&&r.orientation!=="vertical"&&i.textAlignRight,r.textAlign==="left"&&r.orientation!=="vertical"&&i.textAlignLeft]}})(({theme:t,ownerState:i})=>e({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},i.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},i.light&&{borderColor:t.vars?`rgba(${t.vars.palette.dividerChannel} / 0.08)`:D(t.palette.divider,.08)},i.variant==="inset"&&{marginLeft:72},i.variant==="middle"&&i.orientation==="horizontal"&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},i.variant==="middle"&&i.orientation==="vertical"&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},i.orientation==="vertical"&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},i.flexItem&&{alignSelf:"stretch",height:"auto"}),({ownerState:t})=>e({},t.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}}),({theme:t,ownerState:i})=>e({},i.children&&i.orientation!=="vertical"&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(t.vars||t).palette.divider}`}}),({theme:t,ownerState:i})=>e({},i.children&&i.orientation==="vertical"&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(t.vars||t).palette.divider}`}}),({ownerState:t})=>e({},t.textAlign==="right"&&t.orientation!=="vertical"&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},t.textAlign==="left"&&t.orientation!=="vertical"&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})),B=f("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(t,i)=>{const{ownerState:r}=t;return[i.wrapper,r.orientation==="vertical"&&i.wrapperVertical]}})(({theme:t,ownerState:i})=>e({display:"inline-block",paddingLeft:`calc(${t.spacing(1)} * 1.2)`,paddingRight:`calc(${t.spacing(1)} * 1.2)`},i.orientation==="vertical"&&{paddingTop:`calc(${t.spacing(1)} * 1.2)`,paddingBottom:`calc(${t.spacing(1)} * 1.2)`})),m=w.forwardRef(function(i,r){const l=L({props:i,name:"MuiDivider"}),{absolute:s=!1,children:n,className:o,component:a=n?"div":"hr",flexItem:c=!1,light:p=!1,orientation:x="horizontal",role:g=a!=="hr"?"separator":void 0,textAlign:b="center",variant:u="fullWidth"}=l,A=R(l,I),d=e({},l,{absolute:s,component:a,flexItem:c,light:p,orientation:x,role:g,textAlign:b,variant:u}),h=_(d);return v.jsx(j,e({as:a,className:C(h.root,o),role:g,ref:r,ownerState:d},A,{children:n?v.jsx(B,{className:h.wrapper,ownerState:d,children:n}):null}))});m.muiSkipListHighlight=!0;const E=m;export{E as D};
