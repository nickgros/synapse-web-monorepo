import{k as a,q as y,o as i,p as o,r as d}from"./SynapseClient-Dzk5gF_R.js";import{u as m}from"./useMutation-UE6IyaEb.js";import"./OrientationBanner-D9RUUnWX.js";import"./RegularExpressions-D6yUxzx6.js";import"./getEndpoint-CjoHA800.js";import"./index-Dl6G-zuu.js";import"./jsx-runtime-Du8NFWEI.js";function S(e,t,n){const{accessToken:u,keyFactory:r}=a();return o({...n,queryKey:r.getIsUserMemberOfTeamQueryKey(e,t),queryFn:()=>y.getIsUserMemberOfTeam(e,t,u)})}function F(e,t,n){const{accessToken:u,keyFactory:r}=a();return o({...n,queryKey:r.getMembershipStatusQueryKey(e,t),queryFn:()=>y.getMembershipStatus(e,t,u)})}function k(e,t){const{accessToken:n,keyFactory:u}=a();return o({...t,queryKey:u.getAllOpenMembershipInvitationsForUserQueryKey(e),queryFn:()=>y.getAllOpenMembershipInvitationsForUser(e,n)})}function l(e){const{accessToken:t}=a();return m({...e,mutationFn:n=>y.createMembershipInvitation(n,t)})}function g(e){const t=i(),{accessToken:n,keyFactory:u}=a();return m({...e,mutationFn:({teamId:r,userId:s})=>y.addTeamMemberAsAuthenticatedUserOrAdmin(r,s,n),onSuccess:async(r,s,c)=>{e!=null&&e.onSuccess&&e.onSuccess(r,s,c),await Promise.all([t.invalidateQueries({queryKey:u.getMembershipStatusQueryKey(s.teamId,s.userId)}),t.invalidateQueries({queryKey:u.getIsUserMemberOfTeamQueryKey(s.teamId,s.userId)}),t.invalidateQueries({queryKey:u.getTeamMembersQueryKey(s.teamId)}),t.invalidateQueries({queryKey:u.getAllSubmissionTeamsQueryKeys()})])}})}function h(e){const t=i(),{accessToken:n,keyFactory:u}=a();return m({...e,mutationFn:r=>y.createMembershipRequest(r,n),onSuccess:async(r,s,c)=>{if(await t.invalidateQueries({queryKey:u.getMembershipStatusQueryKey(s.teamId,s.userId)}),e.onSuccess)return e.onSuccess(r,s,c)}})}function p(e){const t=i(),{accessToken:n,keyFactory:u}=a();return m({...e,mutationFn:r=>d(r.teamId,r.userId,n),onSuccess:async(r,s,c)=>{await Promise.all([t.invalidateQueries({queryKey:u.getIsUserMemberOfTeamQueryKey(s.teamId,s.userId)}),t.invalidateQueries({queryKey:u.getMembershipStatusQueryKey(s.teamId,s.userId)})]),e!=null&&e.onSuccess&&await e.onSuccess(r,s,c)}})}export{F as a,g as b,p as c,l as d,k as e,h as f,S as u};
