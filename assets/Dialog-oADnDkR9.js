import{g as X,a as Y,h as i,b as e,_ as z,d as g}from"./createTheme-Dtzk88yv.js";import{r as c}from"./index-Dl6G-zuu.js";import{s as d,u as H,c as K}from"./styled-BEXTB4Ho.js";import{u as V}from"./utils-C59yjAo_.js";import{j as s}from"./jsx-runtime-Du8NFWEI.js";import{B as q}from"./Backdrop-BL2E68hn.js";import{M as G}from"./Modal-S_AqnaVi.js";import{P}from"./Paper-B2c6t1gu.js";import{u as J}from"./Grow-CspkvTld.js";import{F as O}from"./Fade-DX0GMli6.js";function Q(a){return Y("MuiDialog",a)}const W=X("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]),Z=c.createContext({}),oo=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],ao=d(q,{name:"MuiDialog",slot:"Backdrop",overrides:(a,o)=>o.backdrop})({zIndex:-1}),ro=a=>{const{classes:o,scroll:r,maxWidth:l,fullWidth:n,fullScreen:u}=a,m={root:["root"],container:["container",`scroll${i(r)}`],paper:["paper",`paperScroll${i(r)}`,`paperWidth${i(String(l))}`,n&&"paperFullWidth",u&&"paperFullScreen"]};return K(m,Q,o)},eo=d(G,{name:"MuiDialog",slot:"Root",overridesResolver:(a,o)=>o.root})({"@media print":{position:"absolute !important"}}),io=d("div",{name:"MuiDialog",slot:"Container",overridesResolver:(a,o)=>{const{ownerState:r}=a;return[o.container,o[`scroll${i(r.scroll)}`]]}})(({ownerState:a})=>e({height:"100%","@media print":{height:"auto"},outline:0},a.scroll==="paper"&&{display:"flex",justifyContent:"center",alignItems:"center"},a.scroll==="body"&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&::after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})),lo=d(P,{name:"MuiDialog",slot:"Paper",overridesResolver:(a,o)=>{const{ownerState:r}=a;return[o.paper,o[`scrollPaper${i(r.scroll)}`],o[`paperWidth${i(String(r.maxWidth))}`],r.fullWidth&&o.paperFullWidth,r.fullScreen&&o.paperFullScreen]}})(({theme:a,ownerState:o})=>e({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},o.scroll==="paper"&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},o.scroll==="body"&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!o.maxWidth&&{maxWidth:"calc(100% - 64px)"},o.maxWidth==="xs"&&{maxWidth:a.breakpoints.unit==="px"?Math.max(a.breakpoints.values.xs,444):`max(${a.breakpoints.values.xs}${a.breakpoints.unit}, 444px)`,[`&.${W.paperScrollBody}`]:{[a.breakpoints.down(Math.max(a.breakpoints.values.xs,444)+32*2)]:{maxWidth:"calc(100% - 64px)"}}},o.maxWidth&&o.maxWidth!=="xs"&&{maxWidth:`${a.breakpoints.values[o.maxWidth]}${a.breakpoints.unit}`,[`&.${W.paperScrollBody}`]:{[a.breakpoints.down(a.breakpoints.values[o.maxWidth]+32*2)]:{maxWidth:"calc(100% - 64px)"}}},o.fullWidth&&{width:"calc(100% - 64px)"},o.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${W.paperScrollBody}`]:{margin:0,maxWidth:"100%"}})),fo=c.forwardRef(function(o,r){const l=H({props:o,name:"MuiDialog"}),n=V(),u={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{"aria-describedby":m,"aria-labelledby":B,BackdropComponent:M,BackdropProps:S,children:$,className:j,disableEscapeKeyDown:k=!1,fullScreen:F=!1,fullWidth:R=!1,maxWidth:T="sm",onBackdropClick:C,onClose:x,open:D,PaperComponent:w=P,PaperProps:v={},scroll:N="paper",TransitionComponent:A=O,transitionDuration:y=u,TransitionProps:E}=l,I=z(l,oo),p=e({},l,{disableEscapeKeyDown:k,fullScreen:F,fullWidth:R,maxWidth:T,scroll:N}),h=ro(p),b=c.useRef(),L=t=>{b.current=t.target===t.currentTarget},U=t=>{b.current&&(b.current=null,C&&C(t),x&&x(t,"backdropClick"))},f=J(B),_=c.useMemo(()=>({titleId:f}),[f]);return s.jsx(eo,e({className:g(h.root,j),closeAfterTransition:!0,components:{Backdrop:ao},componentsProps:{backdrop:e({transitionDuration:y,as:M},S)},disableEscapeKeyDown:k,onClose:x,open:D,ref:r,onClick:U,ownerState:p},I,{children:s.jsx(A,e({appear:!0,in:D,timeout:y,role:"presentation"},E,{children:s.jsx(io,{className:g(h.container),onMouseDown:L,ownerState:p,children:s.jsx(lo,e({as:w,elevation:24,role:"dialog","aria-describedby":m,"aria-labelledby":f},v,{className:g(h.paper,v.className),ownerState:p,children:s.jsx(Z.Provider,{value:_,children:$})}))})}))}))});export{fo as D,Z as a,W as d};
