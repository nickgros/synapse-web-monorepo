import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{r as a}from"./index-Dl6G-zuu.js";import{C as c}from"./OrientationBanner-x6ohh6pv.js";import{L as d}from"./SynapseClient-Dbc8tFdW.js";import{E as s}from"./SynapseConstants-Br5dMy50.js";import{a as f}from"./index.prod-CtaNrJ90.js";import{u as x}from"./utils-C59yjAo_.js";import{B as u}from"./Box-BlHPf8tq.js";import{T as h}from"./Typography-qpntpuFp.js";import{T as E}from"./Tooltip-BZeYxe44.js";import{I as g}from"./IconButton-cf2NThiY.js";import{I as y}from"./InfoOutlined-erQdz4z_.js";const M="This mode gives you early access to features that are still in development. Please note that we do not guarantee an absence of errors, and that the data created using these features may be lost during product upgrade.",n=()=>{const[o,t]=a.useState(!1),i=new c;let r=!0;const m=x();a.useEffect(()=>(r&&d()&&t(!0),()=>{r=!1}),[]);const l=()=>{i.set(s,{path:"/"}),t(!0)},p=()=>{document.cookie=`${s}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`,t(!1)};return e.jsxs(u,{sx:{display:"flex",alignItems:"center"},children:[e.jsx(h,{variant:"body1",children:"Experimental Mode"}),e.jsx(E,{title:M,arrow:!0,placement:"top",children:e.jsx(g,{"aria-label":"info",color:"inherit",sx:{"&:hover":{backgroundColor:"transparent"}},children:e.jsx(y,{sx:{verticalAlign:"middle"}})})}),e.jsx(f,{width:35,height:20,onColor:m.palette.secondary.main,checkedIcon:!1,uncheckedIcon:!1,checked:o,onChange:o?p:l})]})};try{n.displayName="ExperimentalMode",n.__docgenInfo={description:"",displayName:"ExperimentalMode",props:{}}}catch{}export{n as E};
