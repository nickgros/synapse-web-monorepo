import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{j as g,k as E}from"./EntityTypeUtils-BpOAC-k-.js";import{g as x,B as b}from"./getEndpoint-CjoHA800.js";import{r as T}from"./SynapseClient-Dbc8tFdW.js";import"./OrientationBanner-x6ohh6pv.js";import"./index-Dl6G-zuu.js";import{u as k}from"./useEntity-DTL9CB3c.js";import{u as N}from"./useGetEntityHeaders-CiHDG0k5.js";import{E as c}from"./EntityIcon-BMzwz6ra.js";import{E as j}from"./ErrorChip-BDRyVjJN.js";import{L as I}from"./Link-DhsldE67.js";import{S as L}from"./Skeleton-BnDUWcOg.js";const f=u=>{const{entity:r,className:p,versionNumber:i,displayTextField:d="name",link:o=!0,showIcon:y=!0}=u;let t="";typeof r=="string"&&(t=r);const m=!!t&&typeof r=="string",{data:s,isLoading:h}=N(t,i,{enabled:m}),v=m&&s==null&&!h,{error:l}=k(t,i,{enabled:v});if(s||typeof r!="string"){const n=s??r;let a;return"concreteType"in n?a=g(n.concreteType):a=E(n),o?e.jsxs(I,{className:p,target:"_blank",rel:"noopener noreferrer",href:typeof o=="string"?o:`${x(b.PORTAL_ENDPOINT)}Synapse:${n.id}${i?`.${i}`:""}`,children:[y&&e.jsx(c,{type:a,style:{marginRight:"6px"}}),n[d]]}):e.jsxs("p",{className:p,children:[y&&e.jsx(c,{type:a,style:{marginRight:"6px"}}),n[d]]})}else return l?t?e.jsx(j,{chipText:t,error:l}):e.jsx(T,{error:l}):e.jsx(L,{variant:"rectangular",width:"100"})};try{f.displayName="EntityLink",f.__docgenInfo={description:"",displayName:"EntityLink",props:{entity:{defaultValue:null,description:"",name:"entity",required:!0,type:{name:"string | EntityHeader | Entity"}},versionNumber:{defaultValue:null,description:"",name:"versionNumber",required:!1,type:{name:"number"}},link:{defaultValue:null,description:"Whether the component should link to the entity page in Synapse. Link can be overriden by passing a string. Default true",name:"link",required:!1,type:{name:"string | boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},showIcon:{defaultValue:null,description:"Whether to display an icon identifying the entity type. Default true",name:"showIcon",required:!1,type:{name:"boolean"}},displayTextField:{defaultValue:null,description:"The field of the entity to display. Default is 'name'",name:"displayTextField",required:!1,type:{name:"enum",value:[{value:'"name"'},{value:'"type"'},{value:'"id"'},{value:'"modifiedOn"'},{value:'"modifiedBy"'},{value:'"benefactorId"'},{value:'"isLatestVersion"'},{value:'"versionNumber"'},{value:'"versionLabel"'},{value:'"createdOn"'},{value:'"createdBy"'},{value:'"description"'},{value:'"etag"'},{value:'"parentId"'},{value:'"concreteType"'}]}}}}}catch{}export{f as E};
