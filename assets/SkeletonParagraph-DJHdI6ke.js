import{j as t}from"./jsx-runtime-Du8NFWEI.js";import{r as a}from"./index-Dl6G-zuu.js";import{t as m}from"./times-BBjFlw2U.js";import{S as c}from"./Skeleton-CW6YXi1_.js";function o({numRows:e=5,rowHeight:r,className:i}){const[l,p]=a.useState([]);return a.useEffect(()=>{const s=[];m(e,n=>{s.push(t.jsx(a.Fragment,{children:t.jsx(c,{height:r,width:n===e-1?"35%":"100%"})},n))}),p(s)},[e,r]),t.jsx("div",{className:i,children:l})}try{o.displayName="SkeletonParagraph",o.__docgenInfo={description:"Skeleton component designed to mimic a paragraph.",displayName:"SkeletonParagraph",props:{numRows:{defaultValue:{value:"5"},description:"",name:"numRows",required:!1,type:{name:"number"}},rowHeight:{defaultValue:null,description:"",name:"rowHeight",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}export{o as S};
