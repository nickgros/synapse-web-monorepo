import{r}from"./index-Dl6G-zuu.js";import"./useFiles-DlHdYvDe.js";import{c as H}from"./VerificationSubmission-DL9jxYsQ.js";import"./StringUtils-By8SXO8c.js";import"./OrientationBanner-D9CLn5zV.js";import"./jsx-runtime-Du8NFWEI.js";import{b as P}from"./UserBadge-BhhyY1p7.js";import{a as I,P as f}from"./SynapseConstants-B1OhJYgL.js";import{n as C}from"./noop-DX6rZLP_.js";function h(e,s){let i;(o=>{o[o.A_FIRST=-1]="A_FIRST",o[o.B_FIRST=1]="B_FIRST"})(i||(i={}));const a=e.resourceAccess.accessType.includes(H.CHANGE_PERMISSIONS),n=s.resourceAccess.accessType.includes(H.CHANGE_PERMISSIONS);return a&&!n?-1:!a&&n?1:e.resourceAccess.principalId===I&&s.resourceAccess.principalId!==I?-1:e.resourceAccess.principalId!==I&&s.resourceAccess.principalId===I?1:e.resourceAccess.principalId===f&&s.resourceAccess.principalId!==f?-1:e.resourceAccess.principalId!==f&&s.resourceAccess.principalId===f?1:e.userGroupHeader.userName.localeCompare(s.userGroupHeader.userName)}function T(e){const s=r.useMemo(()=>e.map(t=>t.principalId),[e]),{data:i,isLoading:a,error:n}=P(s.map(String),{enabled:s.length>0});return r.useEffect(()=>{n&&console.error("Error fetching user group headers: ",n)},[n]),{sortedResourceAccessList:r.useMemo(()=>{if(!i)return null;const t=e.map(c=>({resourceAccess:c,userGroupHeader:i.find(m=>String(m.ownerId)===String(c.principalId))}));return t.every(c=>!!c.userGroupHeader)?t.toSorted(h).map(c=>c.resourceAccess):(console.warn("Some ACL entries do not have a corresponding UserGroupHeader. The ResourceAccess list will not be sorted. Missing entries: ",t.filter(c=>!c.userGroupHeader)),null)},[e,i]),isLoading:a}}const y="User or team already has permissions.",D=[];function Y(e={}){const{initialResourceAccessList:s=D,onChange:i=C,onError:a=C}=e,[n,o]=r.useState(!1),[t,d]=r.useState(s),[c,m]=r.useState(!1),{sortedResourceAccessList:R,isLoading:E}=T(t);r.useEffect(()=>{!n&&!E&&!c&&R!=null&&(d(R),m(!0))},[c,n,E,R]),r.useEffect(()=>{i(t)},[t]);const G=r.useCallback((u,l)=>{o(!0),u&&d(p=>{if(p.some(S=>S.principalId===u))a(y);else{const S={principalId:u,accessType:l};return[...p,S]}return p})},[a]),_=r.useCallback((u,l)=>{o(!0),d(p=>p.map(A=>A.principalId===u?{...A,accessType:l}:A))},[]),g=r.useCallback(u=>{o(!0),d(l=>l.filter(p=>p.principalId!==u))},[]),L=r.useCallback(()=>{o(!1)},[]);return{resourceAccessList:t,setResourceAccessList:d,addResourceAccessItem:G,updateResourceAccessItem:_,removeResourceAccessItem:g,resetDirtyState:L}}export{Y as u};
