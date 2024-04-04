import{_ as l}from"./emotion-use-insertion-effect-with-fallbacks.browser.esm-Bpxk95mn.js";import{D as I,_ as P,g as _,a as z,b as T}from"./createTheme-CwlmBDro.js";import{r as p}from"./index-Dl6G-zuu.js";import{s as d,u as A,c as E}from"./styled-OgyJf9MH.js";import{c as N}from"./createSvgIcon-BYNyJbGL.js";import{j as t}from"./jsx-runtime-Du8NFWEI.js";import{B as U}from"./ButtonBase-5SeL_6IU.js";import{T as L}from"./Typography-B88_J_TK.js";import{a as H}from"./Grow-DYov3NPi.js";const O=N(t.jsx("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),W=["slots","slotProps"],q=d(U)(({theme:e})=>l({display:"flex",marginLeft:`calc(${e.spacing(1)} * 0.5)`,marginRight:`calc(${e.spacing(1)} * 0.5)`},e.palette.mode==="light"?{backgroundColor:e.palette.grey[100],color:e.palette.grey[700]}:{backgroundColor:e.palette.grey[700],color:e.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":l({},e.palette.mode==="light"?{backgroundColor:e.palette.grey[200]}:{backgroundColor:e.palette.grey[600]}),"&:active":l({boxShadow:e.shadows[0]},e.palette.mode==="light"?{backgroundColor:I(e.palette.grey[200],.12)}:{backgroundColor:I(e.palette.grey[600],.12)})})),D=d(O)({width:24,height:16});function V(e){const{slots:o={},slotProps:n={}}=e,a=P(e,W),r=e;return t.jsx("li",{children:t.jsx(q,l({focusRipple:!0},a,{ownerState:r,children:t.jsx(D,l({as:o.CollapsedIcon,ownerState:r},n.collapsedIcon))}))})}function F(e){return z("MuiBreadcrumbs",e)}const G=_("MuiBreadcrumbs",["root","ol","li","separator"]),J=G,K=["children","className","component","slots","slotProps","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],Q=e=>{const{classes:o}=e;return E({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},F,o)},X=d(L,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:(e,o)=>[{[`& .${J.li}`]:o.li},o.root]})({}),Y=d("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:(e,o)=>o.ol})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),Z=d("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:(e,o)=>o.separator})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function ee(e,o,n,a){return e.reduce((r,u,c)=>(c<e.length-1?r=r.concat(u,t.jsx(Z,{"aria-hidden":!0,className:o,ownerState:a,children:n},`separator-${c}`)):r.push(u),r),[])}const oe=p.forwardRef(function(o,n){const a=A({props:o,name:"MuiBreadcrumbs"}),{children:r,className:u,component:c="nav",slots:h={},slotProps:v={},expandText:B="Show path",itemsAfterCollapse:f=1,itemsBeforeCollapse:g=1,maxItems:b=8,separator:y="/"}=a,M=P(a,K),[S,k]=p.useState(!1),i=l({},a,{component:c,expanded:S,expandText:B,itemsAfterCollapse:f,itemsBeforeCollapse:g,maxItems:b,separator:y}),m=Q(i),w=H({elementType:h.CollapsedIcon,externalSlotProps:v.collapsedIcon,ownerState:i}),R=p.useRef(null),$=s=>{const C=()=>{k(!0);const j=R.current.querySelector("a[href],button,[tabindex]");j&&j.focus()};return g+f>=s.length?s:[...s.slice(0,g),t.jsx(V,{"aria-label":B,slots:{CollapsedIcon:h.CollapsedIcon},slotProps:{collapsedIcon:w},onClick:C},"ellipsis"),...s.slice(s.length-f,s.length)]},x=p.Children.toArray(r).filter(s=>p.isValidElement(s)).map((s,C)=>t.jsx("li",{className:m.li,children:s},`child-${C}`));return t.jsx(X,l({ref:n,component:c,color:"text.secondary",className:T(m.root,u),ownerState:i},M,{children:t.jsx(Y,{className:m.ol,ref:R,ownerState:i,children:ee(S||b&&x.length<=b?x:$(x),m.separator,y,i)})}))}),de=oe;export{de as B};
