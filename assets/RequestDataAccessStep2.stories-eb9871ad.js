import{D as C}from"./DataAccessRequestAccessorsFilesForm-5dc51008.js";import{m as n}from"./mockAccessRequirements-f8f1c73b.js";import{M as c,a as R}from"./userProfileHandlers-c0d3ddc8.js";import{M as _}from"./MockResearchProject-bc8e5dfa.js";import{g as d,a as A,M as O,b as E}from"./fileHandlers-86480394.js";import{M as r}from"./getEndpoint-ac94413e.js";import"./jsx-runtime-095bf462.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./SynapseClient-c43c6534.js";import"./SynapseConstants-1ebc8be6.js";import"./inheritsLoose-c82a83d4.js";import"./index-8ce4a492.js";import"./extends-98964cd2.js";import"./Link-50e57cb4.js";import"./objectWithoutPropertiesLoose-4f48578a.js";import"./styled-2cba4329.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-29d231ba.js";import"./Typography-b4a6e0b5.js";import"./extendSxProp-a6a93bb0.js";import"./TransitionGroupContext-53ae1513.js";import"./useForkRef-2674f3de.js";import"./Button-5637ed55.js";import"./utils-8d96ae5c.js";import"./useTheme-d9b5c73e.js";import"./Alert-e578e9d5.js";import"./createWithBsPrefix-0fdadc7a.js";import"./index-58d3fd43.js";import"./isArray-5e3f9107.js";import"./dayjs.min-8d4ef725.js";import"./hoist-non-react-statics.cjs-775f1375.js";import"./inputBaseClasses-564a6ee4.js";import"./Fade-2249b304.js";import"./IconSvg-f04d8c2b.js";import"./SvgIcon-bc070951.js";import"./Tooltip-b11baf92.js";import"./ownerDocument-613eb639.js";import"./useEnhancedEffect-c45cae33.js";import"./isHostComponent-73d6e646.js";import"./useControlled-be22aa93.js";import"./useEventCallback-65e61675.js";import"./createSvgIcon-02cd1a2a.js";import"./ErrorOutlined-fccff164.js";import"./InfoOutlined-d944994d.js";import"./Clear-398befb5.js";import"./useDataAccessSubmission-7363cf70.js";import"./useMutation-424ee4ed.js";import"./useInfiniteQuery-f8eb063d.js";import"./useAccessRequirements-97deb603.js";import"./sortBy-03557842.js";import"./hasIn-d0a3292a.js";import"./_Uint8Array-9fb6227a.js";import"./_MapCache-bceaa486.js";import"./_baseTimes-8cccc40f.js";import"./_isIndex-af14b756.js";import"./isSymbol-7c514724.js";import"./toString-cc90cb98.js";import"./_cacheHas-6a8ad860.js";import"./_setToArray-3d6ec6fd.js";import"./_baseFor-d254fa1e.js";import"./_baseRest-052a6903.js";import"./_isIterateeCall-070c9793.js";import"./EntityTypeUtils-9aa47355.js";import"./IsType-0acbe7b9.js";import"./TextField-fa332ef9.js";import"./InputLabel-f53e5970.js";import"./ownerWindow-698471fc.js";import"./emotion-react.browser.esm-9ef79d4e.js";import"./isMuiElement-08f54e3c.js";import"./UserCard-6ee404cb.js";import"./SkeletonTable-548d1d1b.js";import"./times-7d6556a7.js";import"./Skeleton-cbf43066.js";import"./ToastMessage-6e66d93f.js";import"./FullWidthAlert-51eedfbf.js";import"./TransitionGroup-5e0fc2af.js";import"./assertThisInitialized-081f9914.js";import"./hasClass-ec9efd32.js";import"./uniqueId-4d05949d.js";import"./Popover-0894bcd3.js";import"./Modal-cf7a81a7.js";import"./Backdrop-0451e96c.js";import"./getScrollbarSize-ac846fe6.js";import"./createChainedFunction-0bab83cf.js";import"./Paper-16fb121c.js";import"./Box-fe8ef83e.js";import"./RadioGroup-bf0fed90.js";import"./UserSearchBoxV2-18c7df1d.js";import"./Select-457c486b.esm-aea63717.js";import"./isNativeReflectConstruct-e378569d.js";import"./use-deep-compare-effect.esm-08e85271.js";import"./index-5d0cf067.js";import"./uniq-feee8d5f.js";import"./_baseSlice-cf92e063.js";import"./without-c7324a45.js";import"./isArrayLikeObject-c369fda5.js";import"./UserOrTeamBadge-26b27778.js";import"./Form-98a3f736.js";import"./FormLabel-7b55e02a.js";import"./Col-8dbe8567.js";import"./FormGroup-a255fd2e.js";import"./Stack-49641969.js";import"./Button-b9be626b.js";import"./ButtonBase-bdd58ec3.js";import"./FileUpload-759ea4fc.js";import"./DialogTitle-cac35fb9.js";import"./IconButton-d433d837.js";import"./Divider-a55dd0d0.js";import"./Alert-19607992.js";import"./mock_file_handle-e16b5e33.js";import"./mock_user_profile-eae64209.js";import"./mockWiki-5b0a3111.js";import"./index-0d8ff56c.js";import"./util-441245ad.js";const Kt={title:"Governance/Data Access Request Flow/Managed Access Requirement/Step 2 - Accessors and Documentation",component:C},t={args:{entityId:c,managedACTAccessRequirement:n,researchProjectId:_},parameters:{msw:{handlers:[...R(r),...d(r),...A(r,O)]}}},o={args:{entityId:c,managedACTAccessRequirement:n,researchProjectId:_},parameters:{msw:{handlers:[...R(r),...d(r),...A(r,E)]}}};var m,e,i;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    entityId: MOCK_FOLDER_ID,
    managedACTAccessRequirement: mockManagedACTAccessRequirement,
    researchProjectId: MOCK_RESEARCH_PROJECT_ID
  },
  parameters: {
    msw: {
      handlers: [...getUserProfileHandlers(MOCK_REPO_ORIGIN), ...getFileHandlers(MOCK_REPO_ORIGIN), ...getDataAccessRequestHandlers(MOCK_REPO_ORIGIN, MOCK_DATA_ACCESS_REQUEST)]
    }
  }
}`,...(i=(e=t.parameters)==null?void 0:e.docs)==null?void 0:i.source}}};var p,s,a;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    entityId: MOCK_FOLDER_ID,
    managedACTAccessRequirement: mockManagedACTAccessRequirement,
    researchProjectId: MOCK_RESEARCH_PROJECT_ID
  },
  parameters: {
    msw: {
      handlers: [...getUserProfileHandlers(MOCK_REPO_ORIGIN), ...getFileHandlers(MOCK_REPO_ORIGIN), ...getDataAccessRequestHandlers(MOCK_REPO_ORIGIN, MOCK_DATA_ACCESS_RENEWAL)]
    }
  }
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const Pt=["Request","Renewal"];export{o as Renewal,t as Request,Pt as __namedExportsOrder,Kt as default};
//# sourceMappingURL=RequestDataAccessStep2.stories-eb9871ad.js.map
