import{j as a}from"./jsx-runtime-Du8NFWEI.js";import{r as b}from"./index-Dl6G-zuu.js";import{d as re}from"./AddCircleTwoTone-C0VEGW6l.js";import{D as L,ab as B,e as Q}from"./index-CIIvWsNs.js";import{N as F,V as R,A as ie,B as oe,f as se,L as de,g as ue,h as C,i as ce,T as me,M as pe,u as ye,j as fe}from"./useEntitySelection-CKEG5cgv.js";import{bk as he,n as be,j as J,bl as ge}from"./SynapseClient-Dbc8tFdW.js";import"./OrientationBanner-x6ohh6pv.js";import{k as V,r as U,s as Se}from"./EntityTypeUtils-BpOAC-k-.js";import"./getEndpoint-CjoHA800.js";import{W as Ce,X as Ve}from"./HelpPopover-gM5cLes1.js";import{C as De}from"./Checkbox-DKy2JcHv.js";import{B as Ee}from"./LoadingScreen-xLLag3Pv.js";import{u as qe}from"./RequestDownloadCard-DrL-QmRK.js";import{S as we}from"./Skeleton-BnDUWcOg.js";import{a as ve}from"./useDownloadList-D825k7F5.js";import{d as $}from"./ToastMessage-B3LqsWhE.js";import{B as G}from"./Box-BlHPf8tq.js";import{B as Ie}from"./Button-jcEr4EiK.js";function P(t){const{data:s,isLoading:d}=qe(t.rowData.entityId,t.rowData.versionNumber);if(d)return a.jsx(we,{width:200});const l=s==null?void 0:s.fileHandles.find(c=>c.isPreview!==!0),m=l!=null&&l.contentSize?he(l==null?void 0:l.contentSize):"";return a.jsx("span",{children:m})}function O(t){return a.jsx(Ce,{entityId:t.rowData.entityId,entityVersionNumber:t.rowData.versionNumber,stopPropagation:!0})}try{P.displayName="SizeRenderer",P.__docgenInfo={description:"",displayName:"SizeRenderer",props:{cellData:{defaultValue:null,description:"",name:"cellData",required:!0,type:{name:"any"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"ColumnShape<T>[]"}},column:{defaultValue:null,description:"",name:"column",required:!0,type:{name:"ColumnShape<T>"}},columnIndex:{defaultValue:null,description:"",name:"columnIndex",required:!0,type:{name:"number"}},rowData:{defaultValue:null,description:"",name:"rowData",required:!0,type:{name:"EntityIdAndVersionNumber"}},rowIndex:{defaultValue:null,description:"",name:"rowIndex",required:!0,type:{name:"number"}},container:{defaultValue:null,description:"",name:"container",required:!0,type:{name:"BaseTable<T>"}},isScrolling:{defaultValue:null,description:"",name:"isScrolling",required:!1,type:{name:"boolean"}}}}}catch{}try{O.displayName="DownloadRenderer",O.__docgenInfo={description:"",displayName:"DownloadRenderer",props:{cellData:{defaultValue:null,description:"",name:"cellData",required:!0,type:{name:"any"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"ColumnShape<T>[]"}},column:{defaultValue:null,description:"",name:"column",required:!0,type:{name:"ColumnShape<T>"}},columnIndex:{defaultValue:null,description:"",name:"columnIndex",required:!0,type:{name:"number"}},rowData:{defaultValue:null,description:"",name:"rowData",required:!0,type:{name:"EntityIdAndVersionNumber"}},rowIndex:{defaultValue:null,description:"",name:"rowIndex",required:!0,type:{name:"number"}},container:{defaultValue:null,description:"",name:"container",required:!0,type:{name:"BaseTable<T>"}},isScrolling:{defaultValue:null,description:"",name:"isScrolling",required:!1,type:{name:"boolean"}}}}}catch{}const X=1200,Te=46,W=({entities:t,isLoading:s,hasNextPage:d,fetchNextPage:l,isFetchingNextPage:m,versionSelection:c,selectColumnType:D,selected:i,visibleTypes:y,selectableTypes:o,toggleSelection:p,sort:f,setSort:E,noResultsPlaceholder:_,enableSelectAll:v,selectAllIsChecked:g=!1,getChildrenInfiniteRequestObject:I,totalEntities:q,setCurrentContainer:N})=>{const A=be(),{accessToken:M,keyFactory:j}=J(),Z=D!=="none",[z,k]=b.useState(!1),[Y,T]=b.useState(!1),ee=()=>{I&&A.cancelQueries({queryKey:j.getEntityChildrenQueryKey(I,!0)}),T(!1),k(!1)},te=r=>y.includes(V(r))?o.includes(V(r))?i.has(r.id)?"selected":"default":"disabled":"hidden";b.useEffect(()=>{async function r(){z&&(d&&l?(T(!0),m||l()):(p(g?t.filter(e=>i.has(e.id)).map(e=>{const n=i.get(e.id);return{targetId:e.id,targetVersionNumber:n===F?void 0:n}}):await Promise.all(t.filter(e=>{const n=V(e);return!i.has(e.id)&&o.includes(n)&&y.includes(n)}).map(async e=>{var u;let n;if(c===R.REQUIRED&&U(V(e))&&(Object.prototype.hasOwnProperty.call(e,"versionNumber")&&(n=e.versionNumber),!n)){T(!0);const h=1,S=0;n=(u=(await A.fetchQuery({queryKey:j.getPaginatedEntityVersionsQueryKey(e.id,h,S),queryFn:()=>ge(e.id,M,S,h)})).results[0])==null?void 0:u.versionNumber}return{targetId:e.id,targetVersionNumber:n}}))),k(!1),T(!1)))}r()},[M,t,l,d,c,A,m,g,o,i,z,p,y,j]);const ne=t.reduce((r,e)=>{const n=te(e);if(n!=="hidden"){const u=V(e),h=i.get(e.id);let S;"versionNumber"in e&&(h!=null&&h!==F?S=h:c===R.REQUIRED&&(S=e.versionNumber)),r.push({...e,entityId:e.id,versionNumber:S,entityType:u,isSelected:n==="selected",isDisabled:n==="disabled",isVersionableEntity:U(u),currentSelectedVersion:h})}return r},[]),ae=b.useMemo(()=>{const r=d||t.filter(e=>o.includes(V(e))&&y.includes(V(e))).length>0;return v&&a.jsx("div",{"data-testid":"Select All",style:r?{cursor:"pointer"}:{cursor:"not-allowed"},onClick:()=>{r&&k(!0)},children:a.jsx(De,{label:"Select All",hideLabel:!0,className:"SRC-pointer-events-none",checked:g,disabled:!r,onChange:()=>{}})})},[v,t,d,g,o,y]),le=b.useCallback(r=>N&&Se(r.rowData.entityType)?a.jsx("span",{role:"link",className:"EntityFinderTableCellContainerLink",onClick:e=>{e.stopPropagation(),N(r.rowData.id)},children:r.rowData.name}):r.rowData.name,[N]),K={};return f&&(K[f.sortBy]=f.sortDirection.toLowerCase()),a.jsxs("div",{className:"EntityFinderDetailsView bootstrap-4-backport",children:[a.jsx(Ee,{show:Y,currentProgress:t.length,totalProgress:q,hintText:q?`${t.length.toLocaleString()} of ${q==null?void 0:q.toLocaleString()}`:`Fetching ${t.length.toLocaleString()}`,headlineText:"Fetching selected items",onCancel:ee}),a.jsx(ie,{className:"DetailsViewAutosizer",children:({height:r,width:e})=>a.jsxs(oe,{classPrefix:"DetailsViewTable",data:ne,height:r,width:e>X?e:X,rowHeight:Te,overscanRowCount:5,rowClassName:({rowIndex:n})=>{let u="EntityFinderDetailsViewRow";return n%2===0&&(u+=" isEven"),u},rowProps:({rowData:n})=>({"aria-selected":n.isSelected,"aria-disabled":n.isDisabled}),headerCellProps:{role:"columnheader"},sortState:K,components:{SortIndicator:se},onColumnSort:({key:n,order:u})=>{f&&E&&E(n,u==="asc"?L.ASC:L.DESC)},rowEventHandlers:{onClick:({rowData:n})=>{const{id:u,isDisabled:h,isVersionableEntity:S}=n;let{currentSelectedVersion:w}=n;h||(S&&c===R.REQUIRED&&w==null&&Object.prototype.hasOwnProperty.call(n,"versionNumber")&&(w=n.versionNumber),p({targetId:u,targetVersionNumber:w===F?void 0:w}))}},onEndReached:()=>{d&&l&&!m&&l()},emptyRenderer:s?de:()=>a.jsx(ue,{noResultsPlaceholder:_}),children:[Z&&a.jsx(C,{title:"",minWidth:50,maxWidth:50,width:50,dataKey:"isSelected",headerRenderer:ae,cellRenderer:ce},"isSelected"),a.jsx(C,{title:"",minWidth:45,maxWidth:45,width:45,dataKey:"entityType",align:"center",cellRenderer:me},"type"),a.jsx(C,{title:"File Name",width:500,sortable:f!=null,resizable:!0,cellRenderer:le},B.NAME),a.jsx(C,{title:"Size",width:200,sortable:!1,resizable:!0,cellRenderer:P},"SIZE"),a.jsx(C,{title:"Modified On",width:220,minWidth:170,sortable:f!=null,cellRenderer:pe},B.MODIFIED_ON),a.jsx(C,{width:130,dataKey:"id",title:"ID",minWidth:130},"id"),a.jsx(C,{title:"Actions",minWidth:100,maxWidth:100,width:100,cellRenderer:O},"actions")]})})]})};try{W.displayName="ChallengeDataTable",W.__docgenInfo={description:'Displays a list of entities in a table.\n\nIf the list of entities is paginated, the `hasNextPage` prop can be set to indicate that there is more data to load.\nWhen the view is ready to load more data, the `fetchNextPage` callback will be invoked. The view is designed to handle\nan "infinite scroll" pattern, so entities should not be removed from the list when loading the next page.',displayName:"ChallengeDataTable",props:{versionSelection:{defaultValue:null,description:"",name:"versionSelection",required:!0,type:{name:"enum",value:[{value:'"DISALLOWED"'},{value:'"REQUIRED"'},{value:'"TRACKED"'},{value:'"UNTRACKED"'}]}},selectColumnType:{defaultValue:null,description:"",name:"selectColumnType",required:!0,type:{name:"enum",value:[{value:'"none"'},{value:'"checkbox"'}]}},enableSelectAll:{defaultValue:null,description:"",name:"enableSelectAll",required:!0,type:{name:"boolean"}},visibleTypes:{defaultValue:null,description:"",name:"visibleTypes",required:!0,type:{name:"EntityType[]"}},selected:{defaultValue:null,description:"",name:"selected",required:!0,type:{name:"Map<string, number>"}},selectableTypes:{defaultValue:null,description:"",name:"selectableTypes",required:!0,type:{name:"EntityType[]"}},isIdSelected:{defaultValue:null,description:"",name:"isIdSelected",required:!0,type:{name:"(header: EntityFinderHeader) => boolean"}},isSelectable:{defaultValue:null,description:"",name:"isSelectable",required:!0,type:{name:"(header: EntityFinderHeader) => boolean"}},toggleSelection:{defaultValue:null,description:"",name:"toggleSelection",required:!0,type:{name:"(entity: Reference | Reference[]) => void"}},setCurrentContainer:{defaultValue:null,description:"",name:"setCurrentContainer",required:!1,type:{name:"Dispatch<SetStateAction<EntityTreeContainer>>"}},entities:{defaultValue:null,description:"",name:"entities",required:!0,type:{name:"EntityFinderHeader[]"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!0,type:{name:"boolean"}},hasNextPage:{defaultValue:null,description:"",name:"hasNextPage",required:!1,type:{name:"boolean"}},fetchNextPage:{defaultValue:null,description:"",name:"fetchNextPage",required:!1,type:{name:"(() => Promise<any>)"}},isFetchingNextPage:{defaultValue:null,description:"",name:"isFetchingNextPage",required:!1,type:{name:"boolean"}},sort:{defaultValue:null,description:"The current sort of the view. If the view cannot be sorted, set this to `undefined`",name:"sort",required:!1,type:{name:"{ sortBy: SortBy; sortDirection: Direction; }"}},setSort:{defaultValue:null,description:"If sortable, `setSort` will be invoked when the user tries to change the sort",name:"setSort",required:!1,type:{name:"((soryBy: SortBy, sortDirection: Direction) => void)"}},noResultsPlaceholder:{defaultValue:null,description:"",name:"noResultsPlaceholder",required:!1,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},selectAllIsChecked:{defaultValue:{value:"false"},description:"We defer to the configuration component to determine this",name:"selectAllIsChecked",required:!1,type:{name:"boolean"}},getChildrenInfiniteRequestObject:{defaultValue:null,description:"This request object is only used to tell react-query to cancel fetching all children at once.",name:"getChildrenInfiniteRequestObject",required:!1,type:{name:"EntityChildrenRequest"}},totalEntities:{defaultValue:null,description:"The total number of entities that can be retrieved",name:"totalEntities",required:!1,type:{name:"number"}}}}}catch{}const H=({parentContainerId:t,...s})=>{const[d,l]=b.useState(B.NAME),[m,c]=b.useState(L.ASC),D={parentId:t,includeTotalChildCount:!0,includeTypes:s.visibleTypes,sortBy:d,sortDirection:m},{data:i,isLoading:y,isFetchingNextPage:o,hasNextPage:p,fetchNextPage:f}=Ve(D,{throwOnError:!0}),E=(i==null?void 0:i.pages.flatMap(g=>g.page))??[],_=i==null?void 0:i.pages[0].totalChildCount,v=ye(E,s.selected.size,s.isIdSelected,s.isSelectable,p,f,o);return a.jsx(W,{entities:E,isLoading:y,hasNextPage:p,fetchNextPage:f,isFetchingNextPage:o,sort:{sortBy:d,sortDirection:m},setSort:(g,I)=>{l(g),c(I)},selectAllIsChecked:v,getChildrenInfiniteRequestObject:D,totalEntities:_,...s})};try{H.displayName="ChallengeEntityChildrenDetails",H.__docgenInfo={description:"",displayName:"ChallengeEntityChildrenDetails",props:{versionSelection:{defaultValue:null,description:"",name:"versionSelection",required:!0,type:{name:"enum",value:[{value:'"DISALLOWED"'},{value:'"REQUIRED"'},{value:'"TRACKED"'},{value:'"UNTRACKED"'}]}},selectColumnType:{defaultValue:null,description:"",name:"selectColumnType",required:!0,type:{name:"enum",value:[{value:'"none"'},{value:'"checkbox"'}]}},enableSelectAll:{defaultValue:null,description:"",name:"enableSelectAll",required:!0,type:{name:"boolean"}},visibleTypes:{defaultValue:null,description:"",name:"visibleTypes",required:!0,type:{name:"EntityType[]"}},selected:{defaultValue:null,description:"",name:"selected",required:!0,type:{name:"Map<string, number>"}},selectableTypes:{defaultValue:null,description:"",name:"selectableTypes",required:!0,type:{name:"EntityType[]"}},isIdSelected:{defaultValue:null,description:"",name:"isIdSelected",required:!0,type:{name:"(header: EntityFinderHeader) => boolean"}},isSelectable:{defaultValue:null,description:"",name:"isSelectable",required:!0,type:{name:"(header: EntityFinderHeader) => boolean"}},toggleSelection:{defaultValue:null,description:"",name:"toggleSelection",required:!0,type:{name:"(entity: Reference | Reference[]) => void"}},setCurrentContainer:{defaultValue:null,description:"",name:"setCurrentContainer",required:!1,type:{name:"Dispatch<SetStateAction<EntityTreeContainer>>"}},parentContainerId:{defaultValue:null,description:"",name:"parentContainerId",required:!0,type:{name:"string"}}}}}catch{}function x({parentContainerId:t}){const{downloadCartPageUrl:s}=J(),d=!0,[l,m]=fe(d),{mutate:c}=ve({onSuccess:()=>{$("File(s) were successfully added to your Download Cart.","success",{primaryButtonConfig:{text:"View Download Cart",onClick:()=>window.location.href=s}})},onError:o=>{$(`Unable to add the file to your Download Cart. ${o.reason}`,"danger")}}),D=b.useCallback(o=>l.has(o.id),[l]),i=b.useCallback(()=>{const o=l.toArray().map(p=>({fileEntityId:p[0],versionNumber:p[1]}));c(o)},[l,c]),y={versionSelection:R.REQUIRED,selectColumnType:"checkbox",enableSelectAll:!0,visibleTypes:[Q.FILE],selected:l,selectableTypes:[Q.FILE],isIdSelected:D,isSelectable:()=>!0,toggleSelection:m};return a.jsxs(a.Fragment,{children:[a.jsx(G,{children:a.jsx(H,{parentContainerId:t,...y})}),a.jsx(G,{mt:4,children:a.jsx(Ie,{endIcon:a.jsx(re,{}),variant:"outlined",sx:{alignSelf:"flex-end",height:"47px"},onClick:i,disabled:!l.toArray().length,children:"Add to Download Cart"})})]})}try{x.displayName="ChallengeDataDownload",x.__docgenInfo={description:"",displayName:"ChallengeDataDownload",props:{parentContainerId:{defaultValue:null,description:"",name:"parentContainerId",required:!0,type:{name:"string"}}}}}catch{}try{x.displayName="ChallengeDataDownload",x.__docgenInfo={description:"",displayName:"ChallengeDataDownload",props:{parentContainerId:{defaultValue:null,description:"",name:"parentContainerId",required:!0,type:{name:"string"}}}}}catch{}try{ChallengeDataTable.displayName="ChallengeDataTable",ChallengeDataTable.__docgenInfo={description:'Displays a list of entities in a table.\n\nIf the list of entities is paginated, the `hasNextPage` prop can be set to indicate that there is more data to load.\nWhen the view is ready to load more data, the `fetchNextPage` callback will be invoked. The view is designed to handle\nan "infinite scroll" pattern, so entities should not be removed from the list when loading the next page.',displayName:"ChallengeDataTable",props:{versionSelection:{defaultValue:null,description:"",name:"versionSelection",required:!0,type:{name:"enum",value:[{value:'"DISALLOWED"'},{value:'"REQUIRED"'},{value:'"TRACKED"'},{value:'"UNTRACKED"'}]}},selectColumnType:{defaultValue:null,description:"",name:"selectColumnType",required:!0,type:{name:"enum",value:[{value:'"none"'},{value:'"checkbox"'}]}},enableSelectAll:{defaultValue:null,description:"",name:"enableSelectAll",required:!0,type:{name:"boolean"}},visibleTypes:{defaultValue:null,description:"",name:"visibleTypes",required:!0,type:{name:"EntityType[]"}},selected:{defaultValue:null,description:"",name:"selected",required:!0,type:{name:"Map<string, number>"}},selectableTypes:{defaultValue:null,description:"",name:"selectableTypes",required:!0,type:{name:"EntityType[]"}},isIdSelected:{defaultValue:null,description:"",name:"isIdSelected",required:!0,type:{name:"(header: EntityFinderHeader) => boolean"}},isSelectable:{defaultValue:null,description:"",name:"isSelectable",required:!0,type:{name:"(header: EntityFinderHeader) => boolean"}},toggleSelection:{defaultValue:null,description:"",name:"toggleSelection",required:!0,type:{name:"(entity: Reference | Reference[]) => void"}},setCurrentContainer:{defaultValue:null,description:"",name:"setCurrentContainer",required:!1,type:{name:"Dispatch<SetStateAction<EntityTreeContainer>>"}},entities:{defaultValue:null,description:"",name:"entities",required:!0,type:{name:"EntityFinderHeader[]"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!0,type:{name:"boolean"}},hasNextPage:{defaultValue:null,description:"",name:"hasNextPage",required:!1,type:{name:"boolean"}},fetchNextPage:{defaultValue:null,description:"",name:"fetchNextPage",required:!1,type:{name:"(() => Promise<any>)"}},isFetchingNextPage:{defaultValue:null,description:"",name:"isFetchingNextPage",required:!1,type:{name:"boolean"}},sort:{defaultValue:null,description:"The current sort of the view. If the view cannot be sorted, set this to `undefined`",name:"sort",required:!1,type:{name:"{ sortBy: SortBy; sortDirection: Direction; }"}},setSort:{defaultValue:null,description:"If sortable, `setSort` will be invoked when the user tries to change the sort",name:"setSort",required:!1,type:{name:"((soryBy: SortBy, sortDirection: Direction) => void)"}},noResultsPlaceholder:{defaultValue:null,description:"",name:"noResultsPlaceholder",required:!1,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},selectAllIsChecked:{defaultValue:{value:"false"},description:"We defer to the configuration component to determine this",name:"selectAllIsChecked",required:!1,type:{name:"boolean"}},getChildrenInfiniteRequestObject:{defaultValue:null,description:"This request object is only used to tell react-query to cancel fetching all children at once.",name:"getChildrenInfiniteRequestObject",required:!1,type:{name:"EntityChildrenRequest"}},totalEntities:{defaultValue:null,description:"The total number of entities that can be retrieved",name:"totalEntities",required:!1,type:{name:"number"}}}}}catch{}export{x as C};
