import{r as o}from"./index-f1f749bf.js";import{ah as u,aj as f,ao as S,bt as E,bF as d,bG as Q,bH as T,bI as F,bJ as m,bK as K,bL as k}from"./SynapseContext-d9d41f69.js";import{u as g}from"./useMutation-aa6f7482.js";import{u as J}from"./useInfiniteQuery-507f7088.js";import{_ as w,o as h}from"./pick-23be3b9c.js";function l(t,a,s){return t.invalidateQueries(a.getEntityQueryKey(s))}function q(t,a,s){const{accessToken:n,keyFactory:e}=u();return f(e.getEntityVersionQueryKey(t,a),()=>S(n,t,a==null?void 0:a.toString()),s)}function x(t){const a=E(),{accessToken:s,keyFactory:n}=u();return g(e=>d(e,s),{...t,onSuccess:async(e,c,r)=>{await l(a,n,e.id),a.setQueryData(n.getEntityQueryKey(e.id),e),t!=null&&t.onSuccess&&await t.onSuccess(e,c,r)}})}function L(t){const a=E(),{accessToken:s,keyFactory:n}=u();return g(e=>Q(s,e),{...t,onSuccess:async(e,c,r)=>{await l(a,n,c),t!=null&&t.onSuccess&&await t.onSuccess(e,c,r)}})}function D(t,a){const{accessToken:n,keyFactory:e}=u();return J(e.getEntityVersionsQueryKey(t),async c=>await T(t,n,c.pageParam,200),{...a,getNextPageParam:(c,r)=>{if(c.results.length>0)return r.length*200}})}function I(t){return w(t,k[t.concreteType])}function M(t){return h(t,k[t.concreteType])}function A(t,a){const[s,n]=o.useState(),[e,c]=o.useState(),{accessToken:r,keyFactory:i}=u(),y=f(i.getEntityJsonQueryKey(t),()=>F(t,r),a);return o.useEffect(()=>{y.data&&(n(I(y.data)),c(M(y.data)))},[y.data]),{...y,entityMetadata:s,annotations:e}}function U(t){const a=E(),{accessToken:s,keyFactory:n}=u();return g(e=>{const c=e.id;return m(c,e,s)},{...t,onSuccess:async(e,c,r)=>{const i=e.id;await l(a,n,i),a.setQueryData(n.getEntityJsonQueryKey(i),e),t!=null&&t.onSuccess&&await t.onSuccess(e,c,r)}})}function _(t,a){const{accessToken:s,keyFactory:n}=u();return f(n.getEntityPathQueryKey(t),()=>K(t,s),a)}export{_ as a,x as b,L as c,D as d,A as e,U as f,q as u};
//# sourceMappingURL=useEntity-a144a0c2.js.map
