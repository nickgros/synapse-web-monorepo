import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{r as s}from"./index-Dl6G-zuu.js";import{C as f}from"./OrientationBanner-D9CLn5zV.js";import{L as u}from"./useFiles-DlHdYvDe.js";import{d as i}from"./SynapseConstants-B1OhJYgL.js";import{a as h}from"./index.prod-CtaNrJ90.js";import{u as x}from"./utils-DDqOmLXv.js";import{B as E}from"./Box-CaFleW7-.js";import{T as I}from"./Typography-DrqHmlDD.js";import{T as y}from"./Tooltip-D8c5U2qR.js";import{I as M}from"./IconButton-BIc9jQ57.js";import{I as _}from"./InfoOutlined-CgkZO6RQ.js";const l="experimental-mode",g="This mode gives you early access to features that are still in development. Please note that we do not guarantee an absence of errors, and that the data created using these features may be lost during product upgrade.";function m({onExperimentalModeToggle:t}){const[r,o]=s.useState(!1),a=new f;let n=!0;const p=x();s.useEffect(()=>(n&&u()&&o(!0),()=>{n=!1}),[]);const d=()=>{a.set(i,"true",{path:"/"}),o(!0),t&&t(!0)},c=()=>{a.remove(i,{path:"/"}),o(!1),t&&t(!1)};return e.jsxs(E,{sx:{display:"flex",alignItems:"center"},children:[e.jsx(I,{component:"label",variant:"body1",htmlFor:l,children:"Experimental Mode"}),e.jsx(y,{title:g,arrow:!0,placement:"top",children:e.jsx(M,{"aria-label":"info",color:"inherit",sx:{"&:hover":{backgroundColor:"transparent"}},children:e.jsx(_,{sx:{verticalAlign:"middle"}})})}),e.jsx(h,{id:l,width:35,height:20,onColor:p.palette.secondary.main,checkedIcon:!1,uncheckedIcon:!1,checked:r,onChange:r?c:d})]})}try{m.displayName="ExperimentalMode",m.__docgenInfo={description:"",displayName:"ExperimentalMode",props:{onExperimentalModeToggle:{defaultValue:null,description:"",name:"onExperimentalModeToggle",required:!1,type:{name:"((newValue: boolean) => void)"}}}}}catch{}export{m as E};
