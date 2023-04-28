import{a as R,j as g}from"./jsx-runtime-ad672792.js";import{r as i,R as S}from"./index-f1f749bf.js";import{P as k,o as T,a as b,b as v,s as x,g as A,i as D,c as I,d as _,e as N,S as Q,f as U,h as F}from"./SynapseContext-d313cbec.js";import{S as L}from"./ToastMessage-524a41fb.js";import{d as M}from"./dayjs.min-e0adaab4.js";import{P as j,B as h,S as q}from"./getEndpoint-ac94413e.js";import{d as B,a as G,F as W,p as H,s as K,m as V,b as $,c as z,n as J,e as X,f as Y,g as Z,h as ee,i as te,j as oe}from"./FullContextProvider-96fb6297.js";import{c as ae}from"./styled-25e9c81a.js";import{M as ne}from"./react-router-f6adb20f.js";import{Q as re}from"./queryClient-4f521e77.js";function se(e={}){const{onSignInComplete:o,registerAccountUrl:a=`${j.PORTAL}#!RegisterAccount:0`,onError:t,onTwoFactorAuthRequired:p}=e,P=A(),c=new URL(window.location.href),{searchParams:n}=c,l=n==null?void 0:n.get("code"),r=n==null?void 0:n.get("provider"),E=n==null?void 0:n.get("state"),[O,f]=i.useState(!!(l&&r));return i.useEffect(()=>{if(l&&r){const y=`${P}?provider=${r}`;if(k.GOOGLE==r){const m=s=>{"accessToken"in s?x(s.accessToken).then(o):p&&p(s)},u=s=>{s.status===404&&window.location.replace(a),console.error("Error with Google account association: ",s),t&&t(s.reason)};E?T(E,r,l,y,h.REPO_ENDPOINT).then(m).catch(u).finally(()=>f(!1)):b(r,l,y,h.REPO_ENDPOINT).then(m).catch(u).finally(()=>f(!1))}else if(k.ORCID==r){const m=u=>{console.error("Error binding ORCiD to account: ",u),t&&t(u.reason)};v(r,l,y,h.REPO_ENDPOINT).then(o).catch(m).finally(()=>f(!1))}else console.warn("Unknown SSO Provider: ",r),f(!1)}},[]),{isLoading:O}}var C={},ie={get exports(){return C},set exports(e){C=e}};ie.exports={ReactQueryDevtools:function(){return null},ReactQueryDevtoolsPanel:function(){return null}};async function ce(){let e=await _(),o;try{o=await N(e)}catch(t){throw t instanceof Q&&t.status===401&&(console.error("Encountered error fetching profile: ",t,"Signing out..."),await U(),e=void 0),t}let a;return e&&F(e).then(t=>{a=M(t.authenticatedOn).format("L LT")}),{accessToken:e,profile:o,authenticatedOn:a}}const d=new re(B);function le(e){const o=q[e];window.SRC={OVERRIDE_ENDPOINT_CONFIG:o},d.resetQueries()}const ue={default:H,sageBionetworks:K,mtb:V,arkPortal:$,adKnowledgePortal:z,nfPortal:J,bsmnPortal:X,psychEncodePortal:Y,stopAdPortal:Z,digitalHealthPortal:ee,crcResearcherPortal:te,cancerComplexityPortal:oe};function w(e){const{storybookContext:o}=e;i.useEffect(()=>{le(o.globals.stack)},[o.globals.stack]);const[a,t]=S.useState(void 0);se(),i.useEffect(()=>{ce().then(c=>{t(c.accessToken)})}),i.useEffect(()=>{async function c(){await d.cancelQueries(),d.removeQueries(),await d.invalidateQueries()}c()},[a]);const p=i.useMemo(()=>({accessToken:a,isInExperimentalMode:D(),utcTime:I(),withErrorBoundary:!0,downloadCartPageUrl:"/?path=/story/download-downloadcartpage--demo"}),[a]),P=ae(G,{palette:ue[o.globals.palette]});return R(W,{queryClient:d,synapseContext:p,theme:P,children:[o.globals.showReactQueryDevtools&&g(C.ReactQueryDevtools,{}),R(ne,{children:[g(L,{}),g("main",{children:e.children})]})]},a)}try{w.displayName="StorybookComponentWrapper",w.__docgenInfo={description:"Wraps storybook story components to ensure that all components receive required context.",displayName:"StorybookComponentWrapper",props:{storybookContext:{defaultValue:null,description:"",name:"storybookContext",required:!0,type:{name:"any"}}}}}catch{}export{w as S,ce as s};
//# sourceMappingURL=StorybookComponentWrapper-cdd85372.js.map
