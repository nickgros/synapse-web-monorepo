import{r as S}from"./index-Dl6G-zuu.js";import{u as h}from"./useQueries-Bku0WfEc.js";import{b0 as M,j as i,o as f,p as y,n as g}from"./SynapseClient-Dbc8tFdW.js";import{u as E}from"./useMutation-CmUrLdpa.js";import{u as P}from"./useInfiniteQuery-B9dT23yY.js";import"./OrientationBanner-x6ohh6pv.js";import{o as K}from"./EntityTypeUtils-BpOAC-k-.js";import"./getEndpoint-CjoHA800.js";import{i as Q}from"./isEqualWith-ClXv5bFA.js";import{a as k}from"./isArray-ggc3KxVp.js";import{i as q}from"./_Map-CWVOAJuy.js";import{i as T,o as C,p as I,a as p}from"./pick-CMdlJRj-.js";import"./jsx-runtime-Du8NFWEI.js";import{i as F}from"./QueryFilterUtils-CpPv6dGS.js";import{g as A}from"./InfiniteQueryUtils-CKlRW-xB.js";const w=(e,t)=>{if(!(k(e)||k(t))&&!(!q(e)||!q(t))&&!(!T(e,void 0)&&!T(t,void 0)))return Q(C(e,o=>o===void 0),C(t,o=>o===void 0),w)};function v(e,t){return Q(e,t,w)}function G(e,t){const o=new Set;for(const s of e)o.add(s.id);for(const s of t)if(s.id!=null&&!o.has(s.id))throw new Error(`Proposed schema contains a new column model with ID ${s.id} that is not in the old schema.`)}async function J(e,t,o,s){G(o,s);const n=new Map;for(const l of o)n.set(l.id,l);let a=[];for(const l of s){const u={...l};if(u.id!=null){const m=n.get(u.id);m!=null&&!v(m,u)&&delete u.id}a.push(u)}const c=(await M(e,a)).list,r=[],d=new Set;for(let l=0;l<s.length;l++){const u=s[l].id??null,m=c[l].id;u!=null&&d.add(u),d.add(m),u!=null&&u!==m?r.push({oldColumnId:u,newColumnId:m}):u==null&&r.push({oldColumnId:null,newColumnId:m})}for(const l of o){const u=l.id;d.has(u)||r.push({oldColumnId:u,newColumnId:null})}return{concreteType:"org.sagebionetworks.repo.model.table.TableUpdateTransactionRequest",entityId:t,changes:[{concreteType:"org.sagebionetworks.repo.model.table.TableSchemaChangeRequest",entityId:t,changes:r,orderedColumnIds:c.map(l=>l.id)}]}}function H(e,t,o){const{accessToken:s,keyFactory:n}=i();return f({...o,queryKey:n.getEntityVersionQueryKey(e,t),queryFn:()=>y.getEntity(s,e,t==null?void 0:t.toString())})}function N(e,t){const{accessToken:o,keyFactory:s}=i(),n=S.useMemo(()=>({queries:e.map(a=>({queryKey:s.getEntityVersionQueryKey(a.id,a.versionNumber),queryFn:()=>y.getEntity(o,a.id,a.versionNumber),options:t}))}),[o,e,s,t]);return h(n)}function ee(e){const t=g(),{accessToken:o,keyFactory:s}=i();return E({mutationFn:n=>y.createEntity(n,o),onSuccess:async(n,a,c)=>{const r=s.getEntityQueryKey(n.id);t.setQueryData(r,n),await F(t,s,n.id,r),e!=null&&e.onSuccess&&await e.onSuccess(n,a,c)}})}function te(e){const t=g(),{accessToken:o,keyFactory:s}=i();return E({...e,mutationFn:n=>y.updateEntity(n,o),onSuccess:async(n,a,c)=>{const r=s.getEntityQueryKey(n.id);t.setQueryData(r,n),await F(t,s,n.id,r),e!=null&&e.onSuccess&&await e.onSuccess(n,a,c)}})}function ne(e){const t=g(),{accessToken:o,keyFactory:s}=i();return E({...e,mutationFn:n=>y.deleteEntity(o,n),onSuccess:async(n,a,c)=>{await F(t,s,a),e!=null&&e.onSuccess&&await e.onSuccess(n,a,c)}})}function se(e,t){const{accessToken:s,keyFactory:n}=i();return P({...t,queryKey:n.getEntityVersionsQueryKey(e),queryFn:async a=>await y.getEntityVersions(e,s,a.pageParam,200),initialPageParam:void 0,getNextPageParam:A})}function D(e){return I(e,K[e.concreteType])}function U(e){return p(e,K[e.concreteType])}function oe(e,t,o,s){const{accessToken:n,keyFactory:a}=i();return f({...s,queryKey:a.getEntityJsonQueryKey(e,t,o),queryFn:()=>y.getEntityJson(e,t,o,n),select:c=>{const r=D(c),d=U(c);return{entity:c,entityMetadata:r,annotations:d}}})}function ae(e){const t=g(),{accessToken:o,keyFactory:s}=i();return E({...e,mutationFn:n=>{const a=n.id;return y.updateEntityJson(a,n,o)},onSuccess:async(n,a,c)=>{const r=n.id,d=s.getEntityJsonQueryKey(r,void 0,!1);t.setQueryData(d,n),await F(t,s,r,d),e!=null&&e.onSuccess&&await e.onSuccess(n,a,c)}})}function re(e,t){const{accessToken:o,keyFactory:s}=i();return f({...t,queryKey:s.getEntityPathQueryKey(e),queryFn:()=>y.getEntityPath(e,o)})}function ce(e,t){const{accessToken:o,keyFactory:s}=i();return f({...t,queryKey:s.getEntityPathQueryKey(e),queryFn:()=>y.getEntityACL(e,o)})}function ue(e,t){const{accessToken:o,keyFactory:s}=i();return f({...t,queryKey:s.getEntityAliasQueryKey(e),queryFn:()=>y.getEntityAlias(e,o)})}function ie(e,t,o){const{accessToken:s,keyFactory:n}=i();return f({...o,queryKey:n.getEntityEvaluationsQueryKey(e),queryFn:()=>y.getAllEntityEvaluations(e,t,s)})}function ye(e,t){const{accessToken:o,keyFactory:s}=i();return f({...t,queryKey:s.getEntityPermissionsQueryKey(e),queryFn:()=>y.getEntityPermissions(e,o)})}function le(e){const t=g(),{accessToken:o,keyFactory:s}=i();return E({...e,mutationFn:n=>y.updateEntityACL(n,o),onSuccess:async(n,a,c)=>{const r=s.getEntityACLQueryKey(n.id);t.setQueryData(r,n),await F(t,s,n.id,r)}})}function de(e){const t=g(),{accessToken:o,keyFactory:s}=i();return E({...e,mutationFn:async n=>{const a=await J(o,n.entityId,n.originalColumnModels,n.newColumnModels);return y.updateTable(a,o)},onSuccess:async(n,a,c)=>{await F(t,s,a.entityId),e!=null&&e.onSuccess&&await e.onSuccess(n,a,c)}})}export{te as a,de as b,re as c,oe as d,N as e,ie as f,le as g,ue as h,ce as i,ye as j,ee as k,ae as l,ne as m,se as n,H as u};
