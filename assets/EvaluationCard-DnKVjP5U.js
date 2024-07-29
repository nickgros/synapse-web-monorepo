import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{r as i}from"./index-Dl6G-zuu.js";import{j as E,J as v,r as C,K as b}from"./SynapseClient-Dbc8tFdW.js";import{C as h,a as g}from"./CreatedOnByUserDiv-B6UTYovm.js";import{W as y}from"./WarningDialog-QLV2NB5e.js";import{I as w}from"./IconSvg-C03OjPNK.js";import{R as D}from"./Row-I5_ZETpI.js";import{C as p}from"./Col-BUWlsR9R.js";import{B as S}from"./Button-jcEr4EiK.js";import{D as o}from"./Dropdown-DYfyKk6W.js";const f=({evaluation:t,onEdit:s,onModifyAccess:l,onSubmit:c,onDeleteSuccess:d})=>{const{accessToken:n}=E(),[m,a]=i.useState(),[r,x]=i.useState();i.useEffect(()=>{a(void 0),v(t.id,n).then(u=>{x(u)}).catch(u=>a(u))},[t,n]);const j=()=>{a(void 0),b(t.id,n).then(d).catch(a)};return e.jsx("div",{className:"bootstrap-4-backport evaluation-card",children:e.jsx(h,{children:e.jsxs(h.Body,{children:[m&&e.jsx(C,{error:m}),r&&e.jsxs(e.Fragment,{children:[e.jsxs(D,{children:[e.jsx(p,{children:e.jsx("label",{children:"EVALUATION QUEUE"})}),e.jsx(p,{children:e.jsx(k,{permissions:r,onDelete:j,onEdit:s,onModifyAccess:l})})]}),e.jsxs("h4",{children:[t.name," (",t.id,")"]}),e.jsx("label",{children:"Description"}),e.jsx("p",{children:t.description}),e.jsx("label",{children:"Instructions"}),e.jsx("p",{children:t.submissionInstructionsMessage}),e.jsx(g,{userId:t.ownerId,date:new Date(t.createdOn)}),(r==null?void 0:r.canSubmit)&&e.jsx(S,{className:"submit-button",color:"primary",variant:"contained",onClick:c,children:"Submit"})]})]})})})},k=({permissions:t,onEdit:s,onModifyAccess:l,onDelete:c})=>{const[d,n]=i.useState(!1);return t.canEdit||t.canChangePermissions||t.canDelete?e.jsxs(e.Fragment,{children:[(t==null?void 0:t.canDelete)&&e.jsx(y,{title:"Delete Evaluation Queue",content:"Are you sure you want to delete the Evaluation Queue?",open:d,confirmButtonText:"Delete",onConfirm:()=>{c(),n(!1)},onConfirmCallbackArgs:[],onCancel:()=>{n(!1)},confirmButtonColor:"error"}),e.jsxs(o,{className:"float-right",children:[e.jsx(o.Toggle,{role:"menu","aria-label":"Options",variant:"link",className:"dropdown-no-caret",children:e.jsx(w,{icon:"verticalEllipsis"})}),e.jsxs(o.Menu,{alignRight:!0,children:[t.canEdit&&e.jsx(o.Item,{role:"menuitem",onClick:s,children:"Edit"}),t.canChangePermissions&&e.jsx(o.Item,{role:"menuitem",onClick:l,children:"Modify Access"}),t.canDelete&&e.jsxs(e.Fragment,{children:[e.jsx(o.Divider,{}),e.jsx(o.Item,{role:"menuitem",onClick:()=>n(!0),children:"Delete"})," "]})]})]})]}):null};try{f.displayName="EvaluationCard",f.__docgenInfo={description:`This component is currently only intended to be used in Synapse.org.
For this reason, the dropdown menu items are unimplemented as no components
in this project implement their behavior. The dropdown options are also
not shown if the current user does not have permissions for the action

All Evaluation metadata must be provided to this component; it will not
retrieve an Evaluation via a REST API call`,displayName:"EvaluationCard",props:{evaluation:{defaultValue:null,description:"properties of the Evaluation to show",name:"evaluation",required:!0,type:{name:"ExistingEvaluation"}},onEdit:{defaultValue:null,description:"Callback when the Edit option in the dropdown is clicked",name:"onEdit",required:!0,type:{name:"() => void"}},onModifyAccess:{defaultValue:null,description:"Callback when the Modify Access option in the dropdown is clicked",name:"onModifyAccess",required:!0,type:{name:"() => void"}},onSubmit:{defaultValue:null,description:"Callback when the Submit button is clicked",name:"onSubmit",required:!0,type:{name:"() => void"}},onDeleteSuccess:{defaultValue:null,description:"Callback when the Delete option is successful",name:"onDeleteSuccess",required:!0,type:{name:"() => void"}}}}}catch{}export{f as E};
