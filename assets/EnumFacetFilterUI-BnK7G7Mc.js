import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{r as c,R as D}from"./index-Dl6G-zuu.js";import{I as g}from"./IconSvg-B_5LF0ig.js";import{C as B}from"./Checkbox-ByKpZRhl.js";import{D as V}from"./Dropdown-Sqg-5xfw.js";import{M as v}from"./Tooltip-CYVQ1vhC.js";import{I as y}from"./IconButton-CgTC7RgJ.js";import{M as K}from"./Menu-DJaUcmOF.js";import{F as Q}from"./Fade-BNGotgqy.js";import{M as Y}from"./TextField-BYBL0P0S.js";import{C as ee}from"./_getTag-B6zWmB6G.js";const C=l=>e.jsxs("svg",{...l,className:`Icon-Plus ${l.className??""}`,width:"15",height:"14",viewBox:"0 0 15 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l.title&&e.jsx("title",{children:l.title}),e.jsx("path",{d:"M14.3887 8H8.38867V14H6.38867V8H0.388672V6H6.38867V0H8.38867V6H14.3887V8Z"})]});try{C.displayName="IconPlus",C.__docgenInfo={description:"",displayName:"IconPlus",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}}}}}catch{}const b=l=>e.jsxs("svg",{...l,className:`Icon-Minus ${l.className??""}`,width:"15",height:"2",viewBox:"0 0 15 2",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l.title&&e.jsx("title",{children:l.title}),e.jsx("path",{d:"M14.3887 2H8.38867H6.38867H0.388672V0H6.38867H8.38867H14.3887V2Z"})]});try{b.displayName="IconMinus",b.__docgenInfo={description:"",displayName:"IconMinus",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}}}}}catch{}function N(l){const{label:n,isCollapsed:i,onClick:o,hideCollapsible:r=!1}=l;return e.jsxs("div",{className:"FacetFilterHeader",children:[e.jsx("label",{className:"FacetFilterHeader__label",children:n}),!r&&e.jsx("button",{className:"FacetFilterHeader__collapseToggleBtn",onClick:()=>o(!i),children:i?e.jsx(C,{className:"icon-plus",title:"Expand Menu"}):e.jsx(b,{className:"icon-minus",title:"Collapse Menu"})})]})}try{N.displayName="FacetFilterHeader",N.__docgenInfo={description:"",displayName:"FacetFilterHeader",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},hideCollapsible:{defaultValue:null,description:"",name:"hideCollapsible",required:!1,type:{name:"boolean"}},isCollapsed:{defaultValue:null,description:"",name:"isCollapsed",required:!0,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"(newValue: boolean) => void"}}}}}catch{}function E(l){const{id:n,label:i,count:o,isDropdown:r,checked:a,onChange:u,onHover:m}=l;return e.jsxs("div",{className:"EnumFacetFilter__checkboxContainer",onClick:()=>{r&&u(!a)},onMouseEnter:m,children:[e.jsx(B,{className:"EnumFacetFilter__checkbox",onClick:s=>s.stopPropagation(),onChange:s=>{u(s)},checked:a,label:i},`${n}`),r&&e.jsxs("span",{className:"EnumFacetFilter__count",children:["(",o.toLocaleString(),")"]}),!r&&e.jsx("div",{className:"EnumFacetFilter__count",children:o.toLocaleString()})]})}try{E.displayName="EnumFacetFilterOption",E.__docgenInfo={description:"",displayName:"EnumFacetFilterOption",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}},isDropdown:{defaultValue:null,description:"",name:"isDropdown",required:!0,type:{name:"boolean"}},checked:{defaultValue:null,description:"",name:"checked",required:!0,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(selected: boolean) => void"}},onHover:{defaultValue:null,description:"",name:"onHover",required:!0,type:{name:"() => void"}}}}}catch{}function le(l){const{menuText:n,children:i}=l,[o,r]=c.useState(!1),a=()=>r(!o);return e.jsxs(V,{className:"EnumFacetFilter EnumFacetFilterSelect",show:o,onToggle:a,children:[e.jsx(V.Toggle,{className:"secondary-caret",variant:"gray-select",children:n}),e.jsx(V.Menu,{children:i})]})}function te(l){const{children:n,hasSelection:i}=l,[o,r]=D.useState(null),a=s=>{r(s.currentTarget)},u=()=>{r(null)},m=!!o;return e.jsxs("div",{className:"EnumFacetFilter",children:[e.jsx(v,{title:"Filter by specific facet",children:e.jsx(y,{onClick:a,size:"small",children:e.jsx(g,{icon:"filter",wrap:!1,sx:{color:i?"primary.main":"grey.700",fontSize:"20px"}})})}),e.jsx(K,{anchorEl:o,open:m,onClose:u,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},TransitionComponent:Q,children:n})]})}function I(l){const{dropdownType:n}=l;return n==="SelectBox"?e.jsx(le,{...l}):e.jsx(te,{...l})}try{I.displayName="EnumFacetFilterDropdown",I.__docgenInfo={description:"",displayName:"EnumFacetFilterDropdown",props:{menuText:{defaultValue:null,description:"",name:"menuText",required:!0,type:{name:"string"}},hasSelection:{defaultValue:null,description:"",name:"hasSelection",required:!0,type:{name:"boolean"}},dropdownType:{defaultValue:null,description:"",name:"dropdownType",required:!1,type:{name:"enum",value:[{value:'"Icon"'},{value:'"SelectBox"'}]}}}}}catch{}const F=5;function H(l){return l.replace(/\s/g,"").toLowerCase()}function A(l){const{allIsSelected:n,containerAs:i="Collapsible",dropdownType:o="Icon",hideCollapsible:r=!1,facetValues:a,onAddValueToSelection:u,onRemoveValueFromSelection:m,facetTitle:s,onRemoveAllFacetSelections:O,onHoverOverValue:R}=l,[z,w]=c.useState(!1),[T,L]=c.useState(!1),[p,k]=c.useState(!1),[d,j]=c.useState(""),M=a.length>F&&a.slice(F).some(({isSelected:t})=>t),x=z||p||M,h=c.useMemo(()=>p&&d.length>0?a.filter(({displayText:t})=>t.toLowerCase().indexOf(d.trim().toLowerCase())>-1):x?a:a.slice(0,F),[a,d,p,x]),S=D.createRef(),_=i==="Dropdown",P=!x&&a.length>F,U=x&&!d&&!M&&a.length>F,q=e.jsxs("div",{className:_?"EnumFacetFilter__dropdown_menu":"",children:[e.jsxs("div",{className:"EnumFacetFilter__checkboxContainer--forAll",children:[e.jsx(Y,{sx:{display:p?void 0:"none"},size:"small",fullWidth:!0,InputProps:{startAdornment:e.jsx(v,{title:"Close search",children:e.jsx(y,{size:"small",onClick:()=>{k(!1),w(!1)},children:e.jsx(g,{sx:{fontSize:"inherit"},wrap:!1,icon:"arrowBack"})})}),endAdornment:d.length>0&&e.jsx(v,{title:"Clear",children:e.jsx(y,{size:"small",onClick:()=>{var t;j(""),(t=S.current)==null||t.focus()},children:e.jsx(g,{sx:{fontSize:"inherit"},wrap:!1,icon:"close"})})})},type:"text",placeholder:"Find values",value:d,ref:S,onChange:t=>{j(t.target.value)}}),!p&&e.jsxs("div",{className:"EnumFacetFilter__checkAll",children:[e.jsx(B,{className:"EnumFacetFilter__checkbox",onChange:()=>{n||O()},checked:n,label:"All",isSelectAll:!0},"select_all"),e.jsx(v,{title:"Search",children:e.jsx(y,{size:"small",className:"EnumFacetFilter__searchbtn",onClick:()=>{var t;j(""),k(!0),(t=S.current)==null||t.focus()},children:e.jsx(g,{sx:{fontSize:"inherit"},wrap:!1,icon:"search"})})})]})]}),e.jsxs("div",{children:[h.map((t,$)=>{const{isSelected:Z,displayText:G,value:f,count:X}=t;return e.jsx(E,{id:[H(s),H(f),$].join("-"),label:G,count:X,isDropdown:_,checked:Z,onHover:()=>{R(f)},onChange:J=>{J?u(f):m(f)}},f)}),!_&&e.jsxs(e.Fragment,{children:[P&&e.jsx("button",{className:"EnumFacetFilter__showMoreFacetsBtn",onClick:()=>w(!0),children:e.jsx("div",{className:"EnumFacetFilter__checkboxContainer",children:e.jsxs("div",{className:"EnumFacetFilter__showMoreFacetsLabel",children:["Show all (",a.length,")"]})})}),U&&e.jsx("button",{className:"EnumFacetFilter__showMoreFacetsBtn",onClick:()=>w(!1),children:e.jsx("div",{className:"EnumFacetFilter__checkboxContainer",children:e.jsx("div",{className:"EnumFacetFilter__showMoreFacetsLabel",children:"Show less"})})})]}),h.length<=0&&e.jsx("div",{className:"EnumFacetFilter__noMatch",children:"No match found"})]})]}),W=c.useMemo(()=>n?"All":!n&&h.filter(t=>t.isSelected).length===1?h.filter(t=>t.isSelected)[0].value:"Multiple Values Selected",[n,h]);return _?e.jsx(I,{dropdownType:o,menuText:W,hasSelection:!n,children:q}):e.jsxs(e.Fragment,{children:[e.jsx(N,{hideCollapsible:r,isCollapsed:T,label:s,onClick:t=>L(t)}),e.jsx(ee,{className:"EnumFacetFilter",in:!T,children:q})]})}try{A.displayName="EnumFacetFilterUI",A.__docgenInfo={description:"",displayName:"EnumFacetFilterUI",props:{facetTitle:{defaultValue:null,description:"",name:"facetTitle",required:!0,type:{name:"string"}},facetValues:{defaultValue:null,description:"",name:"facetValues",required:!0,type:{name:"RenderedFacetValue[]"}},allIsSelected:{defaultValue:null,description:"",name:"allIsSelected",required:!0,type:{name:"boolean"}},containerAs:{defaultValue:null,description:"",name:"containerAs",required:!1,type:{name:"enum",value:[{value:'"Collapsible"'},{value:'"Dropdown"'}]}},dropdownType:{defaultValue:null,description:"",name:"dropdownType",required:!1,type:{name:"enum",value:[{value:'"Icon"'},{value:'"SelectBox"'}]}},hideCollapsible:{defaultValue:null,description:"",name:"hideCollapsible",required:!1,type:{name:"boolean"}},onAddValueToSelection:{defaultValue:null,description:"",name:"onAddValueToSelection",required:!0,type:{name:"(value: string) => void"}},onRemoveValueFromSelection:{defaultValue:null,description:"",name:"onRemoveValueFromSelection",required:!0,type:{name:"(value: string) => void"}},onRemoveAllFacetSelections:{defaultValue:null,description:"",name:"onRemoveAllFacetSelections",required:!0,type:{name:"() => void"}},onHoverOverValue:{defaultValue:null,description:"",name:"onHoverOverValue",required:!0,type:{name:"(value: string) => void"}}}}}catch{}export{A as E,N as F};
