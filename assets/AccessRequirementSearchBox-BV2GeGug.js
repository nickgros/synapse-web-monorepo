import{j as W}from"./jsx-runtime-Du8NFWEI.js";import{b as fe}from"./createTheme-C4MKIpuQ.js";import{r as t}from"./index-Dl6G-zuu.js";import{_ as ce,a as o,h as Se,b as C,c as me,u as ge,S as ve}from"./Select-49a62830.esm-DLH6iHJo.js";import"./index-BIzb42Jq.js";import{l as he,S as z}from"./useFiles-DlHdYvDe.js";import"./VerificationSubmission-DL9jxYsQ.js";import"./StringUtils-By8SXO8c.js";import{h as Oe}from"./useAccessRequirements-CnWrnWGR.js";import{u as _e}from"./utils-DDqOmLXv.js";import{S as ye}from"./Skeleton-CW6YXi1_.js";var Ie=["defaultOptions","cacheOptions","loadOptions","options","isLoading","onInputChange","filterOption"];function Ce(n){var r=n.defaultOptions,e=r===void 0?!1:r,l=n.cacheOptions,f=l===void 0?!1:l,S=n.loadOptions;n.options;var m=n.isLoading,p=m===void 0?!1:m,_=n.onInputChange,y=n.filterOption,s=y===void 0?null:y,g=ce(n,Ie),i=g.inputValue,d=t.useRef(void 0),u=t.useRef(!1),H=t.useState(Array.isArray(e)?e:void 0),P=o(H,2),J=P[0],E=P[1],K=t.useState(typeof i<"u"?i:""),$=o(K,2),j=$[0],A=$[1],Q=t.useState(e===!0),w=o(Q,2),U=w[0],v=w[1],X=t.useState(void 0),B=o(X,2),L=B[0],x=B[1],Y=t.useState([]),D=o(Y,2),Z=D[0],V=D[1],ee=t.useState(!1),N=o(ee,2),te=N[0],I=N[1],ne=t.useState({}),T=o(ne,2),h=T[0],k=T[1],ae=t.useState(void 0),M=o(ae,2),se=M[0],re=M[1],ie=t.useState(void 0),G=o(ie,2),ue=G[0],oe=G[1];f!==ue&&(k({}),oe(f)),e!==se&&(E(Array.isArray(e)?e:void 0),re(e)),t.useEffect(function(){return u.current=!0,function(){u.current=!1}},[]);var b=t.useCallback(function(O,c){if(!S)return c();var a=S(O,c);a&&typeof a.then=="function"&&a.then(c,function(){return c()})},[S]);t.useEffect(function(){e===!0&&b(j,function(O){u.current&&(E(O||[]),v(!!d.current))})},[]);var pe=t.useCallback(function(O,c){var a=Se(O,c,_);if(!a){d.current=void 0,A(""),x(""),V([]),v(!1),I(!1);return}if(f&&h[a])A(a),x(a),V(h[a]),v(!1),I(!1);else{var le=d.current={};A(a),v(!0),I(!L),b(a,function(R){u&&le===d.current&&(d.current=void 0,v(!1),x(a),V(R||[]),I(!1),k(R?C(C({},h),{},me({},a,R)):h))})}},[f,b,L,h,_]),de=te?[]:j&&L?Z:J||[];return C(C({},g),{},{options:de,isLoading:U||p,onInputChange:pe,filterOption:s})}var Ae=t.forwardRef(function(n,r){var e=Ce(n),l=ge(e);return t.createElement(ve,fe({ref:r},l))}),Le=Ae;function q(n,r){return n.toString()===r?r:`${r} (${n})`}function F(n){const{inputId:r,initialId:e,onChange:l,placeholder:f}=n,{palette:S}=_e(),{accessToken:m}=he(),{data:p,isLoading:_}=Oe(e,{enabled:!!e});async function y(s){var d;const g=parseInt(s);let i;return g&&(i=[await z.getAccessRequirementById(m,g)]),i||(i=(d=await z.searchAccessRequirements(m,{nameContains:s}))==null?void 0:d.results),(i==null?void 0:i.map(u=>({id:u.id.toString(),value:u.id.toString(),label:q(u.id,u.name)})))??[]}return e&&_?W.jsx(ye,{width:"100%"}):W.jsx(Le,{className:"AsyncSelect",defaultInputValue:e?q(e,(p==null?void 0:p.name)??e.toString()):void 0,defaultOptions:e?[{id:e,value:e,label:q(e,(p==null?void 0:p.name)??e.toString())}]:!0,inputId:r,cacheOptions:!0,isClearable:!0,styles:{control:s=>({...s,backgroundColor:S.grey[200]}),input:s=>({...s,input:{gridArea:"1 / 2 / 4 / 4 !important"}})},loadOptions:y,onChange:s=>{l(s==null?void 0:s.id.toString())},placeholder:f})}try{F.displayName="AccessRequirementSearchBox",F.__docgenInfo={description:"",displayName:"AccessRequirementSearchBox",props:{inputId:{defaultValue:null,description:"",name:"inputId",required:!1,type:{name:"string"}},initialId:{defaultValue:null,description:"",name:"initialId",required:!1,type:{name:"string | number"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(accessRequirementId?: string | undefined) => void"}},placeholder:{defaultValue:null,description:"",name:"placeholder",required:!1,type:{name:"string"}}}}}catch{}export{F as A};
