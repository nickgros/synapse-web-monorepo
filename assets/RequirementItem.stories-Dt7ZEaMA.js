import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{m as P}from"./mockWiki-DvmfJBaP.js";import{M as x}from"./MarkdownSynapse-BEZuFlUx.js";import{d as s}from"./ToastMessage-Dv_5Qvnv.js";import{R as n,a as t}from"./RequirementItem-onrEk5vb.js";import{P as O}from"./Paper-B113B_DA.js";import"./mock_user_profile-CCzWeUML.js";import"./mock_file_handle-CidTpPtG.js";import"./VerificationSubmission-OWkqLMYZ.js";import"./useFiles-BZQkX1dI.js";import"./SynapseConstants-CllGbX7S.js";import"./OrientationBanner-BHKPAHO-.js";import"./index-icPz55-X.js";import"./index-bqo5TgK4.js";import"./iframe-BWhMz8_p.js";import"./spreadSx-CwcO6WA9.js";import"./react--tzJNvOD.js";import"./FullWidthAlert-COW_t_J5.js";import"./Alert-B5eONfD9.js";import"./createTheme-DafKpa7R.js";import"./DefaultPropsProvider-D5B1AITN.js";import"./useSlot-Bf19Xh20.js";import"./useForkRef-DBPyDf3S.js";import"./createSimplePaletteValueFilter-sGs_ku48.js";import"./createSvgIcon-aLr9nUbl.js";import"./Close-CPe9-B-_.js";import"./IconButton-BFO5f6ua.js";import"./useTimeout-BRiyRUpE.js";import"./ButtonBase-BIKkVoec.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-C5IYZviS.js";import"./Stack-Cw4rnpPd.js";import"./extendSxProp-Cph9rC05.js";import"./getThemeProps-D8p_Hs8v.js";import"./useTheme-DpXojDgV.js";import"./Box-DQNN0Wyh.js";import"./AlertTitle-DN1AtXzx.js";import"./Typography-bPn8uOYp.js";import"./index-BfprNM_h.js";import"./useTheme-CNSIRb32.js";import"./ClickAwayListener-CT2CFK1B.js";import"./getReactElementRef-C8P0G6nS.js";import"./index-B7iH1pIn.js";import"./index-BzeBLNAY.js";import"./ownerDocument-DW-IO8s5.js";import"./Grow-DBGKzkJE.js";import"./Tooltip-CDH_CeG3.js";import"./index-DxZ0auih.js";import"./useControlled-Dgt9tsee.js";import"./Popper-BC3eKN7L.js";import"./Button-BBNinPG5.js";import"./fetchWithExponentialTimeout-CXmnpl-T.js";import"./StringUtils-C5rFena9.js";import"./useQuery-B9K678_k.js";import"./QueryClientProvider-U8qNJQn1.js";import"./Link-B1XQuswW.js";import"./Collapse-PsOCgvT3.js";import"./_baseUniq-BMskdysw.js";import"./_Uint8Array-Cy3P2JvP.js";import"./isArray-CgWF71ud.js";import"./_getTag-0OUQPZLe.js";import"./isEqual-BZJfvA5d.js";import"./merge-BufnmKa6.js";import"./_initCloneObject-BLOZowN2.js";import"./identity-DKeuBCMA.js";import"./tinycolor-Begke6kS.js";import"./Fade-CA57bcmY.js";import"./inputBaseClasses-BneXfZmT.js";import"./calculateFriendlyFileSize-BU-OHEIH.js";import"./CheckCircleTwoTone-BSWQP55r.js";import"./InfoTwoTone-B_9ZJfKP.js";import"./useMutation-qZdexzOi.js";import"./dayjs.min-BSEUi5J-.js";import"./chunk-AYJ5UCUI-CEjdLjLk.js";import"./cloneDeep-DOM1lfBU.js";import"./Skeleton-DnCTojLF.js";import"./SkeletonButton-mvGXkjK0.js";import"./SkeletonInlineBlock-CKEpyr_O.js";import"./SkeletonTable-40xKCFJl.js";import"./times-D9ImHEw3.js";import"./toInteger-Gu2MRNS5.js";import"./isSymbol-IbNxRAH2.js";import"./SkeletonParagraph-DeRnjt0A.js";import"./uniqueId-DLn5h1HL.js";import"./toString-xC0y-h2a.js";import"./CSSTransition-HmxlzJWx.js";import"./ConditionalWrapper-CpBCX7_r.js";import"./LockTwoTone-c5p9dxDb.js";import"./Avatar-CcWJXTxA.js";const pr={title:"Governance/Data Access Request Flow/Requirements/RequirementItem",component:n,argTypes:{status:{control:"select",options:[...new Set(Object.values(t))]}},tags:["autodocs"],render:A=>a.jsx(O,{sx:{p:5,margin:"auto",maxWidth:"700px"},children:a.jsx(n,{...A,children:a.jsx(x,{markdown:P.markdown})})})},r={args:{status:t.COMPLETE,actions:[{variant:"outlined",children:"Learn More",onClick:()=>{s("Learn More clicked")}}]}},o={args:{status:t.PENDING,actions:[{variant:"outlined",children:"Learn More",onClick:()=>{s("Learn More clicked")}}]}},e={args:{status:t.LOADING,actions:[]}},i={args:{status:t.COMPLETE,actions:[]}},m={args:{status:t.LOCKED,actions:[{variant:"outlined",children:"Accept terms",onClick:()=>{s("Accept terms clicked")}}]}};var p,c,d;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
