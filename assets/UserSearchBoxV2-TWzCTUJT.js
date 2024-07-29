import{j as w}from"./jsx-runtime-Du8NFWEI.js";import{r as c,R as _}from"./index-Dl6G-zuu.js";import{u as V,S as v,d as U}from"./Select-49a62830.esm-BGZJwi7s.js";import{b as k}from"./createTheme-Dtzk88yv.js";import"./index-B6qzg4VC.js";import{j as x,bd as F,be as A,bf as H}from"./SynapseClient-Dbc8tFdW.js";import{Z as T}from"./index-CIIvWsNs.js";import"./OrientationBanner-x6ohh6pv.js";import"./EntityTypeUtils-BpOAC-k-.js";import"./getEndpoint-CjoHA800.js";import{a as L}from"./use-deep-compare-effect.esm-COSQ_O61.js";import{V as C,C as D,H as P,I as G}from"./SynapseConstants-Br5dMy50.js";import{u as Y,c as M}from"./uniq-BT8EkKBF.js";import{w as j}from"./without-0C72Hvsu.js";import{b as q}from"./UserBadge-BoNoW5Tk.js";import{U as b}from"./UserOrTeamBadge-B_Qa11zH.js";import{S as B}from"./Skeleton-BnDUWcOg.js";const K=(t,e,n)=>{c.useEffect(()=>{const o=setTimeout(()=>t(),n);return()=>clearTimeout(o)},[...e||[],n])},$={ownerId:"",firstName:"Unknown",lastName:"Unknown",userName:"Unknown",isIndividual:!1},J={name:"Unknown",id:"unknown",type:"org.sagebionetworks.repo.model.FileEntity",versionNumber:0,versionLabel:"placeholder",benefactorId:0,createdOn:"null",modifiedOn:"null",createdBy:"null",modifiedBy:"null",isLatestVersion:!0},Q={id:"unknown",etag:"Unknown",name:"Unknown",description:"Unknown",ownerId:"null",createdOn:"null",contentSource:"Unknown",submissionInstructionsMessage:"Unknown",submissionReceiptMessage:"Unknown"},z=async(t,e)=>{const n=await F(t,e),s=t.filter(a=>n.results.map(l=>l.id).indexOf(a.targetId)===-1).map(a=>({...J,id:a.targetId,name:`${a.targetId}`}));return[...n.results,...s]},Z=async t=>{const e=(await A(t)).children,o=t.filter(s=>e.map(a=>a.ownerId).indexOf(s)===-1).map(s=>({...$,ownerId:s,name:`Unknown User (${s})`}));return[...e,...o]},W=async(t,e)=>{const n=await H({evaluationIds:t},e),s=t.filter(a=>n.results.map(l=>l.id).indexOf(a)===-1).map(a=>({...Q,id:a,name:a}));return[...n.results,...s]};function X(t){const{ids:e,type:n}=t,{accessToken:o}=x(),[s,a]=c.useState([]),l=n==="USER_PROFILE"?"ownerId":"id",I=(u=>{switch(u){case"USER_PROFILE":return G;case"ENTITY_HEADER":return P;case"EVALUATION_QUEUE":return D;default:return""}})(n),g=s.map(u=>u[l]),y=e.filter(u=>u!==C),f=Y(j(y,...g));return c.useEffect(()=>{(p=>{if(!p.length)return;const d=sessionStorage.getItem(I);try{const S=d?JSON.parse(d):[],E=S.map(i=>i[l]);for(const i of p)E.includes(i[l])||S.push(i);sessionStorage.setItem(I,JSON.stringify(S))}catch{sessionStorage.setItem(I,JSON.stringify(p))}})(s)},[s,l,I]),L(()=>{let u=!1;return(async()=>{if(f.length>0)try{const d=Array.from(f),S=n==="ENTITY_HEADER"?d.map(m=>({targetId:m})):d,E=M(S,45),i=[];for(const m of E){let h=[];switch(n){case"USER_PROFILE":h=await Z(m);break;case"ENTITY_HEADER":h=await z(m,o);break;case"EVALUATION_QUEUE":h=await W(m,o);break}i.push(...h)}u||a(m=>m.concat(...i))}catch(d){console.error("Error on data retrieval",d)}})(),()=>{u=!0}},[o,n,f]),s}var ee=c.forwardRef(function(t,e){var n=V(t);return c.createElement(v,k({ref:e},n))}),te=ee;const ne={Control:t=>w.jsx(U.Control,{...t,className:`form-control ${t.className??""}`}),SingleValue:t=>{const{data:e}=t;return c.createElement(U.SingleValue,{...t,key:e==null?void 0:e.id},w.jsx(b,{userGroupHeader:e==null?void 0:e.header,disableHref:!0,showFullName:!0},e==null?void 0:e.header.ownerId))},Option:t=>{const{data:e}=t;return c.createElement(U.Option,{...t,key:e==null?void 0:e.id},w.jsx(b,{userGroupHeader:e==null?void 0:e.header,disableHref:!0,showFullName:!0,showCardOnHover:!1}))}},N=t=>{const{inputId:e,defaultValue:n=null,onChange:o,filterPredicate:s,typeFilter:a,placeholder:l,focusOnSelect:O=!1,value:I}=t,[g,y]=c.useState(""),[f,u]=c.useState("");K(()=>{u(g)},[g],500);const[p=void 0]=X({ids:n?[n]:[],type:"USER_PROFILE"}),d=!!f,{data:S,isLoading:E}=q(f,a,{enabled:d}),i=_.useRef(null);_.useEffect(()=>{O&&i.current&&i.current.focus()});const m=c.useMemo(()=>E||g!==f?()=>"Loading…":void 0,[E,f,g]),h=(S??[]).filter(s??(()=>!0)).map(r=>({id:r.ownerId.toString(),value:r.ownerId.toString(),label:r.userName,header:r})),R=c.useMemo(()=>l!==void 0?l:a==T.USERS_ONLY?"Name (first and last)":a==T.TEAMS_ONLY?"Team name":"Name (first and last) or team name",[l,a]);return n&&p==null?w.jsx(B,{width:"100%"}):w.jsx(te,{className:"bootstrap-4-backport UserSearchBoxV2",ref:i,inputValue:g,onInputChange:y,filterOption:()=>!0,isLoading:E,options:!E&&h||[],noOptionsMessage:m,openMenuOnClick:!1,placeholder:R,defaultValue:n?{id:n,value:n,label:p.userName,header:p}:void 0,inputId:e,isClearable:!0,value:I,styles:{control:r=>({...r,display:"flex !important"}),input:r=>({...r,input:{gridArea:"1 / 2 / 4 / 4 !important"}}),menu:r=>({...r,zIndex:2})},components:ne,onChange:r=>{o&&o((r==null?void 0:r.id)??null,(r==null?void 0:r.header)??null)}})};try{N.displayName="UserSearchBoxV2",N.__docgenInfo={description:"",displayName:"UserSearchBoxV2",props:{inputId:{defaultValue:null,description:"",name:"inputId",required:!1,type:{name:"string"}},defaultValue:{defaultValue:null,description:"",name:"defaultValue",required:!1,type:{name:"string"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((principalId: string | null, header: UserGroupHeader | null) => void)"}},typeFilter:{defaultValue:null,description:"",name:"typeFilter",required:!1,type:{name:"enum",value:[{value:'"USERS_ONLY"'},{value:'"TEAMS_ONLY"'},{value:'"ALL"'}]}},filterPredicate:{defaultValue:null,description:"",name:"filterPredicate",required:!1,type:{name:"((item: UserGroupHeader) => boolean)"}},placeholder:{defaultValue:null,description:"",name:"placeholder",required:!1,type:{name:"string"}},focusOnSelect:{defaultValue:null,description:"",name:"focusOnSelect",required:!1,type:{name:"boolean"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"PropsValue<UserSearchBoxValueType>"}}}}}catch{}export{te as S,N as U,X as a,K as u};
