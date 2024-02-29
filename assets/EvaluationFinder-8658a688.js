import{j as n,a as d,F as S}from"./jsx-runtime-9dc53467.js";import{r as T}from"./index-76fb7be0.js";import{h as y,l as x,n as E,m as N}from"./ApplicationSessionManager-9bd355c2.js";import{u as A}from"./useInfiniteQuery-79b77040.js";import"./OrientationBanner-a1ca5cdb.js";import"./getEndpoint-ac94413e.js";import{g as C}from"./InfiniteQueryUtils-54ae7e6b.js";import{H as M}from"./HelpPopover-f7b3f4de.js";import{C as _}from"./Checkbox-ed5f8a28.js";import{L as F}from"./LinearProgress-c51caf50.js";import{M as D}from"./Alert-c3fe2b05.js";import{F as O}from"./InputLabel-fd013c0b.js";import{F as B}from"./FormGroup-b0ead89c.js";import{T as R}from"./Typography-1d068b0b.js";import{B as b}from"./Box-8faf86fd.js";import{B as p}from"./Button-33299b2c.js";function ee(r,o){const{accessToken:u,keyFactory:t}=y();return N({...o,queryKey:t.getEvaluationByIdQueryKey(r),queryFn:()=>E.getEvaluation(r,u)})}function k(r={},o){const{accessToken:t,keyFactory:i}=y(),s=x();return A({...o,queryKey:i.getEvaluationsQueryKey(r),queryFn:async l=>{const a=await E.getEvaluations({...r,limit:20,offset:l.pageParam},t);return a.results.forEach(c=>{s.setQueryData(i.getEvaluationByIdQueryKey(c.id),c)}),a},initialPageParam:void 0,getNextPageParam:C})}function g(r){var m;const{accessType:o,activeOnly:u,selectedIds:t=[],onChange:i}=r,[s,l]=T.useState(0),{data:a,isLoading:c,hasNextPage:f,fetchNextPage:I,isFetchingNextPage:h}=k({accessType:o,activeOnly:u},{placeholderData:e=>e,throwOnError:!0});if(c)return n(F,{});if(!(a!=null&&a.pages))return n(D,{severity:"error",children:"An unexpected error occurred and evaluations could not be loaded"});const P=a.pages.length-1>s||f&&!h;return d(S,{children:[n(O,{children:n(B,{sx:{gap:1},children:(m=a.pages[s])==null?void 0:m.results.map(e=>n(_,{label:d(R,{variant:"smallText1",component:"span",children:[e.name," ",e.submissionInstructionsMessage&&e.submissionInstructionsMessage.length>0&&n(M,{markdownText:e.submissionInstructionsMessage,placement:"right"})]}),"aria-label":e.name,checked:t.includes(e.id),onChange:()=>{t.includes(e.id)?i(t.filter(v=>v!==e.id)):i([...t,e.id])}},e.id))})}),d(b,{display:"flex",my:2,gap:1,children:[s>0&&n(p,{variant:"outlined",onClick:()=>l(e=>e-1),children:"Previous Page"}),n(p,{variant:"outlined",disabled:!P,onClick:()=>{a.pages[s+1]?l(e=>e+1):I().then(()=>l(e=>e+1)).catch(()=>{console.error("Error fetching next page of evaluations")})},children:"Next Page"})]})]})}try{g.displayName="EvaluationFinder",g.__docgenInfo={description:"",displayName:"EvaluationFinder",props:{accessType:{defaultValue:null,description:"",name:"accessType",required:!1,type:{name:"enum",value:[{value:'"CREATE"'},{value:'"READ"'},{value:'"UPDATE"'},{value:'"DELETE"'},{value:'"CHANGE_PERMISSIONS"'},{value:'"DOWNLOAD"'},{value:'"UPLOAD"'},{value:'"PARTICIPATE"'},{value:'"SUBMIT"'},{value:'"READ_PRIVATE_SUBMISSION"'},{value:'"UPDATE_SUBMISSION"'},{value:'"DELETE_SUBMISSION"'},{value:'"TEAM_MEMBERSHIP_UPDATE"'},{value:'"SEND_MESSAGE"'},{value:'"CHANGE_SETTINGS"'},{value:'"MODERATE"'},{value:'"REVIEW_SUBMISSIONS"'}]}},activeOnly:{defaultValue:null,description:"",name:"activeOnly",required:!1,type:{name:"boolean"}},selectedIds:{defaultValue:null,description:"",name:"selectedIds",required:!0,type:{name:"string[]"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(newSelectedIds: string[]) => void"}}}}}catch{}export{g as E,ee as u};
