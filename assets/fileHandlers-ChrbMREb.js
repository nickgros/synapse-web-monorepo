import{l as n}from"./index-BD-tyB7H.js";import{aY as T,aZ as p,a_ as u,a$ as f}from"./ApplicationSessionManager-CECkmrBg.js";import{p as d}from"./index-CrI3GNrK.js";import{m as S}from"./mockAccessRequirements-BKs0zqzM.js";import{M as a,a as D}from"./mock_user_profile-DulivbBT.js";import{c,d as A,e as E,f as C,g}from"./mock_file_handle-_xROC6Xl.js";import{M as I}from"./MockResearchProject-DaqN2SMg.js";const M="3541518",R="49813181",O={id:M,accessorChanges:[{userId:String(a),type:d.GAIN_ACCESS}],attachments:[c,A],createdBy:String(a),createdOn:"2023-04-19T13:06:51+00:00",ducFileHandleId:E,irbFileHandleId:C,modifiedBy:String(a),modifiedOn:"2023-04-19T13:06:51+00:00",researchProjectId:I,etag:"0",accessRequirementId:String(S.id),concreteType:"org.sagebionetworks.repo.model.dataaccess.Request"};String(a),d.GAIN_ACCESS,String(D),d.REVOKE_ACCESS,c,A,String(a),E,C,String(a),I,String(S.id);function q(r,i=O){return[n.rest.get(`${r}${T(":id")}`,async(o,s,e)=>{const t=i;return s(e.status(200),e.json(t))}),n.rest.post(`${r}${p}`,async(o,s,e)=>{const t=await o.json();return s(e.status(201),e.json(t))}),n.rest.post(`${r}${u(":id")}`,async(o,s,e)=>s(e.status(201),e.json({})))]}function B(r){return[n.rest.post(`${r}${f}`,async(i,o,s)=>{const e=await i.json(),t={requestedFiles:[]};return e.requestedFiles.forEach(l=>{const _=g.find(m=>m.id===l.fileHandleId);_&&t.requestedFiles.push({fileHandleId:_.id,fileHandle:_})}),o(s.status(201),s.json(t))})]}export{O as M,q as a,B as g};
