import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{T}from"./SynapseTableConstants-2qH3fDlQ.js";import"./index-E5a9f4RA.js";import{I as y}from"./IconSvg-B_5LF0ig.js";import{D as h}from"./Dropdown-Sqg-5xfw.js";import{M as x}from"./Tooltip-CYVQ1vhC.js";import{I}from"./Icon-CseXEtUy.js";const V={place:"top"};function _(t,o,a){return"svgImg"in t?t.svgImg:e.jsx(y,{...t,sx:{color:o,width:a}})}const u=({image:t,callbackFn:o,tooltipText:a,className:n="",imageColor:d,tooltipVisualProps:c=V,children:l,darkTheme:s,size:g,icon:r})=>{const{place:f}=c,p=r?typeof r=="string"?e.jsx(I,{type:r}):r:void 0,m=p||(t?_(t,d,g):l||e.jsx(e.Fragment,{}));let i;return l?i=e.jsx("div",{className:"SRC-hand-cursor",children:l}):i=o?e.jsx("button",{tabIndex:0,className:`ElementWithTooltip SRC-hand-cursor SRC-grey-background-hover ${n} ${s?"dark-theme":""} `,onKeyPress:()=>o(),onClick:()=>o(),"aria-label":a,children:m}):e.jsx(h.Toggle,{className:`ElementWithTooltip SRC-hand-cursor SRC-grey-background-hover ${n} ${s?"dark-theme":""} `,variant:"light","aria-label":a,children:m}),e.jsx(x,{title:a,enterNextDelay:T,placement:f,"data-testid":"ElementTooltip",children:i})};try{u.displayName="ElementWithTooltip",u.__docgenInfo={description:"",displayName:"ElementWithTooltip",props:{image:{defaultValue:null,description:"",name:"image",required:!1,type:{name:"IconSvgProps | CustomImageProps"}},imageColor:{defaultValue:null,description:"",name:"imageColor",required:!1,type:{name:"string"}},tooltipText:{defaultValue:null,description:"",name:"tooltipText",required:!0,type:{name:"string"}},callbackFn:{defaultValue:null,description:"",name:"callbackFn",required:!1,type:{name:"(() => void)"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}},tooltipVisualProps:{defaultValue:{value:`{
  place: 'top',
}`},description:"",name:"tooltipVisualProps",required:!1,type:{name:"Partial<TooltipVisualProps>"}},darkTheme:{defaultValue:null,description:"",name:"darkTheme",required:!1,type:{name:"boolean"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}}}}}catch{}export{u as E};
