import{S as s,a as g}from"./isArray-5e3f9107.js";import{i as l}from"./isSymbol-7c514724.js";function p(r,t){for(var n=-1,o=r==null?0:r.length,i=Array(o);++n<o;)i[n]=t(r[n],n,r);return i}var u=1/0,e=s?s.prototype:void 0,f=e?e.toString:void 0;function m(r){if(typeof r=="string")return r;if(g(r))return p(r,m)+"";if(l(r))return f?f.call(r):"";var t=r+"";return t=="0"&&1/r==-u?"-0":t}function y(r){return r==null?"":m(r)}export{p as a,m as b,y as t};
//# sourceMappingURL=toString-cc90cb98.js.map
