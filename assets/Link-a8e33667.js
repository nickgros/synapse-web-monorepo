import{_ as B}from"./objectWithoutPropertiesLoose-4f48578a.js";import{_ as a}from"./extends-98964cd2.js";import{r as y}from"./index-f1f749bf.js";import{a as j,g as M,N as x,j as N,s as _,x as h,u as P,c as U,b as z}from"./styled-8837a0b3.js";import{j as W}from"./jsx-runtime-ad672792.js";import{T as H}from"./Typography-f5dd8748.js";import{a as w}from"./TransitionGroupContext-a2b6e27b.js";import{u as E}from"./useForkRef-dd8a6e5c.js";function I(e){return M("MuiLink",e)}const O=j("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),S=O,g={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},q=e=>g[e]||e,G=({theme:e,ownerState:o})=>{const n=q(o.color),r=x(e,`palette.${n}`,!1)||o.color,s=x(e,`palette.${n}Channel`);return"vars"in e&&s?`rgba(${s} / 0.4)`:N(r,.4)},J=G,K=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],Q=e=>{const{classes:o,component:n,focusVisible:r,underline:s}=e,t={root:["root",`underline${h(s)}`,n==="button"&&"button",r&&"focusVisible"]};return z(t,I,o)},X=_(H,{name:"MuiLink",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:n}=e;return[o.root,o[`underline${h(n.underline)}`],n.component==="button"&&o.button]}})(({theme:e,ownerState:o})=>a({},o.underline==="none"&&{textDecoration:"none"},o.underline==="hover"&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},o.underline==="always"&&a({textDecoration:"underline"},o.color!=="inherit"&&{textDecorationColor:J({theme:e,ownerState:o})},{"&:hover":{textDecorationColor:"inherit"}}),o.component==="button"&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${S.focusVisible}`]:{outline:"auto"}})),Y=y.forwardRef(function(o,n){const r=P({props:o,name:"MuiLink"}),{className:s,color:t="primary",component:c="a",onBlur:u,onFocus:p,TypographyClasses:C,underline:k="always",variant:d="inherit",sx:l}=r,L=B(r,K),{isFocusVisibleRef:m,onBlur:V,onFocus:v,ref:F}=w(),[D,f]=y.useState(!1),R=E(n,F),T=i=>{V(i),m.current===!1&&f(!1),u&&u(i)},$=i=>{v(i),m.current===!0&&f(!0),p&&p(i)},b=a({},r,{color:t,component:c,focusVisible:D,underline:k,variant:d}),A=Q(b);return W(X,a({color:t,className:U(A.root,s),classes:C,component:c,onBlur:T,onFocus:$,ref:R,ownerState:b,variant:d,sx:[...Object.keys(g).includes(t)?[]:[{color:t}],...Array.isArray(l)?l:[l]]},L))}),ao=Y;export{ao as L};
//# sourceMappingURL=Link-a8e33667.js.map
