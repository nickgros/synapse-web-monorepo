import{j as l}from"./jsx-runtime-Du8NFWEI.js";import{C as g}from"./ComplexMenu-BXAYLYF-.js";import{I as d}from"./IconSvg-B_5LF0ig.js";function x(i,e){return Object.fromEntries(Object.entries(i).filter(([o,n])=>!n||!n.visible?!1:![...e.buttonActions,...e.primaryMenuActions.flat(),...e.downloadMenuActions.flat()].some(c=>c.action===o)))}function M(i,e){return i.reduce((o,n)=>{const t=e[n.action];return t&&t.visible&&o.push({text:t.text??n.action,onClick:t.onClick,href:t.href,tooltipText:t.tooltipText,disabled:t.disabled,icon:n.icon,textSx:n.textSx,iconSx:n.iconSx}),o},[])}function p(i,e){return i.reduce((o,n)=>{const t=M(n,e);return t.length>0&&o.push(t),o},[])}function f(i){const{actionConfiguration:e,menuConfiguration:o,layout:n}=i,t=x(e,n);Object.entries(t).length>0&&(console.warn("Actions are visible but have not been configured in the layout:",Object.entries(t).map(r=>r[0])),n.primaryMenuActions.unshift(Object.entries(t).map(r=>({action:r[0]}))));const c=n.buttonActions.reduce((r,u)=>{const a=e[u.action];if(a&&a.visible){let s=a.onClick;s==null&&(console.warn(`No handler registered for ${u.action}`),s=()=>{console.warn(`No handler registered for ${u.action}`)}),r.push({icon:u.icon,onClick:s,tooltipText:a.text,disabled:a.disabled})}return r},[]),m={dropdownButtonText:"Download Options",convertSingleItemToButton:!1,renderMenuIfNoItems:!1,buttonTooltip:o.DOWNLOAD.tooltipText,buttonProps:{disabled:o.DOWNLOAD.disabled,endIcon:l.jsx(d,{icon:"download",wrap:!1})},items:p(n.downloadMenuActions,e)},y={dropdownButtonText:n.primaryMenuText,convertSingleItemToButton:!0,renderMenuIfNoItems:!1,buttonProps:{endIcon:l.jsx(d,{icon:n.primaryMenuEndIcon,wrap:!1})},items:p(n.primaryMenuActions,e)};return l.jsx(g,{iconButtons:c,dropdownMenus:[m,y]})}try{f.displayName="EntityActionMenu",f.__docgenInfo={description:"The EntityActionMenu renders a menu that displays the actions that can be invoked on an Entity page.",displayName:"EntityActionMenu",props:{actionConfiguration:{defaultValue:null,description:"",name:"actionConfiguration",required:!0,type:{name:"ActionConfigurationMap"}},menuConfiguration:{defaultValue:null,description:"",name:"menuConfiguration",required:!0,type:{name:"MenuConfigurationMap"}},layout:{defaultValue:null,description:"",name:"layout",required:!0,type:{name:"EntityActionMenuLayout"}}}}}catch{}export{f as E};
