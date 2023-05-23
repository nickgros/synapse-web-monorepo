import{u as n,am as m,S as i,an as y}from"./SynapseClient-c43c6534.js";import{u as S}from"./useMutation-424ee4ed.js";import{u as o}from"./useInfiniteQuery-f8eb063d.js";function f(e,a){const{accessToken:t,keyFactory:c}=n();return m(c.getDataAccessSubmissionQueryKey(String(e.toString())),()=>i.getSubmissionById(e,t),a)}function g(e,a){const{accessToken:t,keyFactory:c}=n();return o(c.searchDataAccessSubmissionQueryKey(e),async s=>await i.searchAccessSubmission({...e,nextPageToken:s.pageParam},t),{...a,getNextPageParam:s=>s.nextPageToken})}function k(e){const a=y(),{accessToken:t,keyFactory:c}=n();return S(s=>i.updateSubmissionStatus(s,t),{...e,onSuccess:async(s,u,r)=>{await a.invalidateQueries(c.searchDataAccessSubmissionQueryKey()),a.setQueryData(c.getDataAccessSubmissionQueryKey(u.submissionId),s),e!=null&&e.onSuccess&&await e.onSuccess(s,u,r)}})}function D(e){const a=y(),{accessToken:t,keyFactory:c}=n();return S(({request:s})=>i.submitDataAccessRequest(s,t),{...e,onSuccess:async(s,u,r)=>{await a.invalidateQueries(c.getAccessRequirementStatusQueryKey(u.accessRequirementId)),await a.invalidateQueries(c.searchDataAccessSubmissionQueryKey()),e!=null&&e.onSuccess&&await e.onSuccess(s,u,r)}})}export{k as a,g as b,f as c,D as u};
//# sourceMappingURL=useDataAccessSubmission-7363cf70.js.map
