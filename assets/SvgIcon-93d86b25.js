import{_ as y}from"./extends-98964cd2.js";import{_ as x}from"./objectWithoutPropertiesLoose-4f48578a.js";import{r as z}from"./index-f1f749bf.js";import{g as I,a as w,s as C,x as S,u as b,c as R,b as B}from"./styled-8837a0b3.js";import{a as M,j as T}from"./jsx-runtime-ad672792.js";function j(o){return I("MuiSvgIcon",o)}w("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const N=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],U=o=>{const{color:e,fontSize:t,classes:i}=o,l={root:["root",e!=="inherit"&&`color${S(e)}`,`fontSize${S(t)}`]};return B(l,j,i)},A=C("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[e.root,t.color!=="inherit"&&e[`color${S(t.color)}`],e[`fontSize${S(t.fontSize)}`]]}})(({theme:o,ownerState:e})=>{var t,i,l,m,a,s,c,v,r,n,p,f,d,u,h,g,$;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:"currentColor",flexShrink:0,transition:(t=o.transitions)==null||(i=t.create)==null?void 0:i.call(t,"fill",{duration:(l=o.transitions)==null||(m=l.duration)==null?void 0:m.shorter}),fontSize:{inherit:"inherit",small:((a=o.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((c=o.typography)==null||(v=c.pxToRem)==null?void 0:v.call(c,24))||"1.5rem",large:((r=o.typography)==null||(n=r.pxToRem)==null?void 0:n.call(r,35))||"2.1875rem"}[e.fontSize],color:(p=(f=(o.vars||o).palette)==null||(d=f[e.color])==null?void 0:d.main)!=null?p:{action:(u=(o.vars||o).palette)==null||(h=u.action)==null?void 0:h.active,disabled:(g=(o.vars||o).palette)==null||($=g.action)==null?void 0:$.disabled,inherit:void 0}[e.color]}}),_=z.forwardRef(function(e,t){const i=b({props:e,name:"MuiSvgIcon"}),{children:l,className:m,color:a="inherit",component:s="svg",fontSize:c="medium",htmlColor:v,inheritViewBox:r=!1,titleAccess:n,viewBox:p="0 0 24 24"}=i,f=x(i,N),d=y({},i,{color:a,component:s,fontSize:c,instanceFontSize:e.fontSize,inheritViewBox:r,viewBox:p}),u={};r||(u.viewBox=p);const h=U(d);return M(A,y({as:s,className:R(h.root,m),focusable:"false",color:v,"aria-hidden":n?void 0:!0,role:n?"img":void 0,ref:t},u,f,{ownerState:d,children:[l,n?T("title",{children:n}):null]}))});_.muiName="SvgIcon";const D=_;export{D as S};
//# sourceMappingURL=SvgIcon-93d86b25.js.map
