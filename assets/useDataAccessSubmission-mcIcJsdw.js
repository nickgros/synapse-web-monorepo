import{h as r,l as m,n as i,o as y}from"./ApplicationSessionManager-CECkmrBg.js";import{u as o}from"./useMutation-ItNe8E2S.js";import{u as S}from"./useInfiniteQuery-V6qu7IEP.js";import"./OrientationBanner-CPsBxF8o.js";import"./getEndpoint-CjoHA800.js";import"./index-Dl6G-zuu.js";import"./jsx-runtime-Du8NFWEI.js";function k(e,a){const{accessToken:c,keyFactory:t}=r();return m({...a,queryKey:t.getDataAccessSubmissionQueryKey(String(e.toString())),queryFn:()=>i.getSubmissionById(e,c)})}function D(e,a){const{accessToken:c,keyFactory:t}=r();return S({...a,queryKey:t.searchDataAccessSubmissionQueryKey(e),queryFn:async s=>await i.searchAccessSubmission({...e,nextPageToken:s.pageParam},c),initialPageParam:void 0,getNextPageParam:s=>s.nextPageToken})}function d(e){const a=y(),{accessToken:c,keyFactory:t}=r();return o({...e,mutationFn:s=>i.updateSubmissionStatus(s,c),onSuccess:async(s,u,n)=>{await a.invalidateQueries({queryKey:t.searchDataAccessSubmissionQueryKey()}),a.setQueryData(t.getDataAccessSubmissionQueryKey(u.submissionId),s),e!=null&&e.onSuccess&&await e.onSuccess(s,u,n)}})}function q(e){const a=y(),{accessToken:c,keyFactory:t}=r();return o({...e,mutationFn:async({request:s,accessRequirementId:u})=>{if(s.subjectId==null||s.subjectType==null){const{subjects:n}=await i.getSubjects(c,u);s.subjectId=n[0].id,s.subjectType=n[0].type}return i.submitDataAccessRequest(s,c)},onSuccess:async(s,u,n)=>{await a.invalidateQueries({queryKey:t.getAccessRequirementStatusQueryKey(u.accessRequirementId)}),await a.invalidateQueries({queryKey:t.searchDataAccessSubmissionQueryKey()}),e!=null&&e.onSuccess&&await e.onSuccess(s,u,n)}})}export{k as a,D as b,q as c,d as u};
