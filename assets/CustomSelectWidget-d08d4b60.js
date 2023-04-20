import{l as q,v as K,g as U,b as z,m as J,h as G,J as H,k as Q,y as X}from"./hasIn-6ae41e3d.js";import{_ as Y,a as Z,i as ee,g as te,h as re,f as ae}from"./index.browser-ac474deb.js";import{c as oe}from"./_baseUniq-7e37c67e.js";import{_ as ne}from"./_basePickBy-38ad6c16.js";import{j as D}from"./jsx-runtime-ad672792.js";import{_ as ie}from"./extends-98964cd2.js";import{r as g}from"./index-f1f749bf.js";import{_ as se,c as x,v as le,a as I,g as pe,b as ce,u as ue,S as de,d as fe}from"./Select-40119e12.esm-e6caee23.js";import{e as w}from"./toConsumableArray-85fcc1b5.js";import"./index-96c5f47c.js";var me=q,ge=K,_e=U,be=z,ve=J,he=G,Oe=H,ye=Q,Ce="[object Map]",we="[object Set]",Le=Object.prototype,Ne=Le.hasOwnProperty;function Pe(e){if(e==null)return!0;if(ve(e)&&(be(e)||typeof e=="string"||typeof e.splice=="function"||he(e)||ye(e)||_e(e)))return!e.length;var t=ge(e);if(t==Ce||t==we)return!e.size;if(Oe(e))return!me(e).length;for(var a in e)if(Ne.call(e,a))return!1;return!0}var at=Pe,Se=Z,$e=Y,ke=oe,Ae=ee,Ve=$e(function(e){return ke(Se(e,1,Ae,!0))}),ot=Ve,je=ne,Te=X;function We(e,t){return je(e,t,function(a,r){return Te(e,r)})}var xe=We,Ie=ae,Re=te,Be=re;function De(e){return Be(Re(e,void 0,Ie),e+"")}var Ee=De,Fe=xe,Me=Ee,qe=Me(function(e,t){return e==null?{}:Fe(e,t)}),nt=qe,Ke=["allowCreateWhileLoading","createOptionPosition","formatCreateLabel","isValidNewOption","getNewOptionData","onCreateOption","options","onChange"],R=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",a=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,n=String(t).toLowerCase(),i=String(r.getOptionValue(a)).toLowerCase(),u=String(r.getOptionLabel(a)).toLowerCase();return i===n||u===n},L={formatCreateLabel:function(t){return'Create "'.concat(t,'"')},isValidNewOption:function(t,a,r,n){return!(!t||a.some(function(i){return R(t,i,n)})||r.some(function(i){return R(t,i,n)}))},getNewOptionData:function(t,a){return{label:a,value:t,__isNew__:!0}}};function Ue(e){var t=e.allowCreateWhileLoading,a=t===void 0?!1:t,r=e.createOptionPosition,n=r===void 0?"last":r,i=e.formatCreateLabel,u=i===void 0?L.formatCreateLabel:i,_=e.isValidNewOption,b=_===void 0?L.isValidNewOption:_,v=e.getNewOptionData,c=v===void 0?L.getNewOptionData:v,d=e.onCreateOption,h=e.options,s=h===void 0?[]:h,o=e.onChange,l=se(e,Ke),S=l.getOptionValue,$=S===void 0?pe:S,k=l.getOptionLabel,A=k===void 0?ce:k,p=l.inputValue,V=l.isLoading,j=l.isMulti,O=l.value,T=l.name,f=g.useMemo(function(){return b(p,x(O),s,{getOptionValue:$,getOptionLabel:A})?c(p,u(p)):void 0},[u,c,A,$,p,b,s,O]),E=g.useMemo(function(){return(a||!V)&&f?n==="first"?[f].concat(w(s)):[].concat(w(s),[f]):s},[a,n,V,f,s]),F=g.useCallback(function(m,y){if(y.action!=="select-option")return o(m,y);var W=Array.isArray(m)?m:[m];if(W[W.length-1]===f){if(d)d(p);else{var C=c(p,p),M={action:"create-option",name:T,option:C};o(le(j,[].concat(w(x(O)),[C]),C),M)}return}o(m,y)},[c,p,j,T,f,d,o,O]);return I(I({},l),{},{options:E,onChange:F})}var ze=g.forwardRef(function(e,t){var a=ue(e),r=Ue(a);return g.createElement(de,ie({ref:t},r))});const N=({children:e,...t})=>D(fe.Control,{...t,className:"form-control",children:e});function P(e,t){if(e==null)return;const a=t.filter(r=>r.value===e);return a.length>0?a[0]:{value:e,label:e}}const B=e=>{const{id:t,options:a,value:r,required:n,disabled:i,readonly:u,multiple:_,autofocus:b,onChange:v,onBlur:c,onFocus:d,placeholder:h}=e,{enumOptions:s}=a;return D(ze,{className:"react-select-container",inputId:t,isMulti:_,placeholder:h,value:P(r,s),"aria-required":n,isDisabled:i||u,autoFocus:b,onBlur:c&&(()=>c(t,r==null?void 0:r.value)),options:s,onFocus:d&&(()=>d(t,r==null?void 0:r.value)),onChange:o=>v(o==null?void 0:o.value),isClearable:!0,components:{Control:N},formatCreateLabel:o=>`Set to custom value "${o}"`,styles:{control:o=>({...o,border:"unset",borderColor:"unset",boxShadow:"unset","&:hover":{}}),valueContainer:o=>({...o,padding:"0px"})}})};try{P.displayName="findValueOption",P.__docgenInfo={description:`react-select's value prop should be an EnumOption (see custom type defined above)

This function finds the enum option that has the corresponding value and returns it.

If value is nullish, this fn returns undefined. If there is no corresponding option, then a new object is returned
where the label and value are set to the provided value.`,displayName:"findValueOption",props:{}}}catch{}try{N.displayName="Control",N.__docgenInfo={description:"We want to apply the 'form-control' bootstrap class to react-select's Control component, and the easiest way to do that is to make a custom version",displayName:"Control",props:{}}}catch{}try{B.displayName="CustomSelectWidget",B.__docgenInfo={description:"Select widget compatible with react-jsonschema-form enumerations",displayName:"CustomSelectWidget",props:{}}}catch{}export{N as C,B as a,P as f,at as i,nt as p,ot as u};
//# sourceMappingURL=CustomSelectWidget-d08d4b60.js.map
