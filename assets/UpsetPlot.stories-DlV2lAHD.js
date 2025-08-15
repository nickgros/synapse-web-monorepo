import{U as L}from"./UpsetPlot-BtVdz37V.js";import{f as u}from"./index-Cn2ZFpO2.js";import"./jsx-runtime-D_zvdyIk.js";import"./LargeButton-CYpRMRrC.js";import"./DefaultPropsProvider-iW3t653H.js";import"./createTheme-DxJ79BXc.js";import"./index--_s_l9g5.js";import"./iframe-pyZDNJ8T.js";import"./Button-DQEfVqin.js";import"./createSimplePaletteValueFilter-SAZZY-kP.js";import"./useTimeout-DRuALipg.js";import"./ButtonBase-DR4l1HUk.js";import"./useForkRef-DuFVzXGe.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-BnZig6ry.js";import"./useFiles-CCgyXTk-.js";import"./VerificationSubmission-OWkqLMYZ.js";import"./SynapseConstants-Bkj3gHJE.js";import"./OrientationBanner-Kcb1EbaG.js";import"./index-VuyhINOV.js";import"./spreadSx-CwcO6WA9.js";import"./react-BT7bNxW7.js";import"./FullWidthAlert-BTfzgsOK.js";import"./Alert-OS0t4bPf.js";import"./useSlot-DveTpe9j.js";import"./createSvgIcon-Dh3r7Et6.js";import"./Close-CqPBC-YI.js";import"./IconButton-BS4bgkyD.js";import"./Paper-CiTNHdWV.js";import"./useTheme-B0yWLZKw.js";import"./useTheme-ClYKScKD.js";import"./Stack-DvaAKiBz.js";import"./extendSxProp-DGPJAFUB.js";import"./getThemeProps-BU7lhVxx.js";import"./Box--i-_aWQj.js";import"./AlertTitle-s2NeJaUb.js";import"./Typography-D2khfl49.js";import"./index-cXJRHP25.js";import"./ClickAwayListener-Dd-apYwh.js";import"./getReactElementRef-J4nKeEsv.js";import"./index-X3wy_rbI.js";import"./index-BLshjiEN.js";import"./ownerDocument-DW-IO8s5.js";import"./Grow-DUH0kjWn.js";import"./Tooltip-BXMy3cax.js";import"./index-HuzFGznI.js";import"./useControlled-CG1DbziZ.js";import"./Popper-D4LipFq_.js";import"./fetchWithExponentialTimeout-CXmnpl-T.js";import"./StringUtils-C5rFena9.js";import"./useQuery-Mmwd0UGX.js";import"./QueryClientProvider-ZvUUiE0t.js";import"./Link-Br14C7fU.js";import"./Collapse-f9j8T1LX.js";import"./_baseUniq-DGhQ1Gxb.js";import"./_Uint8Array-CZ-bZX-p.js";import"./isArray-Y1hUIWuk.js";import"./_getTag-ByaQxPJR.js";import"./isEqual-BPgluCw7.js";import"./merge-Kg_vOFnX.js";import"./_initCloneObject-DaNCXzEh.js";import"./identity-DKeuBCMA.js";import"./tinycolor-Begke6kS.js";import"./Fade-Bo8PZvMt.js";import"./inputBaseClasses-Bt0ELv0W.js";import"./calculateFriendlyFileSize-CJJqCcxJ.js";import"./CheckCircleTwoTone-CvEuNtVO.js";import"./InfoTwoTone-6pdyjRO9.js";import"./useMutation-BlfAdHU_.js";import"./dayjs.min-DFoF1U9V.js";import"./chunk-AYJ5UCUI-CYpb56mu.js";import"./cloneDeep-azNH1Mt7.js";import"./Skeleton-BKtMPDz_.js";import"./SqlFunctions-C8HqQ3uk.js";import"./ColorGradient-Zy7TAKxK.js";import"./colorPalette-BALeOMsp.js";import"./LoadingScreen-DFMq7rYA.js";import"./Backdrop-B2t1Gkx4.js";import"./LinearProgress-DPpboXup.js";import"./index-DgYV2Mpi.js";import"./index-DzCgId_D.js";import"./index-BzqzPtH1.js";import"./const-BP60AzNb.js";import"./index-CUE6E-SM.js";const $t={title:"Home Page/UpsetPlot",component:L},t={args:{sql:"SELECT unnest(individualID), assay FROM syn20821313.6 WHERE individualID is not null GROUP BY assay, unnest(individualID)",rgbIndex:0,maxBarCount:20,setName:"Individuals (#) per Assay",combinationName:"Individuals (#)",summaryLink:"#",summaryLinkText:"Explore All Of Something",onClick:d=>{const y={sql:"select * from syn12345",selectedFacets:[{concreteType:"org.sagebionetworks.repo.model.table.FacetColumnValuesRequest",columnName:"Assays",facetValues:[...d.sets.values()].map(I=>I.name)}]},E=`/Explore/Data%20by%20Files?QueryWrapper0=${JSON.stringify(y)}`;console.log(E)}}},o={args:{sql:"SELECT individualID, assay FROM syn51489960 WHERE metadataType IS NULL and assay IS NOT NULL",rgbIndex:0,maxBarCount:10,setName:"Set size",combinationName:"Intersection size",onClick:u()}},r={args:{sql:"SELECT individualID, assay FROM syn51489960 WHERE metadataType IS NULL and assay IS NOT NULL",maxBarCount:10,setName:"Set size",combinationName:"Intersection size",variant:"ampals",onClick:u()}};var i,e,a;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    sql: 'SELECT unnest(individualID), assay FROM syn20821313.6 WHERE individualID is not null GROUP BY assay, unnest(individualID)',
    rgbIndex: 0,
    maxBarCount: 20,
    setName: 'Individuals (#) per Assay',
    combinationName: 'Individuals (#)',
    summaryLink: '#',
    summaryLinkText: 'Explore All Of Something',
    onClick: selection => {
      const sets = (selection as any).sets;
      const query: Query = {
        sql: 'select * from syn12345',
        // stub files sql
        selectedFacets: [{
          concreteType: 'org.sagebionetworks.repo.model.table.FacetColumnValuesRequest',
          columnName: 'Assays',
          facetValues: [...sets.values()].map((v: any) => v.name) as string[]
        }]
      };
      const url = \`/Explore/Data%20by%20Files?QueryWrapper0=\${JSON.stringify(query)}\`;
      console.log(url);
    }
  }
}`,...(a=(e=t.parameters)==null?void 0:e.docs)==null?void 0:a.source}}};var s,n,m;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    sql: 'SELECT individualID, assay FROM syn51489960 WHERE metadataType IS NULL and assay IS NOT NULL',
    rgbIndex: 0,
    maxBarCount: 10,
    setName: 'Set size',
    combinationName: 'Intersection size',
    onClick: fn()
  }
}`,...(m=(n=o.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};var p,l,c;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    sql: 'SELECT individualID, assay FROM syn51489960 WHERE metadataType IS NULL and assay IS NOT NULL',
    maxBarCount: 10,
    setName: 'Set size',
    combinationName: 'Intersection size',
    variant: 'ampals',
    onClick: fn()
  }
}`,...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const jt=["Demo","ElitePortalDemo","AMPALSPortalVariant"];export{r as AMPALSPortalVariant,t as Demo,o as ElitePortalDemo,jt as __namedExportsOrder,$t as default};
