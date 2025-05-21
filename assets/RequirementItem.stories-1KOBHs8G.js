import{j as a}from"./jsx-runtime-B4FpmzGn.js";import{m as P}from"./mockWiki-CZdZHQnO.js";import{M as x}from"./MarkdownSynapse-B6OOnck0.js";import{d as s}from"./ToastMessage-DC85le6X.js";import{R as n,a as t}from"./RequirementItem-CBa0jo1-.js";import{P as O}from"./Paper-GW9W9AF7.js";import"./index-DM3lAj0n.js";import"./iframe-CRfNb6wr.js";import"./mock_user_profile-CijvmO8r.js";import"./mock_file_handle-Ct1MSfYs.js";import"./VerificationSubmission-B0kBNeMy.js";import"./useFiles-CdEuNTln.js";import"./SynapseConstants-D_-Mglhc.js";import"./OrientationBanner-BVBRgBWG.js";import"./index-JdWBSvRH.js";import"./spreadSx-CwcO6WA9.js";import"./react-BLybFQ8v.js";import"./FullWidthAlert-D28Lfxc0.js";import"./Alert-BQ8iX0zs.js";import"./createTheme-osPrpjgg.js";import"./resolveComponentProps-D_2DfIoC.js";import"./isHostComponent-DVu5iVWx.js";import"./useForkRef-BHBs7cXw.js";import"./createSvgIcon-BrQkkf0p.js";import"./DefaultPropsProvider-CDZ5UpDb.js";import"./Close-pdN-BmGJ.js";import"./IconButton-TpVC3epP.js";import"./ButtonBase-DCaCj3sn.js";import"./useTimeout-BCy9KhqP.js";import"./TransitionGroupContext-CNkLMHpL.js";import"./useIsFocusVisible-B5ADwpsA.js";import"./useEventCallback-CiFSq2a8.js";import"./Stack-CX9jAOXR.js";import"./getThemeProps-B8GeAVWs.js";import"./useTheme-B-hk7JXy.js";import"./Box-DjTGEn4B.js";import"./AlertTitle-CiwJyD7U.js";import"./Typography-PZ3cAU7R.js";import"./useTheme-BRzUHJhE.js";import"./Grow-Yf-W7JhX.js";import"./index-BRH3Pwrf.js";import"./utils-C3bYj40K.js";import"./ClickAwayListener-C6ZzDciG.js";import"./ownerDocument-DW-IO8s5.js";import"./Tooltip-D2PubBmm.js";import"./index-S6Byxz46.js";import"./useControlled-Ckobgvpz.js";import"./useId-BEi9DTfm.js";import"./Popper-Cz_FEOFb.js";import"./Button-C-8yzvZD.js";import"./fetchWithExponentialTimeout-Cpvpsfq8.js";import"./StringUtils-CzgJJW-6.js";import"./useQuery-CJozhmIc.js";import"./utils-AjNs7ZhI.js";import"./Link-BZU5QgnK.js";import"./Collapse-DBRBfWMU.js";import"./isNil-C1eJch1d.js";import"./_Uint8Array-3HIv5n6-.js";import"./_baseTimes-36S_kd0L.js";import"./isObjectLike-DH-PBdkJ.js";import"./isArray-Dxzbedgu.js";import"./_baseIsEqual-gX59yvAN.js";import"./_getTag-CLHDtv5D.js";import"./tinycolor-Begke6kS.js";import"./Fade-Cu1REOp1.js";import"./Skeleton-Badjms_1.js";import"./inputBaseClasses-DOFWpaeq.js";import"./calculateFriendlyFileSize-gtBJ7iNS.js";import"./CheckCircleTwoTone-Dj4CzCKD.js";import"./InfoTwoTone-BMk8VF8H.js";import"./mutation-BbpDoA-k.js";import"./dayjs.min-Y7vEwyx-.js";import"./chunk-AYJ5UCUI-CCzS9PSe.js";import"./cloneDeep-DlEqzMhR.js";import"./_initCloneObject-UaoA3kHC.js";import"./isEqual-C9VzGFfO.js";import"./merge-qtOmgSgf.js";import"./identity-DKeuBCMA.js";import"./SkeletonButton-DqOkdRt0.js";import"./SkeletonInlineBlock-lqbTGdIu.js";import"./SkeletonTable-CAhG91s_.js";import"./times-l_nnj-19.js";import"./toInteger-G-_p9SXu.js";import"./isSymbol-CvDyCsQQ.js";import"./SkeletonParagraph-BOdonX1Q.js";import"./uniqueId-O3FEDdmM.js";import"./toString-CM9QmtIa.js";import"./CSSTransition-Bi0NWyxK.js";import"./ConditionalWrapper-DK3fDXF3.js";import"./LockTwoTone-z1aFbXOT.js";import"./Avatar-DoZ4DpBo.js";const dr={title:"Governance/Data Access Request Flow/Requirements/RequirementItem",component:n,argTypes:{status:{control:"select",options:[...new Set(Object.values(t))]}},tags:["autodocs"],render:A=>a.jsx(O,{sx:{p:5,margin:"auto",maxWidth:"700px"},children:a.jsx(n,{...A,children:a.jsx(x,{markdown:P.markdown})})})},r={args:{status:t.COMPLETE,actions:[{variant:"outlined",children:"Learn More",onClick:()=>{s("Learn More clicked")}}]}},o={args:{status:t.PENDING,actions:[{variant:"outlined",children:"Learn More",onClick:()=>{s("Learn More clicked")}}]}},e={args:{status:t.LOADING,actions:[]}},i={args:{status:t.COMPLETE,actions:[]}},m={args:{status:t.LOCKED,actions:[{variant:"outlined",children:"Accept terms",onClick:()=>{s("Accept terms clicked")}}]}};var p,c,d;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    status: RequirementItemStatus.COMPLETE,
    actions: [{
      variant: 'outlined',
      children: 'Learn More',
      onClick: () => {
        displayToast('Learn More clicked');
      }
    }]
  }
}`,...(d=(c=r.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,l,g;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    status: RequirementItemStatus.PENDING,
    actions: [{
      variant: 'outlined',
      children: 'Learn More',
      onClick: () => {
        displayToast('Learn More clicked');
      }
    }]
  }
}`,...(g=(l=o.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var L,k,C;e.parameters={...e.parameters,docs:{...(L=e.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    status: RequirementItemStatus.LOADING,
    actions: []
  }
}`,...(C=(k=e.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var M,E,R;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    status: RequirementItemStatus.COMPLETE,
    actions: []
  }
}`,...(R=(E=i.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var S,I,q;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    status: RequirementItemStatus.LOCKED,
    actions: [{
      variant: 'outlined',
      children: 'Accept terms',
      onClick: () => {
        displayToast('Accept terms clicked');
      }
    }]
  }
}`,...(q=(I=m.parameters)==null?void 0:I.docs)==null?void 0:q.source}}};const ur=["Complete","Pending","Loading","NoActions","Locked"];export{r as Complete,e as Loading,m as Locked,i as NoActions,o as Pending,ur as __namedExportsOrder,dr as default};
