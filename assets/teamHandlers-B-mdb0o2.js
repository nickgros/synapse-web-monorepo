import{l as o}from"./index-CCvylG8w.js";import{M as l}from"./mock_user_profile-DyzXylki.js";import{a as v,b as C,c as R,d as _,e as S,f as O,g as j,h as q}from"./mockTeam-CdLA4Mkw.js";import{B as I}from"./BasicMockedCrudService-CM83Ur-_.js";import{a$ as A}from"./SynapseClient-Dbc8tFdW.js";import{u as T}from"./uniqueId-CSw6ftlJ.js";const u="1234",H="syn12345678",M="f1b29c62-e987-4e69-9cec-198bf017a586",f=e=>{const s=Math.pow(10,e-1);return Math.floor(Math.random()*9*s+s)},Z={id:u,etag:M,projectId:H,participantTeamId:String(S)},g=e=>{const s=f(6).toString(),a=f(6).toString();return{id:s,etag:M,challengeId:u,teamId:a,message:`Message for team ${a}`,...e}},w=[g({teamId:String(v),challengeId:u}),g({teamId:String(C),challengeId:u}),g({teamId:String(R),challengeId:u}),g({teamId:String(_),challengeId:u})],b=new I({initialData:w,idField:"id",autoGenerateId:!0});function B(e){return o.rest.get(`${e}/repo/v1/entity/:id/challenge`,async(s,a,t)=>{const n={id:u,etag:"f5e9df54-360b-4ede-9a17-f7f5680c8dd4",projectId:s.params.id,participantTeamId:String(S)};return a(t.status(200),t.json(n))})}function $(e){return o.rest.get(`${e}/repo/v1/challenge/:challengeId/challengeTeam`,async(s,a,t)=>{const n=b.getAll(),r={results:n,totalNumberOfResults:n.length};return a(t.status(200),t.json(r))})}function D(e){return o.rest.post(`${e}/repo/v1/challenge/:challengeId/challengeTeam`,async(s,a,t)=>{const n=await s.json(),r=b.create({...n,etag:"abcdef0987654321"});return a(t.status(200),t.json(r))})}function E(e){return o.rest.get(`${e}/repo/v1/challenge/:challengeId/submissionTeams`,async(s,a,t)=>{const n={results:[],totalNumberOfResults:0};return a(t.status(200),t.json(n))})}function x(e){return[B(e),E(e),D(e),$(e)]}const d=new I({initialData:O,idField:"id",autoGenerateId:!0}),h=new I({initialData:j});function K(e,s){return h.getOneByPredicate(a=>a.teamId===e&&a.userId===s)}const y=[...q];function L(e){return o.rest.get(`${e}/repo/v1/team/:teamId`,async(s,a,t)=>{const n=d.getOneById(s.params.teamId);if(n)return a(t.status(200),t.json(n));const r={reason:`Team id: '${s.params.teamId}' does not exist`};return a(t.status(404),t.json(r))})}function N(e){return o.rest.post(`${e}/repo/v1/teamList`,async(s,a,t)=>{const n=await s.json(),r=[];for(const i of n.list){const c=d.getOneById(i.toString());if(!c){const p={reason:`Team with id ${i} not found`};return a(t.status(404),t.json(p))}r.push(c)}const m={concreteType:"org.sagebionetworks.repo.model.Team",list:r};return a(t.status(200),t.json(m))})}function G(e){return o.rest.post(`${e}/repo/v1/team`,async(s,a,t)=>{const n=await s.json(),r=d.create({...n,createdBy:String(l),createdOn:new Date().toISOString(),etag:"etag",modifiedBy:String(l),modifiedOn:new Date().toISOString()});return h.create({teamId:r.id,userId:String(l),isMember:!0,hasOpenInvitation:!1,hasOpenRequest:!1,canJoin:!1,membershipApprovalRequired:!1,hasUnmetAccessRequirement:!1,canSendEmail:!0}),await A(250),a(t.status(201),t.json(r))})}function U(e){return o.rest.get(`${e}/repo/v1/team/:teamId/member/:memberId/membershipStatus`,async(s,a,t)=>{const n=s.params.teamId,r=s.params.memberId;let m,i;return d.getOneById(n)?(m=K(n,r)??{teamId:n,userId:r,isMember:!1,hasOpenInvitation:!1,hasOpenRequest:!1,canJoin:!0,membershipApprovalRequired:!1,hasUnmetAccessRequirement:!1,canSendEmail:!1},i=200):(m={reason:`getTeamMembershipStatusHandler could not locate a team with ID ${n}`},i=404),a(t.status(i),t.json(m))})}function J(e){return o.rest.put(`${e}/repo/v1/team/:teamId/member/:memberId`,async(s,a,t)=>{const n=s.params.teamId,r=s.params.memberId;let m,i;if(!d.getOneById(n))m={reason:`getTeamMembershipStatusHandler could not locate a team with ID ${n}`},i=404;else{const p={teamId:n,userId:r,isMember:!0,hasOpenInvitation:!1,hasOpenRequest:!1,canJoin:!0,membershipApprovalRequired:!1,hasUnmetAccessRequirement:!1,canSendEmail:!1};h.create(p),m="",i=201}return a(t.status(i),t.json(m))})}function P(e){return o.rest.post(`${e}/repo/v1/membershipRequest`,async(s,a,t)=>{const r={...await s.json(),id:T(),createdOn:new Date().toISOString(),createdBy:String(l)};return a(t.status(201),t.json(r))})}function F(e){return o.rest.post(`${e}/repo/v1/membershipInvitation`,async(s,a,t)=>{const r={...await s.json(),id:T(),createdOn:new Date().toISOString(),createdBy:String(l)};return y.push(r),a(t.status(201),t.json(r))})}function k(e){return o.rest.get(`${e}/repo/v1/user/:userId/openInvitation`,async(s,a,t)=>{const n=y.filter(m=>String(m.inviteeId)===String(s.params.userId)),r={results:n,totalNumberOfResults:n.length};return a(t.status(200),t.json(r))})}function ee(e){return[L(e),N(e),G(e),U(e),J(e),P(e),F(e),k(e)]}export{x as a,ee as g,Z as m};
