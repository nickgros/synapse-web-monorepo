import{U as L}from"./UpsetPlot-DKJlEEdX.js";import{f as u}from"./index-BAN2PIeX.js";import"./jsx-runtime-D_zvdyIk.js";import"./LargeButton-jNDVaJ2m.js";import"./DefaultPropsProvider-D5B1AITN.js";import"./createTheme-DafKpa7R.js";import"./index-bqo5TgK4.js";import"./iframe-BWhMz8_p.js";import"./Button-BBNinPG5.js";import"./createSimplePaletteValueFilter-sGs_ku48.js";import"./useTimeout-BRiyRUpE.js";import"./ButtonBase-BIKkVoec.js";import"./useForkRef-DBPyDf3S.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-C5IYZviS.js";import"./useFiles-BZQkX1dI.js";import"./VerificationSubmission-OWkqLMYZ.js";import"./SynapseConstants-CllGbX7S.js";import"./OrientationBanner-BHKPAHO-.js";import"./index-icPz55-X.js";import"./spreadSx-CwcO6WA9.js";import"./react--tzJNvOD.js";import"./FullWidthAlert-COW_t_J5.js";import"./Alert-B5eONfD9.js";import"./useSlot-Bf19Xh20.js";import"./createSvgIcon-aLr9nUbl.js";import"./Close-CPe9-B-_.js";import"./IconButton-BFO5f6ua.js";import"./Paper-B113B_DA.js";import"./useTheme-CNSIRb32.js";import"./useTheme-DpXojDgV.js";import"./Stack-Cw4rnpPd.js";import"./extendSxProp-Cph9rC05.js";import"./getThemeProps-D8p_Hs8v.js";import"./Box-DQNN0Wyh.js";import"./AlertTitle-DN1AtXzx.js";import"./Typography-bPn8uOYp.js";import"./index-BfprNM_h.js";import"./ClickAwayListener-CT2CFK1B.js";import"./getReactElementRef-C8P0G6nS.js";import"./index-B7iH1pIn.js";import"./index-BzeBLNAY.js";import"./ownerDocument-DW-IO8s5.js";import"./Grow-DBGKzkJE.js";import"./Tooltip-CDH_CeG3.js";import"./index-DxZ0auih.js";import"./useControlled-Dgt9tsee.js";import"./Popper-BC3eKN7L.js";import"./fetchWithExponentialTimeout-CXmnpl-T.js";import"./StringUtils-C5rFena9.js";import"./useQuery-B9K678_k.js";import"./QueryClientProvider-U8qNJQn1.js";import"./Link-B1XQuswW.js";import"./Collapse-PsOCgvT3.js";import"./_baseUniq-BMskdysw.js";import"./_Uint8Array-Cy3P2JvP.js";import"./isArray-CgWF71ud.js";import"./_getTag-0OUQPZLe.js";import"./isEqual-BZJfvA5d.js";import"./merge-BufnmKa6.js";import"./_initCloneObject-BLOZowN2.js";import"./identity-DKeuBCMA.js";import"./tinycolor-Begke6kS.js";import"./Fade-CA57bcmY.js";import"./inputBaseClasses-BneXfZmT.js";import"./calculateFriendlyFileSize-BU-OHEIH.js";import"./CheckCircleTwoTone-BSWQP55r.js";import"./InfoTwoTone-B_9ZJfKP.js";import"./useMutation-qZdexzOi.js";import"./dayjs.min-BSEUi5J-.js";import"./chunk-AYJ5UCUI-CEjdLjLk.js";import"./cloneDeep-DOM1lfBU.js";import"./Skeleton-DnCTojLF.js";import"./SqlFunctions-C8HqQ3uk.js";import"./ColorGradient-Zy7TAKxK.js";import"./colorPalette-BALeOMsp.js";import"./LoadingScreen-C4179Bjc.js";import"./Backdrop-BcUJrEbl.js";import"./LinearProgress-CNrNuwWb.js";import"./index-COVRdNwo.js";import"./index-tkjlXzRb.js";import"./index-BZ5zc2Sb.js";import"./const-BP60AzNb.js";import"./index---BGi49W.js";const $t={title:"Home Page/UpsetPlot",component:L},t={args:{sql:"SELECT unnest(individualID), assay FROM syn20821313.6 WHERE individualID is not null GROUP BY assay, unnest(individualID)",rgbIndex:0,maxBarCount:20,setName:"Individuals (#) per Assay",combinationName:"Individuals (#)",summaryLink:"#",summaryLinkText:"Explore All Of Something",onClick:d=>{const y={sql:"select * from syn12345",selectedFacets:[{concreteType:"org.sagebionetworks.repo.model.table.FacetColumnValuesRequest",columnName:"Assays",facetValues:[...d.sets.values()].map(I=>I.name)}]},E=`/Explore/Data%20by%20Files?QueryWrapper0=${JSON.stringify(y)}`;console.log(E)}}},o={args:{sql:"SELECT individualID, assay FROM syn51489960 WHERE metadataType IS NULL and assay IS NOT NULL",rgbIndex:0,maxBarCount:10,setName:"Set size",combinationName:"Intersection size",onClick:u()}},r={args:{sql:"SELECT individualID, assay FROM syn51489960 WHERE metadataType IS NULL and assay IS NOT NULL",maxBarCount:10,setName:"Set size",combinationName:"Intersection size",variant:"ampals",onClick:u()}};var i,e,a;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
