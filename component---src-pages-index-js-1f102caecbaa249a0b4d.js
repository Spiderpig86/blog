(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{RXBc:function(e,t,r){"use strict";r.r(t);r("E5k/"),r("gu/5"),r("eoYm");var a=r("q1tI"),n=r.n(a),o=r("+ZDr"),l=r.n(o),i=r("aArQ"),s=(r("YbXK"),r("cFtU"),r("q8oJ"),r("m210"),r("4DPX"),r("zGcK"),r("rzGZ"),r("Dq+y"),r("8npG"),r("Ggvi"),r("HQhv"),r("yNYL")),u=r.n(s),c={prologueComponent:{textAlign:"center"},prologueTagContainer:{display:"flex",justifyContent:"flex-end",marginTop:"3rem"},prologueTagItem:{cursor:"pointer",padding:"0.25rem",textTransform:"capitalize"},prologueSocial:{display:"flex",justifyContent:"center"},prologueSocialItem:{padding:"1rem"}};function p(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var f=function(e){var t,r;function a(t){var r;return(r=e.call(this,t)||this).state={curTagFilter:"All"},r}r=e,(t=a).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r;var o=a.prototype;return o.render=function(){var e=this;return n.a.createElement("div",{className:"prologue-component",style:c.prologueComponent},n.a.createElement("h1",null,"Blog"),n.a.createElement("p",null,"Writing about whatever comes to mind."),n.a.createElement("div",{style:c.prologueSocial},n.a.createElement("a",{className:"prologue__social-links",href:"https://github.com/Spiderpig86",rel:"noopener noreferrer",target:"_blank"},n.a.createElement(u.a,{name:"github",style:c.prologueSocialItem})),n.a.createElement("a",{className:"prologue__social-links",href:"https://www.linkedin.com/in/serbis/",rel:"noopener noreferrer",target:"_blank"},n.a.createElement(u.a,{name:"linkedin",style:c.prologueSocialItem})),n.a.createElement("a",{className:"prologue__social-links",href:"https://medium.com/@serbis",rel:"noopener noreferrer",target:"_blank"},n.a.createElement(u.a,{name:"medium",style:c.prologueSocialItem})),n.a.createElement("a",{className:"prologue__social-links",href:"https://www.instagram.com/dammitstan/",rel:"noopener noreferrer",target:"_blank"},n.a.createElement(u.a,{name:"instagram",style:c.prologueSocialItem})),n.a.createElement("a",{className:"prologue__social-links",href:"http://stanleylim.me",rel:"noopener noreferrer",target:"_blank"},n.a.createElement(u.a,{name:"globe",style:c.prologueSocialItem}))),n.a.createElement("div",{style:c.prologueTagContainer},this.getTopTags().map((function(t,r){return n.a.createElement("span",{className:e.state.curTagFilter===t?"tag selected":"tag",onClick:function(){return e.filterPosts(t)},style:c.prologueTagItem,key:r},t)}))))},o.getTopTags=function(){var e=this.props.blogPosts.map((function(e){return e.node.frontmatter.tags})).join(",").split(",").reduce((function(e,t){return void 0===e[t]?e[t]=1:e[t]+=1,e}),{}),t=Object.keys(e);return t.sort((function(t,r){return e[r]-e[t]})),["All"].concat(p(t.slice(0,4)))},o.filterPosts=function(e){this.setState({curTagFilter:e}),this.props.updateSelectedTag(e)},a}(a.Component),m=r("RxB4"),d=r.n(m),h=r("zzgX");r.d(t,"default",(function(){return g})),r.d(t,"pageQuery",(function(){return y}));var g=function(e){var t,r;function a(t){var r;return(r=e.call(this,t)||this).state={curTag:"All"},r}r=e,(t=a).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r;var o=a.prototype;return o.hasTag=function(e){return"All"===this.state.curTag||e.node.frontmatter.tags.includes(this.state.curTag)},o.updateSelectedTag=function(e){this.setState({curTag:e})},o.render=function(){var e=this,t=this.props.data.allMarkdownRemark.edges;return n.a.createElement(i.a,null,n.a.createElement("div",{className:"blog-posts"},n.a.createElement(f,{blogPosts:t,updateSelectedTag:this.updateSelectedTag.bind(this)}),t.filter((function(t){return t.node.frontmatter.title.length>0&&e.hasTag(t)})).map((function(e){var t=e.node;return n.a.createElement("div",{className:"blog-post-preview",key:t.id},n.a.createElement(l.a,{to:t.frontmatter.path},n.a.createElement("h1",null,t.frontmatter.title)),n.a.createElement("h2",{style:{color:"var(--text-normal)",fontFamily:"Montserrat",fontSize:"0.9rem"}},t.frontmatter.date),n.a.createElement("h2",{className:"bold",style:{borderLeft:"2px solid var(--text-normal)",color:"var(--text-normal)",fontSize:"0.9rem",fontWeight:700,marginTop:"0rem",paddingLeft:"0.5rem"}},t.timeToRead," ",1===t.timeToRead?"minute":"minutes"),n.a.createElement("p",null,t.excerpt),t.frontmatter.tags.map((function(e,t){var r=new d.a({lightness:.5}).hex(e);return n.a.createElement(l.a,{to:"/tag/"+e,style:Object.assign({},h.a.tagStyle,{backgroundColor:r,color:"#fff"}),key:t},e)})))}))))},a}(a.Component),y="2827184399"},RxB4:function(e,t,r){r("AqHK"),r("q8oJ"),r("C9fy"),r("8npG"),r("JHok");var a=r("xlcS"),n=function(e,t,r){var a=r<.5?r*(1+t):r+t-r*t,n=2*r-a;return[(e/=360)+1/3,e,e-1/3].map((function(e){return e<0&&e++,e>1&&e--,e=e<1/6?n+6*(a-n)*e:e<.5?a:e<2/3?n+6*(a-n)*(2/3-e):n,Math.round(255*e)}))},o=function(e){var t=[(e=e||{}).lightness,e.saturation].map((function(e){return e=e||[.35,.5,.65],"[object Array]"===Object.prototype.toString.call(e)?e.concat():[e]}));this.L=t[0],this.S=t[1],this.hash=e.hash||a};o.prototype.hsl=function(e){var t,r,a=this.hash(e);return t=a%359,a=parseInt(a/360),r=this.S[a%this.S.length],a=parseInt(a/this.S.length),[t,r,this.L[a%this.L.length]]},o.prototype.rgb=function(e){var t=this.hsl(e);return n.apply(this,t)},o.prototype.hex=function(e){var t,r=this.rgb(e);return t="#",r.forEach((function(e){e<16&&(t+=0),t+=e.toString(16)})),t},e.exports=o},lAWe:function(e,t,r){"use strict";r("R48M"),Object.defineProperty(t,"__esModule",{value:!0}),t.default={position:"absolute",width:"1px",height:"1px",padding:"0px",margin:"-1px",overflow:"hidden",clip:"rect(0px, 0px, 0px, 0px)",border:"0px"},e.exports=t.default},xlcS:function(e,t){e.exports=function(e){var t=0;e+="x";for(var r=parseInt(65745979961613.07),a=0;a<e.length;a++)t>r&&(t=parseInt(t/137)),t=131*t+e.charCodeAt(a);return t}},yNYL:function(e,t,r){"use strict";r("pJf4"),r("LagC"),r("pS08"),r("sc67"),r("E5k/"),r("R48M"),Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},n=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),o=s(r("q1tI")),l=s(r("17x9")),i=s(r("lAWe"));function s(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.displayName="FontAwesome",e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),n(t,[{key:"render",value:function(){var e=this.props,t=e.border,r=e.cssModule,n=e.className,l=e.fixedWidth,s=e.flip,u=e.inverse,c=e.name,p=e.pulse,f=e.rotate,m=e.size,d=e.spin,h=e.stack,g=e.tag,y=void 0===g?"span":g,b=e.ariaLabel,v=function(e,t){var r={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(r[a]=e[a]);return r}(e,["border","cssModule","className","fixedWidth","flip","inverse","name","pulse","rotate","size","spin","stack","tag","ariaLabel"]),x=[];return r?(x.push(r.fa),x.push(r["fa-"+c]),m&&x.push(r["fa-"+m]),d&&x.push(r["fa-spin"]),p&&x.push(r["fa-pulse"]),t&&x.push(r["fa-border"]),l&&x.push(r["fa-fw"]),u&&x.push(r["fa-inverse"]),s&&x.push(r["fa-flip-"+s]),f&&x.push(r["fa-rotate-"+f]),h&&x.push(r["fa-stack-"+h])):(x.push("fa"),x.push("fa-"+c),m&&x.push("fa-"+m),d&&x.push("fa-spin"),p&&x.push("fa-pulse"),t&&x.push("fa-border"),l&&x.push("fa-fw"),u&&x.push("fa-inverse"),s&&x.push("fa-flip-"+s),f&&x.push("fa-rotate-"+f),h&&x.push("fa-stack-"+h)),n&&x.push(n),o.default.createElement(y,a({},v,{"aria-hidden":!0,className:x.join(" ")}),b?o.default.createElement("span",{style:i.default},b):null)}}]),t}(o.default.Component);u.propTypes={ariaLabel:l.default.string,border:l.default.bool,className:l.default.string,cssModule:l.default.object,fixedWidth:l.default.bool,flip:l.default.oneOf(["horizontal","vertical"]),inverse:l.default.bool,name:l.default.string.isRequired,pulse:l.default.bool,rotate:l.default.oneOf([90,180,270]),size:l.default.oneOf(["lg","2x","3x","4x","5x"]),spin:l.default.bool,stack:l.default.oneOf(["1x","2x"]),tag:l.default.string},t.default=u,e.exports=t.default},zzgX:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var a={tagStyle:{alignItems:"center",backgroundColor:"#eee",borderRadius:".25rem",cursor:"pointer",display:"inline-flex",fontSize:"1rem",fontWeight:"400",lineHeight:"1.2",minHeight:"1.5rem",padding:".25rem .5rem",margin:".25rem"}}}}]);
//# sourceMappingURL=component---src-pages-index-js-1f102caecbaa249a0b4d.js.map