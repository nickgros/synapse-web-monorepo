import{a as N,j as t,F as S}from"./jsx-runtime-ad672792.js";import{c as B,P as v}from"./factory-76e91d33.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-4d501b15.js";const w=B(v),i=e=>{const{data:a,layout:_,config:q,className:P,containerWidth:C,useResizeHandler:W,plotStyle:D}=e,c=!!(a&&a.length);return N("div",{className:P,children:[!c&&t(S,{children:t("div",{className:"chart-nodata",style:{width:C},children:t("span",{children:"Data Unavailable"})})}),c&&t(w,{data:a,layout:_??{},config:q,useResizeHandler:W,style:D})]})};try{i.displayName="PlotlyWrapper",i.__docgenInfo={description:"",displayName:"PlotlyWrapper",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"Data[]"}},layout:{defaultValue:null,description:"",name:"layout",required:!1,type:{name:"Partial<Layout>"}},config:{defaultValue:null,description:"",name:"config",required:!1,type:{name:"Partial<Config>"}},useResizeHandler:{defaultValue:null,description:"",name:"useResizeHandler",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},containerWidth:{defaultValue:null,description:"",name:"containerWidth",required:!1,type:{name:"number"}},plotStyle:{defaultValue:null,description:"",name:"plotStyle",required:!1,type:{name:"CSSProperties"}}}}}catch{}const L={distribution:[12184,5175,4148,3481,2151,1175,570,153,21,9],bins:[-.007165802586,.7165802586,1.4331605172,2.1497407758,2.8663210344,3.582901293,4.2994815516,5.0160618102,5.7326420688,6.449222327399999,7.165802586],min:0,max:7.165802586,mean:1.3710040086127533,first_quartile:.26267472635,third_quartile:2.20063426655},V={distribution:[9631,5149,4106,4018,3768,1798,491,91,13,2],bins:[-.003,.3,.6,.8999999999999999,1.2,1.5,1.7999999999999998,2.1,2.4,2.6999999999999997,3],min:0,max:3,mean:.7160479295046273,first_quartile:.2261353865,third_quartile:1.1538092195},k={distribution:[20368,2068,1304,1206,1084,887,758,553,447,392],bins:[-.002,.2,.4,.6000000000000001,.8,1,1.2000000000000002,1.4000000000000001,1.6,1.8,2],min:0,max:2,mean:.3498614540466405,first_quartile:0,third_quartile:.6516586135},j={distribution:[20945,1587,1236,1236,820,812,812,811,418,390],bins:[-.002,.2,.4,.6000000000000001,.8,1,1.2000000000000002,1.4000000000000001,1.6,1.8,2],min:0,max:2,mean:.2970251075102351,first_quartile:0,third_quartile:.365292307692308},z={distribution:[28809,130,90,38,0,0,0,0,0,0],bins:[-.002,.2,.4,.6000000000000001,.8,1,1.2000000000000002,1.4000000000000001,1.6,1.8,2],min:0,max:2,mean:.010936342473337463,first_quartile:0,third_quartile:0},s={logsdon:L,geneticsscore:V,omicsscore:k,literaturescore:j,flyneuropathscore:z},K={title:"Components/PlotlyWrapper",component:i},l={displayModeBar:!1},F=[{x:[1,2,3,4,4,4,8,9,10],name:"",marker:{color:"rgba(229, 220, 247, 1)"},type:"box",boxmean:!1,orientation:"h",whiskerwidth:1,hoverinfo:"x"},{x:[2.3],y:[""],name:"",marker:{symbol:"line-ns",color:"rgba(166, 132, 238, 1)"},hovertemplate:"Score: %{x}"}],H={width:300,height:110,margin:{t:10},xaxis:{visible:!1}},O=s.geneticsscore.distribution.map((e,a)=>a===1?"rgba(166, 132, 238, 1)":"rgba(166, 132, 238, 0.25)"),R={type:"bar",marker:{color:O},width:.2},U=[{x:Object.values(s.geneticsscore.bins).map(e=>e.toFixed(2)),y:Object.values(s.geneticsscore.distribution),...R}],G={width:300,xaxis:{title:"Gene Score".toUpperCase(),titlefont:{size:12},tick0:0,dtick:.3},yaxis:{title:"Number of Genes".toUpperCase(),titlefont:{size:12}},plot_bgcolor:"rgba(236, 236, 236, 0.25)"},x={...G,annotations:[{x:.3,y:5149,text:"2.5",ax:0,ay:-10}]},o={args:{data:U,layout:x,containerWidth:300,config:l}},r={args:{data:F,layout:H,containerWidth:300,config:l,className:"chart-boxplot"}},n={args:{data:[],layout:x,containerWidth:300,config:l}};var d,u,m;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    data: geneticsscoreData,
    layout: specialBarLayout,
    containerWidth: 300,
    config: plotConfigs
  }
}`,...(m=(u=o.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var p,y,f;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    data: boxPlotData,
    layout: boxPlotLayout,
    containerWidth: 300,
    config: plotConfigs,
    className: 'chart-boxplot'
  }
}`,...(f=(y=r.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var g,h,b;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    data: [],
    layout: specialBarLayout,
    containerWidth: 300,
    config: plotConfigs
  }
}`,...(b=(h=n.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};const Q=["BarChart","BoxPlot","NoData"];export{o as BarChart,r as BoxPlot,n as NoData,Q as __namedExportsOrder,K as default};
//# sourceMappingURL=PlotlyWrapper.stories-51c29095.js.map
