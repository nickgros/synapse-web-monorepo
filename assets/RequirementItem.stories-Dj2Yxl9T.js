import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{m as P}from"./mockWiki-DvmfJBaP.js";import{M as x}from"./MarkdownSynapse-CYzOUZzi.js";import{d as s}from"./ToastMessage-CYL3z40S.js";import{R as n,a as t}from"./RequirementItem-CVbGWr58.js";import{P as O}from"./Paper-CiTNHdWV.js";import"./mock_user_profile-CCzWeUML.js";import"./mock_file_handle-CidTpPtG.js";import"./VerificationSubmission-OWkqLMYZ.js";import"./useFiles-CCgyXTk-.js";import"./SynapseConstants-Bkj3gHJE.js";import"./OrientationBanner-Kcb1EbaG.js";import"./index-VuyhINOV.js";import"./index--_s_l9g5.js";import"./iframe-pyZDNJ8T.js";import"./spreadSx-CwcO6WA9.js";import"./react-BT7bNxW7.js";import"./FullWidthAlert-BTfzgsOK.js";import"./Alert-OS0t4bPf.js";import"./createTheme-DxJ79BXc.js";import"./DefaultPropsProvider-iW3t653H.js";import"./useSlot-DveTpe9j.js";import"./useForkRef-DuFVzXGe.js";import"./createSimplePaletteValueFilter-SAZZY-kP.js";import"./createSvgIcon-Dh3r7Et6.js";import"./Close-CqPBC-YI.js";import"./IconButton-BS4bgkyD.js";import"./useTimeout-DRuALipg.js";import"./ButtonBase-DR4l1HUk.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-BnZig6ry.js";import"./Stack-DvaAKiBz.js";import"./extendSxProp-DGPJAFUB.js";import"./getThemeProps-BU7lhVxx.js";import"./useTheme-ClYKScKD.js";import"./Box--i-_aWQj.js";import"./AlertTitle-s2NeJaUb.js";import"./Typography-D2khfl49.js";import"./index-cXJRHP25.js";import"./useTheme-B0yWLZKw.js";import"./ClickAwayListener-Dd-apYwh.js";import"./getReactElementRef-J4nKeEsv.js";import"./index-X3wy_rbI.js";import"./index-BLshjiEN.js";import"./ownerDocument-DW-IO8s5.js";import"./Grow-DUH0kjWn.js";import"./Tooltip-BXMy3cax.js";import"./index-HuzFGznI.js";import"./useControlled-CG1DbziZ.js";import"./Popper-D4LipFq_.js";import"./Button-DQEfVqin.js";import"./fetchWithExponentialTimeout-CXmnpl-T.js";import"./StringUtils-C5rFena9.js";import"./useQuery-Mmwd0UGX.js";import"./QueryClientProvider-ZvUUiE0t.js";import"./Link-Br14C7fU.js";import"./Collapse-f9j8T1LX.js";import"./_baseUniq-DGhQ1Gxb.js";import"./_Uint8Array-CZ-bZX-p.js";import"./isArray-Y1hUIWuk.js";import"./_getTag-ByaQxPJR.js";import"./isEqual-BPgluCw7.js";import"./merge-Kg_vOFnX.js";import"./_initCloneObject-DaNCXzEh.js";import"./identity-DKeuBCMA.js";import"./tinycolor-Begke6kS.js";import"./Fade-Bo8PZvMt.js";import"./inputBaseClasses-Bt0ELv0W.js";import"./calculateFriendlyFileSize-CJJqCcxJ.js";import"./CheckCircleTwoTone-CvEuNtVO.js";import"./InfoTwoTone-6pdyjRO9.js";import"./useMutation-BlfAdHU_.js";import"./dayjs.min-DFoF1U9V.js";import"./chunk-AYJ5UCUI-CYpb56mu.js";import"./cloneDeep-azNH1Mt7.js";import"./Skeleton-BKtMPDz_.js";import"./SkeletonButton-BccUzQdQ.js";import"./SkeletonInlineBlock-zRyL9Gbk.js";import"./SkeletonTable-D3lzVgzH.js";import"./times-CaWXfkpY.js";import"./toInteger-DGWbuIPa.js";import"./isSymbol-DZd6qpcY.js";import"./SkeletonParagraph-ROXKOhOk.js";import"./uniqueId-DK5DZ5K4.js";import"./toString-D23exauM.js";import"./CSSTransition-Dlo_Mi5z.js";import"./ConditionalWrapper-CpBCX7_r.js";import"./LockTwoTone-CBcWnyLq.js";import"./Avatar-DreRDFea.js";const pr={title:"Governance/Data Access Request Flow/Requirements/RequirementItem",component:n,argTypes:{status:{control:"select",options:[...new Set(Object.values(t))]}},tags:["autodocs"],render:A=>a.jsx(O,{sx:{p:5,margin:"auto",maxWidth:"700px"},children:a.jsx(n,{...A,children:a.jsx(x,{markdown:P.markdown})})})},r={args:{status:t.COMPLETE,actions:[{variant:"outlined",children:"Learn More",onClick:()=>{s("Learn More clicked")}}]}},o={args:{status:t.PENDING,actions:[{variant:"outlined",children:"Learn More",onClick:()=>{s("Learn More clicked")}}]}},e={args:{status:t.LOADING,actions:[]}},i={args:{status:t.COMPLETE,actions:[]}},m={args:{status:t.LOCKED,actions:[{variant:"outlined",children:"Accept terms",onClick:()=>{s("Accept terms clicked")}}]}};var p,c,d;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(q=(I=m.parameters)==null?void 0:I.docs)==null?void 0:q.source}}};const cr=["Complete","Pending","Loading","NoActions","Locked"];export{r as Complete,e as Loading,m as Locked,i as NoActions,o as Pending,cr as __namedExportsOrder,pr as default};
