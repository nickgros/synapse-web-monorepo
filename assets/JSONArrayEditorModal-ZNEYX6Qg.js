var _=Object.defineProperty;var N=(r,e,a)=>e in r?_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[e]=a;var S=(r,e,a)=>N(r,typeof e!="symbol"?e+"":e,a);import{j as o}from"./jsx-runtime-Du8NFWEI.js";import{r as n}from"./index-Dl6G-zuu.js";import{z as D,C as b}from"./ConfirmationDialog-BAUO-dge.js";import{M as w,v as F}from"./MuiForm-b4yMWBah.js";import"./styled-BwKg_4wT.js";import{g as I,A as P,a as O,b as J,c as q,B as M,E as R,T as B,D as k,d as W}from"./ErrorListTemplate-BUSdoY2y.js";import{p as L}from"./papaparse.min-D3VSFJh2.js";import{i as U}from"./_baseTimes-36S_kd0L.js";import{B as T}from"./Box-CaFleW7-.js";import{B as f}from"./Button-DtfaTZY_.js";import{C as H}from"./cloneDeep-D5EWMeSp.js";import{T as $}from"./TextField-CrNNFkUB.js";import{A as z}from"./Alert-CduaGk2B.js";import{A as G}from"./AlertTitle-G3es5_Tb.js";import{T as Y}from"./Typography-DrqHmlDD.js";const K={jsonSchemaDefinition:{type:"string"}};class C extends Error{constructor(a){super("Error parsing CSV");S(this,"parseErrors");this.parseErrors=a}}function Q(r=K){const{jsonSchemaDefinition:e}=r,a=n.useMemo(()=>U(e)&&e.type&&e.type==="string",[e]);return{parse:n.useCallback(l=>new Promise((i,u)=>{L.parse(l,{dynamicTyping:!a,complete:s=>{s.errors.length>0?u(new C(s.errors)):i(s.data.flat())}})}),[a])}}const E={type:"string"};function X(r=E){return{$schema:"http://json-schema.org/draft-07/schema#",type:"array",items:r}}function y(r){const{value:e=[],onChange:a,onSubmit:p,arrayItemDefinition:l=E,formRef:i}=r,[u,s]=n.useState(!1),[m,d]=n.useState(""),[c,h]=n.useState([]),A=n.useMemo(()=>X(l),[l]),{parse:g}=Q({jsonSchemaDefinition:l}),V=n.useCallback(async()=>{if(m)try{const t=await g(m);a([...e,...t]),h([]),d(""),s(!1)}catch(t){if(t instanceof C)h(t.parseErrors);else throw t}},[a,m,e,g]),v=n.useMemo(()=>I(),[]);return o.jsxs(T,{className:"JsonSchemaFormContainer",sx:{".JsonSchemaForm .LabelContainer":{display:"none",visibility:"hidden"}},children:[o.jsx(w,{ref:i,schema:A,className:"JsonSchemaForm",noHtml5Validate:!0,uiSchema:{"ui:submitButtonOptions":{norender:!0}},validator:F,formData:e,formContext:{allowRemovingLastItemInArray:!0},onChange:({formData:t})=>a(t),onSubmit:({formData:t})=>p(t),templates:{ArrayFieldDescriptionTemplate:P,ArrayFieldItemTemplate:O,ArrayFieldTemplate:J,ArrayFieldTitleTemplate:q,ButtonTemplates:M,ErrorListTemplate:R},transformErrors:v,widgets:{TextWidget:B,DateTimeWidget:k,SelectWidget:D,CheckboxWidget:W}}),o.jsx(f,{onClick:()=>s(!0),children:"Paste new values"}),o.jsxs(H,{sx:{mt:2},in:u,children:[o.jsx($,{multiline:!0,InputProps:{inputProps:{"aria-label":"CSV or TSV to Append"}},rows:5,placeholder:"Place comma or tab delimited values here",value:m,onChange:t=>d(t.target.value)}),o.jsxs(T,{my:1,display:"flex",justifyContent:"flex-end",children:[o.jsx(f,{onClick:()=>s(!1),children:"Cancel"}),o.jsx(f,{onClick:()=>{V()},children:"Add"})]}),c&&c.length>0&&o.jsxs(z,{severity:"error",sx:{my:2},children:[o.jsx(G,{children:"Parsing errors encountered:"}),o.jsx("ul",{children:c.map((t,j)=>o.jsxs(Y,{component:"li",lineHeight:1.5,variant:"smallText1",children:[t.row?`At ${t.row}: `:"",t.message]},j))})]})]})]})}try{y.displayName="JSONArrayEditor",y.__docgenInfo={description:"",displayName:"JSONArrayEditor",props:{value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"T[]"}},arrayItemDefinition:{defaultValue:null,description:"",name:"arrayItemDefinition",required:!1,type:{name:"JSONSchema7Definition"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(newValue: T[]) => void"}},onSubmit:{defaultValue:null,description:"",name:"onSubmit",required:!0,type:{name:"(formData: T[]) => void"}},formRef:{defaultValue:null,description:"",name:"formRef",required:!1,type:{name:"Ref<Form<T, RJSFSchema, GenericObjectType>>"}}}}}catch{}function x(r){const{isShowingModal:e,onConfirm:a,onCancel:p,dialogTitle:l="Edit Values",value:i,...u}=r,s=n.useRef(null),[m,d]=n.useState(i??[]);return n.useEffect(()=>{i&&d(i)},[i]),o.jsx(b,{open:e,title:l,onCancel:p,maxWidth:"md",content:o.jsx(y,{formRef:s,value:m,onChange:c=>d(c),onSubmit:a,...u}),onConfirm:()=>{s.current.formElement.current.requestSubmit()}})}try{x.displayName="JSONArrayEditorModal",x.__docgenInfo={description:"",displayName:"JSONArrayEditorModal",props:{value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"T[]"}},arrayItemDefinition:{defaultValue:null,description:"",name:"arrayItemDefinition",required:!1,type:{name:"JSONSchema7Definition"}},dialogTitle:{defaultValue:null,description:"",name:"dialogTitle",required:!1,type:{name:"ReactNode"}},isShowingModal:{defaultValue:null,description:"",name:"isShowingModal",required:!0,type:{name:"boolean"}},onConfirm:{defaultValue:null,description:"",name:"onConfirm",required:!0,type:{name:"(value: T[]) => void"}},onCancel:{defaultValue:null,description:"",name:"onCancel",required:!0,type:{name:"() => void"}}}}}catch{}export{x as J};
