import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{s as w}from"./SynapseClient-Dzk5gF_R.js";import{m as E,a as I}from"./SynapseConstants-DXE2bEuh.js";import{r as g}from"./index-Dl6G-zuu.js";import{g as _}from"./queryUtils-BR9UJ07O.js";import"./RegularExpressions-D6yUxzx6.js";import"./getEndpoint-CjoHA800.js";import{u as M}from"./useGetQueryResultBundle-CtnpR5Gz.js";import{u as S}from"./useShowDesktop-CPh-208G.js";import"./OrientationBanner-D9RUUnWX.js";import{M as y}from"./HelpPopover-BieiPtoG.js";import{E as b}from"./ExpandableContent-B_o0IfWJ.js";function l({data:s}){const[t,a]=g.useState(0);return e.jsxs("div",{className:"control-container",children:[e.jsxs("div",{className:"button-container",children:[s==null?void 0:s.map((o,r)=>e.jsx("button",{className:t===r?"isSelected":"",onClick:()=>a(r),children:o.name},o.name)),e.jsx("button",{className:"gap-fill"})]}),e.jsx("div",{className:"content-container",children:s==null?void 0:s.map((o,r)=>{const{ownerId:n,wikiId:i}=o;return e.jsx("span",{className:t===r?"":"hide",children:e.jsx(y,{ownerId:n,wikiId:i})},n)})})]})}try{l.displayName="ResourcesDesktop",l.__docgenInfo={description:"",displayName:"ResourcesDesktop",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"Data"}}}}}catch{}function u({data:s}){return e.jsx("div",{className:"Resources_Mobile",children:s.map(({name:t,ownerId:a,wikiId:o})=>{const r=e.jsxs(e.Fragment,{children:[" ",t," "]}),n=e.jsx(y,{ownerId:a,wikiId:o});return e.jsx(b,{title:r,content:n},t)})})}try{u.displayName="ResourcesMobile",u.__docgenInfo={description:"",displayName:"ResourcesMobile",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"Data"}}}}}catch{}const x=s=>{var d;const{entityId:t}=s,a=S(),o={concreteType:"org.sagebionetworks.repo.model.table.QueryBundleRequest",entityId:t,partMask:E|I,query:{sql:`SELECT Name, Wiki FROM ${t} ORDER BY ItemOrder`}},{data:r,error:n}=M(o),i=_("Name",r),R=_("Wiki",r),p=((d=r==null?void 0:r.queryResult)==null?void 0:d.queryResults.rows.map(f=>{const c=f.values;c.some(h=>h===null)&&console.warn("Row has null value(s) when no nulls expected");const N=c[i],m=(c[R]??"").split("/"),j=m[0],k=m[2];return{name:N,ownerId:j,wikiId:k}}))??[];return e.jsxs("div",{className:"Resources",children:[e.jsx(w,{error:n}),a?e.jsx(l,{data:p}):e.jsx(u,{data:p})]})};try{x.displayName="Resources",x.__docgenInfo={description:"",displayName:"Resources",props:{entityId:{defaultValue:null,description:"",name:"entityId",required:!0,type:{name:"string"}}}}}catch{}export{x as R};
