import{L as h,M as c}from"./_MapCache-bceaa486.js";import{aG as g,aB as y,aC as d,aE as m,aI as A,aJ as b}from"./SynapseClient-c43c6534.js";import{a as p,r as v}from"./isArray-5e3f9107.js";import{b as z}from"./_baseTimes-8cccc40f.js";import{i as S}from"./_isIndex-af14b756.js";var w=Object.prototype,O=w.hasOwnProperty;function I(t,e){var r=p(t),s=!r&&g(t),n=!r&&!s&&y(t),i=!r&&!s&&!n&&d(t),o=r||s||n||i,u=o?z(t.length,String):[],l=u.length;for(var a in t)(e||O.call(t,a))&&!(o&&(a=="length"||n&&(a=="offset"||a=="parent")||i&&(a=="buffer"||a=="byteLength"||a=="byteOffset")||S(a,l)))&&u.push(a);return u}function x(t){return m(t)?I(t):A(t)}function L(t,e){for(var r=-1,s=e.length,n=t.length;++r<s;)t[n+r]=e[r];return t}function P(){this.__data__=new h,this.size=0}function E(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}function G(t){return this.__data__.get(t)}function C(t){return this.__data__.has(t)}var K=200;function U(t,e){var r=this.__data__;if(r instanceof h){var s=r.__data__;if(!b||s.length<K-1)return s.push([t,e]),this.size=++r.size,this;r=this.__data__=new c(s)}return r.set(t,e),this.size=r.size,this}function f(t){var e=this.__data__=new h(t);this.size=e.size}f.prototype.clear=P;f.prototype.delete=E;f.prototype.get=G;f.prototype.has=C;f.prototype.set=U;function B(t,e){for(var r=-1,s=t==null?0:t.length,n=0,i=[];++r<s;){var o=t[r];e(o,r,t)&&(i[n++]=o)}return i}function M(){return[]}var R=Object.prototype,T=R.propertyIsEnumerable,_=Object.getOwnPropertySymbols,$=_?function(t){return t==null?[]:(t=Object(t),B(_(t),function(e){return T.call(t,e)}))}:M;const k=$;function D(t,e,r){var s=e(t);return p(t)?s:L(s,r(t))}function N(t){return D(t,x,k)}var F=v.Uint8Array;const Q=F;export{f as S,Q as U,L as a,I as b,k as c,D as d,B as e,N as g,x as k,M as s};
//# sourceMappingURL=_Uint8Array-9fb6227a.js.map
