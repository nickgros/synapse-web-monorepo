import{i as n}from"./_baseTimes-36S_kd0L.js";import{i as f}from"./isSymbol-VqtJwUUo.js";var o=/\s/;function c(r){for(var t=r.length;t--&&o.test(r.charAt(t)););return t}var m=/^\s+/;function I(r){return r&&r.slice(0,c(r)+1).replace(m,"")}var s=NaN,p=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,b=/^0o[0-7]+$/i,d=parseInt;function y(r){if(typeof r=="number")return r;if(f(r))return s;if(n(r)){var t=typeof r.valueOf=="function"?r.valueOf():r;r=n(t)?t+"":t}if(typeof r!="string")return r===0?r:+r;r=I(r);var i=a.test(r);return i||b.test(r)?d(r.slice(2),i?2:8):p.test(r)?s:+r}var e=1/0,N=17976931348623157e292;function x(r){if(!r)return r===0?r:0;if(r=y(r),r===e||r===-e){var t=r<0?-1:1;return t*N}return r===r?r:0}function A(r){var t=x(r),i=t%1;return t===t?i?t-i:t:0}export{y as a,x as b,I as c,c as d,A as t};
