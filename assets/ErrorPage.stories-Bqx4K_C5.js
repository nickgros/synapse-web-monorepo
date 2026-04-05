import{S as o,E as s}from"./ErrorPage-BjG-HrXh.js";import"./iframe-MKfqFOD8.js";import"./index-Chi_LkuB.js";import"./useDOI-4pOXXAXA.js";import"./waitForAsyncResult-0y4Vh2kw.js";import"./useMessage-5-Hbh4X2.js";import"./useUserBundle-BxwpkSuA.js";import"./ConfirmationDialog-xjYdNlBh.js";import"./DialogBase-sqgBoDKn.js";import"./Close-DbfkXeYU.js";import"./HelpPopover-JiNUdC6G.js";import"./MarkdownPopover-DW_c7wkC.js";import"./LightTooltip-CIyd6sa2.js";import"./MarkdownSynapse-Cf8WvGE4.js";import"./SkeletonButton-DeN5-pZo.js";import"./SkeletonInlineBlock-F_c8IDKO.js";import"./SkeletonTable-csENOylF.js";import"./SkeletonParagraph-FVQhx8Xz.js";const{fn:t}=__STORYBOOK_MODULE_TEST__,f={title:"Synapse/ErrorPage",args:{gotoPlace:t()},component:s},r={args:{type:o.DOWN,message:"We're busy updating Synapse for you and will be back soon."}},e={args:{type:o.ACCESS_DENIED,entityId:"syn12345"}},a={args:{type:o.NOT_FOUND}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    type: SynapseErrorType.DOWN,
    message: "We're busy updating Synapse for you and will be back soon."
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    type: SynapseErrorType.ACCESS_DENIED,
    entityId: 'syn12345'
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    type: SynapseErrorType.NOT_FOUND
  }
}`,...a.parameters?.docs?.source}}};const U=["Maintenance","NoAccess","Unavailable"];export{r as Maintenance,e as NoAccess,a as Unavailable,U as __namedExportsOrder,f as default};
