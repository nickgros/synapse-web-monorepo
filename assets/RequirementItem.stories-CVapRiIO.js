import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{m as P}from"./mockWiki-DvmfJBaP.js";import{M as x}from"./MarkdownSynapse-BgG9gINe.js";import{d as s}from"./ToastMessage-QWxWbCvJ.js";import{R as n,a as t}from"./RequirementItem-CMohGDGk.js";import{P as O}from"./Paper-BRd7e4fC.js";import"./mock_user_profile-CCzWeUML.js";import"./mock_file_handle-CidTpPtG.js";import"./VerificationSubmission-OWkqLMYZ.js";import"./useFiles-BUu89yGE.js";import"./SynapseConstants-rKzWuB9C.js";import"./OrientationBanner-CMFOJsKa.js";import"./index-BiOV1WPy.js";import"./index-BGwCjzbq.js";import"./iframe-CnWSDyXX.js";import"./spreadSx-CwcO6WA9.js";import"./react-7k-RsfM5.js";import"./FullWidthAlert-NJvM2bNu.js";import"./Alert-BY2taNgb.js";import"./createTheme-Du15g0dt.js";import"./DefaultPropsProvider-vDWjVbKg.js";import"./useSlot-DWnLYyiQ.js";import"./useForkRef-nTb_Saty.js";import"./createSimplePaletteValueFilter-ChOpG9_R.js";import"./createSvgIcon-DAYJQsnG.js";import"./Close-DehIfdg0.js";import"./IconButton-CiLvqZdK.js";import"./useTimeout-Bi1CDIUi.js";import"./ButtonBase-ubc2E2Ay.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-CH0Pk9TH.js";import"./Stack-BrYUN2QG.js";import"./extendSxProp-FDZaqXBK.js";import"./getThemeProps-DqdkQaE7.js";import"./useTheme-CCQ3hhHc.js";import"./Box-DghftoY6.js";import"./AlertTitle-C6b-POKQ.js";import"./Typography-DH53t_A2.js";import"./index-DCoY1t5N.js";import"./useTheme-BILe9Jse.js";import"./ClickAwayListener-JE3wXKV-.js";import"./getReactElementRef-BnSF9POM.js";import"./index-CFZ7vApf.js";import"./index-vImqEjw7.js";import"./ownerDocument-DW-IO8s5.js";import"./Grow-D0ZEx42E.js";import"./Tooltip-DLTVyP6f.js";import"./index-D5-SPrYU.js";import"./useControlled-BzGqdkmj.js";import"./Popper-DAgWQTLd.js";import"./Button-Be35lKrG.js";import"./fetchWithExponentialTimeout-CXmnpl-T.js";import"./StringUtils-C5rFena9.js";import"./useQuery-D27XFFLH.js";import"./QueryClientProvider-B0cafNuy.js";import"./Link-C0P8cqxo.js";import"./Collapse-KTn_5HMb.js";import"./_baseUniq-BbDrGO5p.js";import"./_Uint8Array-B-2hgbyU.js";import"./isArray-CIwPvzzW.js";import"./_getTag-q6oiYMDs.js";import"./isEqual-3vJKMzSy.js";import"./merge-BhVyq8av.js";import"./_initCloneObject-Cf1NRmbM.js";import"./identity-DKeuBCMA.js";import"./tinycolor-Begke6kS.js";import"./Fade-Cl0NecSX.js";import"./inputBaseClasses-CF8zZraK.js";import"./calculateFriendlyFileSize-Dxb9vza6.js";import"./CheckCircleTwoTone-B2OaYC4J.js";import"./InfoTwoTone-CrACtaJo.js";import"./useMutation-D1m3keUU.js";import"./dayjs.min-CTxTrKDO.js";import"./chunk-AYJ5UCUI-cFihD_VC.js";import"./cloneDeep-BpUueBbT.js";import"./Skeleton-BEakPQBj.js";import"./SkeletonButton-r7MbP-3Q.js";import"./SkeletonInlineBlock-B8nPFEEi.js";import"./SkeletonTable-DPWqXrtZ.js";import"./times-w7DQASRc.js";import"./toInteger-BP6B6_gS.js";import"./isSymbol-Br3gAnqL.js";import"./SkeletonParagraph-B4A_VXT9.js";import"./uniqueId-Ct_dZ2mn.js";import"./toString-B7E8tJHS.js";import"./CSSTransition-BzR30JQ1.js";import"./ConditionalWrapper-CpBCX7_r.js";import"./LockTwoTone-CAPMAkWW.js";import"./Avatar-B3F3NEu9.js";const pr={title:"Governance/Data Access Request Flow/Requirements/RequirementItem",component:n,argTypes:{status:{control:"select",options:[...new Set(Object.values(t))]}},tags:["autodocs"],render:A=>a.jsx(O,{sx:{p:5,margin:"auto",maxWidth:"700px"},children:a.jsx(n,{...A,children:a.jsx(x,{markdown:P.markdown})})})},r={args:{status:t.COMPLETE,actions:[{variant:"outlined",children:"Learn More",onClick:()=>{s("Learn More clicked")}}]}},o={args:{status:t.PENDING,actions:[{variant:"outlined",children:"Learn More",onClick:()=>{s("Learn More clicked")}}]}},e={args:{status:t.LOADING,actions:[]}},i={args:{status:t.COMPLETE,actions:[]}},m={args:{status:t.LOCKED,actions:[{variant:"outlined",children:"Accept terms",onClick:()=>{s("Accept terms clicked")}}]}};var p,c,d;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
