import{U as L}from"./UpsetPlot-DIuoTNFD.js";import{f as u}from"./index-Di9WfRsC.js";import"./jsx-runtime-D_zvdyIk.js";import"./LargeButton-AGGMZMZv.js";import"./DefaultPropsProvider-vDWjVbKg.js";import"./createTheme-Du15g0dt.js";import"./index-BGwCjzbq.js";import"./iframe-CnWSDyXX.js";import"./Button-Be35lKrG.js";import"./createSimplePaletteValueFilter-ChOpG9_R.js";import"./useTimeout-Bi1CDIUi.js";import"./ButtonBase-ubc2E2Ay.js";import"./useForkRef-nTb_Saty.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-CH0Pk9TH.js";import"./useFiles-BUu89yGE.js";import"./VerificationSubmission-OWkqLMYZ.js";import"./SynapseConstants-rKzWuB9C.js";import"./OrientationBanner-CMFOJsKa.js";import"./index-BiOV1WPy.js";import"./spreadSx-CwcO6WA9.js";import"./react-7k-RsfM5.js";import"./FullWidthAlert-NJvM2bNu.js";import"./Alert-BY2taNgb.js";import"./useSlot-DWnLYyiQ.js";import"./createSvgIcon-DAYJQsnG.js";import"./Close-DehIfdg0.js";import"./IconButton-CiLvqZdK.js";import"./Paper-BRd7e4fC.js";import"./useTheme-BILe9Jse.js";import"./useTheme-CCQ3hhHc.js";import"./Stack-BrYUN2QG.js";import"./extendSxProp-FDZaqXBK.js";import"./getThemeProps-DqdkQaE7.js";import"./Box-DghftoY6.js";import"./AlertTitle-C6b-POKQ.js";import"./Typography-DH53t_A2.js";import"./index-DCoY1t5N.js";import"./ClickAwayListener-JE3wXKV-.js";import"./getReactElementRef-BnSF9POM.js";import"./index-CFZ7vApf.js";import"./index-vImqEjw7.js";import"./ownerDocument-DW-IO8s5.js";import"./Grow-D0ZEx42E.js";import"./Tooltip-DLTVyP6f.js";import"./index-D5-SPrYU.js";import"./useControlled-BzGqdkmj.js";import"./Popper-DAgWQTLd.js";import"./fetchWithExponentialTimeout-CXmnpl-T.js";import"./StringUtils-C5rFena9.js";import"./useQuery-D27XFFLH.js";import"./QueryClientProvider-B0cafNuy.js";import"./Link-C0P8cqxo.js";import"./Collapse-KTn_5HMb.js";import"./_baseUniq-BbDrGO5p.js";import"./_Uint8Array-B-2hgbyU.js";import"./isArray-CIwPvzzW.js";import"./_getTag-q6oiYMDs.js";import"./isEqual-3vJKMzSy.js";import"./merge-BhVyq8av.js";import"./_initCloneObject-Cf1NRmbM.js";import"./identity-DKeuBCMA.js";import"./tinycolor-Begke6kS.js";import"./Fade-Cl0NecSX.js";import"./inputBaseClasses-CF8zZraK.js";import"./calculateFriendlyFileSize-Dxb9vza6.js";import"./CheckCircleTwoTone-B2OaYC4J.js";import"./InfoTwoTone-CrACtaJo.js";import"./useMutation-D1m3keUU.js";import"./dayjs.min-CTxTrKDO.js";import"./chunk-AYJ5UCUI-cFihD_VC.js";import"./cloneDeep-BpUueBbT.js";import"./Skeleton-BEakPQBj.js";import"./SqlFunctions-C8HqQ3uk.js";import"./ColorGradient-Zy7TAKxK.js";import"./colorPalette-BALeOMsp.js";import"./LoadingScreen-B8WZ3dJp.js";import"./Backdrop-YbYaHxA3.js";import"./LinearProgress-Cv8ZpAXB.js";import"./index-CClZIuH9.js";import"./index-B7xoDnOC.js";import"./index-BZrER02N.js";import"./const-BP60AzNb.js";import"./index-BePG0mNC.js";const $t={title:"Home Page/UpsetPlot",component:L},t={args:{sql:"SELECT unnest(individualID), assay FROM syn20821313.6 WHERE individualID is not null GROUP BY assay, unnest(individualID)",rgbIndex:0,maxBarCount:20,setName:"Individuals (#) per Assay",combinationName:"Individuals (#)",summaryLink:"#",summaryLinkText:"Explore All Of Something",onClick:d=>{const y={sql:"select * from syn12345",selectedFacets:[{concreteType:"org.sagebionetworks.repo.model.table.FacetColumnValuesRequest",columnName:"Assays",facetValues:[...d.sets.values()].map(I=>I.name)}]},E=`/Explore/Data%20by%20Files?QueryWrapper0=${JSON.stringify(y)}`;console.log(E)}}},o={args:{sql:"SELECT individualID, assay FROM syn51489960 WHERE metadataType IS NULL and assay IS NOT NULL",rgbIndex:0,maxBarCount:10,setName:"Set size",combinationName:"Intersection size",onClick:u()}},r={args:{sql:"SELECT individualID, assay FROM syn51489960 WHERE metadataType IS NULL and assay IS NOT NULL",maxBarCount:10,setName:"Set size",combinationName:"Intersection size",variant:"ampals",onClick:u()}};var i,e,a;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
