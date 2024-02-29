import{j as o,F as s,a as e}from"./jsx-runtime-9dc53467.js";import{L as T}from"./LeftRightPanel-a90477a3.js";import{u as L}from"./useShowDesktop-b2e7d235.js";import{u as k,L as g,a as R}from"./LoginFlowBackButton-e37ae29d.js";import{S as u}from"./SystemUseNotification-42fe424b.js";import{T as i}from"./Typography-1d068b0b.js";import{u as w}from"./useTheme-e79ecbc0.js";import{B as a}from"./Box-8faf86fd.js";import{L as D}from"./Link-6ae0d01e.js";import{S as x}from"./Stack-4eda368b.js";import{s as N}from"./styled-3c6f4d83.js";import{s as U}from"./StorybookComponentWrapper-cf70882c.js";import{d as A}from"./ToastMessage-313b7aae.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./Paper-411d859b.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-55b21f7f.js";import"./SynapseConstants-eb00dc31.js";import"./OrientationBanner-a1ca5cdb.js";import"./FullWidthAlert-706fe840.js";import"./Alert-c3fe2b05.js";import"./createSvgIcon-396e3e24.js";import"./IconButton-f820fa46.js";import"./ButtonBase-8587e55b.js";import"./emotion-react.browser.esm-5fddd3df.js";import"./TransitionGroupContext-e6fd87c7.js";import"./useForkRef-8feb2ebf.js";import"./assertThisInitialized-081f9914.js";import"./inheritsLoose-c82a83d4.js";import"./useIsFocusVisible-18cd238e.js";import"./AlertTitle-aeea0d59.js";import"./Grow-c431c788.js";import"./isHostComponent-fa76b8d9.js";import"./index-d3ea75b5.js";import"./utils-6fa73630.js";import"./ClickAwayListener-3b20c94f.js";import"./Tooltip-801f2a9c.js";import"./Button-33299b2c.js";import"./useMutation-71b4db1e.js";import"./ApplicationSessionManager-9bd355c2.js";import"./getEndpoint-ac94413e.js";import"./InfoTwoTone-b17047a2.js";import"./CheckCircleTwoTone-c37d81c7.js";import"./inputBaseClasses-034b6b96.js";import"./Fade-240af196.js";import"./_getTag-559aebd9.js";import"./_Map-92f6da1c.js";import"./isArray-5e3f9107.js";import"./StringUtils-2ea3ab4d.js";import"./index-01eb1463.js";import"./dayjs.min-f79c4412.js";import"./index-9d475cdf.js";import"./tiny-invariant-dd7d57d2.js";import"./TextField-259737a9.js";import"./InputLabel-fd013c0b.js";import"./useFormControl-41ba3265.js";import"./ownerWindow-2c76219e.js";import"./isMuiElement-bce4c331.js";import"./Select-41068544.js";import"./index-c71daf5e.js";import"./Menu-fc614fa0.js";import"./Modal-748aabbc.js";import"./Backdrop-989db5e0.js";import"./getScrollbarSize-ac846fe6.js";import"./createChainedFunction-0bab83cf.js";import"./MenuList-b0aba911.js";import"./List-a6975dc7.js";import"./TextField-12f5946f.js";import"./StyledFormControl-003a613e.js";import"./LoginMethodButton-4c077257.js";import"./IconSvg-a7217c47.js";import"./ErrorOutlined-6f3ac166.js";import"./GetAppTwoTone-d672483d.js";import"./InfoOutlined-e9da64e0.js";import"./LastLoginInfo-d3bb83b2.js";import"./DateFormatter-4ac10a57.js";import"./timezone-f53425a4.js";import"./extendSxProp-1372051e.js";import"./CSSTransition-c744be84.js";import"./hasClass-ec9efd32.js";import"./uniqueId-4d05949d.js";import"./toString-cc90cb98.js";import"./isSymbol-7c514724.js";const V=encodeURIComponent("Lost access to my Synapse account"),F=encodeURIComponent("<Please provide your username and/or email address associated with your account.>"),P=`https://sagebionetworks.jira.com/servicedesk/customer/portal/9/group/16/create/85?summary=${V}&description=${F}`,c=N(i,{label:"Tagline"})(({theme:t})=>({marginBottom:t.spacing(2),font:"300 24px/34px DM Sans, sans-serif"}));function y(t){return e(s,{children:[o(i,{...t,children:"Your backup code is a 16 digit code, with groups of 4 letters or numbers separated by hyphens, like this:"}),o(i,{...t,component:"div",variant:"monospace",sx:{my:1,fontSize:"18px"},children:"xxxx-xxxx-xxxx-xxxx"}),e(i,{...t,children:["Each code can only be used once. If you don’t have access to these codes, please"," ",o(D,{href:P,children:"contact us"}),"."]})]})}function l(t){const{ssoRedirectUrl:E,sessionCallback:_}=t,n=L(910),d=w(),{step:r,onStepChange:m,submitUsernameAndPassword:v,submitOneTimePassword:S,errorMessage:I,isLoading:O}=k(_),h=e(x,{alignItems:"stretch",sx:{height:"100%",width:"330px",mx:"auto"},children:[!n&&o(x,{flexDirection:"row",children:o(g,{step:r,onStepChange:m})}),e(a,{sx:{mb:4,textAlign:"center",maxWidth:"90vw"},children:[o("img",{alt:"Synapse logo",src:"https://s3.amazonaws.com/static.synapse.org/images/synapse-logo-blue.svg"}),!n&&o(i,{variant:"body1",align:"center",sx:{my:1},children:"Organize. Get credit. Collaborate."})]}),!n&&r==="VERIFICATION_CODE"&&o(i,{variant:"body1",align:"center",sx:{my:1},children:"Enter the 6-digit, time-based verification code provided by your authenticator app."}),!n&&r==="RECOVERY_CODE"&&o(y,{variant:"body1",align:"center",sx:{my:1}}),o(R,{ssoRedirectUrl:E,step:r,onStepChange:m,submitUsernameAndPassword:v,submitOneTimePassword:S,errorMessage:I,isLoading:O})]});return n?o(T,{leftContent:o(s,{children:e(a,{sx:{py:15,px:8,height:"100%",position:"relative"},children:[o(g,{step:r,onStepChange:m,sx:{position:"absolute",top:d.spacing(2),left:d.spacing(2)}}),h]})}),rightContent:o(a,{sx:{py:15,height:"100%",background:"url('https://s3.amazonaws.com/static.synapse.org/images/login-panel-bg.svg') no-repeat right bottom 5px"},children:e(a,{sx:{px:9,color:"#1e4964"},children:[r==="VERIFICATION_CODE"&&e(s,{children:[o(i,{variant:"headline1",sx:{mb:4},children:"Enter your verification code"}),o(i,{variant:"headline2",sx:{lineHeight:"30px"},children:"Enter the 6-digit, time-based verification code provided by your authenticator app."})]}),r==="RECOVERY_CODE"&&e(s,{children:[o(i,{variant:"headline1",sx:{mb:4},children:"Enter your backup code"}),o(y,{variant:"body1",sx:{fontSize:"18px",lineHeight:"30px"}})]}),r!=="VERIFICATION_CODE"&&r!=="RECOVERY_CODE"&&e(s,{children:[e(c,{variant:"headline2",children:[o("strong",{children:"Organize"})," your digital research assets."]}),e(c,{variant:"headline2",children:[o("strong",{children:"Get credit"})," for your research."]}),e(c,{variant:"headline2",children:[o("strong",{children:"Collaborate"})," with your colleagues and the public."]})]}),o(u,{})]})})}):e(a,{sx:{px:0,py:12,height:"95vh",background:"#fff url('https://s3.amazonaws.com/static.synapse.org/images/SynapseMobileLogInFull.svg') 50% 50%",backgroundSize:"contain"},children:[h,o(u,{})]})}try{l.displayName="LoginPage",l.__docgenInfo={description:"",displayName:"LoginPage",props:{ssoRedirectUrl:{defaultValue:null,description:"",name:"ssoRedirectUrl",required:!1,type:{name:"string"}},sessionCallback:{defaultValue:null,description:"",name:"sessionCallback",required:!0,type:{name:"() => void"}}}}}catch{}const ue={title:"Authentication/LoginPage",component:l},p={args:{sessionCallback:()=>{U().then(({profile:t})=>{A(`You are currently logged in as ${t.userName}`,"info",{autoCloseInMs:5e3})})}}};var f,C,b;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    sessionCallback: () => {
      sessionChangeHandler().then(({
        profile
      }) => {
        displayToast(\`You are currently logged in as \${profile.userName}\`, 'info', {
          autoCloseInMs: 5000
        });
      });
    }
  }
}`,...(b=(C=p.parameters)==null?void 0:C.docs)==null?void 0:b.source}}};const xe=["Demo"];export{p as Demo,xe as __namedExportsOrder,ue as default};
