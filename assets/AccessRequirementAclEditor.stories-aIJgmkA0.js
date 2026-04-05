import{M as p,a as d,r as m,j as e,B as u,P as E}from"./iframe-MKfqFOD8.js";import{A as i}from"./AccessRequirementAclEditor-5oHkiEk1.js";import"./index-Chi_LkuB.js";import"./useAccessRequirements-D8SoqZc7.js";import"./index-vuOGBU-4.js";import"./_baseOrderBy-lfxD-e5Q.js";import"./_baseIteratee-DDxx7wlp.js";import"./_baseMap-Bfewz1-m.js";import"./_baseEach-BAlWuIp6.js";import"./useInfiniteQuery-BG9mEZpV.js";import"./AclEditor-Bq-xO03j.js";import"./UserSearchBox-EthjjESp.js";import"./useDebouncedEffect-DMjtnvZ2.js";import"./UserBadge-YUYrfza9.js";import"./useUserBundle-BxwpkSuA.js";import"./SkeletonTable-csENOylF.js";import"./MenuItem-A_sRjryR.js";import"./Card-BBDKbp41.js";import"./Chip-nSYhQ0xM.js";import"./UserOrTeamBadge-Fq6fL4Qr.js";import"./TeamBadge-CtPt7Wji.js";import"./Autocomplete-DgkBqjhh.js";import"./usePreviousProps-OjlbKFqY.js";import"./SkeletonButton-DeN5-pZo.js";import"./SkeletonInlineBlock-F_c8IDKO.js";import"./SkeletonParagraph-FVQhx8Xz.js";import"./IconSvgButton-CsunuXQR.js";import"./FormControlLabel-B5UuM6UV.js";import"./Checkbox-BHMyXJ7B.js";import"./SwitchBase-BRQ6Hx4R.js";import"./useUpdateAcl-DTW5W5TW.js";const y={title:"Governance/AccessRequirementAclEditor",component:i,render:function(n){const[c,o]=m.useState(!1),a=m.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(u,{onClick:()=>{o(!0),a.current?.save()},variant:"contained",disabled:c,children:"Save ACL"}),e.jsx(E,{sx:{mx:"auto",p:"44px",maxWidth:"750px"},children:e.jsx(i,{...n,ref:a,onSaveComplete:()=>o(!1)})})]})}},r={args:{accessRequirementId:p.id},parameters:{stack:"mock"}},t={args:{accessRequirementId:String(d)},parameters:{stack:"mock"}},s={args:{accessRequirementId:"9602671"},parameters:{stack:"development"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    accessRequirementId: MOCK_MANAGED_ACCESS_REQUIREMENT_ACL.id
  },
  parameters: {
    stack: 'mock'
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    accessRequirementId: String(MOCK_ACCESS_REQUIREMENT_WITHOUT_ACL_ID)
  },
  parameters: {
    stack: 'mock'
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    accessRequirementId: '9602671'
  },
  parameters: {
    stack: 'development'
  }
}`,...s.parameters?.docs?.source}}};const z=["MockDemoExistingAcl","MockDemoNoExistingAcl","DevDemo"];export{s as DevDemo,r as MockDemoExistingAcl,t as MockDemoNoExistingAcl,z as __namedExportsOrder,y as default};
