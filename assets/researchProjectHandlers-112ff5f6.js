import{a as o}from"./index-cac285fa.js";import{at as n,au as E}from"./EntityTypeUtils-6ccb5ab0.js";import{a as R}from"./MockResearchProject-e66565b9.js";function p(e){return[o.rest.post(`${e}${n}`,async(t,r,s)=>{const a=await t.json();return r(s.status(201),s.json(a))}),o.rest.get(`${e}${E(":id")}`,async(t,r,s)=>{const a={...R,accessRequirementId:t.params.id.toString()};return r(s.status(200),s.json(a))})]}export{p as g};
//# sourceMappingURL=researchProjectHandlers-112ff5f6.js.map
