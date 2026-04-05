import{a1 as o,v as s,a2 as t}from"./iframe-MKfqFOD8.js";import{A as i}from"./AclEditor-Bq-xO03j.js";import"./index-Chi_LkuB.js";import"./UserSearchBox-EthjjESp.js";import"./useDebouncedEffect-DMjtnvZ2.js";import"./UserBadge-YUYrfza9.js";import"./useUserBundle-BxwpkSuA.js";import"./SkeletonTable-csENOylF.js";import"./MenuItem-A_sRjryR.js";import"./Card-BBDKbp41.js";import"./Chip-nSYhQ0xM.js";import"./UserOrTeamBadge-Fq6fL4Qr.js";import"./TeamBadge-CtPt7Wji.js";import"./Autocomplete-DgkBqjhh.js";import"./usePreviousProps-OjlbKFqY.js";import"./SkeletonButton-DeN5-pZo.js";import"./SkeletonInlineBlock-F_c8IDKO.js";import"./SkeletonParagraph-FVQhx8Xz.js";import"./IconSvgButton-CsunuXQR.js";import"./FormControlLabel-B5UuM6UV.js";import"./Checkbox-BHMyXJ7B.js";import"./SwitchBase-BRQ6Hx4R.js";const{fn:r}=__STORYBOOK_MODULE_TEST__,y={title:"Synapse/ACL Editor",component:i,args:{availablePermissionLevels:["CAN_REVIEW_SUBMISSIONS","IS_EXEMPTION_ELIGIBLE"],onAddPrincipalToAcl:r(),updateResourceAccessItem:r(),removeResourceAccessItem:r(),isLoading:!1,canEdit:!0,emptyText:"No permissions have been granted.",showAddRemovePublicButton:!0,showNotifyCheckbox:!0}},e={args:{resourceAccessList:[{principalId:s,accessType:[o.REVIEW_SUBMISSIONS]},{principalId:t,accessType:[o.EXEMPTION_ELIGIBLE]}]},parameters:{stack:"mock"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    resourceAccessList: [{
      principalId: MOCK_USER_ID,
      accessType: [ACCESS_TYPE.REVIEW_SUBMISSIONS]
    }, {
      principalId: MOCK_TEAM_ID,
      accessType: [ACCESS_TYPE.EXEMPTION_ELIGIBLE]
    }]
  },
  parameters: {
    stack: 'mock'
  }
}`,...e.parameters?.docs?.source}}};const D=["Demo"];export{e as Demo,D as __namedExportsOrder,y as default};
