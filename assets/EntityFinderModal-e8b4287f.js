import{a,F as i,j as n}from"./jsx-runtime-ad672792.js";import{r as l}from"./index-f1f749bf.js";import{F as u}from"./EntityModal-79d01643.js";import{W as c}from"./WarningModal-cab5ead1.js";import{e as m}from"./DetailsViewTableRenderers-d3279bc3.js";import{T as p}from"./Typography-f5dd8748.js";const f="Unsaved Changes",d=e=>{const[t,s]=l.useState([]),[r,o]=l.useState(!1);return a(i,{children:[n(c,{title:f,modalBody:"Any unsaved changes will be lost. Are you sure you want to close the finder?",show:r,confirmButtonText:"Close Finder",onConfirm:()=>{o(!1),e.onCancel()},onCancel:()=>{o(!1)}}),n(u,{className:r?"SRC-hidden":void 0,show:e.show,title:e.title,titlePopoverProps:e.titlePopoverProps,onClose:e.onClose,primaryAction:{copy:e.confirmButtonCopy,onClick:()=>{e.onConfirm(t)}},secondaryActions:[{copy:"Cancel",onClick:()=>{t.length>0?o(!0):e.onCancel()}}],children:a(i,{children:[n(p,{variant:"body1",children:e.promptCopy}),n(m,{...e.configuration,onSelectedChange:s})]})})]})};try{d.displayName="EntityFinderModal",d.__docgenInfo={description:"",displayName:"EntityFinderModal",props:{configuration:{defaultValue:null,description:"",name:"configuration",required:!0,type:{name:'Omit<EntityFinderProps, "onSelectedChange">'}},show:{defaultValue:null,description:"",name:"show",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},titlePopoverProps:{defaultValue:null,description:"",name:"titlePopoverProps",required:!1,type:{name:"HelpPopoverProps"}},onConfirm:{defaultValue:null,description:"",name:"onConfirm",required:!0,type:{name:"(selected: Reference[]) => void"}},confirmButtonCopy:{defaultValue:null,description:"",name:"confirmButtonCopy",required:!0,type:{name:"string"}},onCancel:{defaultValue:null,description:"",name:"onCancel",required:!0,type:{name:"() => void"}},promptCopy:{defaultValue:null,description:"",name:"promptCopy",required:!1,type:{name:"string"}}}}}catch{}export{d as E};
//# sourceMappingURL=EntityFinderModal-e8b4287f.js.map
