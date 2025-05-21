import{U as L}from"./UpsetPlot-K5p2WBbW.js";import{f as u}from"./index-DVc4mbV7.js";import"./jsx-runtime-B4FpmzGn.js";import"./index-DM3lAj0n.js";import"./iframe-CRfNb6wr.js";import"./LargeButton-BBjig7Fn.js";import"./DefaultPropsProvider-CDZ5UpDb.js";import"./createTheme-osPrpjgg.js";import"./Button-C-8yzvZD.js";import"./ButtonBase-DCaCj3sn.js";import"./useTimeout-BCy9KhqP.js";import"./TransitionGroupContext-CNkLMHpL.js";import"./useForkRef-BHBs7cXw.js";import"./useIsFocusVisible-B5ADwpsA.js";import"./useEventCallback-CiFSq2a8.js";import"./useFiles-CdEuNTln.js";import"./VerificationSubmission-B0kBNeMy.js";import"./SynapseConstants-D_-Mglhc.js";import"./OrientationBanner-BVBRgBWG.js";import"./index-JdWBSvRH.js";import"./spreadSx-CwcO6WA9.js";import"./react-BLybFQ8v.js";import"./FullWidthAlert-D28Lfxc0.js";import"./Alert-BQ8iX0zs.js";import"./resolveComponentProps-D_2DfIoC.js";import"./isHostComponent-DVu5iVWx.js";import"./createSvgIcon-BrQkkf0p.js";import"./Close-pdN-BmGJ.js";import"./IconButton-TpVC3epP.js";import"./Paper-GW9W9AF7.js";import"./Stack-CX9jAOXR.js";import"./getThemeProps-B8GeAVWs.js";import"./useTheme-B-hk7JXy.js";import"./Box-DjTGEn4B.js";import"./AlertTitle-CiwJyD7U.js";import"./Typography-PZ3cAU7R.js";import"./useTheme-BRzUHJhE.js";import"./Grow-Yf-W7JhX.js";import"./index-BRH3Pwrf.js";import"./utils-C3bYj40K.js";import"./ClickAwayListener-C6ZzDciG.js";import"./ownerDocument-DW-IO8s5.js";import"./Tooltip-D2PubBmm.js";import"./index-S6Byxz46.js";import"./useControlled-Ckobgvpz.js";import"./useId-BEi9DTfm.js";import"./Popper-Cz_FEOFb.js";import"./fetchWithExponentialTimeout-Cpvpsfq8.js";import"./StringUtils-CzgJJW-6.js";import"./useQuery-CJozhmIc.js";import"./utils-AjNs7ZhI.js";import"./Link-BZU5QgnK.js";import"./Collapse-DBRBfWMU.js";import"./isNil-C1eJch1d.js";import"./_Uint8Array-3HIv5n6-.js";import"./_baseTimes-36S_kd0L.js";import"./isObjectLike-DH-PBdkJ.js";import"./isArray-Dxzbedgu.js";import"./_baseIsEqual-gX59yvAN.js";import"./_getTag-CLHDtv5D.js";import"./tinycolor-Begke6kS.js";import"./Fade-Cu1REOp1.js";import"./Skeleton-Badjms_1.js";import"./inputBaseClasses-DOFWpaeq.js";import"./calculateFriendlyFileSize-gtBJ7iNS.js";import"./CheckCircleTwoTone-Dj4CzCKD.js";import"./InfoTwoTone-BMk8VF8H.js";import"./mutation-BbpDoA-k.js";import"./dayjs.min-Y7vEwyx-.js";import"./chunk-AYJ5UCUI-CCzS9PSe.js";import"./cloneDeep-DlEqzMhR.js";import"./_initCloneObject-UaoA3kHC.js";import"./isEqual-C9VzGFfO.js";import"./merge-qtOmgSgf.js";import"./identity-DKeuBCMA.js";import"./SqlFunctions-DnxC6kpb.js";import"./react-sizeme-B1oaLhPy.js";import"./ColorGradient-Zy7TAKxK.js";import"./colorPalette-BALeOMsp.js";import"./LoadingScreen-ChuHoa00.js";import"./Backdrop-CaM0DCvy.js";import"./LinearProgress-EiqWAMvJ.js";const Yt={title:"Home Page/UpsetPlot",component:L},t={args:{sql:"SELECT unnest(individualID), assay FROM syn20821313.6 WHERE individualID is not null GROUP BY assay, unnest(individualID)",rgbIndex:0,maxBarCount:20,setName:"Individuals (#) per Assay",combinationName:"Individuals (#)",summaryLink:"#",summaryLinkText:"Explore All Of Something",onClick:d=>{const y={sql:"select * from syn12345",selectedFacets:[{concreteType:"org.sagebionetworks.repo.model.table.FacetColumnValuesRequest",columnName:"Assays",facetValues:[...d.sets.values()].map(I=>I.name)}]},E=`/Explore/Data%20by%20Files?QueryWrapper0=${JSON.stringify(y)}`;console.log(E)}}},o={args:{sql:"SELECT individualID, assay FROM syn51489960 WHERE metadataType IS NULL and assay IS NOT NULL",rgbIndex:0,maxBarCount:10,setName:"Set size",combinationName:"Intersection size",onClick:u()}},r={args:{sql:"SELECT individualID, assay FROM syn51489960 WHERE metadataType IS NULL and assay IS NOT NULL",maxBarCount:10,setName:"Set size",combinationName:"Intersection size",variant:"ampals",onClick:u()}};var e,i,a;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`{
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
