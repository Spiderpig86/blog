(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{151:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(156),l=a.n(i),o=a(155),m=a(211),c=a.n(m),s=a(267),d=a.n(s),p=a(5),u=a.n(p),g={tagStyle:{alignItems:"center",backgroundColor:"#eee",borderRadius:".25rem",color:"#222",cursor:"pointer",display:"inline-flex",fontSize:"75%",lineHeight:"1.5",minHeight:"1.5rem",padding:"0 .5rem",margin:".25rem"}},h=function(e){return r.a.createElement("div",{style:{backgroundColor:"#fff",boxShadow:"0 0.2rem 1.25rem 0 rgba(27, 30, 36, 0.07)",maxWidth:960,padding:"1rem",marginBottom:"2rem",marginTop:"1rem",position:"sticky",top:"7rem"}},r.a.createElement("div",{className:"row"},"Published ",r.a.createElement("strong",null,e.date)),r.a.createElement("div",{className:"row"},r.a.createElement("strong",null,e.duration)," ",1===e.duration?"minute":"minutes"),r.a.createElement("strong",null,"Tags"),r.a.createElement("div",{className:"row"},e.tags.map(function(e,t){return r.a.createElement(u.a,{to:"/tag/"+e,style:g.tagStyle,key:t},e)})))},f=a(164),E=a(268),y=a.n(E),v=a(270),b=a(145),x=a.n(b),w=function(e){var t=e.post,a="";return t&&(a=(t.frontmatter.path.indexOf(v.pathPrefix)<0?v.pathPrefix:"")+t.frontmatter.path),r.a.createElement("div",{className:x.a.morelink},t?r.a.createElement("div",null,r.a.createElement("a",{href:""+a,className:x.a.morelink__title},t.frontmatter.title),r.a.createElement("p",{className:x.a.morelink__subtitle},y()(t.frontmatter.date).format("MMMM D, YYYY")),r.a.createElement("div",null,t.frontmatter.description?r.a.createElement("p",{className:x.a.morelink__description},t.frontmatter.description):r.a.createElement("p",{className:x.a.morelink__description},"No description available."))):r.a.createElement("h6",{className:x.a.morelink__title},"Hmm... Looks like you've reached the end."))},k=function(e){var t=e.prev,a=e.next;return r.a.createElement("div",{className:x.a.more},r.a.createElement("h4",{className:x.a.more__title},"Suggested Posts"),r.a.createElement("div",{className:x.a.more__links},r.a.createElement(w,{post:t}),r.a.createElement(w,{post:a})))},N=a(173),_=(a(35),a(146)),T=a.n(_),C="https://www.facebook.com/sharer/sharer.php?u=",S="https://twitter.com/intent/tweet?url=",W="https://www.linkedin.com/sharing/share-offsite/?url=",B="https://www.reddit.com/submit?url=",j=function(e){var t=e.network,a=e.url;return r.a.createElement("a",{rel:"noopener noreferrer",href:a,target:"__blank",className:T.a["sharebtn__"+t]},r.a.createElement("span",{className:"icon-container"},r.a.createElement("i",{className:"fa fa-"+t})))},I=function(e){var t=e.title,a=e.postTitle,n=e.postUrl,i=e.pathName;i=i.replace("/","");var l=""+C+n+i,o=""+S+n+i+"&text="+a+" by @hudididudidi",m=""+W+n+i,c=""+B+n+i+"&title="+a;return r.a.createElement("div",{className:T.a.share},r.a.createElement("h4",{className:T.a.share__title},t||"Sharing is caring"),r.a.createElement("div",{className:T.a.share__container},r.a.createElement(j,{network:"facebook",url:l}),r.a.createElement(j,{network:"twitter",url:o}),r.a.createElement(j,{network:"linkedin",url:m}),r.a.createElement(j,{network:"reddit",url:c})),r.a.createElement("hr",{style:{backgroundColor:"#ddd",marginBottom:"3rem"}}))};function M(e){var t=e.data,a=e.pageContext,n=e.location,i=t.markdownRemark,m=a.prev,s=a.next,p=t.site.siteMetadata.siteUrl,u=i.frontmatter.image&&i.frontmatter.image.childImageSharp.resize.src,g=i.frontmatter,E=g.title,y=g.image;return r.a.createElement(f.a,null,r.a.createElement("div",{className:"blog-post-container",style:{display:"flex"}},r.a.createElement(N.a,{title:E,description:i.frontmatter.description||i.excerpt,pathname:n.pathname,keywords:i.frontmatter.tags.join(","),thumbnail:u&&p+u,url:p}),r.a.createElement(c.a,{targetEl:"#post-el",style:{borderColor:"transparent",color:"#000",height:"0.25rem",zIndex:"100"}}),r.a.createElement("div",{style:{flex:2.5,paddingRight:"2rem",maxWidth:"100%"}},r.a.createElement(l.a,{title:"slim - "+i.frontmatter.title}),r.a.createElement("div",{className:"blog-post"},r.a.createElement("h1",{style:{fontSize:"3rem"}},i.frontmatter.title),i.frontmatter.description?r.a.createElement("h2",{className:"subtitle"},i.frontmatter.description):null,r.a.createElement("hr",{style:{backgroundColor:"#ddd",marginBottom:"3rem"}}),y&&y.childImageSharp?r.a.createElement(d.a,{fluid:i.frontmatter.image.childImageSharp.fluid}):null,r.a.createElement("div",{className:"blog-post-content",dangerouslySetInnerHTML:{__html:i.html},id:"post-el"})),r.a.createElement("hr",{style:{backgroundColor:"#ddd",marginBottom:"3rem"}}),r.a.createElement(I,{postTitle:E,postUrl:p,pathName:n.pathname}),r.a.createElement(k,{prev:m&&m.node,next:s&&s.node})),r.a.createElement(o.a,{query:"(min-width: 848px)"},function(e){return e?r.a.createElement("div",{style:{flex:1,positon:"realtive"}},r.a.createElement(h,{date:i.frontmatter.date,duration:i.timeToRead,tags:i.frontmatter.tags})):r.a.createElement("div",null)})))}a.d(t,"default",function(){return M}),a.d(t,"postQuery",function(){return D});var D="2768662969"},157:function(e,t,a){"use strict";a.d(t,"a",function(){return n});var n={indexBody:{margin:"0 auto",paddingTop:"3rem",maxWidth:980,flexDirection:"row",justifyContent:"space-between",height:"100%"},indexChildWrapper:{margin:"0 auto",maxWidth:980,display:"flex",flexDirection:"row",justifyContent:"space-between",height:"100%",padding:"25px"},readmoreButton:{fontFamily:"Montserrat",fontWeight:600}}},164:function(e,t,a){"use strict";a(24);var n=a(0),r=a.n(n),i=(a(1),a(156)),l=a.n(i),o=a(155),m=a(5),c=a.n(m),s={height:"4px",borderRadius:"4px",marginTop:".15rem",marginBottom:".15rem",paddingTop:"3px",width:"30px"},d=function(e){var t=e.siteTitle;return r.a.createElement("div",{className:"header header-fixed header-clear",style:{backgroundColor:"rgba(255, 255, 255, 0.9)",borderBottom:"1px solid #e1e1e1",boxShadow:"0 0.2rem 1.25rem 0 rgba(27,30,36,.07)"}},r.a.createElement("div",{style:{background:"transparent",margin:"0 auto",padding:"0 1.0875rem"}},r.a.createElement(o.a,{query:{minWidth:848}},function(e){return e?r.a.createElement("div",{className:"header-nav",style:{background:"transparent"}},r.a.createElement("div",{className:"nav-left"},r.a.createElement("div",{className:"nav-item"},r.a.createElement("h1",{style:{margin:0,textAlign:"center",background:"transparent"}},r.a.createElement(c.a,{className:"header-brand",to:"/",style:{color:"#222",textDecoration:"none"}},t)))),r.a.createElement("div",{className:"nav-center"}),r.a.createElement("div",{className:"nav-right",style:{display:"flex"}},r.a.createElement("div",{className:"nav-item"},r.a.createElement("div",{className:"burger",style:{background:"transparent",display:"flex",flexDirection:"column",paddingTop:"3px",right:0}},r.a.createElement("div",{style:Object.assign({},s,{alignSelf:"flex-end",width:"15px"})}),r.a.createElement("div",{style:s}),r.a.createElement("div",{style:Object.assign({},s,{width:"15px"})}))))):r.a.createElement("div",{className:"header-nav",style:{background:"transparent"}},r.a.createElement("div",{className:"nav-center"},r.a.createElement("div",{className:"nav-item"},r.a.createElement("h1",{style:{margin:0,textAlign:"center",background:"transparent"}},r.a.createElement(c.a,{className:"header-brand",to:"/",style:{color:"#222",textDecoration:"none"}},t)))))})))},p=a(157);t.a=function(e){var t=e.children;e.data;return r.a.createElement("div",null,r.a.createElement(l.a,null,r.a.createElement("link",{href:"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",rel:"stylesheet"})),r.a.createElement(d,{siteTitle:"slim"}),r.a.createElement(o.a,{query:{maxWidth:848}},function(e){return e?r.a.createElement("div",{style:Object.assign({},p.a.indexBody,{paddingTop:"7rem"})},r.a.createElement("div",{style:p.a.indexChildWrapper},r.a.createElement("div",{style:{flex:1,maxWidth:"100%"}},t))):r.a.createElement("div",{style:Object.assign({},p.a.indexBody,{paddingTop:"7rem"})},r.a.createElement("div",{style:p.a.indexChildWrapper},t))}))}},173:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(156),l=a.n(i);t.a=function(e){return r.a.createElement(l.a,{title:e.title,meta:[{name:"title",content:e.title},{name:"description",content:e.description},{name:"keywords",content:"stanley, lim, blog, "+e.keywords},{property:"og:title",content:e.title},{property:"og:url",content:e.pathname?e.url+e.pathname:e.url},{property:"og:image",content:e.thumbnail&&e.thumbnail},{property:"og:image:secure_url",content:e.thumbnail&&e.thumbnail},{property:"og:description",content:e.description},{property:"og:image:width",content:"1200"},{property:"og:image:height",content:"630"},{property:"og:locale",content:"en"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:e.title},{name:"twitter:description",content:e.description||""},{property:"og:type",content:"website"},{name:"robots",content:"index, follow"},{name:"twitter:creator",content:"@hudididudidi"},{property:"og:site_name",content:"slim blog"},{name:"viewport",content:"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"}]},r.a.createElement("html",{lang:"en"}))}},270:function(e,t){e.exports={url:"https://spiderpig86.github.io/",title:"slim blog",description:"A personal blog of mine talking about tech, life, and whatever I found intersting.",keyword:"slim, stanley lim, blog, gatsby",pathPrefix:"/blog"}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-47bb44148de51dc00874.js.map