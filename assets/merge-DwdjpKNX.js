import{e as M,S as x}from"./_Uint8Array-kXJ5rGjS.js";import{b as F,c as I,k as v,a as P,d as S,e as q,i as w}from"./_initCloneObject-CtX8iLDk.js";import{b as D}from"./_baseFor-CpEDs2Sd.js";import{c as G,d as L,e as b,i as _,f as R}from"./_Map-CWVOAJuy.js";import{a as h}from"./isArray-ggc3KxVp.js";import{i as T}from"./isArrayLikeObject-B_fWDeJs.js";import{i as V}from"./isPlainObject-r6ak-40U.js";import{b as B}from"./_baseRest-DLYcpUSj.js";import{i as E}from"./_isIterateeCall-DQ3bmrSf.js";function H(n){return B(function(i,e){var o=-1,r=e.length,a=r>1?e[r-1]:void 0,s=r>2?e[2]:void 0;for(a=n.length>3&&typeof a=="function"?(r--,a):void 0,s&&E(e[0],e[1],s)&&(a=r<3?void 0:a,r=1),i=Object(i);++o<r;){var f=e[o];f&&n(i,f,o,a)}return i})}function p(n,i,e){(e!==void 0&&!M(n[i],e)||e===void 0&&!(i in n))&&F(n,i,e)}function g(n,i){if(!(i==="constructor"&&typeof n[i]=="function")&&i!="__proto__")return n[i]}function J(n){return I(n,v(n))}function K(n,i,e,o,r,a,s){var f=g(n,e),t=g(i,e),O=s.get(t);if(O){p(n,e,O);return}var d=a?a(f,t,e+"",n,i,s):void 0,l=d===void 0;if(l){var m=h(t),u=!m&&G(t),A=!m&&!u&&L(t);d=t,m||u||A?h(f)?d=f:T(f)?d=P(f):u?(l=!1,d=S(t,!0)):A?(l=!1,d=q(t,!0)):d=[]:V(t)||b(t)?(d=f,b(f)?d=J(f):(!_(f)||R(f))&&(d=w(t))):l=!1}l&&(s.set(t,d),r(d,t,o,a,s),s.delete(t)),p(n,e,d)}function C(n,i,e,o,r){n!==i&&D(i,function(a,s){if(r||(r=new x),_(a))K(n,i,s,e,C,o,r);else{var f=o?o(g(n,s),a,s+"",n,i,r):void 0;f===void 0&&(f=a),p(n,s,f)}},v)}var c=H(function(n,i,e){C(n,i,e)});export{C as b,H as c,c as m,J as t};
