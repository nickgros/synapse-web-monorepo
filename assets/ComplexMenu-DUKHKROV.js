import{j as o}from"./jsx-runtime-Du8NFWEI.js";import{D as d}from"./DropdownMenu-BYrOZslg.js";import{I as u}from"./IconSvgButton-0Yt1LG7B.js";import{I as c}from"./IconSvg-KrLXYQAC.js";import{u as x}from"./utils-DDqOmLXv.js";import{u as f}from"./useMediaQuery-DfCTVEwh.js";import{B as t}from"./Box-CaFleW7-.js";import{B as h}from"./Button-DtfaTZY_.js";import{T as w}from"./Typography-DrqHmlDD.js";function r(n){const{iconButtons:i=[],dropdownMenus:s=[]}=n,p=x(),a=f(p.breakpoints.down("sm"));return o.jsxs(t,{sx:e=>({display:"flex",alignItems:"center",gap:"10px",[e.breakpoints.down("sm")]:{flexDirection:"column",paddingTop:"10px"}}),children:[i.map(e=>a&&e.tooltipText?o.jsx(t,{sx:{width:"100%",textAlign:"center"},children:o.jsx(h,{variant:"text",startIcon:o.jsx(c,{icon:e.icon,wrap:!1,fontSize:"inherit"},e.tooltipText),onClick:e.onClick,sx:{padding:"6px 12px",minWidth:"unset"},children:o.jsx(w,{variant:"buttonLink",children:e.tooltipText})})}):o.jsx(u,{...e},e.tooltipText)),s.map((e,m)=>e.items&&e.items.length>0&&o.jsx(t,{sx:l=>({[l.breakpoints.down("sm")]:{width:"100%",".MuiButton-root":{width:"100%"}}}),children:o.jsx(d,{...e},m)}))]})}try{r.displayName="ComplexMenu",r.__docgenInfo={description:`The ComplexMenu component allows you to create a generic menu with
icon buttons and multiple dropdown menus that contain groups of items.`,displayName:"ComplexMenu",props:{iconButtons:{defaultValue:null,description:"",name:"iconButtons",required:!1,type:{name:"IconSvgButtonProps[]"}},dropdownMenus:{defaultValue:null,description:"",name:"dropdownMenus",required:!1,type:{name:"DropdownMenuProps[]"}}}}}catch{}export{r as C};
