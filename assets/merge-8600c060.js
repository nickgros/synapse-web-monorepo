import{S as M}from"./_Uint8Array-9fb6227a.js";import{e as x,a as D,k as v,c as F,f as G,h as I,i as P,j as S}from"./_baseClone-2f3174be.js";import{e as q}from"./_MapCache-bceaa486.js";import{b as w}from"./_baseFor-d254fa1e.js";import{aB as B,aC as L,aG as h,aD as C,by as R}from"./SynapseClient-c43c6534.js";import{a as b}from"./isArray-5e3f9107.js";import{i as T}from"./isArrayLikeObject-c369fda5.js";import{b as V}from"./_baseRest-052a6903.js";import{i as $}from"./_isIterateeCall-070c9793.js";function y(n){return V(function(e,i){var o=-1,r=i.length,a=r>1?i[r-1]:void 0,s=r>2?i[2]:void 0;for(a=n.length>3&&typeof a=="function"?(r--,a):void 0,s&&$(i[0],i[1],s)&&(a=r<3?void 0:a,r=1),e=Object(e);++o<r;){var f=i[o];f&&n(e,f,o,a)}return e})}function p(n,e,i){(i!==void 0&&!q(n[e],i)||i===void 0&&!(e in n))&&x(n,e,i)}function g(n,e){if(!(e==="constructor"&&typeof n[e]=="function")&&e!="__proto__")return n[e]}function E(n){return D(n,v(n))}function H(n,e,i,o,r,a,s){var f=g(n,i),t=g(e,i),O=s.get(t);if(O){p(n,i,O);return}var d=a?a(f,t,i+"",n,e,s):void 0,m=d===void 0;if(m){var l=b(t),u=!l&&B(t),A=!l&&!u&&L(t);d=t,l||u||A?b(f)?d=f:T(f)?d=F(f):u?(m=!1,d=G(t,!0)):A?(m=!1,d=I(t,!0)):d=[]:P(t)||h(t)?(d=f,h(f)?d=E(f):(!C(f)||R(f))&&(d=S(t))):m=!1}m&&(s.set(t,d),r(d,t,o,a,s),s.delete(t)),p(n,i,d)}function _(n,e,i,o,r){n!==e&&w(e,function(a,s){if(r||(r=new M),C(a))H(n,e,s,i,_,o,r);else{var f=o?o(g(n,s),a,s+"",n,e,r):void 0;f===void 0&&(f=a),p(n,s,f)}},v)}var J=y(function(n,e,i){_(n,e,i)});const z=J;export{_ as b,y as c,z as m,E as t};
//# sourceMappingURL=merge-8600c060.js.map
