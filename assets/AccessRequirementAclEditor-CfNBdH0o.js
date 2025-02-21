import{j as t}from"./jsx-runtime-Du8NFWEI.js";import{c as g}from"./VerificationSubmission-DL9jxYsQ.js";import{r as i}from"./index-Dl6G-zuu.js";import{j as q}from"./useFiles-DlHdYvDe.js";import"./StringUtils-By8SXO8c.js";import"./OrientationBanner-D9CLn5zV.js";import{a as L,b,c as j,d as T}from"./useAccessRequirements-CnWrnWGR.js";import{u as N}from"./useUpdateAcl-BRH8H1J0.js";import{A as B}from"./AclEditor-wxHFmDVw.js";import{S as M}from"./Stack-DTWuWz9s.js";import{B as O}from"./Box-CaFleW7-.js";import{T as a}from"./Typography-DrqHmlDD.js";import{A as P}from"./Alert-CduaGk2B.js";const m={variant:"body1",lineHeight:"20px",color:"grey.800"},U="Only ACT has permissions on this AR.",w=["CAN_REVIEW_SUBMISSIONS","IS_EXEMPTION_ELIGIBLE","CAN_REVIEW_SUBMISSIONS_AND_IS_EXEMPTION_ELIGIBLE"],f=i.forwardRef(function(I,x){const{accessRequirementId:o,onSaveComplete:n}=I,[d,c]=i.useState(null),l=()=>{c(null),n(!0)},u=e=>{c(e.reason),n(!1)},{data:s,isLoading:R}=L(o,{staleTime:1/0}),{resourceAccessList:r,setResourceAccessList:p,addResourceAccessItem:y,updateResourceAccessItem:_,removeResourceAccessItem:C,resetDirtyState:v}=N({onChange:()=>c(null),onError:c});i.useEffect(()=>{s&&(v(),p(s.resourceAccess))},[s,p]);const{mutate:A}=b({onSuccess:()=>l(),onError:e=>u(e)}),{mutate:E}=j({onSuccess:()=>l(),onError:e=>u(e)}),{mutate:S}=T({onSuccess:()=>l(),onError:e=>u(e)});return i.useImperativeHandle(x,()=>({save(){const e=r.length===0?null:{...s,id:(s==null?void 0:s.id)||o,resourceAccess:r};s===null&&e==null||q(s==null?void 0:s.resourceAccess,r)&&(s==null?void 0:s.id)===(e==null?void 0:e.id)?n(!0):s===null&&e!==null?E(e):e===null?A(o):S(e)}}),[o,s,r,E,A,n,S]),t.jsxs(M,{gap:"20px",direction:"column",children:[t.jsxs(O,{children:[t.jsx(a,{variant:"headline3",mb:"10px",children:"Guide to AR permissions"}),t.jsxs(a,{sx:m,mb:"10px",children:[t.jsx("span",{style:{fontStyle:"italic"},children:"Can Review"})," means a user or team has access request review permission for this AR."]}),t.jsxs(a,{sx:m,mb:"10px",children:[t.jsx("span",{style:{fontStyle:"italic"},children:"Exempt Eligible"}),' users and teams can bypass access requirements for entities they have been granted "edit and delete" permission on, via the "Sharing Settings" dialog in the Project Settings.']}),t.jsx(a,{sx:{...m,color:"grey.900"},children:"ACT members always retain the ability to review or modify Access Requirements."})]}),t.jsx(B,{resourceAccessList:r,availablePermissionLevels:w,isLoading:R,canEdit:!0,emptyText:U,onAddPrincipalToAcl:e=>y(e,[g.REVIEW_SUBMISSIONS]),updateResourceAccessItem:_,removeResourceAccessItem:C,showAddRemovePublicButton:!1,showNotifyCheckbox:!1}),d&&t.jsx(P,{severity:"error",children:d})]})});try{f.displayName="AccessRequirementAclEditor",f.__docgenInfo={description:"",displayName:"AccessRequirementAclEditor",props:{accessRequirementId:{defaultValue:null,description:"",name:"accessRequirementId",required:!0,type:{name:"string"}},onSaveComplete:{defaultValue:null,description:"",name:"onSaveComplete",required:!0,type:{name:"(saveSuccessful: boolean) => void"}}}}}catch{}export{f as A};
