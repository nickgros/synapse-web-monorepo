import{a as S,j as t,F as W}from"./jsx-runtime-095bf462.js";import{r as T,R as V}from"./index-8db94870.js";import{I as ne}from"./IconSvg-f04d8c2b.js";import{E as ce,f as ie,aY as de}from"./SynapseClient-c43c6534.js";import{a as ue}from"./useDataAccessSubmission-7363cf70.js";import"./EntityTypeUtils-9aa47355.js";import{ax as me,m as pe}from"./SynapseConstants-1ebc8be6.js";import"./getEndpoint-ac94413e.js";import{c as fe}from"./useGetQueryResultBundle-d8d5d7d9.js";import{S as he}from"./immutable.es-400ccb6d.js";import{S as be}from"./LoadingScreen-62f7a4ed.js";import{F as ge}from"./FullWidthAlert-51eedfbf.js";import{d as ye}from"./ToastMessage-6e66d93f.js";import{M as Ce}from"./Dialog-1654f0cb.js";import{D as xe,a as Re,b as Ie}from"./DialogTitle-cac35fb9.js";import{S as Y}from"./Stack-49641969.js";import{B as oe}from"./Box-fe8ef83e.js";import{I as Se}from"./IconButton-d433d837.js";import{B as $}from"./Button-b9be626b.js";import{T as k}from"./Typography-b4a6e0b5.js";import{u as se,d as ke,F as ve}from"./InputLabel-f53e5970.js";import{T as Ee}from"./TextField-1fb89c22.js";import{_ as H}from"./objectWithoutPropertiesLoose-4f48578a.js";import{_ as g}from"./extends-98964cd2.js";import{g as Q,e as J,s as U,i as O,m as M,j as X,G as we,k as Te,f as re}from"./styled-2cba4329.js";import{B as Be}from"./ButtonBase-bdd58ec3.js";import{u as _e}from"./useControlled-be22aa93.js";import{c as K}from"./createSvgIcon-02cd1a2a.js";function Pe(e){return Q("PrivateSwitchBase",e)}J("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const Fe=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],qe=e=>{const{classes:o,checked:s,disabled:r,edge:n}=e,a={root:["root",s&&"checked",r&&"disabled",n&&`edge${M(n)}`],input:["input"]};return X(a,Pe,o)},Le=U(Be)(({ownerState:e})=>g({padding:9,borderRadius:"50%"},e.edge==="start"&&{marginLeft:e.size==="small"?-3:-12},e.edge==="end"&&{marginRight:e.size==="small"?-3:-12})),Me=U("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),Ne=T.forwardRef(function(o,s){const{autoFocus:r,checked:n,checkedIcon:a,className:p,defaultChecked:u,disabled:m,disableFocusRipple:d=!1,edge:y=!1,icon:C,id:c,inputProps:R,inputRef:l,name:h,onBlur:I,onChange:v,onFocus:b,readOnly:P,required:F=!1,tabIndex:E,type:x,value:L}=o,N=H(o,Fe),[i,B]=_e({controlled:n,default:!!u,name:"SwitchBase",state:"checked"}),f=se(),_=w=>{b&&b(w),f&&f.onFocus&&f.onFocus(w)},z=w=>{I&&I(w),f&&f.onBlur&&f.onBlur(w)},j=w=>{if(w.nativeEvent.defaultPrevented)return;const ee=w.target.checked;B(ee),v&&v(w,ee)};let q=m;f&&typeof q>"u"&&(q=f.disabled);const le=x==="checkbox"||x==="radio",D=g({},o,{checked:i,disabled:q,disableFocusRipple:d,edge:y}),Z=qe(D);return S(Le,g({component:"span",className:O(Z.root,p),centerRipple:!0,focusRipple:!d,disabled:q,tabIndex:null,role:void 0,onFocus:_,onBlur:z,ownerState:D,ref:s},N,{children:[t(Me,g({autoFocus:r,checked:n,defaultChecked:u,className:Z.input,disabled:q,id:le?c:void 0,name:h,onChange:j,readOnly:P,ref:l,required:F,ownerState:D,tabIndex:E,type:x},x==="checkbox"&&L===void 0?{}:{value:L},R)),i?a:C]}))}),je=Ne,$e=K(t("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),Ae=K(t("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),Oe=K(t("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function Ue(e){return Q("MuiCheckbox",e)}const ze=J("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),G=ze,De=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],Ge=e=>{const{classes:o,indeterminate:s,color:r}=e,n={root:["root",s&&"indeterminate",`color${M(r)}`]},a=X(n,Ue,o);return g({},o,a)},Ve=U(je,{shouldForwardProp:e=>we(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:s}=e;return[o.root,s.indeterminate&&o.indeterminate,s.color!=="default"&&o[`color${M(s.color)}`]]}})(({theme:e,ownerState:o})=>g({color:(e.vars||e).palette.text.secondary},!o.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${o.color==="default"?e.vars.palette.action.activeChannel:e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.hoverOpacity})`:Te(o.color==="default"?e.palette.action.active:e.palette[o.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},o.color!=="default"&&{[`&.${G.checked}, &.${G.indeterminate}`]:{color:(e.vars||e).palette[o.color].main},[`&.${G.disabled}`]:{color:(e.vars||e).palette.action.disabled}})),We=t(Ae,{}),Ye=t($e,{}),He=t(Oe,{}),Qe=T.forwardRef(function(o,s){var r,n;const a=re({props:o,name:"MuiCheckbox"}),{checkedIcon:p=We,color:u="primary",icon:m=Ye,indeterminate:d=!1,indeterminateIcon:y=He,inputProps:C,size:c="medium",className:R}=a,l=H(a,De),h=d?y:m,I=d?y:p,v=g({},a,{color:u,indeterminate:d,size:c}),b=Ge(v);return t(Ve,g({type:"checkbox",inputProps:g({"data-indeterminate":d},C),icon:T.cloneElement(h,{fontSize:(r=h.props.fontSize)!=null?r:c}),checkedIcon:T.cloneElement(I,{fontSize:(n=I.props.fontSize)!=null?n:c}),ownerState:v,ref:s,className:O(b.root,R)},l,{classes:b}))}),Je=Qe;function Xe(e){return Q("MuiFormControlLabel",e)}const Ke=J("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error"]),A=Ke,Ze=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","slotProps","value"],eo=e=>{const{classes:o,disabled:s,labelPlacement:r,error:n}=e,a={root:["root",s&&"disabled",`labelPlacement${M(r)}`,n&&"error"],label:["label",s&&"disabled"]};return X(a,Xe,o)},oo=U("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:s}=e;return[{[`& .${A.label}`]:o.label},o.root,o[`labelPlacement${M(s.labelPlacement)}`]]}})(({theme:e,ownerState:o})=>g({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${A.disabled}`]:{cursor:"default"}},o.labelPlacement==="start"&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},o.labelPlacement==="top"&&{flexDirection:"column-reverse",marginLeft:16},o.labelPlacement==="bottom"&&{flexDirection:"column",marginLeft:16},{[`& .${A.label}`]:{[`&.${A.disabled}`]:{color:(e.vars||e).palette.text.disabled}}})),to=T.forwardRef(function(o,s){var r;const n=re({props:o,name:"MuiFormControlLabel"}),{className:a,componentsProps:p={},control:u,disabled:m,disableTypography:d,label:y,labelPlacement:C="end",slotProps:c={}}=n,R=H(n,Ze),l=se();let h=m;typeof h>"u"&&typeof u.props.disabled<"u"&&(h=u.props.disabled),typeof h>"u"&&l&&(h=l.disabled);const I={disabled:h};["checked","name","onChange","value","inputRef"].forEach(x=>{typeof u.props[x]>"u"&&typeof n[x]<"u"&&(I[x]=n[x])});const v=ke({props:n,muiFormControl:l,states:["error"]}),b=g({},n,{disabled:h,labelPlacement:C,error:v.error}),P=eo(b),F=(r=c.typography)!=null?r:p.typography;let E=y;return E!=null&&E.type!==k&&!d&&(E=t(k,g({component:"span"},F,{className:O(P.label,F==null?void 0:F.className),children:E}))),S(oo,g({className:O(P.root,a),ownerState:b,ref:s},R,{children:[T.cloneElement(u,I),E]}))}),no=to,ae="category",so="category email prompt",ro="rejection reason",ao="email text",lo=`Thank you for submitting your data access request.
`,co=`
If you have questions, do not respond to this email address. Instead, reply to:
act@sagebionetworks.org`;function io(e){const{category:o,rows:s,selectedRowIds:r,setSelectedRowIds:n,rejectionReasonFormTextIndex:a}=e,[p,u]=V.useState(!1);return S(W,{children:[S(k,{variant:"body1",onClick:()=>u(!p),sx:{fontWeight:700,cursor:"pointer",my:1},children:[t(ne,{icon:p?"expandMore":"chevronRight",sx:{color:"grey.700"},wrap:!1}),o]}),t(de,{in:p,children:t(Y,{sx:{ml:3},children:(s??[]).map(m=>t(no,{control:t(Je,{checked:r.has(m.rowId),size:"small",onChange:d=>{d.target.checked?n(r.add(m.rowId)):n(r.remove(m.rowId))}}),label:t(k,{variant:"smallText1",children:m.values[a]})},m.rowId))})})]})}function uo(e){var y,C;const{tableQuery:o,selectedRowIds:s,setSelectedRowIds:r}=e,{data:n,isLoading:a,error:p}=o,u=(y=n==null?void 0:n.queryResult)==null?void 0:y.queryResults.headers.findIndex(c=>c.name.toLowerCase()===ae),m=(C=n==null?void 0:n.queryResult)==null?void 0:C.queryResults.headers.findIndex(c=>c.name.toLowerCase()===ro),d=n&&n.queryResult&&n.queryResult.queryResults.rows.reduce((c,R)=>{const l=R.values[u];return c[l]=[...c[l]||[],R],c},{});return S(W,{children:[t(k,{variant:"headline3",gutterBottom:!0,children:"Reasons for rejecting"}),t(k,{variant:"body1",gutterBottom:!0,children:"You may wish to reject the user's data access request for a specific reason. The list below contains some common rejection reasons. You will have a chance to edit the response before submitting it, including adding any rejection reason(s) not listed here."}),a&&t(Y,{sx:{my:2},children:t(be,{size:30})}),p&&t(ce,{error:p}),d&&t(ve,{children:Object.keys(d).map(c=>t(io,{category:c,rows:d[c],selectedRowIds:s,setSelectedRowIds:r,rejectionReasonFormTextIndex:m},c))}),t(k,{variant:"headline3",sx:{mt:1},gutterBottom:!0,children:"We’ll generate a response email message based on your selections."}),t(k,{variant:"body1",gutterBottom:!0,children:"If your reasons for rejecting are not shown here, that’s okay! You can edit the complete text of the message on the next screen before sending it."})]})}function mo(e){const{emailText:o,setEmailText:s}=e;return S(W,{children:[t(k,{variant:"headline3",gutterBottom:!0,children:"Edit the text of the rejection message"}),t(k,{variant:"body1",gutterBottom:!0,children:"This message will be sent to the data requester. You may edit it, or add custom text to the message."}),t(Ee,{multiline:!0,fullWidth:!0,rows:15,value:o,onChange:r=>{s(r.target.value)}})]})}function te(e){var x,L,N;const{open:o,tableId:s=me,onClose:r,submissionId:n}=e,[a,p]=V.useState(1),[u,m]=V.useState(null),[d,y]=T.useState(""),[C,c]=T.useState(he()),R=fe({entityId:s,query:{sql:`SELECT * FROM ${s}`},partMask:pe,concreteType:"org.sagebionetworks.repo.model.table.QueryBundleRequest"}),{data:l}=R,h=(x=l==null?void 0:l.queryResult)==null?void 0:x.queryResults.headers.findIndex(i=>i.name.toLowerCase()===ae),I=(L=l==null?void 0:l.queryResult)==null?void 0:L.queryResults.headers.findIndex(i=>i.name.toLowerCase()===so),v=(N=l==null?void 0:l.queryResult)==null?void 0:N.queryResults.headers.findIndex(i=>i.name.toLowerCase()===ao),b=l&&l.queryResult&&C.reduce((i,B)=>{const f=l.queryResult.queryResults.rows.find(q=>q.rowId===B),_=f.values[h],z=f.values[I],j=f.values[v];return i[_]?i[_].reasons=[...i[_].reasons,j]:i[_]={sectionText:z,reasons:[j]},i},{}),P=b&&lo+Object.keys(b).reduce((i,B)=>{const f=b[B].sectionText;i+=`
`+f+`
`;for(const _ of b[B].reasons)i+=`
* `+_+`
`;return i},"")+co;T.useEffect(()=>{P&&y(P)},[C]);const{mutate:F}=ue();function E(i){F({submissionId:n.toString(),newState:ie.REJECTED,rejectedReason:i},{onSuccess:()=>{m(null),ye("Submission rejected and message sent to requester","info"),r()},onError:B=>{m(B)}})}return S(Ce,{open:o,onClose:r,maxWidth:"md",fullWidth:!0,children:[t(xe,{children:S(Y,{direction:"row",alignItems:"center",gap:"5px",children:["Reject Request?",t(oe,{sx:{flexGrow:1}}),t(Se,{onClick:r,children:t(ne,{icon:"close",wrap:!1,sx:{color:"grey.700"}})})]})}),S(Re,{children:[a===1&&t(uo,{tableQuery:R,selectedRowIds:C,setSelectedRowIds:c}),a===2&&t(mo,{emailText:d,setEmailText:y}),u&&t(ge,{variant:"danger",description:u.reason,isGlobal:!1})]}),S(Ie,{children:[a===2&&t($,{variant:"outlined",onClick:()=>p(1),children:"Back"}),t(oe,{sx:{flexGrow:1}}),t($,{variant:"outlined",onClick:r,children:"Cancel"}),a===1&&t($,{variant:"contained",onClick:()=>p(2),children:"Generate Email"}),a===2&&t($,{variant:"contained",onClick:()=>{E(d)},children:"Reject and Notify Requester"})]})]})}try{te.displayName="RejectDataAccessRequestModal",te.__docgenInfo={description:`Modal component presented to a data access submission reviewer when they decide to reject a request.
The modal contains a form for selecting rejection reasons and a text field for editing the rejection message.
After crafting a message, the user can reject the submission and send the message to the requester.`,displayName:"RejectDataAccessRequestModal",props:{submissionId:{defaultValue:null,description:"",name:"submissionId",required:!0,type:{name:"string | number"}},tableId:{defaultValue:null,description:"",name:"tableId",required:!1,type:{name:"string"}},open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}}}}}catch{}export{te as R};
//# sourceMappingURL=RejectDataAccessRequestModal-2f53f40b.js.map
