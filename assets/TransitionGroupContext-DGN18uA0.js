import{r as n,R as c}from"./index-Dl6G-zuu.js";import{a as o}from"./useForkRef-CEBgoE3Z.js";function I(t){const r=n.useRef(t);return o(()=>{r.current=t}),n.useRef((...e)=>(0,r.current)(...e)).current}const u={};function i(t,r){const e=n.useRef(u);return e.current===u&&(e.current=t(r)),e}const a=[];function f(t){n.useEffect(t,a)}class s{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new s}start(r,e){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,e()},r)}}function d(){const t=i(s.create).current;return f(t.disposeEffect),t}const E=c.createContext(null);export{s as T,E as a,d as b,I as u};
