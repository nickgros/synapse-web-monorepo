import{T as p}from"./ThemesPlot-9e2b783c.js";import"./jsx-runtime-095bf462.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./ElementWithTooltip-52a85172.js";import"./SynapseTableConstants-0be13e3a.js";import"./IconSvg-209cfc57.js";import"./createSvgIcon-102248e7.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-4abd396b.js";import"./styled-96220216.js";import"./Tooltip-e6a8fad5.js";import"./useTheme-a5fe342b.js";import"./Grow-15d1c4f6.js";import"./isHostComponent-fa76b8d9.js";import"./useForkRef-f2aa3d66.js";import"./index-8ce4a492.js";import"./utils-60a28f01.js";import"./inheritsLoose-c82a83d4.js";import"./TransitionGroupContext-f2b81dde.js";import"./useIsFocusVisible-bbf13f29.js";import"./ErrorOutlined-b4a8c67a.js";import"./GetAppTwoTone-9a0869d1.js";import"./InfoOutlined-1265fd90.js";import"./CheckCircleTwoTone-cd25e954.js";import"./RegularExpressions-bc0adf55.js";import"./Icon-451d2902.js";import"./SynapseConstants-71869ab2.js";import"./OrientationBanner-d057b0e6.js";import"./FullWidthAlert-7e419f2a.js";import"./AlertTitle-d92dfb78.js";import"./Paper-8ac7942c.js";import"./IconButton-1e0dd4f6.js";import"./ButtonBase-0195d275.js";import"./emotion-react.browser.esm-8516f11f.js";import"./assertThisInitialized-081f9914.js";import"./Typography-c5b8eeae.js";import"./extendSxProp-d749f662.js";import"./Stack-f7ee2fdc.js";import"./Box-891dc3c7.js";import"./ClickAwayListener-36b79525.js";import"./Button-d3d5b3a8.js";import"./ThemeProvider-c7f6a893.js";import"./index-58d3fd43.js";import"./hasClass-ec9efd32.js";import"./createWithBsPrefix-3758f106.js";import"./unCamelCase-5e08165e.js";import"./_baseSlice-cf92e063.js";import"./toString-cc90cb98.js";import"./isArray-5e3f9107.js";import"./isSymbol-7c514724.js";import"./without-b50b8b1f.js";import"./_cacheHas-125740e9.js";import"./_MapCache-3ef6bbc6.js";import"./SynapseClient-130f11d4.js";import"./getEndpoint-ac94413e.js";import"./Link-9ad54ce1.js";import"./StringUtils-4b400d2c.js";import"./dayjs.min-59ef0ea6.js";import"./tiny-invariant-dd7d57d2.js";import"./inputBaseClasses-f1eaf41c.js";import"./Fade-5a6f6506.js";import"./_baseTimes-8cccc40f.js";import"./_baseRest-1fd9e394.js";import"./isArrayLikeObject-6c1030ce.js";import"./hasIn-7a9b73e9.js";import"./_Uint8Array-d715c22a.js";import"./_isIndex-af14b756.js";import"./pick-12516e28.js";import"./_baseClone-9368da8c.js";import"./sortBy-e6562b14.js";import"./_baseIsEqual-456525e4.js";import"./_setToArray-3d6ec6fd.js";import"./_baseFor-d254fa1e.js";import"./_isIterateeCall-9af64f09.js";import"./uniq-0269ad93.js";import"./times-02fa7569.js";import"./SqlFunctions-8a409594.js";import"./factory-275e83af.js";import"./lodash.default-9c2ef999.js";import"./omitBy-da567c8f.js";import"./merge-37ec405f.js";import"./uniqueId-4d05949d.js";import"./cloneDeep-055c6d69.js";import"./isNil-b8267f66.js";import"./groupBy-8b60c62e.js";import"./startCase-2ff47c53.js";import"./toLower-271fcf43.js";import"./LoadingScreen-2548bf16.js";import"./LinearProgress-ddf61131.js";import"./Backdrop-1b2a4bbc.js";const Jo={title:"Home Page/ThemesPlot",component:p},o={args:{onPointClick:m=>{console.log(m.event)},topBarPlot:{entityId:"syn21641485",xField:"totalCount",yField:"groupBy",groupField:"consortium",colors:{CSBC:"rgba(64,123,160, 1)","PS-ON":"rgba(91,176,181,1)",ICBP:"rgba(197, 191, 223, 1)",TEC:"rgba(156, 196, 233, 1)"},whereClause:"totalCount is not NULL"},sideBarPlot:{entityId:"syn21649281",xField:"totalCount",yField:"theme",groupField:"consortium",countLabel:"grants",plotStyle:{backgroundColor:"#f5f9fa"},colors:{CSBC:"#1c76af","PS-ON":"#5bb0b5",ICBP:"#9cc4e9",TEC:"#c5bfdf"}},dotPlot:{entityId:"syn21639584",xField:"totalCount",yField:"theme",groupField:"groupBy",infoField:"themeDescription",whereClause:"groupBy IN ('publications', 'tools', 'datasets')",markerSymbols:{tools:"y-down",datasets:"diamond-x",publications:"circle"},plotStyle:{markerLine:"rgba(0, 0, 0,1)",markerFill:"rgba(255, 255, 255,1)",markerSize:11,backgroundColor:"#f5f9fa"}}}};var t,r,i;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(i=(r=o.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const Ko=["ThemesPlotDemo"];export{o as ThemesPlotDemo,Ko as __namedExportsOrder,Jo as default};
//# sourceMappingURL=ThemesPlot.stories-306f69cd.js.map
