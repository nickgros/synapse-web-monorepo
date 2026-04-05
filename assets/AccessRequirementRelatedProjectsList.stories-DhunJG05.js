import{s as o,b as n,O as a,H as c}from"./iframe-MKfqFOD8.js";import{A as m}from"./AccessRequirementRelatedProjectsList-CkCjzHPo.js";import"./index-Chi_LkuB.js";import"./useAccessRequirements-D8SoqZc7.js";import"./index-vuOGBU-4.js";import"./_baseOrderBy-lfxD-e5Q.js";import"./_baseIteratee-DDxx7wlp.js";import"./_baseMap-Bfewz1-m.js";import"./_baseEach-BAlWuIp6.js";import"./useInfiniteQuery-BG9mEZpV.js";import"./pluralize-DvqWrKl4.js";import"./EntityLink-DU_akKIL.js";import"./useEntity-C7wbNsA9.js";import"./pickBy-BkUQgDmm.js";import"./isString-5GsEY6VE.js";import"./InfiniteQueryUtils-CKlRW-xB.js";import"./useEntityBundle-ChHnXsJI.js";import"./useGetEntityHeaders-DvB2NRYs.js";import"./EntityIcon-CKZ6Is29.js";import"./ErrorChip-CseRxEHZ.js";import"./Chip-nSYhQ0xM.js";import"./ListItem-B3cmV6ok.js";import"./listItemButtonClasses-DGwXwAMk.js";const f={title:"Governance/AccessRequirementRelatedProjectsList",component:m},e={args:{accessRequirementId:9603055}},r={args:{accessRequirementId:9605913}},s={args:{accessRequirementId:1234567},parameters:{stack:"mock",msw:{handlers:[o.post(`${n}${a}`,()=>{const t={results:[{id:"1234567",type:"org.sagebionetworks.repo.model.ManagedACTAccessRequirement",createdOn:"2017-08-23T18:48:20.892Z",modifiedOn:"2023-12-14T00:43:41.315Z",name:"Team AR without Related Projects",version:"1",relatedProjectIds:[],reviewerIds:[]}]};return c.json(t,{status:200})})]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    accessRequirementId: 9603055
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    accessRequirementId: 9605913
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    accessRequirementId: 1234567
  },
  parameters: {
    stack: 'mock',
    msw: {
      handlers: [
      // searchAccessRequirements
      http.post(\`\${MOCK_REPO_ORIGIN}\${ACCESS_REQUIREMENT_SEARCH}\`, () => {
        const zeroRelatedProjects = {
          results: [{
            id: '1234567',
            type: 'org.sagebionetworks.repo.model.ManagedACTAccessRequirement',
            createdOn: '2017-08-23T18:48:20.892Z',
            modifiedOn: '2023-12-14T00:43:41.315Z',
            name: 'Team AR without Related Projects',
            version: '1',
            relatedProjectIds: [],
            reviewerIds: []
          }]
        };
        return HttpResponse.json(zeroRelatedProjects, {
          status: 200
        });
      })]
    }
  }
}`,...s.parameters?.docs?.source}}};const v=["ManyProjects","OneProject","ZeroProjectsMock"];export{e as ManyProjects,r as OneProject,s as ZeroProjectsMock,v as __namedExportsOrder,f as default};
