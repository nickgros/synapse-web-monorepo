import{j as r,F as D,a as u}from"./jsx-runtime-9dc53467.js";import{e as W,f as qe,H as we,g as Ae,s as Ce,M as Ee,A as Ne,a as Ie,b as Pe,c as je,B as De,E as xe,T as Oe,D as Re,d as ke,h as Be,i as Le,j as $e}from"./ErrorListTemplate-27ef2177.js";import"./isPlainObject-cb19acc1.js";import"./mapValues-a94bd5d1.js";import{ai as ge,aj as G,ak as le,al as He,am as pe,an as Me,ao as Je,ap as Ke,aq as We,ar as me,as as Ge,at as Ue,au as Xe,J as Ye,K as Ze,v as Qe,C as ze}from"./HelpPopover-f7b3f4de.js";import"./index.modern-ebb8621a.js";import{r as q,R as j}from"./index-76fb7be0.js";import"./index-c71daf5e.js";import{h as se,m as de,n as ce,T as et,b7 as tt}from"./ApplicationSessionManager-9bd355c2.js";import{S as rt}from"./createSvgIcon-396e3e24.js";import{g as at,B as nt}from"./getEndpoint-ac94413e.js";import"./OrientationBanner-a1ca5cdb.js";import{d as it,m as ot}from"./useEntity-96ca7b35.js";import{S as lt}from"./LoadingScreen-21cf5616.js";import{F as st}from"./FullWidthAlert-706fe840.js";import{G as x}from"./Grid-4f081432.js";import{I as be}from"./InputLabel-fd013c0b.js";import{b as dt}from"./isNil-2fb52fad.js";import{u as ct}from"./use-deep-compare-effect.esm-3f8944c0.js";import{d as ut}from"./ToastMessage-313b7aae.js";import{M as Se}from"./Tooltip-801f2a9c.js";import{B as pt}from"./Button-33299b2c.js";import{M as Te,F as mt}from"./TextField-259737a9.js";import{I as ft}from"./IconButton-f820fa46.js";import{C as ve}from"./_getTag-559aebd9.js";import{B as U}from"./Box-8faf86fd.js";import{T as X}from"./Typography-1d068b0b.js";import{L as ht}from"./List-a6975dc7.js";import{L as yt}from"./ListItem-55cd17a8.js";import{M as K}from"./Alert-c3fe2b05.js";import{L as gt}from"./Link-6ae0d01e.js";import{D as bt}from"./Divider-94881329.js";function St(t,e){const{accessToken:a,keyFactory:n}=se();return de({...e,queryKey:n.getEntityBoundJsonSchemaQueryKey(t),queryFn:()=>ce.getSchemaBinding(t,a)})}function rr(t,e){const{accessToken:a,keyFactory:n}=se();return de({...e,queryKey:n.getEntitySchemaValidationResultsQueryKey(t),queryFn:()=>ce.getSchemaValidationResults(t,a)})}function Tt(t,e){const{keyFactory:a}=se();return de({...e,queryKey:a.getValidationSchemaQueryKey(t),queryFn:async()=>(await ce.getValidationSchema(t)).validationSchema})}const R=t=>r(rt,{...t,width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:r("path",{d:"M14 10H2V12H14V10ZM14 6H2V8H14V6ZM18 14V10H16V14H12V16H16V20H18V16H22V14H18ZM2 16H10V14H2V16Z"})});try{R.displayName="AddToList",R.__docgenInfo={description:"",displayName:"AddToList",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: SVGSVGElement | null) => void) | RefObject<SVGSVGElement> | null"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any>"}}}}}catch{}const _e=/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/,vt=["String","Integer","Float","Boolean","Datetime"];function Y(t){return t.length===0?"String":t.every(e=>typeof e=="number"||e==="NaN")?t.every(e=>Number.isInteger(e))?"Integer":"Float":t.every(e=>typeof e=="boolean")?"Boolean":t.every(e=>typeof e=="string")&&t.every(e=>!!_e.exec(e))?"Datetime":"String"}function fe(t,e){switch(e){case"Integer":return t.map(a=>Number.isNaN(Number(a))?0:Math.floor(Number(a)));case"Float":return t.map(a=>{const n=parseFloat(a);return Number.isNaN(n)?"NaN":Number.isInteger(n)?n.toFixed(1):n});case"Datetime":return t.map(a=>typeof a=="string"&&_e.exec(a)?a:new Date().toISOString());case"Boolean":return t.map(a=>!!a);case"String":default:return t.map(a=>String(a))}}function Z(t){switch(t){case"Datetime":return{type:"string",format:"datetime"};case"Boolean":return{type:"boolean"};case"Float":return{type:"number"};case"Integer":return{type:"integer"};case"String":default:return{type:"string"}}}function Q(t){const{formData:e,onChange:a,registry:n,schema:f,name:s,onDropPropertyClick:p,idSchema:h}=t,d=h.$id,{ArrayField:y}=n.fields,{SelectWidget:m}=n.widgets,[c,g]=q.useState(Y(W(e))),[o,T]=q.useState(c);q.useEffect(()=>{function i(){if(Array.isArray(e)){const S=e.length===0||e.every(_=>_==null||_==""),C=fe(e,o);(S||o!==c)&&dt(e,C)&&g(o)}}i()},[o]),q.useEffect(()=>{function i(){if(Array.isArray(e))if(e.every(S=>S==null))p(s)(new CustomEvent("dropEmptyProperty"));else{const S=fe(e,o);g(o),a(S)}}i()},[c]);const b=Z(c);return Array.isArray(e)?u(qe,{value:{dropProperty:i=>{p(s)(i)}},children:[u(x,{item:!0,xs:2,children:[r(be,{htmlFor:`${d}-type`,children:"Type"}),r(m,{name:"Type",id:`${d}-type`,schema:{},options:{enumOptions:vt.map(i=>({label:i,value:i}))},value:c,onChange:i=>{T(i)},disabled:t.disabled,readOnly:t.readonly,required:!0,isClearable:!1,onBlur:()=>{},onFocus:()=>{},registry:n,label:"Type"})]}),r(x,{item:!0,xs:7,children:r(y,{...t,schema:{...f,items:{...b}}})}),c!==o&&r(st,{variant:"warning",title:"Data may be lost when converting types",description:`Are you sure you want to convert ${s} from ${c} to ${o}? Current values may be lost on conversion.`,primaryButtonConfig:{text:"Convert",onClick:()=>{g(o)}},secondaryButtonConfig:{text:"Cancel",onClick:()=>{T(c)}},isGlobal:!1})]}):(a(W(e)),r(D,{}))}try{Y.displayName="guessPropertyType",Y.__docgenInfo={description:"",displayName:"guessPropertyType",props:{}}}catch{}try{Z.displayName="getSchemaForPropertyType",Z.__docgenInfo={description:"Maps a Synapse Annotation PropertyType to a JSON Schema that captures the type and format.",displayName:"getSchemaForPropertyType",props:{}}}catch{}try{Q.displayName="AdditionalPropertiesSchemaField",Q.__docgenInfo={description:`react-jsonschema-form SchemaField override for "additionalProperties" only. In Synapse these are "custom annotations".
Modifies the data to provide full compatibility with Synapse annotations features.

This component provides these enhancements to the SchemaField:
- Supports selecting a type, and changing the input widget appropriately
- Identifying the type on mount
- Treat all field values as arrays
- When the last array value is removed, remove the entire key from the form.`,displayName:"AdditionalPropertiesSchemaField",props:{onDropPropertyClick:{defaultValue:null,description:"",name:"onDropPropertyClick",required:!0,type:{name:"(key: string) => (event: any) => void"}}}}}catch{}function z(t){const{description:e,disabled:a,formData:n,idSchema:f,onAddClick:s,properties:p,readonly:h,registry:d,required:y,schema:m,title:c,uiSchema:g}=t,o=ge(g),T=G("TitleFieldTemplate",d,o),b=G("DescriptionFieldTemplate",d,o),i=q.useRef(new Set);return ct(()=>{if("properties"in m&&m.properties){const S=Object.keys(m.properties),C=new Set(S.filter(_=>!m.properties[_][le]));if(i.current!=null){const _=Array.from(i.current).filter(v=>!C.has(v)&&!!n&&n[v]!=null&&Array.isArray(n[v])&&n[v].filter(l=>l!=null).length>0);_.length>0&&ut(`The following annotations are no longer specified by the schema and have been converted to custom fields: ${_.join(", ")}.`,"warning",{title:"Fields No Longer Specified By Schema"})}i.current=C}},[m.properties]),u("fieldset",{id:f.$id,children:[(o.title||c)&&r(T,{id:`${f.$id}__title`,schema:m,title:o.title||c,required:y,uiSchema:g,registry:d}),(o.description||e)&&r(b,{id:`${f.$id}__description`,description:o.description||e,registry:d,schema:m}),p.map(S=>S.content),He(m,g,n)&&r(Se,{title:"Add a new custom field",placement:"top",children:r(pt,{sx:{my:2},variant:"contained",className:"object-property-expand",onClick:s(m),disabled:a||h,"aria-label":"Add Custom Field",children:r(R,{})})})]})}try{z.displayName="ObjectFieldTemplate",z.__docgenInfo={description:`Derived from the base ObjectFieldTemplate with annotations-editor-specific changes
- Custom button for adding additional properties
- Tracks properties to show a toast message if a property is converted to an additionalProperty because it was
  dropped from the schema (e.g. in a conditional schema)

See https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/mui/src/ObjectFieldTemplate/ObjectFieldTemplate.tsx`,displayName:"ObjectFieldTemplate",props:{title:{defaultValue:null,description:"A string value containing the title for the object",name:"title",required:!0,type:{name:"string"}},description:{defaultValue:null,description:"A string value containing the description for the object",name:"description",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"A boolean value stating if the object is disabled",name:"disabled",required:!1,type:{name:"boolean"}},properties:{defaultValue:null,description:"An array of objects representing the properties in the object",name:"properties",required:!0,type:{name:"ObjectFieldTemplatePropertyType[]"}},onAddClick:{defaultValue:null,description:"Returns a function that adds a new property to the object (to be used with additionalProperties)",name:"onAddClick",required:!0,type:{name:"(schema: S) => () => void"}},readonly:{defaultValue:null,description:"A boolean value stating if the object is read-only",name:"readonly",required:!1,type:{name:"boolean"}},required:{defaultValue:null,description:"A boolean value stating if the object is required",name:"required",required:!1,type:{name:"boolean"}},hideError:{defaultValue:null,description:"A boolean value stating if the field is hiding its errors",name:"hideError",required:!1,type:{name:"boolean"}},schema:{defaultValue:null,description:"The schema object for this object",name:"schema",required:!0,type:{name:"JSONSchema7"}},uiSchema:{defaultValue:null,description:"The uiSchema object for this object field",name:"uiSchema",required:!1,type:{name:"UiSchema<T, S, F>"}},idSchema:{defaultValue:null,description:"An object containing the id for this object & ids for its properties",name:"idSchema",required:!0,type:{name:"IdSchema<T>"}},errorSchema:{defaultValue:null,description:"The optional validation errors in the form of an `ErrorSchema`",name:"errorSchema",required:!1,type:{name:"ErrorSchema<T>"}},formData:{defaultValue:null,description:"The form data for the object",name:"formData",required:!1,type:{name:"Record<string, any> | null"}},formContext:{defaultValue:null,description:"The `formContext` object that was passed to Form",name:"formContext",required:!1,type:{name:"GenericObjectType"}},registry:{defaultValue:null,description:"The `registry` object",name:"registry",required:!0,type:{name:"Registry<T, S, F>"}}}}}catch{}function ee(t){const{fields:{ObjectField:e}}=Je();return q.useEffect(()=>{const{schema:a,formData:n,onChange:f}=t,s={...n};a[pe]&&(Object.entries(a[pe]).forEach(([p,h])=>{const d=s[p];h[le]?Array.isArray(d)||(s[p]=W(d)):typeof h=="object"&&"type"in h&&h.type!=="array"&&Array.isArray(d)&&(s[p]=d.map(y=>`${y}`).join(", "))}),Me(n,s)||f(s))}),r(e,{...t})}try{ee.displayName="CustomObjectField",ee.__docgenInfo={description:"Extends the",displayName:"CustomObjectField",props:{}}}catch{}function te(t){const{id:e,classNames:a,disabled:n,label:f,onKeyChange:s,readonly:p,required:h,schema:d,children:y,registry:m}=t,{translateString:c}=m,g=c(Ke.KeyLabel,[""]);if(!(le in d))return r("div",{className:a,children:y});const T=({target:b})=>{b&&s(b.value)};return r("div",{className:a,children:u(x,{container:!0,my:1,columnSpacing:2,rowSpacing:0,children:[r(x,{item:!0,xs:3,children:r(Te,{fullWidth:!0,required:h,label:g,defaultValue:f,disabled:n||p,id:`${e}-key`,name:`${e}-key`,onBlur:p?void 0:T,type:"text"})}),y]})})}try{te.displayName="WrapIfAdditionalTemplate",te.__docgenInfo={description:"The `WrapIfAdditional` component is used by the `FieldTemplate` to rename, or remove properties that are\npart of an `additionalProperties` part of a schema.",displayName:"WrapIfAdditionalTemplate",props:{children:{defaultValue:null,description:"The field or widget component instance for this field row",name:"children",required:!0,type:{name:"ReactNode"}},style:{defaultValue:null,description:"An object containing the style as defined in the `uiSchema`",name:"style",required:!1,type:{name:"StyleHTMLAttributes<any>"}},disabled:{defaultValue:null,description:"A boolean value stating if the field is disabled",name:"disabled",required:!0,type:{name:"boolean"}},label:{defaultValue:null,description:"The computed label for this field, as a string",name:"label",required:!0,type:{name:"string"}},id:{defaultValue:null,description:"The id of the field in the hierarchy. You can use it to render a label targeting the wrapped widget",name:"id",required:!0,type:{name:"string"}},required:{defaultValue:null,description:"A boolean value stating if the field is required",name:"required",required:!1,type:{name:"boolean"}},schema:{defaultValue:null,description:"The schema object for this field",name:"schema",required:!0,type:{name:"JSONSchema7"}},uiSchema:{defaultValue:null,description:"The uiSchema object for this field",name:"uiSchema",required:!1,type:{name:"UiSchema<T, S, F>"}},readonly:{defaultValue:null,description:"A boolean value stating if the field is read-only",name:"readonly",required:!0,type:{name:"boolean"}},registry:{defaultValue:null,description:"The `registry` object",name:"registry",required:!0,type:{name:"Registry<T, S, F>"}},onDropPropertyClick:{defaultValue:null,description:"The property drop/removal event handler; Called when a field is removed in an additionalProperty context",name:"onDropPropertyClick",required:!0,type:{name:"(value: string) => () => void"}},classNames:{defaultValue:null,description:"A string containing the base CSS classes, merged with any custom ones defined in your uiSchema",name:"classNames",required:!1,type:{name:"string"}},onKeyChange:{defaultValue:null,description:"The key change event handler; Called when the key associated with a field is changed for an additionalProperty",name:"onKeyChange",required:!0,type:{name:"(value: string) => () => void"}}}}}catch{}function re(t){const{id:e,label:a,children:n,errors:f,help:s,description:p,hidden:h,required:d,displayLabel:y,registry:m,uiSchema:c,schema:g}=t,o=ge(c),T=G("WrapIfAdditionalTemplate",m,o),[b,i]=q.useState(!1);return h?r("div",{className:"hidden",children:n}):u(T,{...t,children:[(y||g.type==="boolean")&&u("div",{className:"LabelContainer",children:[u(be,{htmlFor:e,children:[a,d&&r("span",{className:"required",children:"*"})]}),r(Se,{title:"More Info",children:r(ft,{onClick:S=>{S.preventDefault(),i(!b)},"aria-expanded":b,size:"small",children:r(we,{color:"primary",sx:{width:"16px",height:"16px"}})})})]}),n,r(x,{item:!0,xs:12,children:f}),r(ve,{className:"field-description",in:b,children:p}),s]})}try{re.displayName="FieldTemplate",re.__docgenInfo={description:"",displayName:"FieldTemplate",props:{id:{defaultValue:null,description:"The id of the field in the hierarchy. You can use it to render a label targeting the wrapped widget",name:"id",required:!0,type:{name:"string"}},classNames:{defaultValue:null,description:"A string containing the base CSS classes, merged with any custom ones defined in your uiSchema",name:"classNames",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"An object containing the style as defined in the `uiSchema`",name:"style",required:!1,type:{name:"StyleHTMLAttributes<any>"}},label:{defaultValue:null,description:"The computed label for this field, as a string",name:"label",required:!0,type:{name:"string"}},description:{defaultValue:null,description:"A component instance rendering the field description, if one is defined (this will use any custom\n`DescriptionField` defined)",name:"description",required:!1,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},rawDescription:{defaultValue:null,description:"A string containing any `ui:description` uiSchema directive defined",name:"rawDescription",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"The field or widget component instance for this field row",name:"children",required:!0,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},errors:{defaultValue:null,description:"A component instance listing any encountered errors for this field",name:"errors",required:!1,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},rawErrors:{defaultValue:null,description:"An array of strings listing all generated error messages from encountered errors for this field",name:"rawErrors",required:!1,type:{name:"string[]"}},help:{defaultValue:null,description:"A component instance rendering any `ui:help` uiSchema directive defined",name:"help",required:!1,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},rawHelp:{defaultValue:null,description:"A string containing any `ui:help` uiSchema directive defined. **NOTE:** `rawHelp` will be `undefined` if passed\n`ui:help` is a React component instead of a string",name:"rawHelp",required:!1,type:{name:"string"}},hidden:{defaultValue:null,description:"A boolean value stating if the field should be hidden",name:"hidden",required:!1,type:{name:"boolean"}},required:{defaultValue:null,description:"A boolean value stating if the field is required",name:"required",required:!1,type:{name:"boolean"}},readonly:{defaultValue:null,description:"A boolean value stating if the field is read-only",name:"readonly",required:!0,type:{name:"boolean"}},hideError:{defaultValue:null,description:"A boolean value stating if the field is hiding its errors",name:"hideError",required:!1,type:{name:"boolean"}},disabled:{defaultValue:null,description:"A boolean value stating if the field is disabled",name:"disabled",required:!0,type:{name:"boolean"}},displayLabel:{defaultValue:null,description:`A boolean value stating if the label should be rendered or not. This is useful for nested fields in arrays where
you don't want to clutter the UI`,name:"displayLabel",required:!1,type:{name:"boolean"}},schema:{defaultValue:null,description:"The schema object for this field",name:"schema",required:!0,type:{name:"JSONSchema7"}},uiSchema:{defaultValue:null,description:"The uiSchema object for this field",name:"uiSchema",required:!1,type:{name:"UiSchema<T, S, F>"}},formContext:{defaultValue:null,description:"The `formContext` object that was passed to `Form`",name:"formContext",required:!1,type:{name:"GenericObjectType"}},formData:{defaultValue:null,description:"The formData for this field",name:"formData",required:!1,type:{name:"T"}},onChange:{defaultValue:null,description:"The value change event handler; Can be called with a new value to change the value for this field",name:"onChange",required:!0,type:{name:"(newFormData: any, es?: ErrorSchema<any> | undefined, id?: string | undefined) => any"}},onKeyChange:{defaultValue:null,description:"The key change event handler; Called when the key associated with a field is changed for an additionalProperty",name:"onKeyChange",required:!0,type:{name:"(value: string) => () => void"}},onDropPropertyClick:{defaultValue:null,description:"The property drop/removal event handler; Called when a field is removed in an additionalProperty context",name:"onDropPropertyClick",required:!0,type:{name:"(value: string) => () => void"}},registry:{defaultValue:null,description:"The `registry` object",name:"registry",required:!0,type:{name:"Registry<T, S, F>"}}}}}catch{}function Ve(t){if(Array.isArray(t)||typeof t=="boolean")return"unknown";const{type:e,enum:a}=t;return e==="array"&&typeof t.items=="object"?`List of ${Ve(t.items)}`:a?"enumeration":Array.isArray(e)?e.reduce((n,f)=>`${n}, ${f}`,""):e||"unknown"}function ae(t){const{description:e,schema:a}=t,n=Ve(a);return r(ve,{className:"field-description",in:!0,children:r(U,{component:"table",className:"FieldDescriptionTable",mb:1,children:u("tbody",{children:[e&&u("tr",{children:[r("th",{children:"Description"}),r("td",{children:e})]}),u("tr",{children:[r("th",{children:"Type"}),r("td",{children:n})]})]})})})}try{ae.displayName="FieldDescriptionTable",ae.__docgenInfo={description:"",displayName:"FieldDescriptionTable",props:{schema:{defaultValue:null,description:"",name:"schema",required:!0,type:{name:"JSONSchema7"}},description:{defaultValue:null,description:"",name:"description",required:!0,type:{name:"ReactNode"}}}}}catch{}function ne(t){const{description:e,schema:a={}}=t;return a.type==="object"?r(X,{variant:"body1",sx:{my:2},children:e}):r(ae,{schema:a,description:e})}try{ne.displayName="DescriptionFieldTemplate",ne.__docgenInfo={description:"",displayName:"DescriptionFieldTemplate",props:{id:{defaultValue:null,description:"The id of the field description in the hierarchy",name:"id",required:!0,type:{name:"string"}},schema:{defaultValue:null,description:"The schema object for the field being described",name:"schema",required:!0,type:{name:"RJSFSchema"}},uiSchema:{defaultValue:null,description:"The uiSchema object for this description field",name:"uiSchema",required:!1,type:{name:"UiSchema<any, RJSFSchema, any>"}},description:{defaultValue:null,description:"The description of the field being rendered",name:"description",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},registry:{defaultValue:null,description:"The `registry` object",name:"registry",required:!0,type:{name:"Registry<any, RJSFSchema, any>"}}}}}catch{}const _t=["date","datetime-local","file","time"];function ie(t){const{id:e,name:a,placeholder:n,required:f,readonly:s,disabled:p,type:h,label:d,value:y,onChange:m,onChangeOverride:c,onBlur:g,onFocus:o,autofocus:T,options:b,schema:i,uiSchema:S,rawErrors:C=[],formContext:_,registry:v,InputLabelProps:l,...E}=t,N=!0,I=We(i,h,b),{step:k,min:B,max:w,...L}=I,$={inputProps:{step:k,min:B,max:w,...i.examples?{list:me(e)}:void 0},...L},H=({target:{value:V}})=>m(V===""?b.emptyValue:V),A=({target:{value:V}})=>g(e,V),M=({target:{value:V}})=>o(e,V),J=_t.includes(h)?{...l,shrink:!0}:l;let O;return(i.default||i.const)&&(O=JSON.stringify(i.default||i.const)+" (derived)"),u(D,{children:[r(Te,{id:e,name:e,placeholder:O||n,label:Ge(d||void 0,N,!1),autoFocus:T,required:!1,disabled:p||s,...$,value:y||y===0?y:"",error:C.length>0,onChange:c||H,onBlur:A,onFocus:M,InputLabelProps:J,...E,inputProps:{"aria-label":e},"aria-describedby":Ue(e,!!i.examples)}),Array.isArray(i.examples)&&r("datalist",{id:me(e),children:i.examples.concat(i.default&&!i.examples.includes(i.default)?[i.default]:[]).map(V=>r("option",{value:V},V))})]})}try{ie.displayName="BaseInputTemplate",ie.__docgenInfo={description:"The `BaseInputTemplate` is the template to use to render the basic `<input>` component for the `core` theme.\nIt is used as the template for rendering many of the <input> based widgets that differ by `type` and callbacks only.\nIt can be customized/overridden for other themes or individual implementations as needed.",displayName:"BaseInputTemplate",props:{}}}catch{}function oe(t){const{errors:e=[],idSchema:a}=t;if(e.length===0)return null;const n=Xe(a);return r(ht,{dense:!0,disablePadding:!0,children:e.map((f,s)=>r(yt,{disableGutters:!0,children:r(mt,{id:n,sx:{color:"error.main"},children:f})},s))})}try{oe.displayName="FieldErrorTemplate",oe.__docgenInfo={description:"The `FieldErrorTemplate` component renders the errors local to the particular field",displayName:"FieldErrorTemplate",props:{errorSchema:{defaultValue:null,description:"The errorSchema constructed by `Form`",name:"errorSchema",required:!1,type:{name:"ErrorSchema<T>"}},errors:{defaultValue:null,description:"An array of the errors",name:"errors",required:!1,type:{name:"(string | ReactElement<any, string | JSXElementConstructor<any>>)[]"}},idSchema:{defaultValue:null,description:"The tree of unique ids for every child field",name:"idSchema",required:!0,type:{name:"IdSchema<T>"}},schema:{defaultValue:null,description:"The schema that was passed to field",name:"schema",required:!0,type:{name:"JSONSchema7"}},uiSchema:{defaultValue:null,description:"The uiSchema that was passed to field",name:"uiSchema",required:!1,type:{name:"UiSchema<T, S, F>"}},registry:{defaultValue:null,description:"The `registry` object",name:"registry",required:!0,type:{name:"Registry<T, S, F>"}}}}}catch{}function Vt(t){return t?tt[t].reduce((e,a)=>(e[`^${a}$`]={not:{}},e),{}):{}}function he(t,e){let a=Le(t);return e&&(a=$e(a)),a}function ye(t){const{entityId:e,schemaId:a,validationSchema:n,liveValidate:f,onSuccess:s=()=>{},onCancel:p,formRef:h,onChange:d,hideActions:y=!1}=t,m=q.useRef(null),c=h??m,[g,o]=j.useState(void 0),[T,b]=j.useState(void 0),[i,S]=j.useState(!1),[C,_]=j.useState(!1),{data:v}=it(e,!1,{staleTime:1/0,enabled:!!e,throwOnError:!0}),l=v==null?void 0:v.entityMetadata,E=v==null?void 0:v.annotations,[N,I]=j.useState(void 0),k=q.useMemo(()=>Vt(l==null?void 0:l.concreteType),[l==null?void 0:l.concreteType]),B=q.useCallback(Ae(l==null?void 0:l.concreteType),[l==null?void 0:l.concreteType]);q.useEffect(()=>{E&&I(E)},[E]);const{data:w,isLoading:L}=St(e,{enabled:!!e,refetchOnWindowFocus:!1,throwOnError:!0}),{data:$,isLoading:H}=Tt(a??(w==null?void 0:w.jsonSchemaVersionInfo.$id)??"",{enabled:!!a||!!w,throwOnError:!0}),A=n||$,M=L||H,{mutate:J,isPending:O}=ot({onSuccess:()=>{s()},onError:F=>{b(F),S(!0)}});function V(){J({...he(N,!0),...l})}const ue=f??Ce(E,A);return r("div",{className:"JsonSchemaFormContainer",children:M?r("div",{className:"LoadingPlaceholder",children:r(lt,{size:30})}):u(D,{children:[l&&w&&u(K,{severity:"info",sx:{mb:2},children:[r("b",{children:l.name})," requires scientific annotations specified by ",r("b",{children:w.jsonSchemaVersionInfo.$id}),". ",r("b",{children:r(gt,{href:`${at(nt.REPO_ENDPOINT)}/repo/v1/schema/type/registered/${w.jsonSchemaVersionInfo.$id}`,target:"_blank",rel:"noopener noreferrer",children:"View required schema (JSON)"})})]}),l&&et(N)&&w===null&&r(K,{severity:"info",children:u(U,{display:"flex",alignItems:"center",gap:.5,children:[u(X,{variant:"smallText1",children:[r("b",{children:l.name})," has no annotations. Click the"," "]}),r(R,{}),r(X,{variant:"smallText1",children:"button to annotate."})]})}),u(Ee,{validator:Ye,className:"JsonSchemaForm",liveValidate:ue,noHtml5Validate:!0,experimental_defaultFormStateBehavior:{emptyObjectFields:"skipDefaults"},fields:{ObjectField:ee},templates:{ArrayFieldDescriptionTemplate:Ne,ArrayFieldItemTemplate:Ie,ArrayFieldTemplate:Pe,ArrayFieldTitleTemplate:je,BaseInputTemplate:ie,FieldErrorTemplate:oe,FieldTemplate:re,ObjectFieldTemplate:z,WrapIfAdditionalTemplate:te,ButtonTemplates:De,DescriptionFieldTemplate:ne,ErrorListTemplate:xe},ref:c,disabled:O,schema:{...A??{},patternProperties:{...(A==null?void 0:A.patternProperties)??{},...k},additionalProperties:(A==null?void 0:A.additionalProperties)??!0},uiSchema:{"ui:options":{copyable:!0,duplicateKeySuffixSeparator:"_"},additionalProperties:{"ui:field":Q}},transformErrors:B,formData:N,onChange:({formData:F})=>{d&&d(F),I(F),o(void 0)},onBlur:()=>{I(he(N,!1))},onSubmit:({formData:F,errors:P},Fe)=>{Fe.preventDefault(),P&&P.length>0&&o(P),S(!1),I(F),V()},onError:F=>{o(F),(g||ue)&&e&&_(!0)},widgets:{TextWidget:Oe,DateTimeWidget:Re,SelectWidget:Ze,CheckboxWidget:ke},children:[T&&i&&u(K,{severity:"error",sx:{my:2},children:["Annotations could not be updated: ",T.reason]}),!y&&u(D,{children:[r(bt,{sx:{my:2}}),r(U,{display:"flex",justifyContent:"space-between",sx:{gridRowStart:5},children:r(Qe,{hasCancelButton:p!==void 0,onCancel:()=>{p&&p()},onConfirm:()=>{c.current.formElement.current.requestSubmit()},confirmButtonProps:{children:e?"Save":"Validate"}})})]})]}),C&&r(ze,{open:!0,onConfirm:()=>{V(),_(!1)},onCancel:()=>{_(!1)},title:"Update Annotations",content:u(D,{children:[r("div",{children:"The following errors exist with the annotations you entered:"}),r("div",{children:r("ul",{children:(g??[]).map((F,P)=>u("li",{children:[r("b",{children:`${Be(F)}: `})," ",`${F.message}`]},P))})}),r("div",{children:"Are you sure you want to save the invalid annotations?"})]}),confirmButtonProps:{children:"Save"}})]})})}try{ye.displayName="SchemaDrivenAnnotationEditor",ye.__docgenInfo={description:`Renders a form for editing an entity's annotations. The component also supports supplying just a schema ID,
but work to support annotation flows without an entity (i.e. before creating entities) is not yet complete.`,displayName:"SchemaDrivenAnnotationEditor",props:{entityId:{defaultValue:null,description:"The entity whose annotations should be edited with the form",name:"entityId",required:!1,type:{name:"string"}},schemaId:{defaultValue:null,description:"If no entity ID is supplied, the schema to use for the form",name:"schemaId",required:!1,type:{name:"string"}},validationSchema:{defaultValue:null,description:"May be used to directly provide a JSON Schema to use for the form",name:"validationSchema",required:!1,type:{name:"JSONSchema7"}},formRef:{defaultValue:null,description:"Optionally supply a ref to the form to handle submission externally with `formRef.current.submit()`.",name:"formRef",required:!1,type:{name:"RefObject<Form<any, RJSFSchema, any>>"}},liveValidate:{defaultValue:null,description:"Provide live input validation. This can cause performance degradation. By default, liveValidate will be true if an entity with a schema and existing annotations is being edited",name:"liveValidate",required:!1,type:{name:"boolean"}},onSuccess:{defaultValue:null,description:"Invoked after a successful form submission",name:"onSuccess",required:!1,type:{name:"(() => void)"}},onCancel:{defaultValue:null,description:"If defined and formRef is not supplied, shows a 'Cancel' button and runs this effect on click",name:"onCancel",required:!1,type:{name:"(() => void)"}},onChange:{defaultValue:null,description:"Passes new form data upon each change to the form",name:"onChange",required:!1,type:{name:"((annotations: Record<string, unknown>) => void)"}},hideActions:{defaultValue:null,description:"If true, the editor will not render its own submit UI.",name:"hideActions",required:!1,type:{name:"boolean"}}}}}catch{}export{R as A,ye as S,rr as a,St as u};
