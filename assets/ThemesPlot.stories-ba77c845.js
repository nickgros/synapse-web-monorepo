import{T as p}from"./ThemesPlot-b390026d.js";import"./jsx-runtime-9dc53467.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./ElementWithTooltip-1ec8e12f.js";import"./SynapseTableConstants-5f56c39f.js";import"./index-09df49be.js";import"./IconSvg-a7217c47.js";import"./createSvgIcon-396e3e24.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-55b21f7f.js";import"./styled-3c6f4d83.js";import"./Tooltip-801f2a9c.js";import"./useTheme-e79ecbc0.js";import"./isHostComponent-fa76b8d9.js";import"./Grow-c431c788.js";import"./useForkRef-8feb2ebf.js";import"./index-d3ea75b5.js";import"./utils-6fa73630.js";import"./inheritsLoose-c82a83d4.js";import"./TransitionGroupContext-e6fd87c7.js";import"./useIsFocusVisible-18cd238e.js";import"./ErrorOutlined-6f3ac166.js";import"./GetAppTwoTone-d672483d.js";import"./InfoOutlined-e9da64e0.js";import"./CheckCircleTwoTone-c37d81c7.js";import"./RegularExpressions-bc0adf55.js";import"./Icon-d5796aeb.js";import"./SynapseConstants-eb00dc31.js";import"./OrientationBanner-a1ca5cdb.js";import"./FullWidthAlert-706fe840.js";import"./Alert-c3fe2b05.js";import"./Paper-411d859b.js";import"./IconButton-f820fa46.js";import"./ButtonBase-8587e55b.js";import"./emotion-react.browser.esm-5fddd3df.js";import"./assertThisInitialized-081f9914.js";import"./Stack-4eda368b.js";import"./extendSxProp-1372051e.js";import"./Box-8faf86fd.js";import"./AlertTitle-aeea0d59.js";import"./Typography-1d068b0b.js";import"./ClickAwayListener-3b20c94f.js";import"./Button-33299b2c.js";import"./ShowMore-0d3229ca.js";import"./Dropdown-212ebba7.js";import"./ThemeProvider-ab8de9d2.js";import"./index-9d475cdf.js";import"./hasClass-ec9efd32.js";import"./createWithBsPrefix-ac5ecfd4.js";import"./getEndpoint-ac94413e.js";import"./ApplicationSessionManager-9bd355c2.js";import"./InfoTwoTone-b17047a2.js";import"./inputBaseClasses-034b6b96.js";import"./Fade-240af196.js";import"./Link-6ae0d01e.js";import"./_getTag-559aebd9.js";import"./_Map-92f6da1c.js";import"./isArray-5e3f9107.js";import"./StringUtils-2ea3ab4d.js";import"./index-01eb1463.js";import"./dayjs.min-f79c4412.js";import"./tiny-invariant-dd7d57d2.js";import"./SqlFunctions-88356349.js";import"./factory-33ef2009.js";import"./_initCloneObject-c3239c20.js";import"./_Uint8Array-df44b265.js";import"./_baseTimes-8715be3e.js";import"./_baseClone-7c94ad0c.js";import"./_getAllKeys-aca88255.js";import"./sortBy-0326211f.js";import"./_baseFlatten-c291d7ab.js";import"./toString-cc90cb98.js";import"./isSymbol-7c514724.js";import"./_baseIteratee-49dd783e.js";import"./_getMatchData-2bcfacce.js";import"./_cacheHas-c48b7592.js";import"./_setToArray-3d6ec6fd.js";import"./identity-46f208ab.js";import"./_baseFor-d254fa1e.js";import"./_baseRest-c9d7baca.js";import"./_overRest-2155f832.js";import"./_isIterateeCall-9cddbe78.js";import"./_baseUnset-207a67b6.js";import"./_baseSlice-cf92e063.js";import"./noop-cb277961.js";import"./without-7499eb19.js";import"./_baseIndexOf-c808ca38.js";import"./isArrayLikeObject-8a0d3588.js";import"./pick-1a060884.js";import"./toInteger-5bb233f4.js";import"./isPlainObject-e233fb76.js";import"./times-8d386772.js";import"./merge-75f6c925.js";import"./uniqueId-4d05949d.js";import"./cloneDeep-587c61b8.js";import"./isNil-2fb52fad.js";import"./isEqualWith-40c9fc10.js";import"./uniq-26a72122.js";import"./remove-f204f5d4.js";import"./LoadingScreen-21cf5616.js";import"./Backdrop-989db5e0.js";import"./LinearProgress-c51caf50.js";const tt={title:"Home Page/ThemesPlot",component:p},o={args:{onPointClick:m=>{console.log(m.event)},topBarPlot:{entityId:"syn21641485",xField:"totalCount",yField:"groupBy",groupField:"consortium",colors:{CSBC:"rgba(64,123,160, 1)","PS-ON":"rgba(91,176,181,1)",ICBP:"rgba(197, 191, 223, 1)",TEC:"rgba(156, 196, 233, 1)"},whereClause:"totalCount is not NULL"},sideBarPlot:{entityId:"syn21649281",xField:"totalCount",yField:"theme",groupField:"consortium",countLabel:"grants",plotStyle:{backgroundColor:"#f5f9fa"},colors:{CSBC:"#1c76af","PS-ON":"#5bb0b5",ICBP:"#9cc4e9",TEC:"#c5bfdf"}},dotPlot:{entityId:"syn21639584",xField:"totalCount",yField:"theme",groupField:"groupBy",infoField:"themeDescription",whereClause:"groupBy IN ('publications', 'tools', 'datasets')",markerSymbols:{tools:"y-down",datasets:"diamond-x",publications:"circle"},plotStyle:{markerLine:"rgba(0, 0, 0,1)",markerFill:"rgba(255, 255, 255,1)",markerSize:11,backgroundColor:"#f5f9fa"}}}};var t,r,i;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    onPointClick: e => {
      console.log(e.event);
    },
    topBarPlot: {
      entityId: 'syn21641485',
      xField: 'totalCount',
      yField: 'groupBy',
      groupField: 'consortium',
      colors: {
        CSBC: 'rgba(64,123,160, 1)',
        'PS-ON': 'rgba(91,176,181,1)',
        ICBP: 'rgba(197, 191, 223, 1)',
        TEC: 'rgba(156, 196, 233, 1)'
      },
      whereClause: 'totalCount is not NULL'
    },
    sideBarPlot: {
      entityId: 'syn21649281',
      xField: 'totalCount',
      yField: 'theme',
      groupField: 'consortium',
      countLabel: 'grants',
      plotStyle: {
        backgroundColor: '#f5f9fa'
      },
      colors: {
        CSBC: '#1c76af',
        'PS-ON': '#5bb0b5',
        ICBP: '#9cc4e9',
        TEC: '#c5bfdf'
      }
    },
    dotPlot: {
      entityId: 'syn21639584',
      xField: 'totalCount',
      yField: 'theme',
      groupField: 'groupBy',
      infoField: 'themeDescription',
      whereClause: "groupBy IN ('publications', 'tools', 'datasets')",
      markerSymbols: {
        tools: 'y-down',
        datasets: 'diamond-x',
        publications: 'circle'
      },
      plotStyle: {
        markerLine: 'rgba(0, 0, 0,1)',
        markerFill: 'rgba(255, 255, 255,1)',
        markerSize: 11,
        backgroundColor: '#f5f9fa'
      }
    }
  }
}`,...(i=(r=o.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const rt=["ThemesPlotDemo"];export{o as ThemesPlotDemo,rt as __namedExportsOrder,tt as default};
