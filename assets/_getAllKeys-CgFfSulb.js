import{a as u}from"./isArray-D3Xc0Edl.js";import{a as o}from"./_Uint8Array-DkdoQoHp.js";import{b as f}from"./_getTag-B6zWmB6G.js";import{a as m}from"./_Map-W_LbVzGG.js";function y(r){return m(r)?o(r):f(r)}function p(r,t){for(var e=-1,n=t.length,s=r.length;++e<n;)r[s+e]=t[e];return r}function g(r,t){for(var e=-1,n=r==null?0:r.length,s=0,a=[];++e<n;){var i=r[e];t(i,e,r)&&(a[s++]=i)}return a}function h(){return[]}var v=Object.prototype,b=v.propertyIsEnumerable,l=Object.getOwnPropertySymbols,c=l?function(r){return r==null?[]:(r=Object(r),g(l(r),function(t){return b.call(r,t)}))}:h;function A(r,t,e){var n=t(r);return u(r)?n:p(n,e(r))}function O(r){return A(r,y,c)}export{p as a,c as b,A as c,g as d,O as g,y as k,h as s};
