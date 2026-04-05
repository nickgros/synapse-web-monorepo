import{v as s,z as i,b as n,s as o,H as u}from"./iframe-MKfqFOD8.js";import{E as m}from"./EvaluationCard-L82APOMM.js";import"./index-Chi_LkuB.js";import"./DeleteEvaluationQueueConfirmationDialog-C9wCKKtF.js";import"./UserBadge-YUYrfza9.js";import"./useUserBundle-BxwpkSuA.js";import"./SkeletonTable-csENOylF.js";import"./MenuItem-A_sRjryR.js";import"./Card-BBDKbp41.js";import"./Chip-nSYhQ0xM.js";import"./WarningDialog-CICMnANw.js";import"./ConfirmationDialog-xjYdNlBh.js";import"./DialogBase-sqgBoDKn.js";import"./Close-DbfkXeYU.js";import"./HelpPopover-JiNUdC6G.js";import"./MarkdownPopover-DW_c7wkC.js";import"./LightTooltip-CIyd6sa2.js";import"./MarkdownSynapse-Cf8WvGE4.js";import"./SkeletonButton-DeN5-pZo.js";import"./SkeletonInlineBlock-F_c8IDKO.js";import"./SkeletonParagraph-FVQhx8Xz.js";import"./FormControlLabel-B5UuM6UV.js";import"./Checkbox-BHMyXJ7B.js";import"./SwitchBase-BRQ6Hx4R.js";import"./CardContent-Cze0ckwx.js";const{fn:e}=__STORYBOOK_MODULE_TEST__,k={title:"Synapse/Challenge/EvaluationCard",component:m},r={evaluation:{id:"9614690",etag:"6f8aa977-527e-4b2f-9d87-beab2db99503",name:"Sample Evaluation Queue",description:"This is a sample Evaluation Queue",ownerId:"3345868",createdOn:"2021-01-05T00:41:11.670Z",contentSource:"syn23679309",submissionInstructionsMessage:"Do a barrel roll",submissionReceiptMessage:"We received your submission"},onEdit:e(),onModifyAccess:e(),onSubmit:e(),onDeleteSuccess:e()},t={args:r},a={parameters:{stack:"mock",msw:{handlers:[...i(n),o.get(`${n}/repo/v1/evaluation/:id/permissions`,()=>u.json({canChangePermissions:!0,canDeleteSubmissions:!0,canEditSubmissionStatuses:!0,canParticipate:!0,canPublicRead:!0,canView:!0,canViewPrivateSubmissionStatusAnnotations:!0,ownerPrincipalId:s,canEdit:!0,canSubmit:!0,canDelete:!0},{status:200})),o.delete(`${n}/repo/v1/evaluation/:id`,()=>new Response("",{status:200}))]}},args:{...r,evaluation:{...r.evaluation,ownerId:s.toString()}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: evaluationArgs
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    stack: 'mock',
    msw: {
      handlers: [...getUserProfileHandlers(MOCK_REPO_ORIGIN), http.get(\`\${MOCK_REPO_ORIGIN}/repo/v1/evaluation/:id/permissions\`, () => {
        return HttpResponse.json({
          canChangePermissions: true,
          canDeleteSubmissions: true,
          canEditSubmissionStatuses: true,
          canParticipate: true,
          canPublicRead: true,
          canView: true,
          canViewPrivateSubmissionStatusAnnotations: true,
          ownerPrincipalId: MOCK_USER_ID,
          canEdit: true,
          canSubmit: true,
          canDelete: true
        }, {
          status: 200
        });
      }), http.delete(\`\${MOCK_REPO_ORIGIN}/repo/v1/evaluation/:id\`, () => new Response('', {
        status: 200
      }))]
    }
  },
  args: {
    ...evaluationArgs,
    evaluation: {
      ...evaluationArgs.evaluation,
      ownerId: MOCK_USER_ID.toString()
    }
  }
}`,...a.parameters?.docs?.source}}};const y=["Card","CardWithDeleteModal"];export{t as Card,a as CardWithDeleteModal,y as __namedExportsOrder,k as default};
