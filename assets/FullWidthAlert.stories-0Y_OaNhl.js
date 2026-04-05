import{ax as a,r as i,j as r}from"./iframe-MKfqFOD8.js";import{S as c}from"./SynapseNavDrawer-Bq2u6olR.js";import"./index-Chi_LkuB.js";import"./useDataAccessSubmission-LuUFHyyo.js";import"./useInfiniteQuery-BG9mEZpV.js";import"./useDownloadList-2Ih0lnHm.js";import"./waitForAsyncResult-0y4Vh2kw.js";import"./useUserBundle-BxwpkSuA.js";import"./CreateProjectModal-llJ3ul0N.js";import"./ConfirmationDialog-xjYdNlBh.js";import"./DialogBase-sqgBoDKn.js";import"./Close-DbfkXeYU.js";import"./HelpPopover-JiNUdC6G.js";import"./MarkdownPopover-DW_c7wkC.js";import"./LightTooltip-CIyd6sa2.js";import"./MarkdownSynapse-Cf8WvGE4.js";import"./SkeletonButton-DeN5-pZo.js";import"./SkeletonInlineBlock-F_c8IDKO.js";import"./SkeletonTable-csENOylF.js";import"./SkeletonParagraph-FVQhx8Xz.js";import"./SynapseHomepageNavBar-Bk25DipY.js";import"./SageResourcesPopover-ynOhlKEG.js";import"./Grid-CtUQ9ERB.js";import"./index-vuOGBU-4.js";import"./MenuItem-A_sRjryR.js";import"./UserBadge-YUYrfza9.js";import"./Card-BBDKbp41.js";import"./Chip-nSYhQ0xM.js";import"./searchDefaults-ww-pRNaG.js";import"./Slide-CCgdYx61.js";import"./InputAdornment-CNdx3WYe.js";import"./listItemButtonClasses-DGwXwAMk.js";import"./Badge-DqBn_fRP.js";import"./usePreviousProps-OjlbKFqY.js";const U={title:"UI/FullWidthAlert",argTypes:{variant:{options:["warning","info","danger","success",void 0],control:{type:"radio"}}},component:a,parameters:{chromatic:{viewports:[300,600,1200]}}},t={args:{variant:"success",show:!0,title:"Package has been downloaded",description:"The files contained in this zip file have been removed from your list.",isGlobal:!1}},e={args:{variant:"success",show:!0,title:"Success",description:"Lorem ipsum dolor sit amet",primaryButtonConfig:{text:"Accept and Continue",onClick:()=>alert("Accepted")},isGlobal:!0,onClose:void 0}},o={args:{...e.args},render:s=>r.jsxs(r.Fragment,{children:[r.jsx(c,{initIsOpen:!1,gotoPlace:n=>{window.alert(`Nav bar calling back to change route to ${n}`)}}),r.jsx(a,{...s})]}),decorators:[s=>(i.useEffect(()=>(document.body.classList.add("SynapseNavDrawerIsShowing"),()=>{document.body.classList.remove("SynapseNavDrawerIsShowing")}),[]),r.jsx(s,{}))]};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    show: true,
    title: 'Package has been downloaded',
    description: 'The files contained in this zip file have been removed from your list.',
    isGlobal: false
  }
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    show: true,
    title: 'Success',
    description: 'Lorem ipsum dolor sit amet',
    primaryButtonConfig: {
      text: 'Accept and Continue',
      onClick: () => alert('Accepted')
    },
    isGlobal: true,
    onClose: undefined
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...SuccessAlertWithPrimaryButtonOnly.args
  },
  render: args => <>
      <SynapseNavDrawer initIsOpen={false} gotoPlace={(href: string) => {
      window.alert(\`Nav bar calling back to change route to \${href}\`);
    }} />
      <FullWidthAlert {...args} />
    </>,
  decorators: [Story => {
    useEffect(() => {
      // SWC applies this class when SynapseNavDrawer is visible
      document.body.classList.add('SynapseNavDrawerIsShowing');
      return () => {
        // ...and removes it when SynapseNavDrawer is not visible
        document.body.classList.remove('SynapseNavDrawerIsShowing');
      };
    }, []);
    return <Story />;
  }]
}`,...o.parameters?.docs?.source}}};const q=["DownloadListPackageCreation","SuccessAlertWithPrimaryButtonOnly","SynapseNavDrawerIsShowing"];export{t as DownloadListPackageCreation,e as SuccessAlertWithPrimaryButtonOnly,o as SynapseNavDrawerIsShowing,q as __namedExportsOrder,U as default};
