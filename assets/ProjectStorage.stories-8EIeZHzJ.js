import{g as s}from"./entityHandlers-CNRVa4m0.js";import{x as C,g as L,ba as d,B as k,M as r}from"./useFiles-D_JB97Dd.js";import"./VerificationSubmission-B0kBNeMy.js";import"./StringUtils-CzgJJW-6.js";import{l as O}from"./index-pmFAcyEy.js";import{g as a}from"./userProfileHandlers-CMjL-H2o.js";import{P as N}from"./ProjectDataAvailability-5f0s6AWs.js";import"./index-BnBuUQK-.js";import"./mock_user_profile-CijvmO8r.js";import"./mockProject-DajhyOGQ.js";import"./mockTeam-Fr_djS9J.js";import"./SynapseConstants-DP5MDcEa.js";import"./OrientationBanner-B9Ix_96M.js";import"./jsx-runtime-BD4Lws4r.js";import"./index-BQmiQiuI.js";import"./iframe-B_s7h1r3.js";import"./index-BKcNlqDU.js";import"./spreadSx-CwcO6WA9.js";import"./react-CIBidaCI.js";import"./FullWidthAlert-B6Hzy503.js";import"./Alert-DlTRLF6t.js";import"./createTheme-TJQ-Me4W.js";import"./resolveComponentProps-CNz-D9dt.js";import"./isHostComponent-DVu5iVWx.js";import"./useForkRef-DI00mLUt.js";import"./createSvgIcon-DH7gczeL.js";import"./DefaultPropsProvider-DtDi0Gt5.js";import"./Close-CggPnEUr.js";import"./IconButton-G7ahMeIA.js";import"./ButtonBase-BgglPDc6.js";import"./useTimeout-BDW9Ghs7.js";import"./TransitionGroupContext-BBWYv0r8.js";import"./useIsFocusVisible-Cex7JU8r.js";import"./useEventCallback-DAsX7y3A.js";import"./Paper-bcyjQXbo.js";import"./Stack-DylG5yLx.js";import"./getThemeProps-B1NOqccD.js";import"./useTheme-CoBXuknm.js";import"./Box-D3BYjgB7.js";import"./AlertTitle-6ZpIjRE4.js";import"./Typography-btQXjNFB.js";import"./useTheme-DwB7SBSA.js";import"./Grow-DjwQF0B5.js";import"./index-DBgz7f_2.js";import"./utils-B9UGWasi.js";import"./ClickAwayListener-vbZZL3nn.js";import"./ownerDocument-DW-IO8s5.js";import"./Tooltip-BnVDD-6_.js";import"./index-cvsUPyqt.js";import"./useControlled-CnNyARgE.js";import"./useId-DVHINaBJ.js";import"./Popper-CUtaqr2z.js";import"./Button-GHEHd2qc.js";import"./uniqueId-foaDn3QB.js";import"./toString-4uBEoJN0.js";import"./isObjectLike-DmjEXA5C.js";import"./isArray-Dxzbedgu.js";import"./isSymbol-B0yBMpE8.js";import"./times-BxF6ZD44.js";import"./_baseTimes-36S_kd0L.js";import"./identity-DKeuBCMA.js";import"./toInteger-DzgHPup7.js";import"./mockTableEntity-fPHsfiKn.js";import"./mockFileEntityACLVariants-DwKeLio6.js";import"./fakerUtils-Cy6SwSD0.js";import"./mockFileEntity-CKKyz2DS.js";import"./mock_file_handle-Ct1MSfYs.js";import"./mockEntity-DwrfG7Ml.js";import"./mockSchema-DUD-kT13.js";import"./fetchWithExponentialTimeout-Cpvpsfq8.js";import"./useQuery-BRwyF-CG.js";import"./utils-aAzvXSW-.js";import"./Link-D3THyCk_.js";import"./Collapse-jKA3781i.js";import"./isNil-mi6BU05T.js";import"./_Uint8Array-DECVW7wJ.js";import"./_baseIsEqual-C4SuTQ3y.js";import"./_getTag-DYiGo6mU.js";import"./tinycolor-Begke6kS.js";import"./Fade-j31nN2R5.js";import"./Skeleton-B0qgezQP.js";import"./inputBaseClasses-Bonb5ujV.js";import"./calculateFriendlyFileSize-CR3Crrbc.js";import"./CheckCircleTwoTone-BagmZIiC.js";import"./InfoTwoTone-BqVlvS4U.js";import"./mutation-Bl_77Z8X.js";import"./dayjs.min-D6Gybxm8.js";import"./chunk-AYJ5UCUI-DuHSP6qP.js";import"./cloneDeep-D-VLR9nf.js";import"./_initCloneObject-CWrZArqt.js";import"./isEqual-DLYyY67n.js";import"./merge-D9bDLSfz.js";import"./util-U4Nrrqkz.js";import"./HelpPopover-xujSKLCk.js";import"./MarkdownPopover-Dw5KyvzG.js";import"./LightTooltip-SeMrTTBB.js";import"./MarkdownSynapse-DJwz4JA-.js";import"./SkeletonButton-CUz-cBYp.js";import"./SkeletonInlineBlock-DmWfdPEs.js";import"./SkeletonTable-BlksKcy8.js";import"./SkeletonParagraph-CCLHTBSK.js";import"./HelpOutlineTwoTone-CM-eX0TL.js";const p="syn54321",n="syn12345",D={projectId:p,locations:[{storageLocationId:C,sumFileBytes:12e8,maxAllowedFileBytes:1073741824,isOverLimit:!0},{storageLocationId:2,sumFileBytes:1e8,maxAllowedFileBytes:1073741824,isOverLimit:!1}]},M={projectId:n,locations:[{storageLocationId:C,sumFileBytes:5420135,maxAllowedFileBytes:5571138,isOverLimit:!1},{storageLocationId:2,sumFileBytes:1e3,maxAllowedFileBytes:1073741824,isOverLimit:!1}]},c=(l=L(k.REPO_ENDPOINT))=>[O.rest.get(`${l}${d(p)}`,async(S,m,t)=>m(t.status(201),t.json(D))),O.rest.get(`${l}${d(n)}`,async(S,m,t)=>m(t.status(201),t.json(M)))],St={title:"Synapse/ProjectStorage",component:N,argTypes:{isAuthenticated:{type:"boolean"}},args:{isAuthenticated:!0}},o={args:{projectId:n,sx:{backgroundColor:"#375574"}},parameters:{stack:"mock",msw:{handlers:[...a(r),...s(r),...c(r)]}}},e={args:{projectId:p,sx:{backgroundColor:"#375574"}},parameters:{stack:"mock",msw:{handlers:[...a(r),...s(r),...c(r)]}}},i={args:{projectId:"syn31415123"},parameters:{stack:"mock",msw:{handlers:[...a(r),...s(r),...c(r)]}}};var g,I,_;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
