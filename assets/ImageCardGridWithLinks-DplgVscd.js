import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{i as S}from"./createTheme-C4MKIpuQ.js";import{r as v}from"./createSvgIcon-VNptiZ50.js";import{F as L}from"./VerificationSubmission-DL9jxYsQ.js";import{L as R}from"./chunk-K6AXKMTT-B5GX6HSq.js";import{o as b,Q as m,b1 as C}from"./useFiles-DlHdYvDe.js";import{p as T}from"./SqlFunctions-DFr525J_.js";import"./StringUtils-By8SXO8c.js";import{i as q,g as w}from"./SynapseConstants-B1OhJYgL.js";import"./index-Dl6G-zuu.js";import"./OrientationBanner-D9CLn5zV.js";import{P as k}from"./PortalSectionHeader-BFCpE_Og.js";import{B as g}from"./Box-CaFleW7-.js";import{G as f}from"./Grid-bxFy00qG.js";import{S as E}from"./Skeleton-CW6YXi1_.js";import{C as F}from"./Card-J02zcsj3.js";import{L as U}from"./Link-DxNs_73S.js";import{T as D}from"./Typography-DrqHmlDD.js";import{C as B}from"./CardMedia-BuF7IbSb.js";var x={},G=S;Object.defineProperty(x,"__esModule",{value:!0});var h=x.default=void 0,M=G(v()),A=e;h=x.default=(0,M.default)((0,A.jsx)("path",{d:"M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"}),"ArrowForwardIos");const u="6px",N=({card:r,isLoading:a,linkColumnIndex:n,linkTextColumnIndex:d,entityId:i,fileId:s})=>{const t={associateObjectId:i,associateObjectType:L.TableEntity,fileHandleId:s??""},o=C(t,!1,{enabled:!!s}),p=o==null?void 0:o.dataUrl;return e.jsx(f,{item:!0,xs:12,sm:6,md:4,sx:{height:"245px",paddingTop:"24px",paddingLeft:"24px"},children:a?e.jsx(E,{variant:"rectangular",height:221,width:"100%"}):e.jsx(F,{raised:!1,sx:{height:"100%",position:"relative",borderRadius:u,border:"none",transform:"scale(1)",transition:".3s ease-in-out","&:hover":{transform:"scale(1.05)",boxShadow:"0px 4px 15px rgba(0, 0, 0, 0.2)"}},children:e.jsxs(U,{component:R,to:r.values[n]||"",children:[e.jsxs(g,{sx:{display:"flex",alignItems:"center",gap:"10px",position:"absolute",backgroundColor:"#FFFF",borderRadius:`0px 0px ${u} 0px`,textDecoration:"none","&:hover":{textDecoration:"none"},padding:"6px 10px"},children:[e.jsx(D,{color:"grey.1000",variant:"headline2",sx:{fontSize:"16px"},children:r.values[d]}),e.jsx(h,{style:{color:"unset",width:16,height:16}})]}),e.jsx(B,{component:"img",image:p,style:{height:"100%",width:"100%",objectFit:"cover"}})]})})},r.rowId)};function c(r){const{sql:a,title:n,summaryText:d}=r,i=T(a),s={partMask:q|w,concreteType:"org.sagebionetworks.repo.model.table.QueryBundleRequest",entityId:i,query:{sql:a}},{data:t,isLoading:o}=b(s),p=m("Image",t),y=(t==null?void 0:t.queryResult.queryResults.rows)??[],I=m("Link",t),_=m("LinkText",t);return e.jsxs(g,{sx:{display:"grid",gridTemplateColumns:{xs:"1fr",md:"1fr 3fr"},gap:{xs:"38px",md:"80px"},padding:{xs:"40px",lg:"80px"}},children:[e.jsx(k,{title:n,summaryText:d,sx:{h2:{fontSize:"24px",paddingTop:"26px",width:"100%"},"& p":{fontSize:"16px",lineHeight:"24px"}}}),e.jsx(f,{container:!0,spacing:2.5,sx:{order:{xs:1,md:0}},children:y.map(l=>{const j=l.values[p];return e.jsx(N,{card:l,linkColumnIndex:I,linkTextColumnIndex:_,fileId:j,entityId:i,isLoading:o},l.rowId)})})]})}try{c.displayName="ImageCardGridWithLinks",c.__docgenInfo={description:"",displayName:"ImageCardGridWithLinks",props:{sql:{defaultValue:null,description:"",name:"sql",required:!0,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},summaryText:{defaultValue:null,description:"",name:"summaryText",required:!0,type:{name:"string"}}}}}catch{}export{c as I};
