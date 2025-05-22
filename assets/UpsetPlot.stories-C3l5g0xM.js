import{U as L}from"./UpsetPlot-CrpRuKs0.js";import{f as u}from"./index-CULLEsAs.js";import"./jsx-runtime-BD4Lws4r.js";import"./index-BQmiQiuI.js";import"./iframe-B_s7h1r3.js";import"./LargeButton-Cw9SohCn.js";import"./DefaultPropsProvider-DtDi0Gt5.js";import"./createTheme-TJQ-Me4W.js";import"./Button-GHEHd2qc.js";import"./ButtonBase-BgglPDc6.js";import"./useTimeout-BDW9Ghs7.js";import"./TransitionGroupContext-BBWYv0r8.js";import"./useForkRef-DI00mLUt.js";import"./useIsFocusVisible-Cex7JU8r.js";import"./useEventCallback-DAsX7y3A.js";import"./useFiles-D_JB97Dd.js";import"./VerificationSubmission-B0kBNeMy.js";import"./SynapseConstants-DP5MDcEa.js";import"./OrientationBanner-B9Ix_96M.js";import"./index-BKcNlqDU.js";import"./spreadSx-CwcO6WA9.js";import"./react-CIBidaCI.js";import"./FullWidthAlert-B6Hzy503.js";import"./Alert-DlTRLF6t.js";import"./resolveComponentProps-CNz-D9dt.js";import"./isHostComponent-DVu5iVWx.js";import"./createSvgIcon-DH7gczeL.js";import"./Close-CggPnEUr.js";import"./IconButton-G7ahMeIA.js";import"./Paper-bcyjQXbo.js";import"./Stack-DylG5yLx.js";import"./getThemeProps-B1NOqccD.js";import"./useTheme-CoBXuknm.js";import"./Box-D3BYjgB7.js";import"./AlertTitle-6ZpIjRE4.js";import"./Typography-btQXjNFB.js";import"./useTheme-DwB7SBSA.js";import"./Grow-DjwQF0B5.js";import"./index-DBgz7f_2.js";import"./utils-B9UGWasi.js";import"./ClickAwayListener-vbZZL3nn.js";import"./ownerDocument-DW-IO8s5.js";import"./Tooltip-BnVDD-6_.js";import"./index-cvsUPyqt.js";import"./useControlled-CnNyARgE.js";import"./useId-DVHINaBJ.js";import"./Popper-CUtaqr2z.js";import"./fetchWithExponentialTimeout-Cpvpsfq8.js";import"./StringUtils-CzgJJW-6.js";import"./useQuery-BRwyF-CG.js";import"./utils-aAzvXSW-.js";import"./Link-D3THyCk_.js";import"./Collapse-jKA3781i.js";import"./isNil-mi6BU05T.js";import"./_Uint8Array-DECVW7wJ.js";import"./_baseTimes-36S_kd0L.js";import"./isObjectLike-DmjEXA5C.js";import"./isArray-Dxzbedgu.js";import"./_baseIsEqual-C4SuTQ3y.js";import"./_getTag-DYiGo6mU.js";import"./tinycolor-Begke6kS.js";import"./Fade-j31nN2R5.js";import"./Skeleton-B0qgezQP.js";import"./inputBaseClasses-Bonb5ujV.js";import"./calculateFriendlyFileSize-CR3Crrbc.js";import"./CheckCircleTwoTone-BagmZIiC.js";import"./InfoTwoTone-BqVlvS4U.js";import"./mutation-Bl_77Z8X.js";import"./dayjs.min-D6Gybxm8.js";import"./chunk-AYJ5UCUI-DuHSP6qP.js";import"./cloneDeep-D-VLR9nf.js";import"./_initCloneObject-CWrZArqt.js";import"./isEqual-DLYyY67n.js";import"./merge-D9bDLSfz.js";import"./identity-DKeuBCMA.js";import"./SqlFunctions-DnxC6kpb.js";import"./react-sizeme-CkUc7Pcu.js";import"./ColorGradient-Zy7TAKxK.js";import"./colorPalette-BALeOMsp.js";import"./LoadingScreen-BWCsTl74.js";import"./Backdrop-Dh9z0_E0.js";import"./LinearProgress-CvZi9Q8l.js";const Yt={title:"Home Page/UpsetPlot",component:L},t={args:{sql:"SELECT unnest(individualID), assay FROM syn20821313.6 WHERE individualID is not null GROUP BY assay, unnest(individualID)",rgbIndex:0,maxBarCount:20,setName:"Individuals (#) per Assay",combinationName:"Individuals (#)",summaryLink:"#",summaryLinkText:"Explore All Of Something",onClick:d=>{const y={sql:"select * from syn12345",selectedFacets:[{concreteType:"org.sagebionetworks.repo.model.table.FacetColumnValuesRequest",columnName:"Assays",facetValues:[...d.sets.values()].map(I=>I.name)}]},E=`/Explore/Data%20by%20Files?QueryWrapper0=${JSON.stringify(y)}`;console.log(E)}}},o={args:{sql:"SELECT individualID, assay FROM syn51489960 WHERE metadataType IS NULL and assay IS NOT NULL",rgbIndex:0,maxBarCount:10,setName:"Set size",combinationName:"Intersection size",onClick:u()}},r={args:{sql:"SELECT individualID, assay FROM syn51489960 WHERE metadataType IS NULL and assay IS NOT NULL",maxBarCount:10,setName:"Set size",combinationName:"Intersection size",variant:"ampals",onClick:u()}};var e,i,a;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`{
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
}`,...(a=(i=t.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var s,n,m;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
}`,...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const _t=["Demo","ElitePortalDemo","AMPALSPortalVariant"];export{r as AMPALSPortalVariant,t as Demo,o as ElitePortalDemo,_t as __namedExportsOrder,Yt as default};
