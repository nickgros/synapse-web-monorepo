import{a as e,j as r,F as m}from"./jsx-runtime-9dc53467.js";import{S as u}from"./SynapseConstants-eb00dc31.js";import"./index-76fb7be0.js";import{P as d}from"./getEndpoint-ac94413e.js";import{h as p,y as h}from"./ApplicationSessionManager-9bd355c2.js";import{R as y,a as s}from"./RequirementItem-e9a41bcc.js";import{T as i}from"./Typography-1d068b0b.js";import{L as o}from"./Link-6ae0d01e.js";function c(){const{accessToken:n}=p(),{data:t}=h(),a=!!n;return e(y,{status:a?s.COMPLETE:s.LOCKED,children:[!a&&r(m,{children:e(i,{variant:"body1",children:[r(o,{className:u,children:"Sign in"})," ","with a Sage Platform (Synapse) user account. If you do not have a Sage account, you can"," ",r(o,{href:`${d.PORTAL}#!RegisterAccount:0`,children:"register for free."})]})}),a&&e(i,{variant:"body1",children:["You have signed in with the Sage Platform (Synapse) user account"," ",e("b",{children:[t==null?void 0:t.userName,"@synapse.org"]})]})]})}try{c.displayName="AuthenticatedRequirement",c.__docgenInfo={description:"Displays a data access request requirement prompts the user to authenticate if not already signed in.",displayName:"AuthenticatedRequirement",props:{}}}catch{}export{c as A};
