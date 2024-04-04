import{l as u}from"./index-BD-tyB7H.js";import{g as v}from"./entityHandlers-CfZ00W-D.js";import{g as $,a as H}from"./userProfileHandlers-Mr7rKsah.js";import{g as w,B as R}from"./getEndpoint-CjoHA800.js";import{c as P}from"./accessRequirementHandlers-CTVAx79s.js";import{g as C}from"./MockSubmission-BB-QZyq3.js";import{a as N,g as M}from"./fileHandlers-ChrbMREb.js";import{g as U}from"./researchProjectHandlers-hW4I8dJZ.js";import{bx as j,by as D,bz as _,bA as L,bB as B}from"./ApplicationSessionManager-CECkmrBg.js";import{t as p,r as y}from"./index-CrI3GNrK.js";import{m as S,a as T}from"./mock_discussion-6IhFKFwx.js";import{M as l}from"./mock_user_profile-DulivbBT.js";import{m as F}from"./mockProject-Dph5a1KO.js";import{u as E}from"./uniqueId-DePWDRrE.js";import{f as b}from"./fakerUtils-CwCviLxE.js";import{r as O}from"./remove-D8tYNA8q.js";import{c as V,b as K,a as W}from"./tableQueryHandlers-CofZyarI.js";import{a as g}from"./mockEvaluationQueue-Bknr4Dw7.js";import{M as q}from"./mockAnnotationColumns-BK92JLVa.js";import{g as X}from"./personalAccessTokenHandlers-DFD8KvFk.js";import{g as Y,a as z}from"./teamHandlers-CMBSvyR-.js";import{g as G}from"./accessRequirementAclHandlers-CXh4IzxE.js";const J=[...S],I=[...T];function Q(t,e){return I.filter(r=>r.forumId===t).filter(r=>{switch(e){case p.NO_FILTER:return!0;case p.DELETED_ONLY:return r.isDeleted;case p.EXCLUDE_DELETED:return!r.isDeleted}})}function Z(t){return[u.rest.get(`${t}${j}/:id`,async(e,r,s)=>{let o=404,a={reason:`MSW could not find a mock forum object with ID ${e.params.id}`};const i=J.find(n=>n.id===e.params.id);return i&&(o=200,a=i),r(s.status(o),s.json(a))}),u.rest.get(`${t}${D}/:id`,async(e,r,s)=>{let o=404,a={reason:`MSW could not find a mock discussion thread bundle object with ID ${e.params.id}`};e.params.id==="messageUrl"&&(a={reason:"GET /thread/messageUrl is not yet implemented"});const i=I.find(n=>n.id===e.params.id);return i&&(o=200,a=i),r(s.status(o),s.json(a))}),u.rest.post(`${t}${D}`,async(e,r,s)=>{const o=await e.json(),a={id:E(),forumId:o.forumId,projectId:F.id,title:o.title,createdOn:new Date().toISOString(),createdBy:String(l),modifiedOn:new Date().toISOString(),etag:"etag",messageKey:"todo key",numberOfViews:0,numberOfReplies:0,lastActivity:new Date().toISOString(),activeAuthors:[String(l)],isEdited:!1,isDeleted:!1,isPinned:!1};return I.push(a),r(s.status(201),s.json(a))}),u.rest.get(`${t}${_(":forumId")}`,async(e,r,s)=>{const o=e.url.searchParams.get("offset"),a=o?parseInt(o):0,i=e.url.searchParams.get("limit"),n=i?parseInt(i):10,m=e.params.filter??p.EXCLUDE_DELETED,c=Q(e.params.forumId,m),f={results:c.slice(a,a+n),totalNumberOfResults:c.length};return r(s.status(200),s.json(f))}),u.rest.get(`${t}${j}/:id/moderators`,async(e,r,s)=>{const o={results:[String(l)],totalNumberOfResults:1};return r(s.status(200),s.json(o))})]}function A(t){return{subscriptionId:String(b.number.int({min:1e3,max:9999})),subscriberId:String(l),createdOn:b.date.anytime().toISOString(),...t}}const x=S.map(t=>A({objectId:t.id,objectType:y.FORUM})),k=T.map(t=>A({objectType:y.THREAD,objectId:t.id})),d=[...x,...k];function h(t,e="ASC",r=0,s=10,o){const a=d.filter(n=>t?n.objectType===t:!0).filter(n=>o?o.includes(n.objectId):!0).sort((n,m)=>{const c=new Date(m.createdOn).getTime()-new Date(n.createdOn).getTime();return e==="ASC"?c:-1*c}),i=a.length;return{results:a.slice(r,r+s),totalNumberOfResults:i}}function tt(t){return[u.rest.get(`${t}/repo/v1/subscription/all`,async(e,r,s)=>{const o=e.url.searchParams.get("objectType")??void 0,a=e.url.searchParams.get("sortDirection")??void 0,i=e.url.searchParams.get("offset"),n=i?parseInt(i):void 0,m=e.url.searchParams.get("limit"),c=m?parseInt(m):void 0,f=h(o??void 0,a,n,c);return r(s.status(200),s.json(f))}),u.rest.post(`${t}/repo/v1/subscription/list`,async(e,r,s)=>{const o=await e.json(),a=h(o.objectType,o.sortDirection,void 0,void 0,o.idList);return r(s.status(200),s.json(a))}),u.rest.post(`${t}/repo/v1/subscription`,async(e,r,s)=>{const o=await e.json(),a={subscriptionId:E(),subscriberId:String(l),objectId:o.objectId,objectType:o.objectType,createdOn:new Date().toISOString()};return d.push(a),r(s.status(201),s.json(a))}),u.rest.delete(`${t}/repo/v1/subscription/:id`,async(e,r,s)=>{const o=e.params.id;return O(d,a=>a.subscriptionId===o),r(s.status(200),s.body(""))}),u.rest.post(`${t}/repo/v1/subscription/subscribers`,async(e,r,s)=>{const o=await e.json(),i={subscribers:d.filter(n=>n.objectType===o.objectType&&n.objectId===o.objectId).map(n=>n.subscriberId)};return r(s.status(200),s.json(i))})]}function st(t){return[u.rest.get(`${t}${L(":evaluationId")}`,async(e,r,s)=>{let o=404,a={reason:`Mock Service worker could not find a mock evaluation queue with ID ${e.params.evaluationId}`};const i=g.find(n=>n.id===e.params.entityId);return i&&(a=i,o=200),r(s.status(o),s.json(a))}),u.rest.get(`${t}${B}`,async(e,r,s)=>{let o=200,a={results:g,totalNumberOfResults:g.length};return r(s.status(o),s.json(a))})]}const et=t=>[u.rest.options("*",async(e,r,s)=>r(s.status(200))),u.rest.get(`${t}/auth/v1/authenticatedOn`,async(e,r,s)=>r(s.status(200),s.json({authenticatedOn:new Date().toISOString()}))),...v(t),...$(t),H(t,!0,!0),...C(t),...P(t),...G(t),...N(t),...U(t),...M(t),...Z(t),...tt(t),...st(t),V(t),...K(q,t),...W(t),...X(t),...Y(t),...z(t)];et(w(R.REPO_ENDPOINT));export{et as g};
