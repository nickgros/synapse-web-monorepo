import{z as d,b as e,o as u,s,kp as i,kq as c,H as t,kr as R,i as m,ks as E,kt as _,a0 as I,dG as S,k8 as O}from"./iframe-MKfqFOD8.js";import{m as g}from"./mockRejectionReasonsTableQueryResultBundle-DI70dpzk.js";import{S as C}from"./SubmissionPage-DeIUlqz4.js";import"./index-Chi_LkuB.js";import"./AccessRequirementList-D-iVe1aS.js";import"./useAccessRequirements-D8SoqZc7.js";import"./index-vuOGBU-4.js";import"./_baseOrderBy-lfxD-e5Q.js";import"./_baseIteratee-DDxx7wlp.js";import"./_baseMap-Bfewz1-m.js";import"./_baseEach-BAlWuIp6.js";import"./useInfiniteQuery-BG9mEZpV.js";import"./groupBy-Cl6vluXb.js";import"./_createAggregator-C8WzxNyX.js";import"./DialogBase-sqgBoDKn.js";import"./Close-DbfkXeYU.js";import"./HelpPopover-JiNUdC6G.js";import"./MarkdownPopover-DW_c7wkC.js";import"./LightTooltip-CIyd6sa2.js";import"./MarkdownSynapse-Cf8WvGE4.js";import"./SkeletonButton-DeN5-pZo.js";import"./SkeletonInlineBlock-F_c8IDKO.js";import"./SkeletonTable-csENOylF.js";import"./SkeletonParagraph-FVQhx8Xz.js";import"./EntityLink-DU_akKIL.js";import"./useEntity-C7wbNsA9.js";import"./pickBy-BkUQgDmm.js";import"./isString-5GsEY6VE.js";import"./InfiniteQueryUtils-CKlRW-xB.js";import"./useEntityBundle-ChHnXsJI.js";import"./useGetEntityHeaders-DvB2NRYs.js";import"./EntityIcon-CKZ6Is29.js";import"./ErrorChip-CseRxEHZ.js";import"./Chip-nSYhQ0xM.js";import"./UserOrTeamBadge-Fq6fL4Qr.js";import"./UserBadge-YUYrfza9.js";import"./useUserBundle-BxwpkSuA.js";import"./MenuItem-A_sRjryR.js";import"./Card-BBDKbp41.js";import"./TeamBadge-CtPt7Wji.js";import"./UnmanagedACTAccessRequirementItem-_5AmQI9a.js";import"./RequirementItem-Z8EMa3WV.js";import"./LockTwoTone-_jJvTXdl.js";import"./ManagedACTAccessRequirementItemView-CZUD3S4h.js";import"./SelfSignAccessRequirementItem-CA6TQH_b.js";import"./DataAccessRequestAccessorsFilesForm-6_8DNiFZ.js";import"./enums-Dq4KyWFh.js";import"./_arrayReduce-CrxnWFSq.js";import"./uniq-DNrkoE6H.js";import"./forEach-UWyboym_.js";import"./useDataAccessSubmission-LuUFHyyo.js";import"./UserSearchBox-EthjjESp.js";import"./useDebouncedEffect-DMjtnvZ2.js";import"./Autocomplete-DgkBqjhh.js";import"./usePreviousProps-OjlbKFqY.js";import"./RadioGroup-D2d2KB4-.js";import"./Radio-DcUI5GAc.js";import"./SwitchBase-BRQ6Hx4R.js";import"./FormGroup-D2DCu9HL.js";import"./FormControlLabel-B5UuM6UV.js";import"./UploadDocumentField-7uKNlUK0.js";import"./FileUpload-Dc6rLSOs.js";import"./ManagedACTAccessRequirementFormWikiWrapper-DTTsqv_W.js";import"./GridLegacy-DsD6Fgbe.js";import"./ResearchProjectForm-CCNGr2c4.js";import"./TextFieldWithWordLimit-q7A6UlfS.js";import"./AuthenticatedRequirement-Bx1noKcX.js";import"./CertificationRequirement-C6vYvrJK.js";import"./TwoFactorAuthEnabledRequirement-leDEyRaU.js";import"./ValidationRequirement-yohw1JI6.js";import"./duration-DbmI10NM.js";import"./FileHandleLink-CVzljMQw.js";import"./RejectDataAccessRequestModal-CHOYWyQS.js";import"./CannedRejectionDialog-DfGNz1fZ.js";import"./immutable.es-CT6QCxCG.js";import"./ConfirmationDialog-xjYdNlBh.js";import"./Checkbox-BHMyXJ7B.js";import"./Grid-CtUQ9ERB.js";import"./upperFirst-qdP26C4Y.js";import"./_stringToArray-Fti0_PuK.js";const Le={title:"Governance/SubmissionPage",component:C,parameters:{stack:"mock",withRouter:!0},argTypes:{isAuthenticated:{control:{type:"boolean"}}},args:{isAuthenticated:!0}},o={name:"SubmissionPage",loaders:[()=>S({sql:`SELECT * FROM ${O}`},g)],parameters:{msw:{handlers:[...d(e),...u(e),s.get(`${e}${i(":id")}`,({params:r})=>{const a=c.find(p=>r.id===p.id);return t.json(a,{status:200})}),s.get(`${e}${R(":id")}`,()=>t.json(m,{status:200})),s.get(`${e}${E(":id")}`,()=>t.json({wikiPageId:123,ownerObjectId:m.id,ownerObjectType:"ACCESS_REQUIREMENT"},{status:200})),s.get(`${e}/repo/v1/accessRequirement/:id/acl`,({params:r})=>t.json({id:r.id,creationDate:"2022-05-20T14:32:31.665Z",etag:"f4fbd4f2-751d-40dd-9421-1d2693231217",resourceAccess:[{principalId:_,accessType:["REVIEW_SUBMISSIONS"]}]},{status:200})),...I(e),s.put(`${e}${i(":id")}`,async({request:r})=>t.json(await r.json(),{status:201}))]}},args:{isReviewer:!0,submissionId:1}},n={name:"Demo Error State",parameters:{msw:{handlers:[s.get(`${e}${i(":id")}`,()=>{const r={reason:"The user must be validated in order to review data access submissions.",concreteType:"org.sagebionetworks.repo.model.ErrorResponse"};return t.json(r,{status:403})})]}},args:{isReviewer:!0,submissionId:9999}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'SubmissionPage',
  loaders: [() => registerTableQueryResult({
    sql: \`SELECT * FROM \${REJECT_SUBMISSION_CANNED_RESPONSES_TABLE}\`
  }, mockRejectionReasonsTableQueryResultBundle)],
  parameters: {
    msw: {
      handlers: [...getUserProfileHandlers(MOCK_REPO_ORIGIN), ...getWikiHandlers(MOCK_REPO_ORIGIN),
      // Return submission based on ID
      http.get(\`\${MOCK_REPO_ORIGIN}\${DATA_ACCESS_SUBMISSION_BY_ID(':id')}\`, ({
        params
      }) => {
        const submission = mockSubmissions.find(submission => params.id === submission.id);
        return HttpResponse.json(submission, {
          status: 200
        });
      }),
      // Return a mocked access requirement
      http.get(\`\${MOCK_REPO_ORIGIN}\${ACCESS_REQUIREMENT_BY_ID(':id')}\`, () => {
        return HttpResponse.json(mockManagedACTAccessRequirement, {
          status: 200
        });
      }), http.get(\`\${MOCK_REPO_ORIGIN}\${ACCESS_REQUIREMENT_WIKI_PAGE_KEY(':id')}\`, () => {
        return HttpResponse.json({
          wikiPageId: 123,
          ownerObjectId: mockManagedACTAccessRequirement.id,
          ownerObjectType: 'ACCESS_REQUIREMENT'
        }, {
          status: 200
        });
      }), http.get<{
        id: string;
      }>(\`\${MOCK_REPO_ORIGIN}/repo/v1/accessRequirement/:id/acl\`, ({
        params
      }) => {
        return HttpResponse.json({
          id: params.id,
          creationDate: '2022-05-20T14:32:31.665Z',
          etag: 'f4fbd4f2-751d-40dd-9421-1d2693231217',
          resourceAccess: [{
            principalId: MOCK_USER_ID_2,
            accessType: ['REVIEW_SUBMISSIONS']
          }]
        }, {
          status: 200
        });
      }), ...getHandlersForTableQuery(MOCK_REPO_ORIGIN), http.put(\`\${MOCK_REPO_ORIGIN}\${DATA_ACCESS_SUBMISSION_BY_ID(':id')}\`, async ({
        request
      }) => {
        return HttpResponse.json(await request.json(), {
          status: 201
        });
      })]
    }
  },
  args: {
    isReviewer: true,
    submissionId: 1
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Demo Error State',
  parameters: {
    msw: {
      handlers: [http.get(\`\${MOCK_REPO_ORIGIN}\${DATA_ACCESS_SUBMISSION_BY_ID(':id')}\`, () => {
        const errorResponse: ErrorResponse = {
          reason: 'The user must be validated in order to review data access submissions.',
          concreteType: 'org.sagebionetworks.repo.model.ErrorResponse'
        };
        return HttpResponse.json(errorResponse, {
          status: 403
        });
      })]
    }
  },
  args: {
    isReviewer: true,
    submissionId: 9999
  }
}`,...n.parameters?.docs?.source}}};const xe=["Demo","DemoError"];export{o as Demo,n as DemoError,xe as __namedExportsOrder,Le as default};
