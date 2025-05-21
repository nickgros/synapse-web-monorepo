import{g as s}from"./entityHandlers-DiIXZCZl.js";import{x as C,g as L,ba as d,B as k,M as r}from"./useFiles-CdEuNTln.js";import"./VerificationSubmission-B0kBNeMy.js";import"./StringUtils-CzgJJW-6.js";import{l as O}from"./index-DvoKTELr.js";import{g as a}from"./userProfileHandlers-B17ldxgu.js";import{P as N}from"./ProjectDataAvailability-C6D__HAo.js";import"./index-BLn3DKtz.js";import"./mock_user_profile-CijvmO8r.js";import"./mockProject-BKz4kt-H.js";import"./mockTeam-CdRPsVFt.js";import"./SynapseConstants-D_-Mglhc.js";import"./OrientationBanner-BVBRgBWG.js";import"./jsx-runtime-B4FpmzGn.js";import"./index-DM3lAj0n.js";import"./iframe-CRfNb6wr.js";import"./index-JdWBSvRH.js";import"./spreadSx-CwcO6WA9.js";import"./react-BLybFQ8v.js";import"./FullWidthAlert-D28Lfxc0.js";import"./Alert-BQ8iX0zs.js";import"./createTheme-osPrpjgg.js";import"./resolveComponentProps-D_2DfIoC.js";import"./isHostComponent-DVu5iVWx.js";import"./useForkRef-BHBs7cXw.js";import"./createSvgIcon-BrQkkf0p.js";import"./DefaultPropsProvider-CDZ5UpDb.js";import"./Close-pdN-BmGJ.js";import"./IconButton-TpVC3epP.js";import"./ButtonBase-DCaCj3sn.js";import"./useTimeout-BCy9KhqP.js";import"./TransitionGroupContext-CNkLMHpL.js";import"./useIsFocusVisible-B5ADwpsA.js";import"./useEventCallback-CiFSq2a8.js";import"./Paper-GW9W9AF7.js";import"./Stack-CX9jAOXR.js";import"./getThemeProps-B8GeAVWs.js";import"./useTheme-B-hk7JXy.js";import"./Box-DjTGEn4B.js";import"./AlertTitle-CiwJyD7U.js";import"./Typography-PZ3cAU7R.js";import"./useTheme-BRzUHJhE.js";import"./Grow-Yf-W7JhX.js";import"./index-BRH3Pwrf.js";import"./utils-C3bYj40K.js";import"./ClickAwayListener-C6ZzDciG.js";import"./ownerDocument-DW-IO8s5.js";import"./Tooltip-D2PubBmm.js";import"./index-S6Byxz46.js";import"./useControlled-Ckobgvpz.js";import"./useId-BEi9DTfm.js";import"./Popper-Cz_FEOFb.js";import"./Button-C-8yzvZD.js";import"./uniqueId-O3FEDdmM.js";import"./toString-CM9QmtIa.js";import"./isObjectLike-DH-PBdkJ.js";import"./isArray-Dxzbedgu.js";import"./isSymbol-CvDyCsQQ.js";import"./times-l_nnj-19.js";import"./_baseTimes-36S_kd0L.js";import"./identity-DKeuBCMA.js";import"./toInteger-G-_p9SXu.js";import"./mockTableEntity-XxwJPRrz.js";import"./mockFileEntityACLVariants-BQeWubwr.js";import"./fakerUtils-4ATYNlsk.js";import"./mockFileEntity-Bg2aEyi6.js";import"./mock_file_handle-Ct1MSfYs.js";import"./mockEntity-Cvw1T7Or.js";import"./mockSchema-DgPPR9sK.js";import"./fetchWithExponentialTimeout-Cpvpsfq8.js";import"./useQuery-CJozhmIc.js";import"./utils-AjNs7ZhI.js";import"./Link-BZU5QgnK.js";import"./Collapse-DBRBfWMU.js";import"./isNil-C1eJch1d.js";import"./_Uint8Array-3HIv5n6-.js";import"./_baseIsEqual-gX59yvAN.js";import"./_getTag-CLHDtv5D.js";import"./tinycolor-Begke6kS.js";import"./Fade-Cu1REOp1.js";import"./Skeleton-Badjms_1.js";import"./inputBaseClasses-DOFWpaeq.js";import"./calculateFriendlyFileSize-gtBJ7iNS.js";import"./CheckCircleTwoTone-Dj4CzCKD.js";import"./InfoTwoTone-BMk8VF8H.js";import"./mutation-BbpDoA-k.js";import"./dayjs.min-Y7vEwyx-.js";import"./chunk-AYJ5UCUI-CCzS9PSe.js";import"./cloneDeep-DlEqzMhR.js";import"./_initCloneObject-UaoA3kHC.js";import"./isEqual-C9VzGFfO.js";import"./merge-qtOmgSgf.js";import"./util-DiFOny7j.js";import"./HelpPopover-CLMdWTQx.js";import"./MarkdownPopover-BOEDheie.js";import"./LightTooltip-CJ-Mb4pu.js";import"./MarkdownSynapse-B6OOnck0.js";import"./SkeletonButton-DqOkdRt0.js";import"./SkeletonInlineBlock-lqbTGdIu.js";import"./SkeletonTable-CAhG91s_.js";import"./SkeletonParagraph-BOdonX1Q.js";import"./HelpOutlineTwoTone-CHHvslGz.js";const p="syn54321",n="syn12345",D={projectId:p,locations:[{storageLocationId:C,sumFileBytes:12e8,maxAllowedFileBytes:1073741824,isOverLimit:!0},{storageLocationId:2,sumFileBytes:1e8,maxAllowedFileBytes:1073741824,isOverLimit:!1}]},M={projectId:n,locations:[{storageLocationId:C,sumFileBytes:5420135,maxAllowedFileBytes:5571138,isOverLimit:!1},{storageLocationId:2,sumFileBytes:1e3,maxAllowedFileBytes:1073741824,isOverLimit:!1}]},c=(l=L(k.REPO_ENDPOINT))=>[O.rest.get(`${l}${d(p)}`,async(S,m,t)=>m(t.status(201),t.json(D))),O.rest.get(`${l}${d(n)}`,async(S,m,t)=>m(t.status(201),t.json(M)))],St={title:"Synapse/ProjectStorage",component:N,argTypes:{isAuthenticated:{type:"boolean"}},args:{isAuthenticated:!0}},o={args:{projectId:n,sx:{backgroundColor:"#375574"}},parameters:{stack:"mock",msw:{handlers:[...a(r),...s(r),...c(r)]}}},e={args:{projectId:p,sx:{backgroundColor:"#375574"}},parameters:{stack:"mock",msw:{handlers:[...a(r),...s(r),...c(r)]}}},i={args:{projectId:"syn31415123"},parameters:{stack:"mock",msw:{handlers:[...a(r),...s(r),...c(r)]}}};var g,I,_;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    projectId: UNDER_LIMIT_PROJECT_ID,
    sx: {
      backgroundColor: '#375574'
    }
  },
  parameters: {
    stack: 'mock',
    msw: {
      handlers: [...getUserProfileHandlers(MOCK_REPO_ORIGIN), ...getEntityHandlers(MOCK_REPO_ORIGIN), ...getProjectStorageHandlers(MOCK_REPO_ORIGIN)]
    }
  }
}`,...(_=(I=o.parameters)==null?void 0:I.docs)==null?void 0:_.source}}};var P,E,R;e.parameters={...e.parameters,docs:{...(P=e.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    projectId: OVER_LIMIT_PROJECT_ID,
    sx: {
      backgroundColor: '#375574'
    }
  },
  parameters: {
    stack: 'mock',
    msw: {
      handlers: [...getUserProfileHandlers(MOCK_REPO_ORIGIN), ...getEntityHandlers(MOCK_REPO_ORIGIN), ...getProjectStorageHandlers(MOCK_REPO_ORIGIN)]
    }
  }
}`,...(R=(E=e.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var u,j,y;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    projectId: 'syn31415123'
  },
  parameters: {
    stack: 'mock',
    msw: {
      handlers: [...getUserProfileHandlers(MOCK_REPO_ORIGIN), ...getEntityHandlers(MOCK_REPO_ORIGIN), ...getProjectStorageHandlers(MOCK_REPO_ORIGIN)]
    }
  }
}`,...(y=(j=i.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};const Lt=["ProjectDataUnderLimit","ProjectDataOverLimit","ProjectDataStorageNotSet"];export{e as ProjectDataOverLimit,i as ProjectDataStorageNotSet,o as ProjectDataUnderLimit,Lt as __namedExportsOrder,St as default};
