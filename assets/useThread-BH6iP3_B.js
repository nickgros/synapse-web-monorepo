import{r as l}from"./index-Dl6G-zuu.js";import{j as c,o,p as y,n as i}from"./SynapseClient-Dbc8tFdW.js";import{u as d}from"./useMutation-CmUrLdpa.js";import"./OrientationBanner-x6ohh6pv.js";import"./EntityTypeUtils-BpOAC-k-.js";import"./getEndpoint-CjoHA800.js";import"./jsx-runtime-Du8NFWEI.js";function v(e){const{data:r,isLoading:n}=m(e),{data:a,isLoading:s}=g(r,{enabled:!!r}),{mutate:u}=K(),{mutate:t}=f(),T=l.useCallback(()=>{r&&(r!=null&&r.isPinned?t(r):u(r))},[t,u,r]);return{threadData:r,threadBody:a,togglePin:T,isLoading:s||n}}function m(e,r){const{accessToken:n,keyFactory:a}=c();return o({...r,queryKey:a.getThreadQueryKey(e),queryFn:()=>y.getThread(e,n)})}function g(e,r){const{accessToken:n,keyFactory:a}=c(),s=async()=>{const u=await y.getThreadMessageUrl(e==null?void 0:e.messageKey,n);return(await fetch(u.messageUrl,{method:"GET",headers:{Accept:"*/*","Access-Control-Request-Headers":"authorization","Content-Type":"text/plain; charset=utf-8"}})).text()};return o({...r,queryKey:a.getThreadBodyQueryKey(e==null?void 0:e.id,e==null?void 0:e.messageKey),queryFn:s})}function A(e){const r=i(),{accessToken:n,keyFactory:a}=c();return d({...e,mutationFn:s=>y.putThreadTitle(n,s),onSuccess:async(s,u,t)=>{await r.invalidateQueries({queryKey:a.getAllForumThreadsQueryKey(s.forumId)}),await r.invalidateQueries({queryKey:a.getThreadQueryKey(u.threadId)}),e!=null&&e.onSuccess&&await e.onSuccess(s,u,t)}})}function x(e){const r=i(),{accessToken:n,keyFactory:a}=c();return d({...e,mutationFn:s=>y.putThreadMessage(n,s),onSuccess:async(s,u,t)=>{await r.invalidateQueries({queryKey:a.getThreadQueryKey(u.threadId)}),e!=null&&e.onSuccess&&await e.onSuccess(s,u,t)}})}function I(e){const r=i(),{accessToken:n,keyFactory:a}=c();return d({...e,mutationFn:s=>y.postThread(n,s),onSuccess:async(s,u,t)=>{await r.invalidateQueries({queryKey:a.getAllForumThreadsQueryKey(s.forumId)}),e!=null&&e.onSuccess&&await e.onSuccess(s,u,t)}})}function L(e){const r=i(),{accessToken:n,keyFactory:a}=c();return d({...e,mutationFn:s=>y.deleteThread(n,s.id),onSuccess:async(s,u,t)=>{await r.invalidateQueries({queryKey:a.getAllForumThreadsQueryKey(u.forumId)}),await r.invalidateQueries({queryKey:a.getThreadQueryKey(u.id)}),e!=null&&e.onSuccess&&await e.onSuccess(s,u,t)}})}function P(e){const r=i(),{accessToken:n,keyFactory:a}=c();return d({...e,mutationFn:s=>y.restoreThread(n,s.id),onSuccess:async(s,u,t)=>{await r.invalidateQueries({queryKey:a.getAllForumThreadsQueryKey(u.forumId)}),await r.invalidateQueries({queryKey:a.getThreadQueryKey(u.id)}),e!=null&&e.onSuccess&&await e.onSuccess(s,u,t)}})}function K(e){const r=i(),{accessToken:n,keyFactory:a}=c();return d({...e,mutationFn:s=>y.pinThread(n,s.id),onSuccess:async(s,u,t)=>{await r.invalidateQueries({queryKey:a.getAllForumThreadsQueryKey(u.forumId)}),await r.invalidateQueries({queryKey:a.getThreadQueryKey(u.id)})}})}function f(e){const r=i(),{accessToken:n,keyFactory:a}=c();return d({...e,mutationFn:s=>y.unPinThread(n,s.id),onSuccess:async(s,u,t)=>{await r.invalidateQueries({queryKey:a.getAllForumThreadsQueryKey(u.forumId)}),await r.invalidateQueries({queryKey:a.getThreadQueryKey(u.id)})}})}export{L as a,P as b,A as c,x as d,I as e,v as u};
