import{a as p,j as r}from"./jsx-runtime-ad672792.js";import{av as h,b_ as g,aN as v}from"./SynapseContext-d9d41f69.js";import{P as E}from"./getEndpoint-5374ab4d.js";import{u as T}from"./useEntity-a144a0c2.js";import{E as y}from"./EntityIcon-f23da3c2.js";import{E as N}from"./ErrorChip-75b9daa3.js";import{S as _}from"./Skeleton-cff63b1c.js";const m=o=>{const{entity:t,className:s,versionNumber:a,displayTextField:u="name",link:c=!0,showIcon:f=!0}=o;let n="";typeof t=="string"&&(n=t);const{data:d,error:l}=T(n,a,{enabled:!!n&&typeof t=="string"});if(d||typeof t!="string"){const e=d??t;let i;return"concreteType"in e?i=h(e.concreteType):i=g(e),c?p("a",{className:s,target:"_blank",rel:"noopener noreferrer",href:`${E.PORTAL}#!Synapse:${e.id}${a?`.${a}`:""}`,children:[f&&r(y,{type:i,style:{marginRight:"6px"}}),e[u]]}):p("p",{className:s,children:[r(y,{type:i,style:{marginRight:"6px"}}),e[u]]})}else return l?n?r(N,{chipText:n,error:l}):r(v,{error:l}):r(_,{variant:"rectangular",width:"100"})};try{m.displayName="EntityLink",m.__docgenInfo={description:"",displayName:"EntityLink",props:{entity:{defaultValue:null,description:"",name:"entity",required:!0,type:{name:"string | Entity | EntityHeader"}},versionNumber:{defaultValue:null,description:"",name:"versionNumber",required:!1,type:{name:"number"}},link:{defaultValue:null,description:"Whether the component should link to the entity page in Synapse. Default true",name:"link",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},showIcon:{defaultValue:null,description:"Whether to display an icon identifying the entity type. Default true",name:"showIcon",required:!1,type:{name:"boolean"}},displayTextField:{defaultValue:null,description:"The field of the entity to display. Default is 'name'",name:"displayTextField",required:!1,type:{name:"enum",value:[{value:'"id"'},{value:'"etag"'},{value:'"createdOn"'},{value:'"name"'},{value:'"description"'},{value:'"concreteType"'},{value:'"modifiedOn"'},{value:'"createdBy"'},{value:'"modifiedBy"'},{value:'"parentId"'}]}}}}}catch{}export{m as E};
//# sourceMappingURL=EntityLink-1d61bd54.js.map
