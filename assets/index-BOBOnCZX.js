var _=Object.defineProperty;var g=(a,s,t)=>s in a?_(a,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[s]=t;var m=(a,s,t)=>g(a,typeof s!="symbol"?s+"":s,t);import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{R as h}from"./index-Dl6G-zuu.js";import{I as y}from"./IconSvg-C03OjPNK.js";import{D as C}from"./RegularExpressions-DYYoP8io.js";import{I as f}from"./Icon-DaPrBLe0.js";import"./ShowMore-3GYd1R3g.js";class p extends h.Component{constructor(t){super(t);m(this,"renderRowValue",(t,r,o)=>{const i=this.props.columnIconOptions;if(!r.match||!r.trim)return r;if(r=r.trim(),r.match(C))return e.jsx("a",{"data-search-handle":t,target:"_blank",rel:"noopener noreferrer",href:`https://dx.doi.org/${r}`,children:r});if(i&&i.columns&&Object.keys(i.columns).includes(o)){const n=i.columns[o][r];return n?(n.sx={...n.sx,paddingRight:"0.2rem"},e.jsxs(e.Fragment,{children:[e.jsx(y,{...n}),e.jsx("span",{style:{verticalAlign:"middle"},children:r})]})):e.jsx("span",{children:r})}return r});m(this,"renderRows",(t,r,o)=>t.map((i,n)=>{const d=n>=r?"SRC-hidden":"",l=i[0],c=this.renderRowValue(l,i[1],i[2]);return o?e.jsxs("tr",{className:"SRC-cardRowDesktop "+d,children:[e.jsx("td",{className:"SRC-verticalAlignTop SRC-row-label",children:l}),e.jsx("td",{"data-search-handle":l,className:"SRC-row-data SRC-limitMaxWidth ",children:c})]},n):e.jsxs(h.Fragment,{children:[e.jsx("tr",{className:"SRC-cardRowMobile "+d,children:e.jsx("td",{className:"SRC-verticalAlignTop SRC-row-label",children:l})}),e.jsx("tr",{className:"SRC-cardRowMobile "+d,children:e.jsx("td",{"data-search-handle":l,className:"SRC-row-data SRC-limitMaxWidth",children:c})})]},n)}));this.state={isShowMoreOn:!1,isDesktop:!1},this.toggleShowMore=this.toggleShowMore.bind(this),this.updatePredicate=this.updatePredicate.bind(this)}toggleShowMore(){this.setState({isShowMoreOn:!this.state.isShowMoreOn})}componentDidMount(){this.updatePredicate(),window.addEventListener("resize",this.updatePredicate)}componentWillUnmount(){window.removeEventListener("resize",this.updatePredicate)}updatePredicate(){this.setState({isDesktop:window.innerWidth>600})}render(){const{values:t,secondaryLabelLimit:r=3}=this.props,{isShowMoreOn:o,isDesktop:i}=this.state,n=t.filter(c=>c[1]),d=n.length>r,l=!d||o?1/0:r;return e.jsx("div",{"data-testid":"CardFooter",className:`SRC-cardMetadata ${this.props.className??""}`,children:e.jsx("table",{children:e.jsxs("tbody",{children:[this.renderRows(n,l,i),d&&e.jsx("tr",{className:"SRC-cardRow",children:e.jsx("td",{children:e.jsxs("a",{style:{textAlign:"left",margin:0,padding:0},onClick:this.toggleShowMore,className:"highlight-link",children:["Show ",o?"Less":"More",e.jsx(y,{icon:o?"expandLess":"expandMore"})]})})})]})})})}}try{p.displayName="CardFooter",p.__docgenInfo={description:"",displayName:"CardFooter",props:{values:{defaultValue:null,description:"",name:"values",required:!0,type:{name:"any[]"}},isHeader:{defaultValue:null,description:"",name:"isHeader",required:!0,type:{name:"boolean"}},secondaryLabelLimit:{defaultValue:null,description:"",name:"secondaryLabelLimit",required:!1,type:{name:"number"}},columnIconOptions:{defaultValue:null,description:"",name:"columnIconOptions",required:!1,type:{name:"ColumnIconConfigs"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const u=({chips:a})=>{const s=a.map((t,r)=>t?e.jsxs("span",{children:[" ",t]},r):!1);return e.jsx(h.Fragment,{children:s})};try{u.displayName="ChipContainer",u.__docgenInfo={description:"",displayName:"ChipContainer",props:{chips:{defaultValue:null,description:"",name:"chips",required:!0,type:{name:"any[]"}}}}}catch{}try{p.displayName="CardFooter",p.__docgenInfo={description:"",displayName:"CardFooter",props:{values:{defaultValue:null,description:"",name:"values",required:!0,type:{name:"any[]"}},isHeader:{defaultValue:null,description:"",name:"isHeader",required:!0,type:{name:"boolean"}},secondaryLabelLimit:{defaultValue:null,description:"",name:"secondaryLabelLimit",required:!1,type:{name:"number"}},columnIconOptions:{defaultValue:null,description:"",name:"columnIconOptions",required:!1,type:{name:"ColumnIconConfigs"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}try{f.displayName="Icon",f.__docgenInfo={description:"",displayName:"Icon",props:{type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"string"}},iconOptions:{defaultValue:null,description:"",name:"iconOptions",required:!1,type:{name:"IconOptions"}},value:{defaultValue:{value:""},description:"",name:"value",required:!1,type:{name:"string"}},isHeader:{defaultValue:null,description:"",name:"isHeader",required:!1,type:{name:"boolean"}},cssClass:{defaultValue:null,description:"",name:"cssClass",required:!1,type:{name:"string"}}}}}catch{}try{utils.displayName="utils",utils.__docgenInfo={description:"",displayName:"utils",props:{summary:{defaultValue:null,description:"",name:"summary",required:!0,type:{name:"string"}},maxCharacterCount:{defaultValue:null,description:"",name:"maxCharacterCount",required:!1,type:{name:"number"}}}}}catch{}try{u.displayName="ChipContainer",u.__docgenInfo={description:"",displayName:"ChipContainer",props:{chips:{defaultValue:null,description:"",name:"chips",required:!0,type:{name:"any[]"}}}}}catch{}export{u as C,p as a};
