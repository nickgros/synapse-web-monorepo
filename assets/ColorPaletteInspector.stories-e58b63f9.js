import{a as o,j as a}from"./jsx-runtime-ad672792.js";import{r as h}from"./index-f1f749bf.js";import{a as m,C as u}from"./colorPalette-c43701fe.js";import"./_commonjsHelpers-042e6b4d.js";const n=({initialColor:e})=>{const[t,r]=h.useState(e);return o("div",{children:[a("input",{value:t,style:{width:"135px"},onChange:c=>r(c.target.value)}),a("div",{style:{background:t,width:"135px",height:"135px",borderRadius:"150px"}})]})},p=()=>o("div",{children:[a("h2",{children:"Color Palette Odd"}),a("div",{style:{display:"flex",flexWrap:"wrap"},children:m.reduce((e,t,r)=>(r%5===0?e.push([t]):e[e.length-1].push(t))&&e,[]).map((e,t)=>o("div",{style:{margin:"5px"},children:[o("h4",{children:["Odd palette ",t]}),e.map(r=>a(n,{initialColor:r},r))]},"odd"+t))}),a("hr",{}),a("h2",{children:"Color Palette Even"}),a("div",{style:{display:"flex",flexWrap:"wrap"},children:u.reduce((e,t,r)=>(r%5===0?e.push([t]):e[e.length-1].push(t))&&e,[]).map((e,t)=>o("div",{style:{margin:"5px"},children:[o("h4",{children:["Even palette ",t]}),e.map(r=>a(n,{initialColor:r},r))]},"even"+t))})," "]});try{p.displayName="ColorPaletteInspector",p.__docgenInfo={description:"",displayName:"ColorPaletteInspector",props:{}}}catch{}const g={title:"UI/ColorPaletteInspector",component:p},l={};var i,s,d;l.parameters={...l.parameters,docs:{...(i=l.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(d=(s=l.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};const y=["Demo"];export{l as Demo,y as __namedExportsOrder,g as default};
//# sourceMappingURL=ColorPaletteInspector.stories-e58b63f9.js.map
