import{g as f,a as g,d as c,_ as N,b as x}from"./createTheme-CwlmBDro.js";import{_ as r}from"./emotion-use-insertion-effect-with-fallbacks.browser.esm-Bpxk95mn.js";import{r as d}from"./index-Dl6G-zuu.js";import{s as P,r as U,u as _,c as G}from"./styled-OgyJf9MH.js";import{a as $}from"./List-DP5ytkvU.js";import{j as M}from"./jsx-runtime-Du8NFWEI.js";import{B as w}from"./ButtonBase-5SeL_6IU.js";import{d as O}from"./dividerClasses-Cc_Ns5us.js";import{a as E,u as S}from"./useForkRef-CEBgoE3Z.js";function ie(e){return g("MuiListItemIcon",e)}const H=f("MuiListItemIcon",["root","alignItemsFlexStart"]),L=H;function ne(e){return g("MuiListItemText",e)}const z=f("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]),k=z;function D(e){return g("MuiMenuItem",e)}const W=f("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),n=W,q=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],A=(e,t)=>{const{ownerState:s}=e;return[t.root,s.dense&&t.dense,s.divider&&t.divider,!s.disableGutters&&t.gutters]},J=e=>{const{disabled:t,dense:s,divider:a,disableGutters:l,selected:p,classes:o}=e,i=G({root:["root",s&&"dense",t&&"disabled",!l&&"gutters",a&&"divider",p&&"selected"]},D,o);return r({},o,i)},K=P(w,{shouldForwardProp:e=>U(e)||e==="classes",name:"MuiMenuItem",slot:"Root",overridesResolver:A})(({theme:e,ownerState:t})=>r({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${n.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:c(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${n.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:c(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${n.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:c(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:c(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${n.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${n.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${O.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${O.inset}`]:{marginLeft:52},[`& .${k.root}`]:{marginTop:0,marginBottom:0},[`& .${k.inset}`]:{paddingLeft:36},[`& .${L.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&r({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${L.root} svg`]:{fontSize:"1.25rem"}}))),Q=d.forwardRef(function(t,s){const a=_({props:t,name:"MuiMenuItem"}),{autoFocus:l=!1,component:p="li",dense:o=!1,divider:b=!1,disableGutters:i=!1,focusVisibleClassName:R,role:T="menuitem",tabIndex:v,className:B}=a,V=N(a,q),y=d.useContext($),C=d.useMemo(()=>({dense:o||y.dense||!1,disableGutters:i}),[y.dense,o,i]),u=d.useRef(null);E(()=>{l&&u.current&&u.current.focus()},[l]);const j=r({},a,{dense:C.dense,divider:b,disableGutters:i}),m=J(a),F=S(u,s);let I;return a.disabled||(I=v!==void 0?v:-1),M.jsx($.Provider,{value:C,children:M.jsx(K,r({ref:F,role:T,tabIndex:I,component:p,focusVisibleClassName:x(m.focusVisible,R),className:x(m.root,B)},V,{ownerState:j,classes:m}))})}),re=Q;export{re as M,ne as a,ie as g,k as l};
