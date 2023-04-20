import{a as d,F as g,j as t}from"./jsx-runtime-ad672792.js";import{r as y}from"./index-f1f749bf.js";import{ah as U,dB as k,aT as F,dC as $,dD as H,ay as C,au as V,ax as A}from"./SynapseContext-d9d41f69.js";import{I as G}from"./IconSvg-44530777.js";import{u as w}from"./react-intersection-observer.esm-8bf16175.js";import{P as x}from"./getEndpoint-5374ab4d.js";import{u as R}from"./useInfiniteQuery-507f7088.js";import{S as v}from"./SkeletonTable-cc6b19d2.js";import{T as S}from"./Typography-f5dd8748.js";import{S as D}from"./Skeleton-cff63b1c.js";import"./_commonjsHelpers-042e6b4d.js";import"./inheritsLoose-d541526f.js";import"./setPrototypeOf-0bb37fbe.js";import"./isArray-5e3f9107.js";import"./index-96c5f47c.js";import"./extends-98964cd2.js";import"./SynapseConstants-9d1f6e44.js";import"./SvgIcon-93d86b25.js";import"./objectWithoutPropertiesLoose-4f48578a.js";import"./styled-8837a0b3.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-3d5299f2.js";import"./Box-2e3c1244.js";import"./extendSxProp-a6801df0.js";import"./Button-e0234af7.js";import"./ButtonBase-26873d31.js";import"./emotion-react.browser.esm-a8a50fc7.js";import"./assertThisInitialized-081f9914.js";import"./TransitionGroupContext-a2b6e27b.js";import"./useForkRef-dd8a6e5c.js";import"./Button-7d415009.js";import"./Clear-a9f76abf.js";import"./useTheme-c4678cf9.js";import"./isHostComponent-fa76b8d9.js";import"./Alert-84d62a08.js";import"./hook-c05d8d9f.js";import"./createWithBsPrefix-e09f51dd.js";import"./divWithClassName-1aeead00.js";import"./index-4d501b15.js";import"./infiniteQueryBehavior-382366f9.js";import"./times-edcdb997.js";import"./_baseTimes-8cccc40f.js";import"./toInteger-405ccf0a.js";import"./isSymbol-7c514724.js";function q(r,n){const{accessToken:c,keyFactory:a}=U();return R(a.getUserChallengesQueryKey(r),async s=>{const e=await k(c,r,s.pageParam,10);if(e.results.length>0){const i=Array.from(e.results,l=>l.projectId),f=await F(i);return{results:Array.from(e.results,(l,p)=>({challenge:l,projectHeader:f.results[p]})),totalNumberOfResults:e.totalNumberOfResults}}return{results:[],totalNumberOfResults:e.totalNumberOfResults}},{...n,getNextPageParam:(s,e)=>{if(s.results.length>0)return e.length*10}})}function M(r,n,c){const{accessToken:a,keyFactory:s}=U();return R(s.getUserProjectsQueryKey(r,n),async e=>$(r,{...n,nextPageToken:e.pageParam},a),{...c,getNextPageParam:e=>e.nextPageToken})}function Q(r,n){const{accessToken:c,keyFactory:a}=U();return R(a.getUserTeamsQueryKey(r),async s=>H(c,r,s.pageParam,10),{...n,getNextPageParam:(s,e)=>{if(s.results.length>0)return e.length*10}})}function N({userId:r}){const n=C(),{ref:c,inView:a}=w(),{data:s,status:e,isFetching:i,isLoading:f,hasNextPage:h,fetchNextPage:l,isError:p,error:m}=q(r);y.useEffect(()=>{p&&m&&n(m)},[p,m,n]),y.useEffect(()=>{e==="success"&&!i&&h&&l&&a&&l()},[e,i,h,l,a]);const u=(s==null?void 0:s.pages.flatMap(o=>o.results))??[];return d(g,{children:[u.length>0&&d(g,{children:[u.map(o=>o&&o.challenge&&o.projectHeader?t("p",{children:t("a",{target:"_self",rel:"noopener noreferrer",href:`${x.PORTAL}#!Synapse:${o.challenge.projectId}/challenge`,children:o.projectHeader.name})},`user-challenge-list-item-${o.challenge.projectId}`):!1),t("div",{ref:c})]}),!i&&u.length==0&&t("div",{children:"Empty"}),f&&t(v,{numRows:5,numCols:1})]})}try{N.displayName="UserChallenges",N.__docgenInfo={description:"",displayName:"UserChallenges",props:{userId:{defaultValue:null,description:"",name:"userId",required:!0,type:{name:"string"}}}}}catch{}function E({userId:r}){const n=C(),{ref:c,inView:a}=w(),s={},{data:e,status:i,isFetching:f,isLoading:h,hasNextPage:l,fetchNextPage:p,isError:m,error:u}=M(r,s);y.useEffect(()=>{m&&u&&n(u)},[m,u,n]),y.useEffect(()=>{i==="success"&&!f&&l&&p&&a&&p()},[i,f,l,p,a]);const o=(e==null?void 0:e.pages.flatMap(P=>P.results))??[];return d(g,{children:[o.length>0&&d(g,{children:[o.map(P=>P?t("p",{children:t("a",{target:"_self",rel:"noopener noreferrer",href:`${x.PORTAL}#!Synapse:${P.id}`,children:P.name})},`user-project-list-item-${P.id}`):!1),t("div",{ref:c})]}),!f&&o.length==0&&t("div",{children:"Empty"}),h&&t(v,{numRows:5,numCols:1})]})}try{E.displayName="UserProjects",E.__docgenInfo={description:"",displayName:"UserProjects",props:{userId:{defaultValue:null,description:"",name:"userId",required:!0,type:{name:"string"}}}}}catch{}function j({userId:r}){const n=C(),{ref:c,inView:a}=w(),{data:s,status:e,isFetching:i,isLoading:f,hasNextPage:h,fetchNextPage:l,isError:p,error:m}=Q(r);y.useEffect(()=>{p&&m&&n(m)},[p,m,n]),y.useEffect(()=>{e==="success"&&!i&&h&&l&&a&&l()},[e,i,h,l,a]);const u=(s==null?void 0:s.pages.flatMap(o=>o.results))??[];return d(g,{children:[u.length>0&&d(g,{children:[u.map(o=>o?t("p",{children:t("a",{target:"_self",rel:"noopener noreferrer",href:`${x.PORTAL}#!Team:${o.id}`,children:o.name})},`user-team-list-item-${o.id}`):!1),t("div",{ref:c})]}),!i&&u.length==0&&t("div",{children:"Empty"}),f&&t(v,{numRows:5,numCols:1})]})}try{j.displayName="UserTeams",j.__docgenInfo={description:"",displayName:"UserTeams",props:{userId:{defaultValue:null,description:"",name:"userId",required:!0,type:{name:"string"}}}}}catch{}var _=(r=>(r.PROJECTS="Projects",r.TEAMS="Teams",r.CHALLENGES="Challenges",r))(_||{});function I({userId:r}){const[n,c]=y.useState("Projects"),{data:a}=V(r);function s(e){switch(e){case"Projects":return"dashboard";case"Teams":return"peopleTwoTone";case"Challenges":return"challengesTwoTone"}}return d("div",{className:"UserProfileLinks",children:[d(S,{variant:"headline2",className:"title",children:[a&&d(g,{children:[a==null?void 0:a.userName,"'s Items"]}),!a&&t(D,{width:"75%"})]}),t("div",{className:"Tabs",children:Object.keys(_).map(e=>t("div",{className:"Tab",role:"tab",onClick:i=>{i.stopPropagation(),c(_[e])},"aria-selected":_[e]===n,children:d(S,{variant:"buttonLink",children:[t(G,{icon:s(_[e])})," ",_[e]]})},e))}),t("div",{className:"TabContent",children:d(A,{children:[n==="Projects"&&t(g,{children:t(E,{userId:r})}),n==="Teams"&&t(g,{children:t(j,{userId:r})}),n==="Challenges"&&t(g,{children:t(N,{userId:r})})]})})]})}try{I.displayName="UserProfileLinks",I.__docgenInfo={description:"",displayName:"UserProfileLinks",props:{userId:{defaultValue:null,description:"",name:"userId",required:!0,type:{name:"string"}}}}}catch{}const ke={title:"Synapse/UserProfileLinks",component:I},T={args:{userId:"1131050"}};var O,L,b;T.parameters={...T.parameters,docs:{...(O=T.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    userId: '1131050'
  }
}`,...(b=(L=T.parameters)==null?void 0:L.docs)==null?void 0:b.source}}};const Fe=["Demo"];export{T as Demo,Fe as __namedExportsOrder,ke as default};
//# sourceMappingURL=UserProfileLinks.stories-2a840fb6.js.map
