import{r as s}from"./index-f1f749bf.js";const d=768;function u(r){const e=r??d,[t,i]=s.useState(window.innerWidth>e);return s.useEffect(()=>{const n=()=>{const o=window.innerWidth>e;o!==t&&i(o)};return window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n)}}),t}export{u};
//# sourceMappingURL=useShowDesktop-5e97065b.js.map
