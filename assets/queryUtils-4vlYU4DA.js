import{V as m}from"./SynapseConstants-Br5dMy50.js";import"./SynapseClient-Dbc8tFdW.js";import{i,h as f,b as c,c as d,d as h,e as F,f as g}from"./EntityTypeUtils-BpOAC-k-.js";import"./getEndpoint-CjoHA800.js";import"./index-Dl6G-zuu.js";import"./jsx-runtime-Du8NFWEI.js";import"./OrientationBanner-x6ohh6pv.js";import{i as p,a as l}from"./isNil-CdNFIrsH.js";import{c as r}from"./cloneDeep-DwycXlOj.js";import{i as N}from"./isEqualWith-ClXv5bFA.js";import{i as w}from"./isEqual-DHUbDzRq.js";const y=(t,e)=>{var n;return((n=e==null?void 0:e.selectColumns)==null?void 0:n.findIndex(s=>s.name===t))??-1},D=(t,e)=>{var s;const n=t.toLowerCase();return((s=e==null?void 0:e.queryResult)==null?void 0:s.queryResults.headers.findIndex(a=>a.name.toLowerCase()===n))??-1};function R(t,e){return((e==null?void 0:e.selectColumns)??[]).reduce((n,s,a)=>s.columnType===t?[...n,a]:n,[])}const v=(t,e)=>t==null||e==null||t.length===0||e.length===0?!1:t.filter(s=>!L(s)&&e.find(a=>a.name===s.columnName)).length>0,L=t=>t.facetType==="enumeration"&&t.facetValues.length==1&&t.facetValues[0].value==m;function Q(t,e){var s;const n=e==null?void 0:e.columnName;if(n&&t){const a=r(t),o=(s=a.facets)==null?void 0:s.filter(u=>u.columnName.toLowerCase()!==n.toLowerCase());return a.facets=o,a}else return t}function q(t,e){const n=Array.isArray(t.selectedFacets)&&t.selectedFacets.filter(a=>{var o;return a.columnName.toLowerCase()!==((o=e==null?void 0:e.columnName)==null?void 0:o.toLowerCase())}).length>0,s=Array.isArray(t.additionalFilters)&&t.additionalFilters.filter(a=>{var o;return F(a)||g(a)?a.columnName.toLowerCase()!==((o=e==null?void 0:e.columnName)==null?void 0:o.toLowerCase()):!0}).length>0;return n||s}function W(t,e){return t&&i(t)&&!f(t)||t&&c(t)?!1:!!(e||t&&(i(t)&&d(t)||h(t)))}function B(t,e){const n=r(t);delete n.limit,delete n.offset,delete n.sort;const s=r(e);return delete s.limit,delete s.offset,delete s.sort,N(n,s,(a,o)=>l(a)&&l(o)?!0:w(a,o))}function H(t){const e=r(t);return e.limit==null&&delete e.limit,(e.offset==null||e.offset==0)&&delete e.offset,(e.sort==null||e.sort.length==0)&&delete e.sort,(e.selectedFacets==null||e.selectedFacets.length==0)&&delete e.selectedFacets,(e.additionalFilters==null||e.additionalFilters.length==0)&&delete e.additionalFilters,e}function _(t,e){let n=e.find(s=>s.name===t.columnName);return t.jsonPath&&n&&n.jsonSubColumns&&(n=n.jsonSubColumns.find(s=>s.jsonPath===t.jsonPath)),n}function O(t,e){return e==null?void 0:e.find(n=>V(t,n))}function V(t,e){return p({columnName:t.columnName,jsonPath:t.jsonPath},{columnName:e.columnName,jsonPath:e.jsonPath})}export{D as a,Q as b,O as c,_ as d,R as e,V as f,y as g,q as h,v as i,W as j,L as k,B as q,H as r};
