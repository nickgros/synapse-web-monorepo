import{l as d}from"./index-BD-tyB7H.js";import{aP as R,aQ as p,aR as T,aS as P,aT as M,aU as y,aV as D,aW as O,aX as U}from"./ApplicationSessionManager-CECkmrBg.js";import{g as k,B as q}from"./getEndpoint-CjoHA800.js";import{y as I}from"./index-CrI3GNrK.js";import{b as C}from"./mockEntity-56DLKoiK.js";import{M as u,a as c,e as B,f as v,g as $,m,h as l,c as L}from"./mock_user_profile-DulivbBT.js";import{l as j,P as g,k as h}from"./SynapseConstants-fRcr9RXt.js";import{u as N}from"./uniqueId-DePWDRrE.js";const H=987654,G=987655,w=987656,Z=987657,J=987658,F=987659,E={id:String(H),name:"Mock Team",description:"A team that already has super cool fake users",icon:"",canPublicJoin:!0,canRequestMembership:!0,etag:"f29b79d6-5b63-4641-93c7-30d954b4328c",createdOn:"2013-11-02T01:01:18.373Z",modifiedOn:"2019-01-31T20:34:40.057Z",createdBy:String(u),modifiedBy:String(c)},_={id:String(G),name:"Mock team public can join",description:"A team for fake users to join",icon:"",canPublicJoin:!0,canRequestMembership:!1,etag:"f29b79d6-5b63-4641-93c7-30d954b4328c",createdOn:"2013-11-02T01:01:18.373Z",modifiedOn:"2019-01-31T20:34:40.057Z",createdBy:String(u),modifiedBy:String(c)},b={id:String(w),name:"Mock team public can request to join",description:"A team for fake users to request to join",icon:"",canPublicJoin:!1,canRequestMembership:!0,etag:"f29b79d6-5b63-4641-93c7-30d954b4328c",createdOn:"2013-11-02T01:01:18.373Z",modifiedOn:"2019-01-31T20:34:40.057Z",createdBy:String(u),modifiedBy:String(c)},f={id:String(Z),name:"Mock team with open invitation",description:"A team that fake users have been invited to join",icon:"",canPublicJoin:!1,canRequestMembership:!1,etag:"f29b79d6-5b63-4641-93c7-30d954b4328c",createdOn:"2013-11-02T01:01:18.373Z",modifiedOn:"2019-01-31T20:34:40.057Z",createdBy:String(u),modifiedBy:String(c)},A={id:String(J),name:"Mock team with open request",description:"A team that fake users have already requested to join",icon:"",canPublicJoin:!1,canRequestMembership:!0,etag:"f29b79d6-5b63-4641-93c7-30d954b4328c",createdOn:"2013-11-02T01:01:18.373Z",modifiedOn:"2019-01-31T20:34:40.057Z",createdBy:String(u),modifiedBy:String(c)},K={id:String(F),name:"Mock team with open invitation",description:"A team that users must join to participate in the challenge",icon:"",canPublicJoin:!0,etag:"f29b79d6-5b63-4641-93c7-30d954b4328c",createdOn:"2013-11-02T01:01:18.373Z",modifiedOn:"2019-01-31T20:34:40.057Z",createdBy:String(u),modifiedBy:String(c)},W={id:String(j),name:"Mock Synapse ACT",description:"Same hard-coded ID as the ACT, but this is a mocked version",icon:"",canPublicJoin:!1,etag:"f29b79d6-5b63-4641-93c7-30d954b4328c",createdOn:"2013-11-02T01:01:18.373Z",modifiedOn:"2019-01-31T20:34:40.057Z",createdBy:String(u),modifiedBy:String(c)},V=[E,_,b,f,A,K,W],Y=V.map(i=>({id:parseInt(i.id),userProfile:null,userBundle:null,userGroupHeader:{ownerId:String(i.id),userName:i.name,isIndividual:!1}})),ie=[{teamId:E.id,userId:String(u),isMember:!0,hasOpenInvitation:!1,hasOpenRequest:!1,canJoin:!0,membershipApprovalRequired:!0,hasUnmetAccessRequirement:!1,canSendEmail:!0},{teamId:_.id,userId:String(u),isMember:!1,hasOpenInvitation:!1,hasOpenRequest:!1,canJoin:!0,membershipApprovalRequired:!1,hasUnmetAccessRequirement:!1,canSendEmail:!1},{teamId:b.id,userId:String(u),isMember:!1,hasOpenInvitation:!1,hasOpenRequest:!1,canJoin:!1,membershipApprovalRequired:!0,hasUnmetAccessRequirement:!1,canSendEmail:!1},{teamId:f.id,userId:String(u),isMember:!1,hasOpenInvitation:!0,hasOpenRequest:!1,canJoin:!1,membershipApprovalRequired:!0,hasUnmetAccessRequirement:!1,canSendEmail:!1},{teamId:A.id,userId:String(u),isMember:!1,hasOpenInvitation:!1,hasOpenRequest:!0,canJoin:!1,membershipApprovalRequired:!0,hasUnmetAccessRequirement:!1,canSendEmail:!1}],oe=[{id:N(),createdOn:new Date().toISOString(),createdBy:String(c),teamId:f.id,inviteeId:String(u),message:"Come join my cool team so we can submit to the challenge together!"}],Q={id:g,userProfile:null,userBundle:null,userGroupHeader:{ownerId:g.toString(),userName:"PUBLIC",isIndividual:!1}},X={id:h,userProfile:null,userBundle:null,userGroupHeader:{ownerId:h.toString(),userName:"AUTHENTICATED_USERS",isIndividual:!1}},S=[B,v,$,...Y,X,Q],ue=i=>[d.rest.get(`${i}${R(":id")}`,async(a,t,e)=>{let s=404,n={reason:`Mock Service worker could not find a user profile with ID ${a.params.id}`};const r=m.find(o=>o.id.toString()===a.params.id);return r&&r.userProfile&&(n=r.userProfile,s=200),t(e.status(s),e.json(n))}),d.rest.get(`${i}${p}`,async(a,t,e)=>{const s=L;return t(e.status(200),e.json(s))}),d.rest.get(`${k(q.REPO_ENDPOINT)}${T}`,async(a,t,e)=>{const s=l;return t(e.status(200),e.json(s))}),d.rest.get(`${i}${P(":id")}`,async(a,t,e)=>{let s=404,n={reason:`Mock Service worker could not find a user bundle with ID ${a.params.id}`};const r=m.find(o=>o.id.toString()===a.params.id);return r&&r.userBundle&&(n=r.userBundle,s=200),t(e.status(s),e.json(n))}),d.rest.get(`${i}${M}`,async(a,t,e)=>t(e.status(200),e.json(C))),d.rest.get(`${i}${y}`,async(a,t,e)=>{const s=a.url.searchParams.get("ids").split(","),n={children:S.filter(r=>s.includes(r.id.toString())).map(r=>r.userGroupHeader)};return t(e.status(200),e.json(n))}),d.rest.post(`${i}${p}`,async(a,t,e)=>{const s=(await a.json()).list,n={list:m.filter(r=>s.includes(r.id.toString())).map(r=>r.userProfile).filter(r=>r!=null)};return t(e.status(200),e.json(n))}),d.rest.get(`${i}${D}`,async(a,t,e)=>{const s=(a.url.searchParams.get("prefix")??"").toLowerCase(),n=a.url.searchParams.get("typeFilter"),r={children:S.filter(o=>!n||n===I.ALL?!0:n===I.USERS_ONLY?o.userGroupHeader.isIndividual:!o.userGroupHeader.isIndividual).filter(o=>o.userGroupHeader.userName.toLowerCase().startsWith(s)||(o.userGroupHeader.firstName||"").toLowerCase().startsWith(s)||(o.userGroupHeader.displayName||"").toLowerCase().startsWith(s)||(o.userGroupHeader.lastName||"").toLowerCase().startsWith(s)).map(o=>o.userGroupHeader)};return t(e.status(200),e.json(r))}),d.rest.get(`${i}${O(":userId")}`,async(a,t,e)=>t(e.status(404),e.json({reason:"user has no profile image"}))),d.rest.get(`${i}${U}`,async(a,t,e)=>{var s;return t(e.status(200),e.json({email:(s=l.userProfile)==null?void 0:s.email}))}),d.rest.get(`${i}/auth/v1/2fa`,async(a,t,e)=>{const s={status:"ENABLED"};return t(e.status(200),e.json(s))})];function de(i,a,t){return d.rest.get(`${i}${T}`,async(e,s,n)=>{const o={...l,isCertified:a,isVerified:t};return s(n.status(200),n.json(o))})}export{H as M,de as a,G as b,w as c,Z as d,J as e,F as f,ue as g,oe as h,V as i,ie as m};
