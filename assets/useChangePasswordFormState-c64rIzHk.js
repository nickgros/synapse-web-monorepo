import{j as r}from"./jsx-runtime-Du8NFWEI.js";import{r as a}from"./index-Dl6G-zuu.js";import{u as q}from"./useMutation-CmUrLdpa.js";import{p as j,C as N,aW as V}from"./SynapseClient-Dbc8tFdW.js";import"./OrientationBanner-x6ohh6pv.js";import"./EntityTypeUtils-BpOAC-k-.js";import"./getEndpoint-CjoHA800.js";import{b as W}from"./useTwoFactorEnrollment-CNvGL0fO.js";import{T as U,R as v,O as Y}from"./Constants-CmBsz0g2.js";import"./LastLoginInfo-DI3K2C9q.js";import"./StandaloneLoginForm-CacjJ-Cx.js";import"./TwoFactorAuthSettingsPanel-PNNkUnrP.js";import"./TwoFactorEnrollmentForm-BJ2rQKa1.js";import"./TwoFactorBackupCodes-ByxVMGsA.js";import{T as f}from"./Typography-qpntpuFp.js";import{A as y}from"./Alert-C2wXqEQ3.js";function B(e){return q({...e,mutationFn:d=>j.changePassword(d)})}const H="Two-factor authentication is required to change your password. Your password has not yet been changed.";function O(e){const d=N("/reset2FA"),w=V(d,"twoFAResetToken"),[g,_]=a.useState(""),[C,p]=a.useState(""),[o,P]=a.useState(),[n,i]=a.useState("VERIFICATION_CODE"),[S,I]=a.useState(!1),{mutate:c,isPending:h,error:k}=B({onSuccess:s=>{s?P(s):(I(!0),P(void 0),e!=null&&e.onChangePasswordSuccess&&e.onChangePasswordSuccess())}}),b=a.useCallback((s,t,u)=>{_(t),p(u),c({username:s,currentPassword:t,newPassword:u,concreteType:"org.sagebionetworks.repo.model.auth.ChangePasswordWithCurrentPassword"})},[c]),x=a.useCallback((s,t)=>{p(s),c({newPassword:s,concreteType:"org.sagebionetworks.repo.model.auth.ChangePasswordWithToken",passwordChangeToken:t})},[c]),R=a.useCallback((s,t,u)=>{if(o){const E={newPassword:s,concreteType:"org.sagebionetworks.repo.model.auth.ChangePasswordWithTwoFactorAuthToken",userId:o.userId,twoFaToken:o.twoFaToken,otpType:u,otpCode:t};c(E)}},[c,o]),l=!!o,{mutate:T,isSuccess:m,isPending:F}=W(),A=a.useCallback(s=>{if(o){const t={userId:o.userId,twoFaResetEndpoint:s,password:g};T(t)}},[g,T,o]),D=a.useCallback(()=>l?r.jsxs(r.Fragment,{children:[n==="VERIFICATION_CODE"&&r.jsx(f,{variant:"body1",sx:{my:2},align:"center",children:U}),n==="RECOVERY_CODE"&&r.jsx(f,{variant:"body1",sx:{my:2},align:"center",children:v}),r.jsx(Y,{step:n,onClickUseTOTP:()=>{i("VERIFICATION_CODE")},onClickUseBackupCode:()=>{i("RECOVERY_CODE")},loginIsPending:h,onSubmit:(s,t)=>R(C,s,t),hideReset2FA:e==null?void 0:e.hideReset2FA,onClickPromptReset2FA:()=>{i("DISABLE_2FA_PROMPT")},onClickReset2FA:()=>{A(w)},twoFactorAuthResetIsPending:F,twoFactorAuthResetIsSuccess:m}),(n==="RECOVERY_CODE"||n==="VERIFICATION_CODE")&&r.jsx(y,{severity:"info",sx:{my:2},children:H}),n==="DISABLE_2FA_PROMPT"&&m&&r.jsxs(y,{severity:"warning",sx:{my:2},children:[r.jsx("strong",{children:"Your password has not been changed."})," To disable two-factor authentication, you may be required to enter your current password after clicking the link sent to your email address."]})]}):r.jsx(r.Fragment,{}),[A,R,h,C,e==null?void 0:e.hideReset2FA,n,l,F,m,w]);return{successfullyChangedPassword:S,isPending:h,error:k,promptForTwoFactorAuth:l,TwoFactorAuthPrompt:D,handleChangePasswordWithCurrentPassword:b,handleChangePasswordWithResetToken:x}}try{O.displayName="useChangePasswordFormState",O.__docgenInfo={description:"Hook that handles submitting a change password request and prompting the user for 2FA if necessary.",displayName:"useChangePasswordFormState",props:{hideReset2FA:{defaultValue:null,description:"",name:"hideReset2FA",required:!1,type:{name:"boolean"}},onChangePasswordSuccess:{defaultValue:null,description:"",name:"onChangePasswordSuccess",required:!1,type:{name:"(() => void)"}}}}}catch{}export{O as u};
