import{j as a}from"./jsx-runtime-Du8NFWEI.js";import{r as m}from"./index-Dl6G-zuu.js";import{u as f}from"./uniqueId-DePWDRrE.js";import{T as h}from"./Typography-B88_J_TK.js";const d=e=>{const{checked:r=!1,hideLabel:s=!1,isSelectAll:c=!1,disabled:o=!1,onChange:l}=e,[t]=m.useState(f("src-checkbox-")),u=i=>{c&&i.target.checked===!1?l(!0):l(i.target.checked)};let n="checkbox";return e.className&&(n+=` ${e.className}`),a.jsxs("div",{className:n,onClick:e.onClick,children:[a.jsx("input",{"aria-label":"aria-label"in e?e["aria-label"]:e.label,type:"checkbox",checked:r,id:t,onChange:u,disabled:o,"data-testid":e["data-testid"]}),a.jsx(h,{sx:{lineHeight:"20px"},component:"label",variant:"smallText1",htmlFor:t,children:s?a.jsx(a.Fragment,{}):e.label}),e.children??a.jsx(a.Fragment,{})]})};try{d.displayName="Checkbox",d.__docgenInfo={description:"",displayName:"Checkbox",props:{hideLabel:{defaultValue:null,description:"",name:"hideLabel",required:!1,type:{name:"boolean"}},checked:{defaultValue:null,description:"",name:"checked",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(newValue: boolean) => void"}},isSelectAll:{defaultValue:null,description:"",name:"isSelectAll",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"((event: SyntheticEvent<HTMLDivElement, Event>) => void)"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},"data-testid":{defaultValue:null,description:"",name:"data-testid",required:!1,type:{name:"string"}},"aria-label":{defaultValue:null,description:"",name:"aria-label",required:!1,type:{name:"string"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"ReactNode"}}}}}catch{}export{d as C};
