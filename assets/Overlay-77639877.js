import{_ as s}from"./extends-98964cd2.js";import{_ as M}from"./objectWithoutPropertiesLoose-4f48578a.js";import{R as C,r as F}from"./index-f1f749bf.js";import{c as z}from"./Button-7d415009.js";import{p as o}from"./index-4d501b15.js";import{R as G}from"./index-96c5f47c.js";import{u as N}from"./contains-33365353.js";import{u as I,a as J,m as K,b as Q,c as V,s as T}from"./usePopperMarginModifiers-95563bac.js";import{u as $}from"./useWaitForDOMRef-54076dc2.js";import{p as X}from"./Clear-a9f76abf.js";import{F as j}from"./divWithClassName-1aeead00.js";var D=C.forwardRef(function(e,r){var t=e.flip,a=e.offset,n=e.placement,l=e.containerPadding,y=l===void 0?5:l,d=e.popperConfig,R=d===void 0?{}:d,u=e.transition,E=N(),i=E[0],h=E[1],f=N(),m=f[0],v=f[1],P=I(h,r),p=$(e.container),g=$(e.target),w=F.useState(!e.show),c=w[0],b=w[1],x=J(g,i,K({placement:n,enableEvents:!!e.show,containerPadding:y||5,flip:t,offset:a,arrowElement:m,popperConfig:R})),_=x.styles,H=x.attributes,U=M(x,["styles","attributes"]);e.show?c&&b(!1):!e.transition&&!c&&b(!0);var W=function(){b(!0),e.onExited&&e.onExited.apply(e,arguments)},k=e.show||u&&!c;if(Q(i,e.onHide,{disabled:!e.rootClose||e.rootCloseDisabled,clickTrigger:e.rootCloseEvent}),!k)return null;var O=e.children(s({},U,{show:!!e.show,props:s({},H.popper,{style:_.popper,ref:P}),arrowProps:s({},H.arrow,{style:_.arrow,ref:v})}));if(u){var q=e.onExit,A=e.onExiting,S=e.onEnter,B=e.onEntering,L=e.onEntered;O=C.createElement(u,{in:e.show,appear:!0,onExit:q,onExiting:A,onExited:W,onEnter:S,onEntering:B,onEntered:L},O)}return p?G.createPortal(O,p):null});D.displayName="Overlay";D.propTypes={show:o.bool,placement:o.oneOf(X),target:o.any,container:o.any,flip:o.bool,children:o.func.isRequired,containerPadding:o.number,popperConfig:o.object,rootClose:o.bool,rootCloseEvent:o.oneOf(["click","mousedown"]),rootCloseDisabled:o.bool,onHide:function(r){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];if(r.rootClose){var l;return(l=o.func).isRequired.apply(l,[r].concat(a))}return o.func.apply(o,[r].concat(a))},transition:o.elementType,onEnter:o.func,onEntering:o.func,onEntered:o.func,onExit:o.func,onExiting:o.func,onExited:o.func};var Y=["children","transition","popperConfig"],Z=["props","arrowProps","show","update","forceUpdate","placement","state"],ee={transition:j,rootClose:!1,show:!1,placement:"top"};function oe(e,r){var t=e.ref,a=r.ref;e.ref=t.__wrapped||(t.__wrapped=function(n){return t(T(n))}),r.ref=a.__wrapped||(a.__wrapped=function(n){return a(T(n))})}function re(e){var r=e.children,t=e.transition,a=e.popperConfig,n=a===void 0?{}:a,l=M(e,Y),y=F.useRef({}),d=V(),R=d[0],u=d[1],E=t===!0?j:t||null;return C.createElement(D,s({},l,{ref:R,popperConfig:s({},n,{modifiers:u.concat(n.modifiers||[])}),transition:E}),function(i){var h,f=i.props,m=i.arrowProps,v=i.show,P=i.update;i.forceUpdate;var p=i.placement,g=i.state,w=M(i,Z);oe(f,m);var c=Object.assign(y.current,{state:g,scheduleUpdate:P,placement:p,outOfBoundaries:(g==null||(h=g.modifiersData.hide)==null?void 0:h.isReferenceHidden)||!1});return typeof r=="function"?r(s({},w,f,{placement:p,show:v},!t&&v&&{className:"show"},{popper:c,arrowProps:m})):C.cloneElement(r,s({},w,f,{placement:p,arrowProps:m,popper:c,className:z(r.props.className,!t&&v&&"show"),style:s({},r.props.style,f.style)}))})}re.defaultProps=ee;export{re as O};
//# sourceMappingURL=Overlay-77639877.js.map
