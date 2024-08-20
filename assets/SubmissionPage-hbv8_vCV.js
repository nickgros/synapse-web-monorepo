import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{d as c}from"./dayjs.min-d18Up55D.js";import{r as I,R as v}from"./index-Dl6G-zuu.js";import{J as C,N as y,V as U}from"./SynapseClient-Dzk5gF_R.js";import{f as S}from"./DateFormatter-B92O4e01.js";import{a as N,u as O}from"./useDataAccessSubmission-wvp_m1lr.js";import{h as B,a as E,i as P}from"./useAccessRequirements-BT-M5y99.js";import{A as _}from"./SynapseConstants-DXE2bEuh.js";import{b as H,S as A,F as K}from"./index-7Z2-YRMp.js";import{l as L,F as M,M as V}from"./HelpPopover-BieiPtoG.js";import{W as k}from"./WarningDialog-DSicPhwN.js";import{U as b}from"./UserOrTeamBadge-BqHafi-J.js";import{R as W}from"./RejectDataAccessRequestModal-ZRDFUHcR.js";import{U as u}from"./UserBadge-CM-4vY10.js";import{T as s}from"./Typography-DgBbIcOX.js";import{S as n}from"./Skeleton-1jrlRaLC.js";import{B as R}from"./Button-CLkrjdQe.js";import{a as G,t as $}from"./ThemesPlot-C3NMBE8r.js";c.extend(L);function p(d){const{submissionId:i,fileHandleId:o}=d,l=v.useMemo(()=>({fileHandleId:o,associateObjectId:i,associateObjectType:K.DataAccessSubmissionAttachment}),[o,i]);return e.jsx(M,{showDownloadIcon:!0,fileHandleAssociation:l},o)}function J(d){return e.jsx(k,{open:d.open,title:"Approve Request?",content:e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"body1",sx:{marginBottom:"10px"},children:"Approving the request will grant access to controlled data."}),e.jsx(s,{variant:"body1",children:"In addition, the user will receive an email notification alerting them that the request has been granted."})]}),onConfirm:d.onConfirm,onConfirmCallbackArgs:[],onCancel:d.onCancel,confirmButtonText:"Approve"})}function Y(d){const{data:i}=P(d.accessRequirementId,{throwOnError:!0});return i?e.jsx("div",{className:"AccessRequirementWikiContainer",children:e.jsxs("div",{className:"AccessRequirementWikiContent",children:[e.jsx(s,{variant:"headline1",children:"Access Requirement"}),e.jsx("hr",{}),e.jsx(V,{wikiId:i==null?void 0:i.wikiPageId,ownerId:i==null?void 0:i.ownerObjectId,objectType:i==null?void 0:i.ownerObjectType})]})}):e.jsx(n,{width:"100%",height:"600px"})}function w(d){var f;const{submissionId:i}=d,[o,l]=I.useState(!1),g=C(),{data:a,refetch:D}=N(i,{throwOnError:!0}),{mutateAsync:F}=O(),{data:r}=B(parseInt(a==null?void 0:a.accessRequirementId),{enabled:!!a}),{data:m,isLoading:h}=E(a==null?void 0:a.accessRequirementId,{enabled:!!a,throwOnError:!0}),[q,x]=I.useState(!1);function T(){return F({submissionId:(a==null?void 0:a.id)??"",newState:A.APPROVED})}const j=m==null?void 0:m.resourceAccess.filter(t=>t.accessType.includes(H.REVIEW_SUBMISSIONS)).map(t=>t.principalId);return e.jsxs("div",{className:"SubmissionPage",children:[e.jsx(J,{open:q,onCancel:()=>{x(!1)},onConfirm:async()=>{try{await T()}catch(t){g(t)}x(!1),D()}}),o&&e.jsx(W,{submissionId:i,open:o,onClose:()=>l(!1)}),e.jsxs("div",{className:"SubmissionSummary",children:[e.jsx(s,{variant:"dataFieldKey",children:"Status"}),e.jsx(s,{variant:"headline3",children:a?a.state:e.jsx(n,{width:100})}),e.jsx("br",{}),a?a.state===A.SUBMITTED&&e.jsxs("div",{className:"ButtonContainer",children:[e.jsx(R,{onClick:()=>{x(!0)},color:"success",variant:"contained",children:"Approve"}),e.jsx(R,{onClick:()=>{l(!0)},color:"error",variant:"contained",children:"Reject"})]}):e.jsx(n,{width:200}),e.jsx(s,{variant:"dataFieldKey",children:"Access Requirement Name"}),e.jsx(s,{variant:"smallText1",children:(r==null?void 0:r.name)??e.jsx(n,{width:100})}),e.jsx("br",{}),e.jsx(s,{variant:"dataFieldKey",children:"Assigned Reviewer"}),e.jsxs(s,{variant:"smallText1",children:[h&&e.jsx(n,{width:100}),!h&&!y(j)&&j.map(t=>e.jsx(b,{principalId:t},t)),!h&&y(j)&&e.jsx(b,{principalId:_})]}),e.jsx("br",{}),e.jsx(s,{variant:"dataFieldKey",children:"Conditions"}),r?e.jsx(s,{variant:"smallText1",component:"div",children:e.jsxs("ul",{children:[e.jsxs("li",{children:["Expiration period:"," ",c.duration({milliseconds:r.expirationPeriod}).asDays()," ","day(s)",r.expirationPeriod===0&&" (no expiration)"]}),r.isCertifiedUserRequired&&e.jsx("li",{children:"User must be Certified"}),r.isValidatedProfileRequired&&e.jsx("li",{children:"User Profile must be Validated"}),r.isDUCRequired&&e.jsx("li",{children:"DUC is required"}),r.isIDURequired&&e.jsx("li",{children:"IDU is required"}),r.isIDUPublic&&e.jsx("li",{children:"IDU will be made public"}),r.isIRBApprovalRequired&&e.jsx("li",{children:"IRB Approval is required"}),r.areOtherAttachmentsRequired&&e.jsx("li",{children:"Other attachments are required"})]})}):e.jsx(n,{width:100}),e.jsx("br",{}),e.jsxs("div",{className:"SubmissionSummaryGrid",children:[e.jsx(s,{variant:"dataFieldKey",children:"Submitted By"}),e.jsx(s,{variant:"smallText1",children:a?e.jsx(u,{userId:a.submittedBy}):e.jsx(n,{width:100})}),e.jsx(s,{variant:"dataFieldKey",children:"Submitted On"}),e.jsx(s,{variant:"smallText1",children:a?S(c(a.submittedOn)):e.jsx(n,{width:100})}),e.jsx(s,{variant:"dataFieldKey",children:"Modified By"}),e.jsx(s,{variant:"smallText1",children:a?e.jsx(u,{userId:a.modifiedBy}):e.jsx(n,{width:100})}),e.jsx(s,{variant:"dataFieldKey",children:"Modified On"}),e.jsx(s,{variant:"smallText1",children:a?S(c(a.modifiedOn)):e.jsx(n,{width:100})}),e.jsxs(s,{className:"Key",variant:"dataFieldKey",children:["Data Requesters",`${a?` (${a.accessorChanges.length})`:""}`]}),a?a.accessorChanges.map(t=>e.jsxs(v.Fragment,{children:[e.jsx(s,{className:"Key DataAccessor",variant:"smallText1",children:e.jsx("span",{style:{whiteSpace:"nowrap"},children:e.jsx(u,{userId:t.userId},t.userId)})}),e.jsx(s,{className:"Value DataAccessor",variant:"smallText1",children:G($(t.type.substring(0,t.type.indexOf("_"))))})]},t.userId)):e.jsx(n,{width:100}),e.jsx(s,{className:"Key",variant:"dataFieldKey",children:"Institution"}),e.jsx(s,{className:"Value",variant:"smallText1",children:a?a.researchProjectSnapshot.institution:e.jsx(n,{width:100})}),e.jsx(s,{className:"Key",variant:"dataFieldKey",children:"Project Lead"}),e.jsx(s,{className:"Value",variant:"smallText1",children:a?a.researchProjectSnapshot.projectLead:e.jsx(n,{width:100})})]})]}),e.jsxs("div",{className:"SubmissionRightPane",children:[e.jsx(U,{children:a?e.jsx(Y,{accessRequirementId:a.accessRequirementId}):e.jsx(e.Fragment,{})}),e.jsxs("div",{children:[(a==null?void 0:a.rejectedReason)&&e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"headline1",children:"Reason for rejection given by reviewer"}),e.jsx("hr",{}),e.jsx(s,{variant:"body1",style:{whiteSpace:"pre-line"},children:a.rejectedReason})]}),e.jsx(s,{variant:"headline1",children:"Contents of the Access Request"}),e.jsx("hr",{}),((f=a==null?void 0:a.researchProjectSnapshot)==null?void 0:f.intendedDataUseStatement)&&e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"headline2",children:"Intended Data Use Statement"}),e.jsx(s,{variant:"body1",style:{whiteSpace:"pre-line"},children:a.researchProjectSnapshot.intendedDataUseStatement})]}),e.jsx(s,{variant:"headline2",children:"Documents"}),(a==null?void 0:a.ducFileHandleId)&&e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"smallText2",children:"Data Use Certificate (DUC)"}),e.jsx(p,{submissionId:a.id,fileHandleId:a.ducFileHandleId})]}),(a==null?void 0:a.irbFileHandleId)&&e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"smallText2",children:"IRB Approval Letter"}),e.jsx(p,{submissionId:a.id,fileHandleId:a.irbFileHandleId})]}),(a==null?void 0:a.attachments)&&e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"smallText2",children:"Other Attachments"}),a.attachments.map(t=>e.jsxs(v.Fragment,{children:[e.jsx(p,{submissionId:a.id,fileHandleId:t}),e.jsx("br",{})]},t))]})]})]})]})}try{w.displayName="SubmissionPage",w.__docgenInfo={description:"Page for a Data Access Submission that a designated reviewer can view, and choose to approve or reject.",displayName:"SubmissionPage",props:{submissionId:{defaultValue:null,description:"The ID of the submission to view",name:"submissionId",required:!0,type:{name:"string | number"}}}}}catch{}export{w as S};
