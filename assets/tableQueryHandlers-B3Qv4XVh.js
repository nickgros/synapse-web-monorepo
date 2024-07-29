import{l}from"./index-CCvylG8w.js";import{aY as f,aZ as I,a_ as D}from"./SynapseClient-Dbc8tFdW.js";import{g as T,B as d}from"./getEndpoint-CjoHA800.js";import{a as R,d as g,n as O,v as M,s as U,t as A,w as b,u as B}from"./SynapseConstants-Br5dMy50.js";import{u as _}from"./uniqueId-CSw6ftlJ.js";import{c as L}from"./cloneDeep-DwycXlOj.js";const y=new Map;function S(o,t,n,e=T(d.REPO_ENDPOINT),m=201){return[l.rest.post(`${e}${o}`,async(r,i,a)=>{const s=_();return y.set(s,{request:await r.json(),response:n}),i(a.status(201),a.json({token:s}))}),l.rest.get(`${e}${f(":id")}`,async(r,i,a)=>{const s=r.params.id,c=y.get(s);if(!s||!c)return i(a.status(404),a.json({message:"The mocked asynchronous job was not found"}));const{request:p,response:u}=c,E=typeof u=="function"?u(p):u,N=m<400?"COMPLETE":"FAILED";return i(a.status(200),a.json({jobState:N,jobCanceling:!1,requestBody:p,etag:"00000000-0000-0000-0000-000000000000",jobId:s,responseBody:E,startedByUserId:0,startedOn:"",changedOn:"",progressMessage:"",progressCurrent:100,progressTotal:100,exception:"",errorMessage:"",errorDetails:"",runtimeMS:100}))}),l.rest.get(`${e}${t(":asyncJobToken")}`,async(r,i,a)=>{const s=r.params.asyncJobToken,c=y.get(s);if(!s||!c)return i(a.status(404),a.json({message:"The mocked asynchronous job was not found"}));const{request:p,response:u}=c,E=typeof u=="function"?u(p):u;return i(a.status(m),a.json(E))})]}const C=[{name:"id",columnType:"ENTITYID",id:"81721"},{name:"name",columnType:"STRING",id:"81722",maximumSize:256},{name:"description",columnType:"STRING",id:"87941",maximumSize:1e3},{name:"createdOn",columnType:"DATE",facetType:"range",id:"81723"},{name:"createdBy",columnType:"USERID",facetType:"enumeration",id:"81724"},{name:"etag",columnType:"STRING",id:"81725",maximumSize:36},{name:"modifiedOn",columnType:"DATE",facetType:"range",id:"81726"},{name:"modifiedBy",columnType:"USERID",facetType:"enumeration",id:"81727"},{name:"type",columnType:"STRING",facetType:"enumeration",id:"196992",maximumSize:20},{name:"currentVersion",columnType:"INTEGER",id:"81729"},{name:"parentId",columnType:"ENTITYID",facetType:"enumeration",id:"81730"},{name:"benefactorId",columnType:"ENTITYID",id:"81731"},{name:"projectId",columnType:"ENTITYID",facetType:"enumeration",id:"81732"},{name:"dataFileHandleId",columnType:"FILEHANDLEID",id:"81733"},{name:"dataFileName",columnType:"STRING",id:"199088",maximumSize:256},{name:"dataFileSizeBytes",columnType:"INTEGER",id:"112368"},{name:"dataFileMD5Hex",columnType:"STRING",id:"112369",maximumSize:100},{name:"dataFileConcreteType",columnType:"STRING",facetType:"enumeration",id:"196995",maximumSize:65},{name:"dataFileBucket",columnType:"STRING",facetType:"enumeration",id:"196996",maximumSize:100},{name:"dataFileKey",columnType:"STRING",id:"184972",maximumSize:700}],j={[R]:"queryResult",[g]:"queryCount",[O]:"selectColumns",[M]:"maxRowsPerPage",[U]:"columnModels",[A]:"facets",[b]:"sumFileSizes",[B]:"lastUpdatedOn"};function P(o,t){const n=L(o);return Object.entries(j).forEach(([e,m])=>{t&parseInt(e)||delete n[m]}),n}function K(o,t=T(d.REPO_ENDPOINT),n=":id"){return S(D(n),e=>I(n,e),e=>P(o,e.partMask),t)}function h(o,t=T(d.REPO_ENDPOINT)){return S("/repo/v1/column/view/scope/async/start",n=>`/repo/v1/column/view/scope/async/get/${n}`,o,t)}function H(o=T(d.REPO_ENDPOINT)){return[l.rest.get(`${o}/repo/v1/column/tableview/defaults`,async(t,n,e)=>n(e.status(200),e.json({concreteType:"org.sagebionetworks.repo.model.table.ColumnModel",list:C})))]}function J(o=T(d.REPO_ENDPOINT)){return l.rest.post(`${o}/repo/v1/column/batch`,async(t,n,e)=>{const{list:m}=await t.json();return m.forEach(r=>{r.id||(r.id=_())}),n(e.status(201),e.json({concreteType:"org.sagebionetworks.repo.model.table.ColumnModel",list:m}))})}export{H as a,h as b,J as c,K as g};
