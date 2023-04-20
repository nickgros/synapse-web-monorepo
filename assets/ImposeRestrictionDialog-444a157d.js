import{a as t,j as e}from"./jsx-runtime-ad672792.js";import{R as y}from"./index-f1f749bf.js";import{R as C}from"./RadioGroup-2b4593e6.js";import{F as b}from"./FullWidthAlert-d2f0fc35.js";import{I}from"./IconSvg-44530777.js";import"./SynapseContext-d9d41f69.js";import{b as v}from"./useAccessRequirements-6eca9c35.js";import{d as l}from"./ToastMessage-306d2a68.js";import{H as S}from"./AccessRequirementList-52bb58ef.js";import{b as x,D,a as _}from"./DialogContent-5fd82e31.js";import{D as k}from"./DialogTitle-cd610631.js";import{S as A}from"./Stack-e5639b81.js";import{B as R}from"./Box-2e3c1244.js";import{I as T}from"./IconButton-404fc885.js";import{F as w,j as H}from"./InputLabel-3d19a161.js";import{B as d}from"./Button-e0234af7.js";import{T as N}from"./Typography-f5dd8748.js";function c(a){const m=t(N,{variant:"smallText1",children:["Sage Bionetworks does not typically impose conditions for use on non-human data unless there is a legal, ethical or regulatory reason to do so. If you want to add conditions for use to this content, please contact the Synapse Access and Compliance Team (ACT) to discuss at"," ",e("a",{href:"mailto:act@sagebase.org",children:"act@sagebase.org"}),"."]}),{entityId:n,open:p,onClose:o}=a,[i,u]=y.useState(void 0),{mutate:f,isLoading:r}=v({onSuccess:()=>{l("Successfully imposed restriction","success"),o()},onError:s=>{l(`Failed to impose restriction: ${s.reason}`,"danger")}});function h(){i?f(n):o()}function g(s){u(s)}return t(x,{open:p,onClose:o,maxWidth:"sm",fullWidth:!0,children:[e(k,{children:t(A,{direction:"row",alignItems:"center",gap:"5px",children:["Conditions for Use",e(S,{markdownText:"Conditions for use describes data use requirements that must be fulfilled before downloading.",helpUrl:"https://help.synapse.org/docs/Sharing-Settings,-Permissions,-and-Conditions-for-Use.2024276030.html#SharingSettings,Permissions,andConditionsforUse-ConditionsforUse"}),e(R,{sx:{flexGrow:1}}),e(T,{onClick:o,children:e(I,{icon:"close",wrap:!1,sx:{color:"grey.700"}})})]})}),e(D,{children:t(w,{sx:{width:"100%"},children:[e(H,{id:"demo-radio-buttons-group-label",children:"Is this sensitive human data that must be protected?"}),e(C,{id:`impose-restriction-${n}`,value:i,options:[{label:"Yes",value:!0},{label:"No",value:!1}],onChange:g}),i===!1&&e(b,{variant:"warning",isGlobal:!1,description:m})]})}),t(_,{children:[e(d,{variant:"outlined",disabled:r,onClick:o,children:"Cancel"}),e(d,{disabled:i==null||r,variant:"contained",onClick:h,children:"OK"})]})]})}try{c.displayName="ImposeRestrictionDialog",c.__docgenInfo={description:"",displayName:"ImposeRestrictionDialog",props:{entityId:{defaultValue:null,description:"",name:"entityId",required:!0,type:{name:"string"}},open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}}}}}catch{}export{c as I};
//# sourceMappingURL=ImposeRestrictionDialog-444a157d.js.map
