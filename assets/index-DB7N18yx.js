import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{r as o}from"./index-Dl6G-zuu.js";import{E as g,R as S,a as u,b as x,F as _,c as F,d as R,e as T,B}from"./EntityTree-C6U5bvjE.js";import{r as C}from"./react-sizeme-C2W2PgBQ.js";import{M as N}from"./immutable.es-DHy1u56X.js";import{V as b}from"./EntityChildrenDetails-BkAhuoOf.js";import{E as l}from"./VerificationSubmission-DL9jxYsQ.js";import"./useFiles-DlHdYvDe.js";import"./StringUtils-By8SXO8c.js";import"./OrientationBanner-D9CLn5zV.js";import{u as I}from"./useEntity-C6AgTMJS.js";function i({parentContainerId:t,onSelect:c}){const{data:n}=I(t),[d,p]=o.useState(t),[E,y]=o.useState({items:[]}),f=o.useCallback(s=>{y({items:s})},[y]),w=(n==null?void 0:n.path.path[1].id)??void 0,m=N(),r=[l.FOLDER,l.FILE,l.LINK],h={type:g.PARENT_CONTAINER,parentContainerId:d??void 0,getProjectParams:{sort:"PROJECT_NAME"}};return e.jsx("div",{className:"EntityFileBrowser EntityFinderReflexContainer",children:e.jsx(C.SizeMe,{children:({size:s})=>e.jsxs(S,{orientation:"vertical",windowResizeAware:!0,children:[e.jsx(u,{className:"TreeViewReflexElement",flex:.24,children:e.jsx(x,{selectedEntities:m,setDetailsViewConfiguration:()=>{},showDropdown:!1,initialScope:_.CURRENT_PROJECT,projectId:w,initialContainer:t,currentContainer:d,setCurrentContainer:p,treeNodeType:F.DUAL_PANE,setBreadcrumbItems:f,selectableTypes:r,hideScopeSelector:!0,showScopeAsRootNode:!1})}),e.jsx(R,{}),e.jsxs(u,{className:"DetailsViewReflexElement",children:[e.jsx(T,{configuration:h,versionSelection:b.DISALLOWED,selected:m,isIdSelected:()=>!1,isSelectable:()=>!1,visibleTypes:r,selectableTypes:r,selectColumnType:"none",toggleSelection:a=>{Array.isArray(a)?c(a[0]):c(a)},enableSelectAll:!1,setCurrentContainer:p}),e.jsx(B,{...E})]})]},(!!s.width).toString())})})}try{i.displayName="EntityFileBrowser",i.__docgenInfo={description:`Entity File Browser.  Essentially an EntityFinder where selection will call back (to change the page to the target entity)
TODO: From EntityBadgeIcons, show unlink functionality (add onUnlink and onUnlinkError in EntityFileBrowserProps!) and showHasWiki.`,displayName:"EntityFileBrowser",props:{parentContainerId:{defaultValue:null,description:"",name:"parentContainerId",required:!0,type:{name:"string"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!0,type:{name:"(entity: Reference) => void"}}}}}catch{}try{i.displayName="EntityFileBrowser",i.__docgenInfo={description:`Entity File Browser.  Essentially an EntityFinder where selection will call back (to change the page to the target entity)
TODO: From EntityBadgeIcons, show unlink functionality (add onUnlink and onUnlinkError in EntityFileBrowserProps!) and showHasWiki.`,displayName:"EntityFileBrowser",props:{parentContainerId:{defaultValue:null,description:"",name:"parentContainerId",required:!0,type:{name:"string"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!0,type:{name:"(entity: Reference) => void"}}}}}catch{}export{i as E};
